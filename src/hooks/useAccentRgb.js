"use client";
import { useTheme } from "@/hooks/useTheme";

/**
 * Returns a map of accent CSS-var name → "r, g, b" string, swapped per theme.
 *
 * Dark theme: pastel iridescent (matches the reel aesthetic)
 * Light theme: saturated jewel tones (pop on white)
 *
 * Components that draw via canvas / inline SVG / inline styles can't use
 * CSS vars directly for rgba(...) interpolation; this hook gives them
 * the raw triplet so they stay theme-correct.
 */

const DARK = {
  "--accent-primary": "124, 212, 255",
  "--accent-secondary": "255, 154, 230",
  "--accent-tertiary": "196, 167, 255",
  "--accent-success": "139, 245, 208",
  "--accent-warm": "255, 216, 138",
  "--accent-coral": "255, 180, 138",
};

const LIGHT = {
  "--accent-primary": "29, 78, 216",      // electric blue
  "--accent-secondary": "190, 24, 93",    // magenta
  "--accent-tertiary": "109, 40, 217",    // royal purple
  "--accent-success": "4, 120, 87",       // emerald
  "--accent-warm": "180, 83, 9",          // burnt amber
  "--accent-coral": "194, 65, 12",        // coral
};

export function useAccentRgb() {
  const { theme } = useTheme();
  return theme === "light" ? LIGHT : DARK;
}

/** Stand-alone helper if a component already has the theme. */
export function getAccentRgb(token, theme) {
  const map = theme === "light" ? LIGHT : DARK;
  return map[token] || (theme === "light" ? "29, 78, 216" : "124, 212, 255");
}
