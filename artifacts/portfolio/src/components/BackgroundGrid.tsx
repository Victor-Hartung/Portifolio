import React, { useEffect, useRef } from 'react';

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

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);

    // Grid properties
    const gridSize = 50;
    let offsetX = 0;
    let offsetY = 0;
    
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse movement interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Slow drift
      offsetX -= 0.2;
      offsetY -= 0.1;
      
      if (offsetX <= -gridSize) offsetX = 0;
      if (offsetY <= -gridSize) offsetY = 0;

      ctx.lineWidth = 1;
      
      // Draw grid
      for (let x = offsetX; x < width; x += gridSize) {
        for (let y = offsetY; y < height; y += gridSize) {
          
          // Calculate distance from mouse to create a glowing reveal effect
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          const maxDist = 400;
          let alpha = 0.03; // Base very dim alpha
          
          if (dist < maxDist) {
            alpha = 0.03 + (1 - dist / maxDist) * 0.2;
          }

          ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
          
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
          
          // Draw intersections (particles)
          if (dist < maxDist * 0.8) {
            const dotAlpha = (1 - dist / (maxDist * 0.8)) * 0.4;
            ctx.fillStyle = `rgba(157, 0, 255, ${dotAlpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
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
      style={{ background: '#050510' }}
    />
  );
}
