import { Play, SkipForward, SkipBack, Pause, Menu, X, Shuffle, Repeat } from 'lucide-react';

const PlayBar = () => {
  return (
    <div className="absolute bottom-10 left-10 right-10 p-4">
            {/* Scroll Controls Visualization */}
            <div className="flex justify-center mb-4">
              <div className="text-white text-xs bg-black bg-opacity-30 rounded-full px-4 py-1 flex items-center">
                <span className="mr-3">Scroll to navigate</span>
                <span className="flex items-center justify-center w-6 h-6 bg-opacity-20 rounded-full mr-1">↑</span>
                <span className="flex items-center justify-center w-6 h-6 bg-opacity-20 rounded-full mr-2">↓</span>
                <span className="ml-3">Spacebar to play/pause</span>
                </div>
            </div>
          
            {/* Controls Section */}
            <div className="mt-4">
              {/* Progress Bar with Time */}
              <div className="flex items-center gap-2 text-gray-200 text-sm mb-4">
                <span>0:00</span>
                <div 
                  className="flex-1 bg-gray-600 h-2 rounded-full overflow-hidden cursor-pointer progress-bar relative group"
                >
                  <div 
                    className="h-full bg-white transition-all"
                    style={{ width: '0%' }}
                  />
                </div>
                <span>1:00</span>
              </div>
              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-8">
                <button 
                  className="cursor-pointer text-2xl transition-colors text-white hover:scale-105"
                >
                  <Shuffle size={20} />
                </button>
                <button 
                  className="cursor-pointer text-white hover:scale-105 transition-colors"
                >
                  <SkipBack size={20} style={{ fill: 'white' }} />
                </button>
                <button 
                  className="cursor-pointer text-white hover:scale-105 transition-colors p-2 rounded-full border-2 border-white"
                  style={{ backgroundColor: 'white' }}
                >
                  <Play size={28} style={{ fill: 'black' }} />
                </button>
                <button 
                  className="cursor-pointer text-white hover:scale-105 transition-colors"
                >
                  <SkipForward size={20} style={{ fill: 'white' }} />
                </button>
                <button 
                  className="cursor-pointer text-2xl transition-colors text-white hover:scale-105"
                >
                  <Repeat size={20} />
                </button>
              </div>
            </div>
          </div>
  );
};

export default PlayBar;