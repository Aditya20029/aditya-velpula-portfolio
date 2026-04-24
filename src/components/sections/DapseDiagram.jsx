"use client";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Vertical pipeline, single spine.
 * Sizes chosen so the widest label ("Structured Response + Citations")
 * fits inside the node without clipping, and so User Query sits on the
 * same baseline as Hybrid Retrieval — giving a straight horizontal
 * connector, no diagonal, no crossing lines.
 *
 * viewBox = 520 × 620
 *   spine column: x ∈ [200, 480]   (W_NODE = 280)
 *   query column: x ∈ [20, 190]    (W_QUERY = 170)
 */
const VB_W = 520;
const VB_H = 620;
const SPINE_X = 200;
const W_NODE = 280;
const H_NODE = 58;

const SPINE = [
  { id: "sources", y: 20, label: "1,192 Policy Documents", sub: "raw input" },
  { id: "chunking", y: 110, label: "Chunking Engine", sub: "25,565 chunks" },
  { id: "vector", y: 200, label: "Vector Store", sub: "FAISS + BM25" },
  { id: "retrieval", y: 310, label: "Hybrid Retrieval", sub: "dense + lexical" },
  { id: "verify", y: 420, label: "Multi-tier LLM Verification", sub: "fact check" },
  { id: "output", y: 530, label: "Structured Response + Citations", sub: "output" },
];

const QUERY = {
  id: "query",
  x: 20,
  y: 310,
  w: 170,
  h: H_NODE,
  label: "User Query",
  sub: "input",
};

const byId = (id) => SPINE.find((n) => n.id === id);

// Consecutive vertical edges
const EDGES = [
  ["sources", "chunking"],
  ["chunking", "vector"],
  ["vector", "retrieval"],
  ["retrieval", "verify"],
  ["verify", "output"],
];

function NodeBox({ x, y, w, h, label, sub, id, hovered, setHovered }) {
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: "pointer" }}
    >
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill="rgba(255,255,255,0.05)"
        stroke={hovered === id ? "#3b82f6" : "rgba(255,255,255,0.14)"}
        strokeWidth="1"
        animate={{
          scale: hovered === id ? 1.03 : 1,
          filter:
            hovered === id
              ? "drop-shadow(0 0 14px rgba(59,130,246,0.5))"
              : "drop-shadow(0 0 0 rgba(0,0,0,0))",
        }}
        style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
        transition={{ duration: 0.25 }}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 3}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#f1f5f9"
        fontSize="13"
        fontFamily="var(--font-sans), Inter, sans-serif"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 13}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.14em"
      >
        {sub?.toUpperCase()}
      </text>
    </g>
  );
}

export default function DapseDiagram() {
  const [hovered, setHovered] = useState(null);
  const spineCenterX = SPINE_X + W_NODE / 2;

  return (
    <div className="w-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto"
        style={{ maxWidth: "520px", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="dot-glow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrow-head"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
          </marker>
        </defs>

        {/* Vertical spine edges */}
        {EDGES.map(([fromId, toId], i) => {
          const a = byId(fromId);
          const b = byId(toId);
          const y1 = a.y + H_NODE;
          const y2 = b.y;
          return (
            <g key={i}>
              <line
                x1={spineCenterX}
                y1={y1}
                x2={spineCenterX}
                y2={y2}
                stroke="url(#spine-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                style={{
                  animation: `dash-flow ${3 + i * 0.3}s linear infinite`,
                }}
              />
              <motion.circle
                r="3"
                fill="#3b82f6"
                cx={spineCenterX}
                initial={{ opacity: 0 }}
                animate={{
                  cy: [y1, y2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: "easeInOut",
                }}
                style={{ filter: "url(#dot-glow)" }}
              />
            </g>
          );
        })}

        {/* User Query → Hybrid Retrieval — straight horizontal arrow */}
        {(() => {
          const retrieval = byId("retrieval");
          const startX = QUERY.x + QUERY.w;
          const endX = SPINE_X;
          const y = QUERY.y + QUERY.h / 2;
          return (
            <g>
              <line
                x1={startX}
                y1={y}
                x2={endX - 4}
                y2={y}
                stroke="#06b6d4"
                strokeOpacity="0.75"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                markerEnd="url(#arrow-head)"
                style={{ animation: "dash-flow 3s linear infinite" }}
              />
              <motion.circle
                r="3"
                fill="#06b6d4"
                cy={y}
                initial={{ opacity: 0 }}
                animate={{
                  cx: [startX, endX],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
                style={{ filter: "url(#dot-glow)" }}
              />
            </g>
          );
        })()}

        {/* Spine nodes */}
        {SPINE.map((n) => (
          <NodeBox
            key={n.id}
            id={n.id}
            x={SPINE_X}
            y={n.y}
            w={W_NODE}
            h={H_NODE}
            label={n.label}
            sub={n.sub}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}

        {/* User Query node */}
        <NodeBox
          id={QUERY.id}
          x={QUERY.x}
          y={QUERY.y}
          w={QUERY.w}
          h={QUERY.h}
          label={QUERY.label}
          sub={QUERY.sub}
          hovered={hovered}
          setHovered={setHovered}
        />

        <style>{`@keyframes dash-flow { to { stroke-dashoffset: -16; } }`}</style>
      </svg>
    </div>
  );
}
