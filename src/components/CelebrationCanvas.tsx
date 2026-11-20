import {useEffect, useRef} from 'react';

interface CelebrationCanvasProps {
  burstTrigger: number;
}

interface AmbientHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rot: number;
  rotAmp: number;
  color: string;
  alpha: number;
}

interface AmbientConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  speedY: number;
  driftX: number;
  phase: number;
  rot: number;
  rotSpeed: number;
  flipPhase: number;
  flipSpeed: number;
  shape: 'rect' | 'circle' | 'ribbon';
  color: string;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  rotSpeed: number;
  flipPhase: number;
  flipSpeed: number;
  life: number;
  maxLife: number;
  kind: 'confetti' | 'heart' | 'star';
  color: string;
}

const COLORS = [
  '#FF4D6D',
  '#FFB703',
  '#06D6A0',
  '#1982C4',
  '#E04F82',
  '#8338EC',
  '#FFD166',
];

const HEART_COLORS = ['#E63946', '#FF4D6D', '#FF758F', '#E04F82', '#FFB703'];

function drawHeart(ctx: CanvasRenderingContext2D, size: number, color: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  const s = size * 0.5;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.45);
  ctx.bezierCurveTo(-s * 1.15, -s * 0.35, -s * 0.9, -s * 1.25, 0, -s * 0.55);
  ctx.bezierCurveTo(s * 0.9, -s * 1.25, s * 1.15, -s * 0.35, 0, s * 0.45);
  ctx.closePath();
  ctx.fill();

  // Subtle white shine
  ctx.globalAlpha = alpha * 0.45;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-s * 0.38, -s * 0.48, s * 0.16, s * 0.1, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawStar(ctx: CanvasRenderingContext2D, r: number, color: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 4; i += 1) {
    const angle = (i * Math.PI) / 2;
    const ox = Math.cos(angle) * r;
    const oy = Math.sin(angle) * r;
    const ix = Math.cos(angle + Math.PI / 4) * (r * 0.34);
    const iy = Math.sin(angle + Math.PI / 4) * (r * 0.34);
    if (i === 0) {
      ctx.moveTo(ox, oy);
    } else {
      ctx.lineTo(ox, oy);
    }
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function CelebrationCanvas({burstTrigger}: CelebrationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const burstsRef = useRef<BurstParticle[]>([]);
  const spawnBurstRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize continuous floating hearts distributed immediately across the screen
    const hearts: AmbientHeart[] = Array.from({length: 18}, (_, i) => ({
      x: (width * ((i + 0.5) / 18)) + (Math.random() - 0.5) * 40,
      y: Math.random() * height,
      size: 18 + Math.random() * 14,
      speedY: 42 + Math.random() * 44,
      swayAmp: 16 + Math.random() * 24,
      swayFreq: 1.1 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      rot: 0,
      rotAmp: 0.16 + Math.random() * 0.14,
      color: HEART_COLORS[i % HEART_COLORS.length],
      alpha: 0.65 + Math.random() * 0.25,
    }));

    // Initialize continuous falling confetti pieces distributed immediately across the screen
    const confetti: AmbientConfettiPiece[] = Array.from({length: 44}, (_, i) => {
      const shapeRoll = i % 3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        w: shapeRoll === 2 ? 6 + Math.random() * 3 : 8 + Math.random() * 5,
        h: shapeRoll === 1 ? 8 + Math.random() * 5 : shapeRoll === 2 ? 17 + Math.random() * 8 : 11 + Math.random() * 5,
        speedY: 58 + Math.random() * 68,
        driftX: (Math.random() - 0.5) * 32,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 3.2,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: 3.5 + Math.random() * 4.5,
        shape: shapeRoll === 0 ? 'rect' : shapeRoll === 1 ? 'circle' : 'ribbon',
        color: COLORS[i % COLORS.length],
      };
    });

    const spawnBurst = () => {
      const next: BurstParticle[] = [];
      const total = 115;
      for (let i = 0; i < total; i += 1) {
        const originRoll = i % 3;
        let x = width * 0.5;
        let y = height * 0.42;
        let vx = (Math.random() - 0.5) * 680;
        let vy = -380 - Math.random() * 380;

        if (originRoll === 0) {
          // Left cannon
          x = Math.max(12, width * 0.06);
          y = height * 0.72;
          vx = 180 + Math.random() * 460;
          vy = -440 - Math.random() * 420;
        } else if (originRoll === 1) {
          // Right cannon
          x = Math.min(width - 12, width * 0.94);
          y = height * 0.72;
          vx = -(180 + Math.random() * 460);
          vy = -440 - Math.random() * 420;
        }

        const kindRoll = i % 6;
        next.push({
          x,
          y,
          vx,
          vy,
          size: kindRoll === 2 ? 16 + Math.random() * 8 : 9 + Math.random() * 6,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 9,
          flipPhase: Math.random() * Math.PI * 2,
          flipSpeed: 5 + Math.random() * 6,
          life: 0,
          maxLife: 2.3 + Math.random() * 1.3,
          kind: kindRoll === 2 ? 'heart' : kindRoll === 4 ? 'star' : 'confetti',
          color: COLORS[i % COLORS.length],
        });
      }
      burstsRef.current = [...burstsRef.current.slice(-140), ...next];
    };

    spawnBurstRef.current = spawnBurst;
    spawnBurst();

    let lastTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw & update continuous falling confetti
      for (const p of confetti) {
        p.y += p.speedY * dt;
        p.x += (Math.sin(t * 1.4 + p.phase) * 26 + p.driftX) * dt;
        p.rot += p.rotSpeed * dt;
        p.flipPhase += p.flipSpeed * dt;

        if (p.y > height + 30) {
          p.y = -24;
          p.x = Math.random() * width;
        }
        if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, Math.max(0.25, Math.abs(Math.cos(p.flipPhase))));
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.w * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h, p.shape === 'ribbon' ? 3 : 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
        }
        ctx.restore();
      }

      // 2. Draw & update continuous rising hearts
      for (const h of hearts) {
        h.y -= h.speedY * dt;
        h.phase += h.swayFreq * dt;
        const drawX = h.x + Math.sin(h.phase) * h.swayAmp;
        const rot = Math.sin(h.phase * 0.9) * h.rotAmp;

        if (h.y < -40) {
          h.y = height + 35;
          h.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(drawX, h.y);
        ctx.rotate(rot);
        drawHeart(ctx, h.size, h.color, h.alpha);
        ctx.restore();
      }

      // 3. Draw & update celebratory burst cannons
      const remaining: BurstParticle[] = [];
      for (const b of burstsRef.current) {
        b.life += dt;
        if (b.life >= b.maxLife) {
          continue;
        }
        b.vy += 520 * dt; // gravity
        b.vx *= Math.pow(0.48, dt); // air drag
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.rotSpeed * dt;
        b.flipPhase += b.flipSpeed * dt;

        const progress = b.life / b.maxLife;
        const alpha = progress < 0.72 ? 0.95 : 0.95 * (1 - (progress - 0.72) / 0.28);

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        if (b.kind === 'heart') {
          drawHeart(ctx, b.size, b.color, alpha);
        } else if (b.kind === 'star') {
          drawStar(ctx, b.size * 0.75, b.color, alpha);
        } else {
          ctx.scale(1, Math.max(0.25, Math.abs(Math.cos(b.flipPhase))));
          ctx.globalAlpha = alpha;
          ctx.fillStyle = b.color;
          ctx.fillRect(-b.size * 0.45, -b.size * 0.7, b.size * 0.9, b.size * 1.4);
        }
        ctx.restore();
        remaining.push(b);
      }
      burstsRef.current = remaining;

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (burstTrigger > 1 && spawnBurstRef.current) {
      spawnBurstRef.current();
    }
  }, [burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 45,
      }}
    />
  );
}
