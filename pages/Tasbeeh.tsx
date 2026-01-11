
import React, { useState, useEffect } from 'react';
import { RotateCcw, Settings, Check } from 'lucide-react';

const Tasbeeh: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [isResetting, setIsResetting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load state
  useEffect(() => {
    const savedCount = localStorage.getItem('tasbeehCount');
    if (savedCount) setCount(parseInt(savedCount, 10));
    
    // Check if vibration is supported
    if (!navigator.vibrate) console.log("Vibration not supported");
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('tasbeehCount', count.toString());
  }, [count]);

  const handleCount = () => {
    // Animation trigger
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    const newCount = count + 1;
    setCount(newCount);

    // Haptic Feedback - LIGHTER (5ms)
    if (navigator.vibrate) {
      if (newCount % target === 0) {
        navigator.vibrate([50, 70, 50]); // Completion pattern (Stronger)
      } else {
        navigator.vibrate(5); // Very Light Tick
      }
    }
    
    // Reset "Reset" button state if user continues counting
    if (isResetting) setIsResetting(false);
  };

  const handleReset = () => {
    if (isResetting) {
      setCount(0);
      setIsResetting(false);
      if (navigator.vibrate) navigator.vibrate(10);
    } else {
      setIsResetting(true);
      // Auto cancel reset state after 3 seconds
      setTimeout(() => setIsResetting(false), 3000);
    }
  };

  const toggleTarget = () => {
    setTarget(prev => prev === 33 ? 99 : 33);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  // SVG Configuration
  const svgSize = 280;
  const radius = 120; 
  const stroke = 12;
  const center = svgSize / 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // Progress Calculation
  const cycleProgress = count % target;
  // If we just finished a cycle (count > 0 and mod is 0), show full ring instead of empty
  const displayProgress = (cycleProgress === 0 && count > 0) ? target : cycleProgress;
  const strokeDashoffset = circumference - (displayProgress / target) * circumference;

  const cycles = Math.floor(count / target);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-20%] w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none transition-colors duration-500"></div>

      {/* Header */}
      <div className="flex justify-between items-start p-6 z-10">
        <div>
           <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-arabic tracking-wide">Tasbeeh</h1>
           <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">Target: {target}</p>
        </div>
        
        {/* Total Cycles Badge */}
        <div className="bg-emerald-100 dark:bg-emerald-900/40 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm border border-emerald-200 dark:border-emerald-800/50">
           Cycles Completed: <span className="text-lg ml-1">{cycles}</span>
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 -mt-8">
        
        <div className="relative flex items-center justify-center">
            {/* SVG Ring */}
            <svg
              height={svgSize}
              width={svgSize}
              className="transform -rotate-90 absolute pointer-events-none"
            >
              {/* Background Track */}
              <circle
                stroke="currentColor"
                strokeWidth={stroke}
                fill="transparent"
                r={normalizedRadius}
                cx={center}
                cy={center}
                className="text-gray-200 dark:text-gray-800 transition-colors duration-300"
              />
              {/* Active Progress */}
              <circle
                stroke="currentColor"
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="transparent"
                r={normalizedRadius}
                cx={center}
                cy={center}
                className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              />
            </svg>

            {/* Main Click Button */}
            <button 
                onClick={handleCount}
                className={`
                    w-48 h-48 rounded-full 
                    bg-white dark:bg-gray-800 
                    shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]
                    flex flex-col items-center justify-center
                    transition-all duration-100 ease-out
                    border-4 border-gray-50 dark:border-gray-700/50
                    active:scale-95 active:border-emerald-500/30
                    group relative z-20
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <div className={`transition-transform duration-150 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                    <span className="text-6xl font-bold text-gray-800 dark:text-white font-mono tracking-tighter tabular-nums select-none">
                        {count}
                    </span>
                </div>
                <span className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-medium group-active:text-emerald-500 transition-colors">Tap</span>
            </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="px-6 pb-10 w-full max-w-sm mx-auto z-10">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 p-2 flex justify-between items-center">
            
            {/* Reset Button */}
            <button 
                onClick={handleReset}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    isResetting 
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold ring-2 ring-red-100 dark:ring-red-900/50' 
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
                <div className={`transition-transform duration-300 ${isResetting ? 'rotate-180' : ''}`}>
                   {isResetting ? <Check size={20} /> : <RotateCcw size={20} />}
                </div>
                <span className="text-sm font-medium">{isResetting ? 'Confirm?' : 'Reset'}</span>
            </button>

            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

            {/* Target Toggle */}
            <button 
                onClick={toggleTarget}
                className="flex-1 py-3 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 duration-200"
            >
                <Settings size={20} className={target === 99 ? 'text-emerald-500' : ''} />
                <span className="text-sm font-medium">Set {target === 33 ? '99' : '33'}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Tasbeeh;
