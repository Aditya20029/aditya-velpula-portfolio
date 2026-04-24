"use client";
import { useEffect, useRef } from "react";
import { noise2D } from "@/utils/perlin";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isTablet = window.matchMedia("(max-width: 1023px)").matches;
    const nodeCount = isTablet ? 40 : 80;

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      r: 2 + Math.random() * 2,
      seed: Math.random() * 1000,
      opacity: 0.2 + Math.random() * 0.2,
    }));

    const mouse = { x: -1000, y: -1000 };
    // Read theme each frame from the DOM attribute so we re-color when
    // the user flips the toggle without tearing down the canvas.
    const getColors = () => {
      const light = document.documentElement.dataset.theme === "light";
      return light
        ? { node: "15, 23, 42", edge: "37, 99, 235" } // deep navy dots, blue edges
        : { node: "59, 130, 246", edge: "59, 130, 246" };
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    let last = 0;
    let rafId;
    let t = 0;

    const tick = (now) => {
      if (now - last < 33) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      last = now;
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      // Update nodes — perlin-driven drift
      for (const n of nodes) {
        const nx = noise2D(n.seed + t, 0) * 0.6;
        const ny = noise2D(0, n.seed + t) * 0.6;
        n.vx = nx;
        n.vy = ny;

        // Cursor attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 200) {
          const force = (1 - dist / 200) * 0.3;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      const { node: nodeRgb, edge: edgeRgb } = getColors();

      // Edges
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.15;
            ctx.strokeStyle = `rgba(${edgeRgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Cursor lines to closest nodes
      if (mouse.x > 0) {
        const scored = nodes
          .map((n) => ({ n, d: Math.hypot(n.x - mouse.x, n.y - mouse.y) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 3);
        for (const { n, d } of scored) {
          if (d < 240) {
            ctx.strokeStyle = `rgba(${edgeRgb}, ${(1 - d / 240) * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${nodeRgb}, ${n.opacity})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}
