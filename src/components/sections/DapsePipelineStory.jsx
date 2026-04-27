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

/**
 * Narrated DAPSE pipeline. As you scroll through this section, six
 * stages sweep through one at a time on the right. The left column
 * holds a sticky overview + animated stage-progress bar.
 *
 * This is content + storytelling, not a load-bearing section. Plain
 * sticky positioning + scrollYProgress on the section element. No
 * IntersectionObserver per stage to keep the cost low.
 */

const STAGES = [
  {
    icon: FileText,
    label: "Ingest",
    metric: "1,192 sources",
    body:
      "519 government documents + 673 supporting analyses, across 9 Arctic nations. Pulled into a normalized format with provenance tagging on every artifact.",
  },
  {
    icon: Layers,
    label: "Chunk",
    metric: "25,565 chunks",
    body:
      "Section-aware segmentation with parent-child chunking. Policy docs are full of structural meaning (treaty articles, footnotes, schedules), so naive paragraph splits would wreck retrieval.",
  },
  {
    icon: Database,
    label: "Embed + Index",
    metric: "1,536-dim vectors",
    body:
      "OpenAI embeddings stored in FAISS, with a BM25 lexical sidecar over the same chunks. Two indexes, one query plane.",
  },
  {
    icon: Search,
    label: "Hybrid Retrieve",
    metric: "Reciprocal Rank Fusion",
    body:
      "Multi-query rewriting hits BM25 + FAISS + Exa.ai neural web search in parallel. Results blend through Reciprocal Rank Fusion so we get lexical precision and semantic recall.",
  },
  {
    icon: ShieldCheck,
    label: "Verify",
    metric: "75 to 80% cost cut",
    body:
      "Three-tier LLM verification: draft → critique → finalize. Automatic escalation only when the critique tier flags grounding issues. Cost drops dramatically vs. naive top-tier-only routing.",
  },
  {
    icon: Send,
    label: "Respond",
    metric: "Citations · always",
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
            <div className="glass-card p-6">
              <div
                className="t-mono-sm mb-3"
                style={{
                  color: "var(--accent-primary)",
                  letterSpacing: "0.2em",
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
                    progress={stageProgress}
                  />
                ))}
              </ol>
            </div>
          </aside>

          {/* Right column: stage cards */}
          <div className="flex flex-col gap-8">
            {STAGES.map((s, i) => (
              <StageCard key={s.label} stage={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageRow({ index, label, progress }) {
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
        className="block w-1.5 h-1.5 rounded-full"
      >
        <span
          className="block w-full h-full rounded-full"
          style={{
            background: "var(--accent-primary)",
            boxShadow: "0 0 8px var(--accent-primary)",
          }}
        />
      </motion.span>
      <motion.span
        className="t-mono-sm"
        style={{
          opacity,
          color: "var(--text-secondary)",
          letterSpacing: "0.16em",
        }}
      >
        {String(index + 1).padStart(2, "0")} · {label}
      </motion.span>
    </li>
  );
}

function StageCard({ stage, index }) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "rgba(124, 212, 255, 0.12)",
            color: "var(--accent-primary)",
            border: "1px solid rgba(124, 212, 255, 0.3)",
          }}
        >
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="t-mono-sm"
            style={{
              color: "var(--accent-primary)",
              letterSpacing: "0.18em",
            }}
          >
            STAGE {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="t-h3 text-[var(--text-primary)] mt-1">
            {stage.label}
          </h3>
        </div>
        <div
          className="t-mono-sm shrink-0 px-3 py-1 rounded-full border"
          style={{
            color: "var(--accent-primary)",
            borderColor: "rgba(124, 212, 255, 0.3)",
            background: "rgba(124, 212, 255, 0.06)",
            letterSpacing: "0.12em",
          }}
        >
          {stage.metric}
        </div>
      </div>
      <p className="t-body text-[var(--text-body)] leading-relaxed">
        {stage.body}
      </p>
    </motion.div>
  );
}
