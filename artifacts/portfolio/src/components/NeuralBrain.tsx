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
  alpha: number;
}

// Precomputed connection pairs — updated every N frames
interface Pair {
  i: number;
  j: number;
  dist: number;
}

const CONNECT_DIST = 85;
const NUM_NODES = 60;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function NeuralBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      const p = canvas.parentElement;
      if (p) { canvas.width = p.clientWidth; canvas.height = p.clientHeight; }
    };
    window.addEventListener('resize', resize);
    resize();

    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;

    const inBrain = (x: number, y: number) => {
      const r = Math.min(canvas.width, canvas.height) * 0.42;
      const dx = x - cx();
      const dy = y - cy();
      const d = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const f = 1 - 0.18 * Math.cos(2 * angle + Math.PI / 2) * Math.sin(angle);
      return d < r * f;
    };

    const nodes: Node[] = [];
    for (let i = 0; i < NUM_NODES; i++) {
      const r = Math.min(canvas.width, canvas.height) * 0.42;
      let x = 0, y = 0, tries = 0;
      do {
        x = cx() + (Math.random() * 2 - 1) * r;
        y = cy() + (Math.random() * 2 - 1) * r;
        tries++;
      } while (!inBrain(x, y) && tries < 150);
      nodes.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.025,
        hue: Math.random() < 0.55 ? 180 : 270 + Math.random() * 30,
      });
    }

    let pairs: Pair[] = [];
    let pairFrame = 0;

    const recomputePairs = () => {
      pairs = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) pairs.push({ i, j, dist });
        }
      }
    };

    const sparks: Spark[] = [];
    const rings: Ring[] = [];

    let mouseX = -1000, mouseY = -1000;
    let isClicking = false;

    const addSpark = () => {
      if (sparks.length > 8) return;
      const i = Math.floor(Math.random() * nodes.length);
      const j = Math.floor(Math.random() * nodes.length);
      if (i !== j) {
        sparks.push({
          fromX: nodes[i].x, fromY: nodes[i].y,
          toX: nodes[j].x, toY: nodes[j].y,
          progress: 0,
          speed: 0.025 + Math.random() * 0.02,
          hue: Math.random() < 0.6 ? 180 : 300,
        });
      }
    };

    const getCanvasPos = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const onMouseMove = (e: MouseEvent) => {
      const { x, y } = getCanvasPos(e.clientX, e.clientY);
      mouseX = x; mouseY = y;
    };
    const onMouseDown = (e: MouseEvent) => {
      isClicking = true;
      const { x, y } = getCanvasPos(e.clientX, e.clientY);
      rings.push({ x, y, radius: 0, alpha: 0.7 });
      rings.push({ x, y, radius: 0, alpha: 0.4 });
      for (let k = 0; k < 5; k++) addSpark();
    };
    const onMouseUp = () => { isClicking = false; };
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000; isClicking = false; };

    // Touch — mirrors mouse behaviour exactly
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent page scroll while interacting with canvas
      if (e.touches.length > 0) {
        const { x, y } = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
        mouseX = x; mouseY = y;
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { x, y } = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
        mouseX = x; mouseY = y;
        isClicking = true;
        rings.push({ x, y, radius: 0, alpha: 0.7 });
        rings.push({ x, y, radius: 0, alpha: 0.4 });
        for (let k = 0; k < 5; k++) addSpark();
      }
    };
    const onTouchEnd = () => { mouseX = -1000; mouseY = -1000; isClicking = false; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    let animId: number;
    let lastTime = 0;
    let frameCount = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;
      frameCount++;

      const W = canvas.width;
      const H = canvas.height;
      const ocx = cx();
      const ocy = cy();
      const brainR = Math.min(W, H) * 0.42;

      ctx.clearRect(0, 0, W, H);

      // Recompute pairs every 15 frames (~0.5s at 30fps)
      if (frameCount % 15 === 0) recomputePairs();

      // Update nodes
      for (const n of nodes) {
        n.pulse += n.pulseSpeed;
        n.x += n.vx;
        n.y += n.vy;

        // Keep in brain
        if (!inBrain(n.x, n.y)) {
          const dx = ocx - n.x;
          const dy = ocy - n.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          n.vx += (dx / d) * 0.05;
          n.vy += (dy / d) * 0.05;
        }

        // Mouse interaction
        const mdx = mouseX - n.x;
        const mdy = mouseY - n.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 100) {
          const force = isClicking ? 0.4 : -0.12;
          n.vx += (mdx / md) * force;
          n.vy += (mdy / md) * force;
        }

        n.vx *= 0.97;
        n.vy *= 0.97;
      }

      // Draw connections (no shadow — very expensive)
      ctx.lineWidth = 0.7;
      for (const { i, j, dist } of pairs) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        const midX = (n1.x + n2.x) / 2;
        const midY = (n1.y + n2.y) / 2;
        const mdx = mouseX - midX;
        const mdy = mouseY - midY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        const nearMouse = mDist < 130;
        const baseA = (1 - dist / CONNECT_DIST) * 0.3;
        const alpha = nearMouse ? Math.min(0.85, baseA + 0.5 * (1 - mDist / 130)) : baseA;
        const hue = nearMouse ? 180 : 270;

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.lineWidth = nearMouse ? 1.2 : 0.5;
        ctx.stroke();
      }

      // Sparks (auto-fire occasionally)
      if (frameCount % 25 === 0) addSpark();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.progress += sp.speed;
        if (sp.progress >= 1) { sparks.splice(i, 1); continue; }
        const t = sp.progress;
        const sx = sp.fromX + (sp.toX - sp.fromX) * t;
        const sy = sp.fromY + (sp.toY - sp.fromY) * t;
        const fade = t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${sp.hue}, 100%, 80%, ${fade * 0.9})`;
        ctx.fill();
      }

      // Nodes — batch by hue to reduce strokeStyle changes
      for (const n of nodes) {
        const pf = 0.88 + 0.12 * Math.sin(n.pulse);
        const r = n.radius * pf;
        const mdx = mouseX - n.x;
        const mdy = mouseY - n.y;
        const nearMouse = Math.sqrt(mdx * mdx + mdy * mdy) < 90;

        ctx.beginPath();
        ctx.arc(n.x, n.y, nearMouse ? r * 2.5 : r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 100%, ${nearMouse ? 90 : 70}%, ${nearMouse ? 1 : n.pulse % (Math.PI * 2) / (Math.PI * 2) * 0.4 + 0.6})`;
        ctx.fill();
      }

      // Click rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 5;
        ring.alpha *= 0.92;
        if (ring.alpha < 0.01) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 255, ${ring.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    recomputePairs();
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animId);
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
