"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const NODES = [
  { id: "sources", x: 80, y: 70, w: 130, h: 56, label: "1,192 Policy\nDocuments", sub: "raw" },
  { id: "chunking", x: 290, y: 70, w: 150, h: 56, label: "Chunking Engine", sub: "25,565 chunks" },
  { id: "vector", x: 290, y: 170, w: 150, h: 56, label: "Vector Store", sub: "FAISS + BM25" },
  { id: "query", x: 80, y: 270, w: 130, h: 56, label: "User Query", sub: "input" },
  { id: "retrieval", x: 290, y: 270, w: 150, h: 56, label: "Hybrid Retrieval", sub: "dense + lexical" },
  { id: "verify", x: 290, y: 370, w: 150, h: 56, label: "Multi-tier LLM\nVerification", sub: "fact check" },
  { id: "output", x: 290, y: 470, w: 150, h: 56, label: "Structured Response\n+ Citations", sub: "output" },
];

const EDGES = [
  { from: "sources", to: "chunking" },
  { from: "chunking", to: "vector" },
  { from: "query", to: "retrieval" },
  { from: "vector", to: "retrieval" },
  { from: "retrieval", to: "verify" },
  { from: "verify", to: "output" },
];

function nodeCenter(n) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}

export default function DapseDiagram() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 520 560"
        className="w-full h-auto min-w-[480px]"
        style={{ maxWidth: "560px" }}
      >
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map((e, i) => {
          const a = NODES.find((n) => n.id === e.from);
          const b = NODES.find((n) => n.id === e.to);
          const ac = nodeCenter(a);
          const bc = nodeCenter(b);
          return (
            <g key={i}>
              <line
                x1={ac.cx}
                y1={a.y + a.h}
                x2={bc.cx}
                y2={b.y}
                stroke="url(#edge-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                style={{
                  animation: `dash-flow ${3 + i * 0.3}s linear infinite`,
                }}
              />
              {/* Animated particle */}
              <motion.circle
                r="3"
                fill="#3b82f6"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [ac.cx, bc.cx],
                  cy: [a.y + a.h, b.y],
                  opacity: [0, 1, 1, 0],
                }}
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

        {/* Nodes */}
        {NODES.map((n) => (
          <g
            key={n.id}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <motion.rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="8"
              fill="rgba(255,255,255,0.04)"
              stroke={hovered === n.id ? "#3b82f6" : "rgba(255,255,255,0.12)"}
              strokeWidth="1"
              animate={{
                scale: hovered === n.id ? 1.03 : 1,
                filter: hovered === n.id ? "drop-shadow(0 0 12px rgba(59,130,246,0.4))" : "none",
              }}
              style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
              transition={{ duration: 0.2 }}
            />
            {n.label.split("\n").map((line, i, arr) => (
              <text
                key={i}
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 + (i - (arr.length - 1) / 2) * 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e2e8f0"
                fontSize="11"
                fontFamily="var(--font-mono)"
                style={{ letterSpacing: "0.04em" }}
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        <style>{`
          @keyframes dash-flow { to { stroke-dashoffset: -16; } }
        `}</style>
      </svg>
    </div>
  );
}
