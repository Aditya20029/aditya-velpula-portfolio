"use client";
import { motion } from "framer-motion";

/* AWS-shield style hex badge — SVG, tier-aware, auto-glows */
export default function HexBadge({
  name,
  subtitle,
  tier,
  accent = "#60a5fa",
  gradient,
  earlyAdopter = false,
  size = 180,
  className = "",
}) {
  // Hex path pointing up-down flat sides
  const H = size;
  const W = size * 0.92;
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <defs>
        <linearGradient id={`hex-fill-${name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id={`hex-border-${name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.4" />
        </linearGradient>
        <filter id={`hex-glow-${name}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer hex */}
      <motion.polygon
        points={`${W / 2},4 ${W - 6},${H * 0.27} ${W - 6},${H * 0.73} ${W / 2},${H - 4} 6,${H * 0.73} 6,${H * 0.27}`}
        fill={`url(#hex-fill-${name})`}
        stroke={`url(#hex-border-${name})`}
        strokeWidth="1.5"
        variants={{
          rest: { filter: "drop-shadow(0 0 0px rgba(0,0,0,0))" },
          hover: { filter: `drop-shadow(0 0 20px ${accent}99)` },
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Inner hex (decorative) */}
      <polygon
        points={`${W / 2},14 ${W - 16},${H * 0.29} ${W - 16},${H * 0.71} ${W / 2},${H - 14} 16,${H * 0.71} 16,${H * 0.29}`}
        fill="none"
        stroke={accent}
        strokeOpacity="0.15"
        strokeWidth="1"
      />

      {/* AWS-CERTIFIED label */}
      <g transform={`translate(${W / 2}, ${H * 0.22})`}>
        <text
          textAnchor="middle"
          fill={accent}
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          AWS · CERTIFIED
        </text>
        {/* AWS check badge (stylized) */}
        <g transform="translate(0, 8)">
          <circle r="3" fill={accent} />
          <path
            d="M -1.2 0 L -0.3 1 L 1.4 -0.8"
            stroke="#0a0a12"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Name */}
      <foreignObject x="8" y={H * 0.35} width={W - 16} height={H * 0.35}>
        <div
          style={{
            textAlign: "center",
            color: "#f1f5f9",
            fontFamily: "var(--font-sans), Inter, sans-serif",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            fontSize: `${size * 0.085}px`,
          }}
        >
          {name}
        </div>
      </foreignObject>

      {/* Tier strip */}
      <g transform={`translate(${W / 2}, ${H * 0.82})`}>
        <rect
          x={-W * 0.35}
          y={-8}
          width={W * 0.7}
          height={16}
          rx={3}
          fill={accent}
          fillOpacity="0.15"
        />
        <text
          textAnchor="middle"
          y={4}
          fill={accent}
          fontSize="8"
          fontFamily="var(--font-mono), monospace"
          fontWeight="700"
          letterSpacing="0.24em"
        >
          {subtitle?.toUpperCase()}
        </text>
      </g>

      {/* Early adopter ribbon */}
      {earlyAdopter && (
        <g transform={`translate(${W / 2}, ${H - 2})`}>
          <rect
            x={-W * 0.32}
            y={-4}
            width={W * 0.64}
            height={10}
            rx={2}
            fill="#f59e0b"
          />
          <text
            textAnchor="middle"
            y={3}
            fill="#0a0a12"
            fontSize="6.5"
            fontFamily="var(--font-mono), monospace"
            fontWeight="800"
            letterSpacing="0.22em"
          >
            EARLY ADOPTER
          </text>
        </g>
      )}
    </motion.svg>
  );
}
