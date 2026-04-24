"use client";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAccent from "@/components/ui/SectionAccent";

const SkillsGraph = dynamic(
  () => import("@/components/canvas/SkillsGraph"),
  { ssr: false, loading: () => <div className="h-[600px] rounded-2xl glass-subtle" /> }
);

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
          kicker="ACT III · SKILL GRAPH"
          title="The Neural Network"
          subtitle="Hover a category to highlight its connections. Drag any skill to feel the physics. This is a living map of what I work with daily."
        />
        <div className="section-divider my-12" />
        <SkillsGraph />
      </div>
    </section>
  );
}
