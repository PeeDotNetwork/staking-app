import React from 'react';
import { Users, MessageCircle, Trophy, Heart } from 'lucide-react';

const Community = () => {
  const communityStats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "50M+",
      label: "Active Urinators",
      description: "Miners worldwide"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      number: "2.5M+",
      label: "Daily Flushes",
      description: "Mining sessions"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      number: "420",
      label: "Countries",
      description: "Global reach"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      number: "99.9%",
      label: "Satisfaction",
      description: "Relief rate"
    }
  ];

  const testimonials = [
    {
      name: "Sarah P.",
      role: "Professional Hydrator",
      avatar: "👩‍💼",
      quote: "I never thought my bathroom breaks could be this profitable! I've earned enough PEE to buy a golden toilet NFT!"
    },
    {
      name: "Mike Stream",
      role: "Stream Team Captain",
      avatar: "👨‍💻",
      quote: "Leading my pee-mates to victory in the global bladder championships. This is the future of mining!"
    },
    {
      name: "Dr. Flush",
      role: "Blockchain Urologist",
      avatar: "👨‍⚕️",
      quote: "From a medical perspective, Pee Network encourages healthy hydration habits while earning crypto. Genius!"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-900 to-pee-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pee-400/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-400/15 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the <span className="bg-gradient-to-r from-pee-300 to-amber-300 bg-clip-text text-transparent">Stream Community</span>
          </h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Connect with millions of urinators worldwide who are turning their bathroom breaks into blockchain rewards.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityStats.map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 relative text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pee-50/30 to-amber-50/30"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-pee-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-105 transition-transform duration-200 shadow-glow">
                    {stat.icon}
                  </div>
                  
                  {/* Stats */}
                  <div className="text-3xl font-bold bg-gradient-to-r from-pee-600 to-amber-600 bg-clip-text text-transparent mb-1">{stat.number}</div>
                  <div className="bg-gradient-to-r from-pee-700 to-amber-700 bg-clip-text text-transparent font-semibold mb-1">{stat.label}</div>
                  <div className="text-amber-800 text-sm">{stat.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">What Our Urinators Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pee-50/30 to-amber-50/30"></div>
                  
                  <div className="relative">
                    {/* Avatar & Info */}
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3 p-2 bg-gradient-to-br from-pee-100 to-amber-100 rounded-full">{testimonial.avatar}</div>
                      <div>
                        <div className="font-bold bg-gradient-to-r from-pee-700 to-amber-700 bg-clip-text text-transparent">{testimonial.name}</div>
                        <div className="text-amber-800 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <p className="text-amber-800 italic leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-8 shadow-elevation-3 relative max-w-3xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pee-50/30 to-amber-50/30"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pee-700 to-amber-700 bg-clip-text text-transparent mb-4">Ready to Join the Flow?</h3>
              <p className="text-amber-800 mb-6 leading-relaxed">
                Become part of the world's most natural cryptocurrency community. Start mining while you pee and connect with fellow urinators globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-pee-500 to-amber-500 hover:from-pee-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-glow">
                  🚽 Download PEE App
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-elevation-2">
                  💬 Join Discord
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;