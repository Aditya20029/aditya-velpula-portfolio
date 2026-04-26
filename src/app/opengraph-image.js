import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aditya Velpula — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG card rendered at build time + edge runtime when LinkedIn / Slack /
 * Twitter unfurl the URL. 1200×630 is the canonical size both Twitter
 * (large summary) and LinkedIn use.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07070d",
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(124,212,255,0.35), transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 88% 24%, rgba(255,154,230,0.30), transparent 60%)",
            "radial-gradient(ellipse 70% 50% at 50% 90%, rgba(196,167,255,0.25), transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 88% 88%, rgba(255,216,138,0.18), transparent 60%)",
          ].join(", "),
          color: "#f1f5f9",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        {/* Available pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 22px",
            border: "2px solid #22c55e",
            borderRadius: 999,
            color: "#4ade80",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#22c55e",
              boxShadow: "0 0 16px #22c55e",
            }}
          />
          Available for opportunities
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(135deg, #7cd4ff 0%, #c4a7ff 35%, #ff9ae6 65%, #ffd88a 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Aditya Velpula
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 500,
            color: "#cbd5e1",
            marginTop: 28,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span>AI Engineer</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>Building Intelligent Systems at Scale</span>
        </div>

        {/* Skills row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 56,
          }}
        >
          {["RAG Pipelines", "LLM Systems", "AWS", "Python"].map((s) => (
            <div
              key={s}
              style={{
                padding: "10px 22px",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 999,
                color: "#94a3b8",
                fontSize: 22,
                fontFamily: "ui-monospace, Menlo, monospace",
                letterSpacing: "0.1em",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Footer URL */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 80,
            fontSize: 22,
            fontFamily: "ui-monospace, Menlo, monospace",
            color: "#7cd4ff",
            letterSpacing: "0.14em",
          }}
        >
          adityavelpula.com
        </div>

        {/* Top-left monogram */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 80,
            width: 64,
            height: 64,
            border: "2px solid #7cd4ff",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 800,
            color: "#7cd4ff",
            letterSpacing: "0.05em",
          }}
        >
          AV
        </div>
      </div>
    ),
    size
  );
}
