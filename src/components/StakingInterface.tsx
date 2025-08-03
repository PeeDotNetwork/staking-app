import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Coins, Clock, DollarSign, Percent, Sparkles, Trophy, Zap } from 'lucide-react'
import StakeForm from './StakeForm'
import RewardsPanel from './RewardsPanel'
import { createSparkle, formatNumberWithStyle, initKonamiCode } from '../utils/whimsy'

export default function StakingInterface() {
  const [stakedAmount, setStakedAmount] = useState(1250.75)
  const [availableBalance, setAvailableBalance] = useState(5000)
  const [totalRewards, setTotalRewards] = useState(187.32)
  const [wePeeRate] = useState(2.5) // Base $WePee per 1K staked per day
  const [lockPeriod, setLockPeriod] = useState('threeMonths')
  const [lockMultiplier, setLockMultiplier] = useState(2.0)
  const [lockStartTime] = useState(Date.now() / 1000 - 86400 * 30) // 30 days ago
  const [lockEndTime] = useState(Date.now() / 1000 + 86400 * 60) // 60 days from now
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [rewardStreak, setRewardStreak] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)

  // Simulate real-time reward accumulation with delight
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRewards(prev => {
        const newAmount = prev + (Math.random() * 0.01)
        
        // Milestone celebrations
        if (Math.floor(newAmount) > Math.floor(prev)) {
          setRewardStreak(s => s + 1)
          // Create sparkle on stats
          if (statsRef.current) {
            const cards = statsRef.current.querySelectorAll('.stat-card')
            cards.forEach(card => createSparkle(card as HTMLElement))
          }
        }
        
        return newAmount
      })
    }, 5000)

    // Initialize easter egg
    const cleanup = initKonamiCode(() => {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 5000)
    })

    return () => {
      clearInterval(interval)
      cleanup()
    }
  }, [stakedAmount, wePeeRate, lockMultiplier])

  const handleStake = (amount: number, selectedLockPeriod: string) => {
    setStakedAmount(prev => prev + amount)
    setAvailableBalance(prev => prev - amount)
    setLockPeriod(selectedLockPeriod)
    
    // Set multiplier based on lock period
    const multipliers: { [key: string]: number } = {
      oneDay: 1.0,
      oneWeek: 1.25,
      threeMonths: 2.0,
      sixMonths: 3.0
    }
    setLockMultiplier(multipliers[selectedLockPeriod] || 1.0)
  }

  const handleUnstake = (amount: number) => {
    setStakedAmount(prev => Math.max(0, prev - amount))
    setAvailableBalance(prev => prev + amount)
  }
  
  const handleEmergencyUnlock = (returnAmount: number, _penaltyAmount: number) => {
    setStakedAmount(0) // Full unlock
    setAvailableBalance(prev => prev + returnAmount)
    // Note: _penaltyAmount is distributed (burned/rewards/treasury)
  }

  const handleClaimRewards = () => {
    setAvailableBalance(prev => prev + totalRewards)
    setTotalRewards(0)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stats Overview */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group sparkle-container">
          <div className="flex items-center justify-center mb-2">
            <Coins className="w-6 h-6 text-primary-accent wiggle-hover" />
          </div>
          <div className="text-2xl font-bold text-primary-accent">
            {formatNumberWithStyle(stakedAmount)}
          </div>
          <div className="text-sm text-primary-accent/70">Total Staked</div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-4 h-4 text-primary-accent/50" />
          </div>
        </div>

        <div className="stat-card group sparkle-container">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-6 h-6 text-primary-accent wiggle-hover" />
          </div>
          <div className="text-2xl font-bold text-primary-accent">
            {formatNumberWithStyle(availableBalance)}
          </div>
          <div className="text-sm text-primary-accent/70">Available Balance</div>
        </div>

        <div className="stat-card group sparkle-container">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-6 h-6 text-primary-accent float-animation" />
          </div>
          <div className="text-2xl font-bold text-primary-accent">
            {totalRewards.toFixed(4)}
            {rewardStreak > 0 && (
              <span className="text-sm ml-1">🔥{rewardStreak}</span>
            )}
          </div>
          <div className="text-sm text-primary-accent/70">Pending Rewards</div>
        </div>

        <div className="stat-card group sparkle-container">
          <div className="flex items-center justify-center mb-2">
            <Percent className="w-6 h-6 text-primary-accent pulse-glow" />
          </div>
          <div className="text-2xl font-bold text-primary-accent">
            {lockMultiplier}x
            <Zap className="w-4 h-4 inline ml-1 text-primary-accent" />
          </div>
          <div className="text-sm text-primary-accent/70">Lock Multiplier</div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staking Form */}
        <div className="lg:col-span-2">
          <StakeForm
            availableBalance={availableBalance}
            stakedAmount={stakedAmount}
            lockPeriod={lockPeriod}
            lockStartTime={lockStartTime}
            lockEndTime={lockEndTime}
            lockMultiplier={lockMultiplier}
            onStake={handleStake}
            onUnstake={handleUnstake}
            onEmergencyUnlock={handleEmergencyUnlock}
          />
        </div>

        {/* Rewards Panel */}
        <div>
          <RewardsPanel
            totalRewards={totalRewards}
            wePeeRate={wePeeRate}
            stakedAmount={stakedAmount}
            lockMultiplier={lockMultiplier}
            lockPeriod={lockPeriod === 'oneDay' ? '24 Hours' : lockPeriod === 'oneWeek' ? '1 Week' : lockPeriod === 'threeMonths' ? '3 Months' : '6 Months'}
            lockTimeRemaining={lockEndTime - Date.now() / 1000}
            onClaimRewards={handleClaimRewards}
          />
        </div>
      </div>

      {/* Staking Info */}
      <div className="card fade-in-up">
        <h3 className="text-xl font-bold text-primary-accent mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 wiggle-hover" />
          Staking Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-primary-accent/80">
          <div>
            <h4 className="font-semibold text-primary-accent mb-2">Staking Details</h4>
            <ul className="space-y-1 text-xs md:text-sm">
              <li className="hover:text-primary-accent transition-colors">• Minimum stake: 100-1000 TOKEN (varies by lock) 🌱</li>
              <li className="hover:text-primary-accent transition-colors">• Lock periods: 24h, 1w, 3m, 6m 🔒</li>
              <li className="hover:text-primary-accent transition-colors">• Multipliers: 1x, 1.25x, 2x, 3x 🚀</li>
              <li className="hover:text-primary-accent transition-colors">• Rewards: $WePee tokens ⚡</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-accent mb-2">Unstaking</h4>
            <ul className="space-y-1 text-xs md:text-sm">
              <li className="hover:text-primary-accent transition-colors">• Normal unlock: Wait for lock expiry ⏰</li>
              <li className="hover:text-primary-accent transition-colors">• Emergency unlock: Up to 33% penalty ⚠️</li>
              <li className="hover:text-primary-accent transition-colors">• Penalty decreases over time 📉</li>
              <li className="hover:text-primary-accent transition-colors">• Penalties: 40% burn, 40% rewards, 20% treasury 🔥</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Easter Egg */}
      {showEasterEgg && (
        <div className="easter-egg show fixed bottom-20 right-20 bg-primary-accent text-primary-text px-6 py-3 rounded-full shadow-lg fade-in-up">
          <Trophy className="w-5 h-5 inline mr-2" />
          Achievement Unlocked: Code Master!
        </div>
      )}
    </div>
  )
}