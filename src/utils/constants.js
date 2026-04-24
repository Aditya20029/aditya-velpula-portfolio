export const BREAKPOINTS = {
  mobileS: 480,
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};

export const DURATION = {
  instant: 0.1,
  micro: 0.15,
  fast: 0.25,
  normal: 0.4,
  smooth: 0.6,
  dramatic: 0.8,
  cinematic: 1.2,
};

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inExpo: [0.7, 0, 0.84, 0],
  smooth: [0.45, 0, 0.55, 1],
  spring: [0.34, 1.56, 0.64, 1],
  glide: [0.22, 1, 0.36, 1],
};

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const SECTION_TINTS = {
  hero: "transparent",
  about: "radial-gradient(circle at 20% 30%, rgba(59,130,246,0.04), transparent 40%)",
  experience:
    "linear-gradient(180deg, rgba(6,182,212,0.03), rgba(139,92,246,0.03))",
  projects:
    "radial-gradient(circle at 80% 60%, rgba(245,158,11,0.04), transparent 50%)",
  skills:
    "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.05), transparent 60%)",
  certifications:
    "radial-gradient(circle at 50% 20%, rgba(245,158,11,0.04), transparent 50%)",
  contact:
    "radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.05), transparent 60%)",
};
