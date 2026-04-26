"use client";
import { useEffect, useRef } from "react";

/**
 * Top-of-page scroll progress bar.
 *
 * Writes directly to the bar element's transform via a ref + RAF instead
 * of running React's reconciler on every scroll event. On mobile the
 * old setState-per-event was triggering up to 60 re-renders per second
 * during fast scroll. RAF caps it to one DOM write per frame.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed top-0 left-0 h-[2px] z-[60] origin-left will-change-transform"
      style={{
        width: "100%",
        background: "var(--gradient-accent)",
        transform: "scaleX(0)",
        transformOrigin: "left center",
      }}
    />
  );
}
