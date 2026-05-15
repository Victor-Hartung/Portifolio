import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
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

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Floating orbs — nebula blobs
    const orbs: Orb[] = [];
    const ORB_COUNT = 6;
    for (let i = 0; i < ORB_COUNT; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 200 + Math.random() * 300,
        hue: i % 2 === 0 ? 180 : 270,
        alpha: 0.04 + Math.random() * 0.06,
      });
    }

    // Floating particles
    const particles: Particle[] = [];
    const MAX_PARTICLES = 120;

    const spawnParticle = () => {
      particles.push({
        x: Math.random() * width,
        y: height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.3 + Math.random() * 0.8),
        size: 0.5 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7,
        hue: Math.random() < 0.6 ? 180 : 270,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      });
    };

    for (let i = 0; i < MAX_PARTICLES * 0.6; i++) {
      spawnParticle();
      particles[particles.length - 1].y = Math.random() * height;
      particles[particles.length - 1].life = Math.random() * particles[particles.length - 1].maxLife;
    }

    let animationFrameId: number;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Deep space background
      ctx.fillStyle = '#03030f';
      ctx.fillRect(0, 0, width, height);

      // Draw nebula orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        // Slight mouse attraction
        const mx = mouseX - orb.x;
        const my = mouseY - orb.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 600) {
          orb.vx += (mx / md) * 0.002;
          orb.vy += (my / md) * 0.002;
        }
        orb.vx *= 0.99;
        orb.vy *= 0.99;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `hsla(${orb.hue}, 100%, 60%, ${orb.alpha})`);
        grad.addColorStop(0.5, `hsla(${orb.hue}, 100%, 50%, ${orb.alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${orb.hue}, 100%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Mouse-follow glow
      const mGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 350);
      mGrad.addColorStop(0, 'rgba(0, 255, 255, 0.05)');
      mGrad.addColorStop(0.5, 'rgba(0, 255, 255, 0.02)');
      mGrad.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 350, 0, Math.PI * 2);
      ctx.fillStyle = mGrad;
      ctx.fill();

      // Spawn new particles
      if (frameCount % 3 === 0 && particles.length < MAX_PARTICLES) {
        spawnParticle();
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const fadeAlpha = progress < 0.1
          ? (progress / 0.1) * p.alpha
          : progress > 0.8
            ? ((1 - progress) / 0.2) * p.alpha
            : p.alpha;

        // Twinkle
        const twinkle = 0.7 + 0.3 * Math.sin(p.life * 0.1 + p.x);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${fadeAlpha * twinkle})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Subtle scanline overlay every ~80px
      ctx.fillStyle = 'rgba(0,0,0,0.015)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
