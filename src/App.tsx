import { useState, useEffect } from 'react'
import WalletConnect from './components/WalletConnect'
import StakingInterface from './components/StakingInterface'
import Header from './components/Header'
import { initKonamiCode } from './utils/whimsy'
import { Sparkles, Zap } from 'lucide-react'

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [showSecretMessage, setShowSecretMessage] = useState(false)

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsWalletConnected(true)
  }

  const handleWalletDisconnect = () => {
    setWalletAddress('')
    setIsWalletConnected(false)
  }
  
  // Initialize Konami code easter egg
  useEffect(() => {
    const cleanup = initKonamiCode(() => {
      setShowSecretMessage(true)
      setTimeout(() => setShowSecretMessage(false), 5000)
    })
    
    return cleanup
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-background via-primary-background to-primary-text relative">
      <Header 
        isConnected={isWalletConnected}
        walletAddress={walletAddress}
        onDisconnect={handleWalletDisconnect}
      />
      
      {/* Main Staking Interface - Always Visible */}
      <main className={`container mx-auto px-4 py-8 transition-all duration-500 ${!isWalletConnected ? 'blur-sm scale-95' : 'blur-none scale-100'}`}>
        <StakingInterface />
      </main>

      {/* Wallet Connection Popup Overlay */}
      {!isWalletConnected && (
        <div className="fixed inset-0 bg-primary-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="relative max-w-md mx-4">
            {/* Floating particles */}
            <div className="absolute -top-10 -left-10 w-4 h-4 bg-primary-accent rounded-full animate-ping opacity-75" />
            <div className="absolute -top-5 -right-8 w-2 h-2 bg-primary-hover rounded-full animate-pulse" />
            <div className="absolute -bottom-8 -left-6 w-3 h-3 bg-primary-accent rounded-full animate-bounce" />
            <div className="absolute -bottom-5 -right-10 w-2 h-2 bg-primary-hover rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            
            {/* Main popup card */}
            <div className="card text-center p-8 transform animate-bounce-in relative overflow-hidden">
              {/* Sparkle overlay */}
              <div className="absolute inset-0 sparkle-container">
                <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary-accent/30 animate-pulse" />
                <Sparkles className="absolute bottom-6 left-6 w-4 h-4 text-primary-hover/40 animate-ping" style={{ animationDelay: '1s' }} />
                <Zap className="absolute top-6 left-4 w-5 h-5 text-primary-accent/25 animate-bounce" style={{ animationDelay: '0.7s' }} />
              </div>
              
              {/* Main content */}
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float">💩</div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-accent mb-4 glow leading-tight">
                  CONNECT WALLET
                  <br />
                  <span className="text-2xl md:text-3xl bg-gradient-to-r from-primary-accent to-primary-hover bg-clip-text text-transparent">
                    TO STAKE ZK POOP
                  </span>
                </h1>
                
                <p className="text-lg text-primary-accent/80 mb-8 leading-relaxed">
                  Start earning rewards by staking your ZK POOP tokens
                  <br />
                  <span className="text-sm text-primary-accent/60">✨ High APY • 🚀 Instant Rewards • 💎 No Lock Period</span>
                </p>
                
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <WalletConnect onConnect={handleWalletConnect} />
                </div>
                
                <div className="mt-6 flex items-center justify-center space-x-2 text-primary-accent/60 text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Secure • Decentralized • Community Driven</span>
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Secret Message */}
      {showSecretMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-primary-accent text-primary-text px-8 py-4 rounded-full shadow-2xl fade-in-up z-50">
          <p className="font-bold flex items-center">
            🎆 You found the secret! You're a true DeFi wizard! 🧿‍♂️
          </p>
        </div>
      )}
    </div>
  )
}

export default App