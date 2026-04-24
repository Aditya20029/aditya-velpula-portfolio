"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/utils/constants";

export default function TabSwitcher({ tabs, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className="w-full">
      <div
        role="tablist"
        className="flex flex-wrap gap-2 border-b border-[var(--border-subtle)] mb-8"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`relative px-5 py-3 t-mono transition-colors duration-300 ${
              active === i
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {t.label}
            {active === i && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                style={{ background: "var(--gradient-accent)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: EASE.outExpo }}
          >
            {tabs[active]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
