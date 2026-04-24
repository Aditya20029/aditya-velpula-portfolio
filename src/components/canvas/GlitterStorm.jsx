"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Dense colorful bokeh glitter — matches the reel's sparkling particle
 * haze around the chrome centerpiece.
 *
 * vs. Starfield: softer, MUCH more color variety, larger blurred halos,
 * slower drift, no warp streaks. Feels like confetti suspended in space.
 */
export default function GlitterStorm() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const isTablet = window.matchMedia("(max-width: 1023px)").matches;
    const count = isTablet ? 180 : 360;

    // Warm + cool iridescent confetti palette
    const palette = [
      "255, 154, 230",   // soft pink
      "255, 154, 230",
      "124, 212, 255",   // sky teal
      "124, 212, 255",
      "196, 167, 255",   // lilac
      "139, 245, 208",   // mint
      "255, 216, 138",   // amber
      "255, 180, 138",   // coral
      "255, 255, 255",   // white
      "255, 255, 255",
    ];

    const parts = Array.from({ length: count }, () => {
      const d = Math.random();
      // 45% back, 35% mid, 20% front
      const depth = d < 0.45 ? 1 : d < 0.8 ? 2 : 3;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        depth,
        // Size scales with depth
        size:
          depth === 1
            ? 0.8 + Math.random() * 0.8
            : depth === 2
            ? 1.2 + Math.random() * 1.1
            : 1.8 + Math.random() * 1.6,
        baseAlpha:
          depth === 3
            ? 0.55 + Math.random() * 0.3
            : depth === 2
            ? 0.3 + Math.random() * 0.25
            : 0.12 + Math.random() * 0.18,
        twinkle: 0.0003 + Math.random() * 0.0012,
        phase: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        // Gentle drift (slow)
        dx: (Math.random() - 0.5) * 0.12,
        dy: (Math.random() - 0.5) * 0.12,
      };
    });

    let lastScrollY = window.scrollY;
    let rafId;

    const tick = (now) => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter"; // additive glow

      for (const p of parts) {
        // Parallax by depth
        p.y -= scrollDelta * p.depth * 0.22;
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        const tw = 1 + 0.5 * Math.sin(p.phase + now * p.twinkle);
        const alpha = p.baseAlpha * tw;

        // Bokeh halo
        const haloR = p.size * 6;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        g.addColorStop(0, `rgba(${p.color}, ${alpha * 0.9})`);
        g.addColorStop(0.4, `rgba(${p.color}, ${alpha * 0.35})`);
        g.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        // Crisp core
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, alpha * 2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
