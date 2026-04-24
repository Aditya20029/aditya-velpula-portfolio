"use client";
import { useEffect, useState } from "react";
import { SECTIONS, SECTION_TINTS } from "@/utils/constants";
import { useTheme } from "@/hooks/useTheme";

export function useActiveSection() {
  const [active, setActive] = useState("hero");
  const { theme } = useTheme();

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const tints = SECTION_TINTS[theme] || SECTION_TINTS.dark;
    const tint = tints[active] || "transparent";
    document.documentElement.style.setProperty("--context-tint", tint);
  }, [active, theme]);

  return active;
}
