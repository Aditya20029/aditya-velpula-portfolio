"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

/**
 * Tiny copy-to-clipboard button. Shows a "Copied" pill for ~1.4s after a
 * successful copy. Stops event propagation so it can live inside a link.
 */
export default function CopyButton({
  value,
  label = "Copy ID",
  ariaLabel = "Copy to clipboard",
  accent = "var(--accent-primary)",
}) {
  const [copied, setCopied] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (_) {
      // Fallback for older / insecure contexts
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      } catch (_) {}
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor
      data-cursor-label={copied ? "Copied" : "Copy"}
      className="group/copy relative inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-glass)] hover:border-[var(--border-active)] hover:bg-[var(--surface-glass-hover)] transition-colors t-mono-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      style={{ "--copy-accent": accent }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
            style={{ color: accent }}
          >
            <Check size={11} strokeWidth={3} />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            <Copy size={11} />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
