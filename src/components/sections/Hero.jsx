"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, FileText, ChevronDown } from "lucide-react";
import { personal } from "@/data/personal";
import { EASE } from "@/utils/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroName from "@/components/ui/HeroName";
import TypeReveal from "@/components/ui/TypeReveal";

/* Timing budget (s)
   2.30  available badge
   2.50  name letters start cascading (each +0.05s)
   3.55  name finishes
   3.55  underline + tagline decode start
   4.30  spec chips slide in
   4.65  CTAs
   5.20  scroll cue
*/
const NAME_START = 2.5;
const TAGLINE_START_MS = 3550;

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

      {/* Slow breathing iridescent orb behind the name */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "min(720px, 92vw)",
          height: "min(720px, 92vw)",
          top: "42%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle at 35% 30%, var(--glow-cyan), transparent 50%), radial-gradient(circle at 70% 70%, var(--glow-purple), transparent 55%)",
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: [0, 0.9, 0.7, 0.9],
          scale: [0.85, 1, 1.04, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center gap-7 text-center max-w-5xl"
      >
        {/* Available badge \u2014 laser green, bright in both themes, primary
            visual hook on page load */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 2.3, ease: EASE.outExpo }}
          className="available-badge inline-flex items-center gap-2.5 px-5 py-2 rounded-full t-mono-sm font-semibold"
          style={{
            letterSpacing: "0.16em",
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inset-0 rounded-full opacity-80 animate-ping"
              style={{ background: "#22c55e" }}
            />
            <span
              className="relative rounded-full h-2.5 w-2.5"
              style={{
                background: "#22c55e",
                boxShadow:
                  "0 0 10px #22c55e, 0 0 20px rgba(34, 197, 94, 0.8)",
              }}
            />
          </span>
          <span>Available for opportunities</span>
        </motion.div>

        {/* Letter-pop name (Fraunces serif, holographic, hover-reactive) */}
        <HeroName text={personal.name} startDelay={NAME_START} />

        {/* Animated underline that draws under the name */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.8 }}
          transition={{
            duration: 1.0,
            delay: NAME_START + personal.name.replace(" ", "").length * 0.05 + 0.1,
            ease: EASE.outExpo,
          }}
          className="block h-px -mt-3 origin-center rounded"
          style={{
            width: "min(380px, 60vw)",
            background:
              "linear-gradient(90deg, transparent, var(--accent-primary) 25%, var(--accent-tertiary) 50%, var(--accent-secondary) 75%, transparent)",
            boxShadow: "0 0 18px var(--glow-cyan)",
          }}
        />

        {/* Tagline — decode reveal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.55, ease: EASE.outExpo }}
          className="t-h2 max-w-3xl flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          style={{ color: "var(--text-body)", fontWeight: 500 }}
        >
          <TypeReveal
            text={personal.role}
            delay={TAGLINE_START_MS}
            speed={36}
          />
          <span className="text-[var(--text-ghost)]">·</span>
          <span className="holo-text" style={{ fontWeight: 600 }}>
            <TypeReveal
              text={personal.tagline}
              delay={TAGLINE_START_MS + 480}
              speed={26}
            />
          </span>
        </motion.div>

        {/* Spec chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          {personal.specialties.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 4.3 + i * 0.08,
                ease: EASE.outExpo,
              }}
              whileHover={{ y: -2 }}
              className="relative px-4 py-1.5 rounded-full t-mono-sm overflow-hidden cursor-default"
              style={{
                border: "1px solid var(--border-subtle)",
                background: "var(--surface-glass)",
                backdropFilter: "blur(10px)",
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
              }}
            >
              <span className="relative z-10">{s}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.65 }}
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
        transition={{ delay: 5.2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-[var(--text-muted)]"
        aria-hidden
      >
        <span className="t-mono-sm" style={{ letterSpacing: "0.3em" }}>
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
