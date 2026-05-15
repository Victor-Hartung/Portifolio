import React, { useEffect, useRef } from 'react';

export default function NeuralBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Node particle system for the brain
    const nodes: {x: number, y: number, vx: number, vy: number, radius: number, connections: number[]}[] = [];
    const numNodes = 100;
    
    // Brain shape bounds (two hemispheres approx)
    const isInBrainShape = (x: number, y: number, cx: number, cy: number, r: number) => {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      // Create a slight dip in the middle top and bottom for hemispheres
      const angle = Math.atan2(dy, dx);
      const radiusFactor = 1 - 0.2 * Math.cos(2 * angle + Math.PI/2) * Math.sin(angle);
      
      return dist < r * radiusFactor;
    };

    const centerX = width / 2;
    const centerY = height / 2;
    const brainRadius = Math.min(width, height) * 0.4;

    for (let i = 0; i < numNodes; i++) {
      let x, y;
      do {
        x = centerX + (Math.random() * 2 - 1) * brainRadius;
        y = centerY + (Math.random() * 2 - 1) * brainRadius;
      } while (!isInBrainShape(x, y, centerX, centerY, brainRadius));

      nodes.push({
        x,
        y,
        vx: (Math.random() * 2 - 1) * 0.2,
        vy: (Math.random() * 2 - 1) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        connections: []
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isClicking = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if(e.touches.length > 0) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseDown = () => { isClicking = true; };
    const handleMouseUp = () => { isClicking = false; };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; isClicking = false; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Move
        node.x += node.vx;
        node.y += node.vy;
        
        // Keep within brain shape bounds loosely, else bounce back
        if (!isInBrainShape(node.x, node.y, centerX, centerY, brainRadius * 1.1)) {
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          node.vx += (dx / dist) * 0.05;
          node.vy += (dy / dist) * 0.05;
        }

        // Mouse interaction
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
        
        if (mDist < 100) {
          if (isClicking) {
            // Attract
            node.vx += (mdx / mDist) * 0.5;
            node.vy += (mdy / mDist) * 0.5;
          } else {
            // Repel slightly
            node.vx -= (mdx / mDist) * 0.1;
            node.vy -= (mdy / mDist) * 0.1;
          }
        }
        
        // Dampen velocity
        node.vx *= 0.98;
        node.vy *= 0.98;
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < 80) {
            const mdx = mouseX - (n1.x + n2.x)/2;
            const mdy = mouseY - (n1.y + n2.y)/2;
            const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
            
            // Mouse proximity highlights connections
            let alpha = 1 - (dist / 80);
            let isHighlight = false;
            
            if (mDist < 120) {
              alpha = Math.min(1, alpha + 0.5 * (1 - mDist/120));
              isHighlight = true;
            }

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            if (isHighlight) {
              ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
              ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
              ctx.shadowBlur = 5;
            } else {
              ctx.strokeStyle = `rgba(157, 0, 255, ${alpha * 0.5})`;
              ctx.shadowBlur = 0;
            }
            
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        if (mDist < 80) {
          ctx.fillStyle = '#00ffff';
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 10;
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = '#9d00ff';
          ctx.shadowColor = '#9d00ff';
          ctx.shadowBlur = 5;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
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
      className="w-full h-full cursor-crosshair rounded-xl"
      style={{ background: 'transparent' }}
    />
  );
}
