/**
 * Long-form case-study content keyed by project id.
 * Only projects with an entry here get a /projects/[slug] page; the rest
 * still appear on the Projects grid + modal.
 */
export const caseStudies = {
  "dapse": {
    title: "DAPSE · Arctic Policy Intelligence Engine",
    subtitle: "AI Engineer · NSI · Feb 2026 to Present",
    accent: "--accent-primary",
    problem:
      "JAG officers analyzing Arctic geopolitics across nine nations need to reason about treaty law, bilateral policy, and cross-country risk in minutes, not weeks. Off-the-shelf RAG hallucinates citations under pressure, and stitching together unclassified policy documents in inconsistent formats was eating analyst time. The system had to deliver grounded legal intelligence while never inventing a citation that didn't exist in the corpus.",
    decision:
      "Build a five-layer FastAPI backend (~15,000 lines of Python across 80+ modules) with two analytical pipelines: a 10–30s chat pipeline for single questions and a 60–180s seven-stage scenario pipeline for full intelligence reports. Hybrid retrieval (BM25 + FAISS + Exa.ai neural web) is fused with Reciprocal Rank Fusion. Every report is then run through 12+ post-composition enforcement gates and an LLM claim audit so unsupported findings get downgraded or removed before the response leaves the server.",
    architecture: [
      "Five-layer architecture: HTTP transport (FastAPI + GZip + CORS + Prometheus + Auth middleware) → pipeline orchestration (chat_service, scenario_pipeline at 2,723 lines, job_manager, checkpoint, scheduler) → retrieval / LLM / analysis modules → SQLite (WAL) + FAISS data layer.",
      "Curated corpus: ~2.8 GB of Arctic policy documents in SQLite WAL — treaty text, government strategies, academic analyses, authoritative journalism — segmented with section-aware parent-child chunking. 224,000+ text-embedding-3-small (1,536-dim) vectors live in a FAISS IVF index with nprobe=10 for ~95% recall at 10x speedup over exhaustive search.",
      "Hybrid retrieval: parallel BM25 (lexical, with IDF-weighted query construction) + FAISS (dense semantic) + Exa.ai neural web search, blended through Reciprocal Rank Fusion (RRF_K=60). A cross-encoder reranker (gpt-5-nano with structured rubric, Cohere Rerank v3.5 fallback) scores ~50 candidates before composition. Sources are tagged into four authority tiers (1A binding law, 1B official non-binding, 2 trusted secondary, 3 other) — every downstream stage is tier-aware.",
      "Three-tier LLM strategy on the OpenAI GPT-5 family: gpt-5-nano for structured-JSON tasks (parsing, evaluation, verification, claim audit), gpt-5-mini for prose and reasoning (answer + report composition), gpt-5.1-chat-latest as the escalation tier when the verifier flags HIGH-severity issues. Every model has a fallback chain so a single rate limit can't take the system down.",
      "Seven-stage scenario pipeline (RETRIEVE → RERANK → EVALUATE → COMPOSE → ANALYZE → AUDIT → FINALIZE) under a 300s budget. Each stage computes its own timeout from elapsed time and reserves headroom for downstream stages, gracefully skipping optional steps (re-search, claim audit) if budget is tight. Adaptive re-search and Legal Authority Augmentation kick in when evidence is thin.",
      "Twelve+ post-composition enforcement gates: Law-Tag Compliance downgrades [LAW] findings that cite only non-binding sources; Snippet Provenance fuzzy-matches every quoted span against the evidence pack; an Abstention Gate forces PROCEED / HEDGE / ABSTAIN based on attribution levels and verdict distribution; Evidence-First mode validates an 80% support-coverage threshold and falls back to classic composition if it isn't met.",
      "Eight-dimension risk scoring (sovereignty, treaty, military, maritime, environmental, diplomatic, economic, cascade) with confidence-weighted keyword corpora, sigmoid-saturated scores, action-adaptive dimension weights across 14 domain profiles, and three Commander's Intent presets (Conservative / Balanced / Aggressive). Cross-country conflict detection (890 lines) classifies typed contradictions and feeds them back into the risk profile.",
      "Operational layer: thread-safe SQLite connection pool (threading.local() with async-safety guards), checkpoints.db for crash recovery, optimistic locking on the jobs table, APScheduler for RSS + incremental embeddings every 6h, circuit breakers on Exa.ai with 30s cooldown after consecutive 429s, prompt-injection stripping on every input, URL stripping on every LLM output. Langfuse traces every LLM call; Prometheus exposes /metrics for HTTP latency and in-flight gauges.",
    ],
    tried: [
      "Single-tier verification ballooned cost without raising accuracy. Splitting into draft (gpt-5-mini) → critique (gpt-5-nano) → escalate (gpt-5.1-chat-latest) only on HIGH-severity flags cut spend ~75–80% versus naive top-tier-only routing while keeping the quality safety net.",
      "Pure dense retrieval missed citation-precise legal language; pure BM25 missed semantic intent. Reciprocal Rank Fusion across BM25 + FAISS + Exa.ai web with authority-tier multipliers gave better recall than either index alone and let high-authority Tier 1 sources surface even when their phrasing didn't match the query.",
      "Naive paragraph chunking wrecked retrieval over treaty-heavy documents. Section-aware parent-child chunking preserved the structural meaning (articles, sub-paragraphs, footnotes) and made citations point at the actual legal unit, not a stray paragraph.",
      "An early version had the LLM compose reports directly from raw evidence chunks. Hallucination crept in around dense legal text. The Evidence-First path now clusters evidence into atomic assertions with explicit chunk provenance, then composes from assertions — the report → assertion → chunk → source chain is preserved end-to-end.",
      "First scenario pipeline blew the 300s budget when the compose stage starved finalization. Switched to per-stage budget-aware timeouts that reserve downstream headroom and skip optional stages (re-search, claim audit) gracefully instead of cascading into a timeout failure.",
      "Trusting LLM-generated quotes was a non-starter. The Snippet Provenance gate now fuzzy-matches every quoted span (80% threshold) against the evidence pack and rewrites or downgrades findings whose quotes were paraphrased into something the source never said.",
    ],
    metric: { value: "~15,000", label: "Lines of Python across 80+ backend modules" },
    screenshots: [
      {
        src: "/projects/dapse/scenario-tab.png",
        alt: "Scenario analysis input — JAG-style geopolitical scenario being submitted",
        caption:
          "Scenario input. Analyst pastes a real Arctic geopolitical scenario; the parser extracts structured actions, affected countries, and instruments before retrieval starts.",
      },
      {
        src: "/projects/dapse/pipeline-running.png",
        alt: "Seven-stage scenario pipeline streaming progress in real time",
        caption:
          "Seven-stage pipeline mid-run. RETRIEVE → RERANK → EVALUATE → COMPOSE → ANALYZE → AUDIT → FINALIZE under a 300-second total budget, with per-stage timeouts that reserve headroom for downstream work.",
      },
      {
        src: "/projects/dapse/situation-awareness.png",
        alt: "Situation awareness view with country-by-country risk dimensions",
        caption:
          "Situation awareness view. Eight-dimension risk profile (sovereignty, treaty, military, maritime, environmental, diplomatic, economic, cascade) computed per country with confidence-weighted, action-adaptive scoring.",
      },
      {
        src: "/projects/dapse/technical-details.png",
        alt: "Technical details panel showing retrieval, citations, and per-claim grounding",
        caption:
          "Technical details panel. Every finding traces back through the chain: report → assertion → evidence chunk → source document, with claim audit verdicts (SUPPORTED / PARTIALLY_SUPPORTED / NOT_SUPPORTED) attached.",
      },
      {
        src: "/projects/dapse/system-health.png",
        alt: "System health dashboard with FAISS index status, LLM cost, and circuit breaker state",
        caption:
          "System health. Live signals on FAISS warmup, Exa.ai circuit-breaker state, Langfuse cost trace, and Prometheus latency gauges — operational visibility for a system that runs autonomous LLM pipelines.",
      },
    ],
    stack: [
      "Python 3.11+",
      "FastAPI",
      "SQLite (WAL)",
      "FAISS IVF",
      "OpenAI GPT-5",
      "text-embedding-3-small",
      "BM25",
      "Exa.ai",
      "Cohere Rerank",
      "Reciprocal Rank Fusion",
      "Pydantic v2",
      "APScheduler",
      "Langfuse",
      "Prometheus",
    ],
  },

  "sla-breach-prediction": {
    title: "Ticket Resolution & SLA Breach Prediction",
    subtitle: "ITSM Analytics · Oct – Nov 2025",
    accent: "--accent-success",
    problem:
      "Enterprise IT teams routinely breach SLAs because by the time a ticket looks at-risk, the resolution clock has already run out. Most ServiceNow / Jira deployments only react after the breach has happened.",
    decision:
      "Treat SLA breach as a forward-looking classification problem and resolution time as a regression problem, both fed by the same engineered ticket features (priority, queue, time-of-day, first-response delta, assignee load).",
    architecture: [
      "5,000-ticket synthetic dataset modelled on real ServiceNow/Jira logs (priority distributions, escalation patterns, region timezones).",
      "Feature engineering: time-since-creation, time-of-day cyclical encoding, priority × queue interaction, assignee load at ticket time.",
      "XGBoost regressor for resolution-time estimation; XGBoost classifier for breach probability. Stratified k-fold by priority.",
      "Power BI dashboard binds to model outputs: open-ticket queue with breach probability + ETA, plus a 30-day backward-looking pattern view.",
    ],
    tried: [
      "Started with a Random Forest baseline. Underperformed XGBoost on minority-class breach detection by ~9 F1.",
      "Added LightGBM as a third candidate; marginal gains, not worth the deployment overhead.",
      "First attempt at the breach classifier used pure logistic regression on engineered features. Calibration was good but recall on actual breaches was below 0.6.",
    ],
    metric: { value: "5,000+", label: "Tickets modelled end-to-end" },
    stack: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Power BI"],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug) {
  return caseStudies[slug] || null;
}
