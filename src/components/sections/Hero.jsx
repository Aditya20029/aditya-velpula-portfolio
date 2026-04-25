"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, FileText, ChevronDown } from "lucide-react";
import { personal } from "@/data/personal";
import { EASE } from "@/utils/constants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 z-10 overflow-hidden"
      aria-label="Hero"
    >
      {/* Dreamy radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />


      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.6, ease: EASE.outExpo }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full t-mono-sm"
          style={{
            border: "1px solid rgba(255, 154, 230, 0.25)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            color: "var(--text-secondary)",
            letterSpacing: "0.12em",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inset-0 rounded-full opacity-60 animate-ping"
              style={{ background: "var(--accent-secondary)" }}
            />
            <span
              className="relative rounded-full h-2 w-2"
              style={{ background: "var(--accent-secondary)" }}
            />
          </span>
          <span>Available for opportunities</span>
        </motion.div>

        {/* Name — soft holographic iridescent */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ duration: 1.1, delay: 2.8, ease: EASE.outExpo }}
          className="t-display-xl holo-text"
          style={{
            filter:
              "drop-shadow(0 0 30px rgba(255, 154, 230, 0.3)) drop-shadow(0 0 60px rgba(124, 212, 255, 0.18))",
            fontWeight: 800,
          }}
        >
          {personal.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 3.8, ease: EASE.outExpo }}
          className="t-h2 max-w-3xl"
          style={{ color: "var(--text-body)", fontWeight: 500 }}
        >
          {personal.role}
          <span className="mx-3 text-[var(--text-ghost)]">·</span>
          <span className="holo-text">{personal.tagline}</span>
        </motion.p>

        {/* Spec chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.1 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          {personal.specialties.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 4.15 + i * 0.08,
                ease: EASE.outExpo,
              }}
              className="px-4 py-1.5 rounded-full t-mono-sm"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(7, 7, 13, 0.5)",
                backdropFilter: "blur(10px)",
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
              }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <MagneticButton
            href="#projects"
            variant="primary"
            data-cursor
            data-cursor-label="Explore"
          >
            <span>Explore Work</span>
            <ArrowRight size={16} />
          </MagneticButton>
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-[var(--text-muted)]"
        aria-hidden
      >
        <span
          className="t-mono-sm"
          style={{ letterSpacing: "0.3em" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
