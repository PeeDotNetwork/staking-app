import { useState } from 'react'
import { Clock, Zap, Lock, Shield, Crown, Diamond } from 'lucide-react'
import { playHapticFeedback, createSparkle, addBounceEffect } from '../utils/whimsy'

export interface LockPeriod {
  id: string
  name: string
  duration: string
  multiplier: number
  minStake: number
  icon: React.ReactNode
  description: string
  emergencyUnlock: boolean
}

const LOCK_PERIODS: LockPeriod[] = [
  {
    id: 'oneDay',
    name: '24 Hours',
    duration: '1 day',
    multiplier: 1.0,
    minStake: 100,
    icon: <Clock className="w-5 h-5" />,
    description: 'Quick stake, base rewards',
    emergencyUnlock: false // No emergency unlock for 24h
  },
  {
    id: 'oneWeek', 
    name: '1 Week',
    duration: '7 days',
    multiplier: 1.25,
    minStake: 100,
    icon: <Zap className="w-5 h-5" />,
    description: '25% bonus rewards',
    emergencyUnlock: true
  },
  {
    id: 'threeMonths',
    name: '3 Months', 
    duration: '90 days',
    multiplier: 2.0,
    minStake: 500,
    icon: <Shield className="w-5 h-5" />,
    description: '2x rewards (100% bonus)',
    emergencyUnlock: true
  },
  {
    id: 'sixMonths',
    name: '6 Months',
    duration: '180 days', 
    multiplier: 3.0,
    minStake: 1000,
    icon: <Crown className="w-5 h-5" />,
    description: '3x rewards (200% bonus)',
    emergencyUnlock: true
  }
]

interface LockPeriodSelectorProps {
  selectedPeriod: string
  onPeriodChange: (periodId: string) => void
  stakingAmount: number
}

export default function LockPeriodSelector({ 
  selectedPeriod, 
  onPeriodChange, 
  stakingAmount 
}: LockPeriodSelectorProps) {
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null)

  const handlePeriodSelect = (periodId: string, period: LockPeriod) => {
    // Check minimum stake requirement
    if (stakingAmount < period.minStake) {
      // Show warning but allow selection (will be validated on submit)
      playHapticFeedback()
    }
    
    onPeriodChange(periodId)
    playHapticFeedback()
    
    // Add visual feedback
    const button = document.querySelector(`[data-period="${periodId}"]`)
    if (button) {
      addBounceEffect(button as HTMLElement)
      createSparkle(button as HTMLElement)
    }
  }

  const calculatePenalty = (period: LockPeriod): string => {
    if (!period.emergencyUnlock) return 'Not allowed'
    
    // Assume worst case (unlock immediately) for display
    const maxPenalty = 33
    return `Up to ${maxPenalty}%`
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary-accent mb-2 flex items-center justify-center">
          <Lock className="w-5 h-5 mr-2 wiggle-hover" />
          Choose Lock Period
        </h3>
        <p className="text-primary-accent/70 text-sm">
          Longer locks = Higher multipliers! 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LOCK_PERIODS.map((period) => {
          const isSelected = selectedPeriod === period.id
          const canAfford = stakingAmount >= period.minStake
          const isHovered = hoveredPeriod === period.id
          
          return (
            <button
              key={period.id}
              data-period={period.id}
              onClick={() => handlePeriodSelect(period.id, period)}
              onMouseEnter={() => setHoveredPeriod(period.id)}
              onMouseLeave={() => setHoveredPeriod(null)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 text-left group
                ${isSelected 
                  ? 'bg-primary-accent/20 border-primary-accent shadow-lg shadow-primary-accent/20' 
                  : canAfford
                    ? 'bg-primary-secondary/20 border-primary-accent/30 hover:border-primary-accent/50 hover:bg-primary-secondary/30'
                    : 'bg-primary-secondary/10 border-red-400/30 opacity-50'
                }
                ${isHovered && canAfford ? 'scale-105' : ''}
              `}
              disabled={!canAfford}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-primary-accent rounded-full p-1">
                  <Diamond className="w-4 h-4 text-primary-text" />
                </div>
              )}

              {/* Period header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`${isSelected ? 'text-primary-accent' : 'text-primary-accent/70'} group-hover:scale-110 transition-transform`}>
                    {period.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${isSelected ? 'text-primary-accent' : 'text-primary-accent/90'}`}>
                      {period.name}
                    </h4>
                    <p className="text-primary-accent/60 text-xs">{period.duration}</p>
                  </div>
                </div>
                
                {/* Multiplier badge */}
                <div className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${isSelected 
                    ? 'bg-primary-accent text-primary-text' 
                    : 'bg-primary-accent/20 text-primary-accent'
                  }
                `}>
                  {period.multiplier}x
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm mb-3 ${isSelected ? 'text-primary-accent/90' : 'text-primary-accent/70'}`}>
                {period.description}
              </p>

              {/* Requirements & Emergency Unlock */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-primary-accent/60">Min Stake:</span>
                  <span className={`font-semibold ${canAfford ? 'text-primary-accent' : 'text-red-400'}`}>
                    {period.minStake} TOKEN
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-primary-accent/60">Emergency Exit:</span>
                  <span className={`font-semibold ${period.emergencyUnlock ? 'text-yellow-400' : 'text-red-400'}`}>
                    {period.emergencyUnlock ? calculatePenalty(period) : 'Not allowed'}
                  </span>
                </div>
              </div>

              {/* Insufficient balance warning */}
              {!canAfford && (
                <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
                  Need {period.minStake - stakingAmount} more TOKEN
                </div>
              )}

              {/* Hover effect shimmer */}
              {isHovered && canAfford && (
                <div className="absolute inset-0 bg-primary-accent/5 shimmer rounded-lg pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* Selected period summary */}
      {selectedPeriod && (
        <div className="mt-6 p-4 bg-primary-accent/10 rounded-lg border border-primary-accent/30 fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-primary-accent">Selected Lock Period</h4>
            <Diamond className="w-5 h-5 text-primary-accent float-animation" />
          </div>
          
          {(() => {
            const selected = LOCK_PERIODS.find(p => p.id === selectedPeriod)!
            return (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-accent/70">Duration: </span>
                  <span className="font-semibold text-primary-accent">{selected.duration}</span>
                </div>
                <div>
                  <span className="text-primary-accent/70">Multiplier: </span>
                  <span className="font-semibold text-primary-accent">{selected.multiplier}x</span>
                </div>
                <div>
                  <span className="text-primary-accent/70">Min Stake: </span>
                  <span className="font-semibold text-primary-accent">{selected.minStake} TOKEN</span>
                </div>
                <div>
                  <span className="text-primary-accent/70">Emergency Exit: </span>
                  <span className={`font-semibold ${selected.emergencyUnlock ? 'text-yellow-400' : 'text-red-400'}`}>
                    {calculatePenalty(selected)}
                  </span>
                </div>
              </div>
            )
          })()}
          
          <div className="mt-3 p-2 bg-primary-background/30 rounded text-xs text-primary-accent/70">
            💡 Higher multipliers mean more $WePee rewards for your patience!
          </div>
        </div>
      )}
    </div>
  )
}

export { LOCK_PERIODS }