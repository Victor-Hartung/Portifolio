import { useEffect, useRef } from 'react';

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

interface Particle {
  x: number;
  y: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  alpha: number;
}

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let mouseX = W / 2;
    let mouseY = H / 2;
    let targetX = W / 2;
    let targetY = H / 2;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    const onMouseMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    // 4 nebula orbs
    const orbs: Orb[] = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: 220 + Math.random() * 200,
      hue: i % 2 === 0 ? 180 : 270,
      alpha: 0.05 + Math.random() * 0.045,
    }));

    // Particles — fewer, no shadow blur
    const MAX_P = 70;
    const particles: Particle[] = [];

    const spawnParticle = (randomY = false) => {
      particles.push({
        x: Math.random() * W,
        y: randomY ? Math.random() * H : H + 5,
        vy: -(0.25 + Math.random() * 0.6),
        size: 0.6 + Math.random() * 1.2,
        alpha: 0.25 + Math.random() * 0.65,
        hue: Math.random() < 0.6 ? 180 : 270,
        life: 0,
        maxLife: 220 + Math.random() * 280,
      });
    };

    for (let i = 0; i < MAX_P * 0.7; i++) spawnParticle(true);

    let animId: number;
    let lastTime = 0;
    let frameCount = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;
      frameCount++;

      ctx.clearRect(0, 0, W, H);

      // Background fill
      ctx.fillStyle = '#03030f';
      ctx.fillRect(0, 0, W, H);

      // Smooth mouse
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Orbs — update and draw (no shadow)
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = W + orb.radius;
        if (orb.x > W + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = H + orb.radius;
        if (orb.y > H + orb.radius) orb.y = -orb.radius;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `hsla(${orb.hue},100%,60%,${orb.alpha})`);
        grad.addColorStop(0.5, `hsla(${orb.hue},100%,50%,${orb.alpha * 0.3})`);
        grad.addColorStop(1, `hsla(${orb.hue},100%,40%,0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Mouse glow
      const mg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
      mg.addColorStop(0, 'rgba(0,255,255,0.04)');
      mg.addColorStop(1, 'rgba(0,255,255,0)');
      ctx.fillStyle = mg;
      ctx.fillRect(mouseX - 280, mouseY - 280, 560, 560);

      // Spawn particles
      if (frameCount % 4 === 0 && particles.length < MAX_P) spawnParticle(false);

      // Particles — no shadow blur
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife || p.y < -5) { particles.splice(i, 1); continue; }

        const prog = p.life / p.maxLife;
        const fade = prog < 0.12 ? prog / 0.12 : prog > 0.8 ? (1 - prog) / 0.2 : 1;
        const twinkle = 0.75 + 0.25 * Math.sin(p.life * 0.12 + p.x * 0.01);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,72%,${p.alpha * fade * twinkle})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
