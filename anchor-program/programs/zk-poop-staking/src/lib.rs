use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

pub mod security;
use security::{SecurityValidator, OperationType};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod zk_poop_staking {
    use super::*;

    /// Initialize the global staking pool
    pub fn initialize_pool(
        ctx: Context<InitializePool>,
        bump: u8,
        reward_rate: u64, // Base $WePee per 1000 staked per day (scaled by 1e6)
    ) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        pool.authority = ctx.accounts.authority.key();
        pool.staking_mint = ctx.accounts.staking_mint.key();
        pool.reward_mint = ctx.accounts.reward_mint.key();
        pool.staking_vault = ctx.accounts.staking_vault.key();
        pool.reward_vault = ctx.accounts.reward_vault.key();
        pool.total_staked = 0;
        pool.reward_rate = reward_rate;
        pool.bump = bump;
        pool.paused = false;

        msg!("Staking pool initialized with reward rate: {}", reward_rate);
        Ok(())
    }

    /// Initialize a user's staking account
    pub fn initialize_user(ctx: Context<InitializeUser>, bump: u8) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.authority = ctx.accounts.authority.key();
        user_account.total_staked = 0;
        user_account.pending_rewards = 0;
        user_account.last_reward_time = Clock::get()?.unix_timestamp;
        user_account.bump = bump;

        msg!("User staking account initialized for: {}", ctx.accounts.authority.key());
        Ok(())
    }

    /// Stake tokens with a specific lock period
    pub fn stake(
        ctx: Context<Stake>,
        amount: u64,
        lock_period: LockPeriod,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        let user_account = &mut ctx.accounts.user_account;
        let clock = Clock::get()?;

        require!(!pool.paused, StakingError::PoolPaused);
        require!(amount > 0, StakingError::InvalidAmount);

        // Security validations
        SecurityValidator::validate_flash_loan_protection(user_account, clock.unix_timestamp)?;
        SecurityValidator::validate_rate_limiting(user_account, clock.unix_timestamp, OperationType::Stake)?;
        SecurityValidator::validate_account_consistency(user_account)?;
        SecurityValidator::validate_lock_period_gaming(&user_account.stakes, lock_period, clock.unix_timestamp)?;
        SecurityValidator::validate_sybil_protection(user_account, amount, clock.unix_timestamp)?;

        // Validate minimum stake amounts
        let min_stake = match lock_period {
            LockPeriod::OneDay => MIN_STAKE_24H,
            LockPeriod::OneWeek => MIN_STAKE_1W,
            LockPeriod::ThreeMonths => MIN_STAKE_3M,
            LockPeriod::SixMonths => MIN_STAKE_6M,
        };
        require!(amount >= min_stake, StakingError::BelowMinimumStake);

        // Update rewards before modifying stake
        update_user_rewards(user_account, pool, clock.unix_timestamp)?;

        // Calculate lock end time
        let lock_duration = match lock_period {
            LockPeriod::OneDay => 86400,        // 1 day
            LockPeriod::OneWeek => 604800,      // 7 days
            LockPeriod::ThreeMonths => 7776000, // 90 days
            LockPeriod::SixMonths => 15552000,  // 180 days
        };

        // Create new stake entry
        let stake_entry = StakeEntry {
            amount,
            lock_period,
            lock_start: clock.unix_timestamp,
            lock_end: clock.unix_timestamp + lock_duration,
            multiplier: get_lock_multiplier(lock_period),
            is_active: true,
        };

        // Add stake entry (max 10 concurrent stakes per user)
        require!(user_account.stakes.len() < 10, StakingError::TooManyStakes);
        user_account.stakes.push(stake_entry);

        // Transfer tokens to vault
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user_token_account.to_account_info(),
                to: ctx.accounts.staking_vault.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, amount)?;

        // Update totals
        user_account.total_staked += amount;
        pool.total_staked += amount;

        emit!(StakeEvent {
            user: ctx.accounts.authority.key(),
            amount,
            lock_period,
            lock_end: stake_entry.lock_end,
            multiplier: stake_entry.multiplier,
        });

        msg!("Staked {} tokens with {:?} lock period", amount, lock_period);
        Ok(())
    }

    /// Unstake tokens after lock period expires
    pub fn unstake(ctx: Context<Unstake>, stake_index: u8) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        let user_account = &mut ctx.accounts.user_account;
        let clock = Clock::get()?;

        require!(!pool.paused, StakingError::PoolPaused);
        require!((stake_index as usize) < user_account.stakes.len(), StakingError::InvalidStakeIndex);

        let stake = &mut user_account.stakes[stake_index as usize];
        require!(stake.is_active, StakingError::StakeNotActive);
        require!(clock.unix_timestamp >= stake.lock_end, StakingError::StillLocked);

        // Update rewards before unstaking
        update_user_rewards(user_account, pool, clock.unix_timestamp)?;

        let amount = stake.amount;

        // Transfer tokens back to user
        let seeds = &[
            STAKING_POOL_SEED.as_bytes(),
            &[pool.bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.staking_vault.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.staking_pool.to_account_info(),
            },
            signer,
        );
        token::transfer(cpi_ctx, amount)?;

        // Mark stake as inactive
        stake.is_active = false;

        // Update totals
        user_account.total_staked -= amount;
        pool.total_staked -= amount;

        emit!(UnstakeEvent {
            user: ctx.accounts.authority.key(),
            amount,
            penalty: 0,
        });

        msg!("Unstaked {} tokens", amount);
        Ok(())
    }

    /// Emergency unstake with penalty
    pub fn emergency_unstake(ctx: Context<EmergencyUnstake>, stake_index: u8) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        let user_account = &mut ctx.accounts.user_account;
        let clock = Clock::get()?;

        require!(!pool.paused, StakingError::PoolPaused);
        require!((stake_index as usize) < user_account.stakes.len(), StakingError::InvalidStakeIndex);

        // Security validations
        SecurityValidator::validate_rate_limiting(user_account, clock.unix_timestamp, OperationType::EmergencyUnstake)?;
        SecurityValidator::validate_account_consistency(user_account)?;

        let stake = &mut user_account.stakes[stake_index as usize];
        require!(stake.is_active, StakingError::StakeNotActive);
        require!(clock.unix_timestamp < stake.lock_end, StakingError::LockExpired);

        // Update rewards before unstaking
        update_user_rewards(user_account, pool, clock.unix_timestamp)?;

        let staked_amount = stake.amount;
        
        // Calculate progressive penalty (33% at start, 0% at end)
        let total_duration = stake.lock_end - stake.lock_start;
        let time_remaining = stake.lock_end - clock.unix_timestamp;
        let penalty_percent = (time_remaining as u64 * 33) / total_duration as u64;
        
        // Validate penalty calculation
        SecurityValidator::validate_penalty_calculation(stake, clock.unix_timestamp, penalty_percent)?;
        
        let penalty_amount = (staked_amount * penalty_percent) / 100;
        let return_amount = staked_amount - penalty_amount;

        // Distribute penalty: 40% burn, 40% rewards pool, 20% treasury
        let burn_amount = (penalty_amount * 40) / 100;
        let rewards_amount = (penalty_amount * 40) / 100;
        let treasury_amount = penalty_amount - burn_amount - rewards_amount;

        let seeds = &[
            STAKING_POOL_SEED.as_bytes(),
            &[pool.bump],
        ];
        let signer = &[&seeds[..]];

        // Transfer return amount to user
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.staking_vault.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.staking_pool.to_account_info(),
            },
            signer,
        );
        token::transfer(cpi_ctx, return_amount)?;

        // Transfer penalty portions
        if burn_amount > 0 {
            // Burn by transferring to burn address (not implemented in this example)
            msg!("Burn amount: {}", burn_amount);
        }

        if rewards_amount > 0 {
            // Add to reward vault
            msg!("Added {} to rewards pool", rewards_amount);
        }

        if treasury_amount > 0 {
            // Transfer to treasury
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.staking_vault.to_account_info(),
                    to: ctx.accounts.treasury_account.to_account_info(),
                    authority: ctx.accounts.staking_pool.to_account_info(),
                },
                signer,
            );
            token::transfer(cpi_ctx, treasury_amount)?;
        }

        // Mark stake as inactive
        stake.is_active = false;

        // Update totals
        user_account.total_staked -= staked_amount;
        pool.total_staked -= staked_amount;

        emit!(UnstakeEvent {
            user: ctx.accounts.authority.key(),
            amount: return_amount,
            penalty: penalty_amount,
        });

        msg!("Emergency unstaked {} tokens with {}% penalty ({})", 
            return_amount, penalty_percent, penalty_amount);
        Ok(())
    }

    /// Claim accumulated $WePee rewards
    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        let user_account = &mut ctx.accounts.user_account;
        let clock = Clock::get()?;

        require!(!pool.paused, StakingError::PoolPaused);

        // Update rewards
        update_user_rewards(user_account, pool, clock.unix_timestamp)?;

        let reward_amount = user_account.pending_rewards;
        require!(reward_amount > 0, StakingError::NoRewardsToClaim);

        let seeds = &[
            STAKING_POOL_SEED.as_bytes(),
            &[pool.bump],
        ];
        let signer = &[&seeds[..]];

        // Transfer $WePee rewards to user
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.reward_vault.to_account_info(),
                to: ctx.accounts.user_reward_account.to_account_info(),
                authority: ctx.accounts.staking_pool.to_account_info(),
            },
            signer,
        );
        token::transfer(cpi_ctx, reward_amount)?;

        user_account.pending_rewards = 0;

        emit!(ClaimRewardsEvent {
            user: ctx.accounts.authority.key(),
            amount: reward_amount,
        });

        msg!("Claimed {} $WePee rewards", reward_amount);
        Ok(())
    }

    /// Admin function to pause/unpause the pool
    pub fn set_paused(ctx: Context<SetPaused>, paused: bool) -> Result<()> {
        let pool = &mut ctx.accounts.staking_pool;
        require!(ctx.accounts.authority.key() == pool.authority, StakingError::Unauthorized);
        
        pool.paused = paused;
        msg!("Pool paused status set to: {}", paused);
        Ok(())
    }
}

