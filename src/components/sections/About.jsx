"use client";
import { motion } from "framer-motion";
import { GraduationCap, Boxes, BarChart3 } from "lucide-react";
import { personal } from "@/data/personal";
import { EASE } from "@/utils/constants";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";

const IDENTITY_CARDS = [
  {
    icon: GraduationCap,
    text: "M.S. Data Analytics — George Mason University",
    from: { x: -100, y: -60 },
    delay: 0,
  },
  {
    icon: Boxes,
    text: "Building AI Systems That Scale",
    from: { x: 100, y: 20 },
    delay: 0.12,
  },
  {
    icon: BarChart3,
    text: "1,192 Policy Sources → Actionable Intelligence",
    from: { x: -80, y: 80 },
    delay: 0.24,
  },
];

const TERMINAL_LINES = [
  { label: "ENGINEER", value: "Aditya Velpula" },
  { label: "FOCUS", value: "Intelligent Systems" },
  { label: "DOMAINS", value: "RAG • LLM • Cloud Infra" },
  { label: "EDUCATION", value: "M.S. Data Analytics (GMU)" },
  { label: "STATUS", value: "● ACTIVE", highlight: true },
];

export default function About() {
  return (
    <section id="about" className="section relative" aria-label="About">
      <div className="container-site relative z-10 flex flex-col gap-24">
        {/* Act 1: Quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <TextReveal
            text={personal.quote}
            as="h2"
            className="t-display text-[var(--text-primary)]"
          />
        </motion.div>

        {/* Act 2: Identity cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {IDENTITY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: card.from.x, y: card.from.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: card.delay,
                }}
              >
                <GlassCard className="p-6 h-full flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-glass)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                    <Icon size={18} />
                  </div>
                  <p className="t-body text-[var(--text-body)]">{card.text}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Act 3: System Profile terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE.outExpo }}
          className="max-w-2xl mx-auto w-full"
        >
          <div
            className="relative rounded-2xl p-6 md:p-8 glass-card overflow-hidden font-mono-var"
            style={{ borderColor: "rgba(6, 182, 212, 0.3)" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(6,182,212,0.04), transparent)",
                animation: "scan-line 4s linear infinite",
              }}
            />
            <div className="flex items-center justify-between mb-6">
              <div className="t-mono-sm text-[var(--accent-secondary)]">SYSTEM PROFILE</div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                ))}
              </div>
            </div>
            <div className="h-px bg-[var(--border-subtle)] mb-6" />
            <div className="flex flex-col gap-3">
              {TERMINAL_LINES.map((line, i) => (
                <motion.div
                  key={line.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-baseline gap-4 t-mono"
                >
                  <span className="text-[var(--text-muted)] w-24 shrink-0">
                    {line.label}
                  </span>
                  {line.highlight ? (
                    <span className="text-[var(--accent-success)] inline-flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-[var(--accent-success)]"
                        style={{ animation: "status-pulse 2s ease-in-out infinite" }}
                      />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[var(--text-primary)]">{line.value}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Act 4: Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-prose mx-auto text-center"
        >
          <p className="t-body-lg text-[var(--text-body)]">{personal.bio}</p>
        </motion.div>
      </div>
    </section>
  );
}
