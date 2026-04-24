import { EASE } from "./constants";

export const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE.outExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE.outExpo } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -80, rotateY: 8 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.7, ease: EASE.outExpo },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 80, rotateY: -8 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.7, ease: EASE.outExpo },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE.outExpo },
  },
};

export const springPop = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

export const staggerParent = (interval = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: interval } },
});

export const textRevealWord = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE.outExpo },
  },
};
