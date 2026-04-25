"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Subtle iridescent ornament that sits behind a section heading.
 * Very low opacity so it never competes with content — just gives each
 * section its own quiet 'living' element.
 *
 * Variants: "ring", "orb", "arc"
 *   - ring  rotating holographic hairline circle
 *   - orb   soft blurred iridescent halo (like a distant planet)
 *   - arc   partial arc + orbit dot (feels like a gauge)
 */
export default function SectionAccent({
  variant = "ring",
  size = 280,
  position = { top: "0%", left: "50%" },
  opacity: passedOpacity = 0.18,
  reverse = false,
}) {
  // Halve whatever opacity was passed so the existing per-section calls
  // don't need editing — gives the whole site a calmer ambient layer.
  const opacity = passedOpacity * 0.5;
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-0"
      style={{
        width: size,
        height: size,
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        opacity,
      }}
    >
      {variant === "ring" && (
        <>
          {/* Soft halo */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,154,230,0.25) 0%, rgba(196,167,255,0.15) 30%, rgba(124,212,255,0.08) 55%, transparent 80%)",
              filter: "blur(24px)",
              transform: "scale(1.6)",
            }}
          />
          {/* Iridescent hairline ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "var(--gradient-holo)",
              backgroundSize: "200% 200%",
              mask:
                "radial-gradient(circle, transparent 47%, #000 48%, #000 49.6%, transparent 50.6%)",
              WebkitMask:
                "radial-gradient(circle, transparent 47%, #000 48%, #000 49.6%, transparent 50.6%)",
            }}
            animate={
              reduced
                ? {}
                : {
                    rotate: reverse ? -360 : 360,
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }
            }
            transition={{
              rotate: { duration: 60, ease: "linear", repeat: Infinity },
              backgroundPosition: {
                duration: 18,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
          />
          {/* Inner dashed ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: "18%",
              border: "1px dashed rgba(255, 255, 255, 0.12)",
            }}
            animate={reduced ? {} : { rotate: reverse ? 360 : -360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
        </>
      )}

      {variant === "orb" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,154,230,0.45), rgba(196,167,255,0.25) 35%, rgba(124,212,255,0.12) 65%, transparent 85%)",
            filter: "blur(18px)",
          }}
          animate={
            reduced
              ? {}
              : {
                  scale: [1, 1.06, 1],
                  opacity: [0.8, 1, 0.8],
                }
          }
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      {variant === "arc" && (
        <>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,212,255,0.18), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0"
            animate={reduced ? {} : { rotate: reverse ? -360 : 360 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            <defs>
              <linearGradient id={`arc-grad-${size}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff9ae6" stopOpacity="0" />
                <stop offset="50%" stopColor="#c4a7ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7cd4ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={`url(#arc-grad-${size})`}
              strokeWidth="0.6"
              strokeDasharray="80 220"
            />
            <circle
              cx="95"
              cy="50"
              r="1.4"
              fill="#ff9ae6"
              style={{ filter: "drop-shadow(0 0 4px #ff9ae6)" }}
            />
          </motion.svg>
        </>
      )}
    </div>
  );
}
