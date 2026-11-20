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

    // Generate falling dots
    // Density: roughly 1 dot per 12,000 px^2 to keep it subtle and not noisy
    const dotCount = Math.max(25, Math.floor((width * height) / 12000));
    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.8 + 1.0, // 1.0px - 1.8px
      speed: Math.random() * 0.25 + 0.15, // Slow, calm vertical falling
      opacity: isDark ? (Math.random() * 0.2 + 0.15) : (Math.random() * 0.12 + 0.1) // Ultra-subtle
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dot color depends on theme: crisp dark dots in light mode, soft white dots in dark mode
      const baseColor = isDark ? '243, 244, 246' : '100, 116, 139';

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${dot.opacity})`;
        ctx.fill();

        // Move dot vertically down
        dot.y += dot.speed;

        // Wrap around when reaching bottom
        if (dot.y > height + 5) {
          dot.y = -5;
          dot.x = Math.random() * width;
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
