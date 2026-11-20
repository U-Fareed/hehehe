import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useRef, useState} from 'react';
import {checkAudioExists} from '../audioProbe';
import type {PersonWish} from '../types';
import {ButtonGlitter} from './ButtonGlitter';

interface NotesPopupProps {
  eyebrow: string;
  title: string;
  hint: string;
  whiskeyNote: string;
  allOpenedText: string;
  nextLabel: string;
  people: PersonWish[];
  prefersReducedMotion: boolean;
  onTriggerConfetti: () => void;
  onNext: () => void;
  onBack: () => void;
}

interface VoiceNoteProps {
  src: string;
  senderName: string;
  isPlaying: boolean;
  onPlay: (audio: HTMLAudioElement, stopCb: () => void) => void;
  onStop: () => void;
}

function VoiceNote({src, senderName, isPlaying, onPlay, onStop}: VoiceNoteProps) {
  const [exists, setExists] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let active = true;
    checkAudioExists(src).then((available) => {
      if (!active || !available) {
        return;
      }
      const audio = new Audio(src);
      audio.addEventListener('ended', onStop);
      audioRef.current = audio;
      setExists(true);
    });

    return () => {
      active = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, onStop]);

  if (!exists) {
    return null;
  }

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (!audio.paused) {
      audio.pause();
      onStop();
      return;
    }
    onPlay(audio, onStop);
    audio.play().catch(() => {});
  };

  return (
    <div className={`voice-player ${isPlaying ? 'is-playing' : ''}`}>
      <button
        type="button"
        className="voice-play-btn"
        aria-label={`Play voice note from ${senderName}`}
        onClick={toggle}
      >
        {isPlaying ? 'Pause' : 'Listen'}
      </button>
      <span className="voice-waveform" aria-hidden="true">
        <span className="voice-bar" />
        <span className="voice-bar" />
        <span className="voice-bar" />
        <span className="voice-bar" />
        <span className="voice-bar" />
      </span>
    </div>
  );
}

