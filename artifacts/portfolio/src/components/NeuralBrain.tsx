import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  hue: number;
  baseAlpha: number;
}

interface Spark {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  hue: number;
}

interface Ring {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hue: number;
}

export default function NeuralBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let width = canvas.width;
    let height = canvas.height;

    const getCenter = () => ({ cx: canvas.width / 2, cy: canvas.height / 2 });

    // Brain shape
    const isInBrain = (x: number, y: number, cx: number, cy: number, r: number) => {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const factor = 1 - 0.18 * Math.cos(2 * angle + Math.PI / 2) * Math.sin(angle);
      return dist < r * factor;
    };

    const NUM_NODES = 140;
    const CONNECT_DIST = 90;
    const nodes: Node[] = [];

    const initNodes = () => {
      nodes.length = 0;
      const { cx, cy } = getCenter();
      const r = Math.min(canvas.width, canvas.height) * 0.42;

      for (let i = 0; i < NUM_NODES; i++) {
        let x: number, y: number;
        let attempts = 0;
        do {
          x = cx + (Math.random() * 2 - 1) * r;
          y = cy + (Math.random() * 2 - 1) * r;
          attempts++;
        } while (!isInBrain(x, y, cx, cy, r) && attempts < 200);

        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: 1.2 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.04,
          hue: Math.random() < 0.55 ? 180 : 270 + Math.random() * 30,
          baseAlpha: 0.5 + Math.random() * 0.5,
        });
      }
    };

    initNodes();

    const sparks: Spark[] = [];
    const rings: Ring[] = [];

    let mouseX = -1000;
    let mouseY = -1000;
    let isClicking = false;

    const addSpark = () => {
      const i = Math.floor(Math.random() * nodes.length);
      const j = Math.floor(Math.random() * nodes.length);
      if (i !== j) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECT_DIST * 1.5) {
          sparks.push({
            fromX: nodes[i].x,
            fromY: nodes[i].y,
            toX: nodes[j].x,
            toY: nodes[j].y,
            progress: 0,
            speed: 0.02 + Math.random() * 0.03,
            hue: Math.random() < 0.6 ? 180 : 300,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      isClicking = true;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      rings.push({ x: cx, y: cy, radius: 0, maxRadius: 120, alpha: 0.8, hue: 180 });
      rings.push({ x: cx, y: cy, radius: 0, maxRadius: 200, alpha: 0.5, hue: 270 });
      // Fire many sparks on click
      for (let i = 0; i < 12; i++) addSpark();
    };
    const handleMouseUp = () => { isClicking = false; };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; isClicking = false; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      width = canvas.width;
      height = canvas.height;
      const { cx, cy } = getCenter();
      const brainR = Math.min(width, height) * 0.42;

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, brainR * 1.2);
      bg.addColorStop(0, 'rgba(10, 0, 30, 0.95)');
      bg.addColorStop(1, 'rgba(3, 3, 15, 0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Periodic auto sparks
      if (frameCount % 18 === 0) addSpark();

      // Update nodes
      for (const node of nodes) {
        node.pulse += node.pulseSpeed;
        node.x += node.vx;
        node.y += node.vy;

        if (!isInBrain(node.x, node.y, cx, cy, brainR * 1.08)) {
          const dx = cx - node.x;
          const dy = cy - node.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          node.vx += (dx / d) * 0.06;
          node.vy += (dy / d) * 0.06;
        }

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 120) {
          if (isClicking) {
            node.vx += (mdx / mDist) * 0.6;
            node.vy += (mdy / mDist) * 0.6;
          } else {
            node.vx -= (mdx / mDist) * 0.15;
            node.vy -= (mdy / mDist) * 0.15;
          }
        }

        node.vx *= 0.97;
        node.vy *= 0.97;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const mdx = mouseX - midX;
            const mdy = mouseY - midY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

            const baseAlpha = (1 - dist / CONNECT_DIST) * 0.35;
            let alpha = baseAlpha;
            let hue = 270;

            if (mDist < 140) {
              alpha = Math.min(0.95, baseAlpha + 0.6 * (1 - mDist / 140));
              hue = 180;
            }

            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, `hsla(${n1.hue}, 100%, 65%, ${alpha})`);
            grad.addColorStop(1, `hsla(${n2.hue}, 100%, 65%, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = mDist < 140 ? 1.5 : 0.6;
            ctx.shadowColor = `hsla(${hue}, 100%, 65%, 0.6)`;
            ctx.shadowBlur = mDist < 140 ? 8 : 0;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw sparks (traveling signals)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.progress += sp.speed;

        if (sp.progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }

        const t = sp.progress;
        const sx = sp.fromX + (sp.toX - sp.fromX) * t;
        const sy = sp.fromY + (sp.toY - sp.fromY) * t;

        const fade = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;

        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${sp.hue}, 100%, 80%, ${fade})`;
        ctx.shadowColor = `hsla(${sp.hue}, 100%, 80%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseFactor = 0.85 + 0.15 * Math.sin(node.pulse);
        const r = node.radius * pulseFactor;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const nearMouse = mDist < 100;

        const alpha = node.baseAlpha * pulseFactor;
        const glowR = nearMouse ? r * 3.5 : r * 2;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        glow.addColorStop(0, `hsla(${node.hue}, 100%, 75%, ${nearMouse ? 0.9 : alpha})`);
        glow.addColorStop(0.5, `hsla(${node.hue}, 100%, 65%, ${(nearMouse ? 0.4 : alpha * 0.3)})`);
        glow.addColorStop(1, `hsla(${node.hue}, 100%, 60%, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 100%, 85%, ${nearMouse ? 1 : alpha})`;
        ctx.shadowColor = `hsla(${node.hue}, 100%, 70%, 0.8)`;
        ctx.shadowBlur = nearMouse ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw click rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 4;
        ring.alpha *= 0.94;

        if (ring.alpha < 0.01) {
          rings.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.hue}, 100%, 70%, ${ring.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `hsla(${ring.hue}, 100%, 70%, 0.6)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      style={{ background: 'transparent' }}
    />
  );
}
