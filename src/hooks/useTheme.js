"use client";
import { useEffect, useState, useCallback } from "react";

/**
 * Read-write theme hook. All instances stay in sync via a MutationObserver
 * on <html data-theme>, so components like Aurora / NeuralBackground can
 * react when ThemeToggle flips the attribute anywhere in the tree.
 */
export function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    const stored = localStorage.getItem("av-theme");
    const initial = stored || html.getAttribute("data-theme") || "dark";
    setTheme(initial);
    html.setAttribute("data-theme", initial);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          const next = html.getAttribute("data-theme") || "dark";
          setTheme(next);
        }
      }
    });
    observer.observe(html, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "dark";
    /* Toggle direction: if currently dark, flip to light and back.
       Default is dark so this preserves the round-trip behavior. */
    const next = current === "dark" ? "light" : "dark";

    /* Add 'theme-transitioning' to <html> so the global transition rule
       in globals.css applies, flip the theme, then strip the class
       after the 500ms crossfade so we don't leave a global
       transition-on-everything rule active (it would make hover states
       feel mushy). */
    html.classList.add("theme-transitioning");
    html.setAttribute("data-theme", next);
    try {
      localStorage.setItem("av-theme", next);
    } catch (_) {}

    window.setTimeout(() => {
      html.classList.remove("theme-transitioning");
    }, 850);
    // setState happens via the observer
  }, []);

  return { theme, toggle };
}
