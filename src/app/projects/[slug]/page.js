import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import {
  caseStudies,
  caseStudySlugs,
  getCaseStudy,
} from "@/data/caseStudies";
import { projects } from "@/data/projects";

/**
 * Filter screenshots whose underlying file isn't on disk yet. Runs at
 * build time (server component) so missing files don't render as broken
 * <img> elements in production. Caller still passes the canonical list
 * from caseStudies.js — this just narrows it.
 */
function existingScreenshots(screenshots) {
  if (!Array.isArray(screenshots) || screenshots.length === 0) return [];
  const publicDir = path.join(process.cwd(), "public");
  return screenshots.filter((s) => {
    if (!s?.src) return false;
    const rel = s.src.replace(/^\//, "");
    try {
      return fs.existsSync(path.join(publicDir, rel));
    } catch {
      return false;
    }
  });
}
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlitterStorm from "@/components/canvas/GlitterStorm";
import GrainOverlay from "@/components/canvas/GrainOverlay";
import PremiumBackdrop from "@/components/layout/PremiumBackdrop";
import Badge from "@/components/ui/Badge";

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Project · Aditya Velpula" };
  return {
    title: `${study.title} · Aditya Velpula`,
    description: study.problem.slice(0, 160),
  };
}

export default function ProjectCaseStudy({ params }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const project = projects.find((p) => p.id === params.slug);
  const screenshots = existingScreenshots(study.screenshots);

  return (
    <>
      <GlitterStorm />
      <GrainOverlay />
      <PremiumBackdrop />
      <Navbar />
      <main className="relative z-10">
        <article className="container-site relative z-10 px-4 md:px-8 pt-32 pb-24 max-w-prose mx-auto">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 t-mono-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-10"
            style={{ letterSpacing: "0.16em" }}
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div
              className="t-mono-sm mb-3"
              style={{
                color: `var(${study.accent})`,
                letterSpacing: "0.18em",
              }}
            >
              {study.subtitle}
            </div>
            <h1
              className="t-h1 holo-text leading-tight"
              style={{
                fontFamily:
                  'var(--font-display), "Fraunces", Georgia, serif',
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {study.title}
            </h1>
          </header>

          {/* Headline metric */}
          <div className="glass-card p-6 md:p-8 mb-12 flex flex-col sm:flex-row sm:items-baseline gap-3">
            <span
              className="t-counter"
              style={{ color: `var(${study.accent})` }}
            >
              {study.metric.value}
            </span>
            <span className="t-mono text-[var(--text-secondary)]">
              {study.metric.label}
            </span>
          </div>

          {/* Sections */}
          <Section
            kicker="THE PROBLEM"
            accent={study.accent}
            body={study.problem}
          />

          <Section
            kicker="THE DECISION"
            accent={study.accent}
            body={study.decision}
          />

          <SectionList
            kicker="ARCHITECTURE"
            accent={study.accent}
            items={study.architecture}
          />

          <SectionList
            kicker="WHAT I TRIED THAT DIDN'T WORK"
            accent={study.accent}
            items={study.tried}
          />

          {/* Screenshot gallery (only when matching files exist on disk) */}
          {screenshots.length > 0 && (
            <ScreenshotGallery
              accent={study.accent}
              screenshots={screenshots}
            />
          )}

          {/* Stack chips */}
          <div className="mt-14">
            <div
              className="t-mono-sm mb-4"
              style={{
                color: `var(${study.accent})`,
                letterSpacing: "0.2em",
              }}
            >
              STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>

          {/* Source CTA */}
          {project?.github && (
            <div className="mt-14">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--border-hover)] bg-[var(--surface-glass)] t-mono-sm hover:border-[var(--border-active)] transition-colors"
              >
                <Github size={14} /> Source on GitHub
              </a>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({ kicker, accent, body }) {
  return (
    <section className="mb-12">
      <div
        className="t-mono-sm mb-3"
        style={{ color: `var(${accent})`, letterSpacing: "0.2em" }}
      >
        {kicker}
      </div>
      <p className="t-body-lg text-[var(--text-body)] leading-relaxed">
        {body}
      </p>
    </section>
  );
}

function ScreenshotGallery({ accent, screenshots }) {
  return (
    <section className="mb-12">
      <div
        className="t-mono-sm mb-4"
        style={{ color: `var(${accent})`, letterSpacing: "0.2em" }}
      >
        WHAT IT LOOKS LIKE
      </div>
      <div className="flex flex-col gap-8">
        {screenshots.map((shot, i) => (
          <figure key={shot.src} className="flex flex-col gap-3">
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--surface-glass)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="t-body-sm text-[var(--text-muted)] leading-relaxed">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SectionList({ kicker, accent, items }) {
  return (
    <section className="mb-12">
      <div
        className="t-mono-sm mb-4"
        style={{ color: `var(${accent})`, letterSpacing: "0.2em" }}
      >
        {kicker}
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="t-body text-[var(--text-body)] leading-relaxed pl-5 relative"
          >
            <span
              aria-hidden
              className="absolute left-0 top-3 h-1 w-1 rounded-full"
              style={{ background: `var(${accent})` }}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
