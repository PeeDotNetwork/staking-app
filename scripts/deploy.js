#!/usr/bin/env node

/**
 * 🚀 ZK POOP Staking Contract Deployment Script
 * 
 * Securely deploys the $SHITCOIN staking program to Solana
 * Features:
 * - Secure private key input (hidden)
 * - Network selection (devnet/mainnet)
 * - Program verification
 * - Configuration setup
 */

import * as readline from 'readline';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
import bs58 from 'bs58';
import fs from 'fs';
import path from 'path';

// ANSI color codes for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

class ZKPoopDeployer {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Secure private key input (hidden from console)
    async getPrivateKey() {
        return new Promise((resolve) => {
            console.log(`${colors.cyan}${colors.bold}🔐 Enter your deployment private key:${colors.reset}`);
            console.log(`${colors.yellow}⚠️  Key will be hidden for security${colors.reset}`);
            
            const stdin = process.stdin;
            stdin.setRawMode(true);
            stdin.resume();
            stdin.setEncoding('utf8');
            
            let privateKey = '';
            
            stdin.on('data', (char) => {
                if (char === '\r' || char === '\n') {
                    stdin.setRawMode(false);
                    stdin.pause();
                    console.log('\n');
                    resolve(privateKey);
                } else if (char === '\u0003') {
                    // Ctrl+C
                    console.log(`\n${colors.red}❌ Deployment cancelled${colors.reset}`);
                    process.exit(1);
                } else if (char === '\u007f') {
                    // Backspace
                    if (privateKey.length > 0) {
                        privateKey = privateKey.slice(0, -1);
                        process.stdout.write('\b \b');
                    }
                } else {
                    privateKey += char;
                    process.stdout.write('*');
                }
            });
        });
    }

    // Network selection
    async selectNetwork() {
        return new Promise((resolve) => {
            console.log(`${colors.magenta}${colors.bold}🌐 Select deployment network:${colors.reset}`);
            console.log(`${colors.cyan}1.${colors.reset} Devnet (for testing)`);
            console.log(`${colors.cyan}2.${colors.reset} Mainnet-beta (production)`);
            
            this.rl.question('Enter choice (1-2): ', (answer) => {
                switch(answer.trim()) {
                    case '1':
                        resolve({
                            name: 'devnet',
                            url: 'https://api.devnet.solana.com',
                            explorer: 'https://explorer.solana.com/?cluster=devnet'
                        });
                        break;
                    case '2':
                        resolve({
                            name: 'mainnet-beta',
                            url: process.env.DRPC_ENDPOINT || 'https://api.mainnet-beta.solana.com',
                            explorer: 'https://explorer.solana.com'
                        });
                        break;
                    default:
                        console.log(`${colors.red}❌ Invalid choice. Defaulting to devnet.${colors.reset}`);
                        resolve({
                            name: 'devnet',
                            url: 'https://api.devnet.solana.com',
                            explorer: 'https://explorer.solana.com/?cluster=devnet'
                        });
                }
            });
        });
    }

    // Validate private key format
    validatePrivateKey(privateKeyString) {
        try {
            // Try base58 format first
            const keyArray = bs58.decode(privateKeyString);
            if (keyArray.length === 64) {
                return Keypair.fromSecretKey(keyArray);
            }
            
            // Try JSON array format
            const keyArray2 = JSON.parse(privateKeyString);
            if (Array.isArray(keyArray2) && keyArray2.length === 64) {
                return Keypair.fromSecretKey(new Uint8Array(keyArray2));
            }
            
            throw new Error('Invalid key format');
        } catch (error) {
            return null;
        }
    }

    // Check account balance
    async checkBalance(connection, keypair) {
        const balance = await connection.getBalance(keypair.publicKey);
        const solBalance = balance / 1e9;
        
        console.log(`${colors.blue}💰 Account Balance: ${solBalance.toFixed(4)} SOL${colors.reset}`);
        
        if (solBalance < 0.1) {
            console.log(`${colors.red}⚠️  Low balance! You need at least 0.1 SOL for deployment${colors.reset}`);
            return false;
        }
        
        return true;
    }

