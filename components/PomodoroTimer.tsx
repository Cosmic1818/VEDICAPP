import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useProgress, useSettings, useAudioContext } from '../App';
import { PlayIcon, PauseIcon, ResetIcon } from '../assets/icons';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
  const { settings } = useSettings();
  const { addCompletedSession } = useProgress();
  const { playClickSound, playCompleteSound } = useAudioContext();

  const [mode, setMode] = useState<TimerMode>('work');
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false); // State for celebration animation

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
    setIsActive(false);
  }, [settings.timerLength, settings.shortBreak, settings.longBreak, getInitialTime]);

  // Effect to turn off the celebration animation after it plays
  useEffect(() => {
    if (isCompleting) {
      const timerId = setTimeout(() => setIsCompleting(false), 1200);
      return () => clearTimeout(timerId);
    }
  }, [isCompleting]);

  const nextMode = useCallback(() => {
    playCompleteSound();
    if (mode === 'work') {
      addCompletedSession();
      setIsCompleting(true); // Trigger celebration
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      setMode(newSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak');
    } else {
      setMode('work');
    }
    setIsActive(false);
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

  const toggleTimer = () => {
    playClickSound();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    playClickSound();
    setIsActive(false);
    setSeconds(getInitialTime());
  };

  const selectMode = (newMode: TimerMode) => {
    playClickSound();
    if (isActive) return;
    setMode(newMode);
    setSeconds(getInitialTime());
  };
  
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, [seconds]);

  const progressPercentage = useMemo(() => {
    const totalDuration = getInitialTime();
    return ((totalDuration - seconds) / totalDuration) * 100;
  }, [seconds, getInitialTime]);

  const modeText = {
    work: 'Focus Session',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <div className={`p-6 md:p-8 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl text-center relative overflow-hidden border-2 transform transition-all duration-700 ease-in-out ${isCompleting ? 'border-emerald-400 dark:border-emerald-500 shadow-emerald-500/40 dark:shadow-emerald-400/40 scale-[1.03]' : 'border-white/20 dark:border-black/20'}`}>
        <div 
          className="absolute top-0 left-0 bottom-0 bg-orange-300/50 dark:bg-orange-600/50 transition-all duration-500 ease-linear"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="relative z-10">
            <div className="flex justify-center gap-2 sm:gap-4 mb-4">
                {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => selectMode(m)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full transition-all duration-300 ${
                            mode === m
                                ? 'bg-orange-900/80 text-white shadow-md'
                                : 'bg-white/50 dark:bg-black/50 text-orange-900/80 dark:text-orange-200/80 hover:bg-white/80 dark:hover:bg-black/80'
                        }`}
                    >
                       {m === 'work' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
                    </button>
                ))}
            </div>

            <div className="font-lora text-6xl sm:text-8xl md:text-9xl font-bold text-orange-950 dark:text-orange-100 my-4 md:my-6 tabular-nums">
                {formattedTime}
            </div>
            
            <p className="text-orange-800 dark:text-orange-300 mb-6 text-lg">{modeText[mode]}</p>

            <div className="flex justify-center items-center gap-4">
                <button onClick={resetTimer} className="p-4 rounded-full bg-white/50 dark:bg-black/50 text-orange-900 dark:text-orange-200 hover:bg-white/80 dark:hover:bg-black/80 transition-transform duration-300 hover:scale-105 shadow-lg">
                    <ResetIcon className="w-6 h-6" />
                </button>
                <button onClick={toggleTimer} className="px-10 py-5 rounded-full bg-orange-800 text-white hover:bg-orange-900 transition-all duration-300 text-xl font-bold shadow-xl flex items-center gap-2 transform hover:scale-105">
                    {isActive ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7" />}
                    <span>{isActive ? 'PAUSE' : 'START'}</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default PomodoroTimer;