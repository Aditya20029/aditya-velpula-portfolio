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
    // 480 caused framerate dips on fast scroll; 340 keeps density high
    // while leaving headroom for the halo fills + cursor attraction pass.
    const count = isTablet ? 200 : 340;

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
            ? 0.7 + Math.random() * 0.3
            : depth === 2
            ? 0.42 + Math.random() * 0.28
            : 0.22 + Math.random() * 0.22,
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

    // Cursor state — particles drift toward + brighten inside the radius
    const cursor = { x: -1000, y: -1000, active: false };
    const onMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      cursor.active = true;
    };
    const onLeave = () => {
      cursor.active = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const CURSOR_RADIUS = 220;
    const CURSOR_RADIUS_SQ = CURSOR_RADIUS * CURSOR_RADIUS;

    // Occasional colored comet streaks — adds rare bursts of motion so long
    // sections don't feel static. Each comet has a short trail.
    const comets = [];
    let nextCometAt = performance.now() + 5000 + Math.random() * 7000;
    const cometPalette = ["255, 154, 230", "124, 212, 255", "196, 167, 255", "255, 216, 138"];
    const spawnComet = () => {
      const fromLeft = Math.random() < 0.5;
      comets.push({
        x: fromLeft ? -30 : W + 30,
        y: Math.random() * H,
        vx: (fromLeft ? 1 : -1) * (3.5 + Math.random() * 2),
        vy: (Math.random() - 0.5) * 1.4,
        life: 1,
        trail: [],
        color: cometPalette[Math.floor(Math.random() * cometPalette.length)],
      });
    };

    const tick = (now) => {
      const currentScrollY = window.scrollY;
      const rawDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Clamp per-frame scroll contribution so a fast flick of Lenis's
      // smooth-scroll doesn't teleport particles across the viewport —
      // that was visually reading as the animation "breaking" when scrolling
      // into lower sections.
      const scrollDelta = Math.max(-40, Math.min(40, rawDelta));

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter"; // additive glow

      for (const p of parts) {
        // Parallax by depth — reduced multiplier so the drift reads smoothly
        // instead of shearing on fast scroll
        p.y -= scrollDelta * p.depth * 0.09;
        p.x += p.dx;
        p.y += p.dy;

        // Cursor attraction — pulls nearby particles toward cursor + boosts alpha
        let cursorBoost = 1;
        if (cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CURSOR_RADIUS_SQ) {
            const d = Math.sqrt(dSq) || 1;
            const falloff = 1 - d / CURSOR_RADIUS; // 0..1
            const force = falloff * 0.35 * p.depth;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
            // Brighten near cursor — max 2.4x at the center
            cursorBoost = 1 + falloff * 1.4;
          }
        }

        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        const tw = 1 + 0.5 * Math.sin(p.phase + now * p.twinkle);
        const alpha = p.baseAlpha * tw * cursorBoost;

        // Core + shadow-glow halo in one fill (much cheaper than building a
        // radial gradient every frame for every particle)
        ctx.shadowColor = `rgba(${p.color}, ${alpha})`;
        ctx.shadowBlur = p.size * 6;
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, alpha * 1.6)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Spawn + render comets
      if (now > nextCometAt) {
        spawnComet();
        nextCometAt = now + 6000 + Math.random() * 10000;
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.trail.unshift({ x: c.x, y: c.y });
        if (c.trail.length > 26) c.trail.pop();
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.006;

        c.trail.forEach((p, j) => {
          const fade = 1 - j / c.trail.length;
          const a = fade * fade * c.life * 0.9;
          ctx.fillStyle = `rgba(${c.color}, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.3, 2.2 - j * 0.08), 0, Math.PI * 2);
          ctx.fill();
        });

        if (
          c.life <= 0 ||
          c.x < -80 ||
          c.x > W + 80 ||
          c.y < -80 ||
          c.y > H + 80
        ) {
          comets.splice(i, 1);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
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
