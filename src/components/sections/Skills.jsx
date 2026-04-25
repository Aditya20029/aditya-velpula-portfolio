"use client";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAccent from "@/components/ui/SectionAccent";
import SkillsMatrix from "./SkillsMatrix";

export default function Skills() {
  return (
    <section id="skills" className="section relative overflow-hidden" aria-label="Skills">
      <SectionAccent
        variant="arc"
        size={520}
        position={{ top: "12%", left: "85%" }}
        opacity={0.3}
        reverse
      />
      <div className="container-site relative z-10">
        <SectionHeading
          kicker="WHAT I WORK WITH"
          title="Skills & Stack"
          subtitle="The tools I use daily, grouped by domain. Bars indicate depth — Primary marks my daily-driver, Working denotes hands-on familiarity."
        />
        <div className="section-divider my-12" />
        <SkillsMatrix />
      </div>
    </section>
  );
}
