"use client";
import { motion } from "framer-motion";
import { EASE } from "@/utils/constants";

export default function SectionHeading({ kicker, title, subtitle, align = "left" }) {
  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} gap-4 max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE.outExpo }}
          className="t-mono text-[var(--accent-secondary)]"
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE.outExpo }}
        className="t-h1 text-[var(--text-primary)]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE.outExpo }}
          className="t-body text-[var(--text-secondary)] max-w-prose"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
