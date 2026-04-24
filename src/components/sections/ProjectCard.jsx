"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import Badge from "@/components/ui/Badge";
import ProjectPreview from "./ProjectPreview";

const ACCENT_MAP = {
  "--accent-primary": "59, 130, 246",
  "--accent-secondary": "6, 182, 212",
  "--accent-tertiary": "139, 92, 246",
  "--accent-warm": "245, 158, 11",
  "--accent-success": "16, 185, 129",
};

export default function ProjectCard({ project, onOpen, index }) {
  const rgb = ACCENT_MAP[project.accentColor] || "59, 130, 246";
  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="cursor-pointer"
      data-cursor
      data-cursor-label="Open"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
    >
      <TiltCard
        glowColor={rgb}
        className="glass-card p-6 md:p-8 h-full flex flex-col gap-5"
      >
        {/* Preview */}
        <div
          className="relative h-40 rounded-xl overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(${rgb}, 0.08), transparent 70%)`,
            border: `1px solid rgba(${rgb}, 0.15)`,
          }}
        >
          <ProjectPreview type={project.previewType} accentColor={`rgb(${rgb})`} />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <div
              className="t-mono-sm"
              style={{ color: `rgb(${rgb})` }}
            >
              {project.subtitle}
            </div>
            <h3 className="t-h3 text-[var(--text-primary)] mt-1">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="text-[var(--text-muted)] shrink-0 mt-1"
          />
        </div>

        <p className="t-body-sm text-[var(--text-secondary)] line-clamp-3">
          {project.description}
        </p>

        {project.metrics?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="t-counter text-[var(--text-primary)]"
                  style={{ color: `rgb(${rgb})` }}
                >
                  {m.format === "decimal" ? m.value.toFixed(2) : m.value.toLocaleString()}
                  {m.suffix || ""}
                </div>
                <div className="t-mono-sm text-[var(--text-muted)]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.tags.slice(0, 5).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
}
