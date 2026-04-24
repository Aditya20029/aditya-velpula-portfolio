"use client";
import { motion } from "framer-motion";

/* Miniature animated preview visuals per project type. */
export default function ProjectPreview({ type, accentColor = "#3b82f6" }) {
  if (type === "pipeline") {
    const nodes = [
      { x: 20, y: 70 },
      { x: 90, y: 70 },
      { x: 160, y: 70 },
      { x: 230, y: 70 },
    ];
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {nodes.slice(0, -1).map((n, i) => (
          <g key={i}>
            <line
              x1={n.x + 20}
              y1={n.y}
              x2={nodes[i + 1].x - 20}
              y2={nodes[i + 1].y}
              stroke={accentColor}
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <motion.circle
              r="3"
              fill={accentColor}
              animate={{
                cx: [n.x + 20, nodes[i + 1].x - 20],
                opacity: [0, 1, 0],
              }}
              cy={n.y}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
        {nodes.map((n, i) => (
          <rect
            key={i}
            x={n.x - 20}
            y={n.y - 14}
            width="40"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.06)"
            stroke={accentColor}
            strokeOpacity="0.3"
          />
        ))}
      </svg>
    );
  }

  if (type === "chart") {
    const lines = [
      "M10 110 Q40 60 70 75 T130 60 T190 55 T260 40",
      "M10 120 Q40 90 70 95 T130 80 T190 70 T260 60",
      "M10 100 Q40 70 70 85 T130 70 T190 80 T260 65",
    ];
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {lines.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeOpacity={0.4 + i * 0.2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.3, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
      </svg>
    );
  }

  if (type === "heatmap") {
    const cells = [];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 10; x++) {
        const intensity = Math.random() * 0.8 + 0.2;
        cells.push({ x, y, intensity });
      }
    }
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {cells.map((c, i) => (
          <motion.rect
            key={i}
            x={c.x * 28 + 4}
            y={c.y * 26 + 6}
            width="24"
            height="22"
            rx="3"
            fill={accentColor}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [c.intensity * 0.3, c.intensity, c.intensity * 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.02,
            }}
          />
        ))}
      </svg>
    );
  }

  if (type === "grid") {
    const cells = Array.from({ length: 9 });
    return (
      <div className="grid grid-cols-3 gap-1.5 p-3 h-full">
        {cells.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="relative aspect-[3/4] rounded-md overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}55)`,
              border: `1px solid ${accentColor}55`,
            }}
          >
            <span
              className="absolute top-1 right-1 t-mono-sm px-1.5 py-0.5 rounded bg-black/50 text-white"
              style={{ fontSize: "7px" }}
            >
              {90 + (i % 9)}%
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
