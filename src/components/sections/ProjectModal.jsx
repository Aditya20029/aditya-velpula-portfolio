"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import ProjectPreview from "./ProjectPreview";
import { useAccentRgb } from "@/hooks/useAccentRgb";
import { caseStudySlugs } from "@/data/caseStudies";

export default function ProjectModal({ project, onClose }) {
  const accents = useAccentRgb();
  /* Match ProjectCard: skip the shared-element layoutId on touch so the
     modal opens with a clean fade instead of a broken layout projection. */
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (!project) return null;
  const rgb = accents[project.accentColor] || "29, 78, 216";

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      layoutId={isTouch ? undefined : `project-card-${project.id}`}
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
          {project.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image}
              alt={project.imageAlt || project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <ProjectPreview type={project.previewType} accentColor={`rgb(${rgb})`} />
          )}
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

        {(project.github || project.demo || caseStudySlugs.includes(project.id)) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {caseStudySlugs.includes(project.id) && (
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full t-mono-sm font-semibold transition-all hover:brightness-110"
                style={{
                  background: `rgb(${rgb})`,
                  color: "#fff",
                  boxShadow: `0 12px 28px -16px rgb(${rgb})`,
                }}
              >
                <BookOpen size={14} /> Read case study
                <ArrowRight size={14} />
              </Link>
            )}
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
