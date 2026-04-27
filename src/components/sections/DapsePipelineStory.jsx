"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  Layers,
  Database,
  Search,
  ShieldCheck,
  Send,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useAccentRgb } from "@/hooks/useAccentRgb";

/**
 * Narrated DAPSE pipeline. As you scroll through this section, six
 * stages sweep through one at a time on the right. The left column
 * holds a sticky overview + animated stage-progress bar.
 *
 * Each stage gets its own jewel-tone accent so the pipeline reads as
 * an iridescent flow instead of six identical cards. Colors come from
 * useAccentRgb so they swap correctly between dark and light mode.
 */

const STAGES = [
  {
    icon: FileText,
    label: "Ingest",
    metric: "1,192 sources",
    accent: "--accent-primary", // electric blue
    body:
      "519 government documents + 673 supporting analyses, across 9 Arctic nations. Pulled into a normalized format with provenance tagging on every artifact.",
  },
  {
    icon: Layers,
    label: "Chunk",
    metric: "25,565 chunks",
    accent: "--accent-tertiary", // royal purple
    body:
      "Section-aware segmentation with parent-child chunking. Policy docs are full of structural meaning (treaty articles, footnotes, schedules), so naive paragraph splits would wreck retrieval.",
  },
  {
    icon: Database,
    label: "Embed + Index",
    metric: "1,536-dim vectors",
    accent: "--accent-success", // emerald
    body:
      "OpenAI embeddings stored in FAISS, with a BM25 lexical sidecar over the same chunks. Two indexes, one query plane.",
  },
  {
    icon: Search,
    label: "Hybrid Retrieve",
    metric: "Reciprocal Rank Fusion",
    accent: "--accent-warm", // burnt amber
    body:
      "Multi-query rewriting hits BM25 + FAISS + Exa.ai neural web search in parallel. Results blend through Reciprocal Rank Fusion so we get lexical precision and semantic recall.",
  },
  {
    icon: ShieldCheck,
    label: "Verify",
    metric: "75 to 80% cost cut",
    accent: "--accent-coral", // deep cyan-teal
    body:
      "Three-tier LLM verification: draft → critique → finalize. Automatic escalation only when the critique tier flags grounding issues. Cost drops dramatically vs. naive top-tier-only routing.",
  },
  {
    icon: Send,
    label: "Respond",
    metric: "Citations always",
    accent: "--accent-secondary", // magenta
    body:
      "Every claim in the response is grounded in a retrieved chunk with a clickable citation. Hallucinations are blocked at the verification gate, not patched in the UI.",
  },
];

