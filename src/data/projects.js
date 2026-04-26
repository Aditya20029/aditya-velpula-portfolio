export const projects = [
  {
    id: "sla-breach-prediction",
    title: "Ticket Resolution & SLA Breach Prediction",
    subtitle: "ITSM Analytics · Oct to Nov 2025",
    description:
      "End-to-end ITSM analytics pipeline predicting ticket resolution time and flagging SLA breach risk before closure. Built on a realistic 5,000-ticket synthetic dataset simulating ServiceNow/Jira logs. Gradient-boosting models beat baselines for both regression and classification; results surface through a Power BI dashboard for proactive service management.",
    tags: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Power BI", "Predictive Analytics"],
    previewType: "gauge",
    accentColor: "--accent-success",   // emerald
    metrics: [
      { value: 5000, suffix: "+", label: "Tickets Modelled" },
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
    subtitle: "Real-Time YOLO + OCR Pipeline",
    description:
      "Real-time license plate recognition combining YOLO object detection, OCR, and OpenCV image preprocessing. Peak detection accuracy achieved through dataset augmentation, bounding-box refinement, and localisation tuning. Senior-year capstone.",
    tags: ["Python", "YOLO", "OCR", "OpenCV", "Computer Vision", "Deep Learning"],
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
    title: "Obesity Risk Analytics",
    subtitle: "End-to-End AWS Data Pipeline",
    description:
      "Cloud-native data pipeline for health-risk prediction using AWS services. Raw records flow through S3 → Glue ETL → Athena queries → QuickSight dashboards, enabling real-time risk scoring and visualisation.",
    tags: ["AWS", "S3", "Glue", "Athena", "QuickSight", "Python"],
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
