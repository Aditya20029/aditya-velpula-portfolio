"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Clean per-character typewriter reveal. Reveals one character at a time
 * left-to-right with a soft trailing caret while typing. No scramble —
 * legible at every frame, even on long strings.
 *
 * On touch / narrow viewports, render the full string immediately. The
 * delay-based reveal would otherwise leave the line invisible until
 * its delay fires, which on phones can read as missing content.
 */
export default function TypeReveal({
  text,
  delay = 0,
  speed = 32,
  showCaret = true,
  className = "",
  as: Tag = "span",
}) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const skip = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    if (mq.matches) {
      // Compact viewport: skip the typewriter entirely
      skip.current = true;
      setShown(text.length);
      setDone(true);
      return;
    }

    let cancelled = false;
    let timeoutId;

    const start = setTimeout(() => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i >= text.length) {
          setDone(true);
          return;
        }
        i++;
        setShown(i);
        timeoutId = setTimeout(tick, speed);
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(timeoutId);
    };
  }, [text, delay, speed]);

  return (
    <Tag aria-label={text} className={className}>
      {text.slice(0, shown)}
      {showCaret && !done && !skip.current && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.5em",
            marginLeft: "0.04em",
            verticalAlign: "baseline",
            color: "currentColor",
            animation: "typewriter-cursor 0.9s steps(2) infinite",
          }}
        >
          |
        </span>
      )}
    </Tag>
  );
}
