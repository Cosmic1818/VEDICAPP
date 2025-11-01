
import { useCallback } from 'react';

// --- Web Audio API Sound Generation ---

// Singleton AudioContext, lazily initialized on first use.
let audioCtx: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (audioCtx) return audioCtx;

  try {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    // Resume context on any user interaction if it's suspended.
    const resumeContext = () => {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      document.removeEventListener('click', resumeContext);
      document.removeEventListener('touchstart', resumeContext);
    };
    document.addEventListener('click', resumeContext);
    document.addEventListener('touchstart', resumeContext);
  } catch (e) {
    console.warn("Web Audio API is not supported in this browser.");
    return null;
  }
  return audioCtx;
};


type SoundType = 'click' | 'unlock' | 'complete' | 'slide';

const playSound = (type: SoundType) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // In case the context was suspended again after initialization
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    switch (type) {
        case 'click': {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
        }

        case 'unlock': {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(440, now); // A4
            oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
            oscillator.frequency.exponentialRampToValueAtTime(1318.51, now + 0.3); // E6

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.4, now + 0.02);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.3);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;
        }

        case 'complete': {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(783.99, now); // G5
            oscillator.frequency.linearRampToValueAtTime(1046.50, now + 0.2); // C6

            gainNode.gain.setValueAtTime(0.4, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.start(now);
            oscillator.stop(now + 0.4);
            break;
        }

        case 'slide': {
            const bufferSize = ctx.sampleRate * 0.2; // 0.2 seconds
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(200, now);
            filter.frequency.exponentialRampToValueAtTime(3000, now + 0.15);
            filter.Q.setValueAtTime(15, now);

            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            
            whiteNoise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);

            whiteNoise.start(now);
            whiteNoise.stop(now + 0.2);
            break;
        }
    }
};

/**
 * A React hook to play programmatically generated sounds using the Web Audio API.
 * This avoids the need for external audio files.
 * @param type The type of sound to play ('click', 'unlock', 'complete', 'slide').
 */
export const useAudio = (type: SoundType) => {
  const play = useCallback(() => {
    playSound(type);
  }, [type]);

  return { play };
};