// Helper functions
fn get_lock_multiplier(lock_period: LockPeriod) -> u64 {
    match lock_period {
        LockPeriod::OneDay => 1000,     // 1.0x (scaled by 1000)
        LockPeriod::OneWeek => 1250,    // 1.25x
        LockPeriod::ThreeMonths => 2000, // 2.0x
        LockPeriod::SixMonths => 3000,   // 3.0x
    }
}

fn update_user_rewards(
    user_account: &mut UserAccount,
    pool: &StakingPool,
    current_time: i64,
) -> Result<()> {
    let time_diff = current_time - user_account.last_reward_time;
    if time_diff <= 0 {
        return Ok(());
    }

    let mut total_rewards = 0u64;

    // Calculate rewards for each active stake
    for stake in &user_account.stakes {
        if !stake.is_active {
            continue;
        }

        // Calculate effective staking time (only while locked or after unlock)
        let stake_start = std::cmp::max(stake.lock_start, user_account.last_reward_time);
        let stake_end = std::cmp::min(current_time, stake.lock_end);
        
        if stake_end > stake_start {
            let stake_duration = stake_end - stake_start;
            
            // Base reward calculation: (amount / 1000) * rate * days * multiplier
            let days = stake_duration as u64 / 86400; // Convert seconds to days
            let base_reward = (stake.amount * pool.reward_rate * days) / (1000 * 1_000_000); // Scale down
            let multiplied_reward = (base_reward * stake.multiplier) / 1000; // Apply multiplier
            
            total_rewards += multiplied_reward;
        }
    }

    user_account.pending_rewards += total_rewards;
    user_account.last_reward_time = current_time;

    Ok(())
}

