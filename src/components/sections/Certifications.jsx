"use client";
import { motion } from "framer-motion";
import { Award, Check } from "lucide-react";
import { certifications } from "@/data/certifications";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-label="Certifications">
      <div className="container-site">
        <SectionHeading
          kicker="ACT IV · VERIFIED"
          title="Certifications"
          subtitle="Official credentials, earned through examination."
          align="center"
        />
        <div className="section-divider my-12" />
        <div className="flex flex-wrap justify-center gap-6">
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden glass-card p-6 flex items-center gap-5 min-w-[280px] group ${
                c.featured ? "border-[var(--accent-warm)]/40" : ""
              }`}
              style={{
                borderColor: c.featured
                  ? "rgba(245, 158, 11, 0.4)"
                  : undefined,
              }}
              data-cursor
            >
              {/* Shimmer */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                  animation: "shimmer 0.8s ease-in-out",
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: c.featured
                    ? "rgba(245, 158, 11, 0.12)"
                    : "var(--surface-glass)",
                  color: c.featured ? "var(--accent-warm)" : "var(--accent-primary)",
                }}
              >
                <Award size={22} />
              </div>
              <div className="flex-1">
                <div className="t-h3 text-[var(--text-primary)] leading-tight">
                  {c.name}
                </div>
                <div className="t-mono-sm text-[var(--text-muted)] mt-1">
                  {c.issuer} · {c.date}
                </div>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1, type: "spring" }}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-success)" }}
                aria-label="Verified"
              >
                <Check size={16} color="white" strokeWidth={3} />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
