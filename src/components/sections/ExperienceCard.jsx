"use client";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function ExperienceCard({ role, side = "left" }) {
  const initial =
    side === "left"
      ? { opacity: 0, x: -80, rotateY: 8 }
      : { opacity: 0, x: 80, rotateY: -8 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-6 md:p-8 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="t-h3 text-[var(--text-primary)]">{role.role}</h3>
            <div className="t-body-sm text-[var(--text-secondary)]">
              {role.company} · {role.location}
            </div>
          </div>
          <span className="t-mono-sm text-[var(--accent-secondary)] shrink-0">
            {role.period}
          </span>
        </div>
        <p className="t-body text-[var(--text-body)]">{role.summary}</p>
        {role.impact?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {role.impact.map((m) => (
              <div
                key={m.label}
                className="px-4 py-3 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-subtle)]"
              >
                <div className="t-h3 text-[var(--text-primary)]">
                  <AnimatedCounter value={m.value} suffix={m.suffix || ""} />
                </div>
                <div className="t-mono-sm text-[var(--text-muted)]">{m.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {role.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
