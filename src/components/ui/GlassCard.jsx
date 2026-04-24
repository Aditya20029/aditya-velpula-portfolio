"use client";
import clsx from "clsx";

const TIERS = {
  subtle: "glass-subtle",
  standard: "glass-card",
  elevated: "glass-elevated",
};

export default function GlassCard({
  tier = "standard",
  as: Tag = "div",
  className,
  children,
  ...rest
}) {
  return (
    <Tag className={clsx(TIERS[tier] || TIERS.standard, className)} {...rest}>
      {children}
    </Tag>
  );
}
