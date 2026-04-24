"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import DapseShowcase from "./DapseShowcase";
import ExperienceCard from "./ExperienceCard";

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
          <div className="flex flex-col gap-10 md:gap-16">
            {others.map((role, i) => (
              <div
                key={role.id}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                {/* Node dot */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full"
                  style={{
                    background: "var(--accent-primary)",
                    boxShadow: "0 0 12px rgba(59,130,246,0.6)",
                  }}
                />
                <ExperienceCard role={role} side={i % 2 === 0 ? "left" : "right"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
