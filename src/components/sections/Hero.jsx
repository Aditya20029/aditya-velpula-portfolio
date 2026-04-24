"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ChevronDown,
  ArrowRight,
  FileText,
  Code2,
  Cloud,
  Database,
  Zap,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { personal } from "@/data/personal";
import { EASE } from "@/utils/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import Aurora from "@/components/canvas/Aurora";

const TECH_ICONS = [
  { Icon: Code2, label: "Py", duration: 5 },
  { Icon: Cloud, label: "AWS", duration: 6 },
  { Icon: Database, label: "TF", duration: 4.5 },
  { Icon: GitBranch, label: "Git", duration: 5.5 },
  { Icon: Zap, label: "⚡", duration: 4 },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax (content floats up as you scroll; background sinks)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 z-10 overflow-hidden"
      aria-label="Hero"
    >
      {/* Aurora mesh (parallax) */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Aurora />
      </motion.div>

      {/* Living radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      {/* Top-left annotation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.2, duration: 0.8, ease: EASE.outExpo }}
        className="absolute top-24 left-6 md:left-12 t-mono-sm text-[var(--text-muted)] hidden md:flex items-center gap-2"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--accent-success)]"
          style={{ animation: "status-pulse 2s ease-in-out infinite" }}
        />
        ONLINE · BUILDING
      </motion.div>

      {/* Top-right annotation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.4, duration: 0.8, ease: EASE.outExpo }}
        className="absolute top-24 right-6 md:right-12 t-mono-sm text-[var(--text-muted)] hidden md:block text-right"
      >
        <div>v1.0 · 2026</div>
        <div className="opacity-60">Arlington · Remote</div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl"
      >
        {/* Badge — "Available" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.5, ease: EASE.outExpo }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle border border-[var(--accent-primary)]/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[var(--accent-primary)] animate-ping opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
          </span>
          <span className="t-mono-sm text-[var(--text-secondary)]">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — clip reveal */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ duration: 1, delay: 2.7, ease: EASE.outExpo }}
          className="t-display-xl text-[var(--text-primary)]"
        >
          {personal.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 3.7, ease: EASE.outExpo }}
          className="t-display text-[var(--text-body)] max-w-3xl"
        >
          {personal.role}
          <span className="text-[var(--text-muted)] mx-3">|</span>
          <span className="text-gradient">{personal.tagline}</span>
        </motion.p>

        {/* Specialty tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {personal.specialties.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 4.05 + i * 0.08,
                ease: EASE.outExpo,
              }}
              className="px-4 py-2 rounded-full t-mono-sm bg-[var(--surface-glass)] border border-[var(--border-subtle)] text-[var(--text-secondary)] backdrop-blur"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 4.35, ease: EASE.outExpo }}
          >
            <MagneticButton
              href="#projects"
              variant="primary"
              data-cursor
              data-cursor-label="Explore"
            >
              <Sparkles size={16} />
              <span>Explore Work</span>
              <ArrowRight size={16} />
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 4.45, ease: EASE.outExpo }}
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
          transition={{ delay: 4.6 }}
          className="flex flex-wrap items-center justify-center gap-5 mt-6"
        >
          {TECH_ICONS.map(({ Icon, label, duration }, i) => (
            <motion.div
              key={label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.15, 1],
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 4.7 + i * 0.08,
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
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 rounded-2xl glass-subtle flex items-center justify-center text-[var(--accent-primary)] hover:scale-110 transition-transform"
              >
                <Icon size={18} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] z-10"
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
