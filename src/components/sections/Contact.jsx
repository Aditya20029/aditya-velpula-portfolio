"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { personal } from "@/data/personal";
import TextReveal from "@/components/ui/TextReveal";
import { useMagnetic } from "@/hooks/useMagnetic";

function ContactCard({ href, Icon, label, hoverAnim }) {
  const ref = useMagnetic({ radius: 140, strength: 0.2 });
  return (
    <div ref={ref} className="inline-block">
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-3 px-7 py-5 rounded-2xl glass-card border border-[var(--border-subtle)] hover:border-[var(--border-active)] transition-colors"
        data-cursor
        data-cursor-label={label}
      >
        <motion.span
          whileHover={hoverAnim}
          className="w-10 h-10 rounded-xl bg-[var(--surface-glass)] flex items-center justify-center text-[var(--accent-primary)]"
        >
          <Icon size={18} />
        </motion.span>
        <span className="t-body text-[var(--text-primary)]">{label}</span>
      </motion.a>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container-site flex flex-col items-center gap-10 text-center">
        <div
          aria-hidden
          className="absolute inset-x-0 -bottom-10 -top-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.08), transparent 60%)",
            animation: "breathe 6s ease-in-out infinite",
          }}
        />
        <TextReveal
          text="Let's build intelligent systems together."
          as="h2"
          className="t-display text-[var(--text-primary)] max-w-3xl"
          highlight="intelligent"
          interval={0.12}
        />

        <div className="flex flex-wrap justify-center gap-4">
          <ContactCard
            href={personal.links.email}
            Icon={Mail}
            label="Email"
            hoverAnim={{ x: 4, y: -4 }}
          />
          <ContactCard
            href={personal.links.linkedin}
            Icon={Linkedin}
            label="LinkedIn"
            hoverAnim={{ scale: [1, 1.2, 1] }}
          />
          <ContactCard
            href={personal.links.github}
            Icon={Github}
            label="GitHub"
            hoverAnim={{ rotate: [0, 15, 0] }}
          />
        </div>

        <div className="t-mono-sm text-[var(--text-muted)] mt-10">
          {personal.education.degree} · {personal.education.school}
        </div>
      </div>
    </section>
  );
}
