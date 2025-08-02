import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X, Menu, Sparkles, Droplets } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-pee-900/95 to-amber-900/95 backdrop-blur-3xl border-b border-amber-700/30 shadow-elevation-2' 
        : 'backdrop-blur-xl bg-gradient-to-r from-pee-900/80 to-amber-900/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pee-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-elevation-2 group-hover:shadow-glow transform group-hover:scale-110 transition-all duration-300">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-pee-500 to-amber-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <span className="text-white font-display font-bold text-xl group-hover:text-pee-300 transition-colors">
                Pee Network
              </span>
              <div className="text-xs text-amber-300 -mt-1">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pee-400" />
                  Toilet Tech Revolution
                </span>
              </div>
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {[
              { name: 'Pee Blockchain', hasDropdown: true },
              { name: 'Ecosystem', hasDropdown: true },
              { name: 'About Us', hasDropdown: false },
              { name: 'Community', hasDropdown: true },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative px-4 py-2 rounded-xl hover:bg-amber-800/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-1 text-amber-200 group-hover:text-white cursor-pointer">
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pee-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* Premium Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="relative p-2 rounded-xl hover:bg-amber-800/20 group transition-all duration-300">
              <Search className="w-5 h-5 text-amber-300 group-hover:text-white" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-pee-400/20 to-amber-500/20 rounded-xl blur-lg"></div>
              </div>
            </button>
            
            <button className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 px-6 py-2.5 rounded-xl font-semibold text-amber-800 hover:border-amber-300 hover:shadow-elevation-2 transition-all duration-300 hover-lift">
              Launch App
            </button>
            
            <button className="bg-gradient-to-r from-pee-500 to-amber-500 hover:from-pee-600 hover:to-amber-600 py-2.5 px-6 text-sm rounded-xl text-white font-semibold shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-1 inline" />
              Connect Wallet
            </button>
          </div>

          {/* Premium Mobile Menu Button */}
          <button
            className="lg:hidden relative p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute top-0 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
              }`}></span>
              <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0 scale-0' : ''
              }`}></span>
              <span className={`absolute bottom-0 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ${
        isMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-gradient-to-r from-pee-900/95 to-amber-900/95 backdrop-blur-3xl border-t border-amber-700/30">
          <div className="px-4 py-8 space-y-6">
            {[
              'Pee Blockchain',
              'Ecosystem',
              'About Us',
              'Community'
            ].map((item, index) => (
              <div
                key={index}
                className="text-lg font-medium text-amber-200 hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </div>
            ))}
            
            <div className="pt-6 border-t border-amber-700/30 space-y-4">
              <button className="w-full bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 px-6 py-3 rounded-xl font-semibold text-amber-800 hover:border-amber-300 hover:shadow-elevation-2 transition-all duration-300">
                Launch App
              </button>
              
              <button className="w-full bg-gradient-to-r from-pee-500 to-amber-500 hover:from-pee-600 hover:to-amber-600 py-3 px-6 rounded-xl text-white font-semibold shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;