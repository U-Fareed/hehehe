import {motion} from 'motion/react';

interface FloatingHeartsProps {
  prefersReducedMotion: boolean;
  variant?: 'ambient' | 'finale';
}

const AMBIENT_HEARTS = [
  {left: '6%', startTop: '88%', size: 22, color: '#E63946', delay: 0, duration: 7.2, drift: 18},
  {left: '14%', startTop: '62%', size: 18, color: '#FF6B8B', delay: 0.4, duration: 8.1, drift: -16},
  {left: '24%', startTop: '94%', size: 16, color: '#F4A261', delay: 1.1, duration: 8.6, drift: 14},
  {left: '76%', startTop: '86%', size: 20, color: '#E04F82', delay: 0.2, duration: 7.8, drift: -18},
  {left: '86%', startTop: '58%', size: 24, color: '#E63946', delay: 0.8, duration: 7.4, drift: 16},
  {left: '93%', startTop: '92%', size: 18, color: '#FF758F', delay: 1.5, duration: 8.3, drift: -14},
  {left: '44%', startTop: '96%', size: 17, color: '#FF4D6D', delay: 0.7, duration: 9.0, drift: 12},
  {left: '58%', startTop: '90%', size: 19, color: '#E04F82', delay: 1.9, duration: 8.5, drift: -15},
];

const FINALE_HEARTS = [
  {left: '12%', startTop: '92%', size: 18, color: '#E63946', delay: 0, duration: 4.2, drift: 12},
  {left: '26%', startTop: '86%', size: 15, color: '#D6337A', delay: 0.6, duration: 4.6, drift: -10},
  {left: '50%', startTop: '95%', size: 16, color: '#FF4D6D', delay: 1.1, duration: 4.1, drift: 8},
  {left: '74%', startTop: '88%', size: 16, color: '#F4A261', delay: 0.3, duration: 4.5, drift: -12},
  {left: '88%', startTop: '92%', size: 19, color: '#E63946', delay: 0.9, duration: 4.3, drift: 10},
];

export function FloatingHearts({prefersReducedMotion, variant = 'ambient'}: FloatingHeartsProps) {
  const hearts = variant === 'finale' ? FINALE_HEARTS : AMBIENT_HEARTS;
  const className = variant === 'finale' ? 'finale-hearts-layer' : 'ambient-hearts-layer';

  return (
    <div className={className} aria-hidden="true">
      {hearts.map((heart, idx) => (
        <motion.svg
          key={idx}
          viewBox="0 0 24 24"
          width={heart.size}
          height={heart.size}
          fill={heart.color}
          style={{
            position: 'absolute',
            left: heart.left,
            top: heart.startTop,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12))',
          }}
          initial={prefersReducedMotion ? {opacity: 0.7} : {y: 0, x: 0, opacity: 0.85, scale: 0.85}}
          animate={
            prefersReducedMotion
              ? {opacity: 0.7}
              : {
                  y: variant === 'finale' ? -155 : -620,
                  x: [0, heart.drift, -heart.drift * 0.65, heart.drift * 0.45, 0],
                  opacity: [0.2, 0.92, 0.92, 0.65, 0],
                  scale: [0.8, 1.15, 0.98, 1.12, 0.85],
                  rotate: [-10, 10, -8, 8, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: heart.duration,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      ))}
    </div>
  );
}
