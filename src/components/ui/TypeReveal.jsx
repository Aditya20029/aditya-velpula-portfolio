"use client";
import { useEffect, useState } from "react";

/**
 * Subtle "decode" reveal — characters resolve from a small randomised
 * scramble into the final string. Less playful than a movie hacker
 * effect, more like a system rendering text in real time. Fires once.
 */
const SCRAMBLE = "AETIONRBCDFGHJKLMPQSUVWXYZ";

export default function TypeReveal({
  text,
  delay = 0,
  speed = 32,        // ms per character
  scrambleRounds = 2, // how many garbled chars before locking in
  className = "",
  as: Tag = "span",
}) {
  const [out, setOut] = useState(
    text
      .split("")
      .map((c) => (c === " " ? " " : ""))
      .join("")
  );

  useEffect(() => {
    let cancelled = false;
    const start = setTimeout(() => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i >= text.length) return;

        const target = text[i];

        if (target === " ") {
          setOut((prev) => prev.slice(0, i) + " " + prev.slice(i + 1));
          i++;
          setTimeout(tick, speed);
          return;
        }

        let r = 0;
        const scramble = () => {
          if (cancelled) return;
          if (r < scrambleRounds) {
            const rand = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
            setOut((prev) => prev.slice(0, i) + rand + prev.slice(i + 1));
            r++;
            setTimeout(scramble, speed);
          } else {
            setOut((prev) => prev.slice(0, i) + target + prev.slice(i + 1));
            i++;
            setTimeout(tick, speed);
          }
        };
        scramble();
      };
      tick();
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, delay, speed, scrambleRounds]);

  return (
    <Tag aria-label={text} className={className}>
      {out}
    </Tag>
  );
}
