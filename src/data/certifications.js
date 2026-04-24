// Tiers drive the visual treatment in the grid
export const CERT_TIERS = {
  professional: {
    label: "PROFESSIONAL",
    accent: "#60a5fa", // sky-400
    accentRgb: "96, 165, 250",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)",
  },
  associate: {
    label: "ASSOCIATE",
    accent: "#22d3ee", // cyan-400
    accentRgb: "34, 211, 238",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
  },
  foundational: {
    label: "FOUNDATIONAL",
    accent: "#3b82f6", // blue-500
    accentRgb: "59, 130, 246",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  },
  academy: {
    label: "ACADEMY",
    accent: "#14b8a6", // teal-500
    accentRgb: "20, 184, 166",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
  },
};

export const certifications = [
  {
    id: "aws-genai-pro",
    name: "Generative AI Developer",
    subtitle: "Professional",
    fullName: "AWS Certified Generative AI Developer - Professional",
    issuer: "Amazon Web Services",
    tier: "professional",
    issued: "Jan 20, 2026",
    expires: "Jan 20, 2029",
    validationId: "0548ff1c8e804d288e1a305aed3e9d94",
    verifyUrl: "https://aws.amazon.com/verification",
    featured: true,
    earlyAdopter: true,
  },
  {
    id: "aws-sa-associate",
    name: "Solutions Architect",
    subtitle: "Associate",
    fullName: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    tier: "associate",
    issued: "Jan 23, 2026",
    expires: "Jan 23, 2029",
    validationId: "765a6c42c1f743adadc871a72671cf0c",
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "aws-data-engineer",
    name: "Data Engineer",
    subtitle: "Associate",
    fullName: "AWS Certified Data Engineer - Associate",
    issuer: "Amazon Web Services",
    tier: "associate",
    issued: "Jan 20, 2026",
    expires: "Jan 20, 2029",
    validationId: "275fcb70732f48c79263a41a4f2c5782",
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "aws-ml-engineer",
    name: "Machine Learning Engineer",
    subtitle: "Associate",
    fullName: "AWS Certified Machine Learning Engineer - Associate",
    issuer: "Amazon Web Services",
    tier: "associate",
    issued: "Jan 19, 2026",
    expires: "Jan 19, 2029",
    validationId: "816ba7f904934e55af530fb5aaf888ab",
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "aws-ai-practitioner",
    name: "AI Practitioner",
    subtitle: "Foundational",
    fullName: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    tier: "foundational",
    issued: "Jan 18, 2026",
    expires: "Jan 18, 2029",
    validationId: "94b3a8ee7ff84522a08af0104a16e6db",
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "aws-academy-data",
    name: "Data Engineering",
    subtitle: "Academy Graduate",
    fullName: "AWS Academy Graduate — Data Engineering",
    issuer: "AWS Academy",
    tier: "academy",
    issued: "Nov 28, 2024",
    hours: "40 hours",
    verifyUrl: "https://www.credly.com/go/1IPtFfxc",
  },
];

export const CERT_COUNT = certifications.length;
