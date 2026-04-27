"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/utils/constants";

const MESSAGES = [
  "INITIALIZING SYSTEM...",
  "LOADING NEURAL INTERFACE...",
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [msg, setMsg] = useState(0);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const returning = sessionStorage.getItem("av-visited");
    if (returning) {
      setVisible(false);
      return;
    }

    const t1 = setTimeout(() => setMsg(1), 600);
    const t2 = setTimeout(() => setShowName(true), 1100);
    /* Bumped exit from 2200 -> 2700ms so the "Welcome — let's make it
       worth your time" tagline under the name has a beat to land
       before the preloader slides off. */
    const t3 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("av-visited", "1");
    }, 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "var(--void)" }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.6, ease: EASE.inExpo }}
        >
          <div className="flex flex-col items-center gap-6">
            {!showName ? (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 t-mono text-[var(--text-muted)]"
              >
                <span>{MESSAGES[msg]}</span>
                <span
                  className="inline-block w-[6px] h-[14px] bg-[var(--accent-primary)]"
                  style={{ animation: "typewriter-cursor 1s step-end infinite" }}
                />
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: EASE.outExpo }}
                  className="h-px w-[260px] origin-center"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE.outExpo }}
                  className="t-display text-[var(--text-primary)]"
                  style={{ letterSpacing: "0.18em" }}
                >
                  ADITYA VELPULA
                </motion.div>
                {/* Recruiter-facing tagline. Lands a beat after the name
                    so the eye reads brand first, hook second. */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: EASE.outExpo }}
                  className="t-mono-sm"
                  style={{
                    color: "var(--accent-primary)",
                    letterSpacing: "0.24em",
                  }}
                >
                  WELCOME · LET&apos;S MAKE IT WORTH YOUR TIME
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