// Constants
const STAKING_POOL_SEED: &str = "staking_pool";
const USER_ACCOUNT_SEED: &str = "user_account";

// Minimum stake amounts (in token base units)
const MIN_STAKE_24H: u64 = 100_000_000;    // 100 tokens
const MIN_STAKE_1W: u64 = 250_000_000;     // 250 tokens
const MIN_STAKE_3M: u64 = 500_000_000;     // 500 tokens
const MIN_STAKE_6M: u64 = 1_000_000_000;   // 1000 tokens

// Account structures
#[account]
pub struct StakingPool {
    pub authority: Pubkey,
    pub staking_mint: Pubkey,
    pub reward_mint: Pubkey,
    pub staking_vault: Pubkey,
    pub reward_vault: Pubkey,
    pub total_staked: u64,
    pub reward_rate: u64, // Base $WePee per 1000 staked per day (scaled by 1e6)
    pub bump: u8,
    pub paused: bool,
}

#[account]
pub struct UserAccount {
    pub authority: Pubkey,
    pub total_staked: u64,
    pub pending_rewards: u64,
    pub last_reward_time: i64,
    pub stakes: Vec<StakeEntry>,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct StakeEntry {
    pub amount: u64,
    pub lock_period: LockPeriod,
    pub lock_start: i64,
    pub lock_end: i64,
    pub multiplier: u64, // Scaled by 1000 (1000 = 1.0x)
    pub is_active: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum LockPeriod {
    OneDay,
    OneWeek,
    ThreeMonths,
    SixMonths,
}

// Context structures
#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializePool<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 32 + 32 + 32 + 8 + 8 + 1 + 1,
        seeds = [STAKING_POOL_SEED.as_bytes()],
        bump = bump
    )]
    pub staking_pool: Account<'info, StakingPool>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub staking_mint: Account<'info, token::Mint>,
    pub reward_mint: Account<'info, token::Mint>,
    
    #[account(
        init,
        payer = authority,
        token::mint = staking_mint,
        token::authority = staking_pool,
    )]
    pub staking_vault: Account<'info, TokenAccount>,
    
    #[account(
        init,
        payer = authority,
        token::mint = reward_mint,
        token::authority = staking_pool,
    )]
    pub reward_vault: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8 + 8 + (4 + 10 * (8 + 1 + 8 + 8 + 8 + 1)) + 1, // Vec<StakeEntry> with max 10 entries
        seeds = [USER_ACCOUNT_SEED.as_bytes(), authority.key().as_ref()],
        bump = bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(mut)]
    pub staking_pool: Account<'info, StakingPool>,
    
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED.as_bytes(), authority.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_token_account.mint == staking_pool.staking_mint
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = staking_vault.key() == staking_pool.staking_vault
    )]
    pub staking_vault: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub staking_pool: Account<'info, StakingPool>,
    
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED.as_bytes(), authority.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_token_account.mint == staking_pool.staking_mint
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = staking_vault.key() == staking_pool.staking_vault
    )]
    pub staking_vault: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct EmergencyUnstake<'info> {
    #[account(mut)]
    pub staking_pool: Account<'info, StakingPool>,
    
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED.as_bytes(), authority.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_token_account.mint == staking_pool.staking_mint
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = staking_vault.key() == staking_pool.staking_vault
    )]
    pub staking_vault: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub treasury_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut)]
    pub staking_pool: Account<'info, StakingPool>,
    
    #[account(
        mut,
        seeds = [USER_ACCOUNT_SEED.as_bytes(), authority.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_reward_account.mint == staking_pool.reward_mint
    )]
    pub user_reward_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = reward_vault.key() == staking_pool.reward_vault
    )]
    pub reward_vault: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct SetPaused<'info> {
    #[account(mut)]
    pub staking_pool: Account<'info, StakingPool>,
    
    pub authority: Signer<'info>,
}

