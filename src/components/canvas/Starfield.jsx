"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Ambient starfield that covers the entire viewport and parallaxes with
 * scroll. Three depth layers create an illusion of depth:
 *    depth 1 — distant, tiny, faint, slow
 *    depth 2 — mid, regular twinkle
 *    depth 3 — foreground, larger, brighter, with glow halo when peaking
 *
 * Scrolling fast triggers a subtle "warp" mode: each star renders as a
 * short gradient streak in the scroll direction. Occasional shooting
 * stars streak across diagonally every ~8–18s.
 *
 * Theme-aware: white-ish stars on dark, muted navy-tinted dust on light.
 * Disabled on mobile (battery) and when user prefers reduced motion.
 */
export default function Starfield() {
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
    const count = isTablet ? 140 : 280;

    const starHues = [
      [255, 255, 255], // 70% plain white
      [255, 255, 255],
      [255, 255, 255],
      [255, 255, 255],
      [255, 255, 255],
      [255, 255, 255],
      [255, 255, 255],
      [186, 210, 255], // 15% cool blue-white
      [186, 210, 255],
      [214, 196, 255], // 15% faint violet
      [214, 196, 255],
    ];

    const stars = Array.from({ length: count }, () => {
      const r = Math.random();
      // 55% depth-1, 30% depth-2, 15% depth-3
      const depth = r < 0.55 ? 1 : r < 0.85 ? 2 : 3;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        depth,
        size:
          depth === 1
            ? 0.5 + Math.random() * 0.4
            : depth === 2
            ? 0.8 + Math.random() * 0.5
            : 1.1 + Math.random() * 0.7,
        baseOpacity:
          depth === 3
            ? 0.55 + Math.random() * 0.35
            : depth === 2
            ? 0.28 + Math.random() * 0.22
            : 0.12 + Math.random() * 0.16,
        twinkleSpeed: 0.0004 + Math.random() * 0.0016,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: starHues[Math.floor(Math.random() * starHues.length)],
      };
    });

    let lastScrollY = window.scrollY;
    let shootingStars = [];
    let nextShootAt = performance.now() + 3500 + Math.random() * 8000;
    let rafId;

    const spawnShooting = () => {
      shootingStars.push({
        x: Math.random() * W * 0.5,
        y: Math.random() * H * 0.35,
        vx: 3 + Math.random() * 2,
        vy: 0.8 + Math.random() * 1.3,
        life: 1,
        trail: [],
      });
    };

    const tick = (now) => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const light = document.documentElement.dataset.theme === "light";
      const warping = Math.abs(scrollDelta) > 6;

      ctx.clearRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        // Parallax: move opposite to scroll, deeper stars move more (feels close)
        s.y -= scrollDelta * s.depth * 0.35;

        // Wrap around with a little margin so stars don't pop in
        if (s.y < -8) s.y = H + 8 + Math.random() * 4;
        else if (s.y > H + 8) s.y = -8 - Math.random() * 4;

        const twinkle = 1 + 0.45 * Math.sin(s.twinklePhase + now * s.twinkleSpeed);
        let opacity = s.baseOpacity * twinkle;
        if (light) opacity *= 0.42; // much subtler on off-white

        const [r, g, b] = s.hue;
        const colorStr = light
          ? `rgba(15, 23, 42, ${opacity})`
          : `rgba(${r}, ${g}, ${b}, ${opacity})`;

        if (warping && s.depth >= 2) {
          // Streak (warp). Length scales with scrollDelta and depth.
          const streakLen = Math.min(
            42,
            Math.abs(scrollDelta) * s.depth * 0.55
          );
          const dy = scrollDelta > 0 ? streakLen : -streakLen;
          const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + dy);
          grad.addColorStop(0, colorStr);
          grad.addColorStop(
            1,
            light
              ? "rgba(15, 23, 42, 0)"
              : `rgba(${r}, ${g}, ${b}, 0)`
          );
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + dy);
          ctx.stroke();
        } else {
          ctx.fillStyle = colorStr;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();

          // Glow halo for brightest stars at peak twinkle
          if (!light && s.depth === 3 && twinkle > 1.25) {
            const glow = opacity * 0.35;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glow})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 3.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Shooting stars
      if (now > nextShootAt) {
        spawnShooting();
        nextShootAt = now + 8000 + Math.random() * 10000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.trail.unshift({ x: ss.x, y: ss.y });
        if (ss.trail.length > 22) ss.trail.pop();
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 0.008;

        ss.trail.forEach((p, j) => {
          const fade = 1 - j / ss.trail.length;
          const a = fade * fade * ss.life * (light ? 0.35 : 0.9);
          ctx.fillStyle = light
            ? `rgba(37, 99, 235, ${a})`
            : `rgba(255, 255, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.2, 1.6 - j * 0.06), 0, Math.PI * 2);
          ctx.fill();
        });

        if (ss.life <= 0 || ss.x > W + 60 || ss.y > H + 60) {
          shootingStars.splice(i, 1);
        }
      }

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
