import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Ecosystem from './components/Ecosystem';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add custom cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-glow');
      if (cursor) {
        (cursor as HTMLElement).style.left = e.clientX + 'px';
        (cursor as HTMLElement).style.top = e.clientY + 'px';
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Premium cursor glow effect */}
      <div className="cursor-glow fixed w-64 h-64 pointer-events-none z-50 opacity-0 lg:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-radial from-pee-400/20 to-transparent blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Features />
        <Ecosystem />
        <Roadmap />
        <Community />
        <Footer />
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator hidden lg:block">
        <span className="sr-only">Scroll down</span>
      </div>
    </div>
  );
}

export default App;