export default function DapsePipelineStory() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Drive a 0..1 progress that maps across the stages. We use this for
  // the overview "current stage" indicator on the sticky left column.
  const stageProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, STAGES.length]
  );

  const accents = useAccentRgb();

  return (
    <section
      ref={sectionRef}
      id="dapse-pipeline"
      aria-label="DAPSE pipeline walkthrough"
      className="section relative"
    >
      <div className="container-site">
        <SectionHeading
          kicker="HOW DAPSE WORKS"
          title="Six Stages, One Query"
          subtitle="Scroll through the pipeline. Each stage is a real piece of the system in production."
        />

        <div className="section-divider my-12" />

        {/* Two-column scroll story */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          {/* Sticky left column: overview + progress */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="glass-card p-6 relative overflow-hidden"
              style={{
                border: `2px solid rgba(${accents["--accent-primary"]}, 0.45)`,
                boxShadow: `0 18px 40px -22px rgba(${accents["--accent-primary"]}, 0.55)`,
              }}
            >
              <div
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-1.5 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, rgb(${accents["--accent-primary"]}), rgb(${accents["--accent-secondary"]}))`,
                  boxShadow: `0 0 14px rgba(${accents["--accent-primary"]}, 0.55)`,
                }}
              />
              <div
                className="t-mono-sm mb-3 font-bold inline-block px-2.5 py-1 rounded-md"
                style={{
                  color: "#fff",
                  background: `linear-gradient(135deg, rgb(${accents["--accent-primary"]}), rgba(${accents["--accent-primary"]}, 0.78))`,
                  letterSpacing: "0.22em",
                  boxShadow: `0 6px 14px -6px rgba(${accents["--accent-primary"]}, 0.7)`,
                }}
              >
                PIPELINE
              </div>
              <p className="t-body-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
                Every Arctic-policy query traverses these six stages.
                Each stage exists because a simpler version was tried
                and failed.
              </p>

              {/* Stage list with progress dots */}
              <ol className="flex flex-col gap-2 mt-2">
                {STAGES.map((s, i) => (
                  <StageRow
                    key={s.label}
                    index={i}
                    label={s.label}
                    rgb={accents[s.accent] || accents["--accent-primary"]}
                    progress={stageProgress}
                  />
                ))}
              </ol>
            </div>
          </aside>

          {/* Right column: stage cards */}
          <div className="flex flex-col gap-8">
            {STAGES.map((s, i) => (
              <StageCard
                key={s.label}
                stage={s}
                index={i}
                rgb={accents[s.accent] || accents["--accent-primary"]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageRow({ index, label, rgb, progress }) {
  // Each row reads stageProgress and lights its dot once the user has
  // scrolled past index + 0.4 (so it activates as the stage card hits
  // mid-viewport, not just when it first appears).
  const opacity = useTransform(progress, (p) =>
    p > index + 0.4 ? 1 : 0.35
  );
  const scale = useTransform(progress, (p) =>
    p > index + 0.4 ? 1 : 0.85
  );

  return (
    <li className="flex items-center gap-3">
      <motion.span
        style={{ opacity, scale }}
        className="block w-2 h-2 rounded-full"
      >
        <span
          className="block w-full h-full rounded-full"
          style={{
            background: `rgb(${rgb})`,
            boxShadow: `0 0 12px rgba(${rgb}, 0.85)`,
          }}
        />
      </motion.span>
      <motion.span
        className="t-mono-sm font-semibold"
        style={{
          opacity,
          color: `rgb(${rgb})`,
          letterSpacing: "0.16em",
        }}
      >
        {String(index + 1).padStart(2, "0")} · {label}
      </motion.span>
    </li>
  );
}

function StageCard({ stage, index, rgb }) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
      style={{
        // Saturated 2px border in the stage's color, plus a coloured
        // shadow so the card actually carries weight in light mode.
        border: `2px solid rgba(${rgb}, 0.55)`,
        boxShadow: `0 18px 40px -22px rgba(${rgb}, 0.7), 0 0 0 1px rgba(${rgb}, 0.25) inset`,
      }}
    >
      {/* Thick coloured rail on the left edge so the card reads as
          part of a coloured pipeline at a glance. */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1.5 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgb(${rgb}), rgba(${rgb}, 0.6))`,
          boxShadow: `0 0 16px rgba(${rgb}, 0.6)`,
        }}
      />

      {/* Strong accent wash in the top-right corner. */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(${rgb}, 0.32), transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative flex items-start gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, rgb(${rgb}), rgba(${rgb}, 0.7))`,
            color: "#fff",
            boxShadow: `0 10px 24px -8px rgba(${rgb}, 0.75), 0 0 0 1px rgba(${rgb}, 1) inset`,
          }}
        >
          <Icon size={24} strokeWidth={2.4} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="t-mono-sm font-bold"
            style={{
              color: `rgb(${rgb})`,
              letterSpacing: "0.2em",
            }}
          >
            STAGE {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="t-h3 text-[var(--text-primary)] mt-1">
            {stage.label}
          </h3>
        </div>
        <div
          className="t-mono-sm shrink-0 px-4 py-1.5 rounded-full font-bold"
          style={{
            color: "#fff",
            background: `linear-gradient(135deg, rgb(${rgb}), rgba(${rgb}, 0.78))`,
            letterSpacing: "0.14em",
            boxShadow: `0 8px 18px -6px rgba(${rgb}, 0.7), 0 0 0 1px rgba(${rgb}, 1) inset`,
          }}
        >
          {stage.metric}
        </div>
      </div>
      <p className="relative t-body text-[var(--text-body)] leading-relaxed">
        {stage.body}
      </p>
    </motion.div>
  );
}
