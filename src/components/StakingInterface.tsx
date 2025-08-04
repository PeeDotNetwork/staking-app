import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Coins, Clock, DollarSign, Percent, Trophy, Zap, Shield, Target } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">ZK POOP</span>
          </h1>
          <p className="text-xl text-white/70 mb-2">Elegant Staking Protocol</p>
          <p className="text-sm text-white/50">Lock • Earn • Thrive</p>
        </div>

        {/* Stats Overview */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="stat-card group sparkle-container">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-elegant/20">
                <Coins className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {formatNumberWithStyle(stakedAmount)}
            </div>
            <div className="text-sm text-white/60">Total Staked</div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Target className="w-4 h-4 text-white/40" />
            </div>
          </div>

          <div className="stat-card group sparkle-container">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-elegant/20">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {formatNumberWithStyle(availableBalance)}
            </div>
            <div className="text-sm text-white/60">Available Balance</div>
          </div>

          <div className="stat-card group sparkle-container">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-elegant/20">
                <TrendingUp className="w-6 h-6 text-white float-animation" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {totalRewards.toFixed(4)}
              {rewardStreak > 0 && (
                <span className="text-sm ml-2 px-2 py-1 bg-gradient-elegant rounded-full text-white">
                  🔥{rewardStreak}
                </span>
              )}
            </div>
            <div className="text-sm text-white/60">Pending $WePee</div>
          </div>

          <div className="stat-card group sparkle-container">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-elegant/20 pulse-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              <span className="gradient-text">{lockMultiplier}x</span>
              <Zap className="w-5 h-5 inline ml-2 text-white/60" />
            </div>
            <div className="text-sm text-white/60">Lock Multiplier</div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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

        {/* Elegant Staking Info */}
        <div className="glass rounded-2xl p-8 fade-in-up">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 rounded-full bg-gradient-elegant/20">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Protocol Overview</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-gradient-elegant rounded-full mr-3"></div>
                  Staking Details
                </h4>
                <div className="space-y-3 text-white/70">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Minimum Stakes</span>
                    <span className="text-white">100-1000 TOKEN</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Lock Periods</span>
                    <span className="text-white">24h • 1w • 3m • 6m</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Multipliers</span>
                    <span className="gradient-text font-semibold">1x • 1.25x • 2x • 3x</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Rewards</span>
                    <span className="text-white">$WePee Tokens</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-gradient-elegant rounded-full mr-3"></div>
                  Unstaking Policy
                </h4>
                <div className="space-y-3 text-white/70">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Normal Unlock</span>
                    <span className="text-green-400">Wait for expiry</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Emergency Unlock</span>
                    <span className="text-yellow-400">Up to 33% penalty</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Penalty Reduction</span>
                    <span className="text-white">Decreases over time</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span>Distribution</span>
                    <span className="text-white">40% • 40% • 20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Easter Egg */}
        {showEasterEgg && (
          <div className="easter-egg show fixed bottom-6 right-6 glass px-6 py-3 rounded-full fade-in-up">
            <Trophy className="w-5 h-5 inline mr-2 text-white" />
            <span className="gradient-text font-semibold">Achievement Unlocked!</span>
          </div>
        )}
      </div>
    </div>
  )
}