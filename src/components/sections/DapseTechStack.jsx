"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Zap,
  Box,
  Database,
  Search,
  Brain,
  Cloud,
  Layers,
  Server,
  Cpu,
  Sparkles,
  Network,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

/* Each tech enriched with its concrete role in the DAPSE system */
const STACK = [
  {
    group: "intelligence",
    groupLabel: "Intelligence Layer",
    groupColor: "139, 92, 246",
    items: [
      {
        name: "OpenAI",
        role: "GPT-4 embeddings & generation",
        detail: "Dense vectors + reasoning over policy text",
        icon: Sparkles,
      },
      {
        name: "LangChain",
        role: "Agent orchestration",
        detail: "Routes query through retrieval → verification → answer",
        icon: Brain,
      },
      {
        name: "FAISS",
        role: "Dense vector store",
        detail: "Similarity search over 25,565 embedded chunks",
        icon: Network,
      },
      {
        name: "BM25",
        role: "Sparse lexical retrieval",
        detail: "Keyword scoring fused with dense hits",
        icon: Search,
      },
      {
        name: "Pinecone",
        role: "Managed vector index",
        detail: "Production-grade hosted embeddings",
        icon: Database,
      },
    ],
  },
  {
    group: "runtime",
    groupLabel: "Language & Runtime",
    groupColor: "59, 130, 246",
    items: [
      {
        name: "Python",
        role: "Primary language",
        detail: "All pipelines, API layer, data processing",
        icon: Code2,
      },
      {
        name: "FastAPI",
        role: "Query API",
        detail: "Async endpoints serving JAG analyst requests",
        icon: Zap,
      },
      {
        name: "Docker",
        role: "Containerization",
        detail: "Reproducible deployments across environments",
        icon: Box,
      },
    ],
  },
  {
    group: "cloud",
    groupLabel: "Cloud & Infrastructure",
    groupColor: "6, 182, 212",
    items: [
      {
        name: "AWS",
        role: "Hosting & storage",
        detail: "S3 for source docs · EC2 for inference",
        icon: Cloud,
      },
    ],
  },
];

const TOTAL_SERVICES = STACK.reduce((a, g) => a + g.items.length, 0);
const PIPELINE_STAGES = 6;
const LAYER_COUNT = STACK.length;

function TechCard({ item, color, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative glass-card p-5 overflow-hidden"
      style={{ borderColor: `rgba(${color}, 0.15)` }}
      data-cursor
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${color}, 0.35), transparent 70%)`,
        }}
      />

      {/* Shimmer on hover */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
          animation: "shimmer 1s ease-out",
        }}
      />

      <div className="relative z-10 flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `rgba(${color}, 0.12)`,
            color: `rgb(${color})`,
            border: `1px solid rgba(${color}, 0.25)`,
          }}
        >
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <div className="t-h3 text-[var(--text-primary)] leading-tight">
            {item.name}
          </div>
          <div
            className="t-mono-sm mt-0.5"
            style={{ color: `rgb(${color})` }}
          >
            {item.role}
          </div>
        </div>

        {/* Status dot */}
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          className="w-1.5 h-1.5 rounded-full ml-auto shrink-0 mt-3"
          style={{ background: `rgb(${color})` }}
        />
      </div>

      <p className="relative z-10 t-body-sm text-[var(--text-secondary)] leading-relaxed">
        {item.detail}
      </p>
    </motion.div>
  );
}

export default function DapseTechStack() {
  return (
    <div className="flex flex-col gap-10">
      {/* Stack Summary Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative glass-card p-6 md:p-8 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 10% 0%, rgba(59,130,246,0.18), transparent 50%), radial-gradient(ellipse at 90% 100%, rgba(139,92,246,0.15), transparent 50%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="t-mono-sm text-[var(--accent-secondary)] mb-2">
              THE STACK
            </div>
            <h4 className="t-h2 text-[var(--text-primary)] leading-tight max-w-xl">
              9 specialised services orchestrated for{" "}
              <span className="text-gradient">intelligent retrieval at scale</span>
            </h4>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 shrink-0">
            {[
              { label: "Services", value: TOTAL_SERVICES, icon: Server },
              { label: "Layers", value: LAYER_COUNT, icon: Layers },
              { label: "Stages", value: PIPELINE_STAGES, icon: Cpu },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-start md:items-center gap-1 px-4 py-3 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-subtle)] min-w-[90px]"
                >
                  <div className="flex items-center gap-1.5 text-[var(--accent-primary)]">
                    <Icon size={12} />
                    <span className="t-mono-sm text-[var(--text-muted)]">
                      {s.label}
                    </span>
                  </div>
                  <div className="t-counter text-[var(--text-primary)] leading-none">
                    <AnimatedCounter value={s.value} duration={1600} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Grouped tech cards */}
      {STACK.map((group, gi) => (
        <div key={group.group}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + gi * 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div
              className="w-8 h-px"
              style={{
                background: `linear-gradient(to right, rgb(${group.groupColor}), transparent)`,
              }}
            />
            <span
              className="t-mono"
              style={{ color: `rgb(${group.groupColor})` }}
            >
              {group.groupLabel}
            </span>
            <span className="t-mono-sm text-[var(--text-muted)]">
              {String(group.items.length).padStart(2, "0")} services
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--border-subtle)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.items.map((item, i) => (
              <TechCard
                key={item.name}
                item={item}
                color={group.groupColor}
                index={i}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="t-mono-sm text-[var(--text-muted)] text-center pt-4"
      >
        Every service in production. Every query goes through all of them.
      </motion.div>
    </div>
  );
}
