import {motion} from 'motion/react';
import {useEffect, useRef, useState} from 'react';
import type {CandleItem} from '../types';
import {ButtonGlitter} from './ButtonGlitter';

interface CakePopupProps {
  eyebrow: string;
  promptBefore: string;
  subpromptBefore: string;
  promptAllLit: string;
  subpromptAllLit: string;
  promptAfter: string;
  subpromptAfter: string;
  lightAllLabel: string;
  blowButtonLabel: string;
  nextLabel: string;
  candles: CandleItem[];
  prefersReducedMotion: boolean;
  onTriggerConfetti: () => void;
  onNext: () => void;
  onBack: () => void;
}

const CANDLE_X = [108, 146, 214, 252];

export function CakePopup({
  eyebrow,
  promptBefore,
  subpromptBefore,
  promptAllLit,
  subpromptAllLit,
  promptAfter,
  subpromptAfter,
  lightAllLabel,
  blowButtonLabel,
  nextLabel,
  candles,
  prefersReducedMotion,
  onTriggerConfetti,
  onNext,
  onBack,
}: CakePopupProps) {
  const [lit, setLit] = useState<boolean[]>(() => candles.map(() => false));
  const [bending, setBending] = useState<boolean[]>(() => candles.map(() => false));
  const [smoking, setSmoking] = useState<boolean[]>(() => candles.map(() => false));
  const [blownOut, setBlownOut] = useState(false);

  const holdTimerRef = useRef<number | null>(null);
  const blowTimersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }
      blowTimersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const litCount = lit.filter(Boolean).length;
  const allLit = litCount === candles.length && !blownOut;

  let currentPrompt = promptBefore;
  let currentSubprompt = subpromptBefore;
  if (blownOut) {
    currentPrompt = promptAfter;
    currentSubprompt = subpromptAfter;
  } else if (allLit) {
    currentPrompt = promptAllLit;
    currentSubprompt = subpromptAllLit;
  }

  const handleLightCandle = (idx: number) => {
    if (blownOut || lit[idx]) {
      return;
    }
    setLit((prev) => prev.map((v, i) => (i === idx ? true : v)));
  };

  const handleLightAll = () => {
    if (blownOut) {
      return;
    }
    setLit(candles.map(() => true));
  };

  const blowOutCandles = () => {
    if (blownOut) {
      return;
    }
    setBlownOut(true);
    setBending(candles.map(() => true));

    candles.forEach((_, idx) => {
      const id = window.setTimeout(() => {
        setLit((prev) => prev.map((v, i) => (i === idx ? false : v)));
        setBending((prev) => prev.map((v, i) => (i === idx ? false : v)));
        setSmoking((prev) => prev.map((v, i) => (i === idx ? true : v)));
      }, idx * 140);
      blowTimersRef.current.push(id);
    });

    const finishId = window.setTimeout(() => {
      onTriggerConfetti();
    }, 560);
    blowTimersRef.current.push(finishId);
  };

  const handleBlowPointerDown = () => {
    if (blownOut) {
      return;
    }
    setBending(candles.map(() => true));
    holdTimerRef.current = window.setTimeout(() => {
      blowOutCandles();
    }, 280);
  };

  const handleBlowPointerRelease = () => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (!blownOut) {
      setBending(candles.map(() => false));
    }
  };

  return (
    <motion.section
      className="popup-card"
      aria-labelledby="cake-popup-prompt"
      initial={prefersReducedMotion ? false : {opacity: 0, y: 26, scale: 0.94}}
      animate={{opacity: 1, y: 0, scale: 1}}
      exit={prefersReducedMotion ? undefined : {opacity: 0, y: -18, scale: 0.96}}
      transition={{type: 'spring', stiffness: 280, damping: 24}}
    >
      <div className="card-ribbon-top" aria-hidden="true" />

      <p className="popup-eyebrow">{eyebrow}</p>
      <h2 id="cake-popup-prompt" className="popup-title" aria-live="polite">
        {currentPrompt}
      </h2>
      <p className="popup-body" style={{marginBottom: '0.6rem'}}>
        {currentSubprompt}
      </p>

      <div className={`cake-stage ${litCount > 0 || blownOut ? 'is-candlelit' : ''}`}>
        <div
          className={`cake-warm-glow ${blownOut ? 'is-wish-rising' : ''}`}
          style={{opacity: blownOut ? 0.95 : litCount * 0.24}}
          aria-hidden="true"
        />

        <div className="cake-wrapper">
          <svg className="cake-svg" viewBox="0 0 360 255" width="360" height="255" aria-hidden="true">
            <ellipse cx="176" cy="232" rx="130" ry="15" fill="#FFFDF8" stroke="#5A4E70" strokeWidth="1.8" />
            <path d="M62 233c40 9 188 9 228 0" fill="none" stroke="#EDD4A2" strokeWidth="1.5" strokeLinecap="round" />

            {/* Lower Sponge & Frosting */}
            <path
              d="M72 172c-2 22-1 41 2 52 38 11 160 11 198 0 3-11 3-30 1-52"
              fill="#FFD166"
              stroke="#1D162B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M69 170c6 12 18 14 25 2 8 15 24 14 31 1 8 14 24 15 33 0 9 15 25 14 34 0 9 14 22 14 30 0 7 13 20 12 27-1 6 11 16 9 22-2 2-6 1-14-3-18-36-11-164-11-200 0-4 4-4 12-3 18z"
              fill="#FFFDF8"
              stroke="#1D162B"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />

            {/* Upper Berry Tier & Frosting */}
            <path
              d="M92 120c-1 15-1 28 1 37 32 9 132 9 166 0 2-10 2-22 1-37"
              fill="#FF758F"
              stroke="#1D162B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M89 118c6 10 17 11 24 1 8 12 21 11 28 0 8 11 21 12 30 0 8 12 22 11 30 0 7 10 20 11 27 0 7 10 18 9 24-1 3-4 2-11-2-14-33-9-125-9-158 0-4 3-5 10-3 14z"
              fill="#FFFDF8"
              stroke="#1D162B"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />

            {/* Golden "54" Cake Topper between candles */}
            <g>
              <path d="M174 108V82M186 108V82" stroke="#D98A00" strokeWidth="1.6" strokeLinecap="round" />
              <text
                x="180"
                y="84"
                textAnchor="middle"
                fill="#FFB703"
                stroke="#1D162B"
                strokeWidth="1"
                fontFamily="Fraunces, Georgia, serif"
                fontSize="24"
                fontWeight="700"
              >
                54
              </text>
            </g>

            {/* Rainbow Sprinkles */}
            <circle cx="118" cy="195" r="3" fill="#FF4D6D" />
            <circle cx="152" cy="202" r="3" fill="#06D6A0" />
            <circle cx="188" cy="196" r="3" fill="#1982C4" />
            <circle cx="222" cy="199" r="3" fill="#D6337A" />
            <circle cx="136" cy="140" r="2.6" fill="#FFB703" />
            <circle cx="216" cy="141" r="2.6" fill="#06D6A0" />

            {/* 4 Family Candles (also clickable directly!) */}
            {candles.slice(0, 4).map((candle, idx) => {
              const cx = CANDLE_X[idx];
              const isLit = lit[idx];
              const isBending = bending[idx];
              const isSmoking = smoking[idx];

              return (
                <g
                  key={candle.name}
                  style={{cursor: blownOut ? 'default' : 'pointer'}}
                  onClick={() => handleLightCandle(idx)}
                >
                  <path
                    d={`M${cx - 5.5} 112L${cx - 4.5} 70c3-1 6-1 9 0l1 42c-3 1-7 1-10 0z`}
                    fill="#FFFDF8"
                    stroke={candle.colour}
                    strokeWidth="2.1"
                  />
                  <path
                    d={`M${cx - 4.5} 82l9 5M${cx - 4.5} 96l9 5`}
                    stroke={candle.colour}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path d={`M${cx} 69v-6`} stroke="#1D162B" strokeWidth="1.6" strokeLinecap="round" />

                  {/* Outer Amber Flame */}
                  <motion.path
                    d={`M${cx} 38c5.2 7.2 7.2 14 0 22.5-7.2-8.5-5.2-15.3 0-22.5z`}
                    fill="#FFB703"
                    stroke="#FF4D6D"
                    strokeWidth="1.2"
                    initial={false}
                    animate={
                      !isLit
                        ? {opacity: 0, scale: 0.4}
                        : isBending
                          ? {opacity: 1, skewX: 24, scaleY: 0.76}
                          : prefersReducedMotion
                            ? {opacity: 1, scale: 1}
                            : {opacity: 1, scale: [0.95, 1.1, 0.96], rotate: [-3.5, 3.5, -2]}
                    }
                    transition={
                      isLit && !isBending && !prefersReducedMotion
                        ? {duration: 1.15, repeat: Infinity, ease: 'easeInOut'}
                        : {duration: 0.25}
                    }
                  />

                  {/* Inner Bright Flame Core */}
                  <motion.path
                    d={`M${cx} 46c2.5 3.6 3.4 7 0 11.5-3.4-4.5-2.5-7.9 0-11.5z`}
                    fill="#FFFDF0"
                    initial={false}
                    animate={!isLit ? {opacity: 0} : {opacity: 0.95}}
                    transition={{duration: 0.2}}
                  />

                  {/* Smoke Wisp after blowing out */}
                  <motion.path
                    d={`M${cx} 58c-4-7 5-13 0-22`}
                    fill="none"
                    stroke="#6E6580"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{opacity: 0, y: 0}}
                    animate={isSmoking && !prefersReducedMotion ? {opacity: [0, 0.75, 0], y: [2, -28]} : {opacity: 0}}
                    transition={{duration: 1.7, ease: 'easeOut'}}
                  />
                </g>
              );
            })}

            {/* Whiskey peeking beside the cake */}
            <g>
              <motion.g
                animate={prefersReducedMotion ? undefined : {rotate: [-12, 16, -12]}}
                transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
              >
                <path d="M328 228c10-4 13-15 8-22" fill="none" stroke="#D97B38" strokeWidth="5.2" strokeLinecap="round" />
              </motion.g>
              <ellipse cx="315" cy="221" rx="14.5" ry="12.5" fill="#E8924C" stroke="#1D162B" strokeWidth="1.7" />
              <path d="M302 202l-1-11 10 7z" fill="#E8924C" stroke="#1D162B" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M328 202l1-11-10 7z" fill="#E8924C" stroke="#1D162B" strokeWidth="1.7" strokeLinejoin="round" />
              <circle cx="315" cy="205" r="13" fill="#F2A463" stroke="#1D162B" strokeWidth="1.7" />
              <motion.circle
                cx="310"
                cy="203"
                r="1.9"
                fill="#1D162B"
                animate={prefersReducedMotion ? undefined : {scaleY: [1, 1, 0.1, 1]}}
                transition={{duration: 3.6, times: [0, 0.9, 0.95, 1], repeat: Infinity}}
              />
              <motion.circle
                cx="320"
                cy="203"
                r="1.9"
                fill="#1D162B"
                animate={prefersReducedMotion ? undefined : {scaleY: [1, 1, 0.1, 1]}}
                transition={{duration: 3.6, times: [0, 0.9, 0.95, 1], repeat: Infinity}}
              />
              <polygon points="313,207 317,207 315,209.5" fill="#FF4D6D" />
            </g>
          </svg>

          <div className="candle-controls">
            {candles.slice(0, 4).map((candle, idx) => (
              <button
                key={candle.name}
                type="button"
                className="candle-btn"
                aria-pressed={lit[idx]}
                aria-label={`Light ${candle.name}'s candle`}
                disabled={blownOut}
                onClick={() => handleLightCandle(idx)}
              >
                <span className={`candle-btn-name ${candle.handClass}`}>{candle.name}</span>
                <span className="candle-btn-status">
                  {blownOut ? 'wished' : lit[idx] ? 'lit' : 'tap'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cake-actions">
          {!allLit && !blownOut ? (
            <button type="button" className="btn-secondary btn-standalone" onClick={handleLightAll}>
              <ButtonGlitter reduced={prefersReducedMotion} />
              <span>{lightAllLabel}</span>
            </button>
          ) : null}

          {allLit ? (
            <button
              type="button"
              className="btn-primary btn-standalone"
              onPointerDown={handleBlowPointerDown}
              onPointerUp={handleBlowPointerRelease}
              onPointerCancel={handleBlowPointerRelease}
              onPointerLeave={handleBlowPointerRelease}
              onClick={blowOutCandles}
            >
              <ButtonGlitter reduced={prefersReducedMotion} />
              <span className="btn-sparkle" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor">
                  <path d="M10 1l2.2 6.2L18.5 9.5l-6.3 2.3L10 18l-2.2-6.2L1.5 9.5l6.3-2.3z" />
                </svg>
              </span>
              <span>{blowButtonLabel}</span>
            </button>
          ) : null}
        </div>
      </div>

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
