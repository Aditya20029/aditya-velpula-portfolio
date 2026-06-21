"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { SECTIONS } from "@/utils/constants";
import { personal } from "@/data/personal";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";

const VISIBLE_SECTIONS = SECTIONS.filter((s) => s.id !== "hero");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const [logoClicks, setLogoClicks] = useState(0);
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLogoClick = (e) => {
    e.preventDefault();
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      setShowDiagnostic(true);
      setLogoClicks(0);
      setTimeout(() => setShowDiagnostic(false), 3000);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "blur(0px)",
          background: scrolled
            ? "color-mix(in srgb, var(--bg-primary) 80%, transparent)"
            : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="container-site flex items-start justify-between h-24 px-4 pt-6 md:px-8">
          <a
            href="#hero"
            onClick={onLogoClick}
            className="premium-nav-shell grid h-11 w-11 place-items-center t-mono font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
            data-cursor
            aria-label="Back to top"
          >
            {personal.monogram}
          </a>

          <div className="premium-nav-shell hidden md:flex items-center gap-1 p-1 t-mono-sm">
            {VISIBLE_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="relative px-3.5 py-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                data-cursor
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,212,255,0.13), rgba(255,154,230,0.1))",
                      border: "1px solid var(--border-subtle)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
                {active === s.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-4 -bottom-px h-px"
                    style={{ background: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor
              data-cursor-label="Open PDF"
              className="premium-nav-shell hidden md:inline-flex items-center gap-2 px-4 py-2.5 t-mono-sm text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors"
            >
              <FileText size={14} /> Resume
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)]"
              data-cursor
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] md:hidden flex flex-col"
            style={{ background: "color-mix(in srgb, var(--bg-primary) 95%, transparent)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {VISIBLE_SECTIONS.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className="t-h2 text-[var(--text-primary)]"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDiagnostic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            style={{ background: "rgba(0,0,0,0.85)" }}
          >
            <div className="glass-elevated p-8 font-mono-var t-mono text-[var(--accent-success)] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(transparent 50%, rgba(16,185,129,0.04) 50%)", backgroundSize: "100% 4px" }} />
              <div className="mb-3 text-[var(--accent-primary)]">[DIAGNOSTIC MODE]</div>
              <div>RENDER ENGINE    ████████████ 100%</div>
              <div>ANIMATION CORE   ████████████ 100%</div>
              <div>NEURAL CANVAS    ████████████ 100%</div>
              <div className="mt-3">ALL SYSTEMS NOMINAL</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
