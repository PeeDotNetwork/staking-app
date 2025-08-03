import { useState, useEffect } from 'react'
import { Wallet, AlertCircle, Shield, Sparkles, CheckCircle, Fingerprint, Key } from 'lucide-react'
import { getEncouragingMessage, getLoadingMessage, createConfetti, createSparkle, playHapticFeedback, addBounceEffect, createFloatingEmoji } from '../utils/whimsy'

interface WalletConnectProps {
  onConnect: (address: string) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState('')
  const [loadingMessage, setLoadingMessage] = useState(getLoadingMessage())
  const [walletType, setWalletType] = useState<'metamask' | 'phantom' | 'trust' | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    setError('')
    setLoadingMessage(getLoadingMessage())
    playHapticFeedback()
    
    // Random wallet type for fun
    const wallets: ('metamask' | 'phantom' | 'trust')[] = ['metamask', 'phantom', 'trust']
    setWalletType(wallets[Math.floor(Math.random() * wallets.length)])
    
    // Update loading message periodically
    const loadingInterval = setInterval(() => {
      setLoadingMessage(getLoadingMessage())
    }, 1000)

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate a mock wallet address for demo
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
      
      // Success celebration!
      createConfetti(25)
      setShowSuccess(true)
      
      // Animate the button
      const button = document.querySelector('.connect-button') as HTMLElement
      if (button) {
        addBounceEffect(button)
        const rect = button.getBoundingClientRect()
        createFloatingEmoji('🎉', rect.left + rect.width / 2, rect.top)
      }
      
      setTimeout(() => {
        onConnect(mockAddress)
      }, 500)
    } catch {
      setError(getEncouragingMessage('error'))
      playHapticFeedback()
    } finally {
      clearInterval(loadingInterval)
      setIsConnecting(false)
      setWalletType(null)
    }
  }

  // Add sparkles effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const card = document.querySelector('.wallet-card')
      if (card && !isConnecting) {
        createSparkle(card as HTMLElement)
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isConnecting])

  return (
    <div className="card max-w-md w-full glow pulse-glow wallet-card sparkle-container">
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <Wallet className="w-16 h-16 text-primary-accent mx-auto mb-4 float-animation" />
          <Shield className="w-6 h-6 text-primary-accent absolute -bottom-1 -right-1 wiggle-hover" />
        </div>
        <h2 className="text-2xl font-bold text-primary-accent mb-2">Connect Wallet</h2>
        <p className="text-primary-accent/70">
          {showSuccess ? getEncouragingMessage('connect') : 'Connect your wallet to access staking features'}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center space-x-2 fade-in-up">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 wiggle-hover" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}
      
      {showSuccess && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-center fade-in-up success-animation">
          <CheckCircle className="w-5 h-5 text-green-400 inline mr-2" />
          <span className="text-green-400 text-sm">Wallet connected successfully!</span>
        </div>
      )}

      {/* Wallet Options (for fun) */}
      {!isConnecting && !showSuccess && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 rounded-lg hover:bg-primary-accent/10 transition-colors cursor-pointer group" onClick={() => createSparkle(event?.currentTarget as HTMLElement)}>
            <div className="w-10 h-10 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">🦊</div>
            <span className="text-xs text-primary-accent/70">MetaMask</span>
          </div>
          <div className="text-center p-2 rounded-lg hover:bg-primary-accent/10 transition-colors cursor-pointer group" onClick={() => createSparkle(event?.currentTarget as HTMLElement)}>
            <div className="w-10 h-10 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">👻</div>
            <span className="text-xs text-primary-accent/70">Phantom</span>
          </div>
          <div className="text-center p-2 rounded-lg hover:bg-primary-accent/10 transition-colors cursor-pointer group" onClick={() => createSparkle(event?.currentTarget as HTMLElement)}>
            <div className="w-10 h-10 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">🔐</div>
            <span className="text-xs text-primary-accent/70">Trust</span>
          </div>
        </div>
      )}

      <button
        onClick={handleConnect}
        disabled={isConnecting || showSuccess}
        className="btn-primary connect-button w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group text-lg py-4 font-bold shadow-2xl hover:shadow-primary-accent/30"
      >
        {isConnecting ? (
          <>
            {walletType === 'metamask' && <span className="text-2xl mr-2">🦊</span>}
            {walletType === 'phantom' && <span className="text-2xl mr-2">👻</span>}
            {walletType === 'trust' && <span className="text-2xl mr-2">🔐</span>}
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
            <span className="ml-2">{loadingMessage}</span>
          </>
        ) : showSuccess ? (
          <>
            <CheckCircle className="w-5 h-5 success-animation" />
            <span>Connected!</span>
            <Sparkles className="w-5 h-5 ml-2" />
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Connect Wallet</span>
            <Key className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </button>

      <div className="mt-4 text-center tooltip">
        <p className="text-primary-accent/50 text-sm cursor-help flex items-center justify-center">
          <Fingerprint className="w-4 h-4 mr-1" />
          Demo mode - No real wallet required
        </p>
        <div className="tooltip-content">
          Your funds are SAFU 😎
        </div>
      </div>
    </div>
  )
}