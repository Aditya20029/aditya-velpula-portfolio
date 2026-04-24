"use client";
import { Github, ExternalLink } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import ProjectPreview from "./ProjectPreview";

const ACCENT_MAP = {
  "--accent-primary": "59, 130, 246",
  "--accent-secondary": "6, 182, 212",
  "--accent-tertiary": "139, 92, 246",
  "--accent-warm": "245, 158, 11",
  "--accent-success": "16, 185, 129",
};

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const rgb = ACCENT_MAP[project.accentColor] || "59, 130, 246";

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      layoutId={`project-card-${project.id}`}
      accentColor={`rgba(${rgb}, 0.5)`}
    >
      <div className="flex flex-col gap-6">
        <div
          className="relative h-56 md:h-72 rounded-2xl overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(${rgb}, 0.12), transparent 70%)`,
            border: `1px solid rgba(${rgb}, 0.2)`,
          }}
        >
          <ProjectPreview type={project.previewType} accentColor={`rgb(${rgb})`} />
        </div>

        <div>
          <div className="t-mono-sm" style={{ color: `rgb(${rgb})` }}>
            {project.subtitle}
          </div>
          <h2 className="t-h1 text-[var(--text-primary)] mt-1">
            {project.title}
          </h2>
        </div>

        <p className="t-body-lg text-[var(--text-body)] max-w-prose">
          {project.description}
        </p>

        {project.metrics?.length > 0 && (
          <div className="flex flex-wrap gap-6">
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

        <div>
          <div className="t-mono-sm text-[var(--text-muted)] mb-3">TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {(project.github || project.demo) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-hover)] bg-[var(--surface-glass)] t-mono-sm hover:border-[var(--border-active)] transition-colors"
              >
                <Github size={14} /> Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent-primary)] text-white t-mono-sm hover:brightness-110 transition"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
