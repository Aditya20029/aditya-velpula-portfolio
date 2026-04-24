export const projects = [
  {
    id: "obesity-analytics",
    title: "Obesity Risk Analytics",
    subtitle: "End-to-End AWS Data Pipeline",
    description:
      "Designed and deployed a complete cloud-native data pipeline for health risk prediction using AWS services. Raw health records flow through S3 → Glue ETL → Athena queries → QuickSight dashboards, enabling real-time risk scoring and visualization.",
    tags: ["AWS", "S3", "Glue", "Athena", "QuickSight", "Python"],
    previewType: "pipeline",
    accentColor: "--accent-primary",
    metrics: [],
    github: null,
  },
  {
    id: "electricity-analytics",
    title: "Electricity Rate Analytics",
    subtitle: "Large-Scale Clustering Analysis",
    description:
      "Applied K-Means and hierarchical clustering to 320K+ utility records to identify pricing patterns and anomalies across regional grids. Output informed pricing optimization for a regional utility.",
    tags: ["Python", "Scikit-learn", "Pandas", "Plotly", "K-Means"],
    previewType: "chart",
    accentColor: "--accent-secondary",
    metrics: [{ value: 320000, suffix: "+", label: "Records Analyzed" }],
    github: null,
  },
  {
    id: "wildfire-prediction",
    title: "Wildfire Prediction Model",
    subtitle: "Near-Perfect Predictive Accuracy",
    description:
      "Built an XGBoost classifier for wildfire risk prediction achieving AUC of 0.99 using geospatial and meteorological features. Integrated precipitation, vegetation indices, and historical burn data into a unified prediction surface.",
    tags: ["Python", "XGBoost", "GeoPandas", "Matplotlib", "Scikit-learn"],
    previewType: "heatmap",
    accentColor: "--accent-warm",
    metrics: [{ value: 0.99, label: "AUC Score", format: "decimal" }],
    github: null,
  },
  {
    id: "movie-recommender",
    title: "Movie Recommendation System",
    subtitle: "Collaborative Filtering Engine",
    description:
      "Built a personalized movie recommendation system using collaborative filtering and matrix factorization, served through a Flask API with a React frontend.",
    tags: ["Python", "Surprise", "Flask", "React", "PostgreSQL"],
    previewType: "grid",
    accentColor: "--accent-tertiary",
    metrics: [],
    github: null,
  },
];
