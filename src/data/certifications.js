// Tiers drive the visual treatment in the grid
export const CERT_TIERS = {
  professional: {
    label: "PROFESSIONAL",
    accent: "#e0c074", // gold
    accentRgb: "224, 192, 116",
    gradient: "linear-gradient(135deg, #eccd84 0%, #c9a24f 100%)",
  },
  associate: {
    label: "ASSOCIATE",
    accent: "#c9a24f", // gold soft
    accentRgb: "201, 162, 79",
    gradient: "linear-gradient(135deg, #e0c074 0%, #b88a2e 100%)",
  },
  foundational: {
    label: "FOUNDATIONAL",
    accent: "#b88a2e", // gold deep
    accentRgb: "184, 138, 46",
    gradient: "linear-gradient(135deg, #c9a24f 0%, #8a6320 100%)",
  },
  academy: {
    label: "ACADEMY",
    accent: "#a3a3a3", // neutral (academy = supporting tier)
    accentRgb: "163, 163, 163",
    gradient: "linear-gradient(135deg, #a3a3a3 0%, #4d4d4d 100%)",
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
    fullName: "AWS Academy Graduate · Data Engineering",
    issuer: "AWS Academy",
    tier: "academy",
    issued: "Nov 28, 2024",
    hours: "40 hours",
    verifyUrl: "https://www.credly.com/go/1IPtFfxc",
  },
  {
    id: "aws-academy-cloud",
    name: "Cloud Foundations",
    subtitle: "Academy Graduate",
    fullName: "AWS Academy Graduate · Cloud Foundations",
    issuer: "AWS Academy",
    tier: "academy",
    issued: "May 2025",
    verifyUrl: "https://www.credly.com/",
  },
];

export const CERT_COUNT = certifications.length;
