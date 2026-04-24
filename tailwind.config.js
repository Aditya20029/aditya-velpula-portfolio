/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        bg: {
          DEFAULT: "var(--bg-primary)",
          elevated: "var(--bg-elevated)",
          hover: "var(--bg-hover)",
          active: "var(--bg-active)",
        },
        border: {
          subtle: "var(--border-subtle)",
          hover: "var(--border-hover)",
          active: "var(--border-active)",
        },
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
          success: "var(--accent-success)",
          warm: "var(--accent-warm)",
        },
        text: {
          primary: "var(--text-primary)",
          body: "var(--text-body)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          ghost: "var(--text-ghost)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1200px",
        prose: "65ch",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 130, 246, 0.25)",
        "glow-warm": "0 0 40px rgba(245, 158, 11, 0.25)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        smooth: "cubic-bezier(0.45, 0, 0.55, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        glide: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
