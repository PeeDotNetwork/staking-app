import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Ecosystem from './components/Ecosystem';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Ecosystem />
      <Roadmap />
      <Community />
      <Footer />
    </div>
  );
}

export default App;