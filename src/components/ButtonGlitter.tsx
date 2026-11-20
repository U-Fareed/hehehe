import {motion} from 'motion/react';

const SPARKLES = [
  {left: '12%', top: '24%', size: 7, delay: 0},
  {left: '34%', top: '68%', size: 6, delay: 0.9},
  {left: '68%', top: '22%', size: 6, delay: 1.7},
  {left: '86%', top: '66%', size: 7, delay: 0.5},
];

export function ButtonGlitter({reduced = false}: {reduced?: boolean}) {
  return (
    <span className="btn-glitter-layer" aria-hidden="true">
      {SPARKLES.map((s, idx) => (
        <motion.svg
          key={idx}
          viewBox="0 0 20 20"
          width={s.size}
          height={s.size}
          fill="#FFFFFF"
          style={{position: 'absolute', left: s.left, top: s.top, pointerEvents: 'none'}}
          animate={
            reduced
              ? undefined
              : {
                  scale: [0.65, 1, 0.65],
                  opacity: [0.14, 0.52, 0.14],
                  rotate: [0, 35, 0],
                }
          }
          transition={{
            duration: 3.2,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" />
        </motion.svg>
      ))}
    </span>
  );
}
