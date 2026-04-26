"use client";

export default function PremiumBackdrop() {
  return (
    <div className="premium-backdrop" aria-hidden>
      <div className="premium-backdrop__mesh" />
      <div className="premium-backdrop__grid" />
      <div className="premium-backdrop__frame" />
      <div className="premium-backdrop__scan" />
    </div>
  );
}
