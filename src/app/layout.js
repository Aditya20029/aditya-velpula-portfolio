import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

/* Fraunces \u2014 editorial serif for the hero display name */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Aditya Velpula · AI Engineer",
  description:
    "Building intelligent systems at scale. RAG pipelines, LLM orchestration, and cloud data infrastructure.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Aditya Velpula · AI Engineer",
    description:
      "Building intelligent systems at scale. RAG pipelines, LLM orchestration, and cloud data infrastructure.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#f3f5fb",
};

const criticalShellCss = `
  html,
  body {
    margin: 0;
    background: #f3f5fb;
    color: #111827;
  }

  .skip-link {
    position: absolute;
    left: -9999px;
    top: 16px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: 9999;
  }

  .skip-link:focus {
    position: fixed;
    left: 16px;
    width: auto;
    height: auto;
    padding: 12px 20px;
    background: #ffffff;
    color: #0b1220;
    border: 1px solid rgba(29, 78, 216, 0.45);
    border-radius: 8px;
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <style
          id="critical-shell"
          dangerouslySetInnerHTML={{ __html: criticalShellCss }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
