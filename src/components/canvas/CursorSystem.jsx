"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CursorSystem() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [label, setLabel] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");

    let rafId;
    const target = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const glowPos = { x: -100, y: -100 };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const hoverableSelector = 'a, button, [role="button"], [data-cursor], input, textarea, select';

    const onOver = (e) => {
      const el = e.target.closest(hoverableSelector);
      if (el) {
        setIsInteractive(true);
        const l = el.getAttribute("data-cursor-label");
        setLabel(l || "");
      }
    };
    const onOut = (e) => {
      const el = e.target.closest(hoverableSelector);
      if (el) {
        setIsInteractive(false);
        setLabel("");
      }
    };
    const onDown = () => setIsPressing(true);
    const onUp = () => setIsPressing(false);

    const tick = () => {
      dotPos.x += (target.x - dotPos.x) * 0.25;
      dotPos.y += (target.y - dotPos.y) * 0.25;
      glowPos.x += (target.x - glowPos.x) * 0.1;
      glowPos.y += (target.y - glowPos.y) * 0.1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${dotPos.x}px, ${
          dotPos.y + 28
        }px, 0) translate(-50%, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced]);

  if (reduced) return null;

  const glowSize = isPressing ? 220 : isInteractive ? 320 : 240;
  const dotSize = isPressing ? 12 : isInteractive ? 20 : 8;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="cursor-glow pointer-events-none fixed top-0 left-0 z-[9998] transition-[width,height,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,207,255,0.2), rgba(167,139,255,0.1) 34%, transparent 62%)",
          opacity: isInteractive ? 0.9 : 0.58,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-[width,height,background,border] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          background: isInteractive ? "transparent" : "var(--accent-primary)",
          border: isInteractive
            ? `2px solid var(--accent-primary)`
            : "2px solid transparent",
          willChange: "transform",
        }}
      />
      {label && (
        <div
          ref={labelRef}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[9999] t-mono-sm text-[var(--text-primary)] bg-[var(--bg-elevated)]/90 backdrop-blur px-2 py-1 rounded border border-[var(--border-subtle)]"
        >
          {label}
        </div>
      )}
    </>
  );
}
