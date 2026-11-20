import {motion} from 'motion/react';
import {useEffect} from 'react';
import type {SignatureItem} from '../types';
import {ButtonGlitter} from './ButtonGlitter';
import {FloatingHearts} from './FloatingHearts';

interface FinalePopupProps {
  eyebrow: string;
  headline: string;
  message: string;
  signatures: SignatureItem[];
  whiskeySign: string;
  replayLabel: string;
  prefersReducedMotion: boolean;
  onTriggerConfetti: () => void;
  onReplay: () => void;
}

export function FinalePopup({
  eyebrow,
  headline,
  message,
  signatures,
  whiskeySign,
  replayLabel,
  prefersReducedMotion,
  onTriggerConfetti,
  onReplay,
}: FinalePopupProps) {
  useEffect(() => {
    onTriggerConfetti();
  }, [onTriggerConfetti]);

  return (
    <motion.section
      className="popup-card finale-card"
      aria-labelledby="finale-headline"
      initial={prefersReducedMotion ? false : {opacity: 0, y: 26, scale: 0.94}}
      animate={{opacity: 1, y: 0, scale: 1}}
      exit={prefersReducedMotion ? undefined : {opacity: 0, y: -18, scale: 0.96}}
      transition={{type: 'spring', stiffness: 280, damping: 24}}
    >
      <div className="card-ribbon-top" aria-hidden="true" />

      <div className="finale-visual" aria-hidden="true">
        <FloatingHearts prefersReducedMotion={prefersReducedMotion} variant="finale" />
        <svg viewBox="0 0 320 132" width="320" height="132" style={{position: 'relative', zIndex: 1}}>
          <defs>
            <radialGradient id="finale-gold" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF0A8" />
              <stop offset="60%" stopColor="#FFB703" />
              <stop offset="100%" stopColor="#E08E00" />
            </radialGradient>
          </defs>

          <motion.g
            animate={prefersReducedMotion ? undefined : {y: [-8, 8, -8], rotate: [-3, 3, -3]}}
            transition={{duration: 3.1, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M68 80v40" fill="none" stroke="#5A4E70" strokeWidth="1.4" />
            <ellipse cx="68" cy="54" rx="19" ry="24" fill="#FF4D6D" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M61 42c3-6 7-8 10-8" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
          </motion.g>

          <motion.g
            animate={prefersReducedMotion ? undefined : {scale: [1, 1.09, 1], rotate: [-2, 2, -2]}}
            transition={{duration: 2.5, repeat: Infinity, ease: 'easeInOut'}}
          >
            <circle cx="160" cy="66" r="38" fill="url(#finale-gold)" stroke="#1D162B" strokeWidth="2.1" />
            <circle cx="160" cy="66" r="30" fill="none" stroke="#FFFDF8" strokeWidth="1.4" strokeDasharray="3 3" />
            <text
              x="160"
              y="75"
              textAnchor="middle"
              fill="#1D162B"
              fontFamily="Fraunces, Georgia, serif"
              fontSize="29"
              fontWeight="700"
            >
              53
            </text>
          </motion.g>

          <motion.g
            animate={prefersReducedMotion ? undefined : {y: [8, -8, 8], rotate: [3, -3, 3]}}
            transition={{duration: 3.4, repeat: Infinity, ease: 'easeInOut'}}
          >
            <path d="M252 80v40" fill="none" stroke="#5A4E70" strokeWidth="1.4" />
            <ellipse cx="252" cy="54" rx="19" ry="24" fill="#06D6A0" stroke="#1D162B" strokeWidth="1.8" />
            <path d="M245 42c3-6 7-8 10-8" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
          </motion.g>

          <motion.path
            d="M110 22l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"
            fill="#D6337A"
            animate={prefersReducedMotion ? undefined : {scale: [0.7, 1.35, 0.7], opacity: [0.4, 1, 0.4]}}
            transition={{duration: 1.7, repeat: Infinity}}
          />
          <motion.path
            d="M210 22l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z"
            fill="#1982C4"
            animate={prefersReducedMotion ? undefined : {scale: [1.3, 0.7, 1.3], opacity: [1, 0.4, 1]}}
            transition={{duration: 1.9, repeat: Infinity}}
          />
        </svg>
      </div>

      <p className="popup-eyebrow">{eyebrow}</p>
      <h2 id="finale-headline" className="popup-title">
        {headline}
      </h2>

      <p className="popup-body" style={{maxWidth: '48ch', marginInline: 'auto'}}>
        {message}
      </p>

      <div className="finale-signatures-box">
        <div className="finale-signatures">
          {signatures.map((sig, idx) => (
            <motion.span
              key={sig.name}
              className={`finale-sig ${sig.handClass}`}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 12, scale: 0.9}}
              animate={{opacity: 1, y: 0, scale: 1}}
              transition={{delay: 0.15 + idx * 0.16, type: 'spring', stiffness: 260, damping: 18}}
            >
              {sig.name}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="finale-whiskey"
          initial={prefersReducedMotion ? false : {opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.85, duration: 0.4}}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <ellipse cx="12" cy="15" rx="5" ry="4.5" fill="#E8924C" stroke="#1D162B" strokeWidth="1.2" />
            <circle cx="6" cy="9" r="2" fill="#E8924C" stroke="#1D162B" strokeWidth="1.1" />
            <circle cx="10" cy="6.5" r="2" fill="#E8924C" stroke="#1D162B" strokeWidth="1.1" />
            <circle cx="14.5" cy="6.5" r="2" fill="#E8924C" stroke="#1D162B" strokeWidth="1.1" />
            <circle cx="18.5" cy="9" r="2" fill="#E8924C" stroke="#1D162B" strokeWidth="1.1" />
          </svg>
          <span>&amp; {whiskeySign}</span>
        </motion.div>
      </div>

      <div className="popup-footer popup-footer--single">
        <button type="button" className="btn-primary btn-standalone" onClick={onReplay}>
          <ButtonGlitter reduced={prefersReducedMotion} />
          <span className="btn-sparkle" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor">
              <path d="M10 1l2.2 6.2L18.5 9.5l-6.3 2.3L10 18l-2.2-6.2L1.5 9.5l6.3-2.3z" />
            </svg>
          </span>
          <span>{replayLabel}</span>
        </button>
      </div>
    </motion.section>
  );
}
