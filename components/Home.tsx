
import React, { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import ProgressTracker from './ProgressTracker';
import QuoteDisplay from './QuoteDisplay';
import SettingsPanel from './SettingsPanel';
import { SettingsIcon, FocusIcon } from '../assets/icons';
import { useAudioContext } from '../App';

interface HomeProps {
  setView: (view: 'home' | 'focus') => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { playClickSound } = useAudioContext();

  const handleFocusClick = () => {
    playClickSound();
    setView('focus');
  };

  const handleSettingsClick = () => {
    playClickSound();
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <main className="relative min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center transition-all duration-500">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex gap-3">
        <button onClick={handleFocusClick} className="p-3 bg-white/20 dark:bg-black/20 rounded-full text-orange-900 dark:text-orange-200 hover:bg-white/40 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300 shadow-lg">
          <FocusIcon className="w-6 h-6" />
        </button>
        <button onClick={handleSettingsClick} className="p-3 bg-white/20 dark:bg-black/20 rounded-full text-orange-900 dark:text-orange-200 hover:bg-white/40 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300 shadow-lg">
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="w-full max-w-md lg:max-w-lg space-y-8 flex-shrink-0">
          <QuoteDisplay />
          <PomodoroTimer />
        </div>
        <div className="w-full max-w-md lg:max-w-sm">
          <ProgressTracker />
        </div>
      </div>
      
      <SettingsPanel isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
    </main>
  );
};

export default Home;
