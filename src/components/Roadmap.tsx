import React from 'react';
import { CheckCircle, Clock, Zap, Star, Rocket, Trophy, Crown } from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "The Great Flush",
      status: "completed",
      date: "Q4 2023",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      items: [
        "🚽 Launch PEE mobile app",
        "💧 Basic flush-to-earn mining",
        "🧪 Bladder balance tracking",
        "👥 Pee-mate referral system"
      ]
    },
    {
      phase: "Phase 2", 
      title: "Stream Teams",
      status: "current",
      date: "Q1 2024",
      icon: <Zap className="w-8 h-8" />,
      color: "from-pee-400 to-amber-500",
      bgColor: "from-pee-50 to-amber-50",
      borderColor: "border-amber-200",
      items: [
        "🏆 Competitive urination leagues",
        "📊 Global bladder leaderboards",
        "🎮 Gamified mining experience",
        "🔒 Enhanced pee-rivacy features"
      ]
    },
    {
      phase: "Phase 3",
      title: "Golden Throne",
      status: "upcoming",
      date: "Q2 2024",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      items: [
        "🏛️ Toilet NFT marketplace launch",
        "💰 Golden Stream Pool staking",
        "🌊 Liquid Gold token introduction",
        "🔄 Cross-chain pee bridges"
      ]
    },
    {
      phase: "Phase 4",
      title: "Pee Domination",
      status: "future",
      date: "Q3 2024",
      icon: <Crown className="w-8 h-8" />,
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      items: [
        "🏪 PEE merchant adoption",
        "🏦 Decentralized Pee Bank (DPB)",
        "🌍 Global toilet partnerships",
        "🚀 Interplanetary pee mining"
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </div>
        );
      case 'current':
        return (
          <div className="flex items-center space-x-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            <Zap className="w-4 h-4" />
            <span>In Progress</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4" />
            <span>Future</span>
          </div>
        );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-pee-900 to-amber-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-pee-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pee-400/5 to-amber-400/5 rounded-full blur-3xl animate-float-bubble"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Rocket className="w-4 h-4" />
            <span>Our Journey</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            The <span className="bg-gradient-to-r from-pee-300 to-amber-300 bg-clip-text text-transparent">Flow Roadmap</span>
          </h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            From humble bathroom breaks to revolutionary blockchain technology - witness our transformation into the world's most natural cryptocurrency ecosystem.
          </p>
        </div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pee-400 to-amber-400 rounded-full hidden lg:block shadow-glow"></div>
          
          {/* Timeline Glow Effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-full bg-gradient-to-b from-pee-400/20 to-amber-400/20 rounded-full hidden lg:block blur-sm"></div>
          
          <div className="space-y-16">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col group`}>
                {/* Content Card */}
                <div className="w-full lg:w-5/12 transform group-hover:scale-105 transition-all duration-500">
                  <div className={`bg-gradient-to-br ${item.bgColor} border-2 ${item.borderColor} rounded-2xl p-8 shadow-elevation-3 hover:shadow-glow-lg transition-all duration-500 relative overflow-hidden`}>
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Floating decorative elements */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-lg"></div>
                    
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-glow transform group-hover:rotate-12 transition-transform duration-500`}>
                            {item.icon}
                          </div>
                          <div>
                            <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">{item.phase}</span>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-pee-800 bg-clip-text text-transparent">{item.title}</h3>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(item.status)}
                          <div className="text-amber-700 text-sm font-medium mt-2">{item.date}</div>
                        </div>
                      </div>
                      
                      {/* Items Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {item.items.map((listItem, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg hover:bg-white/60 transition-colors duration-300 group/item">
                            <div className={`w-3 h-3 bg-gradient-to-r ${item.color} rounded-full flex-shrink-0 shadow-sm group-hover/item:scale-125 transition-transform duration-300`}></div>
                            <span className="text-amber-800 font-medium flex-1">{listItem}</span>
                            <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Timeline Node */}
                <div className="hidden lg:flex w-2/12 justify-center relative">
                  <div className="relative">
                    {/* Outer glow ring */}
                    <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-r ${item.color} rounded-full blur-md opacity-60 animate-pulse`}></div>
                    
                    {/* Main node */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-glow-lg flex items-center justify-center z-10 transform group-hover:scale-125 transition-all duration-500`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Connection lines */}
                    {index < roadmapItems.length - 1 && (
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
                    )}
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="w-full lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Bottom Message */}
        <div className="text-center mt-24">
          <div className="relative max-w-4xl mx-auto">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pee-400 to-amber-400 rounded-3xl blur-xl opacity-20"></div>
            
            <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-3xl p-12 shadow-elevation-3 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pee-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/30 to-pee-200/30 rounded-full blur-xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pee-500 to-amber-500 rounded-2xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pee-700 to-amber-700 bg-clip-text text-transparent">The Flow Never Stops</h3>
                </div>
                <p className="text-amber-800 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                  This roadmap represents just the beginning of our journey. As our community grows and innovation flows, 
                  we'll continue to revolutionize the intersection of bathroom habits and blockchain technology.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-800 font-semibold">Community Driven</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-800 font-semibold">Innovation First</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-800 font-semibold">Market Leading</span>
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

export default Roadmap;