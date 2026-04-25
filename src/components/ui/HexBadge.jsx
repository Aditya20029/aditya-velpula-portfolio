"use client";
import { motion } from "framer-motion";

/**
 * Faithful re-creation of the official AWS Certified badge artwork.
 *
 * Real AWS badges are flat-color filled hexagons (pointy top + bottom for
 * Professional, flat top + bottom for Associate/Foundational) with a soft
 * vertical gradient, a thin border in a slightly different shade, the
 * "aws \u2713 / certified" mark at the top with a hairline rule under it,
 * the certification name in bold white, another hairline below, and the
 * tier label in widely-spaced uppercase. The Generative AI Developer Pro
 * badge additionally has a teal "EARLY ADOPTER" ribbon banded across
 * the lower third with two ribbon-tail pennants underneath.
 */
export default function HexBadge({
  name,
  subtitle,
  tier = "associate",
  earlyAdopter = false,
  size = 200,
  className = "",
}) {
  // Tier visual identity, sampled from the real AWS badges:
  //   - Foundational: lighter blue
  //   - Associate:    saturated AWS blue
  //   - Professional: deeper indigo with teal trim
  //   - Academy:      teal/dark
  const palette = {
    professional: {
      top: "#2D6CC0",
      bottom: "#1B3F8C",
      ring: "#79C9F2",
      tier: "PROFESSIONAL",
    },
    associate: {
      top: "#3568D4",
      bottom: "#1F40A8",
      ring: "#8FB4F2",
      tier: "ASSOCIATE",
    },
    foundational: {
      top: "#3F4C7B",
      bottom: "#222C57",
      ring: "#7E8DBF",
      tier: "FOUNDATIONAL",
    },
    academy: {
      top: "#1F2937",
      bottom: "#0f172a",
      ring: "#3FB39B",
      tier: "ACADEMY GRADUATE",
    },
  };
  const p = palette[tier] || palette.associate;
  const tierLabel = subtitle?.toUpperCase() || p.tier;

  const W = size;
  const H = size * 1.16;
  const uid = `${tier}-${name}-${size}`.replace(/\W+/g, "-");

  // Shape geometry
  // Professional / Associate / Foundational: pointy top + bottom (typical AWS hex)
  // Hex points (W-wide, H-tall, pointy top/bottom):
  //   top:    (W/2, 0)
  //   tr:     (W,   H*0.27)
  //   br:     (W,   H*0.73)
  //   bottom: (W/2, H)
  //   bl:     (0,   H*0.73)
  //   tl:     (0,   H*0.27)
  const pts = [
    [W / 2, 4],
    [W - 4, H * 0.275],
    [W - 4, H * 0.725],
    [W / 2, H - 4],
    [4, H * 0.725],
    [4, H * 0.275],
  ]
    .map((pt) => pt.join(","))
    .join(" ");

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H + (earlyAdopter ? size * 0.18 : 0)}`}
      width={W}
      height={H + (earlyAdopter ? size * 0.18 : 0)}
      className={`block ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Body gradient (top -> bottom) */}
        <linearGradient id={`hex-body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.top} />
          <stop offset="100%" stopColor={p.bottom} />
        </linearGradient>
        {/* Subtle inner highlight on top half */}
        <linearGradient id={`hex-sheen-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Outer glow on hover */}
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

      {/* Outer glow (hover only) */}
      <motion.polygon
        points={pts}
        fill={p.ring}
        filter={`url(#hex-glow-${uid})`}
        variants={{ rest: { opacity: 0 }, hover: { opacity: 0.55 } }}
        transition={{ duration: 0.45 }}
      />

      {/* Body */}
      <polygon points={pts} fill={`url(#hex-body-${uid})`} />
      {/* Sheen */}
      <clipPath id={`hex-clip-${uid}`}>
        <polygon points={pts} />
      </clipPath>
      <rect
        x="0"
        y="0"
        width={W}
        height={H * 0.55}
        fill={`url(#hex-sheen-${uid})`}
        clipPath={`url(#hex-clip-${uid})`}
      />

      {/* Border ring */}
      <polygon
        points={pts}
        fill="none"
        stroke={p.ring}
        strokeWidth="2.2"
        strokeOpacity="0.95"
      />

      {/* AWS mark — "aws" + orange hex check, then "certified" beneath */}
      <g transform={`translate(${W / 2}, ${H * 0.2})`}>
        <text
          textAnchor="middle"
          fill="#ffffff"
          fontSize={size * 0.1}
          fontFamily="var(--font-sans), Inter, sans-serif"
          fontWeight="700"
          letterSpacing="-0.01em"
        >
          aws
        </text>
        {/* Orange hexagonal check, sits to the right of "aws" */}
        <g transform={`translate(${size * 0.1}, -${size * 0.03})`}>
          <polygon
            points={(() => {
              const r = size * 0.038;
              const vs = [];
              for (let k = 0; k < 6; k++) {
                const a = (Math.PI / 3) * k - Math.PI / 2;
                vs.push(
                  `${r * Math.cos(a)},${r * Math.sin(a)}`
                );
              }
              return vs.join(" ");
            })()}
            fill="#ff9900"
          />
          <path
            d={`M ${-size * 0.018} ${size * 0.001}
                L ${-size * 0.005} ${size * 0.014}
                L ${size * 0.022} ${-size * 0.014}`}
            stroke="#ffffff"
            strokeWidth={size * 0.0095}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          textAnchor="middle"
          y={size * 0.06}
          fill="#ffffff"
          fontSize={size * 0.062}
          fontFamily="var(--font-sans), Inter, sans-serif"
          fontWeight="400"
        >
          certified
        </text>
      </g>

      {/* Hairline rule above the title */}
      <line
        x1={W * 0.18}
        y1={H * 0.36}
        x2={W * 0.82}
        y2={H * 0.36}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1"
      />

      {/* Title */}
      <foreignObject
        x={W * 0.06}
        y={H * 0.39}
        width={W * 0.88}
        height={H * 0.27}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontFamily: "var(--font-sans), Inter, sans-serif",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.012em",
            fontSize: `${size * 0.12}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {name}
        </div>
      </foreignObject>

      {/* Hairline rule below the title */}
      <line
        x1={W * 0.18}
        y1={H * 0.685}
        x2={W * 0.82}
        y2={H * 0.685}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1"
      />

      {/* Tier label */}
      <text
        textAnchor="middle"
        x={W / 2}
        y={H * 0.755}
        fill="#ffffff"
        fontSize={size * 0.07}
        fontFamily="var(--font-sans), Inter, sans-serif"
        fontWeight="700"
        letterSpacing="0.32em"
      >
        {tierLabel}
      </text>

      {/* Early Adopter ribbon — teal banner with two pennants */}
      {earlyAdopter && (
        <g>
          {/* Banner (slight downward arc) */}
          <path
            d={`M ${W * 0.05} ${H * 0.86}
                Q ${W * 0.5} ${H * 0.95}
                  ${W * 0.95} ${H * 0.86}
                L ${W * 0.95} ${H * 0.94}
                Q ${W * 0.5} ${H * 1.03}
                  ${W * 0.05} ${H * 0.94}
                Z`}
            fill="#127E91"
          />
          {/* Banner highlight */}
          <path
            d={`M ${W * 0.05} ${H * 0.86}
                Q ${W * 0.5} ${H * 0.95}
                  ${W * 0.95} ${H * 0.86}
                L ${W * 0.95} ${H * 0.88}
                Q ${W * 0.5} ${H * 0.97}
                  ${W * 0.05} ${H * 0.88}
                Z`}
            fill="#1A9DB2"
          />
          {/* Banner text */}
          <text
            textAnchor="middle"
            x={W / 2}
            y={H * 0.93}
            fill="#ffffff"
            fontSize={size * 0.075}
            fontFamily="var(--font-sans), Inter, sans-serif"
            fontWeight="800"
            letterSpacing="0.32em"
          >
            EARLY ADOPTER
          </text>

          {/* Left pennant tail */}
          <path
            d={`M ${W * 0.22} ${H * 0.97}
                L ${W * 0.22} ${H + size * 0.13}
                L ${W * 0.32} ${H + size * 0.05}
                L ${W * 0.42} ${H + size * 0.13}
                L ${W * 0.42} ${H * 0.97}
                Z`}
            fill="#127E91"
          />
          {/* Right pennant tail */}
          <path
            d={`M ${W * 0.58} ${H * 0.97}
                L ${W * 0.58} ${H + size * 0.13}
                L ${W * 0.68} ${H + size * 0.05}
                L ${W * 0.78} ${H + size * 0.13}
                L ${W * 0.78} ${H * 0.97}
                Z`}
            fill="#127E91"
          />
        </g>
      )}
    </motion.svg>
  );
}
