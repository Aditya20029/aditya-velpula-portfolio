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
      "JAG officers reasoning about Arctic geopolitics across nine nations don't have weeks to read treaty law before they answer a question. Off-the-shelf RAG was the obvious starting point, but it kept hallucinating citations the moment the legal text got dense, and stitching together unclassified policy documents in a dozen inconsistent formats was eating most of the analyst's time. We needed grounded legal intelligence in minutes, and we needed it to never invent a citation that wasn't already sitting in the corpus.",
    decision:
      "I built a five-layer FastAPI backend, roughly 15,000 lines of Python across 80 plus modules, with two analytical pipelines living on top of it. A short chat pipeline (10 to 30 seconds) handles single questions. A seven-stage scenario pipeline (60 to 180 seconds, hard 300-second budget) produces full intelligence reports. Retrieval is hybrid: BM25, FAISS, and Exa.ai neural web search running in parallel and fused with Reciprocal Rank Fusion. Every report then runs through 12 plus post-composition enforcement gates and a separate LLM claim audit, so any unsupported finding gets downgraded or removed before the response ever leaves the server.",
    architecture: [
      "Five layers, top to bottom. HTTP transport on FastAPI with GZip, CORS, Prometheus, and an Auth middleware. Pipeline orchestration on top of that (chat_service, the 2,723-line scenario_pipeline, job_manager, checkpoint, scheduler). Then the retrieval, LLM, and analysis modules. The data layer underneath is SQLite in WAL mode plus the FAISS index.",
      "Curated corpus is about 2.8 GB of Arctic policy material in SQLite WAL: treaty text, government strategies, academic analyses, authoritative journalism. Section-aware parent-child chunking preserves structure (articles, sub-paragraphs, footnotes). 224,000 plus text-embedding-3-small vectors (1,536-dim) live in a FAISS IVF index with nprobe=10, which gets us roughly 95% recall at a 10x speedup over exhaustive search.",
      "Hybrid retrieval runs BM25 (lexical, with IDF-weighted query construction), FAISS (dense semantic), and Exa.ai web search in parallel, then blends them via Reciprocal Rank Fusion (RRF_K=60). A cross-encoder reranker scores roughly 50 candidates before composition. Default reranker is gpt-5-nano with a structured rubric; Cohere Rerank v3.5 is the fallback. Every source carries an authority tier (1A binding law, 1B official non-binding, 2 trusted secondary, 3 other), and every downstream stage is tier-aware.",
      "LLM routing uses three tiers of the OpenAI GPT-5 family. gpt-5-nano handles the structured-JSON work (parsing, evaluation, verification, claim audit). gpt-5-mini handles the prose work (answer generation, report composition). gpt-5.1-chat-latest is the escalation tier, only fired when the verifier flags a HIGH-severity issue. Each model has its own fallback chain so a single rate limit can't take the system down.",
      "The seven-stage scenario pipeline runs RETRIEVE, RERANK, EVALUATE, COMPOSE, ANALYZE, AUDIT, FINALIZE under a 300-second total budget. Each stage computes its own timeout from elapsed time and reserves headroom for downstream stages. Optional steps like adaptive re-search and the claim audit are skipped gracefully when the budget gets tight, instead of cascading into a timeout.",
      "Post-composition enforcement is 12 plus deterministic gates running back to back. Law-Tag Compliance downgrades any [LAW] finding that cites only non-binding sources. Snippet Provenance fuzzy-matches every quoted span against the evidence pack. The Abstention Gate forces a PROCEED, HEDGE, or ABSTAIN decision based on attribution levels and verdict spread. Evidence-First mode requires 80% support coverage or it falls back to classic composition.",
      "Risk gets scored across eight dimensions: sovereignty, treaty, military, maritime, environmental, diplomatic, economic, cascade. The scoring uses confidence-weighted keyword corpora, sigmoid-saturated raw scores, action-adaptive dimension weights across 14 domain profiles, and three Commander's Intent presets (Conservative, Balanced, Aggressive). A separate 890-line conflict-detection module identifies typed contradictions across countries and feeds them back into the risk profile.",
      "The operational layer ties it all together. Thread-safe SQLite connection pool (threading.local with async-safety guards). checkpoints.db for crash recovery. Optimistic locking on the jobs table. APScheduler for RSS and incremental embeddings every 6 hours. Circuit breakers on Exa.ai with a 30-second cooldown after consecutive 429s. Prompt-injection stripping on every input, URL stripping on every LLM output. Langfuse traces every LLM call; Prometheus exposes /metrics for HTTP latency and in-flight gauges.",
    ],
    tried: [
      "Started with single-tier verification: one big LLM call after retrieval. Cost ballooned and accuracy plateaued. Splitting the verifier into draft (gpt-5-mini), critique (gpt-5-nano), and an escalation hop (gpt-5.1-chat-latest) only on HIGH-severity flags cut spend roughly 75 to 80% versus naive top-tier-only routing while keeping the quality safety net.",
      "Pure dense retrieval kept missing citation-precise legal language, and pure BM25 kept missing semantic intent. RRF across BM25, FAISS, and Exa.ai web (with authority-tier multipliers) gave better recall than either index alone, and let high-authority Tier 1 sources surface even when their phrasing didn't match the query.",
      "Naive paragraph chunking wrecked retrieval over treaty-heavy documents. Section-aware parent-child chunking preserved the structural meaning (articles, sub-paragraphs, footnotes) and made citations point at the actual legal unit instead of a stray paragraph.",
      "Early on I had the LLM compose reports straight from raw evidence chunks. Hallucination crept in around dense legal text. The Evidence-First path now clusters evidence into atomic assertions with explicit chunk provenance, then composes from those assertions. The full chain (report, assertion, chunk, source) survives end to end.",
      "First version of the scenario pipeline blew the 300-second budget when the compose stage starved finalization. Switched to per-stage budget-aware timeouts that reserve downstream headroom and skip optional stages (re-search, claim audit) gracefully instead of cascading into a timeout failure.",
      "Trusting LLM-generated quotes was a non-starter. Snippet Provenance now fuzzy-matches every quoted span (80% threshold) against the evidence pack and rewrites or downgrades any finding whose quote got paraphrased into something the source never said.",
    ],
    metric: { value: "~15,000", label: "Lines of Python across 80+ backend modules" },
    screenshots: [
      {
        src: "/projects/dapse/scenario-tab.png",
        alt: "Scenario analysis input view, JAG-style geopolitical scenario being submitted",
        caption:
          "Scenario input. Analyst pastes a real Arctic geopolitical scenario, and the parser extracts structured actions, affected countries, and instruments before retrieval starts.",
      },
      {
        src: "/projects/dapse/pipeline-running.png",
        alt: "Seven-stage scenario pipeline streaming progress in real time",
        caption:
          "Seven-stage pipeline mid-run: RETRIEVE, RERANK, EVALUATE, COMPOSE, ANALYZE, AUDIT, FINALIZE. Per-stage timeouts reserve headroom for downstream work under a 300-second total budget.",
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
          "Technical details panel. Every finding traces back through the chain (report, assertion, evidence chunk, source document), with claim audit verdicts (SUPPORTED, PARTIALLY_SUPPORTED, NOT_SUPPORTED) attached.",
      },
      {
        src: "/projects/dapse/system-health.png",
        alt: "System health dashboard showing FAISS index status, LLM cost, and circuit breaker state",
        caption:
          "System health. Live signals on FAISS warmup, Exa.ai circuit-breaker state, Langfuse cost trace, and Prometheus latency gauges. Operational visibility for a system that runs autonomous LLM pipelines.",
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
    subtitle: "ITSM Analytics · Oct to Nov 2025",
    accent: "--accent-success",
    problem:
      "Enterprise IT teams routinely breach SLAs because by the time a ticket starts looking at-risk, the resolution clock has already run out. Most ServiceNow and Jira deployments only react after the breach has already happened, which is too late to be useful.",
    decision:
      "Treat SLA breach as a forward-looking classification problem and resolution time as a regression problem. Both feed off the same engineered ticket features: priority, queue, time-of-day, first-response delta, assignee load.",
    architecture: [
      "5,000-ticket synthetic dataset modelled on real ServiceNow and Jira logs, including realistic priority distributions, escalation patterns, and region timezones.",
      "Feature engineering: time-since-creation, time-of-day cyclical encoding, priority by queue interaction, assignee load at ticket time.",
      "XGBoost regressor for resolution-time estimation, XGBoost classifier for breach probability. Stratified k-fold by priority.",
      "Power BI dashboard binds to model outputs: open-ticket queue with breach probability and ETA, plus a 30-day backward-looking pattern view.",
    ],
    tried: [
      "Started with a Random Forest baseline. It underperformed XGBoost on minority-class breach detection by roughly 9 F1.",
      "Added LightGBM as a third candidate. Marginal gains, not worth the deployment overhead.",
      "First attempt at the breach classifier used pure logistic regression on engineered features. Calibration was good, but recall on actual breaches was below 0.6.",
    ],
    metric: { value: "5,000+", label: "Tickets modelled end to end" },
    stack: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Power BI"],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug) {
  return caseStudies[slug] || null;
}
