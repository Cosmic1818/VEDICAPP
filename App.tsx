
import React, { useState, useCallback, useMemo, useEffect, createContext, useContext } from 'react';
import Home from './components/Home';
import FocusMode from './components/FocusMode';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Badge, Settings, QuoteCategory } from './types';
import { badges } from './data/badges';
import BadgeUnlockModal from './components/BadgeUnlockModal';
import { useAudio } from './hooks/useAudio';

// --- Contexts ---
interface ProgressContextType {
  completedSessions: number;
  addCompletedSession: () => void;
  lastUnlockedBadge: Badge | null;
  nextBadge: Badge | null;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}
const SettingsContext = createContext<SettingsContextType | null>(null);

interface AudioContextType {
  playClickSound: () => void;
  playUnlockSound: () => void;
  playCompleteSound: () => void;
  playSlideSound: () => void;
}
const AudioContext = createContext<AudioContextType | null>(null);

// --- App Component ---
const App: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('vedic_focus_settings', {
    soundEnabled: true,
    wallpaper: 'bg-gradient-to-br from-orange-50 to-orange-200 dark:from-gray-800 dark:to-orange-900',
    timerLength: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [completedSessions, setCompletedSessions] = useLocalStorage<number>('vedic_focus_sessions', 0);
  const [view, setView] = useState<'home' | 'focus'>('home');
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  const { play: playClick } = useAudio('click');
  const { play: playUnlock } = useAudio('unlock');
  const { play: playComplete } = useAudio('complete');
  const { play: playSlide } = useAudio('slide');

  const audioContextValue = useMemo(() => ({
    playClickSound: () => settings.soundEnabled && playClick(),
    playUnlockSound: () => settings.soundEnabled && playUnlock(),
    playCompleteSound: () => settings.soundEnabled && playComplete(),
    playSlideSound: () => settings.soundEnabled && playSlide(),
  }), [settings.soundEnabled, playClick, playUnlock, playComplete, playSlide]);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, [setSettings]);

  const addCompletedSession = useCallback(() => {
    setCompletedSessions(prev => prev + 1);
  }, [setCompletedSessions]);

  useEffect(() => {
    const lastBadge = [...badges].reverse().find(b => completedSessions >= b.sessionsRequired);
    const newBadge = badges.find(b => completedSessions === b.sessionsRequired);
    if (newBadge && (!lastBadge || newBadge.id > lastBadge.id || newBadge.id === lastBadge.id)) {
        setNewlyUnlockedBadge(newBadge);
        audioContextValue.playUnlockSound();
    }
  }, [completedSessions, audioContextValue]);

  const progressContextValue = useMemo(() => {
    const lastUnlockedBadge = [...badges].reverse().find(b => completedSessions >= b.sessionsRequired) || null;
    const nextBadge = badges.find(b => completedSessions < b.sessionsRequired) || null;
    return { completedSessions, addCompletedSession, lastUnlockedBadge, nextBadge };
  }, [completedSessions, addCompletedSession]);

  const wallpaperClasses = `min-h-screen w-full text-gray-800 dark:text-gray-200 transition-colors duration-1000 ${settings.wallpaper}`;

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <ProgressContext.Provider value={progressContextValue}>
        <AudioContext.Provider value={audioContextValue}>
          <div className={wallpaperClasses}>
            {view === 'home' && <Home setView={setView} />}
            {view === 'focus' && <FocusMode setView={setView} />}
            {newlyUnlockedBadge && (
              <BadgeUnlockModal badge={newlyUnlockedBadge} onClose={() => setNewlyUnlockedBadge(null)} />
            )}
          </div>
        </AudioContext.Provider>
      </ProgressContext.Provider>
    </SettingsContext.Provider>
  );
};

// --- Custom Hooks for Contexts ---
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudioContext must be used within an AudioProvider');
  return context;
};

export default App;
