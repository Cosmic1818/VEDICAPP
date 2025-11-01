
import React, { useEffect, useState } from 'react';
import { Badge } from '../types';

interface BadgeUnlockModalProps {
  badge: Badge;
  onClose: () => void;
}

const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Allow animation to finish
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative text-center p-8 bg-gradient-to-br from-amber-200 to-orange-400 dark:from-gray-800 dark:to-orange-950 rounded-3xl shadow-2xl border-2 border-amber-400 dark:border-orange-500 max-w-sm w-full transition-all duration-500 ease-out ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32">
          <img 
            src={badge.imageUrl} 
            alt={badge.name} 
            className="w-full h-full rounded-full border-4 border-amber-300 dark:border-orange-500 shadow-lg object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-yellow-300/50 animate-ping -z-10"></div>
        </div>

        <div className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-800 dark:text-orange-300">Achievement Unlocked!</p>
          <h2 className="font-lora text-4xl font-bold my-2 text-gray-900 dark:text-white">{badge.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{badge.description}</p>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-orange-800 text-white font-semibold rounded-full hover:bg-orange-900 transition-colors duration-300 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeUnlockModal;
