"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Aurora — animated gradient mesh orbs. Sits behind hero. */
export default function Aurora() {
  const reduced = useReducedMotion();

  const orbs = [
    {
      color: "rgba(59, 130, 246, 0.22)",
      size: 520,
      x: "10%",
      y: "20%",
      duration: 18,
    },
    {
      color: "rgba(139, 92, 246, 0.18)",
      size: 460,
      x: "75%",
      y: "55%",
      duration: 22,
    },
    {
      color: "rgba(6, 182, 212, 0.18)",
      size: 420,
      x: "45%",
      y: "70%",
      duration: 25,
    },
    {
      color: "rgba(245, 158, 11, 0.08)",
      size: 360,
      x: "85%",
      y: "15%",
      duration: 20,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle at 50% 50%, ${o.color}, transparent 70%)`,
            filter: "blur(24px)",
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
