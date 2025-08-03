import { useState, useEffect } from 'react'
import { AlertTriangle, Calculator, DollarSign, Flame, PiggyBank, Building } from 'lucide-react'
import { playHapticFeedback, createSparkle, addBounceEffect } from '../utils/whimsy'

interface EmergencyUnlockCalculatorProps {
  stakedAmount: number
  lockPeriod: string
  lockStartTime: number // Unix timestamp
  lockEndTime: number   // Unix timestamp
  onEmergencyUnlock?: (returnAmount: number, penaltyAmount: number) => void
}

export default function EmergencyUnlockCalculator({
  stakedAmount,
  lockPeriod,
  lockStartTime,
  lockEndTime,
  onEmergencyUnlock
}: EmergencyUnlockCalculatorProps) {
  const [currentTime, setCurrentTime] = useState(Date.now() / 1000)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Update current time every second for real-time calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now() / 1000)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Calculate penalty based on remaining time
  const calculatePenalty = () => {
    const timeRemaining = Math.max(0, lockEndTime - currentTime)
    const totalLockDuration = lockEndTime - lockStartTime
    
    if (timeRemaining <= 0) {
      return { penaltyPercent: 0, penaltyAmount: 0, returnAmount: stakedAmount }
    }
    
    // Progressive penalty: 33% max when just locked, 0% when lock expires
    const remainingRatio = timeRemaining / totalLockDuration
    const penaltyPercent = Math.min(33, remainingRatio * 33)
    const penaltyAmount = (stakedAmount * penaltyPercent) / 100
    const returnAmount = stakedAmount - penaltyAmount
    
    return { penaltyPercent, penaltyAmount, returnAmount }
  }

  const { penaltyPercent, penaltyAmount, returnAmount } = calculatePenalty()
  
  // Penalty distribution (40% burn, 40% rewards pool, 20% treasury)
  const burnAmount = penaltyAmount * 0.4
  const rewardsPoolAmount = penaltyAmount * 0.4  
  const treasuryAmount = penaltyAmount * 0.2

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const handleEmergencyUnlock = async () => {
    if (!onEmergencyUnlock) return
    
    setIsProcessing(true)
    playHapticFeedback()
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onEmergencyUnlock(returnAmount, penaltyAmount)
      setShowConfirmation(false)
      
      // Show success effect
      const button = document.querySelector('.emergency-unlock-btn') as HTMLElement
      if (button) {
        createSparkle(button)
        addBounceEffect(button)
      }
    } catch (error) {
      console.error('Emergency unlock failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Don't show if lock has expired
  if (currentTime >= lockEndTime) {
    return (
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex items-center space-x-2 text-green-400">
          <PiggyBank className="w-5 h-5" />
          <span className="font-semibold">Lock Period Complete! 🎉</span>
        </div>
        <p className="text-green-400/80 text-sm mt-1">
          You can now unstake without any penalties.
        </p>
      </div>
    )
  }

  // Don't show for 24-hour locks (no emergency unlock allowed)
  if (lockPeriod === 'oneDay') {
    return (
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center space-x-2 text-yellow-400">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">24-Hour Lock Active</span>
        </div>
        <p className="text-yellow-400/80 text-sm mt-1">
          Emergency unlock not available for 24-hour locks. Please wait {formatTime(lockEndTime - currentTime)}.
        </p>
      </div>
    )
  }

  if (showConfirmation) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400 mb-3">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-bold text-lg">⚠️ CONFIRM EMERGENCY UNLOCK</span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500/5 p-3 rounded">
                <div className="text-red-400/70">You'll Receive:</div>
                <div className="font-bold text-red-400 text-lg">{returnAmount.toFixed(2)} TOKEN</div>
              </div>
              <div className="bg-red-500/5 p-3 rounded">
                <div className="text-red-400/70">Penalty ({penaltyPercent.toFixed(1)}%):</div>
                <div className="font-bold text-red-400 text-lg">{penaltyAmount.toFixed(2)} TOKEN</div>
              </div>
            </div>
            
            <div className="p-3 bg-red-500/5 rounded">
              <div className="text-red-400/70 text-xs mb-2">Penalty Distribution:</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <Flame className="w-4 h-4 mx-auto mb-1 text-red-400" />
                  <div className="text-red-400/70">Burned</div>
                  <div className="font-semibold text-red-400">{burnAmount.toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <PiggyBank className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                  <div className="text-yellow-400/70">Rewards Pool</div>
                  <div className="font-semibold text-yellow-400">{rewardsPoolAmount.toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <Building className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  <div className="text-blue-400/70">Treasury</div>
                  <div className="font-semibold text-blue-400">{treasuryAmount.toFixed(1)}</div>
                </div>
              </div>
            </div>
            
            <p className="text-red-400/80 text-xs bg-red-500/5 p-2 rounded">
              🚨 This action cannot be undone. You will lose {penaltyAmount.toFixed(2)} TOKEN permanently.
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 btn-secondary text-sm"
            >
              Cancel - Keep Staking
            </button>
            <button
              onClick={handleEmergencyUnlock}
              disabled={isProcessing}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 emergency-unlock-btn"
            >
              {isProcessing ? (
                <>
                  <div className="loading-dots inline-flex">
                    <div className="loading-dot bg-white"></div>
                    <div className="loading-dot bg-white"></div>
                    <div className="loading-dot bg-white"></div>
                  </div>
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                'Confirm Emergency Unlock'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center space-x-2 text-yellow-400 mb-3">
          <Calculator className="w-5 h-5" />
          <span className="font-bold">Emergency Unlock Calculator</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400/70">Time Remaining:</span>
              <span className="font-semibold text-yellow-400">{formatTime(lockEndTime - currentTime)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400/70">Current Penalty:</span>
              <span className="font-semibold text-red-400">{penaltyPercent.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400/70">Staked Amount:</span>
              <span className="font-semibold text-primary-accent">{stakedAmount.toFixed(2)} TOKEN</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400/70">You'd Receive:</span>
              <span className="font-semibold text-green-400">{returnAmount.toFixed(2)} TOKEN</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400/70">Penalty Amount:</span>
              <span className="font-semibold text-red-400">{penaltyAmount.toFixed(2)} TOKEN</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400/70">Penalty Decreases:</span>
              <span className="font-semibold text-blue-400">Over Time ⏰</span>
            </div>
          </div>
        </div>
        
        {/* Penalty visualization bar */}
        <div className="mb-4">
          <div className="text-xs text-yellow-400/70 mb-1">Penalty Timeline</div>
          <div className="w-full bg-green-500/20 rounded-full h-2 relative">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${penaltyPercent * 3.03}%` }} // Scale to fit 0-100%
            />
            <div className="absolute right-0 top-0 h-2 w-1 bg-green-500 rounded-full" />
          </div>
          <div className="flex justify-between text-xs text-yellow-400/60 mt-1">
            <span>Now ({penaltyPercent.toFixed(1)}%)</span>
            <span>Lock End (0%)</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 px-4 py-3 rounded-lg font-semibold transition-all group"
        >
          <DollarSign className="w-4 h-4 inline mr-2 group-hover:scale-110 transition-transform" />
          Emergency Unlock ({penaltyPercent.toFixed(1)}% penalty)
          <AlertTriangle className="w-4 h-4 inline ml-2 wiggle-hover" />
        </button>
        
        <p className="text-yellow-400/60 text-xs mt-2 text-center">
          💡 Penalty decreases over time - wait longer to pay less!
        </p>
      </div>
    </div>
  )
}