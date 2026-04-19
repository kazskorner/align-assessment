'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originalSize: number;
}

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const ripplesRef = useRef<{ x: number; y: number; r: number; active: boolean }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const connectionLimit = 150;
    const mouseRadius = 200;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Responsive particle count
      const area = canvas.width * canvas.height;
      const count = Math.floor(area / 15000); // roughly 80-150 on desktop
      const effectiveCount = Math.min(Math.max(count, 40), 120);
      
      particles = [];
      for (let i = 0; i < effectiveCount; i++) {
        const size = Math.random() * 1.5 + 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: size,
          originalSize: size,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Handle Ripples
      ripplesRef.current = ripplesRef.current.filter(r => r.active);
      ripplesRef.current.forEach((ripple) => {
        ripple.r += 12;
        if (ripple.r > Math.max(canvas.width, canvas.height) * 1.5) {
          ripple.active = false;
        }
        
        // Optional: Draw ripple circle faint
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, 0.1 - ripple.r / 3000)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with Mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            // "Repel slightly" or "Accelerate towards" - let's do a mix or repel
            // User said: "accelerate towards it or repel slightly"
            // Let's do a subtle "floating towards" but not getting stuck
            p.vx += dx * force * 0.005;
            p.vy += dy * force * 0.005;
            p.size = p.originalSize + force * 1.5;
          } else {
            p.size = p.size * 0.9 + p.originalSize * 0.1;
          }
        } else {
          p.size = p.size * 0.9 + p.originalSize * 0.1;
        }

        // Interaction with Ripples
        ripplesRef.current.forEach((ripple) => {
          if (ripple.active) {
            const dx = p.x - ripple.x;
            const dy = p.y - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const rippleWidth = 100;
            
            if (Math.abs(dist - ripple.r) < rippleWidth) {
                const force = (rippleWidth - Math.abs(dist - ripple.r)) / rippleWidth;
                const angle = Math.atan2(dy, dx);
                const pushPower = 15;
                p.vx += Math.cos(angle) * force * pushPower;
                p.vy += Math.sin(angle) * force * pushPower;
            }
          }
        });

        // Friction and Constant Motion
        p.vx *= 0.92;
        p.vy *= 0.92;
        
        // Constant drift
        p.x += p.vx + (Math.random() - 0.5) * 0.1;
        p.y += p.vy + (Math.random() - 0.5) * 0.1;

        // Wrap around with margin
        const margin = 50;
        if (p.x < -margin) p.x = canvas.width + margin;
        if (p.x > canvas.width + margin) p.x = -margin;
        if (p.y < -margin) p.y = canvas.height + margin;
        if (p.y > canvas.height + margin) p.y = -margin;

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Draw lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionLimit) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            let alpha = (1 - dist / connectionLimit) * 0.2;
            
            // Interaction: if mouse near midpoint
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mdx = mouseRef.current.x - midX;
            const mdy = mouseRef.current.y - midY;
            const distM = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mouseRef.current.active && distM < mouseRadius) {
                const mouseForce = (mouseRadius - distM) / mouseRadius;
                alpha += mouseForce * 0.4;
                ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.lineWidth = 1 + mouseForce;
            } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 0.5;
            }
            
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        active: true
      });
      // Limit active ripples to 3
      if (ripplesRef.current.length > 3) {
        ripplesRef.current.shift();
      }
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    init();
    drawParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
};

export default StarfieldBackground;
