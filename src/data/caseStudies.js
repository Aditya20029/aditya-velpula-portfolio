/**
 * Long-form case-study content keyed by project id.
 * Only projects with an entry here get a /projects/[slug] page; the rest
 * still appear on the Projects grid + modal.
 */
export const caseStudies = {
  "dapse": {
    title: "DAPSE · Arctic Policy Intelligence Engine",
    subtitle: "AI Engineer · NSI Partner Org · Feb 2026 to Present",
    accent: "--accent-primary",
    problem:
      "JAG officers reasoning about Arctic policy across 21 countries don't have weeks to read treaty law before they answer a question. Off-the-shelf RAG was the obvious starting point, but it kept hallucinating citations the moment the legal text got dense, and stitching together unclassified policy documents in a dozen inconsistent formats was eating most of the analyst's time. We needed grounded legal intelligence in minutes, and we needed it to never invent a citation that wasn't already sitting in the corpus, defensible enough to ship under the DAPSE 3.0 program.",
    decision:
      "I architected the backend RAG pipeline as a hierarchical ingestion + hybrid retrieval + Evidence-First reasoning stack on FastAPI. 1,630 policy sources across 21 countries get chunked into 257K embedded units and 25,634 extracted policy objectives. Retrieval is BM25 + FAISS with 3-query rewrites, RRF fusion (K=60), and an AI reranker. A 4-tier authority-weighting framework propagates source credibility through retrieval, reranking, composition, and 5 downstream quality gates so an unsupported finding never makes it into a JAG-grade brief.",
    architecture: [
      "Hierarchical ingestion: PDF, HTML, and DOCX sources flow through cleaning, then section segmentation, then parent-child chunking, then FAISS + BM25 indexing. Contextual chunk headers are prepended before embedding so the dense-vector signal doesn't lose its parent context, which lifted retrieval precision noticeably.",
      "Hybrid retrieval blends BM25 (lexical) and FAISS (dense semantic) with three rewritten queries per request, fused via Reciprocal Rank Fusion (K=60) and finished with an AI reranker. On a 35-query golden evaluation set the pipeline lands nDCG@5 = 0.832 and Precision@5 = 0.954.",
      "4-tier authority-weighting framework: binding legal, official non-binding, trusted secondary, other. The tier rides every source through retrieval, reranking, and composition, and gates 5 downstream quality checks that enforce JAG-grade defensibility (any [LAW]-tagged finding that cites only non-binding sources gets downgraded automatically).",
      "Evidence-First reasoning: cluster, assert, authority, quote, render. The composer doesn't see raw chunks; it sees atomic assertions tied back to specific spans, so hallucinated citations have nowhere to enter the report. A 3-sentence BLUF cap is enforced on every generated brief.",
      "GPT-5 model lineup wired into the pipeline: gpt-5-nano for structured-JSON work (parsing, evaluation, verification, reranker rubric), gpt-5-mini for prose generation, gpt-5.1-chat for escalation when the verifier flags a HIGH-severity issue. Each model has a fallback chain so a single rate limit can't take the system down.",
      "Data layer is SQLite in WAL mode plus a FAISS IVF index. Langfuse traces every LLM call (token, latency, reasoning, cost) and Prometheus exposes /metrics for HTTP histograms and in-flight gauges. DOCX-exportable briefs feed a 7-tab Next.js situation-awareness dashboard so analysts get the same evidence chain in legal memo form and in interactive UI form.",
      "1,481 passing tests across retrieval, scoring, and composition modules certified the system for hand-off to NSI under DAPSE 3.0. Coverage included tier-propagation invariants, RRF-stability checks, BLUF-cap enforcement, and authority-downgrade integration tests so regressions in the JAG-grade defensibility properties surface in CI before they reach an analyst.",
    ],
    tried: [
      "First retrieval iteration was pure dense FAISS over chunked text. It missed citation-precise legal language constantly because a treaty article and a paraphrased academic summary embed too close together. Adding BM25 with IDF-weighted query construction and blending via RRF (K=60) was the single biggest precision lift; pure dense or pure lexical alone never matched the hybrid on the golden eval.",
      "Naive paragraph chunking wrecked retrieval over treaty-heavy documents. Section-aware parent-child chunking with contextual headers prepended at embed time preserved the structural meaning (articles, sub-paragraphs, footnotes) and stopped citations from pointing at stray paragraphs.",
      "Early on the composer was given raw evidence chunks and asked to write the report directly. Hallucination crept in around dense legal text every time. The Evidence-First path now clusters evidence into atomic assertions with explicit chunk provenance, then composes from those assertions. The full chain (report, assertion, chunk, source) survives end to end.",
      "Single-tier verification (one big LLM call after retrieval) was slow and expensive without raising accuracy. Splitting the work across the GPT-5 lineup (nano for verification, mini for prose, 5.1-chat as escalation only on HIGH-severity flags) cut spend dramatically while keeping the quality safety net.",
      "Trusting LLM-generated quotes was a non-starter. The Snippet Provenance check now fuzzy-matches every quoted span against the evidence pack and rewrites or downgrades any finding whose quote got paraphrased into something the source never said.",
    ],
    metric: { value: "0.954", label: "Precision@5 on the 35-query golden evaluation set" },
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
      "Python",
      "FastAPI",
      "SQLite (WAL)",
      "FAISS IVF",
      "BM25",
      "OpenAI GPT-5 (nano / mini / 5.1-chat)",
      "Reciprocal Rank Fusion",
      "AI Reranker",
      "Langfuse",
      "Prometheus",
      "Next.js",
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

  "wildfire-prediction": {
    title: "Wildfire Risk Prediction",
    subtitle: "Climate Data x Machine Learning",
    accent: "--accent-warm",
    problem:
      "Fire seasons keep getting longer and the agencies that have to staff them are still mostly reactive. Detection (where is something burning right now) is well covered by satellites. Risk prediction (where is something likely to ignite this week) is harder, because it lives at the intersection of three messy data sources that each speak their own coordinate system, sampling cadence, and missing-data convention.",
    decision:
      "Build a tree-ensemble pipeline that fuses MODIS satellite fire signals, NOAA climate variables, and NDVI vegetation indices into a single feature table, then train Random Forest and XGBoost classifiers side by side on it. Pick the one that holds up under cross-validation, and produce Python visualisations of high-risk zones plus the predictors that matter most so a fire officer can read the why, not just the score.",
    architecture: [
      "Data sources: MODIS active-fire and burned-area products (NASA), NOAA daily climate (temperature, humidity, wind, precipitation), and NDVI vegetation indices on a regular grid.",
      "GeoPandas pipeline to align everything onto a common spatial grid, handle reprojection, and snap the climate and vegetation rasters to the satellite fire labels.",
      "Feature engineering: rolling humidity and temperature windows, elevation, distance-to-historic-fires, and a vegetation-stress proxy from NDVI deltas.",
      "Two-model bake-off: Random Forest for an interpretable baseline, XGBoost for the higher-capacity contender. Stratified k-fold by region so the model isn't just learning latitude.",
      "Visualisation layer in Python (matplotlib + GeoPandas choropleths) showing predicted risk heatmaps and the top SHAP-style predictors driving each region's score.",
    ],
    tried: [
      "Started with a logistic regression baseline on raw climate variables. AUC stalled around 0.78 because the relationships were nonlinear and the class imbalance ate the gradient signal.",
      "Treated each pixel as IID at first, which leaked spatial correlation across folds and inflated AUC. Switched to region-stratified CV and the honest number was lower but actually trustworthy.",
      "Tried oversampling the positive class with SMOTE. It helped recall a little but hurt calibration. Class weights inside XGBoost gave better numbers without distorting the probability output.",
    ],
    metric: { value: "0.99", label: "AUC-ROC on held-out region-stratified folds" },
    stack: ["Python", "XGBoost", "Random Forest", "GeoPandas", "NOAA", "MODIS", "NDVI"],
  },

  "electricity-analytics": {
    title: "U.S. Electricity-Rate Analytics",
    subtitle: "DIKW-Driven IOU vs Non-IOU Pricing Study",
    accent: "--accent-secondary",
    problem:
      "Regulators and consumer-advocacy groups argue constantly about whether investor-owned utilities (IOUs) charge meaningfully more than public, co-op, or municipal (Non-IOU) providers. The arguments tend to be anecdotal because the underlying rate filings are messy, fragmented across states, and rarely compared on a common basis. The question I wanted to actually answer: across 320,000+ rate records from 2020 to 2023, is there a real, statistically defensible price gap, and where does it concentrate?",
    decision:
      "Run the analysis through the DIKW framework (Data, Information, Knowledge, Wisdom) so each layer of conclusion is anchored to a concrete artifact: clean tables at the Data layer, statistical tests at Information, clusters and forecasts at Knowledge, and policy-readable insights at Wisdom. Use t-tests and regression for the headline gap claim, not eyeballed averages.",
    architecture: [
      "Ingested 320,000+ rate records spanning 2020 to 2023 across all U.S. states and rate sectors (residential, commercial, industrial, transportation).",
      "Cleaned and normalized the data into a single SQL schema with consistent units (cents per kWh) and ownership classification (IOU vs Non-IOU).",
      "Statistical testing: Welch's t-test for the IOU vs Non-IOU mean comparison per sector, plus regression with state, year, and sector as controls so the gap isn't just a regional artifact.",
      "Clustering on rate trajectories to group states by pricing behavior, surfacing distinct profiles like 'high-base-but-stable' vs 'low-base-but-volatile'.",
      "Forecasting layer to project 2024+ trajectories with inflation as a covariate, so regulators can see expected divergence and not just historical lag.",
      "Plotly dashboards at every layer so a non-technical reader can drill from the headline gap into a state, then a sector, then the underlying records.",
    ],
    tried: [
      "First pass just averaged rates by ownership type. The gap looked huge but disappeared once you controlled for state mix, because Non-IOU coverage skews to lower-cost regions. Welch's t-test plus regression with controls was the honest answer.",
      "Tried K-means on raw price levels for the clustering step, which mostly recovered 'expensive states vs cheap states'. Switching to clustering on year-over-year deltas surfaced the actually interesting profiles.",
      "Forecast started as an ARIMA per state. Too many series, too many state-specific shocks (Texas 2021, California rate cases). A simpler trend + inflation regression generalized better and was easier to defend.",
    ],
    metric: { value: "320,000+", label: "Rate records analyzed end to end" },
    stack: ["Python", "SQL", "Pandas", "SciPy", "Statistical Modeling", "Clustering", "Forecasting", "Plotly"],
  },

  "license-plate-detection": {
    title: "License Plate Detection",
    subtitle: "Real-Time YOLO + OCR Pipeline",
    accent: "--accent-coral",
    problem:
      "Off-the-shelf OCR is solved on clean documents and very much not solved on a real license plate at dusk, photographed at an angle, with a glare strip across half the characters. Most reference pipelines either have the detection model bolted to a rigid OCR with no preprocessing, or they preprocess so aggressively that they destroy the very characters they're trying to read. I wanted a pipeline that handles the full real-world variability without leaning on a single component to do it all.",
    decision:
      "Split the work cleanly: YOLO for plate localization (it's good at finding rectangles), OpenCV for the messy preprocessing in between, and an OCR engine for the final character read. Tune each stage on the part of the data it actually struggles with rather than treating the pipeline as a black box.",
    architecture: [
      "YOLO object detector trained to localize the plate inside the full frame with a tight bounding box. Iterated through dataset augmentation (rotation, brightness, motion blur) and bounding-box refinement until detection held up on hard frames.",
      "OpenCV preprocessing: perspective correction, adaptive thresholding, and morphological cleanup so the plate looks more like the OCR engine's training distribution.",
      "OCR pass on the cleaned crop, with a confidence threshold. Low-confidence reads are kicked back to a fallback path that tries alternate preprocessing settings before accepting a result.",
      "Post-processing: regex-style validation against known plate formats per region so an OCR'd '8' that should be a 'B' can be corrected before the read reaches the consumer.",
      "Real-time loop tuned for per-frame latency, with the detector and the OCR running on separate handles so a bad frame doesn't stall the next one.",
    ],
    tried: [
      "Started with a vanilla pretrained OCR on raw frames. Accuracy collapsed as soon as the plate was off-axis or had glare. Adding the YOLO localization step and tight cropping was the single biggest win.",
      "Tried a heavier preprocessing chain (sharpen + denoise + binarize) that destroyed thin characters like 1 and I. Backed off to a lighter touch and let the OCR engine do more of the work.",
      "Tested a single-stage end-to-end model that outputs characters directly from the full frame. Inference was faster but accuracy on hard frames was clearly worse. The split-stage pipeline kept the win.",
    ],
    metric: { value: "Real-time", label: "Per-frame detection + read latency budget" },
    stack: ["Python", "YOLO", "OCR", "OpenCV", "Computer Vision", "Deep Learning"],
  },

  "movie-recommender": {
    title: "Hybrid Movie Recommender",
    subtitle: "Collaborative + Content + Sentiment",
    accent: "--accent-tertiary",
    problem:
      "Pure collaborative filtering hits a wall on cold-start users, pure content-based filtering recommends six versions of the same thing forever, and most production systems quietly under-optimize for diversity, novelty, and serendipity in pursuit of click-through. I wanted a recommender that explicitly trades for those three qualities and lets the user see the trade-off rather than hiding it behind a single 'recommended for you' rail.",
    decision:
      "Blend three signals (content similarity, collaborative neighborhood, and review sentiment) and expose the blend weights so the user can dial in their own preference between safe and adventurous. Run on a Flask backend, build a responsive React frontend, and report diversity, novelty, and serendipity alongside the recommendation list so the trade-off is legible.",
    architecture: [
      "Content vectors built from genre, cast, director, and a text representation of the synopsis. Cosine similarity gives the content-side neighbors.",
      "Collaborative filtering layer using a user-item interaction matrix; nearest-user neighborhoods drive the second signal.",
      "Sentiment pass over user reviews with an NLP pipeline so a movie with five 'okay' reviews scores differently from one with five 'unforgettable' reviews even if their average ratings tie.",
      "Jaccard similarity for the diversity term: the system actively penalizes a slate of recommendations that overlap too heavily on cast or genre.",
      "Flask backend exposes a /recommend endpoint; React frontend gives real-time search, slider controls for blend weights, and a metrics panel that surfaces diversity, novelty, and serendipity per slate.",
    ],
    tried: [
      "Pure content-based first. Worked great for a single seed movie, terrible at varying the slate. Anything you liked, you got fifteen near-clones of.",
      "Pure collaborative second. Better diversity but cold-start was painful; new users got popular-movie defaults until they rated enough titles.",
      "Tried weighted average of the three signals with fixed weights. The 'right' weight depended heavily on the user, so I exposed the sliders and let them tune live.",
    ],
    metric: { value: "3-signal", label: "Hybrid blend with live diversity / novelty / serendipity readout" },
    stack: ["Python", "Flask", "Recommender Systems", "NLP", "Sentiment Analysis", "React", "Pandas"],
  },

  "obesity-analytics": {
    title: "Obesity Risk Analytics",
    subtitle: "End-to-End AWS Data Pipeline",
    accent: "--accent-primary",
    problem:
      "Health risk data lives in one format on the clinical side, another on the public-health side, and a third inside whatever spreadsheet a researcher built last quarter. Building a useful obesity-risk dashboard means stitching all of that together repeatedly, and a local Python notebook isn't a real answer once anyone else needs to refresh the numbers.",
    decision:
      "Move the entire pipeline into AWS so ingestion, transformation, query, and visualization all live in one cloud-native stack and survive someone else clicking refresh. S3 for raw and curated zones, Glue for the ETL, Athena for the query layer, and QuickSight for the dashboards.",
    architecture: [
      "S3 bucket layout split into raw / staging / curated zones so a bad upload never silently corrupts the dashboards. Lifecycle rules expire the raw zone after a retention window.",
      "AWS Glue jobs handle the ETL: type coercion, unit normalization, deduplication, and a derived risk-score column based on standard BMI plus comorbidity flags.",
      "Athena sits on the curated parquet so analysts can run SQL directly without spinning up a database. Partitioned by ingestion date for predictable query cost.",
      "QuickSight dashboards bind to Athena views: population risk distribution, geographic heatmap, and a real-time drill-down on flagged high-risk cohorts.",
      "Python glue script (run from a small EC2 / Lambda combo) for the steps that don't fit Glue's templates well, e.g. cross-source deduplication.",
    ],
    tried: [
      "First version was a local Python notebook that everything ran out of. Worked for me, didn't survive the second person trying to use it. Migrating to S3 + Glue made the pipeline reproducible by anyone with IAM access.",
      "Tried storing curated data as CSV in S3 to keep things simple. Athena cost and scan time both spiked. Switched to Parquet with partitioning and per-query cost dropped sharply.",
      "Initial QuickSight dashboards queried raw tables directly. Refresh times were painful for end users. Materialized views in the curated zone fixed that without changing the dashboard configs.",
    ],
    metric: { value: "S3 → Glue → Athena → QuickSight", label: "Cloud-native pipeline, fully reproducible" },
    stack: ["AWS", "S3", "Glue", "Athena", "QuickSight", "Python", "Parquet", "SQL"],
  },

  "support-circle": {
    title: "Support Circle",
    subtitle: "Virtual Addiction-Support Platform",
    accent: "--accent-rose",
    problem:
      "Recovery from addiction is one of those things where the difference between making it through the week and not is often a single supportive conversation. Most general-purpose messaging apps weren't built around that, and most addiction-recovery apps focus on tracking and self-monitoring rather than peer connection. I wanted a chat-first platform where the support is the product, not a side feature.",
    decision:
      "Build a full-stack web app with React on the frontend so the chat experience feels modern and responsive, Python and Flask on the backend for auth and data management, and WebSockets for real-time messaging and notifications. Keep the auth flow tight because the user base is dealing with sensitive content and false confidence in privacy is worse than no confidence at all.",
    architecture: [
      "React frontend with a chat-first layout: persistent conversation list, threaded messaging, and notification badges that the user actually sees during the day.",
      "Flask backend handles authentication (hashed passwords, session management), profile data, and message persistence.",
      "WebSocket layer for real-time message delivery and typing indicators. REST endpoints for everything that doesn't need to be live (history, profile edits, group membership).",
      "Notification service that fans out to web push so a user doesn't have to keep the tab open to know someone reached out.",
      "Role-based access for moderators because peer support without a moderation layer eventually stops being supportive.",
    ],
    tried: [
      "First version polled the backend every few seconds for new messages. Worked, but the latency felt off and the battery drain on phones was noticeable. Switched to WebSockets and the experience changed completely.",
      "Tried storing messages with minimal metadata to keep the schema simple. Once moderators came online they wanted to filter by time, by group, by sender, by reported status. Added the indexes upfront in the next iteration so the queries didn't fall over.",
      "Initial notification design fired on every message. Users muted within a day. Coalesced notifications into per-conversation buckets with a configurable cooldown and engagement recovered.",
    ],
    metric: { value: "Chat-first", label: "Real-time peer support, full-stack" },
    stack: ["React", "Python", "Flask", "WebSockets", "Authentication", "Full-Stack"],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug) {
  return caseStudies[slug] || null;
}
