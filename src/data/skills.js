// Levels render as a 3-bar indicator on the skill chip.
// Recruiters can scan in <2s; engineers can read the proficiency line.
export const SKILL_LEVELS = {
  primary: { label: "Primary", bars: 4 },
  expert: { label: "Expert", bars: 3 },
  advanced: { label: "Advanced", bars: 3 },
  proficient: { label: "Proficient", bars: 2 },
  intermediate: { label: "Intermediate", bars: 2 },
  working: { label: "Working", bars: 1 },
};

export const skills = {
  categories: [
    {
      id: "aiml",
      name: "AI / ML & Data",
      tagline: "Production AI systems and orchestration",
      color: "--accent-tertiary",
      icon: "brain",
      skills: [
        { name: "LLMs", level: "expert", proficiency: "GPT-4, Claude, fine-tuning" },
        { name: "RAG", level: "expert", proficiency: "Production RAG systems" },
        { name: "LangChain", level: "expert", proficiency: "Agent orchestration" },
        { name: "FAISS", level: "expert", proficiency: "Vector search at scale" },
        { name: "PyTorch", level: "advanced", proficiency: "Research + production" },
        { name: "TensorFlow", level: "advanced", proficiency: "Model training" },
        { name: "NLP", level: "advanced", proficiency: "Text processing pipelines" },
        { name: "Hugging Face", level: "advanced", proficiency: "Transformers, model hub" },
      ],
    },
    {
      id: "languages",
      name: "Languages",
      tagline: "Daily-driver and supporting",
      color: "--accent-primary",
      icon: "code",
      skills: [
        { name: "Python", level: "primary", proficiency: "5+ years, every project" },
        { name: "SQL", level: "advanced", proficiency: "Complex queries, optimization" },
        { name: "JavaScript", level: "proficient", proficiency: "Full-stack web" },
        { name: "C++", level: "proficient", proficiency: "Systems programming" },
        { name: "Java", level: "proficient", proficiency: "Enterprise applications" },
        { name: "R", level: "proficient", proficiency: "Statistical analysis" },
      ],
    },
    {
      id: "cloud",
      name: "Cloud & Infrastructure",
      tagline: "AWS-certified, cloud-native delivery",
      color: "--accent-secondary",
      icon: "cloud",
      skills: [
        { name: "AWS", level: "advanced", proficiency: "Certified, primary platform" },
        { name: "Docker", level: "advanced", proficiency: "Containerized deployments" },
        { name: "Kubernetes", level: "intermediate", proficiency: "Orchestration" },
        { name: "Terraform", level: "intermediate", proficiency: "Infrastructure-as-code" },
        { name: "Azure", level: "working", proficiency: "Working knowledge" },
        { name: "GCP", level: "working", proficiency: "Working knowledge" },
      ],
    },
    {
      id: "tools",
      name: "Tools & Frameworks",
      tagline: "Building, shipping, monitoring",
      color: "--accent-success",
      icon: "wrench",
      skills: [
        { name: "FastAPI", level: "expert", proficiency: "Production APIs" },
        { name: "Pandas", level: "expert", proficiency: "Data manipulation" },
        { name: "NumPy", level: "expert", proficiency: "Numerical computing" },
        { name: "Git", level: "advanced", proficiency: "Branching, CI/CD" },
        { name: "Spark", level: "intermediate", proficiency: "Distributed computing" },
        { name: "Airflow", level: "intermediate", proficiency: "Workflow orchestration" },
        { name: "MLflow", level: "intermediate", proficiency: "Experiment tracking" },
      ],
    },
  ],
};
