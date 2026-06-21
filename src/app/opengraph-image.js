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
          background: "#0a0806",
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(232,198,106,0.34), transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 88% 24%, rgba(184,134,11,0.30), transparent 60%)",
            "radial-gradient(ellipse 70% 50% at 50% 90%, rgba(212,175,55,0.24), transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 88% 88%, rgba(245,207,106,0.18), transparent 60%)",
          ].join(", "),
          color: "#fdf8ec",
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
              "linear-gradient(135deg, #faecbf 0%, #e8c66a 35%, #d4af37 65%, #9a7b1f 100%)",
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
            color: "#ece3d0",
            marginTop: 28,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span>AI / Data Engineer</span>
          <span style={{ color: "#6b6149" }}>·</span>
          <span>Production AI + Scalable ETL at Scale</span>
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
                border: "1px solid rgba(232,198,106,0.24)",
                borderRadius: 999,
                color: "#c9bda3",
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
            color: "#e8c66a",
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
            border: "2px solid #e8c66a",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 800,
            color: "#e8c66a",
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
