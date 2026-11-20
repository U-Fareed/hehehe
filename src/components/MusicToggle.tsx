import {useEffect, useRef, useState} from 'react';
import {checkAudioExists} from '../audioProbe';

interface MusicToggleProps {
  src?: string;
}

export function MusicToggle({src}: MusicToggleProps) {
  const [available, setAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    checkAudioExists(src).then((exists) => {
      if (!active || !exists || !src) {
        return;
      }
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
      setAvailable(true);
    });

    return () => {
      active = false;
      if (fadeTimerRef.current) {
        window.clearInterval(fadeTimerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  if (!available) {
    return null;
  }

  const fadeVolume = (target: number, durationMs: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
    }
    const steps = 20;
    const interval = Math.max(20, Math.round(durationMs / steps));
    const startVol = audio.volume;
    const delta = (target - startVol) / steps;
    let currentStep = 0;

    fadeTimerRef.current = window.setInterval(() => {
      currentStep += 1;
      audio.volume = Math.max(0, Math.min(1, startVol + delta * currentStep));
      if (currentStep >= steps) {
        if (fadeTimerRef.current) {
          window.clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
        audio.volume = target;
        onDone?.();
      }
    }, interval);
  };

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (!isPlaying) {
      audio.volume = 0;
      audio.play().catch(() => {});
      fadeVolume(0.32, 1200);
      setIsPlaying(true);
    } else {
      fadeVolume(0, 500, () => {
        audio.pause();
      });
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      className="music-toggle"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      onClick={handleToggle}
    >
      <span aria-hidden="true">
        <svg
          viewBox="0 0 20 20"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 15V5.5l8-1.5v9.5" />
          <circle cx="5" cy="15" r="2" />
          <circle cx="13" cy="13.5" r="2" />
        </svg>
      </span>
      <span>{isPlaying ? 'music on' : 'music off'}</span>
    </button>
  );
}
