
import React, { useEffect, useRef } from 'react';
import { useSettings, useAudioContext } from '../App';
import { CloseIcon } from '../assets/icons';

interface SettingsPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const wallpapers = [
  { name: 'Saffron Dawn', class: 'bg-gradient-to-br from-orange-50 to-orange-200 dark:from-gray-800 dark:to-orange-900' },
  { name: 'Cosmic Night', class: 'bg-gradient-to-br from-indigo-200 to-slate-800 dark:from-slate-900 dark:to-black' },
  { name: 'Forest Hermitage', class: 'bg-gradient-to-br from-green-200 to-yellow-800 dark:from-green-900 dark:to-gray-800' },
  { name: 'Temple Stone', class: 'bg-gradient-to-br from-slate-300 to-gray-500 dark:from-slate-700 dark:to-gray-900' },
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, setIsOpen }) => {
  const { settings, updateSettings } = useSettings();
  const { playClickSound, playSlideSound } = useAudioContext();
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    // Play sound only when opening the panel
    if (isOpen && !prevIsOpenRef.current) {
      playSlideSound();
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, playSlideSound]);

  const handleClose = () => {
    playClickSound();
    setIsOpen(false);
  };
  
  const handleUpdate = <K extends keyof typeof settings,>(key: K, value: (typeof settings)[K]) => {
     playClickSound();
     updateSettings({ [key]: value });
  };
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } p-6 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-lora text-3xl font-bold text-orange-900 dark:text-orange-200">Settings</h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-6 pr-2">
          {/* Sound Settings */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-orange-900 dark:text-orange-200">Vedic Sound</label>
            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/30 rounded-lg">
              <span>Enable sound effects</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.soundEnabled} onChange={(e) => handleUpdate('soundEnabled', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
          
          {/* Wallpaper Settings */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-orange-900 dark:text-orange-200">Vedic Wallpaper</label>
            <div className="grid grid-cols-2 gap-3">
              {wallpapers.map(wp => (
                <button
                  key={wp.name}
                  onClick={() => handleUpdate('wallpaper', wp.class)}
                  className={`p-2 rounded-lg border-2 transition-all ${settings.wallpaper === wp.class ? 'border-orange-500 scale-105' : 'border-transparent hover:border-orange-300'}`}
                >
                  <div className={`w-full h-16 rounded ${wp.class}`}></div>
                  <span className="text-sm mt-1 block">{wp.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Timer Duration Settings */}
          <div className="space-y-4">
            <label className="text-lg font-semibold text-orange-900 dark:text-orange-200">Timer Durations (minutes)</label>
            <div className='space-y-2'>
              <div className="flex items-center justify-between">
                <span>Focus</span>
                <input type="number" value={settings.timerLength} onChange={e => handleUpdate('timerLength', Number(e.target.value))} className="w-20 p-1 rounded bg-white/50 dark:bg-black/30 text-center" />
              </div>
              <div className="flex items-center justify-between">
                <span>Short Break</span>
                <input type="number" value={settings.shortBreak} onChange={e => handleUpdate('shortBreak', Number(e.target.value))} className="w-20 p-1 rounded bg-white/50 dark:bg-black/30 text-center" />
              </div>
              <div className="flex items-center justify-between">
                <span>Long Break</span>
                <input type="number" value={settings.longBreak} onChange={e => handleUpdate('longBreak', Number(e.target.value))} className="w-20 p-1 rounded bg-white/50 dark:bg-black/30 text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
