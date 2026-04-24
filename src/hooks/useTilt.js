"use client";
import { useEffect, useRef, useState } from "react";

export function useTilt({ max = 6, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rX = (0.5 - y) * 2 * max;
      const rY = (x - 0.5) * 2 * max;
      el.style.setProperty("--mouse-x", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--mouse-y", `${(y * 100).toFixed(2)}%`);
      el.style.transform = `perspective(1000px) rotateX(${rX.toFixed(
        2
      )}deg) rotateY(${rY.toFixed(2)}deg) scale(${scale})`;
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => {
      setHovered(false);
      el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale]);

  return [ref, hovered];
}
