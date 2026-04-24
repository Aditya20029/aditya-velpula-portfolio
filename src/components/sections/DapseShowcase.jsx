"use client";
import { motion } from "framer-motion";
import { TrendingDown, Database, Target, FileText, Globe } from "lucide-react";
import TabSwitcher from "@/components/ui/TabSwitcher";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CostSlider from "@/components/ui/CostSlider";
import DapseDiagram from "./DapseDiagram";
import DapseQuerySim from "./DapseQuerySim";
import DapseTechStack from "./DapseTechStack";

const ICONS = {
  "trending-down": TrendingDown,
  database: Database,
  target: Target,
  "file-text": FileText,
  globe: Globe,
};

export default function DapseShowcase({ role }) {
  const tabs = [
    {
      id: "architecture",
      label: "Architecture",
      content: (
        <div className="grid md:grid-cols-[1fr_460px] gap-10 items-center">
          <div>
            <h4 className="t-h3 text-[var(--text-primary)] mb-3">
              Hybrid RAG Pipeline
            </h4>
            <p className="t-body text-[var(--text-secondary)] max-w-prose mb-4">
              {role.details.architecture}
            </p>
            <p className="t-body-sm text-[var(--text-muted)] max-w-prose">
              {role.details.legalContext}
            </p>
          </div>
          <div className="w-full flex justify-center">
            <DapseDiagram />
          </div>
        </div>
      ),
    },
    {
      id: "impact",
      label: "Impact",
      content: (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {role.impact.map((m) => {
              const Icon = ICONS[m.icon] || Target;
              return (
                <div
                  key={m.label}
                  className="glass-card p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 text-[var(--accent-secondary)]">
                    <Icon size={16} />
                    <span className="t-mono-sm">{m.label}</span>
                  </div>
                  <div className="t-counter text-[var(--text-primary)]">
                    <AnimatedCounter
                      value={m.value}
                      suffix={m.suffix || ""}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <CostSlider />
        </div>
      ),
    },
    {
      id: "stack",
      label: "Tech Stack",
      content: <DapseTechStack />,
    },
    {
      id: "live",
      label: "Live Query",
      content: <DapseQuerySim />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Double border glow */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[24px] pointer-events-none opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1), rgba(6,182,212,0.12))",
          filter: "blur(20px)",
        }}
      />
      <div className="relative glass-elevated p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="t-mono-sm text-[var(--accent-secondary)] mb-2">
              FEATURED ROLE · {role.period}
            </div>
            <h3 className="t-h2 text-[var(--text-primary)]">{role.role}</h3>
            <div className="t-body text-[var(--text-secondary)] mt-2">
              {role.company} · {role.location}
            </div>
          </div>
          <div className="t-body-sm text-[var(--text-secondary)] max-w-sm">
            {role.summary}
          </div>
        </div>
        <TabSwitcher tabs={tabs} />
      </div>
    </motion.div>
  );
}
