"use client";
import { useEffect, useState, useCallback } from "react";

/**
 * Read-write theme hook. All instances stay in sync via a MutationObserver
 * on <html data-theme>, so components like Aurora / NeuralBackground can
 * react when ThemeToggle flips the attribute anywhere in the tree.
 */
export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    const stored = localStorage.getItem("av-theme");
    const initial = stored || html.getAttribute("data-theme") || "light";
    setTheme(initial);
    html.setAttribute("data-theme", initial);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          const next = html.getAttribute("data-theme") || "light";
          setTheme(next);
        }
      }
    });
    observer.observe(html, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try {
      localStorage.setItem("av-theme", next);
    } catch (_) {}
    // setState happens via the observer
  }, []);

  return { theme, toggle };
}
