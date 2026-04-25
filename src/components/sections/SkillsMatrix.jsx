"use client";
import { motion } from "framer-motion";
import { Brain, Code2, Cloud, Wrench } from "lucide-react";
import { skills, SKILL_LEVELS } from "@/data/skills";

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

function LevelBars({ level, color }) {
  const def = SKILL_LEVELS[level] || { bars: 1 };
  return (
    <div className="flex gap-[3px] items-end" aria-label={def.label}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="block w-[3px] rounded-[1px] transition-colors"
          style={{
            height: `${i * 3 + 4}px`,
            background:
              i <= def.bars
                ? `rgb(${color})`
                : "rgba(255, 255, 255, 0.12)",
            boxShadow:
              i <= def.bars ? `0 0 4px rgba(${color}, 0.6)` : "none",
          }}
        />
      ))}
    </div>
  );
}

function SkillRow({ skill, color, idx }) {
  const def = SKILL_LEVELS[skill.level] || {};
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      className="group flex items-center justify-between gap-3 py-2.5 px-3 rounded-md hover:bg-[var(--surface-glass-hover)] transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <LevelBars level={skill.level} color={color} />
        <div className="min-w-0">
          <div
            className="t-body-sm font-medium leading-tight"
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
        className="t-mono-sm shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ color: `rgb(${color})`, letterSpacing: "0.16em" }}
      >
        {def.label}
      </span>
    </motion.div>
  );
}

function CategoryCard({ category, idx }) {
  const color = ACCENT_RGB[category.color] || "124, 212, 255";
  const Icon = ICON_MAP[category.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: idx * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group"
    >
      {/* Iridescent edge that brightens on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          padding: "1px",
          background: `linear-gradient(135deg, rgba(${color}, 0.45), rgba(${color}, 0.1) 60%, rgba(${color}, 0.45))`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="glass-card p-6 md:p-7 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `rgba(${color}, 0.12)`,
              color: `rgb(${color})`,
              border: `1px solid rgba(${color}, 0.25)`,
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
              opacity: 0.75,
            }}
          >
            {String(category.skills.length).padStart(2, "0")}
          </span>
        </div>

        {/* Hairline divider */}
        <div
          className="h-px mb-2 -mx-3"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${color}, 0.25), transparent)`,
          }}
        />

        {/* Skill list */}
        <div className="flex flex-col -mx-1 flex-1">
          {category.skills.map((s, i) => (
            <SkillRow key={s.name} skill={s} color={color} idx={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsMatrix() {
  return (
    <div>
      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 t-mono-sm text-[var(--text-muted)]"
      >
        <span style={{ letterSpacing: "0.18em" }}>PROFICIENCY</span>
        {Object.entries(SKILL_LEVELS).map(([key, def]) => (
          <span key={key} className="inline-flex items-center gap-2">
            <span className="flex gap-[3px] items-end">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="block w-[3px] rounded-[1px]"
                  style={{
                    height: `${i * 3 + 4}px`,
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
      </motion.div>

      {/* 2-col category grid (1-col on mobile) */}
      <div className="grid md:grid-cols-2 gap-6">
        {skills.categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} idx={i} />
        ))}
      </div>
    </div>
  );
}
