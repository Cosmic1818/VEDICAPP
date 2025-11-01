
import React from 'react';
import { useProgress } from '../App';
import { badges } from '../data/badges';

const ProgressTracker: React.FC = () => {
  const { completedSessions, lastUnlockedBadge, nextBadge } = useProgress();

  const currentBadge = lastUnlockedBadge || { name: 'Initiate', imageUrl: 'https://picsum.photos/seed/initiate/100' };

  const progressPercentage = nextBadge
    ? ( (completedSessions - (lastUnlockedBadge?.sessionsRequired || 0) ) / (nextBadge.sessionsRequired - (lastUnlockedBadge?.sessionsRequired || 0)) ) * 100
    : 100;

  return (
    <div className="p-6 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-black/20 text-center">
      <h3 className="font-lora text-2xl font-bold text-orange-900 dark:text-orange-200 mb-4">Your Journey</h3>
      <div className="flex items-center justify-center gap-4 mb-4">
        <img src={currentBadge.imageUrl} alt={currentBadge.name} className="w-16 h-16 rounded-full border-2 border-orange-300 dark:border-orange-600 shadow-lg"/>
        <div>
          <p className="font-semibold text-lg">{currentBadge.name}</p>
          <p className="text-sm opacity-80">Current Rank</p>
        </div>
      </div>
      
      <p className="mb-4">
        <span className="font-bold text-3xl text-orange-950 dark:text-orange-100">{completedSessions}</span>
        <span className="opacity-80"> sessions completed</span>
      </p>

      {nextBadge && (
        <div>
          <p className="text-sm mb-2 opacity-90">Next achievement: <span className="font-bold">{nextBadge.name}</span></p>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-4 overflow-hidden border border-black/10 dark:border-white/10">
            <div 
              className="bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-500 dark:to-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1 opacity-70">
            <span>{lastUnlockedBadge?.sessionsRequired || 0}</span>
            <span>{nextBadge.sessionsRequired}</span>
          </div>
        </div>
      )}

      {!nextBadge && (
        <p className="mt-4 text-amber-600 dark:text-amber-400 font-semibold">You have achieved the highest rank. The journey continues within.</p>
      )}

    </div>
  );
};

export default ProgressTracker;
