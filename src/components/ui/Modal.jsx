"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EASE } from "@/utils/constants";

export default function Modal({ open, onClose, layoutId, children, accentColor = "var(--accent-primary)" }) {
  const ref = useRef(null);
  /* Render the modal as a portal under <body> so it escapes any parent
     stacking contexts (Framer-Motion transforms, overflow:hidden sections,
     etc.). Without this, sections later in the page can render on top
     of the modal even at z-index 100. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const tree = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.button
            aria-label="Close modal backdrop"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            layoutId={layoutId}
            ref={ref}
            className="relative glass-elevated w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 pt-16 md:p-10 md:pt-10"
            style={{
              borderColor: accentColor,
              // Solid fill so page content can't bleed through the glass.
              // The glass-elevated rules above still provide blur/shadow/border.
              background: "var(--bg-elevated)",
            }}
            initial={layoutId ? undefined : { opacity: 0, scale: 0.92, y: 12 }}
            animate={layoutId ? undefined : { opacity: 1, scale: 0.97, y: 0 }}
            exit={layoutId ? undefined : { opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.4, ease: EASE.outExpo }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="sticky top-3 right-3 z-20 ml-auto -mt-1 mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-lg hover:bg-[var(--bg-active)] transition-colors md:absolute md:top-4 md:right-4 md:h-10 md:w-10"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(tree, document.body);
}
