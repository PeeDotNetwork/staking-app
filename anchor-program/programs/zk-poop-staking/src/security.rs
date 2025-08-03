use anchor_lang::prelude::*;
use crate::{StakingError, UserAccount, StakeEntry, LockPeriod};

/// Security validations and anti-gaming mechanisms
pub struct SecurityValidator;

impl SecurityValidator {
    /// Validate that staking operations aren't being used for flash loan attacks
    pub fn validate_flash_loan_protection(
        user_account: &UserAccount,
        current_time: i64,
    ) -> Result<()> {
        // Check if user has any recent stakes that were immediately unstaked
        // This helps prevent flash loan attacks
        for stake in &user_account.stakes {
            if !stake.is_active && stake.lock_start > (current_time - 3600) {
                // If a stake was created and deactivated within the last hour, flag it
                let stake_duration = if stake.lock_end <= current_time {
                    // Normal unstake after lock period
                    stake.lock_end - stake.lock_start
                } else {
                    // Emergency unstake before lock period ended
                    current_time - stake.lock_start
                };
                
                // Flag suspicious pattern: stake created and removed within 10 minutes
                if stake_duration < 600 {
                    return err!(StakingError::SuspiciousActivity);
                }
            }
        }
        Ok(())
    }

    /// Validate rate limiting to prevent spam attacks
    pub fn validate_rate_limiting(
        user_account: &UserAccount,
        current_time: i64,
        operation_type: OperationType,
    ) -> Result<()> {
        let time_window = 3600; // 1 hour window
        let mut operation_count = 0u32;

        // Count recent operations of the same type
        for stake in &user_account.stakes {
            match operation_type {
                OperationType::Stake => {
                    if stake.lock_start > (current_time - time_window) {
                        operation_count += 1;
                    }
                }
                OperationType::EmergencyUnstake => {
                    // Check if this was an emergency unstake (ended before lock_end)
                    if !stake.is_active && 
                       stake.lock_start > (current_time - time_window) &&
                       current_time < stake.lock_end {
                        operation_count += 1;
                    }
                }
            }
        }

        // Apply rate limits
        let max_operations = match operation_type {
            OperationType::Stake => 5,           // Max 5 stakes per hour
            OperationType::EmergencyUnstake => 2, // Max 2 emergency unstakes per hour
        };

        require!(operation_count < max_operations, StakingError::RateLimitExceeded);
        Ok(())
    }

    /// Validate that rewards calculations are consistent and prevent manipulation
    pub fn validate_reward_calculation(
        stake: &StakeEntry,
        calculated_rewards: u64,
        reward_rate: u64,
        calculation_time: i64,
    ) -> Result<()> {
        // Recalculate rewards to ensure consistency
        let expected_rewards = Self::calculate_expected_rewards(
            stake,
            reward_rate,
            calculation_time,
        )?;

        // Allow small rounding differences (up to 0.1% variance)
        let variance_threshold = std::cmp::max(expected_rewards / 1000, 1);
        let difference = if calculated_rewards > expected_rewards {
            calculated_rewards - expected_rewards
        } else {
            expected_rewards - calculated_rewards
        };

        require!(
            difference <= variance_threshold,
            StakingError::RewardCalculationError
        );

        Ok(())
    }

    /// Calculate expected rewards for validation
    fn calculate_expected_rewards(
        stake: &StakeEntry,
        reward_rate: u64,
        current_time: i64,
    ) -> Result<u64> {
        if !stake.is_active {
            return Ok(0);
        }

        let effective_end_time = std::cmp::min(current_time, stake.lock_end);
        
        if effective_end_time <= stake.lock_start {
            return Ok(0);
        }

        let duration_seconds = (effective_end_time - stake.lock_start) as u64;
        let duration_days = duration_seconds / 86400; // Convert to days

        // Base reward: (amount / 1000) * rate * days
        let base_reward = (stake.amount * reward_rate * duration_days) / (1000 * 1_000_000);
        
        // Apply multiplier
        let final_reward = (base_reward * stake.multiplier) / 1000;

        Ok(final_reward)
    }

    /// Validate account state consistency
    pub fn validate_account_consistency(user_account: &UserAccount) -> Result<()> {
        let mut calculated_total_staked = 0u64;
        let mut active_stakes = 0u32;

        for stake in &user_account.stakes {
            if stake.is_active {
                calculated_total_staked += stake.amount;
                active_stakes += 1;

                // Validate individual stake consistency
                require!(stake.amount > 0, StakingError::InvalidStakeAmount);
                require!(stake.lock_end > stake.lock_start, StakingError::InvalidLockPeriod);
                require!(stake.multiplier > 0, StakingError::InvalidMultiplier);

                // Validate multiplier matches lock period
                let expected_multiplier = match stake.lock_period {
                    LockPeriod::OneDay => 1000,
                    LockPeriod::OneWeek => 1250,
                    LockPeriod::ThreeMonths => 2000,
                    LockPeriod::SixMonths => 3000,
                };
                require!(
                    stake.multiplier == expected_multiplier,
                    StakingError::MultiplierMismatch
                );
            }
        }

        // Validate total staked amount consistency
        require!(
            user_account.total_staked == calculated_total_staked,
            StakingError::InconsistentTotalStaked
        );

        // Validate reasonable limits
        require!(active_stakes <= 10, StakingError::TooManyActiveStakes);

        Ok(())
    }

