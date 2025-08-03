import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertCircle, Rocket, Star, Heart, Lock } from 'lucide-react'
import { getEncouragingMessage, getLoadingMessage, createConfetti, addBounceEffect, playHapticFeedback, createFloatingEmoji } from '../utils/whimsy'
import LockPeriodSelector, { LOCK_PERIODS } from './LockPeriodSelector'
import EmergencyUnlockCalculator from './EmergencyUnlockCalculator'

interface StakeFormProps {
  availableBalance: number
  stakedAmount: number
  lockPeriod?: string
  lockStartTime?: number
  lockEndTime?: number
  lockMultiplier?: number
  onStake: (amount: number, lockPeriod: string) => void
  onUnstake: (amount: number) => void
  onEmergencyUnlock?: (returnAmount: number, penaltyAmount: number) => void
}

export default function StakeForm({ 
  availableBalance, 
  stakedAmount,
  lockPeriod = 'oneDay',
  lockStartTime,
  lockEndTime,
  lockMultiplier = 1.0, // Currently used in parent component
  onStake, 
  onUnstake,
  onEmergencyUnlock
}: StakeFormProps) {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake' | 'emergency'>('stake')
  const [amount, setAmount] = useState('')
  const [selectedLockPeriod, setSelectedLockPeriod] = useState(lockPeriod)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loadingMessage, setLoadingMessage] = useState(getLoadingMessage())
  const [hoverPercentage, setHoverPercentage] = useState<number | null>(null)
  
  // Prevent unused variable warnings
  console.log('Lock multiplier:', lockMultiplier)

  const maxAmount = activeTab === 'stake' ? availableBalance : stakedAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    
    const numAmount = parseFloat(amount)
    
    if (!numAmount || numAmount <= 0) {
      setError(getEncouragingMessage('error'))
      playHapticFeedback()
      return
    }
    
    if (numAmount > maxAmount) {
      setError(`Insufficient ${activeTab === 'stake' ? 'balance' : 'staked amount'} ${activeTab === 'stake' ? '😅' : '🤔'}`)
      playHapticFeedback()
      return
    }
    
    // Check minimum stake for selected lock period
    if (activeTab === 'stake') {
      const selectedPeriod = LOCK_PERIODS.find(p => p.id === selectedLockPeriod)
      if (selectedPeriod && numAmount < selectedPeriod.minStake) {
        setError(`Minimum stake for ${selectedPeriod.name} is ${selectedPeriod.minStake} TOKEN 🔒`)
        playHapticFeedback()
        return
      }
    }

    setIsProcessing(true)
    setLoadingMessage(getLoadingMessage())
    
    // Update loading message periodically
    const loadingInterval = setInterval(() => {
      setLoadingMessage(getLoadingMessage())
    }, 1000)
    
    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (activeTab === 'stake') {
        onStake(numAmount, selectedLockPeriod)
      } else {
        onUnstake(numAmount)
      }
      
      // Success celebration!
      createConfetti(20)
      setSuccessMessage(getEncouragingMessage(activeTab === 'emergency' ? 'unstake' : activeTab))
      
      // Show floating emoji at button position
      const button = e.currentTarget.querySelector('button[type="submit"]')
      if (button) {
        const rect = button.getBoundingClientRect()
        createFloatingEmoji(activeTab === 'stake' ? '🚀' : '💸', rect.left + rect.width / 2, rect.top)
        addBounceEffect(button as HTMLElement)
      }
      
      setAmount('')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch {
      setError(getEncouragingMessage('error'))
    } finally {
      clearInterval(loadingInterval)
      setIsProcessing(false)
    }
  }

  const setMaxAmount = () => {
    setAmount(maxAmount.toString())
  }

  const setPercentageAmount = (percentage: number) => {
    const calculatedAmount = (maxAmount * percentage) / 100
    setAmount(calculatedAmount.toFixed(6))
    playHapticFeedback()
    
    // Create sparkle effect on percentage button
    const button = document.querySelector(`[data-percentage="${percentage}"]`)
    if (button) {
      addBounceEffect(button as HTMLElement)
    }
  }

  const hasActiveStake = stakedAmount > 0 && lockEndTime && lockEndTime > Date.now() / 1000
  const showEmergencyTab = hasActiveStake && lockPeriod !== 'oneDay'

  return (
    <div className="card">
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('stake')}
          className={`flex-1 py-3 px-4 ${showEmergencyTab ? 'rounded-l-lg' : 'rounded-l-lg'} font-semibold transition-all duration-200 group ${
            activeTab === 'stake'
              ? 'bg-primary-accent text-primary-text'
              : 'bg-primary-secondary/30 text-primary-accent border border-primary-accent/30 hover:bg-primary-secondary/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2 group-hover:scale-110 transition-transform" />
          Stake
          <Rocket className="w-4 h-4 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button
          onClick={() => setActiveTab('unstake')}
          className={`flex-1 py-3 px-4 ${showEmergencyTab ? '' : 'rounded-r-lg'} font-semibold transition-all duration-200 group ${
            activeTab === 'unstake'
              ? 'bg-primary-accent text-primary-text'
              : 'bg-primary-secondary/30 text-primary-accent border border-primary-accent/30 hover:bg-primary-secondary/50'
          }`}
        >
          <TrendingDown className="w-4 h-4 inline mr-2 group-hover:scale-110 transition-transform" />
          Unstake
          <Heart className="w-4 h-4 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        {showEmergencyTab && (
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-3 px-4 rounded-r-lg font-semibold transition-all duration-200 group ${
              activeTab === 'emergency'
                ? 'bg-yellow-500 text-primary-text'
                : 'bg-primary-secondary/30 text-yellow-400 border border-yellow-400/30 hover:bg-primary-secondary/50'
            }`}
          >
            <AlertCircle className="w-4 h-4 inline mr-2 group-hover:scale-110 transition-transform" />
            Emergency
            <Lock className="w-4 h-4 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>

      {activeTab === 'emergency' ? (
        <EmergencyUnlockCalculator
          stakedAmount={stakedAmount}
          lockPeriod={lockPeriod}
          lockStartTime={lockStartTime || 0}
          lockEndTime={lockEndTime || 0}
          onEmergencyUnlock={onEmergencyUnlock}
        />
      ) : (
        <>
          {/* Lock Period Selector (only for staking) */}
          {activeTab === 'stake' && (
            <div className="mb-6">
              <LockPeriodSelector
                selectedPeriod={selectedLockPeriod}
                onPeriodChange={setSelectedLockPeriod}
                stakingAmount={parseFloat(amount) || 0}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-primary-accent font-semibold mb-2">
            Amount to {activeTab}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.000001"
              min="0"
              max={maxAmount}
              className="input-field w-full pr-20"
            />
            <button
              type="button"
              onClick={setMaxAmount}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-accent/20 hover:bg-primary-accent/30 text-primary-accent px-3 py-1 rounded text-sm font-semibold transition-all hover:scale-105 group"
            >
              MAX
              <Star className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <div className="text-sm text-primary-accent/70 mt-1">
            Available: {maxAmount.toFixed(6)} TOKEN
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              type="button"
              data-percentage={percentage}
              onClick={() => setPercentageAmount(percentage)}
              onMouseEnter={() => setHoverPercentage(percentage)}
              onMouseLeave={() => setHoverPercentage(null)}
              className="btn-secondary text-sm py-2 relative overflow-hidden group"
            >
              <span className="relative z-10">{percentage}%</span>
              {hoverPercentage === percentage && (
                <span className="absolute inset-0 bg-primary-accent/20 shimmer"></span>
              )}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2 fade-in-up">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 wiggle-hover" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center text-green-400 text-sm fade-in-up success-animation">
            {successMessage}
          </div>
        )}

            <button
              type="submit"
              disabled={isProcessing || !amount}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isProcessing ? (
                <>
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                  <span className="ml-2">{loadingMessage}</span>
                </>
              ) : (
                <>
                  {activeTab === 'stake' 
                    ? `Stake TOKEN (${LOCK_PERIODS.find(p => p.id === selectedLockPeriod)?.multiplier}x multiplier)`
                    : 'Unstake TOKEN'
                  }
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {activeTab === 'stake' ? '🚀' : '💰'}
                  </span>
                </>
              )}
            </button>
          </form>
        </>
      )}

      {/* Transaction Simulation Notice */}
      <div className="mt-4 p-3 bg-primary-accent/10 rounded-lg tooltip">
        <p className="text-primary-accent/70 text-xs text-center cursor-help">
          ⚠️ Demo Mode: All transactions are simulated
        </p>
        <div className="tooltip-content">
          Real $WePee staking with lock periods coming soon! 🌟
        </div>
      </div>
    </div>
  )
}