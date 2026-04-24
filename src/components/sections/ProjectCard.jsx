"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import Badge from "@/components/ui/Badge";
import ProjectPreview from "./ProjectPreview";

const ACCENT_MAP = {
  "--accent-primary": "124, 212, 255",
  "--accent-secondary": "255, 154, 230",
  "--accent-tertiary": "196, 167, 255",
  "--accent-warm": "255, 216, 138",
  "--accent-success": "139, 245, 208",
};

export default function ProjectCard({ project, onOpen, index }) {
  const rgb = ACCENT_MAP[project.accentColor] || "124, 212, 255";
  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
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
        className="relative rounded-[20px] overflow-hidden"
      >
        {/* Iridescent edge glow — pseudo gradient border */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[20px] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            padding: "1px",
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(124,212,255,0.5), rgba(196,167,255,0.5) 25%, rgba(255,154,230,0.5) 50%, rgba(255,216,138,0.5) 75%, rgba(124,212,255,0.5))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content surface */}
        <div
          className="relative p-6 md:p-8 h-full flex flex-col gap-5"
          style={{
            background: "rgba(10, 10, 18, 0.72)",
            backdropFilter: "blur(16px) saturate(1.3)",
          }}
        >
          {/* Preview */}
          <div
            className="relative h-40 rounded-xl overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, rgba(${rgb}, 0.12), transparent 70%)`,
              border: `1px solid rgba(${rgb}, 0.2)`,
            }}
          >
            <ProjectPreview type={project.previewType} accentColor={`rgb(${rgb})`} />
            {/* Soft inner sheen */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
              }}
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <div
                className="t-mono-sm"
                style={{ color: `rgb(${rgb})`, letterSpacing: "0.08em" }}
              >
                {project.subtitle}
              </div>
              <h3
                className="t-h3 mt-1 transition-all duration-300 group-hover:chroma-text"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 mt-1 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
              style={{ color: "var(--text-muted)" }}
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
                    className="t-counter"
                    style={{ color: `rgb(${rgb})` }}
                  >
                    {m.format === "decimal"
                      ? m.value.toFixed(2)
                      : m.value.toLocaleString()}
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
        </div>
      </TiltCard>
    </motion.div>
  );
}
