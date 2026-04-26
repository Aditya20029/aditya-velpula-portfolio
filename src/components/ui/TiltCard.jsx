"use client";
import clsx from "clsx";
import { useTilt } from "@/hooks/useTilt";

export default function TiltCard({
  className,
  children,
  max = 6,
  scale = 1.02,
  glowColor = "59,130,246",
  ...rest
}) {
  const [ref] = useTilt({ max, scale });
  return (
    <div
      ref={ref}
      className={clsx(
        "tilt-card relative transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(${glowColor},0.08), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
