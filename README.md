# 🚽 PEE Network - ZK POOP Staking Interface

A sophisticated staking interface for the PEE Network's ZK POOP token - where privacy meets productivity. Built with React, TypeScript, and Tailwind CSS featuring a premium purple and gold design system.

## ✨ Features

- **🔐 Wallet Connection**: Secure wallet integration with MetaMask and WalletConnect support
- **💰 Staking Interface**: Stake and unstake ZK POOP tokens with real-time balance updates
- **🎁 Rewards System**: View and claim pending rewards with competitive APY calculations
- **📊 Real-time Updates**: Live reward accumulation and staking statistics
- **📱 Responsive Design**: Mobile-first responsive design for all devices
- **🎨 Premium UI**: Sophisticated purple/gold color scheme with smooth animations
- **⚡ ZK Privacy**: Zero-knowledge proof integration for private staking
- **🏆 Gamification**: Achievement system and staking milestones

## 🎨 Design System

### Color Palette
- **Primary Background**: `#3C2750` (Royal Purple) - Sophisticated and professional
- **Primary Accent**: `#F5C93A` (Liquid Gold) - Premium highlights and CTAs
- **Text Primary**: `#1F1528` (Deep Purple) - High contrast readability
- **Secondary Purple**: `#5A3F75` (Mystical Purple) - Secondary elements
- **Button Hover**: `#FFD74D` (Bright Gold) - Interactive states
- **Success**: `#10B981` (Emerald Green) - Positive actions
- **Warning**: `#F59E0B` (Amber) - Caution states

### Typography
- **Font Family**: Inter - Modern, clean, and highly legible
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Visual Effects
- Smooth transitions and micro-animations
- Subtle shadows and depth layers
- Gradient overlays and glassmorphism effects

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/peenetwork/stake.git
cd stake

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx           # App header with wallet info and branding
│   ├── WalletConnect.tsx    # Multi-wallet connection component
│   ├── StakingInterface.tsx # Main staking dashboard with analytics
│   ├── StakeForm.tsx        # Advanced stake/unstake form with validation
│   └── RewardsPanel.tsx     # Rewards display, claiming, and APY calculator
├── utils/
│   ├── constants.ts         # App constants and configuration
│   ├── formatters.ts        # Number and currency formatting utilities
│   └── validators.ts        # Form validation helpers
├── App.tsx                  # Main app component with routing
├── main.tsx                # React entry point
└── index.css               # Global styles and Tailwind configuration
```

## 🧩 Key Components

### 🔗 WalletConnect
- Multi-wallet support (MetaMask, WalletConnect, Coinbase Wallet)
- Secure connection handling with error recovery
- Account switching and network validation
- Connection state persistence

### 📊 StakingInterface
- Comprehensive dashboard with key metrics
- Real-time staking statistics and portfolio overview
- Interactive charts and data visualizations
- Staking pool information and performance analytics

### 💳 StakeForm
- Intelligent dual-mode form (stake/unstake)
- Advanced amount validation with balance checks
- Quick-select percentage buttons (25%, 50%, 75%, 100%)
- Transaction preview with gas estimation
- Confirmation modals with transaction details

### 🎁 RewardsPanel
- Live rewards tracking with countdown timers
- Detailed APY breakdown and projection calculator
- One-click rewards claiming with batch processing
- Rewards history and analytics
- Auto-compound options

## 🎮 Demo Features

- **Simulated Staking**: Full staking flow simulation without real blockchain interaction
- **Mock Data**: Realistic wallet addresses and transaction data for demonstration
- **Live Updates**: Real-time reward accumulation and balance updates
- **Interactive UI**: Smooth animations, transitions, and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Professional loading indicators and skeleton screens

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - Latest React with concurrent features and TypeScript
- **TypeScript** - Type-safe development with strict mode enabled
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom configuration

### UI & Design
- **Lucide React** - Beautiful, customizable SVG icons
- **Custom Design System** - Purple/gold theme with premium aesthetics
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### Development Tools
- **ESLint** - Code quality and consistency enforcement
- **PostCSS** - CSS processing and optimization
- **Git** - Version control with conventional commits

### Future Integrations
- **Web3.js/Ethers.js** - Blockchain integration (coming soon)
- **WalletConnect v2** - Enhanced wallet connectivity
- **Chart.js** - Advanced data visualization

## 🚨 Important Notes

- **Demo Application**: This is a demonstration interface showcasing staking design patterns
- **Simulated Transactions**: All wallet connections and transactions are simulated
- **No Real Assets**: No real cryptocurrency or tokens are involved in this demo
- **Educational Purpose**: Built for learning and showcasing modern DeFi interface design
- **PEE Network**: Part of the humorous PEE Network ecosystem - where blockchain meets bathroom humor

## 🤝 Contributing

We welcome contributions to improve the PEE Network staking interface!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌐 Links

- **Live Demo**: [Coming Soon]
- **PEE Network**: [peenetwork.org]
- **Documentation**: [docs.peenetwork.org]
- **Community**: [Discord/Twitter Links]

---

**Built with 💜 by the PEE Network team**

*Remember: In the PEE Network, we believe that great ideas can come from anywhere - even the bathroom!* 🚽✨