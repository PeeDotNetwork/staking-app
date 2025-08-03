import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Coins, Clock, DollarSign, Percent, Sparkles, Trophy, Zap } from 'lucide-react'
import StakeForm from './StakeForm'
import RewardsPanel from './RewardsPanel'
import { createSparkle, formatNumberWithStyle, initKonamiCode } from '../utils/whimsy'

export default function StakingInterface() {
  const [stakedAmount, setStakedAmount] = useState(1250.75)
  const [availableBalance, setAvailableBalance] = useState(5000)
  const [totalRewards, setTotalRewards] = useState(187.32)
  const [currentAPY] = useState(15.4)
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
  }, [])

  const handleStake = (amount: number) => {
    setStakedAmount(prev => prev + amount)
    setAvailableBalance(prev => prev - amount)
  }

  const handleUnstake = (amount: number) => {
    setStakedAmount(prev => Math.max(0, prev - amount))
    setAvailableBalance(prev => prev + amount)
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
            {currentAPY}%
            <Zap className="w-4 h-4 inline ml-1 text-primary-accent" />
          </div>
          <div className="text-sm text-primary-accent/70">Current APY</div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staking Form */}
        <div className="lg:col-span-2">
          <StakeForm
            availableBalance={availableBalance}
            stakedAmount={stakedAmount}
            onStake={handleStake}
            onUnstake={handleUnstake}
          />
        </div>

        {/* Rewards Panel */}
        <div>
          <RewardsPanel
            totalRewards={totalRewards}
            currentAPY={currentAPY}
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
            <ul className="space-y-1 text-sm">
              <li className="hover:text-primary-accent transition-colors">• Minimum stake: 1 TOKEN 🌱</li>
              <li className="hover:text-primary-accent transition-colors">• Maximum stake: No limit 🚀</li>
              <li className="hover:text-primary-accent transition-colors">• Staking period: Flexible ⏰</li>
              <li className="hover:text-primary-accent transition-colors">• Rewards frequency: Real-time ⚡</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-accent mb-2">Unstaking</h4>
            <ul className="space-y-1 text-sm">
              <li className="hover:text-primary-accent transition-colors">• Unstaking period: Instant ⚡</li>
              <li className="hover:text-primary-accent transition-colors">• No penalties for unstaking 🎉</li>
              <li className="hover:text-primary-accent transition-colors">• Rewards continue until unstaked 💰</li>
              <li className="hover:text-primary-accent transition-colors">• Partial unstaking supported 🔀</li>
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