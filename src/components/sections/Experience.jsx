"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import DapseShowcase from "./DapseShowcase";
import ExperienceCard from "./ExperienceCard";

/* Decorative panel shown in the empty column opposite a timeline card.
   Mirrors the role on the other side with big period + location chrome. */
function TimelineAside({ role, reversed }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`hidden md:flex h-full flex-col justify-center ${
        reversed ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {/* Big gradient period number */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="relative t-counter leading-none"
          style={{
            fontSize: "72px",
            background:
              "linear-gradient(135deg, var(--accent-secondary), var(--accent-tertiary))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {role.period.split("–")[0].trim()}
        </div>
      </div>

      <div className="t-mono text-[var(--text-muted)] mt-1">
        — {role.period.split("–")[1]?.trim() || "Present"}
      </div>

      <div className="flex items-center gap-2 t-mono-sm text-[var(--text-secondary)] mt-6">
        <MapPin size={12} className="text-[var(--accent-primary)]" />
        <span>{role.location}</span>
      </div>

      {/* Animated connecting hairline + dots */}
      <div
        className={`mt-4 flex items-center gap-2 ${
          reversed ? "flex-row-reverse" : ""
        }`}
      >
        <div
          aria-hidden
          className="h-px w-24"
          style={{
            background: reversed
              ? "linear-gradient(to left, var(--accent-primary), transparent)"
              : "linear-gradient(to right, var(--accent-primary), transparent)",
          }}
        />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="w-1 h-1 rounded-full bg-[var(--accent-primary)]"
          />
        ))}
      </div>

      {/* Tech tags preview (muted) */}
      <div
        className={`flex flex-wrap gap-1.5 mt-6 max-w-xs ${
          reversed ? "justify-end" : "justify-start"
        }`}
      >
        {role.techStack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="t-mono-sm px-2 py-0.5 rounded text-[var(--text-muted)] border border-[var(--border-subtle)]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const hero = experience.find((e) => e.isHero);
  const others = experience.filter((e) => !e.isHero);

  return (
    <section id="experience" className="section" aria-label="Experience" ref={ref}>
      <div className="container-site">
        <SectionHeading
          kicker="ACT III"
          title="The Architecture"
          subtitle="Roles where I built intelligence systems from first principles — not dashboards, not demos. Real systems with real impact."
        />

        <div className="section-divider my-12" />

        {/* DAPSE (hero) */}
        {hero && (
          <div className="mb-16 md:mb-24">
            <DapseShowcase role={hero} />
          </div>
        )}

        {/* Timeline for remaining roles */}
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] origin-top"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-secondary), var(--accent-tertiary))",
              scaleY: lineScale,
            }}
          />
          <div className="flex flex-col gap-10 md:gap-20">
            {others.map((role, i) => {
              const cardLeft = i % 2 === 0;
              return (
                <div
                  key={role.id}
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-center"
                >
                  {/* Node dot */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full z-10"
                    style={{
                      background: "var(--accent-primary)",
                      boxShadow: "0 0 16px rgba(59,130,246,0.8)",
                    }}
                  />

                  {cardLeft ? (
                    <>
                      <div className="md:pr-4">
                        <ExperienceCard role={role} side="left" />
                      </div>
                      <div className="md:pl-4">
                        <TimelineAside role={role} reversed={false} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:pr-4">
                        <TimelineAside role={role} reversed />
                      </div>
                      <div className="md:pl-4">
                        <ExperienceCard role={role} side="right" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
