"use client";
import { motion } from "framer-motion";

/**
 * Faithful re-creation of the official AWS Certified badge artwork.
 * Geometry is normalised against `size` and tier banner has explicit
 * vertical padding so labels never clip.
 *
 * GenAI Developer Pro is rendered in the cyan/teal palette (matches the
 * 'EARLY ADOPTER' ribbon colour). Other tiers use the standard AWS-blue
 * gradients sampled from the official artwork.
 */
export default function HexBadge({
  name,
  subtitle,
  tier = "associate",
  earlyAdopter = false,
  size = 200,
  className = "",
}) {
  // Tier visual identity. Note: 'professional' is now cyan-blue to match
  // the Early Adopter ribbon on the GenAI Developer Pro badge.
  const palette = {
    professional: {
      top: "#1FA8C9",     // bright cyan-teal
      bottom: "#0E5E78",  // deep teal
      ring: "#7BE0F2",
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
      bottom: "#0F172A",
      ring: "#3FB39B",
      tier: "ACADEMY GRADUATE",
    },
  };
  const p = palette[tier] || palette.associate;
  const tierLabel = subtitle?.toUpperCase() || p.tier;

  // Canvas dimensions — H gives extra room when ribbon is present
  const W = size;
  const H = size * 1.18;
  const ribbonH = earlyAdopter ? size * 0.22 : 0;
  const VB_H = H + ribbonH;

  const uid = `${tier}-${name}-${size}`.replace(/\W+/g, "-");

  // Hex points — pointy top + bottom (matches official Pro/Associate art)
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

  // Vertical layout (all proportions of H)
  //   0.00     top point
  //   0.13     "aws ✓" lockup baseline
  //   0.22     "certified" baseline
  //   0.32     hairline rule above title
  //   0.44     title baseline (foreignObject anchor)
  //   0.66     hairline rule below title
  //   0.74     tier banner top
  //   0.81     tier banner mid (text)
  //   0.88     tier banner bottom
  //   1.00     bottom point
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${VB_H}`}
      width={W}
      height={VB_H}
      className={`block ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`hex-body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.top} />
          <stop offset="100%" stopColor={p.bottom} />
        </linearGradient>
        <linearGradient id={`hex-sheen-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
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

      {/* Hover glow */}
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

      {/* Border */}
      <polygon
        points={pts}
        fill="none"
        stroke={p.ring}
        strokeWidth="2.2"
        strokeOpacity="0.95"
      />

      {/* AWS lockup — single foreignObject keeps "aws ✓" + "certified"
          centered together regardless of size */}
      <foreignObject
        x={W * 0.1}
        y={H * 0.12}
        width={W * 0.8}
        height={H * 0.18}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: `${size * 0.012}px`,
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: `${size * 0.025}px`,
              lineHeight: 1,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontWeight: 700,
                fontSize: `${size * 0.115}px`,
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              aws
            </span>
            <span
              style={{
                position: "relative",
                width: `${size * 0.082}px`,
                height: `${size * 0.094}px`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 100 110"
                width="100%"
                height="100%"
                style={{ display: "block" }}
              >
                <polygon
                  points="50,2 95,28 95,82 50,108 5,82 5,28"
                  fill="#ff9900"
                />
                <path
                  d="M 30 55 L 45 70 L 72 38"
                  stroke="#ffffff"
                  strokeWidth="11"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <span
            style={{
              color: "#ffffff",
              fontFamily: "var(--font-sans), Inter, sans-serif",
              fontWeight: 400,
              fontSize: `${size * 0.07}px`,
              lineHeight: 1,
              letterSpacing: "0.005em",
            }}
          >
            certified
          </span>
        </div>
      </foreignObject>

      {/* Hairline above title */}
      <line
        x1={W * 0.18}
        y1={H * 0.35}
        x2={W * 0.82}
        y2={H * 0.35}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1"
      />

      {/* Title \u2014 width inset enough to clear the hex diagonals at this band.
          Font auto-scales by character count so long names like
          'Machine Learning Engineer' or 'Solutions Architect' fit. */}
      <foreignObject
        x={W * 0.12}
        y={H * 0.37}
        width={W * 0.76}
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
            fontSize: (() => {
              const len = (name || "").length;
              if (len > 22) return `${size * 0.078}px`;
              if (len > 16) return `${size * 0.092}px`;
              if (len > 12) return `${size * 0.105}px`;
              return `${size * 0.118}px`;
            })(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          {name}
        </div>
      </foreignObject>

      {/* Hairline below title */}
      <line
        x1={W * 0.18}
        y1={H * 0.665}
        x2={W * 0.82}
        y2={H * 0.665}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1"
      />

      {/* Tier banner \u2014 inset from edges so wide labels don't run into the
          hex diagonals; auto-shrink font + tracking based on label length. */}
      <foreignObject
        x={W * 0.1}
        y={H * 0.7}
        width={W * 0.8}
        height={H * 0.18}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            color: "#ffffff",
            fontFamily: "var(--font-sans), Inter, sans-serif",
            fontWeight: 700,
            fontSize: (() => {
              const len = tierLabel.length;
              if (len > 13) return `${size * 0.05}px`;
              if (len > 10) return `${size * 0.06}px`;
              return `${size * 0.07}px`;
            })(),
            letterSpacing: tierLabel.length > 13 ? "0.18em" : "0.28em",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {tierLabel}
        </div>
      </foreignObject>

      {/* Early Adopter ribbon — anchored INSIDE the badge so pennant tails
          don't poke out beyond the artwork. The ribbon banner sits at
          ~88% of H, pennants extend to H + ribbonH (within VB_H). */}
      {earlyAdopter && (
        <g>
          {/* Banner curved arc */}
          <path
            d={`M ${W * 0.04} ${H * 0.86}
                Q ${W * 0.5} ${H * 0.94}
                  ${W * 0.96} ${H * 0.86}
                L ${W * 0.96} ${H * 0.94}
                Q ${W * 0.5} ${H * 1.02}
                  ${W * 0.04} ${H * 0.94}
                Z`}
            fill="#127E91"
          />
          {/* Banner top highlight */}
          <path
            d={`M ${W * 0.04} ${H * 0.86}
                Q ${W * 0.5} ${H * 0.94}
                  ${W * 0.96} ${H * 0.86}
                L ${W * 0.96} ${H * 0.882}
                Q ${W * 0.5} ${H * 0.962}
                  ${W * 0.04} ${H * 0.882}
                Z`}
            fill="#1A9DB2"
          />
          {/* Banner text \u2014 inset further so EARLY ADOPTER doesn't clip
              on the curved ribbon edges. Tracking trimmed to 0.22em. */}
          <foreignObject
            x={W * 0.12}
            y={H * 0.86}
            width={W * 0.76}
            height={H * 0.13}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                color: "#ffffff",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                fontWeight: 800,
                fontSize: `${size * 0.062}px`,
                letterSpacing: "0.22em",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              EARLY ADOPTER
            </div>
          </foreignObject>

          {/* Pennant tails — within the viewBox extension */}
          <path
            d={`M ${W * 0.24} ${H * 0.96}
                L ${W * 0.24} ${H + ribbonH * 0.95}
                L ${W * 0.34} ${H + ribbonH * 0.55}
                L ${W * 0.44} ${H + ribbonH * 0.95}
                L ${W * 0.44} ${H * 0.96}
                Z`}
            fill="#127E91"
          />
          <path
            d={`M ${W * 0.56} ${H * 0.96}
                L ${W * 0.56} ${H + ribbonH * 0.95}
                L ${W * 0.66} ${H + ribbonH * 0.55}
                L ${W * 0.76} ${H + ribbonH * 0.95}
                L ${W * 0.76} ${H * 0.96}
                Z`}
            fill="#127E91"
          />
        </g>
      )}
    </motion.svg>
  );
}
