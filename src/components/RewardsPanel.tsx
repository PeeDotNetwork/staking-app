import { useState, useEffect } from 'react'
import { Gift, TrendingUp, AlertCircle, Star, Sparkles, Trophy, PartyPopper } from 'lucide-react'
import { getEncouragingMessage, createConfetti, addBounceEffect, createSparkle, createFloatingEmoji } from '../utils/whimsy'

interface RewardsPanelProps {
  totalRewards: number
  currentAPY: number
  onClaimRewards: () => void
}

export default function RewardsPanel({ 
  totalRewards, 
  currentAPY, 
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

  const dailyRewards = (totalRewards * currentAPY) / 365 / 100
  const monthlyRewards = dailyRewards * 30
  const yearlyRewards = totalRewards * (currentAPY / 100)
  
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
      {/* Current Rewards */}
      <div className="card glow pulse-glow sparkle-container">
        <div className="text-center mb-4">
          <Gift className="w-12 h-12 text-primary-accent mx-auto mb-2 float-animation" />
          <h3 className="text-xl font-bold text-primary-accent">Pending Rewards</h3>
        </div>
        
        <div className="text-center mb-6 relative">
          <div className="text-4xl font-bold text-primary-accent mb-2 relative">
            {totalRewards.toFixed(6)}
            <span className="absolute -right-10 top-0 text-2xl coin-flip">{rewardEmoji}</span>
          </div>
          <div className="text-primary-accent/70">TOKEN</div>
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

      {/* APY Information */}
      <div className="card group">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-primary-accent mr-2 wiggle-hover" />
          <h3 className="text-lg font-bold text-primary-accent">APY Breakdown</h3>
          <Sparkles className="w-4 h-4 text-primary-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-primary-accent/20 hover:bg-primary-accent/5 transition-colors rounded px-2 -mx-2">
            <span className="text-primary-accent/70">Current APY</span>
            <span className="font-bold text-primary-accent">{currentAPY}% 🔥</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-primary-accent/20 hover:bg-primary-accent/5 transition-colors rounded px-2 -mx-2">
            <span className="text-primary-accent/70">Daily Rate</span>
            <span className="font-bold text-primary-accent">{(currentAPY / 365).toFixed(4)}%</span>
          </div>
          
          <div className="flex justify-between items-center py-2 hover:bg-primary-accent/5 transition-colors rounded px-2 -mx-2">
            <span className="text-primary-accent/70">Monthly Rate</span>
            <span className="font-bold text-primary-accent">{(currentAPY / 12).toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Estimated Earnings */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-accent mb-4 flex items-center">
          Estimated Earnings
          <Star className="w-5 h-5 ml-2 text-primary-accent float-animation" />
        </h3>
        
        <div className="space-y-3">
          <div className="bg-primary-background/30 rounded-lg p-3 hover:bg-primary-background/40 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-primary-accent/70 text-sm">Daily</div>
            <div className="font-bold text-primary-accent">{dailyRewards.toFixed(6)} TOKEN</div>
          </div>
          
          <div className="bg-primary-background/30 rounded-lg p-3 hover:bg-primary-background/40 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-primary-accent/70 text-sm">Monthly</div>
            <div className="font-bold text-primary-accent">{monthlyRewards.toFixed(6)} TOKEN</div>
          </div>
          
          <div className="bg-primary-background/30 rounded-lg p-3 hover:bg-primary-background/40 transition-colors cursor-pointer group" onClick={() => {
            const el = event?.currentTarget as HTMLElement
            if (el) createSparkle(el)
          }}>
            <div className="text-primary-accent/70 text-sm">Yearly</div>
            <div className="font-bold text-primary-accent">{yearlyRewards.toFixed(6)} TOKEN</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary-accent/10 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-primary-accent/70 flex-shrink-0 mt-0.5" />
            <p className="text-primary-accent/70 text-xs">
              Estimates are based on current APY and staked amount. Actual rewards may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}