import { useState, useEffect } from 'react'
import { Gift, TrendingUp, AlertCircle, Star, Crown, Trophy, Zap } from 'lucide-react'
import { getEncouragingMessage, createConfetti, addBounceEffect, createSparkle, createFloatingEmoji } from '../utils/whimsy'

interface RewardsPanelProps {
  totalRewards: number
  wePeeRate: number
  stakedAmount: number
  lockMultiplier: number
  lockPeriod: string
  lockTimeRemaining: number
  onClaimRewards: () => void
}

export default function RewardsPanel({ 
  totalRewards, 
  wePeeRate,
  stakedAmount,
  lockMultiplier,
  lockPeriod,
  lockTimeRemaining,
  onClaimRewards 
}: RewardsPanelProps) {
  const [isClaiming, setIsClaiming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [rewardEmoji, setRewardEmoji] = useState('🎁')

  const handleClaim = async () => {
    if (totalRewards <= 0) return
    
    setIsClaiming(true)
    
    try {
      // Simulate claiming process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success celebration!
      createConfetti(30)
      setShowSuccess(true)
      
      // Add bounce to the button
      const button = document.querySelector('.claim-button') as HTMLElement
      if (button) {
        addBounceEffect(button)
        const rect = button.getBoundingClientRect()
        createFloatingEmoji('💰', rect.left + rect.width / 2, rect.top)
      }
      
      onClaimRewards()
      
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to claim rewards:', err)
    } finally {
      setIsClaiming(false)
    }
  }

  // Calculate $WePee rewards based on staked amount and lock multiplier
  const baseDaily = (stakedAmount / 1000) * wePeeRate
  const dailyWePee = baseDaily * lockMultiplier
  // Future use for expanded earnings display
  // const monthlyWePee = dailyWePee * 30
  // const yearlyWePee = dailyWePee * 365
  
  // Rotate reward emoji periodically
  useEffect(() => {
    const emojis = ['🎁', '💰', '💸', '🎆', '💵', '💴', '💳']
    const interval = setInterval(() => {
      setRewardEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Current $WePee Rewards */}
      <div className="glass rounded-2xl p-6 glow pulse-glow sparkle-container">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-elegant/20">
              <Crown className="w-8 h-8 text-white float-animation" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Claimable Rewards</h3>
          <p className="text-white/60 text-sm mt-1">$WePee Tokens</p>
        </div>
        
        <div className="text-center mb-6 relative">
          <div className="text-5xl font-black mb-2 relative">
            <span className="gradient-text">{totalRewards.toFixed(2)}</span>
            <span className="absolute -right-12 top-0 text-2xl coin-flip">{rewardEmoji}</span>
          </div>
          {totalRewards > 100 && (
            <div className="absolute -top-2 -right-2">
              <div className="p-2 bg-gradient-elegant rounded-full">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleClaim}
          disabled={isClaiming || totalRewards <= 0}
          className="btn-primary claim-button w-full disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isClaiming ? (
            <>
              <div className="loading-dots">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
              <span className="ml-2">Claiming rewards...</span>
            </>
          ) : (
            <>
              <Crown className="w-5 h-5 inline mr-2 group-hover:scale-110 transition-transform" />
              Claim Rewards
              <Zap className="w-5 h-5 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>

        {totalRewards <= 0 && (
          <div className="mt-4 text-center">
            <p className="text-white/50 text-sm">Start staking to earn rewards</p>
          </div>
        )}
        
        {showSuccess && (
          <div className="mt-4 text-center fade-in-up">
            <p className="gradient-text text-sm font-semibold success-animation">
              {getEncouragingMessage('claim')}
            </p>
          </div>
        )}
      </div>

      {/* $WePee Earning Rates */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 rounded-full bg-gradient-elegant/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white text-center mb-6">Earning Rates</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-white/70">Base Rate</span>
            <span className="font-semibold text-white">{wePeeRate} $WePee/1K/day</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-white/70">Your Stake</span>
            <span className="font-semibold text-white">{stakedAmount.toFixed(0)} TOKEN</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-white/70">Daily Earnings</span>
            <span className="gradient-text font-bold">{dailyWePee.toFixed(2)} $WePee</span>
          </div>
        </div>
      </div>

      {/* Lock Period & Multiplier Info */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 rounded-full bg-gradient-elegant/20">
            <Star className="w-6 h-6 text-white float-animation" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white text-center mb-6">Lock Details</h3>
        
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-white/60 text-sm mb-1">Lock Period</div>
            <div className="font-bold text-white text-lg">{lockPeriod}</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-white/60 text-sm mb-1">Multiplier</div>
            <div className="gradient-text font-bold text-lg">{lockMultiplier}x</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-white/60 text-sm mb-1">Time Remaining</div>
            <div className="font-bold text-white text-lg">{Math.ceil(lockTimeRemaining / 86400)} days</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
            <p className="text-white/70 text-sm">
              Earning <span className="gradient-text font-semibold">{lockMultiplier}x multiplier</span> on base rewards. 
              Longer locks unlock higher multipliers and greater returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}