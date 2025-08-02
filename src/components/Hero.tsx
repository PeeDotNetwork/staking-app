import React, { useEffect, useRef } from 'react';
import { Download, Sparkles, Zap, TrendingUp } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      particlesContainer.appendChild(particle);
    }
    
    heroRef.current?.appendChild(particlesContainer);

    return () => {
      particlesContainer.remove();
    };
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen pt-16 relative overflow-hidden">
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Aurora backdrop effect */}
      <div className="backdrop-aurora"></div>
      
      {/* Advanced animated gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-pee-600/20 via-transparent to-transparent animate-blob"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-pee-500/30 to-transparent rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-pee-700/25 to-transparent rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-pee-600/10 via-pee-800/5 to-pee-600/10 rounded-full blur-3xl animate-rotate-slow"></div>
        
        {/* Morphing gradient blobs */}
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-radial from-pee-400/20 to-transparent animate-morph blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-radial from-pee-600/15 to-transparent animate-morph blur-3xl" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-down">
              <Sparkles className="w-4 h-4 text-pee-400 animate-pulse" />
              <span className="text-sm font-medium text-pee-300">Revolutionary Toilet Tech</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-8">
              The First Digital Currency You Can Mine{' '}
              <span className="block mt-2">
                <span className="gradient-text-metallic relative">
                  While You Pee
                  <Zap className="absolute -right-8 -top-2 w-8 h-8 text-pee-400 animate-glow-pulse" />
                </span>
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed font-light max-w-2xl">
              Yes, seriously. Now your bathroom break earns you{' '}
              <span className="text-pee-400 font-semibold">blockchain rewards</span>. 
              No energy cost, no tech degree needed. Just pure, natural flow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="group btn-primary magnetic-area hover-lift">
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                <span className="font-bold">Download PEE App</span>
                <div className="ml-2 px-2 py-1 bg-white/20 rounded-md text-xs">
                  🚽 v2.0
                </div>
              </button>
              
              <button className="glass-card px-8 py-5 rounded-2xl font-bold text-white hover-lift group transition-all duration-300 hover:border-pee-400/50">
                <TrendingUp className="inline w-5 h-5 mr-2 group-hover:text-pee-400 transition-colors" />
                View Liquidity Pools
              </button>
            </div>
            
            {/* Premium Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="glass-card rounded-2xl p-6 text-center hover-lift card-interactive group">
                <div className="text-4xl font-display font-bold gradient-text-glow mb-2 group-hover:animate-pulse">
                  100M+
                </div>
                <div className="text-gray-400 text-sm font-medium">Flushes Recorded</div>
                <div className="mt-2 w-full h-1 bg-gradient-to-r from-transparent via-pee-400/50 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center hover-lift card-interactive group">
                <div className="text-4xl font-display font-bold gradient-text-glow mb-2 group-hover:animate-pulse">
                  420
                </div>
                <div className="text-gray-400 text-sm font-medium">Countries</div>
                <div className="mt-2 w-full h-1 bg-gradient-to-r from-transparent via-pee-400/50 to-transparent animate-shimmer"></div>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center hover-lift card-interactive group">
                <div className="text-4xl font-display font-bold gradient-text-glow mb-2 group-hover:animate-pulse">
                  0
                </div>
                <div className="text-gray-400 text-sm font-medium">Kilowatts per Piss</div>
                <div className="mt-2 w-full h-1 bg-gradient-to-r from-transparent via-pee-400/50 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            {/* Premium Features Card */}
            <div className="mt-10 paper-card premium rounded-3xl p-8 hover-lift card-interactive">
              <div className="relative">
                <h3 className="text-2xl font-display font-bold gradient-text-metallic mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-pee-400 animate-sparkle" />
                  Turn Your Leaks Into Liquidity
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 group">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-pee-400 to-pee-600 rounded-lg flex items-center justify-center shadow-glow group-hover:animate-glow-ring">
                      <span className="text-white text-sm font-bold">💧</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-toilet-800 font-semibold block">Daily Flush Mining</span>
                      <span className="text-toilet-600 text-sm">Earn rewards for daily "flush-ins" with auto-compound APY</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-pee-400 to-pee-600 rounded-lg flex items-center justify-center shadow-glow group-hover:animate-glow-ring">
                      <span className="text-white text-sm font-bold">🚽</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-toilet-800 font-semibold block">Legendary Bathroom NFTs</span>
                      <span className="text-toilet-600 text-sm">Collect Golden Toilets, Hydro Thrones, and Diamond Bidets</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-pee-400 to-pee-600 rounded-lg flex items-center justify-center shadow-glow group-hover:animate-glow-ring">
                      <span className="text-white text-sm font-bold">🌊</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-toilet-800 font-semibold block">Stream Team Network</span>
                      <span className="text-toilet-600 text-sm">Build your pee-ramid with 25% referral rewards</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-pee-400 to-pee-600 rounded-lg flex items-center justify-center shadow-glow group-hover:animate-glow-ring">
                      <span className="text-white text-sm font-bold">⚡</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-toilet-800 font-semibold block">Zero Energy Protocol</span>
                      <span className="text-toilet-600 text-sm">100% eco-friendly blockchain powered by nature's call</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-end relative animate-fade-in">
            <div className="relative">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-radial from-pee-500/30 to-transparent blur-3xl animate-pulse"></div>
              
              {/* Phone wrapper with perspective */}
              <div className="relative transform-gpu hover:scale-105 transition-all duration-500 animate-float-bubble">
                <PhoneMockup />
              </div>
              
              {/* Premium floating cards */}
              <div className="hidden lg:block absolute -top-10 -right-20 animate-float" style={{animationDelay: '0.5s'}}>
                <div className="glass-card rounded-2xl p-4 max-w-xs hover-lift neon-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pee-400 to-pee-600 flex items-center justify-center animate-glow-ring">
                      <span className="text-lg">🚽</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Real-time Mining</div>
                      <div className="text-xs text-gray-400">Active Flush Detected</div>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pee-400 to-pee-600 animate-shimmer"></div>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-20 animate-float" style={{animationDelay: '2s'}}>
                <div className="glass-card rounded-2xl p-4 max-w-xs hover-lift transform rotate-3 hover:rotate-1 transition-all">
                  <div className="text-xs text-gray-400 mb-1">Daily Earnings</div>
                  <div className="text-2xl font-display font-bold gradient-text-glow mb-2">
                    +0.12 PEE
                  </div>
                  <div className="flex items-center gap-1 text-xs text-pee-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.5% from yesterday</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute bottom-10 -right-16 animate-float" style={{animationDelay: '1s'}}>
                <div className="paper-card premium rounded-2xl p-4 max-w-xs hover-lift">
                  <h4 className="text-sm font-bold gradient-text-metallic mb-2">
                    💧 Flow Analytics
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-toilet-600">Stream Power:</span>
                      <span className="font-bold text-toilet-800">87%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-toilet-600">Flush Quality:</span>
                      <span className="font-bold text-toilet-800">Premium</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-toilet-600">Next Reward:</span>
                      <span className="font-bold gradient-text">2m 15s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;