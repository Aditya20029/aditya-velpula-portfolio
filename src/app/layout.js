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
  metadataBase: new URL("https://adityavelpula.com"),
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
    url: "https://adityavelpula.com",
    siteName: "Aditya Velpula",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Velpula · AI Engineer",
    description:
      "Building intelligent systems at scale. RAG pipelines, LLM orchestration, and cloud data infrastructure.",
  },
};

export const viewport = {
  /* Light theme is the default for first-time visitors, so the mobile
     chrome / Safari status bar should match. */
  themeColor: "#f3f5fb",
};

const criticalShellCss = `
  html,
  body {
    margin: 0;
  }

  /* Pre-hydration shell colors. This <style> tag lives in <head>
     after globals.css, so it would otherwise win the cascade and
     trap html/body on the light shell color even when the user
     toggles to dark. Scoping by [data-theme] so each theme's shell
     bg matches its CSS-variable bg, and the toggle actually paints. */
  html[data-theme="light"],
  html[data-theme="light"] body {
    background: #f3f5fb;
    color: #111827;
  }
  html[data-theme="dark"],
  html[data-theme="dark"] body {
    background: #07070d;
    color: #e2e8f0;
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
    background: #0e0e18;
    color: #f1f5f9;
    border: 1px solid rgba(255, 154, 230, 0.45);
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
        {/* Apply the user's stored theme synchronously *before* first
            paint so returning dark-mode visitors don't flash light.
            New visitors fall through to the SSR default ("light"). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("av-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`,
          }}
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
