import React, { useEffect, useRef } from 'react';

export default function FallingDotsCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const count = isDark ? 40 : 25;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: isDark ? (Math.random() * 1.0 + 1.0) : (Math.random() * 0.6 + 0.8), // 0.8px - 1.4px in light
      speedY: isDark ? (Math.random() * 0.3 + 0.15) : (Math.random() * 0.15 + 0.08), // Much slower in light
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: isDark ? (Math.random() * 0.25 + 0.15) : (Math.random() * 0.1 + 0.06), // Ultra faint in light
      color: isDark ? '243, 244, 246' : '16, 185, 129' // Subtle emerald touch in light mode
    }));

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step++;

      // In light mode: Draw subtle Linear dot-matrix pattern as ambient background
      if (!isDark) {
        const spacing = 32;
        const offsetX = (width % spacing) / 2;
        const offsetY = (height % spacing) / 2;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.035)'; // Crisp, ultra-subtle Linear grid
        for (let x = offsetX; x < width; x += spacing) {
          for (let y = offsetY; y < height; y += spacing) {
            // Distance from center to fade edges
            const dx = (x - width / 2) / (width / 2);
            const dy = (y - height / 2) / (height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 1.1) {
              ctx.beginPath();
              ctx.arc(x, y, 0.85, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw gentle floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        } else {
          // In light mode, soft airy emerald/slate glimmer
          ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        }
        ctx.fill();

        // Update movement
        p.y += p.speedY;
        p.x += Math.sin(step * 0.01 + i) * 0.15;

        // Wrap around
        if (p.y > height + 5) {
          p.y = -5;
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}
