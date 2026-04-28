"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "RAG", "LLMs", "Python", "FastAPI", "FAISS", "BM25", "GPT-5", "Claude",
  "Langfuse", "Prometheus", "AWS", "Snowflake", "Azure", "Docker", "Spark",
  "Airflow", "Pandas", "PySpark", "Scikit-learn", "SQL", "Next.js", "React",
];

export default function TechMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden py-6 border-y border-[var(--border-subtle)]"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((t, i) => (
          <span
            key={i}
            className="t-mono text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors inline-flex items-center gap-10"
          >
            {t}
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "var(--border-hover)" }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
