"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Check, Loader2 } from "lucide-react";

const STAGES = [
  { id: "retrieve", label: "RETRIEVING", duration: 800 },
  { id: "rank", label: "RANKING", duration: 700, detail: "BM25: 0.82 | Neural: 0.91 | Hybrid: 0.94" },
  { id: "generate", label: "GENERATING", duration: 1200 },
  { id: "complete", label: "COMPLETE", duration: 0 },
];

const ANSWER =
  "Arctic policy frameworks across 9 nations show divergent approaches to indigenous land rights. Canada and Norway emphasize co-management, while Russia prioritizes strategic resource access. Key risk factors include climate-driven displacement and treaty interpretation gaps.";

export default function DapseQuerySim() {
  const [stageIdx, setStageIdx] = useState(-1);
  const [answerChars, setAnswerChars] = useState(0);

  const running = stageIdx >= 0 && stageIdx < STAGES.length - 1;

  const run = () => {
    setStageIdx(0);
    setAnswerChars(0);
  };

  useEffect(() => {
    if (stageIdx < 0 || stageIdx >= STAGES.length - 1) return;
    const s = STAGES[stageIdx];
    const t = setTimeout(() => {
      setStageIdx((i) => i + 1);
    }, s.duration);
    return () => clearTimeout(t);
  }, [stageIdx]);

  useEffect(() => {
    if (stageIdx !== 2) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setAnswerChars(i);
      if (i >= ANSWER.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [stageIdx]);

  const currentStage = stageIdx >= 0 ? STAGES[stageIdx] : null;

  return (
    <div className="glass-card p-6 md:p-8 font-mono-var">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="t-mono-sm text-[var(--text-muted)] mb-2">query&gt;</div>
          <div className="t-body text-[var(--text-primary)]">
            What is Arctic policy risk for indigenous communities?
          </div>
        </div>
        <button
          onClick={run}
          disabled={running}
          data-cursor
          data-cursor-label={running ? "Running" : "Run query"}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full t-mono-sm bg-[var(--accent-primary)] text-white hover:brightness-110 disabled:opacity-60 transition"
        >
          {running ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Play size={14} />
          )}
          {running ? "Processing" : "Run Query"}
        </button>
      </div>

      {/* Stages */}
      <div className="flex flex-col gap-3 min-h-[120px]">
        <AnimatePresence>
          {stageIdx >= 0 &&
            STAGES.slice(0, stageIdx + 1).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 t-mono-sm"
              >
                {i < stageIdx || stageIdx === STAGES.length - 1 ? (
                  <Check size={14} className="text-[var(--accent-success)]" />
                ) : (
                  <Loader2 size={14} className="animate-spin text-[var(--accent-primary)]" />
                )}
                <span className="text-[var(--text-primary)]">[{s.label}]</span>
                {s.detail && (
                  <span className="text-[var(--text-muted)]">{s.detail}</span>
                )}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Answer */}
      {stageIdx >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg bg-[var(--bg-hover)] border border-[var(--border-subtle)] t-body text-[var(--text-body)] leading-relaxed"
        >
          {ANSWER.slice(0, answerChars)}
          {answerChars < ANSWER.length && (
            <span
              className="inline-block w-[2px] h-[1em] ml-0.5 bg-[var(--accent-primary)] align-middle"
              style={{ animation: "typewriter-cursor 1s step-end infinite" }}
            />
          )}
          {answerChars === ANSWER.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {["ArcticCouncil_2023.pdf §4.2", "UN_Decl_Indigenous §10", "Norway_WhitePaper §2.7"].map((c) => (
                <span
                  key={c}
                  className="t-mono-sm px-2 py-1 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] bg-[var(--accent-primary)]/5"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
