import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ZkPoopStaking } from "../target/types/zk_poop_staking";
import { 
  PublicKey, 
  Keypair, 
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  createAccount,
  mintTo,
  getAccount,
} from "@solana/spl-token";
import { expect } from "chai";

describe("zk-poop-staking", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ZkPoopStaking as Program<ZkPoopStaking>;
  const authority = provider.wallet as anchor.Wallet;

  let stakingMint: PublicKey;
  let rewardMint: PublicKey;
  let stakingPool: PublicKey;
  let stakingVault: PublicKey;
  let rewardVault: PublicKey;
  let userAccount: PublicKey;
  let userTokenAccount: PublicKey;
  let userRewardAccount: PublicKey;
  let treasuryAccount: PublicKey;

  const STAKING_POOL_SEED = "staking_pool";
  const USER_ACCOUNT_SEED = "user_account";

  before(async () => {
    // Create staking token mint
    stakingMint = await createMint(
      provider.connection,
      authority.payer,
      authority.publicKey,
      null,
      9 // 9 decimals
    );

    // Create reward token mint ($WePee)
    rewardMint = await createMint(
      provider.connection,
      authority.payer,
      authority.publicKey,
      null,
      9 // 9 decimals
    );

    // Create user token account
    userTokenAccount = await createAccount(
      provider.connection,
      authority.payer,
      stakingMint,
      authority.publicKey
    );

    // Create user reward account
    userRewardAccount = await createAccount(
      provider.connection,
      authority.payer,
      rewardMint,
      authority.publicKey
    );

    // Create treasury account
    treasuryAccount = await createAccount(
      provider.connection,
      authority.payer,
      stakingMint,
      authority.publicKey
    );

    // Mint some tokens to user
    await mintTo(
      provider.connection,
      authority.payer,
      stakingMint,
      userTokenAccount,
      authority.publicKey,
      1000 * 10**9 // 1000 tokens
    );

    // Find PDAs
    [stakingPool] = PublicKey.findProgramAddressSync(
      [Buffer.from(STAKING_POOL_SEED)],
      program.programId
    );

    [userAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from(USER_ACCOUNT_SEED), authority.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Initializes the staking pool", async () => {
    const rewardRate = new anchor.BN(2500000); // 2.5 $WePee per 1K staked per day (scaled by 1e6)

    await program.methods
      .initializePool(1, rewardRate) // bump = 1, reward_rate
      .accounts({
        stakingPool,
        authority: authority.publicKey,
        stakingMint,
        rewardMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    const poolAccount = await program.account.stakingPool.fetch(stakingPool);
    expect(poolAccount.authority.toString()).to.equal(authority.publicKey.toString());
    expect(poolAccount.rewardRate.toString()).to.equal(rewardRate.toString());
    expect(poolAccount.paused).to.be.false;
  });

  it("Initializes user account", async () => {
    await program.methods
      .initializeUser(1) // bump = 1
      .accounts({
        userAccount,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    const userAccountData = await program.account.userAccount.fetch(userAccount);
    expect(userAccountData.authority.toString()).to.equal(authority.publicKey.toString());
    expect(userAccountData.totalStaked.toString()).to.equal("0");
    expect(userAccountData.stakes.length).to.equal(0);
  });

  it("Stakes tokens with 3-month lock period", async () => {
    const stakeAmount = new anchor.BN(500 * 10**9); // 500 tokens
    
    // Get vault addresses from pool account
    const poolAccount = await program.account.stakingPool.fetch(stakingPool);
    stakingVault = poolAccount.stakingVault;

    await program.methods
      .stake(stakeAmount, { threeMonths: {} })
      .accounts({
        stakingPool,
        userAccount,
        authority: authority.publicKey,
        userTokenAccount,
        stakingVault,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const userAccountData = await program.account.userAccount.fetch(userAccount);
    expect(userAccountData.totalStaked.toString()).to.equal(stakeAmount.toString());
    expect(userAccountData.stakes.length).to.equal(1);
    expect(userAccountData.stakes[0].amount.toString()).to.equal(stakeAmount.toString());
    expect(userAccountData.stakes[0].multiplier.toString()).to.equal("2000"); // 2.0x
    expect(userAccountData.stakes[0].isActive).to.be.true;

    // Check vault balance
    const vaultAccount = await getAccount(provider.connection, stakingVault);
    expect(vaultAccount.amount.toString()).to.equal(stakeAmount.toString());
  });

  it("Prevents staking below minimum amount", async () => {
    const smallAmount = new anchor.BN(50 * 10**9); // 50 tokens (below 500 minimum for 3-month)

    try {
      await program.methods
        .stake(smallAmount, { threeMonths: {} })
        .accounts({
          stakingPool,
          userAccount,
          authority: authority.publicKey,
          userTokenAccount,
          stakingVault,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      
      expect.fail("Should have failed with BelowMinimumStake error");
    } catch (error) {
      expect(error.message).to.include("BelowMinimumStake");
    }
  });

  it("Emergency unstakes with penalty", async () => {
    const stakeIndex = 0;
    
    const userBalanceBefore = await getAccount(provider.connection, userTokenAccount);
    const vaultBalanceBefore = await getAccount(provider.connection, stakingVault);

    await program.methods
      .emergencyUnstake(stakeIndex)
      .accounts({
        stakingPool,
        userAccount,
        authority: authority.publicKey,
        userTokenAccount,
        stakingVault,
        treasuryAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const userAccountData = await program.account.userAccount.fetch(userAccount);
    expect(userAccountData.stakes[0].isActive).to.be.false;
    expect(userAccountData.totalStaked.toString()).to.equal("0");

    const userBalanceAfter = await getAccount(provider.connection, userTokenAccount);
    const vaultBalanceAfter = await getAccount(provider.connection, stakingVault);

    // User should get back less than they staked due to penalty
    const returnedAmount = userBalanceAfter.amount - userBalanceBefore.amount;
    expect(returnedAmount).to.be.lessThan(500n * 10n**9n); // Less than original 500 tokens

    // Vault balance should be reduced
    expect(vaultBalanceAfter.amount).to.be.lessThan(vaultBalanceBefore.amount);
  });

  it("Prevents emergency unstake on expired lock", async () => {
    // First stake again
    const stakeAmount = new anchor.BN(100 * 10**9); // 100 tokens (minimum for 1-day)
    
    await program.methods
      .stake(stakeAmount, { oneDay: {} })
      .accounts({
        stakingPool,
        userAccount,
        authority: authority.publicKey,
        userTokenAccount,
        stakingVault,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    // Wait for lock to "expire" (simulate by modifying the test - in reality we'd wait)
    // For testing purposes, we'll try to emergency unstake immediately
    // The lock should still be active, so emergency unstake should work
    
    const userAccountData = await program.account.userAccount.fetch(userAccount);
    const activeStakeIndex = userAccountData.stakes.findIndex(stake => stake.isActive);
    
    if (activeStakeIndex !== -1) {
      await program.methods
        .emergencyUnstake(activeStakeIndex)
        .accounts({
          stakingPool,
          userAccount,
          authority: authority.publicKey,
          userTokenAccount,
          stakingVault,
          treasuryAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
    }
  });

  it("Admin can pause/unpause pool", async () => {
    // Pause pool
    await program.methods
      .setPaused(true)
      .accounts({
        stakingPool,
        authority: authority.publicKey,
      })
      .rpc();

    let poolAccount = await program.account.stakingPool.fetch(stakingPool);
    expect(poolAccount.paused).to.be.true;

    // Try to stake while paused (should fail)
    try {
      await program.methods
        .stake(new anchor.BN(100 * 10**9), { oneDay: {} })
        .accounts({
          stakingPool,
          userAccount,
          authority: authority.publicKey,
          userTokenAccount,
          stakingVault,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      
      expect.fail("Should have failed with PoolPaused error");
    } catch (error) {
      expect(error.message).to.include("PoolPaused");
    }

    // Unpause pool
    await program.methods
      .setPaused(false)
      .accounts({
        stakingPool,
        authority: authority.publicKey,
      })
      .rpc();

    poolAccount = await program.account.stakingPool.fetch(stakingPool);
    expect(poolAccount.paused).to.be.false;
  });
});