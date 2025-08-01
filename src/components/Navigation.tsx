import React, { useState } from 'react';
import { Search, ChevronDown, X, Facebook, Youtube, Instagram } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-professional glow-effect">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-white font-semibold text-xl text-professional">Pee Network</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-105">
              <span>Pee Blockchain</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-105">
              <span>Ecosystem</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-105">About Us</span>
            <div className="flex items-center space-x-1 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-105">
              <span>Community</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Social Icons & Search */}
          <div className="hidden md:flex items-center space-x-4">
            <X className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Facebook className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Youtube className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Instagram className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
            <Search className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-full h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-full h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/20">
          <div className="px-4 py-6 space-y-4">
            <div className="text-white hover:text-orange-400 cursor-pointer transition-all duration-300">Pee Blockchain</div>
            <div className="text-white hover:text-orange-400 cursor-pointer transition-all duration-300">Ecosystem</div>
            <div className="text-white hover:text-orange-400 cursor-pointer transition-all duration-300">About Us</div>
            <div className="text-white hover:text-orange-400 cursor-pointer transition-all duration-300">Community</div>
            <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
              <X className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
              <Facebook className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
              <Youtube className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
              <Instagram className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
              <Search className="w-5 h-5 text-white hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;