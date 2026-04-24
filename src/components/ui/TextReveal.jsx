"use client";
import { motion } from "framer-motion";
import { textRevealWord, staggerParent } from "@/utils/animations";

export default function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  interval = 0.08,
  highlight,
}) {
  const words = text.split(" ");
  const MotionTag = motion(Tag);
  return (
    <MotionTag
      className={className}
      variants={staggerParent(interval)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isHighlight = highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <motion.span
            key={i}
            variants={textRevealWord}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              color: isHighlight ? "var(--accent-primary)" : undefined,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
