"use client";
import { useEffect, useState } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0); // px / s
  const [state, setState] = useState("idle"); // idle | slow | fast | paused

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let pauseTimer;

    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      const v = Math.abs(dy / dt) * 1000;
      setVelocity(v);
      setState(v > 2000 ? "fast" : v > 300 ? "slow" : "idle");
      lastY = window.scrollY;
      lastT = now;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => setState("paused"), 2000);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(pauseTimer);
    };
  }, []);

  return { velocity, state };
}
