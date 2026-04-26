"use client";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

/**
 * On touch devices, force framer-motion into reduced-motion mode globally.
 * Every <motion.*> on the page collapses its initial -> animate transition
 * to a no-op, snapping to the final state instead of running per-frame
 * transforms. The visuals (final layout) are identical; only the entrance
 * animation is skipped.
 *
 * This kills the dominant per-scroll cost on phones: each whileInView
 * card reveal across Projects + Skills + Certs was scheduling its own
 * IntersectionObserver + transform/opacity interpolation. With a
 * MotionConfig wrapper they all become instantly-final.
 *
 * Desktop: no detection match, MotionConfig is a passthrough.
 */
export default function MobileMotion({ children }) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <MotionConfig reducedMotion={isTouch ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
