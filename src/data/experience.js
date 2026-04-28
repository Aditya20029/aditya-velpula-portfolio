export const experience = [
  {
    id: "dapse",
    role: "AI Engineer · DAPSE Capstone (Backend & Data)",
    company: "NSI (National Security Innovations Inc.) · GMU Partner",
    location: "Arlington, VA",
    period: "Feb 2026 to Present",
    isHero: true,
    summary:
      "Architected the backend RAG pipeline for an AI-augmented JAG decision-support system (Arctic Policy Assistant), ingesting 1,630 policy sources across 21 countries into 257K embedded chunks and 25,634 extracted objectives. Hybrid retrieval (BM25 + FAISS, RRF, AI reranker) hits nDCG@5 = 0.832 and Precision@5 = 0.954 on the 35-query golden set; 1,481 tests certified the system for hand-off under DAPSE 3.0.",
    impact: [
      { value: 1630, label: "Policy Sources Ingested", icon: "file-text" },
      { value: 257000, label: "Chunks Indexed", icon: "database" },
      { value: 25634, label: "Policy Objectives Extracted", icon: "target" },
      { value: 21, label: "Countries Covered", icon: "globe" },
      { value: "0.954", label: "Precision@5 (35-q golden set)", icon: "trending-up" },
      { value: 1481, label: "Tests Passing", icon: "check-circle" },
    ],
    techStack: [
      "Python",
      "FastAPI",
      "FAISS",
      "BM25",
      "OpenAI GPT-5",
      "Langfuse",
      "Prometheus",
      "SQLite (WAL)",
      "Next.js",
    ],
    details: {
      architecture:
        "Hierarchical ingestion (PDF / HTML / DOCX, cleaning, section segmentation, parent-child chunking, FAISS + BM25) with contextual chunk headers prepended before embedding. Hybrid retrieval blends BM25 + FAISS via 3-query rewrites and RRF fusion (K=60), then an AI reranker. A 4-tier authority-weighting framework (binding legal to trusted secondary) propagates source credibility through retrieval, reranking, composition, and 5 downstream quality gates. Evidence-First reasoning (cluster, assert, authority, quote, render) eliminates citation drift and enforces a 3-sentence BLUF cap on generated legal briefs.",
      legalContext:
        "JAG decision-support layer covering Arctic policy across 21 countries. GPT-5 model lineup (nano / mini / 5.1-chat) with Langfuse observability and Prometheus metrics; SQLite WAL + FAISS IVF data layer. DOCX-exportable briefs power a 7-tab Next.js situation-awareness dashboard.",
    },
  },
  {
    id: "gmu",
    role: "Graduate Teaching Assistant",
    company: "George Mason University",
    location: "Fairfax, VA",
    period: "Aug 2025 to Present",
    isHero: false,
    summary:
      "Selected by Prof. Harry J. Foxwell to support two graduate sections of AIT-580. Mentored 50+ students on Python, SQL, R, and AWS Cloud, and partnered with faculty to enhance course materials with data-driven insights and clearer assignment briefs (regrade requests dropped meaningfully across the term).",
    impact: [
      { value: 50, suffix: "+", label: "Students Mentored", icon: "users" },
      { value: 2, label: "AIT-580 Sections Supported", icon: "book-open" },
    ],
    techStack: ["Python", "SQL", "R", "AWS Cloud"],
  },
  {
    id: "indgeos",
    role: "AI Engineer",
    company: "Indgeos Geospatial",
    location: "Telangana, India",
    period: "Nov 2023 to Jul 2024",
    isHero: false,
    summary:
      "Designed and developed the company's marketing site for geospatial data presentation. Built responsive layouts in HTML5, CSS3, and JavaScript, integrated backend APIs for dynamic data rendering, and applied Git plus modern testing practices to ship a scalable frontend that aligned with current web standards.",
    impact: [],
    techStack: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Git"],
  },
];
