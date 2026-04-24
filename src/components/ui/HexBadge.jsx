"use client";
import { motion } from "framer-motion";

/**
 * Premium AWS-shield inspired hex badge (modelled on the real AWS Certified
 * badge artwork). Uses a rich tier gradient fill, orange "aws certified"
 * mark at top, bold name, and a tier banner at the bottom.
 */
export default function HexBadge({
  name,
  subtitle,
  tier,
  accent = "#60a5fa",
  earlyAdopter = false,
  size = 180,
  className = "",
}) {
  // Shield proportions — match the AWS badge ratio (hex pointing up/down)
  const W = size;
  const H = size * 1.14;
  const uid = `${tier}-${subtitle}-${name}`.replace(/\W+/g, "-");

  // Hex vertices (flat-left-right, points top/bottom)
  const pts = [
    [W / 2, 6],
    [W - 8, H * 0.27],
    [W - 8, H * 0.73],
    [W / 2, H - 6],
    [8, H * 0.73],
    [8, H * 0.27],
  ]
    .map((p) => p.join(","))
    .join(" ");

  const innerPts = [
    [W / 2, 16],
    [W - 18, H * 0.29],
    [W - 18, H * 0.71],
    [W / 2, H - 16],
    [18, H * 0.71],
    [18, H * 0.29],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className={`block ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Deep tier gradient — the filled shield body */}
        <linearGradient id={`hex-body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
        {/* Dark navy overlay so text reads cleanly (mirrors real AWS badge) */}
        <linearGradient id={`hex-overlay-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.6" />
        </linearGradient>
        {/* Bright border ring */}
        <linearGradient id={`hex-ring-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.5" />
        </linearGradient>
        {/* Top sheen */}
        <linearGradient id={`hex-sheen-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter
          id={`hex-glow-${uid}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Outer glow (appears on hover) */}
      <motion.polygon
        points={pts}
        fill={accent}
        filter={`url(#hex-glow-${uid})`}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.55 },
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Body — rich gradient */}
      <polygon points={pts} fill={`url(#hex-body-${uid})`} />
      {/* Dark overlay for contrast */}
      <polygon points={pts} fill={`url(#hex-overlay-${uid})`} />
      {/* Top sheen (upper half only) */}
      <clipPath id={`hex-clip-${uid}`}>
        <polygon points={pts} />
      </clipPath>
      <rect
        x="0"
        y="0"
        width={W}
        height={H * 0.5}
        fill={`url(#hex-sheen-${uid})`}
        clipPath={`url(#hex-clip-${uid})`}
      />

      {/* Bright border */}
      <polygon
        points={pts}
        fill="none"
        stroke={`url(#hex-ring-${uid})`}
        strokeWidth="2"
      />
      {/* Subtle inner hex */}
      <polygon
        points={innerPts}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1"
      />

      {/* AWS CERTIFIED mark (top) — uses the real AWS orange */}
      <g transform={`translate(${W / 2}, ${H * 0.2})`}>
        <text
          textAnchor="middle"
          fill="#ffffff"
          fontSize={size * 0.085}
          fontFamily="var(--font-sans), Inter, sans-serif"
          fontWeight="700"
          letterSpacing="0.02em"
        >
          aws
        </text>
        {/* Orange check badge, positioned to the right of "aws" text */}
        <g transform={`translate(${size * 0.09}, -${size * 0.028})`}>
          <polygon
            points={(() => {
              const r = size * 0.036;
              const cx = 0,
                cy = 0;
              // Hexagon vertices
              const vs = [];
              for (let k = 0; k < 6; k++) {
                const a = (Math.PI / 3) * k - Math.PI / 2;
                vs.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
              }
              return vs.join(" ");
            })()}
            fill="#ff9900"
          />
          <path
            d={`M ${-size * 0.016} 0 L ${-size * 0.005} ${size * 0.011} L ${size * 0.018} ${-size * 0.012}`}
            stroke="#ffffff"
            strokeWidth={size * 0.009}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        {/* "certified" text */}
        <text
          textAnchor="middle"
          y={size * 0.052}
          fill="#e2e8f0"
          fontSize={size * 0.055}
          fontFamily="var(--font-sans), Inter, sans-serif"
          fontWeight="400"
          letterSpacing="0.01em"
        >
          certified
        </text>
      </g>

      {/* Horizontal divider */}
      <line
        x1={W * 0.22}
        y1={H * 0.4}
        x2={W * 0.78}
        y2={H * 0.4}
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      {/* Name — the cert's short name, big and bold */}
      <foreignObject
        x={W * 0.08}
        y={H * 0.43}
        width={W * 0.84}
        height={H * 0.28}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontFamily: "var(--font-sans), Inter, sans-serif",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            fontSize: `${size * 0.11}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {name}
        </div>
      </foreignObject>

      {/* Tier banner */}
      <g>
        <rect
          x={W * 0.18}
          y={H * 0.74}
          width={W * 0.64}
          height={H * 0.07}
          rx={2}
          fill="#ffffff"
          fillOpacity="0.12"
        />
        <text
          textAnchor="middle"
          x={W / 2}
          y={H * 0.79}
          fill="#ffffff"
          fontSize={size * 0.058}
          fontFamily="var(--font-sans), Inter, sans-serif"
          fontWeight="700"
          letterSpacing="0.28em"
        >
          {subtitle?.toUpperCase()}
        </text>
      </g>

      {/* Early adopter ribbon */}
      {earlyAdopter && (
        <g>
          <path
            d={`M ${W * 0.15} ${H * 0.85}
                L ${W * 0.85} ${H * 0.85}
                L ${W * 0.78} ${H * 0.93}
                L ${W * 0.85} ${H - 2}
                L ${W * 0.15} ${H - 2}
                L ${W * 0.22} ${H * 0.93}
                Z`}
            fill="#f59e0b"
          />
          <text
            textAnchor="middle"
            x={W / 2}
            y={H * 0.955}
            fill="#1a1a0a"
            fontSize={size * 0.052}
            fontFamily="var(--font-sans), Inter, sans-serif"
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
