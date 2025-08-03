# ZK POOP Staking Program Deployment Instructions

## Prerequisites

1. **Install Rust and Cargo**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source ~/.cargo/env
   ```

2. **Install Solana CLI**:
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/v1.18.26/install)"
   export PATH="~/.local/share/solana/install/active_release/bin:$PATH"
   ```

3. **Install Anchor CLI**:
   ```bash
   npm install -g @coral-xyz/anchor-cli
   ```

4. **Configure Solana for Devnet**:
   ```bash
   solana config set --url devnet
   solana-keygen new --outfile ~/.config/solana/id.json
   solana airdrop 2  # Get devnet SOL for deployment
   ```

## Deployment Process

### Step 1: Build the Program
```bash
cd anchor-program
anchor build
```

### Step 2: Deploy to Devnet
```bash
anchor deploy --provider.cluster devnet
```

### Step 3: Initialize Test Environment
```bash
cd ../scripts
node deploy-devnet.js
```

### Step 4: Initialize Staking Pool
Use the Anchor client or frontend to call `initialize_pool` with:
- Reward rate: 2,500,000 (2.5 $WePee per 1K staked per day, scaled by 1e6)
- Staking mint: From deployment config
- Reward mint: From deployment config

## Program Features

### Lock Periods and Multipliers
- **24 Hours**: 1.0x multiplier, 100 token minimum
- **1 Week**: 1.25x multiplier, 250 token minimum  
- **3 Months**: 2.0x multiplier, 500 token minimum
- **6 Months**: 3.0x multiplier, 1000 token minimum

### Emergency Unstaking
- Progressive penalty: 33% × (time_remaining / total_duration)
- Penalty distribution: 40% burn, 40% rewards pool, 20% treasury
- Decreases linearly to 0% at lock expiration

### Security Features
- **Flash Loan Protection**: Prevents stake/unstake in same transaction
- **Rate Limiting**: Max 5 stakes, 2 emergency unstakes per hour
- **Sybil Detection**: Flags suspicious patterns of small identical stakes
- **Account Validation**: Ensures data consistency across all operations
- **Reward Verification**: Validates all reward calculations

### Anti-Gaming Mechanisms
- **Short-term Stake Limits**: Prevents excessive 1-day/1-week stakes
- **Minimum Stake Enforcement**: Different minimums per lock period
- **Consistent State Validation**: Prevents manipulation of account data
- **Penalty Calculation Verification**: Ensures fair emergency unstaking

## Testing

### Run Local Tests
```bash
anchor test
```

### Manual Testing on Devnet
1. Initialize pool with tokens from deployment config
2. Create user account
3. Test staking with different lock periods
4. Test emergency unstaking with penalty calculation
5. Test reward claiming
6. Test admin functions (pause/unpause)

## Frontend Integration

Update frontend environment variables:
```env
REACT_APP_PROGRAM_ID=Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS
REACT_APP_STAKING_MINT=<from deployment config>
REACT_APP_REWARD_MINT=<from deployment config>
REACT_APP_RPC_URL=https://lb.drpc.org/solana-devnet/Aqfm2hO8SEtdr3WkOHEz8w32Snnab04R8LTeEklbR4ac
```

## Mainnet Deployment Considerations

1. **Security Audit**: Complete security audit before mainnet
2. **Token Creation**: Deploy actual $WePee token on mainnet
3. **Program Authority**: Use multisig for program upgrade authority
4. **Treasury Setup**: Configure proper treasury accounts
5. **Monitoring**: Set up transaction monitoring and alerting
6. **Rate Limits**: Review and adjust rate limits for mainnet load

## Troubleshooting

### Common Issues
- **Insufficient SOL**: Ensure wallet has enough SOL for deployment
- **Program Size**: Large programs may need compute budget increases
- **RPC Limits**: Use dedicated RPC like dRPC for reliable deployment
- **Account Size**: Ensure adequate space allocation for user accounts

### Debug Commands
```bash
solana program show <PROGRAM_ID>
solana account <ACCOUNT_ADDRESS>
anchor test --skip-deploy  # Test without redeployment
```

## Support

For deployment issues:
1. Check Anchor documentation: https://www.anchor-lang.com/
2. Solana developer docs: https://docs.solana.com/
3. Test on localnet first before devnet deployment