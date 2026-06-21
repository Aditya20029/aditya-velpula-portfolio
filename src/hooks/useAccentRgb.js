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
  "--accent-primary": "232, 198, 106",   // champagne gold
  "--accent-secondary": "201, 150, 47",  // deep gold
  "--accent-tertiary": "242, 217, 143",  // pale gold
  "--accent-success": "194, 162, 83",    // antique gold
  "--accent-warm": "245, 207, 106",      // amber gold
  "--accent-coral": "200, 128, 58",      // copper
  "--accent-rose": "181, 106, 46",       // bronze
};

const LIGHT = {
  "--accent-primary": "154, 123, 31",    // deep gold
  "--accent-secondary": "138, 90, 20",   // bronze
  "--accent-tertiary": "184, 134, 11",   // gold
  "--accent-success": "122, 99, 20",     // dark antique gold
  "--accent-warm": "181, 116, 12",       // amber bronze
  "--accent-coral": "168, 95, 42",       // copper
  "--accent-rose": "156, 79, 36",        // terracotta bronze
};

export function useAccentRgb() {
  const { theme } = useTheme();
  return theme === "light" ? LIGHT : DARK;
}

/** Stand-alone helper if a component already has the theme. */
export function getAccentRgb(token, theme) {
  const map = theme === "light" ? LIGHT : DARK;
  return map[token] || (theme === "light" ? "154, 123, 31" : "232, 198, 106");
}
