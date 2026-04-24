"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? scrolled / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-[2px] z-[60] origin-left"
      style={{
        width: "100%",
        background: "var(--gradient-accent)",
        transform: `scaleX(${progress})`,
        transformOrigin: "left center",
      }}
    />
  );
}
