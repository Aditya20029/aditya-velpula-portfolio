"use client";
import { useEffect, useState } from "react";

/**
 * Clean per-character typewriter reveal. Reveals one character at a time
 * left-to-right with a soft trailing caret while typing. No scramble \u2014
 * legible at every frame, even on long strings.
 */
export default function TypeReveal({
  text,
  delay = 0,
  speed = 32,        // ms per character
  showCaret = true,
  className = "",
  as: Tag = "span",
}) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
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
      {showCaret && !done && (
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
