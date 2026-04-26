"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/utils/constants";

export default function CostSlider() {
  const [state, setState] = useState("after"); // "before" or "after"

  return (
    <div className="glass-card p-6 md:p-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="t-mono-sm text-[var(--text-muted)]">Cost Optimization</div>
          <div className="t-h3 text-[var(--text-primary)] mt-1">LLM Operating Cost</div>
        </div>
        <div className="flex gap-1 p-1 rounded-full bg-[var(--bg-hover)] border border-[var(--border-subtle)]">
          {["before", "after"].map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`px-4 py-2 rounded-full t-mono-sm transition-colors duration-300 ${
                state === s
                  ? "bg-[var(--bg-active)] text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-24 rounded-lg bg-[var(--bg-hover)] overflow-hidden">
        <motion.div
          animate={{
            width: state === "before" ? "100%" : "22%",
            background:
              state === "before"
                ? "linear-gradient(90deg, #ef4444, #f97316)"
                : "linear-gradient(90deg, #10b981, #06b6d4)",
          }}
          transition={{ duration: 0.8, ease: EASE.outExpo }}
          className="absolute inset-y-0 left-0 flex items-center justify-end pr-4"
        >
          <span className="t-mono text-white/90 drop-shadow">
            {state === "before" ? "$$$$" : "$"}
          </span>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="t-h3 font-bold"
            style={{
              color: "#ffffff",
              textShadow:
                "0 1px 2px rgba(0, 0, 0, 0.45), 0 0 12px rgba(0, 0, 0, 0.25)",
              letterSpacing: "-0.01em",
            }}
          >
            {state === "before" ? "Baseline" : "75–80% less"}
          </motion.span>
        </div>
      </div>

      <div className="t-body-sm text-[var(--text-secondary)] mt-4">
        Hybrid retrieval + multi-tier verification cut per-query LLM spend by ~80%
        without sacrificing answer quality.
      </div>
    </div>
  );
}
