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
    <section className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Stream Community</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Connect with millions of urinators worldwide who are turning their bathroom breaks into blockchain rewards.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityStats.map((stat, index) => (
            <div key={index} className="group particle-container">
              <div className="paper-card premium-card ripple-effect rounded-xl p-6 shadow-premium relative text-center">
                {/* Paper texture overlay */}
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-glow-premium icon-glow">
                    {stat.icon}
                  </div>
                  
                  {/* Stats */}
                  <div className="text-3xl font-bold gradient-text-glow mb-1">{stat.number}</div>
                  <div className="gradient-text font-semibold mb-1">{stat.label}</div>
                  <div className="text-amber-700 text-sm">{stat.description}</div>
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
              <div key={index} className="group particle-container">
                <div className="paper-card premium-card ripple-effect rounded-xl p-6 shadow-premium relative">
                  {/* Paper texture overlay */}
                  
                  <div className="relative">
                    {/* Avatar & Info */}
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="font-bold gradient-text">{testimonial.name}</div>
                        <div className="text-amber-700 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <p className="text-amber-700 italic leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="text-center">
          <div className="paper-card premium-card rounded-xl p-8 shadow-glow-premium relative max-w-3xl mx-auto particle-container">
            <div className="relative">
              <h3 className="text-2xl font-bold gradient-text-glow mb-4">Ready to Join the Flow?</h3>
              <p className="text-amber-700 mb-6 leading-relaxed">
                Become part of the world's most natural cryptocurrency community. Start mining while you pee and connect with fellow urinators globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary ripple-effect">
                  🚽 Download PEE App
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ripple-effect shadow-premium">
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