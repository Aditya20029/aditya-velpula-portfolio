"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Dense colorful bokeh particle storm — fixed full-viewport, so the same
 * canvas reads on every section of the page. Each particle always drifts
 * intrinsically (not just on scroll) so the field feels alive even when
 * the user is sitting still on a section.
 *
 * Perf:
 *   - Halos are pre-rendered once into an offscreen sprite per color, then
 *     blitted with drawImage. Avoids the cost of createRadialGradient /
 *     shadowBlur every particle every frame.
 *   - scrollDelta clamped per frame so fast Lenis flicks don't shear.
 */

// Mostly-white with very occasional pastel tints — keeps the page from
// looking like a confetti party
const PALETTE = [
  "255, 255, 255",
  "255, 255, 255",
  "255, 255, 255",
  "255, 255, 255",
  "255, 255, 255",
  "230, 240, 255",
  "230, 240, 255",
  "215, 225, 245", // cool white
  "255, 215, 240", // very faint pink
  "215, 235, 255", // very faint teal
  "230, 225, 250", // very faint lilac
];

const COMET_COLORS = [
  "255, 154, 230",
  "124, 212, 255",
  "196, 167, 255",
  "255, 216, 138",
];

/** Build an off-screen sprite of a glowing dot in a given color.
 *  Center = bright core, edges = smooth transparent. */
function buildSprite(color, radius) {
  const d = radius * 2;
  const cvs = document.createElement("canvas");
  cvs.width = d;
  cvs.height = d;
  const c = cvs.getContext("2d");
  const g = c.createRadialGradient(radius, radius, 0, radius, radius, radius);
  g.addColorStop(0, `rgba(${color}, 1)`);
  g.addColorStop(0.35, `rgba(${color}, 0.45)`);
  g.addColorStop(1, `rgba(${color}, 0)`);
  c.fillStyle = g;
  c.beginPath();
  c.arc(radius, radius, radius, 0, Math.PI * 2);
  c.fill();
  return cvs;
}

export default function GlitterStorm() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    /* Skip on phones AND any touch device. Canvas particle loops are the
       single biggest mobile stutter cause; native scroll + paint can't
       keep up while we redraw 96+ sprites every frame. */
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile || isTouch) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    // Pre-render one halo sprite per unique color (radius 36 → good quality
    // when scaled down; shared across all particles of that color).
    const SPRITE_R = 36;
    const sprites = {};
    PALETTE.forEach((c) => {
      if (!sprites[c]) sprites[c] = buildSprite(c, SPRITE_R);
    });

    const isTablet = window.matchMedia("(max-width: 1023px)").matches;
    // Restrained particle density — site reads as professional first,
    // ambient effects second
    const count = isTablet ? 54 : 96;

    const parts = Array.from({ length: count }, () => {
      const r = Math.random();
      const depth = r < 0.5 ? 1 : r < 0.82 ? 2 : 3;
      const size =
        depth === 1
          ? 0.8 + Math.random() * 0.6
          : depth === 2
          ? 1.2 + Math.random() * 1
          : 1.8 + Math.random() * 1.4;
      // Slow, ambient upward drift — present but never demanding attention
      const baseUp =
        depth === 3 ? 0.32 : depth === 2 ? 0.2 : 0.12;
      const sideSwing =
        depth === 3 ? 0.18 : depth === 2 ? 0.12 : 0.07;
      return {
        x: Math.random() * (W || window.innerWidth),
        y: Math.random() * (H || window.innerHeight),
        depth,
        size,
        // Significantly dimmer — these are background ornaments, not the
        // focal point of the page
        baseAlpha:
          depth === 3
            ? 0.32 + Math.random() * 0.18
            : depth === 2
            ? 0.18 + Math.random() * 0.14
            : 0.08 + Math.random() * 0.1,
        // Upward drift (negative y) — always
        vy: -baseUp - Math.random() * baseUp * 0.4,
        // Horizontal swing via a sinusoidal term on a per-particle phase
        swingAmp: sideSwing,
        swingPhase: Math.random() * Math.PI * 2,
        swingFreq: 0.0004 + Math.random() * 0.0008,
        twinkle: 0.0008 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    });

    // Cursor reactivity
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
    const CURSOR_R = 220;
    const CURSOR_R_SQ = CURSOR_R * CURSOR_R;

    // Comet streaks — rare so they read as a moment of delight rather than
    // background noise
    const comets = [];
    let nextCometAt = performance.now() + 12000 + Math.random() * 18000;
    const spawnComet = () => {
      const fromLeft = Math.random() < 0.5;
      comets.push({
        x: fromLeft ? -30 : W + 30,
        y: Math.random() * H,
        vx: (fromLeft ? 1 : -1) * (3.5 + Math.random() * 2),
        vy: (Math.random() - 0.5) * 1.4,
        life: 1,
        trail: [],
        color: COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)],
      });
    };

    let lastScrollY = window.scrollY;
    let rafId;

    const tick = (now) => {
      const currentScrollY = window.scrollY;
      const rawDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Clamp so a fast Lenis flick can't teleport the field
      const scrollDelta = Math.max(-30, Math.min(30, rawDelta));

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter"; // additive

      for (const p of parts) {
        // 1. Gentle parallax on scroll (clamped above)
        p.y -= scrollDelta * p.depth * 0.08;
        // 2. Always-on upward drift
        p.y += p.vy;
        // 3. Horizontal sinusoidal swing — gives each particle a slow S-path
        p.x += Math.sin(p.swingPhase + now * p.swingFreq) * p.swingAmp;

        // Cursor attraction
        let cursorBoost = 1;
        if (cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CURSOR_R_SQ) {
            const d = Math.sqrt(dSq) || 1;
            const falloff = 1 - d / CURSOR_R;
            const force = falloff * 0.35 * p.depth;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
            cursorBoost = 1 + falloff * 1.4;
          }
        }

        // Wrap around viewport
        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        const tw = 1 + 0.55 * Math.sin(p.phase + now * p.twinkle);
        const alpha = Math.min(1, p.baseAlpha * tw * cursorBoost);

        // Draw pre-rendered halo sprite, scaled to the particle's size
        const drawR = p.size * 5;
        const sprite = sprites[p.color];
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          sprite,
          p.x - drawR,
          p.y - drawR,
          drawR * 2,
          drawR * 2
        );
      }
      ctx.globalAlpha = 1;

      // Comet streaks
      if (now > nextCometAt) {
        spawnComet();
        nextCometAt = now + 18000 + Math.random() * 22000;
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.trail.unshift({ x: c.x, y: c.y });
        if (c.trail.length > 26) c.trail.pop();
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.006;

        c.trail.forEach((pt, j) => {
          const fade = 1 - j / c.trail.length;
          const a = fade * fade * c.life * 0.5;
          ctx.fillStyle = `rgba(${c.color}, ${a})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(0.3, 1.8 - j * 0.07), 0, Math.PI * 2);
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
