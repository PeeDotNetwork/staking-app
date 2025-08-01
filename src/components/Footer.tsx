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
    <footer className="bg-gradient-to-b from-purple-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-white font-semibold text-2xl">Pee Network</span>
            </div>
            <p className="text-purple-200 mb-6 leading-relaxed">
              The first digital currency you can mine while you pee. Turn your bathroom breaks into blockchain rewards with zero energy cost.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-purple-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-colors duration-300">
                <X className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-colors duration-300">
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
                    <a href="#" className="text-purple-200 hover:text-orange-400 transition-colors duration-300 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="border-t border-purple-800 pt-8 mb-8">
          <div className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-amber-50 rounded-xl p-6 shadow-lg border border-yellow-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-yellow-400 to-amber-300"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-amber-800 mb-2">Stay in the Flow</h3>
                <p className="text-amber-700">Get the latest updates on Pee Network developments and mining tips.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 md:w-64 px-4 py-2 rounded-l-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-r-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-purple-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-purple-200 text-sm mb-4 md:mb-0">
            © 2024 Pee Network. All rights reserved. | The only coin that flows naturally.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-purple-200 hover:text-orange-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-purple-200 hover:text-orange-400 transition-colors duration-300">
              Pee-rivacy Policy
            </a>
            <a href="#" className="text-purple-200 hover:text-orange-400 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
        
        {/* Fun Footer Message */}
        <div className="text-center mt-8 pt-8 border-t border-purple-800">
          <p className="text-purple-300 text-sm italic">
            🚽 "Pee the change you want to see in the world" - Satoshi Splash, Founder
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;