
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useProgress, useSettings, useAudioContext } from '../App';
import { ExitFocusIcon } from '../assets/icons';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const FocusMode: React.FC<{ setView: (view: 'home' | 'focus') => void }> = ({ setView }) => {
  const { settings } = useSettings();
  const { addCompletedSession } = useProgress();
  const { playCompleteSound, playClickSound } = useAudioContext();

  const [mode, setMode] = useState<TimerMode>('work');
  const [isActive, setIsActive] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  const getInitialTime = useCallback(() => {
    switch (mode) {
      case 'work': return settings.timerLength * 60;
      case 'shortBreak': return settings.shortBreak * 60;
      case 'longBreak': return settings.longBreak * 60;
      default: return settings.timerLength * 60;
    }
  }, [mode, settings]);

  const [seconds, setSeconds] = useState(getInitialTime());
  
  useEffect(() => {
    setSeconds(getInitialTime());
    setIsActive(true); // Always start active in focus mode
  }, [settings.timerLength, settings.shortBreak, settings.longBreak, getInitialTime]);

  const nextMode = useCallback(() => {
    playCompleteSound();
    if (mode === 'work') {
      addCompletedSession();
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      setMode(newSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak');
    } else {
      setMode('work');
    }
    setIsActive(true);
  }, [mode, sessionCount, addCompletedSession, playCompleteSound]);

  useEffect(() => {
    setSeconds(getInitialTime());
  }, [mode, getInitialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            nextMode();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, nextMode]);
  
  const handleExit = () => {
    playClickSound();
    setView('home');
  }

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, [seconds]);

  const modeText = {
    work: 'Focusing...',
    shortBreak: 'On a short break...',
    longBreak: 'On a long break...',
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
       <button onClick={handleExit} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex gap-3 p-3 bg-white/20 dark:bg-black/20 rounded-full text-orange-900 dark:text-orange-200 hover:bg-white/40 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300 shadow-lg">
          <ExitFocusIcon className="w-6 h-6" />
        </button>

      <div className="text-center">
        <h1 className="text-xl sm:text-2xl text-orange-900 dark:text-orange-200 mb-4">{modeText[mode]}</h1>
        <div className="font-lora text-8xl sm:text-9xl md:text-[15rem] font-bold text-orange-950 dark:text-orange-100 tabular-nums">
          {formattedTime}
        </div>
        <button 
          onClick={() => {
            playClickSound();
            setIsActive(!isActive);
          }}
          className="mt-8 px-8 py-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm text-lg font-semibold text-orange-900 dark:text-orange-200 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300"
        >
          {isActive ? 'PAUSE' : 'RESUME'}
        </button>
      </div>
    </div>
  );
};

export default FocusMode;
