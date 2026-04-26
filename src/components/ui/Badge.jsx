"use client";
import clsx from "clsx";

export default function Badge({ children, className, color = "default" }) {
  const colorClass =
    color === "warm"
      ? "border-[var(--accent-warm)]/30 text-[var(--accent-warm)]"
      : color === "success"
      ? "border-[var(--accent-success)]/30 text-[var(--accent-success)]"
      : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--text-primary)]";
  return (
    <span
      className={clsx(
        "premium-chip inline-flex items-center px-3 py-1.5 rounded-full t-mono-sm transition-colors duration-300",
        colorClass,
        className
      )}
    >
      {children}
    </span>
  );
}
