"use client";
import { motion } from "framer-motion";

/* Each preview is a tiny recognizable illustration of the project's domain.
   Every project has its OWN preview \u2014 no shared shapes between cards. */

export default function ProjectPreview({ type, accentColor = "#3b82f6" }) {
  /* ───────────── PIPELINE (Obesity Analytics \u2014 AWS data pipeline) ───────────── */
  if (type === "pipeline") {
    const labels = ["S3", "Glue", "Athena", "BI"];
    const nodes = labels.map((l, i) => ({ x: 30 + i * 73, y: 70, label: l }));
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {nodes.slice(0, -1).map((n, i) => (
          <g key={i}>
            <line
              x1={n.x + 22}
              y1={n.y}
              x2={nodes[i + 1].x - 22}
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
                cx: [n.x + 22, nodes[i + 1].x - 22],
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
          <g key={i}>
            <rect
              x={n.x - 22}
              y={n.y - 14}
              width="44"
              height="28"
              rx="4"
              fill={`${accentColor}11`}
              stroke={accentColor}
              strokeOpacity="0.45"
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono), monospace"
              fontWeight="600"
              fill={accentColor}
              opacity="0.95"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  /* ───────────── CHART (Electricity \u2014 multi-line trend) ───────────── */
  if (type === "chart") {
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {/* Grid lines */}
        {[30, 60, 90, 120].map((y, i) => (
          <line
            key={i}
            x1="14"
            y1={y}
            x2="266"
            y2={y}
            stroke={accentColor}
            strokeOpacity="0.08"
            strokeDasharray="2 4"
          />
        ))}
        {/* Bars */}
        {Array.from({ length: 12 }).map((_, i) => {
          const h = 18 + (Math.sin(i * 1.4) * 0.5 + 0.5) * 56;
          return (
            <motion.rect
              key={i}
              x={20 + i * 21}
              y={120 - h}
              width="12"
              height={h}
              rx="2"
              fill={accentColor}
              fillOpacity="0.18"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: `0 120px`, transformBox: "fill-box" }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
        {/* Two trend lines */}
        {[
          {
            d: "M14 100 Q60 78 100 70 T180 50 T266 36",
            opacity: 0.95,
            width: 1.8,
          },
          {
            d: "M14 116 Q60 100 100 96 T180 84 T266 70",
            opacity: 0.55,
            width: 1.4,
          },
        ].map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            fill="none"
            stroke={accentColor}
            strokeOpacity={l.opacity}
            strokeWidth={l.width}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        ))}
      </svg>
    );
  }

  /* ───────────── HEATMAP (Wildfire \u2014 fire-risk grid) ───────────── */
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

  /* ───────────── GAUGE (SLA Breach \u2014 risk dial + ticks) ───────────── */
  if (type === "gauge") {
    // Half-arc gauge from -90deg to +90deg (top half visible).
    // Arc radius 60, center (140, 100). Stroke goes from left (180deg)
    // to right (0deg).
    const cx = 140;
    const cy = 100;
    const r = 60;
    // Arc path: start at left of dial, curve over the top, end at right
    const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
    const ticks = Array.from({ length: 11 });
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {/* Track */}
        <path
          d={arcPath}
          fill="none"
          stroke={accentColor}
          strokeOpacity="0.18"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* Animated value arc */}
        <motion.path
          d={arcPath}
          fill="none"
          stroke={accentColor}
          strokeOpacity="0.95"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.78 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Tick marks around the arc */}
        {ticks.map((_, i) => {
          const t = i / (ticks.length - 1);
          const angle = Math.PI * (1 - t); // 180\u00b0 \u2192 0\u00b0
          const inner = r + 6;
          const outer = r + 12;
          const x1 = cx + Math.cos(angle) * inner;
          const y1 = cy - Math.sin(angle) * inner;
          const x2 = cx + Math.cos(angle) * outer;
          const y2 = cy - Math.sin(angle) * outer;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={accentColor}
              strokeOpacity={i % 5 === 0 ? "0.55" : "0.25"}
              strokeWidth={i % 5 === 0 ? 1.5 : 1}
            />
          );
        })}
        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx + r * Math.cos(Math.PI * 0.22)}
          y2={cy - r * Math.sin(Math.PI * 0.22)}
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{
            x2: cx + r * Math.cos(Math.PI * 1),
            y2: cy - r * Math.sin(Math.PI * 1),
          }}
          animate={{
            x2: cx + r * Math.cos(Math.PI * 0.22),
            y2: cy - r * Math.sin(Math.PI * 0.22),
          }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <circle cx={cx} cy={cy} r="4" fill={accentColor} />
        {/* Status label */}
        <text
          x={cx}
          y={cy + 26}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono), monospace"
          fontWeight="700"
          fill={accentColor}
          opacity="0.85"
          letterSpacing="0.18em"
        >
          SLA · 78%
        </text>
      </svg>
    );
  }

  /* ───────────── PLATE (License Plate \u2014 OCR detection frame) ───────────── */
  if (type === "plate") {
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {/* Plate body */}
        <rect
          x="60"
          y="46"
          width="160"
          height="48"
          rx="6"
          fill={`${accentColor}10`}
          stroke={accentColor}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        {/* Plate text */}
        <text
          x="140"
          y="78"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fontFamily="var(--font-mono), monospace"
          fill={accentColor}
          letterSpacing="0.18em"
        >
          AV·2026
        </text>
        {/* Detection bounding-box brackets, 4 corners */}
        {[
          ["50,38 70,38 70,40", "50,38 50,58"],
          ["230,38 210,38 210,40", "230,38 230,58"],
          ["50,102 70,102 70,100", "50,102 50,82"],
          ["230,102 210,102 210,100", "230,102 230,82"],
        ].map(([p1, p2], i) => (
          <g key={i}>
            <polyline
              points={p1}
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.95"
            />
            <polyline
              points={p2}
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.95"
            />
          </g>
        ))}
        {/* Animated scan line */}
        <motion.line
          x1="60"
          x2="220"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeOpacity="0.7"
          initial={{ y1: 50, y2: 50 }}
          animate={{ y1: [50, 88, 50], y2: [50, 88, 50] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Confidence pill */}
        <rect
          x="58"
          y="108"
          width="60"
          height="14"
          rx="7"
          fill={`${accentColor}22`}
          stroke={accentColor}
          strokeOpacity="0.4"
        />
        <text
          x="88"
          y="118"
          textAnchor="middle"
          fontSize="8"
          fontFamily="var(--font-mono), monospace"
          fontWeight="700"
          fill={accentColor}
          letterSpacing="0.1em"
        >
          0.97 CONF
        </text>
      </svg>
    );
  }

  /* ───────────── GRID (Movie Recommender \u2014 poster grid) ───────────── */
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
              background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}77)`,
              border: `1px solid ${accentColor}66`,
            }}
          >
            <span
              className="absolute top-1 right-1 t-mono-sm px-1.5 py-0.5 rounded bg-black/60 text-white"
              style={{ fontSize: "7px" }}
            >
              {90 + (i % 9)}%
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  /* ───────────── CHAT (Support Circle \u2014 chat bubbles) ───────────── */
  if (type === "chat") {
    const bubbles = [
      { x: 16, y: 22, w: 110, h: 22, side: "L", delay: 0 },
      { x: 154, y: 56, w: 110, h: 22, side: "R", delay: 0.18 },
      { x: 16, y: 90, w: 86, h: 22, side: "L", delay: 0.36 },
    ];
    return (
      <svg viewBox="0 0 280 140" className="w-full h-full">
        {bubbles.map((b, i) => (
          <g key={i}>
            <motion.rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="11"
              fill={b.side === "L" ? `${accentColor}22` : `${accentColor}55`}
              stroke={accentColor}
              strokeOpacity="0.5"
              strokeWidth="1"
              initial={{ opacity: 0, x: b.x + (b.side === "L" ? -10 : 10) }}
              animate={{ opacity: 1, x: b.x }}
              transition={{ duration: 0.5, delay: b.delay, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Three "text" lines inside each bubble */}
            {[0, 1, 2].map((k) => {
              const lineY = b.y + 7 + k * 4;
              const lineW =
                k === 2
                  ? b.w * 0.45
                  : k === 1
                  ? b.w * 0.7
                  : b.w * 0.85;
              return (
                <motion.rect
                  key={k}
                  x={b.x + 8}
                  y={lineY}
                  width={lineW - 16}
                  height="2"
                  rx="1"
                  fill={accentColor}
                  fillOpacity="0.6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: b.delay + 0.25 + k * 0.08 }}
                />
              );
            })}
          </g>
        ))}
        {/* Typing indicator on the right */}
        <g transform="translate(184, 110)">
          <rect
            width="48"
            height="16"
            rx="8"
            fill={`${accentColor}22`}
            stroke={accentColor}
            strokeOpacity="0.4"
          />
          {[0, 1, 2].map((d) => (
            <motion.circle
              key={d}
              cx={12 + d * 12}
              cy={8}
              r="2.2"
              fill={accentColor}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: d * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>
    );
  }

  return null;
}
