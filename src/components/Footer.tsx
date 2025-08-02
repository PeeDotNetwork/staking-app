import React from 'react';
import { Facebook, Youtube, Instagram, X, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    "Pee Blockchain": [
      "How It Works",
      "Flush-to-Earn Guide",
      "Bladder Security",
      "PeeChain Explorer"
    ],
    "Ecosystem": [
      "Mobile App",
      "Toilet NFTs",
      "Stream Teams",
      "Golden Pool Staking"
    ],
    "Community": [
      "Discord",
      "Telegram",
      "Reddit",
      "Urinator Forum"
    ],
    "Resources": [
      "Whitepaper",
      "Flow Roadmap",
      "API Documentation",
      "Pee-rivacy Policy"
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-pee-900 to-amber-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pee-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pee-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-elevation-2">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-white font-display font-semibold text-2xl">Pee Network</span>
            </div>
            <p className="text-amber-200 mb-6 leading-relaxed">
              The first digital currency you can mine while you pee. Turn your bathroom breaks into blockchain rewards with zero energy cost.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-amber-800/50 hover:bg-pee-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-elevation-2">
                <X className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-800/50 hover:bg-pee-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-elevation-2">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-800/50 hover:bg-pee-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-elevation-2">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-800/50 hover:bg-pee-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-elevation-2">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-amber-200 hover:text-pee-400 transition-colors duration-300 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="border-t border-amber-800/30 pt-8 mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 shadow-elevation-2 border border-amber-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-pee-400 to-amber-300"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold bg-gradient-to-r from-pee-600 to-amber-600 bg-clip-text text-transparent mb-2">Stay in the Flow</h3>
                <p className="text-amber-700">Get the latest updates on Pee Network developments and mining tips.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 md:w-64 px-4 py-2 rounded-l-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-pee-500 focus:border-transparent bg-white/80"
                />
                <button className="bg-gradient-to-r from-pee-500 to-amber-500 hover:from-pee-600 hover:to-amber-600 text-white px-6 py-2 rounded-r-lg transition-all duration-300 font-semibold shadow-elevation-2 hover:shadow-elevation-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-amber-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-amber-200 text-sm mb-4 md:mb-0">
            © 2024 Pee Network. All rights reserved. | The only coin that flows naturally.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-amber-200 hover:text-pee-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-amber-200 hover:text-pee-400 transition-colors duration-300">
              Pee-rivacy Policy
            </a>
            <a href="#" className="text-amber-200 hover:text-pee-400 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
        
        {/* Fun Footer Message */}
        <div className="text-center mt-8 pt-8 border-t border-amber-800/30">
          <p className="text-amber-300 text-sm italic">
            🚽 "Pee the change you want to see in the world" - Satoshi Splash, Founder
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;