import React from 'react';
import { CheckCircle, Clock, Zap } from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "The Great Flush",
      status: "completed",
      date: "Q4 2023",
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
      items: [
        "🏪 PEE merchant adoption",
        "🏦 Decentralized Pee Bank (DPB)",
        "🌍 Global toilet partnerships",
        "🚀 Interplanetary pee mining"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Zap className="w-6 h-6 text-orange-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            The <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Flow Roadmap</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Our journey from simple bathroom breaks to global pee domination.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full hidden lg:block"></div>
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-8`}>
                {/* Content Card */}
                <div className="w-full lg:w-5/12">
                  <div className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-amber-50 rounded-xl p-6 shadow-lg border border-yellow-300 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                    {/* Paper texture overlay */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-yellow-400 to-amber-300"></div>
                    
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-orange-600 font-semibold text-sm">{item.phase}</span>
                          <h3 className="text-xl font-bold text-amber-800">{item.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className="text-amber-700 text-sm font-medium">{item.date}</span>
                        </div>
                      </div>
                      
                      {/* Items */}
                      <ul className="space-y-2">
                        {item.items.map((listItem, itemIndex) => (
                          <li key={itemIndex} className="flex items-center space-x-2 text-amber-700">
                            <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm">{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className={`w-12 h-12 rounded-full border-4 ${getStatusColor(item.status)} flex items-center justify-center z-10`}>
                    {getStatusIcon(item.status)}
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="w-full lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-amber-50 rounded-xl p-6 shadow-lg border border-yellow-300 relative overflow-hidden max-w-2xl mx-auto">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-yellow-400 to-amber-300"></div>
            <div className="relative">
              <h3 className="text-lg font-bold text-amber-800 mb-2">The Flow Never Stops</h3>
              <p className="text-amber-700 text-sm">
                This roadmap is just the beginning. As our community grows, so does our vision for the future of bathroom-based blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;