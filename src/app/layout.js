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
  themeColor: "#0a0a12",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
