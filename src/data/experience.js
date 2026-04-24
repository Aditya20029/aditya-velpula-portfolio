export const experience = [
  {
    id: "dapse",
    role: "AI Engineer",
    company: "DAPSE — NSI",
    location: "Arlington, VA",
    period: "2024 – Present",
    isHero: true,
    summary:
      "Built Arctic policy intelligence system using RAG architecture for legal and strategic analysis across 9 nations.",
    impact: [
      { value: "75-80%", label: "LLM Cost Reduction", icon: "trending-down" },
      { value: 25565, label: "Chunks Processed", icon: "database" },
      { value: 4377, label: "Policy Objectives Extracted", icon: "target" },
      { value: 1192, label: "Policy Sources Analyzed", icon: "file-text" },
      { value: 9, label: "Nations Covered", icon: "globe" },
    ],
    techStack: [
      "Python",
      "LangChain",
      "FAISS",
      "BM25",
      "FastAPI",
      "AWS",
      "OpenAI",
      "Pinecone",
      "Docker",
    ],
    details: {
      architecture:
        "Hybrid retrieval combining BM25 lexical search with FAISS dense vector search and neural reranking. Multi-tier LLM verification system ensures factual accuracy with citation tracking.",
      legalContext:
        "Built intelligence system for JAG officers analyzing Arctic policy across international legal frameworks.",
    },
  },
  {
    id: "gmu",
    role: "Graduate Teaching Assistant",
    company: "George Mason University",
    location: "Fairfax, VA",
    period: "2023 – 2024",
    isHero: false,
    summary:
      "Mentored 50+ students in data analytics, machine learning, and statistical methods.",
    impact: [
      { value: 50, suffix: "+", label: "Students Mentored", icon: "users" },
    ],
    techStack: ["Python", "R", "SQL", "Tableau"],
  },
  {
    id: "indgeos",
    role: "AI Engineer",
    company: "Indgeos",
    location: "Remote",
    period: "2022 – 2023",
    isHero: false,
    summary:
      "Built geospatial ML pipelines and full-stack web applications for location intelligence.",
    impact: [],
    techStack: ["Python", "TensorFlow", "AWS", "React", "PostgreSQL"],
  },
];