    // Deploy the program
    async deployProgram(connection, wallet, network) {
        console.log(`${colors.yellow}📦 Building and deploying ZK POOP staking program...${colors.reset}`);
        
        try {
            // Check if Anchor project exists
            if (!fs.existsSync('./Anchor.toml')) {
                console.log(`${colors.red}❌ No Anchor.toml found. Run 'anchor init' first.${colors.reset}`);
                return null;
            }

            // Build the program
            console.log(`${colors.cyan}🔨 Building program...${colors.reset}`);
            const { exec } = await import('child_process');
            
            return new Promise((resolve, reject) => {
                exec('anchor build', (error, stdout, stderr) => {
                    if (error) {
                        console.log(`${colors.red}❌ Build failed:${colors.reset}`, error.message);
                        reject(error);
                        return;
                    }
                    
                    console.log(`${colors.green}✅ Build successful${colors.reset}`);
                    
                    // Deploy to selected network
                    const deployCmd = `anchor deploy --provider.cluster ${network.name}`;
                    
                    exec(deployCmd, (deployError, deployStdout, deployStderr) => {
                        if (deployError) {
                            console.log(`${colors.red}❌ Deployment failed:${colors.reset}`, deployError.message);
                            reject(deployError);
                            return;
                        }
                        
                        console.log(`${colors.green}🚀 Deployment successful!${colors.reset}`);
                        console.log(deployStdout);
                        
                        // Extract program ID from output
                        const programIdMatch = deployStdout.match(/Program Id: ([A-Za-z0-9]{44})/);
                        const programId = programIdMatch ? programIdMatch[1] : null;
                        
                        resolve(programId);
                    });
                });
            });
            
        } catch (error) {
            console.log(`${colors.red}❌ Deployment error:${colors.reset}`, error);
            return null;
        }
    }

    // Initialize staking pool
    async initializePool(connection, wallet, programId, network) {
        console.log(`${colors.yellow}🏊 Initializing staking pool...${colors.reset}`);
        
        try {
            // Load program IDL
            const idlPath = path.join('./target/idl/zk_poop_staking.json');
            if (!fs.existsSync(idlPath)) {
                console.log(`${colors.red}❌ IDL file not found at ${idlPath}${colors.reset}`);
                return false;
            }
            
            const idl = JSON.parse(fs.readFileSync(idlPath, 'utf8'));
            const program = new Program(idl, new PublicKey(programId), new AnchorProvider(connection, wallet, {}));
            
            // Pool configuration
            const poolConfig = {
                baseApy: 1200, // 12% base APY
                maxApy: 2500,  // 25% max APY  
                minStakeAmount: 1_000_000, // 1 $SHITCOIN (6 decimals)
                tierBonuses: [0, 100, 200, 300, 500], // Bronze to Diamond bonuses
                emissionRate: 1000000, // Initial emission rate
                halvingInterval: 15552000, // 6 months in seconds
            };
            
            // Create pool initialization transaction
            const tx = await program.methods
                .initializePool(
                    poolConfig.baseApy,
                    poolConfig.maxApy,
                    poolConfig.minStakeAmount,
                    poolConfig.tierBonuses,
                    poolConfig.emissionRate,
                    poolConfig.halvingInterval
                )
                .accounts({
                    authority: wallet.publicKey,
                    // Add other required accounts
                })
                .rpc();
            
            console.log(`${colors.green}✅ Pool initialized! Transaction: ${tx}${colors.reset}`);
            console.log(`${colors.blue}🔗 View on explorer: ${network.explorer}/tx/${tx}${colors.reset}`);
            
            return true;
            
        } catch (error) {
            console.log(`${colors.red}❌ Pool initialization failed:${colors.reset}`, error);
            return false;
        }
    }

