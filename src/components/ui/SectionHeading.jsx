"use client";
import { motion } from "framer-motion";
import { EASE } from "@/utils/constants";

export default function SectionHeading({ kicker, title, subtitle, align = "left" }) {
  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div
      className={`flex flex-col ${alignCls} gap-4 max-w-3xl ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          className="premium-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 t-mono"
          style={{
            color: "var(--accent-secondary)",
            letterSpacing: "0.22em",
            opacity: 0.85,
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]"
            style={{ boxShadow: "0 0 12px var(--accent-secondary)" }}
          />
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE.outExpo }}
        className="t-h1 holo-text"
        style={{
          filter:
            "drop-shadow(0 0 22px var(--glow-cyan)) drop-shadow(0 0 44px var(--glow-purple))",
          fontWeight: 700,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE.outExpo }}
          className="t-body text-[var(--text-secondary)] max-w-prose"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
