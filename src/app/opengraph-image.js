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
          background: "#050505",
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(224,192,116,0.16), transparent 60%)",
            "radial-gradient(ellipse 70% 50% at 88% 86%, rgba(250,250,250,0.04), transparent 62%)",
          ].join(", "),
          color: "#fafafa",
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
            border: "2px solid #e0c074",
            borderRadius: 999,
            color: "#e0c074",
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
              "linear-gradient(135deg, #eccd84 0%, #e0c074 40%, #c9a24f 100%)",
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
            color: "#d9d9d9",
            marginTop: 28,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span>AI / Data Engineer</span>
          <span style={{ color: "#666666" }}>·</span>
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
                border: "1px solid rgba(250,250,250,0.18)",
                borderRadius: 999,
                color: "#a3a3a3",
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
            color: "#e0c074",
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
            border: "2px solid #e0c074",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 800,
            color: "#e0c074",
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