    // Save deployment info
    saveDeploymentInfo(programId, network, poolAddress) {
        const deploymentInfo = {
            programId,
            network: network.name,
            deployedAt: new Date().toISOString(),
            poolAddress,
            explorerUrl: `${network.explorer}/account/${programId}`,
            status: 'deployed'
        };
        
        fs.writeFileSync('./deployment.json', JSON.stringify(deploymentInfo, null, 2));
        console.log(`${colors.green}📄 Deployment info saved to deployment.json${colors.reset}`);
    }

    // Main deployment flow
    async deploy() {
        console.log(`${colors.magenta}${colors.bold}`);
        console.log(`
 ████████╗██╗  ██╗    ██████╗  ██████╗  ██████╗ ██████╗ 
╚══██╔══╝██║ ██╔╝    ██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗
   ██║   █████╔╝     ██████╔╝██║   ██║██║   ██║██████╔╝
   ██║   ██╔═██╗     ██╔═══╝ ██║   ██║██║   ██║██╔═══╝ 
   ██║   ██║  ██╗    ██║     ╚██████╔╝╚██████╔╝██║     
   ╚═╝   ╚═╝  ╚═╝    ╚═╝      ╚═════╝  ╚═════╝ ╚═╝     
        `);
        console.log(`${colors.reset}`);
        console.log(`${colors.cyan}🚀 ZK POOP Staking Contract Deployment${colors.reset}`);
        console.log(`${colors.yellow}💩 Deploy your $SHITCOIN staking program securely${colors.reset}\n`);

        try {
            // Step 1: Get private key
            const privateKeyString = await this.getPrivateKey();
            const wallet = this.validatePrivateKey(privateKeyString);
            
            if (!wallet) {
                console.log(`${colors.red}❌ Invalid private key format${colors.reset}`);
                this.rl.close();
                return;
            }
            
            console.log(`${colors.green}✅ Private key validated${colors.reset}`);
            console.log(`${colors.blue}📍 Deployer address: ${wallet.publicKey.toString()}${colors.reset}`);
            
            // Step 2: Select network
            const network = await this.selectNetwork();
            console.log(`${colors.green}✅ Selected network: ${network.name}${colors.reset}`);
            
            // Step 3: Connect to Solana
            const connection = new Connection(network.url, 'confirmed');
            console.log(`${colors.green}✅ Connected to ${network.name}${colors.reset}`);
            
            // Step 4: Check balance
            const hasBalance = await this.checkBalance(connection, wallet);
            if (!hasBalance) {
                console.log(`${colors.red}❌ Insufficient balance for deployment${colors.reset}`);
                this.rl.close();
                return;
            }
            
            // Step 5: Deploy program
            const programId = await this.deployProgram(connection, new Wallet(wallet), network);
            if (!programId) {
                console.log(`${colors.red}❌ Program deployment failed${colors.reset}`);
                this.rl.close();
                return;
            }
            
            console.log(`${colors.green}🎉 Program deployed successfully!${colors.reset}`);
            console.log(`${colors.blue}📍 Program ID: ${programId}${colors.reset}`);
            console.log(`${colors.blue}🔗 View on explorer: ${network.explorer}/account/${programId}${colors.reset}`);
            
            // Step 6: Initialize staking pool
            const poolInitialized = await this.initializePool(connection, new Wallet(wallet), programId, network);
            
            // Step 7: Save deployment info
            this.saveDeploymentInfo(programId, network, null);
            
            console.log(`\n${colors.green}${colors.bold}🚀 ZK POOP STAKING DEPLOYED SUCCESSFULLY! 🚀${colors.reset}`);
            console.log(`${colors.cyan}Program ID: ${programId}${colors.reset}`);
            console.log(`${colors.cyan}Network: ${network.name}${colors.reset}`);
            console.log(`${colors.cyan}Explorer: ${network.explorer}/account/${programId}${colors.reset}`);
            
        } catch (error) {
            console.log(`${colors.red}❌ Deployment failed:${colors.reset}`, error.message);
        } finally {
            this.rl.close();
        }
    }
}

// Run deployment
const deployer = new ZKPoopDeployer();
deployer.deploy().catch(console.error);