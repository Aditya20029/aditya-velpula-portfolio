"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

function formatValue(n, format, decimals = 0) {
  if (typeof n !== "number") return String(n);
  if (format === "decimal") return n.toFixed(2);
  if (n >= 1000) return Math.round(n).toLocaleString();
  return n.toFixed(decimals);
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  format,
  duration = 2000,
  className = "",
}) {
  const [ref, inView] = useInView({ threshold: 0.3, once: true });
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    if (typeof value === "string") {
      setDisplay(value);
      return;
    }
    let rafId;
    const target = Number(value);
    const tick = (t) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / duration);
      // ease-out-expo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(target * eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  const rendered =
    typeof display === "number" ? formatValue(display, format) : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}
