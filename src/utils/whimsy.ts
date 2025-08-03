// Whimsical utility functions for delightful interactions

export const createConfetti = (count: number = 30) => {
  const colors = ['#F5C93A', '#FFD700', '#FFA500', '#FFB84D', '#FFCD73']
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`
      
      // Randomize size
      const size = Math.random() * 6 + 6
      confetti.style.width = size + 'px'
      confetti.style.height = size + 'px'
      
      // Randomize animation duration
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'
      confetti.style.animationDelay = (Math.random() * 0.5) + 's'
      
      document.body.appendChild(confetti)
      
      // Remove after animation
      setTimeout(() => confetti.remove(), 4000)
    }, i * 50)
  }
}

export const createSparkle = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const sparkle = document.createElement('div')
  sparkle.className = 'sparkle'
  
  // Random position within element
  const x = Math.random() * rect.width
  const y = Math.random() * rect.height
  
  sparkle.style.left = x + 'px'
  sparkle.style.top = y + 'px'
  
  element.style.position = 'relative'
  element.appendChild(sparkle)
  
  // Remove after animation
  setTimeout(() => sparkle.remove(), 1500)
}

export const playHapticFeedback = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(10)
  }
}

export const getEncouragingMessage = (type: 'stake' | 'unstake' | 'claim' | 'connect' | 'error') => {
  const messages = {
    stake: [
      "Let's grow that bag! 💰",
      "Smart move, future millionaire! 🚀",
      "Your tokens are about to work harder than ever! 💪",
      "Watch those rewards roll in! 🎰",
      "Staking like a pro! 🏆"
    ],
    unstake: [
      "Taking some profits? Nice! 💸",
      "Your tokens are ready to fly free! 🦅",
      "Flexibility is key! 🔑",
      "Smart portfolio management! 📊",
      "Your call, boss! 👔"
    ],
    claim: [
      "Cha-ching! Rewards incoming! 💰",
      "Payday feels good, doesn't it? 🎉",
      "Your patience paid off! 🎁",
      "Sweet, sweet rewards! 🍯",
      "Making it rain tokens! 🌧️"
    ],
    connect: [
      "Welcome aboard! 🚢",
      "Let's make some magic happen! ✨",
      "Your wallet, your rules! 🎮",
      "Connected and ready to roll! 🎲",
      "The DeFi adventure begins! 🗺️"
    ],
    error: [
      "Oops! Even the best stumble sometimes 🤷",
      "No worries, let's try that again! 🔄",
      "Technology can be tricky sometimes! 🤖",
      "Don't worry, we've all been there! 🤗",
      "Third time's the charm? 🍀"
    ]
  }
  
  const messageList = messages[type]
  return messageList[Math.floor(Math.random() * messageList.length)]
}

export const getLoadingMessage = () => {
  const messages = [
    "Summoning the blockchain spirits...",
    "Convincing the validators...",
    "Bribing the gas fees...",
    "Warming up the smart contracts...",
    "Consulting the oracle...",
    "Mining some patience...",
    "Decrypting the matrix...",
    "Proof of waiting in progress..."
  ]
  
  return messages[Math.floor(Math.random() * messages.length)]
}

export const formatNumberWithStyle = (num: number, decimals: number = 2): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M 🐋'
  } else if (num >= 100000) {
    return (num / 1000).toFixed(0) + 'K 💎'
  } else if (num >= 10000) {
    return (num / 1000).toFixed(1) + 'K ✨'
  } else if (num >= 1000) {
    return num.toLocaleString() + ' 🔥'
  } else if (num >= 100) {
    return num.toFixed(decimals) + ' 💪'
  } else if (num > 0) {
    return num.toFixed(decimals) + ' 🌱'
  }
  return '0 🥚'
}

// Easter egg: Konami code detector
let konamiProgress = 0
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export const initKonamiCode = (callback: () => void) => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === konamiCode[konamiProgress]) {
      konamiProgress++
      
      if (konamiProgress === konamiCode.length) {
        konamiProgress = 0
        callback()
        createConfetti(50)
      }
    } else {
      konamiProgress = 0
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  return () => document.removeEventListener('keydown', handleKeydown)
}

// Add bounce effect to element
export const addBounceEffect = (element: HTMLElement) => {
  element.classList.add('success-animation')
  setTimeout(() => element.classList.remove('success-animation'), 800)
}

// Create floating emoji
export const createFloatingEmoji = (emoji: string, x: number, y: number) => {
  const floater = document.createElement('div')
  floater.textContent = emoji
  floater.style.position = 'fixed'
  floater.style.left = x + 'px'
  floater.style.top = y + 'px'
  floater.style.fontSize = '24px'
  floater.style.pointerEvents = 'none'
  floater.style.animation = 'fade-in-up 1s ease-out forwards'
  floater.style.zIndex = '9999'
  
  document.body.appendChild(floater)
  setTimeout(() => floater.remove(), 1000)
}

// Format $goldenPoo amounts with appropriate precision
export const formatGoldenPoo = (amount: number): string => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + 'M 💩'
  } else if (amount >= 10000) {
    return (amount / 1000).toFixed(1) + 'K 💩'
  } else if (amount >= 1000) {
    return amount.toFixed(0) + ' 💩'
  } else if (amount >= 100) {
    return amount.toFixed(1) + ' 💩'
  } else if (amount >= 10) {
    return amount.toFixed(2) + ' 💩'
  } else if (amount > 0) {
    return amount.toFixed(3) + ' 💩'
  }
  return '0 💩'
}