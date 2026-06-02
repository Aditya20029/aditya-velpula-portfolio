/**
 * Long-form case-study content keyed by project id.
 * Only projects with an entry here get a /projects/[slug] page; the rest
 * still appear on the Projects grid + modal.
 */
export const caseStudies = {
  "pulse": {
    title: "Pulse · Real-Time Global News Intelligence Globe",
    subtitle: "Solo Build · Live at global-pulse-ai.site · Apr 2026 to Present",
    accent: "--accent-tertiary",
    problem:
      "Live global news lives in two failure modes: too much (the firehose, where nothing is contextualized) and too little (the curated feed, where you only see what one editor decided to surface). I wanted a public artifact that did neither. Show every signal worth showing on a single canvas, geolocate it so the map carries the story, and have an LLM that can answer the question you actually have (what happened, why it matters, what's next) instead of summarizing what you already see.",
    decision:
      "Build a public 3D Earth that aggregates 1,000+ live events from 45+ sources every poll, clusters them spatially, and lets Claude Opus 4.7 stream an analyst briefing on any cluster you click. Architect as a solo Next.js 16 + Three.js app on Vercel so the entire stack stays deployable from a laptop. Treat reliability as a product feature, not an afterthought: every source has a graceful-degradation path, every Claude call is fingerprint-cached, every panel only talks to the LLM when it actually enters the viewport.",
    architecture: [
      "Frontend: Next.js 16, React 19, TypeScript end to end. Three.js + react-three-fiber render the globe with 8K NASA day, night, and bump textures, plus custom GLSL shaders for the day/night terminator, atmospheric scattering, and sentiment-reactive auroras that brighten under high-severity clusters.",
      "Ingestion: 45+ sources fanned out in parallel. GDELT 2.0 for events, 45 subreddits via reddit.com/.json, 45+ RSS feeds (Reuters, BBC, AP, Al Jazeera, NHK, Hacker News, etc.). Promise.allSettled with per-source timeouts so one slow feed cannot stall the request; the slowest source becomes a P99 outlier, not a page hang.",
      "Two-tier geocoding pipeline. First pass: headline matching against a curated 200+ place lexicon (cities, countries, regions, well-known landmarks). Fallback: newsroom-HQ resolver for 75+ outlets, so a Reuters story with no place named still anchors to London. Stories that still can't be located get dropped, not faked.",
      "Spatial clustering on a grid index with intensity scaling: cluster brightness, size, and color all read off event count plus weighted recency. Zustand holds the global state; SWR drives client polling on a calm cadence so the globe stays alive without thrashing the CPU.",
      "AI layer: Claude Opus 4.7 streams briefings through a ReadableStream so the first token lands in roughly 1 second instead of waiting 5 seconds for the full response. Each briefing covers what happened, why it matters, key actors, severity, and a 12-hour forecast. Multi-language toggle (Spanish, French, Hindi, Chinese, Arabic, German). Devil's-advocate and counterfactual reframing modes for analyst stress-testing.",
      "Cost + abuse controls: fingerprint-based 10-minute cache reuses Claude answers across identical globe states (same cluster, same source mix). Per-IP rate limiting. Lazy AI panels (only call Claude when scrolled into view). Server cache plus SWR client polling minimize upstream load.",
      "Reliability surface: every source has a graceful-degradation path; if Reddit 429s, Reddit results just don't appear (the globe doesn't break). A WebGL error boundary catches GPU failures and renders a flat-map fallback instead of a white screen.",
    ],
    tried: [
      "First version made one fan-out Promise.all() across all 45 sources. A single slow RSS feed could stall the entire response. Switched to Promise.allSettled with per-source timeouts so the slowest source becomes a P99 outlier instead of taking down the request.",
      "Early geocoding was pure named-entity recognition on headlines. Recall was fine; precision was awful (any mention of a place anchored there, even when the story was about something else). Two-tier matching (curated lexicon first, newsroom-HQ fallback second) lifted precision and kept stories from teleporting around the globe.",
      "Initial Claude calls fired on every panel mount. Cost ballooned and the UI hesitated. Lazy AI (call only when the panel intersects the viewport) plus a fingerprint cache (10-minute reuse for identical globe states) cut Claude spend dramatically without hurting perceived latency.",
      "Non-streamed responses felt unusable: 4 to 5 seconds of empty panel before the briefing landed. Streaming through a ReadableStream put the first token on screen in roughly a second, and the perceived latency dropped to nothing.",
      "First WebGL build assumed every visitor had a healthy GPU. Mobile + low-end laptops produced context-lost crashes. Added a WebGL error boundary that falls back to a flat 2D map so the product never white-screens.",
    ],
    metric: { value: "~1s", label: "First-token latency for streamed Claude briefings" },
    screenshots: [
      {
        src: "/projects/pulse/globe.png",
        alt: "Pulse 3D Earth with live event clusters lit across North and South America",
        caption:
          "The globe itself. 8K NASA day, night, and bump textures, an atmospheric scattering shader for the soft blue limb, a day/night terminator that sweeps across the surface in real time, and the moon orbiting in actual phase. Each colored marker is a clustered event group; cluster size and brightness scale with event count plus weighted recency, so a major story brightens the region instead of just adding a dot.",
      },
      {
        src: "/projects/pulse/dashboard.png",
        alt: "Pulse mission-control UI with the 3D globe, live channels panel, and tactical sidebar",
        caption:
          "Full mission control. Center: the globe with 134 active clusters across 1,094 live events in the last 24h. Left rail: live counts, timespan controls, layer toggles by category (Conflict, Politics, Economy, Climate, Wildlife, Tech, Science, Health, Culture, Other), velocity histogram, and financial-centers clock strip. Right rail: live channel grid pulling from Reuters, BBC, AP, Al Jazeera, NHK, Fox, Bloomberg, CNBC, DW, TRT World, WION, Africa News, Globo, France 24, and more. Far right: tactical readouts (earthquakes 24h, M5+ events, conflict counts, climate / wildlife tracking, critical clusters by intensity threshold).",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Three.js",
      "react-three-fiber",
      "GLSL Shaders",
      "WebGL",
      "Claude Opus 4.7",
      "Anthropic SDK",
      "ReadableStream",
      "Zustand",
      "SWR",
      "GDELT 2.0",
      "RSS",
      "Tailwind CSS",
      "Vercel",
    ],
  },

  "dapse": {
    title: "DAPSE · Arctic Policy Intelligence Engine",
    subtitle: "AI Engineer · NSI Apprenticeship via GMU · Jan to May 2026",
    accent: "--accent-primary",
    problem:
      "JAG officers reasoning about Arctic policy across 21 countries don't have weeks to read treaty law before they answer a question. Off-the-shelf RAG was the obvious starting point, but it kept hallucinating citations the moment the legal text got dense, and stitching together unclassified policy documents in a dozen inconsistent formats was eating most of the analyst's time. We needed grounded legal intelligence in minutes, and we needed it to never invent a citation that wasn't already sitting in the corpus, defensible enough to ship under the DAPSE 3.0 program.",
    decision:
      "I architected the backend RAG pipeline as a hybrid search engine plus an async LLM orchestration layer, both sitting under a FastAPI service shipped to a GMU OpenStack VM. 1,630 policy sources across 21 countries get chunked into 257K embedded units and 25,634 extracted policy objectives. Retrieval is SQLite FTS5 (lexical) + FAISS (dense) blended via Reciprocal Rank Fusion, with authority-weighted reranking and self-correcting retrieval loops (the pipeline detects low-confidence results, rewrites the query, and retries before anything reaches the LLM). End users save an estimated 90% on policy-lookup time.",
    architecture: [
      "Hybrid search engine: SQLite FTS5 (lexical) + FAISS (dense semantic) blended via Reciprocal Rank Fusion. Authority-weighted reranking sits on top, plus self-correcting retrieval loops that detect low-confidence results, rewrite the query, and retry before anything reaches the LLM.",
      "Hand-built evaluation suite drove every retrieval decision. Curated query-answer pairs with human-verified relevant passages mapped to specific source documents. Took longer to assemble than any model training, but it was the highest-leverage artifact on the project. The pipeline lands nDCG@5 = 0.832 and Precision@5 = 0.954 on that suite.",
      "4-tier authority-weighting framework: binding legal, official non-binding, trusted secondary, other. The tier rides every source through retrieval, reranking, and composition, and gates 5 downstream quality checks that enforce JAG-grade defensibility (any [LAW]-tagged finding that cites only non-binding sources gets downgraded automatically).",
      "Evidence-First reasoning: cluster, assert, authority, quote, render. The composer doesn't see raw chunks; it sees atomic assertions tied back to specific spans, so hallucinated citations have nowhere to enter the report. A 3-sentence BLUF cap is enforced on every generated brief.",
      "7-stage async LLM orchestration pipeline on the OpenAI SDK with checkpoint recovery and per-model circuit breakers. GPT-5 model lineup: nano for structured-JSON work (parsing, evaluation, verification), mini for prose, 5.1-chat as the escalation tier. Routing simple queries to gpt-5-nano cut average API cost about 80%.",
      "Production deployment: GMU OpenStack VM, FastAPI service with Server-Sent Events for streaming responses, Docker behind nginx, token auth, and rate limiting. Langfuse traces every LLM call (tokens, latency, reasoning, cost); Prometheus exposes /metrics for HTTP histograms and in-flight gauges.",
      "1,481 passing tests across retrieval, scoring, composition, and orchestration certified the system for hand-off to NSI under DAPSE 3.0. Coverage included tier-propagation invariants, RRF-stability checks, BLUF-cap enforcement, and self-correcting retry integration tests so regressions in the JAG-grade defensibility properties surface in CI before they reach an analyst.",
    ],
    tried: [
      "First retrieval iteration was pure dense FAISS over chunked text. It missed citation-precise legal language constantly because a treaty article and a paraphrased academic summary embed too close together. Adding BM25 with IDF-weighted query construction and blending via RRF (K=60) was the single biggest precision lift; pure dense or pure lexical alone never matched the hybrid on the golden eval.",
      "Naive paragraph chunking wrecked retrieval over treaty-heavy documents. Section-aware parent-child chunking with contextual headers prepended at embed time preserved the structural meaning (articles, sub-paragraphs, footnotes) and stopped citations from pointing at stray paragraphs.",
      "Early on the composer was given raw evidence chunks and asked to write the report directly. Hallucination crept in around dense legal text every time. The Evidence-First path now clusters evidence into atomic assertions with explicit chunk provenance, then composes from those assertions. The full chain (report, assertion, chunk, source) survives end to end.",
      "Single-tier verification (one big LLM call after retrieval) was slow and expensive without raising accuracy. Splitting the work across the GPT-5 lineup (nano for verification, mini for prose, 5.1-chat as escalation only on HIGH-severity flags) cut spend dramatically while keeping the quality safety net.",
      "Trusting LLM-generated quotes was a non-starter. The Snippet Provenance check now fuzzy-matches every quoted span against the evidence pack and rewrites or downgrades any finding whose quote got paraphrased into something the source never said.",
    ],
    metric: { value: "90%", label: "Policy-lookup time saved for end users" },
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
      "SSE",
      "FAISS",
      "SQLite FTS5",
      "OpenAI SDK",
      "GPT-5 (nano / mini / 5.1-chat)",
      "Reciprocal Rank Fusion",
      "Langfuse",
      "Prometheus",
      "Docker",
      "nginx",
      "OpenStack",
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
      "Split the work cleanly: YOLO for plate localization (it's good at finding rectangles), OpenCV for the messy preprocessing in between, and Tesseract OCR for the final character read. Tune each stage on the part of the data it actually struggles with rather than treating the pipeline as a black box. (B.Tech capstone project.)",
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
    subtitle: "End-to-End AWS Data Pipeline · Aug to Dec 2024",
    accent: "--accent-primary",
    problem:
      "CDC BRFSS (Behavioral Risk Factor Surveillance System) data lives across years of survey responses with shifting schemas and inconsistent encoding. Building a useful county-level obesity-risk view means stitching all of that together repeatedly, and a local Python notebook isn't a real answer once anyone else (a colleague, an advisor, a reviewer) needs to refresh the numbers.",
    decision:
      "Build a cloud-native AWS pipeline so ingestion, transformation, and analytical storage all live in one place and survive someone else clicking refresh. S3 for landing zones, AWS Glue DataBrew for the ETL, and RDS as the analytical store for downstream modeling in Python and R. Supervised by Prof. Harry Foxwell at George Mason University.",
    architecture: [
      "S3 ingestion of CDC BRFSS survey data across multiple years, with the bucket layout split into raw / staging / curated zones so a bad upload never silently corrupts the analytical layer.",
      "AWS Glue DataBrew handles schema standardization and null-handling across years of survey responses. Type coercion, unit normalization, and deduplication land the data in a model-ready shape.",
      "RDS holds the curated tables so the analytical layer is queryable from both Python (Pandas, Seaborn, Scikit-learn) and R (tidyverse, ggplot2) without spinning up extra infrastructure.",
      "Modeling layer compares three families: regression (linear + regularized) as an interpretable baseline, Random Forest for non-linear interactions and feature importance ranking, and ARIMA for time-series forecasting of obesity trend trajectories.",
      "Output: county-level risk factors plus multi-year obesity-trend forecasts that could inform public-health resource allocation. End-to-end ownership from raw CDC data to predictive outputs.",
    ],
    tried: [
      "First iteration was a local Python notebook that everything ran out of. Worked for me, didn't survive the second person trying to use it. Migrating to S3 + Glue DataBrew made the pipeline reproducible by anyone with IAM access.",
      "Tried doing all the EDA in Python and skipping R. R's tidyverse + ggplot2 were genuinely faster for the exploratory pass, so the analysis ended up dual-stack instead of single-stack.",
      "First ARIMA pass naively used yearly aggregates without accounting for missing-year survey gaps. The forecast wobbled. Interpolating missing years with a simple state-level prior gave cleaner trajectories without overfitting the limited series length.",
    ],
    metric: { value: "S3 → Glue DataBrew → RDS", label: "Cloud-native pipeline, fully reproducible" },
    stack: ["AWS", "S3", "Glue DataBrew", "RDS", "Python", "R", "Pandas", "Scikit-learn", "tidyverse", "ggplot2", "ARIMA"],
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