// Events
#[event]
pub struct StakeEvent {
    pub user: Pubkey,
    pub amount: u64,
    pub lock_period: LockPeriod,
    pub lock_end: i64,
    pub multiplier: u64,
}

#[event]
pub struct UnstakeEvent {
    pub user: Pubkey,
    pub amount: u64,
    pub penalty: u64,
}

#[event]
pub struct ClaimRewardsEvent {
    pub user: Pubkey,
    pub amount: u64,
}

// Error definitions
#[error_code]
pub enum StakingError {
    #[msg("Pool is currently paused")]
    PoolPaused,
    
    #[msg("Invalid amount")]
    InvalidAmount,
    
    #[msg("Amount below minimum stake requirement")]
    BelowMinimumStake,
    
    #[msg("Too many concurrent stakes (max 10)")]
    TooManyStakes,
    
    #[msg("Invalid stake index")]
    InvalidStakeIndex,
    
    #[msg("Stake is not active")]
    StakeNotActive,
    
    #[msg("Tokens are still locked")]
    StillLocked,
    
    #[msg("Lock period has already expired")]
    LockExpired,
    
    #[msg("No rewards to claim")]
    NoRewardsToClaim,
    
    #[msg("Unauthorized")]
    Unauthorized,

    // Security-related errors
    #[msg("Suspicious activity detected")]
    SuspiciousActivity,
    
    #[msg("Rate limit exceeded - too many operations")]
    RateLimitExceeded,
    
    #[msg("Reward calculation error")]
    RewardCalculationError,
    
    #[msg("Invalid stake amount")]
    InvalidStakeAmount,
    
    #[msg("Invalid lock period")]
    InvalidLockPeriod,
    
    #[msg("Invalid multiplier")]
    InvalidMultiplier,
    
    #[msg("Multiplier does not match lock period")]
    MultiplierMismatch,
    
    #[msg("Inconsistent total staked amount")]
    InconsistentTotalStaked,
    
    #[msg("Too many active stakes")]
    TooManyActiveStakes,
    
    #[msg("Too many short-term stakes - use longer periods")]
    TooManyShortTermStakes,
    
    #[msg("Penalty calculation error")]
    PenaltyCalculationError,
    
    #[msg("Excessive penalty")]
    ExcessivePenalty,
    
    #[msg("Suspicious Sybil attack pattern detected")]
    SuspiciousSybilPattern,
    
    #[msg("Stake amount too small")]
    StakeAmountTooSmall,
}