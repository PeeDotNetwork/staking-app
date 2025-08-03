import { useState, useEffect } from 'react'
import { Gift, TrendingUp, AlertCircle, Star, Sparkles, Trophy, PartyPopper } from 'lucide-react'
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
      {/* Current $WePee Rewards - Mobile Optimized */}
      <div className="card glow pulse-glow sparkle-container p-4 md:p-6">
        <div className="text-center mb-3 md:mb-4">
          <Gift className="w-10 h-10 md:w-12 md:h-12 text-primary-accent mx-auto mb-1 md:mb-2 float-animation" />
          <h3 className="text-lg md:text-xl font-bold text-primary-accent">Claimable $WePee</h3>
        </div>
        
        <div className="text-center mb-4 md:mb-6 relative">
          <div className="text-3xl md:text-4xl font-bold text-primary-accent mb-1 md:mb-2 relative">
            {totalRewards.toFixed(2)}
            <span className="absolute -right-8 md:-right-10 top-0 text-xl md:text-2xl coin-flip">{rewardEmoji}</span>
          </div>
          <div className="text-primary-accent/70 text-sm md:text-base">$WePee 🚽</div>
          {totalRewards > 100 && (
            <div className="absolute -top-4 -right-4">
              <Trophy className="w-6 h-6 text-primary-accent wiggle-hover" />
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
              <span className="ml-2">Preparing your rewards...</span>
            </>
          ) : (
            <>
              <Gift className="w-5 h-5 inline mr-2 group-hover:scale-110 transition-transform" />
              Claim Rewards
              <PartyPopper className="w-5 h-5 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>

        {totalRewards <= 0 && (
          <div className="mt-3 text-center">
            <p className="text-primary-accent/50 text-sm">No rewards yet 🌱 Keep staking!</p>
          </div>
        )}
        
        {showSuccess && (
          <div className="mt-3 text-center fade-in-up">
            <p className="text-green-400 text-sm success-animation">
              {getEncouragingMessage('claim')}
            </p>
          </div>
        )}
      </div>

      {/* $WePee Earning Rates */}
      <div className="card group p-4 md:p-6">
        <div className="flex items-center mb-3 md:mb-4">
          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary-accent mr-2 wiggle-hover" />
          <h3 className="text-base md:text-lg font-bold text-primary-accent">$WePee Rates</h3>
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between items-center py-1.5 md:py-2 border-b border-primary-accent/20 hover:bg-primary-accent/5 transition-colors rounded px-2 -mx-2">
            <span className="text-primary-accent/70 text-xs md:text-sm">Base Rate</span>
            <span className="font-bold text-primary-accent text-xs md:text-sm">{wePeeRate} 🚽/1K/day</span>
          </div>
          
          <div className="flex justify-between items-center py-1.5 md:py-2 border-b border-primary-accent/20 hover:bg-primary-accent/5 transition-colors rounded px-2 -mx-2">
            <span className="text-primary-accent/70 text-xs md:text-sm">Your Stake</span>
            <span className="font-bold text-primary-accent text-xs md:text-sm">{stakedAmount.toFixed(0)} TOKEN</span>
          </div>
          
          <div className="flex justify-between items-center py-1.5 md:py-2 hover:bg-primary-accent/5 transition-colors rounded px-2 -mx-2">
            <span className="text-primary-accent/70 text-xs md:text-sm">Daily Earn</span>
            <span className="font-bold text-primary-accent text-xs md:text-sm">{dailyWePee.toFixed(2)} 🚽</span>
          </div>
        </div>
      </div>

      {/* Lock Period & Multiplier Info */}
      <div className="card p-4 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-primary-accent mb-3 md:mb-4 flex items-center">
          Lock & Multiplier
          <Star className="w-4 h-4 md:w-5 md:h-5 ml-2 text-primary-accent float-animation" />
        </h3>
        
        <div className="space-y-2 md:space-y-3">
          <div className="bg-primary-background/30 rounded-lg p-2.5 md:p-3 hover:bg-primary-background/40 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-primary-accent/70 text-xs md:text-sm">Lock Period</div>
            <div className="font-bold text-primary-accent text-sm md:text-base">{lockPeriod} 🔒</div>
          </div>
          
          <div className="bg-primary-background/30 rounded-lg p-2.5 md:p-3 hover:bg-primary-background/40 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-primary-accent/70 text-xs md:text-sm">Multiplier</div>
            <div className="font-bold text-primary-accent text-sm md:text-base">{lockMultiplier}x ⚡</div>
          </div>
          
          <div className="bg-primary-background/30 rounded-lg p-2.5 md:p-3 hover:bg-primary-background/40 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-primary-accent/70 text-xs md:text-sm">Time Left</div>
            <div className="font-bold text-primary-accent text-sm md:text-base">{Math.ceil(lockTimeRemaining / 86400)}d ⏰</div>
          </div>
        </div>

        <div className="mt-3 md:mt-4 p-2.5 md:p-3 bg-primary-accent/10 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-primary-accent/70 flex-shrink-0 mt-0.5" />
            <p className="text-primary-accent/70 text-xs">
              $WePee earned with {lockMultiplier}x multiplier! Higher locks = more rewards! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}