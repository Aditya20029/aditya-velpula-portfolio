"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

/**
 * Vertical pipeline, single spine. Theme-aware: dark fill on dark mode,
 * crisp white card fill on light mode so the labels read clearly against
 * either body.
 */
const VB_W = 520;
const VB_H = 620;
const SPINE_X = 200;
const W_NODE = 280;
const H_NODE = 58;

const SPINE = [
  { id: "sources", y: 20, label: "1,630 Policy Documents", sub: "raw input · 21 countries" },
  { id: "chunking", y: 110, label: "Chunking Engine", sub: "257K chunks · 25,634 objectives" },
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

const EDGES = [
  ["sources", "chunking"],
  ["chunking", "vector"],
  ["vector", "retrieval"],
  ["retrieval", "verify"],
  ["verify", "output"],
];

/* Theme palette */
function useDiagramPalette() {
  const { theme } = useTheme();
  if (theme === "light") {
    return {
      nodeFill: "#ffffff",
      nodeStroke: "rgba(15, 23, 42, 0.16)",
      nodeStrokeHover: "#1d4ed8",      // electric blue
      labelColor: "#0b1220",            // deep navy
      subColor: "#475569",              // slate
      hoverShadow: "drop-shadow(0 0 14px rgba(29, 78, 216, 0.45))",
      // Spine: blue → purple → magenta jewel
      spine: [
        { offset: "0%", color: "#0e7490", op: "0.85" },
        { offset: "50%", color: "#1d4ed8", op: "0.95" },
        { offset: "100%", color: "#6d28d9", op: "0.85" },
      ],
      dotColor: "#1d4ed8",
      arrowColor: "#0e7490",
      arrowOp: "0.95",
      queryDotColor: "#0e7490",
    };
  }
  // dark
  return {
    nodeFill: "rgba(255, 255, 255, 0.05)",
    nodeStroke: "rgba(255, 255, 255, 0.14)",
    nodeStrokeHover: "#7cd4ff",
    labelColor: "#f1f5f9",
    subColor: "#94a3b8",
    hoverShadow: "drop-shadow(0 0 14px rgba(124, 212, 255, 0.55))",
    spine: [
      { offset: "0%", color: "#06b6d4", op: "0.8" },
      { offset: "50%", color: "#3b82f6", op: "0.9" },
      { offset: "100%", color: "#8b5cf6", op: "0.8" },
    ],
    dotColor: "#7cd4ff",
    arrowColor: "#06b6d4",
    arrowOp: "0.75",
    queryDotColor: "#06b6d4",
  };
}

function NodeBox({ x, y, w, h, label, sub, id, hovered, setHovered, palette }) {
  const isHover = hovered === id;
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
        fill={palette.nodeFill}
        stroke={isHover ? palette.nodeStrokeHover : palette.nodeStroke}
        strokeWidth={isHover ? 1.5 : 1}
        animate={{
          scale: isHover ? 1.03 : 1,
          filter: isHover
            ? palette.hoverShadow
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
        fill={palette.labelColor}
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
        fill={palette.subColor}
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
  const palette = useDiagramPalette();
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
            {palette.spine.map((s) => (
              <stop
                key={s.offset}
                offset={s.offset}
                stopColor={s.color}
                stopOpacity={s.op}
              />
            ))}
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
            <path d="M 0 0 L 10 5 L 0 10 z" fill={palette.arrowColor} />
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
                fill={palette.dotColor}
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

        {/* User Query → Hybrid Retrieval */}
        {(() => {
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
                stroke={palette.arrowColor}
                strokeOpacity={palette.arrowOp}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                markerEnd="url(#arrow-head)"
                style={{ animation: "dash-flow 3s linear infinite" }}
              />
              <motion.circle
                r="3"
                fill={palette.queryDotColor}
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
            palette={palette}
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
          palette={palette}
        />

        <style>{`@keyframes dash-flow { to { stroke-dashoffset: -16; } }`}</style>
      </svg>
    </div>
  );
}
