import {motion} from 'motion/react';
import {useEffect} from 'react';
import type {StoryAnimationType, StoryCardItem} from '../types';
import {ButtonGlitter} from './ButtonGlitter';

interface StoryPopupProps {
  card: StoryCardItem;
  prefersReducedMotion: boolean;
  onTriggerConfetti: () => void;
  onNext: () => void;
  onBack: () => void;
}

function StoryVisual({type, reduced}: {type: StoryAnimationType; reduced: boolean}) {
  if (type === 'balloons') {
    return (
      <div className="story-visual story-visual--balloons" aria-hidden="true">
        <svg viewBox="0 0 360 170" width="360" height="170">
          <defs>
            <radialGradient id="b-red" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF8FA3" />
              <stop offset="100%" stopColor="#E63956" />
            </radialGradient>
            <radialGradient id="b-teal" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#6EF2C9" />
              <stop offset="100%" stopColor="#059672" />
            </radialGradient>
            <radialGradient id="b-sky" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#64B5F6" />
              <stop offset="100%" stopColor="#1565C0" />
            </radialGradient>
            <radialGradient id="b-berry" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F48FB1" />
              <stop offset="100%" stopColor="#C2185B" />
            </radialGradient>
            <radialGradient id="medal-gold" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF0A8" />
              <stop offset="60%" stopColor="#FFB703" />
              <stop offset="100%" stopColor="#E08E00" />
            </radialGradient>
          </defs>

          {/* Confetti specks inside balloon stage */}
          <motion.circle
            cx="32"
            cy="32"
            r="3"
            fill="#FFB703"
            animate={reduced ? undefined : {y: [0, 8, 0], opacity: [0.5, 1, 0.5]}}
            transition={{duration: 2.3, repeat: Infinity}}
          />
          <motion.circle
            cx="328"
            cy="36"
            r="3.2"
            fill="#1982C4"
            animate={reduced ? undefined : {y: [6, -4, 6], opacity: [0.6, 1, 0.6]}}
            transition={{duration: 2.6, repeat: Infinity}}
          />
          <motion.path
            d="M126 24l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"
            fill="#FF4D6D"
            animate={reduced ? undefined : {scale: [0.7, 1.3, 0.7], opacity: [0.4, 1, 0.4]}}
            transition={{duration: 1.7, repeat: Infinity}}
          />
          <motion.path
            d="M236 22l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"
            fill="#06B48A"
            animate={reduced ? undefined : {scale: [1.3, 0.7, 1.3], opacity: [1, 0.4, 1]}}
            transition={{duration: 1.9, repeat: Infinity}}
          />

          {/* Balloons */}
          <motion.g
            animate={reduced ? undefined : {y: [0, -14, 0], rotate: [-3, 3, -3]}}
            transition={{duration: 3.1, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M58 98c0 24 8 38 4 58" fill="none" stroke="#5A4E70" strokeWidth="1.4" />
            <ellipse cx="58" cy="64" rx="23" ry="29" fill="url(#b-red)" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M50 48c3-7 9-10 12-10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>

          <motion.g
            animate={reduced ? undefined : {y: [-6, 10, -6], rotate: [2, -3, 2]}}
            transition={{duration: 3.6, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M106 108c2 20-5 32 0 50" fill="none" stroke="#5A4E70" strokeWidth="1.4" />
            <ellipse cx="106" cy="76" rx="20" ry="26" fill="url(#b-teal)" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M99 63c3-6 7-8 10-8" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
          </motion.g>

          {/* Golden 54 Medallion */}
          <motion.g
            animate={reduced ? undefined : {scale: [1, 1.09, 1], rotate: [-2, 2, -2]}}
            transition={{duration: 2.6, repeat: Infinity, ease: 'easeInOut'}}
          >
            <circle cx="180" cy="85" r="43" fill="url(#medal-gold)" stroke="#1D162B" strokeWidth="2.2" />
            <circle cx="180" cy="85" r="34" fill="none" stroke="#FFFDF8" strokeWidth="1.6" strokeDasharray="3.5 3.5" />
            <text
              x="180"
              y="95"
              textAnchor="middle"
              fill="#1D162B"
              fontFamily="Fraunces, Georgia, serif"
              fontSize="33"
              fontWeight="700"
            >
              54
            </text>
          </motion.g>

          <motion.g
            animate={reduced ? undefined : {y: [4, -12, 4], rotate: [-2, 3, -2]}}
            transition={{duration: 3.1, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M254 108c-2 20 5 32 0 50" fill="none" stroke="#5A4E70" strokeWidth="1.4" />
            <ellipse cx="254" cy="76" rx="20" ry="26" fill="url(#b-sky)" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M247 63c3-6 7-8 10-8" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
          </motion.g>

          <motion.g
            animate={reduced ? undefined : {y: [-8, 8, -8], rotate: [3, -3, 3]}}
            transition={{duration: 3.8, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M302 98c0 24-8 38-4 58" fill="none" stroke="#5A4E70" strokeWidth="1.4" />
            <ellipse cx="302" cy="64" rx="23" ry="29" fill="url(#b-berry)" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M294 48c3-7 9-10 12-10" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
        </svg>
      </div>
    );
  }

  if (type === 'visits') {
    return (
      <div className="story-visual story-visual--visits" aria-hidden="true">
        <svg viewBox="0 0 360 170" width="360" height="170">
          {/* Warm tabletop horizon line */}
          <path d="M24 134h312" stroke="rgba(217, 138, 0, 0.35)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cinema Tickets Pair */}
          <motion.g
            animate={reduced ? undefined : {y: [-5, 5, -5], rotate: [-5, 3, -5]}}
            transition={{duration: 2.6, repeat: Infinity, ease: 'easeInOut'}}
          >
            <rect x="34" y="64" width="72" height="44" rx="6" fill="#FF4D6D" stroke="#1D162B" strokeWidth="1.8" />
            <rect x="42" y="71" width="56" height="30" rx="3" fill="#FFFDF8" stroke="#1D162B" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="70" y="90" textAnchor="middle" fill="#1D162B" fontFamily="Fraunces, serif" fontSize="12" fontWeight="700">
              MOVIE
            </text>
          </motion.g>

          {/* Dinner Cloche + Treats */}
          <motion.g
            animate={reduced ? undefined : {y: [4, -6, 4]}}
            transition={{duration: 2.9, repeat: Infinity, ease: 'easeInOut'}}
          >
            {/* Dinner Cloche */}
            <path d="M132 108c0-24 18-40 42-40s42 16 42 40z" fill="#FFE699" stroke="#1D162B" strokeWidth="1.8" />
            <circle cx="174" cy="64" r="5" fill="#FFB703" stroke="#1D162B" strokeWidth="1.6" />
            <ellipse cx="174" cy="111" rx="52" ry="7" fill="#FFFDF8" stroke="#1D162B" strokeWidth="1.8" />
            {/* Chocolate bar + wrapped candies */}
            <rect x="148" y="116" width="48" height="24" rx="4" fill="#6D3B27" stroke="#1D162B" strokeWidth="1.6" />
            <path d="M148 128h48M164 116v24M180 116v24" stroke="#4A2315" strokeWidth="1.4" />
            <circle cx="212" cy="126" r="8" fill="#D6337A" stroke="#1D162B" strokeWidth="1.5" />
            <circle cx="136" cy="126" r="7" fill="#06B48A" stroke="#1D162B" strokeWidth="1.5" />
          </motion.g>

          {/* Weird Cleaning Gadget sweeping with sparkles */}
          <motion.g
            animate={reduced ? undefined : {rotate: [-14, 14, -14], x: [-6, 6, -6]}}
            transition={{duration: 2.1, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M294 40l-10 62" stroke="#1982C4" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M294 40l-10 62" stroke="#1D162B" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="262" y="100" width="46" height="15" rx="5" fill="#06D6A0" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M265 115l-4 16M275 115l-2 16M285 115v16M295 115l2 16M304 115l4 16" stroke="#1D162B" strokeWidth="1.6" strokeLinecap="round" />
          </motion.g>

          <motion.path
            d="M126 36l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"
            fill="#FFB703"
            animate={reduced ? undefined : {scale: [0.7, 1.35, 0.7], opacity: [0.4, 1, 0.4]}}
            transition={{duration: 1.7, repeat: Infinity}}
          />
          <motion.path
            d="M242 42l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"
            fill="#FF4D6D"
            animate={reduced ? undefined : {scale: [1.3, 0.7, 1.3], opacity: [1, 0.4, 1]}}
            transition={{duration: 1.9, repeat: Infinity}}
          />
        </svg>
      </div>
    );
  }

  if (type === 'flight') {
    return (
      <div className="story-visual story-visual--flight" aria-hidden="true">
        <svg viewBox="0 0 360 170" width="360" height="170">
          {/* Starry twilight sky */}
          <motion.path
            d="M90 36l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
            fill="#FFE699"
            animate={reduced ? undefined : {scale: [0.7, 1.3, 0.7], opacity: [0.45, 1, 0.45]}}
            transition={{duration: 1.8, repeat: Infinity}}
          />
          <motion.path
            d="M180 22l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5z"
            fill="#FF758F"
            animate={reduced ? undefined : {scale: [1.2, 0.7, 1.2], opacity: [1, 0.4, 1]}}
            transition={{duration: 2.1, repeat: Infinity}}
          />
          <motion.path
            d="M268 38l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
            fill="#06D6A0"
            animate={reduced ? undefined : {scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5]}}
            transition={{duration: 1.6, repeat: Infinity}}
          />
          <circle cx="52" cy="28" r="1.8" fill="rgba(255,255,255,0.65)" />
          <circle cx="136" cy="48" r="1.5" fill="rgba(255,255,255,0.55)" />
          <circle cx="222" cy="44" r="1.8" fill="rgba(255,255,255,0.65)" />
          <circle cx="318" cy="30" r="1.6" fill="rgba(255,255,255,0.6)" />

          {/* Golden flight arc */}
          <path
            d="M54 122C112 44 248 44 306 122"
            fill="none"
            stroke="rgba(255, 230, 153, 0.6)"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />

          {/* Abroad Skyline Silhouette */}
          <g opacity="0.9">
            <rect x="34" y="102" width="12" height="24" rx="1.5" fill="#3B4F8A" stroke="#1D162B" strokeWidth="1.2" />
            <rect x="48" y="92" width="14" height="34" rx="1.5" fill="#4C65AC" stroke="#1D162B" strokeWidth="1.2" />
            <rect x="64" y="108" width="10" height="18" rx="1.5" fill="#3B4F8A" stroke="#1D162B" strokeWidth="1.2" />
            <circle cx="55" cy="100" r="1.5" fill="#FFE699" />
            <circle cx="55" cy="107" r="1.5" fill="#FFE699" />
          </g>
          <text x="54" y="146" textAnchor="middle" fill="rgba(255, 238, 196, 0.88)" fontFamily="Lora, serif" fontSize="11">
            Abroad
          </text>

          {/* Warm Glowing Home */}
          <g>
            <polygon points="282,102 306,82 330,102" fill="#FF4D6D" stroke="#1D162B" strokeWidth="1.6" strokeLinejoin="round" />
            <rect x="287" y="102" width="38" height="24" rx="2" fill="#FFF7E8" stroke="#1D162B" strokeWidth="1.6" />
            <rect x="301" y="109" width="11" height="11" rx="1.5" fill="#FFB703" stroke="#1D162B" strokeWidth="1.2" />
          </g>
          <text x="306" y="146" textAnchor="middle" fill="#FFE699" fontFamily="Lora, serif" fontSize="11.5" fontWeight="600">
            Home
          </text>

          {/* Flying Paper Plane */}
          <motion.g
            animate={
              reduced
                ? {x: 180, y: 66}
                : {
                    x: [56, 180, 302],
                    y: [104, 46, 102],
                    rotate: [-18, 2, 22],
                    opacity: [0, 1, 1, 0],
                  }
            }
            transition={{duration: 3.6, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path
              d="M-20 6l40-12-28 22-2.5-6.5-9.5-3.5z"
              fill="#FFFDF8"
              stroke="#1D162B"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M20-6L-10 9l2.5 6.5" fill="none" stroke="#FF4D6D" strokeWidth="1.6" />
          </motion.g>
        </svg>
      </div>
    );
  }

  /* hobbies: Karaoke + Weird Meal Pot + Bowling + Whiskey */
  return (
    <div className="story-visual story-visual--hobbies" aria-hidden="true">
      <svg viewBox="0 0 360 170" width="360" height="170">
        {/* Karaoke Mic & Music Notes */}
        <g>
          <rect x="42" y="56" width="17" height="27" rx="8.5" fill="#FF4D6D" stroke="#1D162B" strokeWidth="1.8" />
          <path d="M42 70h17" stroke="#1D162B" strokeWidth="1.4" />
          <path d="M50.5 83v36M38 119h25" stroke="#1D162B" strokeWidth="2.1" strokeLinecap="round" />
          <motion.g
            animate={reduced ? undefined : {y: [6, -20], opacity: [0, 1, 0]}}
            transition={{duration: 2.1, repeat: Infinity, ease: 'easeOut'}}
          >
            <path d="M71 58v-13l9-2.5v11" fill="none" stroke="#1982C4" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="68" cy="58" r="3" fill="#1982C4" />
          </motion.g>
        </g>

        {/* Simmering Weird Meal Pot */}
        <g>
          <motion.path
            d="M122 58c-4-7 5-13 0-20"
            fill="none"
            stroke="#5A4E70"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={reduced ? undefined : {y: [4, -18], opacity: [0, 1, 0]}}
            transition={{duration: 2.2, repeat: Infinity, ease: 'easeOut'}}
          />
          <motion.path
            d="M138 56c-4-7 5-13 0-20"
            fill="none"
            stroke="#5A4E70"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={reduced ? undefined : {y: [4, -18], opacity: [0, 1, 0]}}
            transition={{duration: 2.2, delay: 0.9, repeat: Infinity, ease: 'easeOut'}}
          />
          <rect x="106" y="78" width="50" height="39" rx="7" fill="#06B48A" stroke="#1D162B" strokeWidth="1.9" />
          <path d="M98 86h8M156 86h8" stroke="#1D162B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M104 75h54" stroke="#FFB703" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        {/* Bowling Ball & Wobbling Pin */}
        <g>
          <motion.g
            animate={reduced ? undefined : {rotate: [0, -12, 11, -6, 0]}}
            transition={{duration: 2.4, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path
              d="M214 56c-4.5 0-7 5.5-5.5 13 2 6.5-6 15-6 31 0 11 5 17 11.5 17s11.5-6 11.5-17c0-16-8-24.5-6-31 1.5-7.5-1-13-5.5-13z"
              fill="#FFFDF8"
              stroke="#1D162B"
              strokeWidth="1.8"
            />
            <path d="M209 72h10M208 77h12" stroke="#FF4D6D" strokeWidth="2.1" />
          </motion.g>
          <motion.g
            animate={reduced ? undefined : {x: [-5, 5, -5]}}
            transition={{duration: 2.4, repeat: Infinity, ease: 'easeInOut'}}
          >
            <circle cx="190" cy="103" r="17" fill="#1982C4" stroke="#1D162B" strokeWidth="1.9" />
            <circle cx="186" cy="97" r="1.9" fill="#FFFDF8" />
            <circle cx="192" cy="96" r="1.9" fill="#FFFDF8" />
            <circle cx="189" cy="102" r="1.9" fill="#FFFDF8" />
          </motion.g>
        </g>

        {/* Whiskey the Cat */}
        <motion.g
          animate={reduced ? undefined : {y: [0, -5, 0]}}
          transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
        >
          <motion.g
            animate={reduced ? undefined : {rotate: [-12, 16, -12]}}
            transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M308 112c15-4 19-19 13-28" fill="none" stroke="#D97B38" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M308 112c15-4 19-19 13-28" fill="none" stroke="#1D162B" strokeWidth="1.6" strokeLinecap="round" />
          </motion.g>
          <ellipse cx="290" cy="104" rx="19" ry="16" fill="#E8924C" stroke="#1D162B" strokeWidth="1.8" />
          <path d="M274 79l-2-15 13 9.5z" fill="#E8924C" stroke="#1D162B" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M306 79l2-15-13 9.5z" fill="#E8924C" stroke="#1D162B" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="290" cy="83" r="16" fill="#F2A463" stroke="#1D162B" strokeWidth="1.8" />
          <motion.circle
            cx="284"
            cy="81"
            r="2.3"
            fill="#1D162B"
            animate={reduced ? undefined : {scaleY: [1, 1, 0.1, 1]}}
            transition={{duration: 3.8, times: [0, 0.9, 0.95, 1], repeat: Infinity}}
          />
          <motion.circle
            cx="296"
            cy="81"
            r="2.3"
            fill="#1D162B"
            animate={reduced ? undefined : {scaleY: [1, 1, 0.1, 1]}}
            transition={{duration: 3.8, times: [0, 0.9, 0.95, 1], repeat: Infinity}}
          />
          <polygon points="288,85 292,85 290,88" fill="#FF4D6D" />
          <path d="M267 85h8M267 89h8M305 85h8M305 89h8" stroke="#1D162B" strokeWidth="1.1" strokeLinecap="round" />
          <text x="290" y="140" textAnchor="middle" fill="#1D162B" fontFamily="Caveat, cursive" fontSize="15" fontWeight="600">
            Whiskey
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export function StoryPopup({card, prefersReducedMotion, onTriggerConfetti, onNext, onBack}: StoryPopupProps) {
  useEffect(() => {
    if (card.confettiOnOpen) {
      onTriggerConfetti();
    }
  }, [card.id, card.confettiOnOpen, onTriggerConfetti]);

  return (
    <motion.section
      className="popup-card"
      aria-labelledby={`card-title-${card.id}`}
      initial={prefersReducedMotion ? false : {opacity: 0, y: 26, scale: 0.94}}
      animate={{opacity: 1, y: 0, scale: 1}}
      exit={prefersReducedMotion ? undefined : {opacity: 0, y: -18, scale: 0.96}}
      transition={{type: 'spring', stiffness: 280, damping: 24}}
    >
      <div className="card-ribbon-top" aria-hidden="true" />

      <StoryVisual type={card.animationType} reduced={prefersReducedMotion} />

      <div className="popup-kicker-row">
        <p className="popup-eyebrow">{card.eyebrow}</p>
      </div>

      <h2 id={`card-title-${card.id}`} className="popup-title">
        {card.title}
      </h2>

      <p className="popup-body">{card.body}</p>
      <p className="popup-highlight">{card.highlight}</p>

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
          <span>{card.nextLabel}</span>
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </motion.section>
  );
}
