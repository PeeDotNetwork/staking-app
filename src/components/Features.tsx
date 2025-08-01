import React from 'react';
import { Droplets, Users, Trophy, Zap, Shield, Coins } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Flush-to-Earn Mining",
      description: "Just tap 'Flush to Mine' and let it flow. The only coin that flows naturally!",
      highlight: "💧 Flow Rate: 0.12 PEE/hour"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Stream Teams",
      description: "Invite your pee-mates and build the ultimate urination network.",
      highlight: "🚽 Earn 25% from referrals"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Bathroom NFTs",
      description: "Collect rare restrooms, golden toilets, and hydro thrones.",
      highlight: "🏆 Golden Toilet unlocked at 10K PEE"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Zero Energy Mining",
      description: "No electricity bills, no mining rigs. Just your natural flow.",
      highlight: "⚡ 0 kilowatts per piss"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bladder Security",
      description: "Your pee-rivacy is protected with military-grade encryption.",
      highlight: "🔒 Secure as Fort Knox toilets"
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Liquid Gold Staking",
      description: "Stake your PEE in the Golden Stream Pool for premium rewards.",
      highlight: "💰 Up to 420% APY"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Pee Network?</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            The most natural way to earn cryptocurrency. No complex setups, no energy waste - just pure, flowing profits.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group particle-container">
              {/* Feature Card */}
              <div className="paper-card premium-card ripple-effect rounded-xl p-6 shadow-premium relative">
                {/* Paper texture overlay */}
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-glow-premium icon-glow">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold gradient-text-glow mb-3">{feature.title}</h3>
                  <p className="text-amber-700 mb-4 leading-relaxed">{feature.description}</p>
                  
                  {/* Highlight */}
                  <div className="bg-gradient-to-r from-amber-200 to-yellow-200 rounded-lg p-3 border border-amber-300 shadow-premium">
                    <span className="gradient-text font-semibold text-sm">{feature.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="paper-card premium-card rounded-xl p-8 shadow-glow-premium relative max-w-2xl mx-auto particle-container">
            <div className="relative">
              <h3 className="text-2xl font-bold gradient-text-glow mb-4">Ready to Turn Your Leaks Into Liquidity?</h3>
              <p className="text-amber-700 mb-6">Join millions of urinators worldwide in the most natural mining experience.</p>
              <button className="btn-primary ripple-effect">
                🚽 Start Your Flow Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;