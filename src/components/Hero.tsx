import React from 'react';
import { Download } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const Hero = () => {
  return (
    <section className="min-h-screen pt-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"></div>
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-professional">
              The First Digital Currency You Can Mine{' '}
              <span className="gradient-text">
                While You Pee
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed font-medium">
              Yes, seriously. Now your bathroom break earns you blockchain rewards. No energy cost, no tech degree needed.
            </p>
            
            <button className="group btn-primary inline-flex items-center space-x-3">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>🚽 Download PEE App Now</span>
            </button>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8">
              {/* Yellow Paper Background for Stats */}
              <div className="col-span-3 paper-card rounded-xl p-8 shadow-professional transform hover:scale-105 transition-all duration-500">
                <div className="relative grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">100M+</div>
                    <div className="text-amber-700 text-sm font-semibold">Flushes Recorded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">420</div>
                    <div className="text-amber-700 text-sm font-semibold">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">0</div>
                    <div className="text-amber-700 text-sm font-semibold">Kilowatts per Piss</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Yellow Paper Info Section */}
            <div className="mt-8 paper-card rounded-xl p-6 shadow-professional transform hover:scale-105 transition-all duration-500">
              <div className="relative">
                <h3 className="text-xl font-bold gradient-text mb-4">Turn Your Leaks Into Liquidity</h3>
                <ul className="space-y-2 text-amber-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full glow-effect"></div>
                    <span className="text-sm font-medium">💧 Earn rewards for daily "flush-ins" (app engagement)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full glow-effect"></div>
                    <span className="text-sm font-medium">🚽 Unlock bathroom NFTs (Golden Toilet, Hydro Throne)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full glow-effect"></div>
                    <span className="text-sm font-medium">🌊 Join stream teams and invite pee-mates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full glow-effect"></div>
                    <span className="text-sm font-medium">🧬 Zero energy, full relief - from bladder to blockchain</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-end relative">
            <PhoneMockup />
            
            {/* Yellow Paper Info Card floating next to phone */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-32 w-64">
              <div className="paper-card rounded-xl p-4 shadow-professional transform rotate-3 hover:rotate-1 transition-all duration-500 hover:scale-105 float-animation">
                <div className="relative">
                  <h4 className="text-sm font-bold gradient-text mb-2">🚽 Flush-to-Earn Mining</h4>
                  <p className="text-xs text-amber-700 leading-relaxed font-medium">
                    Just tap "Flush to Mine" and let it flow. The only coin that flows naturally!
                  </p>
                  <div className="mt-3 pt-3 border-t border-amber-200">
                    <div className="text-xs text-amber-600 font-semibold">
                      <span className="font-semibold">💧 Flow Rate:</span> 0.12 PEE/hour
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