import React, { useRef, useEffect } from 'react';
import { Droplets, Users, Trophy, Zap, Shield, Coins, Sparkles, TrendingUp, Lock } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Flush-to-Earn Mining",
      description: "Just tap 'Flush to Mine' and let it flow. The only coin that flows naturally!",
      highlight: "💧 Flow Rate: 0.12 PEE/hour",
      gradient: "from-blue-400 to-cyan-600",
      delay: "0s"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stream Teams",
      description: "Invite your pee-mates and build the ultimate urination network.",
      highlight: "🚽 Earn 25% from referrals",
      gradient: "from-purple-400 to-pink-600",
      delay: "0.1s"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Bathroom NFTs",
      description: "Collect rare restrooms, golden toilets, and hydro thrones.",
      highlight: "🏆 Golden Toilet unlocked at 10K PEE",
      gradient: "from-yellow-400 to-orange-600",
      delay: "0.2s"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Zero Energy Mining",
      description: "No electricity bills, no mining rigs. Just your natural flow.",
      highlight: "⚡ 0 kilowatts per piss",
      gradient: "from-green-400 to-emerald-600",
      delay: "0.3s"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bladder Security",
      description: "Your pee-rivacy is protected with military-grade encryption.",
      highlight: "🔒 Secure as Fort Knox toilets",
      gradient: "from-red-400 to-rose-600",
      delay: "0.4s"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Liquid Gold Staking",
      description: "Stake your PEE in the Golden Stream Pool for premium rewards.",
      highlight: "💰 Up to 420% APY",
      gradient: "from-amber-400 to-yellow-600",
      delay: "0.5s"
    }
  ];

  useEffect(() => {
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('animate-slide-up', 'opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh animate-gradient-xy blur-3xl"></div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-pee-500/20 to-transparent rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-pee-600/15 to-transparent rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8">
            <Sparkles className="w-5 h-5 text-pee-400 animate-sparkle" />
            <span className="text-sm font-semibold text-pee-300 uppercase tracking-wider">Premium Features</span>
            <Sparkles className="w-5 h-5 text-pee-400 animate-sparkle" style={{animationDelay: '1s'}} />
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Why Choose{' '}
            <span className="gradient-text-metallic">Pee Network?</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
            The most natural way to earn cryptocurrency. No complex setups, no energy waste - 
            just pure, <span className="text-pee-400 font-semibold">flowing profits</span>.
          </p>
        </div>

        {/* Premium Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
              style={{ animationDelay: feature.delay }}
            >
              <div className="group relative h-full">
                {/* Premium glass card */}
                <div className="glass-card rounded-3xl p-8 h-full hover-lift card-interactive relative overflow-hidden">
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon container with advanced effects */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {feature.icon}
                    </div>
                    <div className={`absolute inset-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-pee-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Premium highlight badge */}
                  <div className="mt-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pee-500/20 to-pee-600/20 border border-pee-400/30 group-hover:border-pee-400/50 transition-colors">
                      <div className="w-2 h-2 bg-pee-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-pee-300">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pee-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Bottom CTA */}
        <div className="text-center mt-24">
          <div className="relative max-w-3xl mx-auto">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-pee-500/20 to-transparent blur-3xl animate-pulse"></div>
            
            {/* CTA Card */}
            <div className="relative glass-card rounded-3xl p-12 backdrop-blur-3xl border border-pee-400/20 hover-lift overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-conic from-pee-400 via-pee-600 to-pee-400 animate-rotate-slow"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pee-500/20 border border-pee-400/30 mb-6">
                  <TrendingUp className="w-4 h-4 text-pee-400 animate-pulse" />
                  <span className="text-sm font-semibold text-pee-300">Limited Time Offer</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-display font-bold gradient-text-metallic mb-4">
                  Ready to Turn Your Leaks Into Liquidity?
                </h3>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join millions of <span className="text-pee-400 font-semibold">urinators worldwide</span> in the most natural mining experience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary group">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-sparkle" />
                    Start Your Flow Journey
                  </button>
                  
                  <button className="px-8 py-5 rounded-2xl font-bold text-white border border-pee-400/30 hover:border-pee-400/50 hover:bg-pee-400/10 transition-all duration-300 hover-lift">
                    <Lock className="inline w-5 h-5 mr-2" />
                    Secure Your Spot
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-pee-400/20">
                  <div>
                    <div className="text-2xl font-bold gradient-text-glow">24h</div>
                    <div className="text-sm text-gray-500">Until Launch</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text-glow">$0.42</div>
                    <div className="text-sm text-gray-500">Starting Price</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text-glow">69%</div>
                    <div className="text-sm text-gray-500">Bonus APY</div>
                  </div>
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pee-400/20 to-transparent blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pee-600/20 to-transparent blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;