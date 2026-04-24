"use client";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, FileText, Code2, Cloud, Database, Zap, GitBranch } from "lucide-react";
import { personal } from "@/data/personal";
import { EASE } from "@/utils/constants";
import MagneticButton from "@/components/ui/MagneticButton";

const TECH_ICONS = [
  { Icon: Code2, label: "Py", delay: 0, duration: 5 },
  { Icon: Cloud, label: "AWS", delay: 0.3, duration: 6 },
  { Icon: Database, label: "TF", delay: 0.6, duration: 4.5 },
  { Icon: GitBranch, label: "Git", delay: 0.9, duration: 5.5 },
  { Icon: Zap, label: "⚡", delay: 1.2, duration: 4 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 z-10"
      aria-label="Hero"
    >
      {/* Living gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "var(--gradient-hero)",
          animation: "gradient-drift 12s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl">
        {/* Name */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.6, ease: EASE.outExpo }}
          className="t-display-xl text-[var(--text-primary)]"
        >
          {personal.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 3.7, ease: EASE.outExpo }}
          className="t-display text-[var(--text-body)]"
        >
          {personal.role} <span className="text-[var(--text-muted)]">|</span>{" "}
          <span className="text-gradient">{personal.tagline}</span>
        </motion.p>

        {/* Specialty tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.9 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {personal.specialties.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 4 + i * 0.07, ease: EASE.outExpo }}
              className="px-4 py-2 rounded-full t-mono-sm bg-[var(--surface-glass)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.25 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 4.25, ease: EASE.outExpo }}
          >
            <MagneticButton href="#projects" variant="primary" data-cursor data-cursor-label="Explore">
              <span>Explore Work</span>
              <ArrowRight size={16} />
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 4.35, ease: EASE.outExpo }}
          >
            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              data-cursor
              data-cursor-label="Open PDF"
            >
              <FileText size={16} />
              <span>View Resume</span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Floating tech icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="flex flex-wrap items-center justify-center gap-5 mt-8"
        >
          {TECH_ICONS.map(({ Icon, label, delay, duration }, i) => (
            <motion.div
              key={label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.1, 1],
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 4.6 + i * 0.08,
                ease: EASE.spring,
              }}
              className="relative"
              data-cursor
              aria-label={label}
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 rounded-2xl glass-subtle flex items-center justify-center text-[var(--accent-primary)]"
              >
                <Icon size={18} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        aria-hidden
      >
        <span className="t-mono-sm">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