    /// Validate that lock periods are reasonable and prevent gaming
    pub fn validate_lock_period_gaming(
        existing_stakes: &[StakeEntry],
        new_lock_period: LockPeriod,
        current_time: i64,
    ) -> Result<()> {
        // Prevent users from gaming the system by creating many short-term stakes
        // to avoid longer commitments
        
        let short_term_count = existing_stakes.iter()
            .filter(|stake| {
                stake.is_active && 
                matches!(stake.lock_period, LockPeriod::OneDay | LockPeriod::OneWeek) &&
                stake.lock_start > (current_time - 86400 * 7) // Created in last 7 days
            })
            .count();

        // If user has many recent short-term stakes and is trying to create another,
        // require them to use longer periods
        if short_term_count >= 3 && matches!(new_lock_period, LockPeriod::OneDay) {
            return err!(StakingError::TooManyShortTermStakes);
        }

        if short_term_count >= 5 && matches!(new_lock_period, LockPeriod::OneWeek) {
            return err!(StakingError::TooManyShortTermStakes);
        }

        Ok(())
    }

    /// Validate penalty calculations for emergency unstaking
    pub fn validate_penalty_calculation(
        stake: &StakeEntry,
        current_time: i64,
        calculated_penalty_percent: u64,
    ) -> Result<()> {
        require!(current_time < stake.lock_end, StakingError::LockExpired);

        let total_duration = (stake.lock_end - stake.lock_start) as u64;
        let time_remaining = (stake.lock_end - current_time) as u64;

        // Calculate expected penalty percentage
        let expected_penalty_percent = (time_remaining * 33) / total_duration;

        // Allow for small rounding differences
        let difference = if calculated_penalty_percent > expected_penalty_percent {
            calculated_penalty_percent - expected_penalty_percent
        } else {
            expected_penalty_percent - calculated_penalty_percent
        };

        require!(difference <= 1, StakingError::PenaltyCalculationError);
        require!(calculated_penalty_percent <= 33, StakingError::ExcessivePenalty);

        Ok(())
    }

    /// Detect and prevent potential Sybil attacks
    pub fn validate_sybil_protection(
        user_account: &UserAccount,
        stake_amount: u64,
        current_time: i64,
    ) -> Result<()> {
        // Detect patterns that might indicate Sybil attacks:
        // - Many small stakes created in rapid succession
        // - Identical stake amounts across multiple accounts (handled at higher level)
        
        let recent_stakes: Vec<&StakeEntry> = user_account.stakes.iter()
            .filter(|stake| stake.lock_start > (current_time - 3600)) // Last hour
            .collect();

        if recent_stakes.len() >= 3 {
            // Check if all recent stakes are suspiciously similar amounts
            let first_amount = recent_stakes[0].amount;
            let similar_amounts = recent_stakes.iter()
                .filter(|stake| {
                    let diff = if stake.amount > first_amount {
                        stake.amount - first_amount
                    } else {
                        first_amount - stake.amount
                    };
                    diff < (first_amount / 100) // Within 1% of each other
                })
                .count();

            if similar_amounts == recent_stakes.len() {
                return err!(StakingError::SuspiciousSybilPattern);
            }
        }

        // Flag very small stakes that might be used for gaming
        let min_meaningful_stake = 10_000_000; // 10 tokens minimum
        if stake_amount < min_meaningful_stake && recent_stakes.len() > 1 {
            return err!(StakingError::StakeAmountTooSmall);
        }

        Ok(())
    }
}

/// Operation types for rate limiting
#[derive(Clone, Copy, PartialEq)]
pub enum OperationType {
    Stake,
    EmergencyUnstake,
}

/// Additional security-related errors
impl From<SecurityError> for StakingError {
    fn from(err: SecurityError) -> Self {
        match err {
            SecurityError::FlashLoanDetected => StakingError::SuspiciousActivity,
            SecurityError::RateLimitExceeded => StakingError::RateLimitExceeded,
            SecurityError::InvalidRewardCalculation => StakingError::RewardCalculationError,
        }
    }
}

#[derive(Debug)]
pub enum SecurityError {
    FlashLoanDetected,
    RateLimitExceeded,
    InvalidRewardCalculation,
}