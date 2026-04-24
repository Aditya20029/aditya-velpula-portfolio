"use client";
import { useEffect, useRef, useState } from "react";

// Returns a ref-based smooth position (for RAF use) AND a state for reactive hover.
export function useMousePosition() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const posRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { pos, posRef };
}
