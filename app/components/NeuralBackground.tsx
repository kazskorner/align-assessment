'use client';

import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originalSize: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const connectionLimit = 180; // Slightly further for network feel
    const mouseRadius = 150;     // Smaller interaction zone

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const area = canvas.width * canvas.height;
      // Network needs enough nodes to feel connected but not cluttered
      const count = Math.floor(area / 18000); 
      const effectiveCount = Math.min(Math.max(count, 35), 90);
      
      nodes = [];
      for (let i = 0; i < effectiveCount; i++) {
        const size = Math.random() * 1.2 + 0.8;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25, // Slower drift
          vy: (Math.random() - 0.5) * 0.25,
          size: size,
          originalSize: size,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        
        // Organic Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around with margin
        const margin = 50;
        if (p.x < -margin) p.x = canvas.width + margin;
        if (p.x > canvas.width + margin) p.x = -margin;
        if (p.y < -margin) p.y = canvas.height + margin;
        if (p.y > canvas.height + margin) p.y = -margin;

        // Subtle Mouse Interaction (very gentle)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            p.x -= dx * force * 0.01; // Tiny repel
            p.y -= dy * force * 0.01;
          }
        }

        // Draw connections first (Z-order)
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionLimit) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Connection opacity based on distance and a slow global pulse
            const pulse = (Math.sin(time * 0.001 + p.pulseOffset) + 1) / 2;
            let alpha = (1 - dist / connectionLimit) * (0.1 + pulse * 0.1);
            
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw node (neuron)
        const nodePulse = (Math.sin(time * 0.002 + p.pulseOffset) + 1) / 2;
        const currentSize = p.size + nodePulse * 0.5;

        // Outer Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${0.1 + nodePulse * 0.1})`);
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + nodePulse * 0.3})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame((t) => draw(t));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    draw(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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

export default NeuralBackground;
