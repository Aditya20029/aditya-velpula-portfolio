export const projects = [
  {
    id: "pulse",
    title: "Pulse · Real-Time Global News Intelligence Globe",
    subtitle: "Solo Build · Live at global-pulse-ai.site · Apr 2026 to Present",
    description:
      "Public 3D-Earth platform that aggregates 1,000+ live events from 45+ sources (GDELT 2.0, 45 subreddits, 45+ RSS feeds including Reuters, BBC, AP, Al Jazeera, NHK, Hacker News), geolocates and clusters them onto the globe, and streams Claude Opus 4.7 analyst briefings (what happened, why it matters, key actors, severity, 12-hour forecast) on cluster click. Next.js 16 + React 19 + Three.js with 8K NASA textures and custom GLSL shaders for day/night terminator, atmosphere, and sentiment-reactive auroras. Fingerprint cache + per-IP rate limit + lazy AI keep the Claude bill sane.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Three.js",
      "react-three-fiber",
      "GLSL Shaders",
      "Claude Opus 4.7",
      "Zustand",
      "SWR",
      "GDELT 2.0",
      "Tailwind",
      "Vercel",
    ],
    previewType: "grid",
    accentColor: "--accent-tertiary",
    image: "/projects/pulse/globe.png",
    imageAlt: "Pulse 3D news-intelligence globe with live event clusters",
    demo: "https://global-pulse-ai.site/",
    metrics: [
      { value: 1000, suffix: "+", label: "Live events surfaced" },
      { value: 45, suffix: "+", label: "News sources fused" },
      { value: "~1s", label: "First briefing token" },
    ],
    github: null,
  },
  {
    id: "dapse",
    title: "DAPSE · Arctic Policy Intelligence Engine",
    subtitle: "AI Engineer · NSI Apprenticeship · Jan to May 2026",
    description:
      "Production RAG backend for a national-security JAG decision-support system, ingesting 1,630 policy sources across 21 countries into 257K embedded chunks. Saves an estimated 90% on policy-lookup time for end users. Hybrid search (SQLite FTS5 + FAISS + RRF) with authority-weighted reranking and self-correcting retrieval loops hits nDCG@5 = 0.832 and Precision@5 = 0.954 on a hand-built eval suite. 7-stage async LLM pipeline on the OpenAI SDK with checkpoint recovery and per-model circuit breakers; routing simple queries to GPT-5-nano cut average API cost ~80%. Shipped to a GMU OpenStack VM (FastAPI + SSE, Docker behind nginx) and certified for NSI hand-off via 1,481 automated tests.",
    tags: [
      "Python",
      "FastAPI",
      "SSE",
      "FAISS",
      "SQLite FTS5",
      "OpenAI SDK",
      "GPT-5",
      "RAG",
      "Langfuse",
      "Docker",
      "nginx",
    ],
    previewType: "pipeline",
    accentColor: "--accent-primary",
    image: "/projects/dapse/scenario-tab.png",
    imageAlt: "DAPSE scenario analysis interface, Arctic Policy Intelligence Engine",
    metrics: [
      { value: "90%", label: "Policy-lookup time saved" },
      { value: 1630, label: "Policy sources · 21 countries" },
      { value: 257000, label: "Chunks indexed" },
    ],
    github: null,
  },
  {
    id: "rag-agent",
    title: "RAG + Agentic AI Assistant",
    subtitle: "Citation Grounding + MCP Tool Use · 2026",
    description:
      "Hybrid RAG assistant that embeds structured and unstructured operational records, serves retrieval through FAISS + pgvector, and grounds every LLM answer in cited evidence spans. Exposes analytics tools to the agent via Model Context Protocol (MCP) with guarded loops and per-call token budgets, so the agent can ask the database real questions instead of hallucinating the answer.",
    tags: ["Python", "OpenAI API", "Claude", "Hugging Face", "FAISS", "pgvector", "MCP", "FastAPI", "RAG"],
    previewType: "chat",
    accentColor: "--accent-tertiary",
    metrics: [],
    github: null,
  },
  {
    id: "llm-eval-harness",
    title: "Multi-Cloud LLM Evaluation Harness",
    subtitle: "Bedrock + OpenAI + Azure OpenAI + Vertex AI · 2026",
    description:
      "Cross-provider evaluation harness that scores Claude, GPT, and Gemini on a fixed prompt set plus gold-answer references. Powers the model-selection decisions behind DAPSE's production 4-LLM router. Pytest-driven, Langfuse-traced, and deterministic across runs so a regression in one provider doesn't quietly leak into production.",
    tags: ["Python", "AWS Bedrock", "OpenAI", "Azure OpenAI", "Vertex AI", "Pytest", "Langfuse", "LLM-as-Judge"],
    previewType: "gauge",
    accentColor: "--accent-warm",
    metrics: [],
    github: null,
  },
  {
    id: "streaming-anomaly",
    title: "Real-Time Streaming Anomaly Detection on AWS",
    subtitle: "Sensor + Event Telemetry · 2025",
    description:
      "Ingests high-frequency event streams through AWS Kinesis Data Streams into Lambda consumers. Each event is scored by an Isolation Forest + LSTM-autoencoder ensemble, and alerts persist to DynamoDB. Sub-second p95 latency end to end so a downstream pager actually fires while the anomaly still matters.",
    tags: ["AWS", "Kinesis", "Lambda", "DynamoDB", "Python", "Isolation Forest", "LSTM"],
    previewType: "chart",
    accentColor: "--accent-coral",
    metrics: [
      { value: "<1s", label: "p95 latency end to end" },
    ],
    github: null,
  },
  {
    id: "nlp-classifier",
    title: "NLP Sentiment + Topic Classifier",
    subtitle: "Transformer Fine-Tuning · 2025",
    description:
      "Fine-tuned DistilBERT on 50K+ labeled reviews for multi-class sentiment plus topic tagging. Served via FastAPI with batched inference and ONNX runtime acceleration, lifting throughput roughly 3x over the unoptimized PyTorch baseline.",
    tags: ["Python", "PyTorch", "Hugging Face", "DistilBERT", "FastAPI", "ONNX"],
    previewType: "grid",
    accentColor: "--accent-secondary",
    metrics: [
      { value: "50K+", label: "Labeled reviews" },
      { value: "~3x", label: "Throughput vs baseline" },
    ],
    github: null,
  },
  {
    id: "demand-forecasting",
    title: "Time-Series Demand Forecasting + Inventory Optimization",
    subtitle: "Prophet + LightGBM Stacked Ensemble · 2024 to 2025",
    description:
      "Hierarchical forecasting across product and region using a Prophet + LightGBM stacked ensemble with SARIMA as a deterministic baseline. Optuna runs the hyperparameter search, MLflow tracks every trial, and reorder recommendations surface through a Power BI ops dashboard.",
    tags: ["Python", "Prophet", "LightGBM", "SARIMA", "Optuna", "MLflow", "Power BI"],
    previewType: "chart",
    accentColor: "--accent-warm",
    metrics: [],
    github: null,
  },
  {
    id: "mlops-pipeline",
    title: "End-to-End MLOps Pipeline",
    subtitle: "Training + Registry + Drift Monitoring · 2026",
    description:
      "CI/CD pipeline that trains, evaluates, and registers models in MLflow + SageMaker Model Registry. Evidently AI runs drift detection on inputs and predictions; Prometheus alerts wired into a retraining trigger fire automatically when input distributions shift. Docker + GitHub Actions hold the whole thing together.",
    tags: ["Python", "MLflow", "AWS SageMaker", "Docker", "GitHub Actions", "Evidently AI", "Prometheus"],
    previewType: "pipeline",
    accentColor: "--accent-success",
    metrics: [],
    github: null,
  },
  {
    id: "sla-breach-prediction",
    title: "Predictive Analytics + BI Dashboard",
    subtitle: "SLA Breach Forecasting · 2025",
    description:
      "Dimensional model and canonical dataset over 5,000+ ops records, XGBoost forecasting with SHAP explainability for feature-level reasoning, and a Power BI dashboard with drill-down so operators can self-serve. Built end-to-end so the model output isn't a black box: every prediction comes with the top drivers an operator can act on.",
    tags: ["Python", "XGBoost", "Scikit-learn", "advanced SQL", "Power BI", "SHAP"],
    previewType: "gauge",
    accentColor: "--accent-success",   // emerald
    metrics: [
      { value: 5000, suffix: "+", label: "Ops records modelled" },
    ],
    github: null,
  },
  {
    id: "wildfire-prediction",
    title: "Wildfire Risk Prediction",
    subtitle: "Climate Data × Machine Learning",
    description:
      "ML pipeline fusing MODIS satellite fire data, NOAA climate variables, and NDVI vegetation indices to predict wildfire risk. Random Forest + XGBoost with careful feature engineering reached AUC-ROC 0.99. Python visualisations of high-risk zones and key predictors (elevation, humidity, thermal anomalies) support proactive response.",
    tags: ["Python", "XGBoost", "Random Forest", "GeoPandas", "NOAA", "MODIS"],
    previewType: "heatmap",
    accentColor: "--accent-warm",      // amber
    metrics: [{ value: 0.99, label: "AUC-ROC", format: "decimal" }],
    github: null,
  },
  {
    id: "electricity-analytics",
    title: "U.S. Electricity-Rate Analytics",
    subtitle: "DIKW-Driven IOU vs Non-IOU Pricing Study",
    description:
      "Analysed 320K+ electricity rate records (2020 to 2023) through the DIKW framework, using Python, SQL, and statistical testing (t-tests, regression) to expose material pricing differences between IOU and Non-IOU utilities across sectors and states. Cluster models + forecasts highlight geographic trends and inflation effects for regulators.",
    tags: ["Python", "SQL", "Statistical Modeling", "Clustering", "Forecasting", "Plotly"],
    previewType: "chart",
    accentColor: "--accent-secondary", // magenta
    metrics: [{ value: 320000, suffix: "+", label: "Records Analysed" }],
    github: null,
  },
  {
    id: "license-plate-detection",
    title: "License Plate Detection",
    subtitle: "Real-Time YOLO + Tesseract OCR Pipeline",
    description:
      "Real-time license plate recognition combining YOLO object localization with Tesseract OCR for character extraction, plus OpenCV preprocessing (binarization, denoising, perspective correction) for plates under motion blur or low contrast. Boosted detection accuracy through dataset augmentation and bounding-box refinement. B.Tech capstone project.",
    tags: ["Python", "YOLO", "Tesseract OCR", "OpenCV", "Computer Vision", "Deep Learning"],
    previewType: "plate",
    accentColor: "--accent-coral",     // deep cyan-teal
    metrics: [],
    github: null,
  },
  {
    id: "movie-recommender",
    title: "Hybrid Movie Recommender",
    subtitle: "Collaborative + Content + Sentiment",
    description:
      "Hybrid recommendation engine blending content-based filtering, collaborative filtering, sentiment analysis, and Jaccard similarity for diverse personalised suggestions. Responsive Flask web app with real-time search, tunable parameters, and evaluation metrics for diversity, novelty, and serendipity.",
    tags: ["Python", "Flask", "Recommender Systems", "NLP", "Sentiment Analysis", "React"],
    previewType: "grid",
    accentColor: "--accent-tertiary",  // royal purple
    metrics: [],
    github: null,
  },
  {
    id: "obesity-analytics",
    title: "Cloud Data Warehouse + ETL Pipeline on AWS",
    subtitle: "Public Health Risk Analytics · Prof. Foxwell",
    description:
      "End-to-end ETL on CDC BRFSS data using PySpark over raw, clean, and curated layers (medallion architecture) into AWS S3 + Glue + RDS (PostgreSQL). Dimensional modeling, automated data-quality checks, and an R statistical analysis layer on top. Supervised by Prof. Harry Foxwell at GMU.",
    tags: ["AWS", "S3", "Glue", "RDS", "PostgreSQL", "PySpark", "Python", "R", "SQL"],
    previewType: "pipeline",
    accentColor: "--accent-primary",   // electric blue
    metrics: [],
    github: null,
  },
  {
    id: "support-circle",
    title: "Support Circle",
    subtitle: "Virtual Addiction-Support Platform",
    description:
      "Full-stack virtual support platform helping people fight addictions. React frontend for a responsive chat-first UX, Python backend handling auth, data management, and secure real-time messaging + notifications so users get continuous peer support during recovery.",
    tags: ["React", "Python", "Flask", "WebSockets", "Authentication", "Full-Stack"],
    previewType: "chat",
    accentColor: "--accent-rose",      // deep rose
    metrics: [],
    github: null,
  },
];
