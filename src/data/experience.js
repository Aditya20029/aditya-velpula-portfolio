export const experience = [
  {
    id: "dapse",
    role: "AI / Data Engineer · 4-LLM Routing + ETL + Production AI",
    company: "DAPSE Capstone · GMU · NSI (National Security Innovations Inc.) Partner Org",
    location: "Arlington, VA · Hybrid",
    period: "Jan 2026 to May 2026",
    isHero: true,
    summary:
      "Lead backend developer on the Arctic Policy Assistant, a production RAG platform shipped with NSI through GMU's capstone program. Lets JAG analysts query 1,630 policy sources across 21 countries in seconds instead of hours, saving an estimated 90%+ on policy-lookup time. Owned end-to-end system design and shipped to production on a GMU OpenStack VM (FastAPI + SSE streaming, Docker behind nginx, token auth, rate limiting). Validated through 1,481 automated tests and certified for NSI hand-off under DAPSE 3.0.",
    impact: [
      { value: "90%", label: "Policy-lookup time saved", icon: "trending-down" },
      { value: 1630, label: "Policy Sources Ingested", icon: "file-text" },
      { value: 257000, label: "Chunks Indexed", icon: "database" },
      { value: 21, label: "Countries Covered", icon: "globe" },
      { value: "0.954", label: "Precision@5 on golden set", icon: "trending-up" },
      { value: 1481, label: "Tests Passing", icon: "check-circle" },
    ],
    techStack: [
      "Python",
      "FastAPI",
      "SSE",
      "FAISS",
      "SQLite FTS5",
      "OpenAI SDK",
      "GPT-5",
      "Langfuse",
      "Prometheus",
      "Docker",
      "nginx",
      "OpenStack",
    ],
    details: {
      architecture:
        "Hybrid search engine built on SQLite FTS5 + FAISS + Reciprocal Rank Fusion, with authority-weighted reranking and self-correcting retrieval loops (the pipeline detects low-confidence results, rewrites the query, and retries before anything reaches the LLM). Hit nDCG@5 = 0.832 and Precision@5 = 0.954 on a hand-built evaluation suite. A 7-stage async LLM orchestration pipeline on the OpenAI SDK runs with checkpoint recovery, per-model circuit breakers, and Langfuse observability; cut average API cost ~80% by routing simple queries to GPT-5-nano.",
      legalContext:
        "Shipped to production on a GMU OpenStack VM with FastAPI + SSE streaming, Docker behind nginx, token auth, and rate limiting. 1,481 automated tests across retrieval, scoring, and composition certified the system for hand-off to NSI under the DAPSE 3.0 program. Lesson learned: production AI is a systems problem first and a model problem second; the model is one node in a graph of retrieval, ranking, orchestration, evals, and recovery.",
    },
  },
  {
    id: "gmu",
    role: "Graduate Teaching Assistant · AIT-580 Data Analytics",
    company: "George Mason University · College of Engineering and Computing",
    location: "Fairfax, VA · On-site",
    period: "Aug 2025 to May 2026",
    isHero: false,
    summary:
      "Supported 100+ students for Prof. Harry Foxwell across Python, SQL, applied analytics, and data modeling. Coached daily on translating business questions into structured data solutions. Taught across 4 sections over 2 semesters, redesigned grading rubrics that cut regrade volume and shaved roughly 30% off grading time per assignment, and overhauled the lab guides plus supplementary Jupyter notebooks (assignment scores lifted ~15% vs. the prior cohort).",
    impact: [
      { value: 100, suffix: "+", label: "Students Taught", icon: "users" },
      { value: 4, label: "AIT-580 Sections (2 semesters)", icon: "book-open" },
      { value: "30%", label: "Grading time saved per assignment", icon: "trending-down" },
      { value: "15%", label: "Student score lift vs prior cohort", icon: "trending-up" },
    ],
    techStack: ["Python", "SQL", "R", "AWS Cloud", "Jupyter"],
  },
  {
    id: "indgeos",
    role: "Software / Data Engineer · Full-Stack",
    company: "Indgeos Geospatial",
    location: "Telangana, India",
    period: "Nov 2023 to Jul 2024",
    isHero: false,
    summary:
      "Built Python + FastAPI services and SQL transformations against PostgreSQL backends, plus TypeScript / JavaScript frontends powering customer-facing geospatial analytics. Ran early prompt-engineered LLM experiments on field-ops summaries. Stood up the team's first Git-based pull-request workflow with linting, unit tests, and CI/CD checks, cutting code-review cycle time from roughly 3 days to under 24 hours across a 5-engineer team.",
    impact: [
      { value: "~3d to <24h", label: "PR review cycle", icon: "trending-down" },
      { value: 5, label: "Engineer team", icon: "users" },
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQL", "TypeScript", "JavaScript", "Git", "CI/CD"],
  },
  {
    id: "supraja",
    role: "Cyber Security Specialist · Internship",
    company: "Supraja Technologies",
    location: "India · Remote",
    period: "Nov 2021 to Jan 2022",
    isHero: false,
    summary:
      "Built foundational skills in identifying vulnerabilities, testing web applications, and understanding security workflows. Hands-on experience with Burp Suite, Wireshark, DNS Discovery, and Bugcrowd for web application penetration testing and vulnerability identification.",
    impact: [],
    techStack: ["Burp Suite", "Wireshark", "Bugcrowd", "Pen Testing"],
  },
  {
    id: "brainovision",
    role: "Web Development Intern",
    company: "Brainovision Solutions India",
    location: "Remote",
    period: "Dec 2020 to Feb 2021",
    isHero: false,
    summary:
      "Built responsive, user-friendly websites end to end using WordPress, HTML, and CSS. Completed multiple full website builds applying modern design principles and responsive layout techniques.",
    impact: [],
    techStack: ["WordPress", "HTML", "CSS", "Responsive Design"],
  },
];
