"use client";
import { useTheme } from "@/hooks/useTheme";

/**
 * Returns a map of accent CSS-var name → "r, g, b" string, swapped per theme.
 *
 * Dark theme: champagne -> bronze metallic golds on near-black
 * Light theme: deep golds + bronzes that stay legible on cream
 *
 * Components that draw via canvas / inline SVG / inline styles can't use
 * CSS vars directly for rgba(...) interpolation; this hook gives them
 * the raw triplet so they stay theme-correct.
 */

const DARK = {
  "--accent-primary": "224, 192, 116",   // gold
  "--accent-secondary": "201, 162, 79",  // gold soft
  "--accent-tertiary": "236, 205, 132",  // gold strong
  "--accent-success": "201, 162, 79",
  "--accent-warm": "224, 192, 116",
  "--accent-coral": "201, 162, 79",
  "--accent-rose": "184, 138, 46",
};

const LIGHT = {
  "--accent-primary": "148, 101, 12",    // deep gold (AA on white)
  "--accent-secondary": "111, 77, 9",    // gold strong
  "--accent-tertiary": "184, 138, 46",   // gold soft
  "--accent-success": "111, 77, 9",
  "--accent-warm": "148, 101, 12",
  "--accent-coral": "111, 77, 9",
  "--accent-rose": "122, 84, 20",
};

export function useAccentRgb() {
  const { theme } = useTheme();
  return theme === "light" ? LIGHT : DARK;
}

/** Stand-alone helper if a component already has the theme. */
export function getAccentRgb(token, theme) {
  const map = theme === "light" ? LIGHT : DARK;
  return map[token] || (theme === "light" ? "148, 101, 12" : "224, 192, 116");
}
