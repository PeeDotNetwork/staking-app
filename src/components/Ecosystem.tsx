import React from 'react';
import { Smartphone, Globe, TrendingUp, Users, Coins, Award } from 'lucide-react';

const Ecosystem = () => {
  const ecosystemItems = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "PEE Mobile App",
      description: "Mine while you pee with our intuitive mobile interface",
      status: "Live",
      statusColor: "bg-green-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "PeeChain Explorer",
      description: "Track your urine... we mean, earnings on the blockchain",
      status: "Live",
      statusColor: "bg-green-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Liquid Gold Exchange",
      description: "Trade PEE for other cryptocurrencies and fiat",
      status: "Coming Soon",
      statusColor: "bg-orange-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stream Teams",
      description: "Form urination alliances and compete globally",
      status: "Beta",
      statusColor: "bg-blue-500"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Golden Stream Pool",
      description: "Stake your PEE and earn Liquid Gold rewards",
      status: "Coming Soon",
      statusColor: "bg-orange-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Toilet NFT Marketplace",
      description: "Buy, sell, and trade rare bathroom collectibles",
      status: "Q2 2025",
      statusColor: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            The <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Pee Ecosystem</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            A comprehensive suite of tools and platforms built around the natural flow of digital currency.
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemItems.map((item, index) => (
            <div key={index} className="group particle-container">
              <div className="paper-card premium-card ripple-effect rounded-xl p-6 shadow-premium relative">
                {/* Paper texture overlay */}
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-glow-premium icon-glow">
                      {item.icon}
                    </div>
                    <span className={`${item.statusColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {item.status}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold gradient-text-glow mb-2">{item.title}</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="paper-card premium-card rounded-xl p-8 shadow-glow-premium relative particle-container">
            <div className="relative">
              <h3 className="text-2xl font-bold gradient-text-glow text-center mb-8">Ecosystem Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text-glow mb-2">100M+</div>
                  <div className="text-amber-700 text-sm font-medium">Flushes Recorded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text-glow mb-2">420</div>
                  <div className="text-amber-700 text-sm font-medium">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text-glow mb-2">50M+</div>
                  <div className="text-amber-700 text-sm font-medium">Active Urinators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text-glow mb-2">0</div>
                  <div className="text-amber-700 text-sm font-medium">Kilowatts per Piss</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;