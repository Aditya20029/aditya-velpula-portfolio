"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Soft liquid-chrome centerpiece — inspired by the floating iridescent
 * logo in the Active Theory reel. Monochrome-chrome core with subtle
 * pink/teal/lilac sheen (NOT a full rainbow conic). Slow rotation, slow
 * breathing, dreamy halo behind.
 */
export default function ReelChromeCore({ size = 420 }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative pointer-events-none"
      style={{ width: size, height: size, perspective: "1200px" }}
    >
      {/* Dreamy radial halo far behind */}
      <div
        className="absolute inset-0"
        style={{
          transform: "scale(2)",
          background:
            "radial-gradient(circle, rgba(255,154,230,0.22) 0%, rgba(196,167,255,0.14) 30%, rgba(124,212,255,0.08) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* Outer soft chrome ring (thin, faint iridescent border) */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          inset: 0,
          background: "var(--gradient-holo)",
          backgroundSize: "200% 200%",
          mask:
            "radial-gradient(circle, transparent 47%, #000 48%, #000 50%, transparent 51%)",
          WebkitMask:
            "radial-gradient(circle, transparent 47%, #000 48%, #000 50%, transparent 51%)",
          filter: "drop-shadow(0 0 16px rgba(255,154,230,0.35))",
          opacity: 0.8,
        }}
        animate={
          reduced
            ? {}
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], rotate: 360 }
        }
        transition={{
          backgroundPosition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Liquid chrome orb — centerpiece */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "22%",
          background:
            /* Base grayscale chrome sphere (highlights + shadows) */
            "radial-gradient(circle at 32% 28%, #ffffff 0%, #e8ecf3 8%, #a8b2c4 25%, #4a5468 55%, #1a1f2e 85%, #0a0d16 100%)",
          boxShadow:
            "inset -24px -26px 48px rgba(0,0,0,0.7), inset 12px 14px 30px rgba(255,255,255,0.15), 0 0 40px rgba(196,167,255,0.2), 0 0 80px rgba(255,154,230,0.15)",
        }}
        animate={
          reduced
            ? {}
            : {
                rotateY: [0, 18, 0, -18, 0],
                rotateX: [6, -4, 6],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Iridescent sheen overlay on the orb (pink/teal tint, additive) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "22%",
          background:
            "radial-gradient(ellipse at 30% 25%, rgba(255,154,230,0.45) 0%, rgba(255,154,230,0) 35%), radial-gradient(ellipse at 70% 70%, rgba(124,212,255,0.4) 0%, rgba(124,212,255,0) 45%), radial-gradient(ellipse at 55% 50%, rgba(196,167,255,0.3) 0%, rgba(196,167,255,0) 55%)",
          mixBlendMode: "screen",
        }}
        animate={
          reduced
            ? {}
            : {
                opacity: [0.85, 1, 0.85],
                scale: [1, 1.02, 1],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bright specular highlight */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "25%",
          background:
            "radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 22%)",
          mixBlendMode: "screen",
        }}
        animate={reduced ? {} : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle inner ring trace */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "18%",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        animate={reduced ? {} : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
