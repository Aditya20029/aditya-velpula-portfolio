import Link from "next/link";

export const metadata = {
  title: "404 · Page not found · Aditya Velpula",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "32px",
        color: "var(--text-primary)",
        gap: "20px",
      }}
    >
      {/* Big 404 in holographic gradient */}
      <h1
        className="holo-text"
        style={{
          fontFamily:
            'var(--font-display), "Fraunces", Georgia, serif',
          fontSize: "clamp(96px, 22vw, 240px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          margin: 0,
          padding: 0,
          filter:
            "drop-shadow(0 0 24px var(--glow-cyan)) drop-shadow(0 0 48px var(--glow-purple))",
        }}
      >
        404
      </h1>

      {/* Mono caption — system-style */}
      <p
        className="t-mono-sm"
        style={{
          color: "var(--text-muted)",
          letterSpacing: "0.22em",
          margin: 0,
        }}
      >
        AGENT · LOST · IN · LATENT · SPACE
      </p>

      {/* Body copy */}
      <p
        style={{
          color: "var(--text-body)",
          fontSize: "clamp(16px, 1.5vw, 18px)",
          maxWidth: "52ch",
          lineHeight: 1.6,
          margin: "12px 0 0",
        }}
      >
        The page you&apos;re looking for didn&apos;t make it through the
        retrieval step. Either the chunk got pruned, or it never existed in
        the index to begin with.
      </p>

      {/* Home CTA */}
      <Link
        href="/"
        style={{
          marginTop: "24px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 26px",
          borderRadius: "999px",
          background:
            "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary) 52%, var(--accent-secondary))",
          color: "#ffffff",
          fontFamily:
            "var(--font-mono), JetBrains Mono, ui-monospace, monospace",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          boxShadow:
            "0 18px 44px -24px var(--accent-primary)",
        }}
      >
        ← Return to base
      </Link>
    </main>
  );
}
