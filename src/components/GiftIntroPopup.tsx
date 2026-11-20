import {motion} from 'motion/react';
import {useState} from 'react';

interface GiftIntroPopupProps {
  dateBadge: string;
  headline: string;
  subtitle: string;
  prefersReducedMotion: boolean;
  onTriggerConfetti: () => void;
  onOpen: () => void;
}

export function GiftIntroPopup({
  dateBadge,
  headline,
  subtitle,
  prefersReducedMotion,
  onTriggerConfetti,
  onOpen,
}: GiftIntroPopupProps) {
  const [popping, setPopping] = useState(false);

  const handleOpenGift = () => {
    if (popping) {
      return;
    }
    onTriggerConfetti();
    if (prefersReducedMotion) {
      onOpen();
      return;
    }
    setPopping(true);
    window.setTimeout(() => {
      onOpen();
    }, 840);
  };

  return (
    <motion.section
      className="landing-stage"
      aria-label="Birthday Surprise Gift"
      initial={{opacity: 0, y: 18}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, scale: 1.04, y: -16}}
      transition={{type: 'spring', stiffness: 250, damping: 24}}
    >
      <p className="landing-kicker">{dateBadge}</p>

      <h1 className="landing-headline landing-headline--bounce">{headline}</h1>

      <p className="landing-hand-note">Happy 53rd Birthday, Dada!</p>

      <div className="landing-gift-stage">
        {/* Slowly spinning golden festive sunburst rays behind gift */}
        <div className="landing-sunburst" aria-hidden="true" />
        <div className="landing-warm-halo" aria-hidden="true" />

        {/* Celebratory animated balloons & floating hearts flanking the gift */}
        <svg
          viewBox="0 0 420 240"
          width="420"
          height="240"
          aria-hidden="true"
          style={{position: 'absolute', pointerEvents: 'none', maxWidth: '100%'}}
        >
          {/* Left Coral Balloon */}
          <g className="anim-balloon-left">
            <path d="M52 126c0 30 10 48 4 78" fill="none" stroke="#645359" strokeWidth="1.5" />
            <ellipse cx="52" cy="84" rx="24" ry="31" fill="#E63946" stroke="#241A1C" strokeWidth="1.8" />
            <path d="M43 67c3-7 9-10 12-10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.4" strokeLinecap="round" />
          </g>

          {/* Left Gold Balloon */}
          <g className="anim-balloon-mid-left">
            <path d="M98 144c2 24-6 40 0 66" fill="none" stroke="#645359" strokeWidth="1.4" />
            <ellipse cx="98" cy="108" rx="18" ry="23" fill="#FFB703" stroke="#241A1C" strokeWidth="1.8" />
            <path d="M92 96c2-5 6-7 9-7" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Animated floating hearts around the gift */}
          <path
            className="anim-heart-bob-1"
            d="M126 58l-2-1.8C118 50.5 113.5 46.6 113.5 41.5c0-4 3.1-7.1 7.1-7.1 2.2 0 4.4 1.1 5.4 2.7 1-1.6 3.2-2.7 5.4-2.7 4 0 7.1 3.1 7.1 7.1 0 5.1-4.5 9-10.5 14.7L126 58z"
            fill="#E04F82"
          />
          <path
            className="anim-heart-bob-2"
            d="M296 54l-2-1.8C288 46.5 283.5 42.6 283.5 37.5c0-4 3.1-7.1 7.1-7.1 2.2 0 4.4 1.1 5.4 2.7 1-1.6 3.2-2.7 5.4-2.7 4 0 7.1 3.1 7.1 7.1 0 5.1-4.5 9-10.5 14.7L296 54z"
            fill="#E63946"
          />

          {/* Right Sky Balloon */}
          <g className="anim-balloon-mid-right">
            <path d="M322 144c-2 24 6 40 0 66" fill="none" stroke="#645359" strokeWidth="1.4" />
            <ellipse cx="322" cy="108" rx="18" ry="23" fill="#1982C4" stroke="#241A1C" strokeWidth="1.8" />
            <path d="M316 96c2-5 6-7 9-7" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Teal Balloon */}
          <g className="anim-balloon-right">
            <path d="M368 126c0 30-10 48-4 78" fill="none" stroke="#645359" strokeWidth="1.5" />
            <ellipse cx="368" cy="84" rx="24" ry="31" fill="#06B48A" stroke="#241A1C" strokeWidth="1.8" />
            <path d="M359 67c3-7 9-10 12-10" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </svg>

        {popping ? (
          <>
            <motion.div
              style={{
                position: 'absolute',
                width: 74,
                height: 74,
                borderRadius: '999px',
                border: '4px solid #F4A200',
                pointerEvents: 'none',
              }}
              initial={{scale: 0.4, opacity: 1}}
              animate={{scale: 4.8, opacity: 0}}
              transition={{duration: 0.72, ease: 'easeOut'}}
              aria-hidden="true"
            />
            <motion.div
              style={{
                position: 'absolute',
                width: 56,
                height: 56,
                borderRadius: '999px',
                border: '3px solid #E63946',
                pointerEvents: 'none',
              }}
              initial={{scale: 0.3, opacity: 1}}
              animate={{scale: 3.8, opacity: 0}}
              transition={{duration: 0.62, delay: 0.08, ease: 'easeOut'}}
              aria-hidden="true"
            />
          </>
        ) : null}

        <button
          type="button"
          className={`gift-box-btn ${popping ? 'is-popping' : 'anim-gift-bounce'}`}
          aria-label="Tap me to open Dada's birthday surprise"
          onClick={handleOpenGift}
        >
          <svg viewBox="0 0 190 164" width="186" height="160" aria-hidden="true">
            <defs>
              <linearGradient id="gift-ribbon-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE699" />
                <stop offset="50%" stopColor="#FFB703" />
                <stop offset="100%" stopColor="#D98A00" />
              </linearGradient>
            </defs>

            <ellipse cx="95" cy="148" rx="60" ry="8" fill="rgba(36, 26, 28, 0.14)" />

            {popping ? (
              <>
                <motion.polygon
                  points="48,70 142,70 166,10 24,10"
                  fill="rgba(255, 209, 102, 0.7)"
                  initial={{opacity: 0, scaleY: 0.2}}
                  animate={{opacity: [0, 1, 0.65], scaleY: 1}}
                  transition={{duration: 0.45}}
                />
                <motion.path
                  d="M95 52l-2-2c-7-6.5-11.5-10.6-11.5-15.6 0-4.1 3.2-7.3 7.3-7.3 2.3 0 4.5 1.1 6.2 2.8 1.7-1.7 3.9-2.8 6.2-2.8 4.1 0 7.3 3.2 7.3 7.3 0 5-4.5 9.1-11.5 15.6l-2 2z"
                  fill="#E63946"
                  initial={{y: 26, scale: 0.4, opacity: 0}}
                  animate={{y: -30, scale: 1.35, opacity: [0, 1, 0]}}
                  transition={{duration: 0.72}}
                />
              </>
            ) : null}

            {/* Gift Box Base */}
            <rect x="37" y="70" width="116" height="74" rx="10" fill="#E63946" stroke="#241A1C" strokeWidth="2.2" />
            <circle cx="56" cy="92" r="4" fill="rgba(255,248,236,0.45)" />
            <circle cx="66" cy="122" r="4.5" fill="rgba(255,248,236,0.45)" />
            <circle cx="132" cy="94" r="4.5" fill="rgba(255,248,236,0.45)" />
            <circle cx="122" cy="124" r="4" fill="rgba(255,248,236,0.45)" />

            {/* Vertical Gold Ribbon */}
            <rect x="83" y="70" width="24" height="74" fill="url(#gift-ribbon-gold)" stroke="#241A1C" strokeWidth="1.8" />
            <path d="M37 81h116" stroke="rgba(36,26,28,0.14)" strokeWidth="4" />

            {/* Gift Lid + Bow */}
            <motion.g
              animate={
                popping
                  ? {y: -86, rotate: -26, opacity: 0, scale: 1.1}
                  : {y: 0, rotate: 0, opacity: 1, scale: 1}
              }
              transition={{duration: 0.58, ease: [0.22, 1, 0.36, 1]}}
            >
              <rect x="28" y="48" width="134" height="26" rx="8" fill="#D62839" stroke="#241A1C" strokeWidth="2.2" />
              <rect x="81" y="48" width="28" height="26" fill="url(#gift-ribbon-gold)" stroke="#241A1C" strokeWidth="1.8" />
              <path
                d="M95 48c-18-28-44-20-36-2 5 11 25 4 36 2z"
                fill="#FFE699"
                stroke="#241A1C"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
              <path
                d="M95 48c18-28 44-20 36-2-5 11-25 4-36 2z"
                fill="#FFB703"
                stroke="#241A1C"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
              <path d="M89 48l-10 14M101 48l10 14" stroke="#C97D00" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="95" cy="45" r="6.5" fill="#FFFDF9" stroke="#241A1C" strokeWidth="1.8" />
            </motion.g>
          </svg>

          <span className="tap-me-hangtag anim-hangtag">Tap me</span>
        </button>
      </div>

      <p className="landing-family-line">{subtitle}</p>
    </motion.section>
  );
}
