"use client";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Calendar, Clock } from "lucide-react";
import { certifications, CERT_TIERS, CERT_COUNT } from "@/data/certifications";
import SectionHeading from "@/components/ui/SectionHeading";
import HexBadge from "@/components/ui/HexBadge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CopyButton from "@/components/ui/CopyButton";
import SectionAccent from "@/components/ui/SectionAccent";

function CertCard({ cert, index, featured = false }) {
  const tier = CERT_TIERS[cert.tier];
  const short = cert.validationId
    ? `${cert.validationId.slice(0, 8)}…${cert.validationId.slice(-4)}`
    : "ACADEMY";

  return (
    <motion.a
      href={cert.verifyUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      data-cursor
      data-cursor-label="Verify"
      className={`group relative block ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Outer aura on hover */}
      <motion.div
        aria-hidden
        className="absolute -inset-3 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${tier.accentRgb}, 0.2), transparent 70%)`,
          filter: "blur(16px)",
        }}
      />

      <div
        className={`relative glass-card overflow-hidden p-6 h-full flex flex-col items-center gap-5 md:gap-6 ${
          featured ? "md:p-8 lg:flex-row" : "md:p-7 justify-start"
        }`}
        style={{
          borderColor: `rgba(${tier.accentRgb}, 0.22)`,
        }}
      >
        {/* Corner accent gradient */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle, rgba(${tier.accentRgb}, 0.35), transparent 70%)`,
          }}
        />

        {/* Shimmer sweep on hover */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
            animation: "shimmer 1.2s ease-out",
          }}
        />

        {/* Hex badge */}
        <div className="shrink-0 relative z-10 flex w-full items-center justify-center lg:w-auto">
          <HexBadge
            name={cert.name}
            subtitle={cert.subtitle}
            tier={cert.tier}
            accent={tier.accent}
            earlyAdopter={cert.earlyAdopter}
            size={featured ? 220 : 170}
          />
        </div>

        {/* Info column */}
        <div
          className={`relative z-10 flex min-w-0 flex-col gap-3 text-center ${
            featured ? "lg:text-left" : ""
          } ${featured ? "flex-1" : "w-full flex-none"}`}
        >
          <div
            className={`flex flex-wrap items-center gap-2 justify-center ${
              featured ? "lg:justify-start" : ""
            }`}
          >
            <span
              className="t-mono-sm px-2.5 py-1 rounded-full border"
              style={{
                color: tier.accent,
                borderColor: `rgba(${tier.accentRgb}, 0.4)`,
                background: `rgba(${tier.accentRgb}, 0.08)`,
              }}
            >
              {tier.label}
            </span>
            {cert.earlyAdopter && (
              <span
                className="t-mono-sm px-2.5 py-1 rounded-full border"
                style={{
                  color: "#f59e0b",
                  borderColor: "rgba(245, 158, 11, 0.4)",
                  background: "rgba(245, 158, 11, 0.08)",
                }}
              >
                EARLY ADOPTER
              </span>
            )}
          </div>

          <h3 className="t-h3 text-[var(--text-primary)] leading-tight">
            {cert.fullName}
          </h3>

          <div className="t-body-sm text-[var(--text-secondary)]">
            {cert.issuer}
          </div>

          <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 justify-center t-mono-sm text-[var(--text-muted)] ${
              featured ? "lg:justify-start" : ""
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              Issued {cert.issued}
            </span>
            {cert.expires && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                Valid until {cert.expires}
              </span>
            )}
            {cert.hours && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {cert.hours}
              </span>
            )}
          </div>

          <div
            className={`flex flex-wrap items-center gap-3 pt-2 justify-center ${
              featured ? "lg:justify-start" : ""
            }`}
          >
            <span className="inline-flex items-center gap-2 t-mono-sm text-[var(--text-muted)]">
              <ShieldCheck size={14} style={{ color: tier.accent }} />
              ID&nbsp;<span className="text-[var(--text-secondary)]">{short}</span>
            </span>
            {cert.validationId && (
              <CopyButton
                value={cert.validationId}
                label="Copy ID"
                ariaLabel={`Copy validation ID for ${cert.fullName}`}
                accent={tier.accent}
              />
            )}
            <span
              className="inline-flex items-center gap-1.5 t-mono-sm transition-opacity"
              style={{ color: tier.accent }}
            >
              Verify <ExternalLink size={11} />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Certifications() {
  const featured = certifications.find((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);

  return (
    <section id="certifications" className="section relative overflow-hidden" aria-label="Certifications">
      <SectionAccent
        variant="ring"
        size={600}
        position={{ top: "15%", left: "50%" }}
        opacity={0.18}
      />
      <SectionAccent
        variant="orb"
        size={360}
        position={{ top: "88%", left: "12%" }}
        opacity={0.22}
      />
      <div className="container-site relative z-10">
        <SectionHeading
          kicker="VERIFIED CREDENTIALS"
          title="AWS Certifications"
          subtitle="Click any badge or 'Verify' to open the official AWS verification page. Use 'Copy ID' to grab the validation hash."
          align="center"
        />

        {/* Big count stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-baseline justify-center gap-3 mt-8"
        >
          <span className="t-counter text-gradient">
            <AnimatedCounter value={CERT_COUNT} />
          </span>
          <span className="t-mono text-[var(--text-muted)]">
            active certifications
          </span>
        </motion.div>

        <div className="section-divider my-12" />

        <div className="grid md:grid-cols-2 gap-6">
          {featured && <CertCard cert={featured} index={0} featured />}
          {rest.map((c, i) => (
            <CertCard key={c.id} cert={c} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
