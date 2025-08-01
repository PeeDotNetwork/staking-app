import React from 'react';

const PhoneMockup = () => {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-72 h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-professional transform rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-105 float-animation">
        {/* Screen */}
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 border border-white rounded-sm">
                <div className="w-3 h-1 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="px-6 py-4 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 h-full">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-professional glow-effect">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <h2 className="gradient-text text-lg font-bold">Pee Network</h2>
              <p className="text-white text-sm font-medium">Welcome You!</p>
            </div>
            
            {/* Mining Circle */}
            <div className="relative flex justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center relative shadow-professional glow-effect">
                {/* Rotating Ring */}
                <div className="absolute inset-0 border-4 border-orange-300 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-white rounded-full mx-auto mb-1 flex items-center justify-center shadow-lg">
                      <span className="text-purple-600 text-lg">🚽</span>
                    </div>
                    <div className="text-white text-xs font-bold">Flush</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mining Info */}
            <div className="paper-card rounded-lg p-4 mb-4 shadow-lg">
              <div className="text-white text-sm mb-2">
                <span className="gradient-text font-bold">💧 Flow Rate:</span> <span className="text-amber-700 font-semibold">0.12 PEE/h</span>
              </div>
              <div className="text-white text-sm mb-2">
                <span className="gradient-text font-bold">🧪 Bladder Balance:</span> <span className="text-amber-700 font-semibold">1,234.56 PEE</span>
              </div>
              <div className="text-white text-sm">
                <span className="gradient-text font-bold">🚽 Pee-mates:</span> <span className="text-amber-700 font-semibold">8 Active Urinators</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                FLUSH TO MINE
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                INVITE PEE-MATES
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full animate-bounce delay-100 shadow-lg glow-effect"></div>
      <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce delay-300 shadow-lg glow-effect"></div>
      <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
    </div>
  );
};

export default PhoneMockup;