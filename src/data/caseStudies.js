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
      "JAG officers analyzing Arctic policy across nine nations face thousands of unclassified policy documents in inconsistent formats. Standard search returns keyword matches without legal context, and naive RAG hallucinates citations under pressure.",
    decision:
      "Build a hybrid retrieval pipeline that fuses lexical (BM25), dense vector (FAISS), and neural web search (Exa.ai), then route every retrieval through a multi-tier LLM verification gate so unsupported claims never reach the response.",
    architecture: [
      "Async Python 3.13 / FastAPI backend serving JAG analysts.",
      "Ingestion: 1,192 policy sources (519 government, 673 supporting) across 9 Arctic nations. Section-aware segmentation + parent-child chunking + dedup. Output: 25,565 searchable chunks, 4,377 extracted policy objectives.",
      "OpenAI 1,536-dim embeddings indexed in FAISS, with BM25 lexical sidecar. Multi-query rewriting + Reciprocal Rank Fusion across both indexes plus Exa.ai neural web results.",
      "Three-tier LLM verification (OpenAI GPT-5 family) with automatic escalation, citation grounding, and per-claim hallucination detection. Inference cost optimisation cuts spend ~75–80% vs. naive top-tier-only routing.",
      "Storage layer: SQLite/FTS5 + FAISS. HMAC API auth, rate limiting, defense-in-depth guardrails.",
      "Observability: Langfuse integration, per-request cost tracking, audit logging.",
    ],
    tried: [
      "Initial design used a single-tier LLM call after retrieval. Cost ballooned and verification quality plateaued. Splitting verification into draft → critique → finalize tiers cut spend without dropping accuracy.",
      "Pure dense retrieval missed citation-precise answers; pure BM25 missed semantic intent. Reciprocal Rank Fusion gave better recall than either alone.",
      "Tested raw paragraph chunking. Section-aware + parent-child chunking improved retrieval precision because policy documents have heavy structural meaning (titles, treaty articles, footnotes).",
    ],
    metric: { value: "75–80%", label: "LLM cost reduction vs. naive routing" },
    stack: ["Python 3.13", "FastAPI", "FAISS", "BM25", "OpenAI", "Langfuse", "SQLite", "Exa.ai"],
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
