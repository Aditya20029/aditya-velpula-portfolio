"use client";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Cloud, Wrench, Sparkles } from "lucide-react";
import { skills, SKILL_LEVELS } from "@/data/skills";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const ICON_MAP = {
  brain: Brain,
  code: Code2,
  cloud: Cloud,
  wrench: Wrench,
};

const ACCENT_RGB = {
  "--accent-primary": "124, 212, 255",
  "--accent-secondary": "255, 154, 230",
  "--accent-tertiary": "196, 167, 255",
  "--accent-success": "139, 245, 208",
  "--accent-warm": "255, 216, 138",
};

/* -------------------------------------------------------------------- */
/* Compact 4-bar proficiency indicator                                   */
/* -------------------------------------------------------------------- */
function LevelBars({ level, color, animate = false }) {
  const def = SKILL_LEVELS[level] || { bars: 1 };
  return (
    <div className="flex gap-[3px] items-end" aria-label={def.label}>
      {[1, 2, 3, 4].map((i) => {
        const lit = i <= def.bars;
        return (
          <motion.span
            key={i}
            initial={animate ? { scaleY: 0 } : false}
            animate={animate ? { scaleY: 1 } : undefined}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="block w-[3px] rounded-[1px] origin-bottom"
            style={{
              height: `${i * 3 + 4}px`,
              background: lit ? `rgb(${color})` : "rgba(255, 255, 255, 0.12)",
              boxShadow: lit ? `0 0 6px rgba(${color}, 0.7)` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Single skill row                                                     */
/* -------------------------------------------------------------------- */
function SkillRow({ skill, color, idx }) {
  const def = SKILL_LEVELS[skill.level] || {};
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: idx * 0.035 }}
      whileHover={{ x: 3 }}
      className="group/row relative flex items-center justify-between gap-3 py-2.5 px-3 rounded-md cursor-default transition-colors hover:bg-[var(--surface-glass-hover)]"
    >
      {/* Left bar accent on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r origin-top scale-y-0 group-hover/row:scale-y-100 transition-transform duration-300"
        style={{ background: `rgb(${color})` }}
      />
      <div className="flex items-center gap-3 min-w-0">
        <LevelBars level={skill.level} color={color} />
        <div className="min-w-0">
          <div
            className="t-body-sm font-medium leading-tight truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {skill.name}
          </div>
          <div className="t-mono-sm text-[var(--text-muted)] mt-0.5 truncate">
            {skill.proficiency}
          </div>
        </div>
      </div>
      <span
        className="t-mono-sm shrink-0 opacity-70 group-hover/row:opacity-100 transition-opacity"
        style={{ color: `rgb(${color})`, letterSpacing: "0.16em" }}
      >
        {def.label}
      </span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/* Category card with cursor-follow gradient                            */
/* -------------------------------------------------------------------- */
function CategoryCard({ category }) {
  const color = ACCENT_RGB[category.color] || "124, 212, 255";
  const Icon = ICON_MAP[category.icon] || Code2;
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    ref.current.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group relative h-full"
      style={{ "--mx": "50%", "--my": "50%" }}
    >
      {/* Iridescent edge */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          padding: "1px",
          background: `linear-gradient(135deg, rgba(${color}, 0.5), rgba(${color}, 0.1) 60%, rgba(${color}, 0.5))`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Cursor-follow glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(420px circle at var(--mx) var(--my), rgba(${color}, 0.12), transparent 55%)`,
        }}
      />

      <div className="glass-card relative p-6 md:p-7 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
            style={{
              background: `rgba(${color}, 0.14)`,
              color: `rgb(${color})`,
              border: `1px solid rgba(${color}, 0.3)`,
              boxShadow: `0 0 18px -8px rgba(${color}, 0.6)`,
            }}
          >
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="t-h3 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {category.name}
            </h3>
            <div className="t-mono-sm text-[var(--text-muted)] mt-1">
              {category.tagline}
            </div>
          </div>
          <span
            className="t-mono-sm shrink-0"
            style={{
              color: `rgb(${color})`,
              letterSpacing: "0.18em",
              opacity: 0.8,
            }}
          >
            {String(category.skills.length).padStart(2, "0")}
          </span>
        </div>

        {/* Hairline divider */}
        <div
          className="h-px mb-2 -mx-3"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${color}, 0.3), transparent)`,
          }}
        />

        {/* Skill list */}
        <div className="flex flex-col -mx-1 flex-1">
          {category.skills.map((s, i) => (
            <SkillRow key={s.name} skill={s} color={color} idx={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Animated stats strip (totals + level histogram)                      */
/* -------------------------------------------------------------------- */
function StatsStrip() {
  const stats = useMemo(() => {
    const all = skills.categories.flatMap((c) => c.skills);
    const total = all.length;
    const expertish = all.filter(
      (s) => s.level === "primary" || s.level === "expert"
    ).length;
    const advanced = all.filter((s) => s.level === "advanced").length;
    const cats = skills.categories.length;
    return { total, expertish, advanced, cats };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="relative grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
    >
      {[
        { label: "Total Skills", value: stats.total, color: "124, 212, 255" },
        { label: "Expert / Primary", value: stats.expertish, color: "196, 167, 255" },
        { label: "Advanced", value: stats.advanced, color: "255, 154, 230" },
        { label: "Domains", value: stats.cats, color: "139, 245, 208" },
      ].map((s) => (
        <div
          key={s.label}
          className="relative glass-card px-5 py-4 overflow-hidden"
          style={{ borderColor: `rgba(${s.color}, 0.18)` }}
        >
          {/* Corner glow */}
          <div
            aria-hidden
            className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-40"
            style={{
              background: `radial-gradient(circle, rgba(${s.color}, 0.4), transparent 70%)`,
            }}
          />
          <div className="relative t-mono-sm text-[var(--text-muted)]">
            {s.label}
          </div>
          <div
            className="relative t-counter mt-1 leading-none"
            style={{ color: `rgb(${s.color})` }}
          >
            <AnimatedCounter value={s.value} duration={1400} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/* Main matrix                                                          */
/* -------------------------------------------------------------------- */
export default function SkillsMatrix() {
  const [filter, setFilter] = useState(null); // null = all

  return (
    <div>
      {/* Stats */}
      <StatsStrip />

      {/* Filter pills + legend */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter(null)}
            data-cursor
            className={`t-mono-sm px-3 py-1.5 rounded-full border transition-colors ${
              filter === null
                ? "border-[var(--border-active)] text-[var(--text-primary)] bg-[var(--surface-glass-hover)]"
                : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
            }`}
            style={{ letterSpacing: "0.14em" }}
          >
            <Sparkles size={11} className="inline mr-1.5 -mt-0.5" />
            All
          </button>
          {skills.categories.map((c) => {
            const color = ACCENT_RGB[c.color] || "124, 212, 255";
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(active ? null : c.id)}
                data-cursor
                className="t-mono-sm px-3 py-1.5 rounded-full border transition-all"
                style={{
                  letterSpacing: "0.14em",
                  borderColor: active
                    ? `rgba(${color}, 0.55)`
                    : "var(--border-subtle)",
                  background: active
                    ? `rgba(${color}, 0.08)`
                    : "transparent",
                  color: active ? `rgb(${color})` : "var(--text-muted)",
                  boxShadow: active
                    ? `0 0 14px -6px rgba(${color}, 0.7)`
                    : "none",
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Inline legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 t-mono-sm text-[var(--text-muted)]">
          {Object.entries(SKILL_LEVELS).map(([key, def]) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <span className="flex gap-[2px] items-end">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="block w-[2px] rounded-[1px]"
                    style={{
                      height: `${i * 2 + 3}px`,
                      background:
                        i <= def.bars
                          ? "rgba(255, 255, 255, 0.55)"
                          : "rgba(255, 255, 255, 0.12)",
                    }}
                  />
                ))}
              </span>
              <span>{def.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grid \u2014 when a filter is active we render ONLY the matching
          card (full width). 'All' shows the regular 2-column grid. */}
      <motion.div
        layout
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={
          filter
            ? "grid grid-cols-1 gap-6"
            : "grid md:grid-cols-2 gap-6"
        }
      >
        <AnimatePresence mode="popLayout">
          {skills.categories
            .filter((c) => !filter || c.id === filter)
            .map((cat, i) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <CategoryCard category={cat} idx={i} />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
