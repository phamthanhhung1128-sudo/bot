import React, { useEffect, useRef } from 'react';

const COLORS = ['#7C5CFF', '#22D3EE', '#FF5C7A', '#FFB15C', '#34D399', '#F5B942', '#E9D5FF'];

export default function Confetti({ fireKey }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!fireKey) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particles = Array.from({ length: 150 }, () => ({
      x: w * (0.3 + Math.random() * 0.4),
      y: h * 0.35,
      vx: (Math.random() - 0.5) * 18,
      vy: -Math.random() * 16 - 5,
      size: 4 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      shape: Math.random() > 0.6 ? 'circle' : 'rect'
    }));

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38;
        p.vx *= 0.995;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - t / 2.8);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.62);
        }
        ctx.restore();
      });
      if (t < 2.8) {
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fireKey]);

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />;
}
