"use client";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Clean single-column pipeline with one lateral "User Query" input.
 * No crossing lines, no dead space — every node sits on the main spine.
 *
 * Coordinates (viewBox 440 x 620):
 *   Spine x = 260
 *   User Query tucks in at x = 60, connects horizontally into Hybrid Retrieval
 */
const SPINE_X = 260;
const W_NODE = 200;
const H_NODE = 52;

const NODES = [
  { id: "sources", y: 40, label: "1,192 Policy Documents", sub: "raw input" },
  { id: "chunking", y: 130, label: "Chunking Engine", sub: "25,565 chunks" },
  { id: "vector", y: 220, label: "Vector Store", sub: "FAISS + BM25" },
  { id: "retrieval", y: 320, label: "Hybrid Retrieval", sub: "dense + lexical" },
  { id: "verify", y: 430, label: "Multi-tier LLM Verification", sub: "fact check" },
  { id: "output", y: 540, label: "Structured Response + Citations", sub: "output" },
];

// Straight vertical edges between consecutive nodes
const EDGES = [
  { from: "sources", to: "chunking" },
  { from: "chunking", to: "vector" },
  { from: "vector", to: "retrieval" },
  { from: "retrieval", to: "verify" },
  { from: "verify", to: "output" },
];

// User Query node — tucked at the left, elbow-connects into retrieval
const QUERY_NODE = {
  x: 30,
  y: 320,
  w: 140,
  h: H_NODE,
  label: "User Query",
  sub: "input",
};

function NodeRect({ x, y, w, h, node, hovered, setHovered }) {
  return (
    <g
      onMouseEnter={() => setHovered(node.id)}
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
        stroke={hovered === node.id ? "#3b82f6" : "rgba(255,255,255,0.14)"}
        strokeWidth="1"
        animate={{
          scale: hovered === node.id ? 1.03 : 1,
          filter:
            hovered === node.id
              ? "drop-shadow(0 0 14px rgba(59,130,246,0.5))"
              : "drop-shadow(0 0 0 rgba(0,0,0,0))",
        }}
        style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
        transition={{ duration: 0.25 }}
      />
      {/* Main label */}
      <text
        x={x + w / 2}
        y={y + h / 2 - 3}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#f1f5f9"
        fontSize="12"
        fontFamily="var(--font-sans), Inter, sans-serif"
        fontWeight="600"
      >
        {node.label}
      </text>
      {/* Sub label */}
      <text
        x={x + w / 2}
        y={y + h / 2 + 12}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.1em"
      >
        {node.sub?.toUpperCase()}
      </text>
    </g>
  );
}

export default function DapseDiagram() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full overflow-visible">
      <svg
        viewBox="0 0 440 600"
        className="w-full h-auto"
        style={{ maxWidth: "520px" }}
      >
        <defs>
          <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vertical spine edges */}
        {EDGES.map((e, i) => {
          const a = NODES.find((n) => n.id === e.from);
          const b = NODES.find((n) => n.id === e.to);
          const x = SPINE_X + W_NODE / 2;
          const y1 = a.y + H_NODE;
          const y2 = b.y;
          return (
            <g key={i}>
              <line
                x1={x}
                y1={y1}
                x2={x}
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
                initial={{ opacity: 0 }}
                animate={{
                  cy: [y1, y2],
                  opacity: [0, 1, 1, 0],
                }}
                cx={x}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
                style={{ filter: "url(#glow)" }}
              />
            </g>
          );
        })}

        {/* Query elbow: from User Query box → bend → enter Retrieval from left */}
        {(() => {
          const startX = QUERY_NODE.x + QUERY_NODE.w;
          const startY = QUERY_NODE.y + QUERY_NODE.h / 2;
          const retrieval = NODES.find((n) => n.id === "retrieval");
          const endX = SPINE_X;
          const endY = retrieval.y + retrieval.h / 2;
          const path = `M ${startX} ${startY} L ${startX + 40} ${startY} Q ${startX + 60} ${startY} ${startX + 60} ${startY + 0} L ${endX} ${endY}`;
          return (
            <g>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="url(#spine-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                style={{ animation: "dash-flow 3s linear infinite" }}
              />
              <motion.circle
                r="3"
                fill="#06b6d4"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [startX, endX],
                  cy: [startY, endY],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
                style={{ filter: "url(#glow)" }}
              />
            </g>
          );
        })()}

        {/* Main spine nodes */}
        {NODES.map((n) => (
          <NodeRect
            key={n.id}
            x={SPINE_X}
            y={n.y}
            w={W_NODE}
            h={H_NODE}
            node={n}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}

        {/* User Query node */}
        <NodeRect
          x={QUERY_NODE.x}
          y={QUERY_NODE.y}
          w={QUERY_NODE.w}
          h={QUERY_NODE.h}
          node={{ ...QUERY_NODE, id: "query" }}
          hovered={hovered}
          setHovered={setHovered}
        />

        <style>{`@keyframes dash-flow { to { stroke-dashoffset: -16; } }`}</style>
      </svg>
    </div>
  );
}
