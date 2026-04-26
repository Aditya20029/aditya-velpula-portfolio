"use client";
import clsx from "clsx";
import { useMagnetic } from "@/hooks/useMagnetic";
import { motion } from "framer-motion";

const VARIANTS = {
  primary:
    "text-white border border-transparent hover:brightness-110 shadow-[0_18px_44px_-24px_var(--accent-primary)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-active)] hover:bg-[var(--surface-glass)]",
  outlined:
    "bg-[var(--surface-glass)] text-[var(--text-primary)] border border-[var(--border-hover)] hover:border-[var(--border-active)]",
};

export default function MagneticButton({
  children,
  variant = "ghost",
  className,
  href,
  style,
  ...rest
}) {
  const ref = useMagnetic({ radius: 120, strength: 0.25 });
  const Component = href ? motion.a : motion.button;

  return (
    <div ref={ref} className="inline-block">
      <Component
        href={href}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={clsx(
          "inline-flex items-center gap-2 px-6 py-3 rounded-full t-mono font-medium transition-all duration-300",
          VARIANTS[variant] || VARIANTS.ghost,
          className
        )}
        style={
          variant === "primary"
            ? {
                background:
                  "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary) 52%, var(--accent-secondary))",
                ...style,
              }
            : style
        }
        {...rest}
      >
        {children}
      </Component>
    </div>
  );
}
