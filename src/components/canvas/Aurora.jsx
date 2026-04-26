"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/hooks/useTheme";

/* Aurora — animated gradient mesh orbs. Sits behind hero. */
export default function Aurora() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const light = theme === "light";

  // Light mode uses softer pastel tints so the orbs feel like morning
  // haze rather than neon — matches the rest of the light palette.
  const orbs = light
    ? [
        { color: "rgba(99, 160, 255, 0.14)", size: 560, x: "10%", y: "22%", duration: 20 },
        { color: "rgba(170, 139, 244, 0.12)", size: 500, x: "78%", y: "58%", duration: 24 },
        { color: "rgba(91, 192, 222, 0.12)", size: 460, x: "42%", y: "74%", duration: 26 },
        { color: "rgba(253, 186, 116, 0.08)", size: 380, x: "85%", y: "12%", duration: 22 },
      ]
    : [
        { color: "rgba(59, 130, 246, 0.10)", size: 520, x: "10%", y: "20%", duration: 18 },
        { color: "rgba(139, 92, 246, 0.08)", size: 460, x: "75%", y: "55%", duration: 22 },
        { color: "rgba(6, 182, 212, 0.08)", size: 420, x: "45%", y: "70%", duration: 25 },
        { color: "rgba(245, 158, 11, 0.04)", size: 360, x: "85%", y: "15%", duration: 20 },
      ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {orbs.map((o, i) => (
        <motion.div
          key={`${theme}-${i}`}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle at 50% 50%, ${o.color}, transparent 70%)`,
            filter: light ? "blur(40px)" : "blur(24px)",
          }}
          animate={
            reduced
              ? {}
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -30, 40, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: o.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