export function NotesPopup({
  eyebrow,
  title,
  hint,
  whiskeyNote,
  allOpenedText,
  nextLabel,
  people,
  prefersReducedMotion,
  onTriggerConfetti,
  onNext,
  onBack,
}: NotesPopupProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [readIds, setReadIds] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const activeVoiceRef = useRef<{audio: HTMLAudioElement; stop: () => void} | null>(null);

  useEffect(() => {
    return () => {
      if (activeVoiceRef.current) {
        activeVoiceRef.current.audio.pause();
        activeVoiceRef.current = null;
      }
    };
  }, []);

  const toggleNote = (id: string) => {
    const willOpen = !openIds[id];
    setOpenIds((prev) => ({...prev, [id]: willOpen}));
    if (willOpen && !readIds[id]) {
      const updated = {...readIds, [id]: true};
      setReadIds(updated);
      if (people.length > 0 && people.every((p) => Boolean(updated[p.id]))) {
        onTriggerConfetti();
      }
    }
  };

  const handlePlayVoice = (id: string, audio: HTMLAudioElement, stopCb: () => void) => {
    if (activeVoiceRef.current && activeVoiceRef.current.audio !== audio) {
      activeVoiceRef.current.audio.pause();
      activeVoiceRef.current.stop();
    }
    activeVoiceRef.current = {audio, stop: stopCb};
    setPlayingId(id);
  };

  const handleStopVoice = (id: string) => {
    setPlayingId((cur) => (cur === id ? null : cur));
  };

  const allOpened = people.length > 0 && people.every((p) => Boolean(readIds[p.id]));

  return (
    <motion.section
      className="popup-card"
      aria-labelledby="notes-popup-title"
      initial={prefersReducedMotion ? false : {opacity: 0, y: 26, scale: 0.94}}
      animate={{opacity: 1, y: 0, scale: 1}}
      exit={prefersReducedMotion ? undefined : {opacity: 0, y: -18, scale: 0.96}}
      transition={{type: 'spring', stiffness: 280, damping: 24}}
    >
      <div className="card-ribbon-top" aria-hidden="true" />

      <p className="popup-eyebrow">{eyebrow}</p>
      <h2 id="notes-popup-title" className="popup-title">
        {title}
      </h2>
      <p className="popup-body" style={{marginBottom: '0.3rem'}}>
        {hint}
      </p>

      <div className="notes-grid">
        {people.map((person, idx) => {
          const isOpen = Boolean(openIds[person.id]);
          const wasRead = Boolean(readIds[person.id]);

          return (
            <motion.div
              className={`wish-card ${isOpen ? 'is-open' : ''}`}
              key={person.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: idx * 0.06, duration: 0.35}}
            >
              <button
                type="button"
                className="wish-trigger"
                aria-expanded={isOpen}
                onClick={() => toggleNote(person.id)}
              >
                <span className="wish-sender-wrap">
                  <span
                    className="wish-wax-seal"
                    style={{backgroundColor: person.accent || '#FF4D6D'}}
                    aria-hidden="true"
                  >
                    {person.name.charAt(0)}
                  </span>
                  <span>
                    <span className={`wish-sender ${person.handClass}`}>{person.name}</span>
                    <span className="wish-role">{person.role}</span>
                  </span>
                </span>
                <span className="wish-status-text">
                  {isOpen ? 'Close' : wasRead ? 'Read · Open' : 'Open note'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    className="wish-body"
                    initial={prefersReducedMotion ? false : {opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={prefersReducedMotion ? undefined : {opacity: 0, height: 0}}
                    transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
                    style={{overflow: 'hidden'}}
                  >
                    <p className={`wish-message ${person.handClass}`}>{person.message}</p>
                    <p className="wish-line">{person.wish}</p>

                    {person.audio ? (
                      <VoiceNote
                        src={person.audio}
                        senderName={person.name}
                        isPlaying={playingId === person.id}
                        onPlay={(audio, stopCb) => handlePlayVoice(person.id, audio, stopCb)}
                        onStop={() => handleStopVoice(person.id)}
                      />
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="whiskey-cameo">
        <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true" style={{flexShrink: 0}}>
          <ellipse cx="18" cy="23" rx="7.5" ry="6.5" fill="#E8924C" stroke="#1D162B" strokeWidth="1.5" />
          <circle cx="9" cy="14" r="3" fill="#E8924C" stroke="#1D162B" strokeWidth="1.4" />
          <circle cx="15" cy="9.5" r="3" fill="#E8924C" stroke="#1D162B" strokeWidth="1.4" />
          <circle cx="22" cy="9.5" r="3" fill="#E8924C" stroke="#1D162B" strokeWidth="1.4" />
          <circle cx="27.5" cy="14" r="3" fill="#E8924C" stroke="#1D162B" strokeWidth="1.4" />
        </svg>
        <span>{whiskeyNote}</span>
      </div>

      {allOpened ? (
        <motion.p
          className="notes-ready-banner"
          aria-live="polite"
          initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.96}}
          animate={{opacity: 1, scale: 1}}
        >
          {allOpenedText}
        </motion.p>
      ) : null}

      <div className="popup-footer">
        <button type="button" className="btn-secondary" onClick={onBack}>
          <ButtonGlitter reduced={prefersReducedMotion} />
          <span>Back</span>
        </button>

        <button type="button" className="btn-primary" onClick={onNext}>
          <ButtonGlitter reduced={prefersReducedMotion} />
          <span className="btn-sparkle" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor">
              <path d="M10 1l2.2 6.2L18.5 9.5l-6.3 2.3L10 18l-2.2-6.2L1.5 9.5l6.3-2.3z" />
            </svg>
          </span>
          <span>{nextLabel}</span>
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </motion.section>
  );
}
