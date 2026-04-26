"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/utils/constants";

/**
 * Premium hero-name display.
 *
 *  - Each letter pops in independently (scale + blur + y) on mount with a
 *    cinematic stagger, then settles on a perfect baseline.
 *  - Hovering a letter scales it slightly, brightens the iridescent fill,
 *    and casts a soft accent glow \u2014 each letter is independently reactive.
 *  - Uses the Fraunces editorial serif (display) for a classy, modern,
 *    flowy feel that contrasts the rest of the site's geometric sans.
 *  - Holographic gradient fill via .holo-text follows theme automatically.
 *
 * The whole assembly is wrapped so the parent can still position it.
 */
export default function HeroName({
  text,
  startDelay = 0,
  className = "",
}) {
  // Split into words so we can preserve spaces visually but stagger letters
  const words = text.split(" ");

  return (
    <h1
      aria-label={text}
      className={className}
      style={{
        fontFamily: 'var(--font-display), "Fraunces", Georgia, serif',
        fontWeight: 800,
        fontSize: "clamp(48px, 9vw, 110px)",
        letterSpacing: "-0.035em",
        lineHeight: 1.02,
      }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            marginRight: wi < words.length - 1 ? "0.32em" : 0,
          }}
        >
          {word.split("").map((ch, i) => {
            const globalIndex =
              words.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + i;
            return <Letter key={i} ch={ch} delay={startDelay + globalIndex * 0.05} />;
          })}
        </span>
      ))}
    </h1>
  );
}

function Letter({ ch, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 60, scale: 0.6, filter: "blur(12px)" }}
      animate={{
        opacity: 1,
        y: 0,
        scale: hovered ? 1.08 : 1,
        filter: "blur(0px)",
      }}
      transition={
        hovered
          ? { type: "spring", stiffness: 260, damping: 16 }
          : {
              opacity: { duration: 0.7, delay, ease: EASE.outExpo },
              y: { duration: 0.9, delay, ease: EASE.outExpo },
              scale: { duration: 0.9, delay, ease: EASE.outExpo },
              filter: { duration: 0.9, delay, ease: EASE.outExpo },
            }
      }
      className="holo-text"
      style={{
        display: "inline-block",
        cursor: "default",
        willChange: "transform, opacity, filter",
        transformOrigin: "50% 70%",
        textShadow: hovered
          ? "0 0 22px var(--glow-cyan), 0 0 48px var(--glow-purple)"
          : "0 0 14px var(--glow-cyan), 0 0 32px var(--glow-purple)",
        transition: "text-shadow 350ms var(--ease-out-expo)",
      }}
    >
      {ch}
    </motion.span>
  );
}
