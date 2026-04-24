"use client";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";

const SkillsGraph = dynamic(
  () => import("@/components/canvas/SkillsGraph"),
  { ssr: false, loading: () => <div className="h-[600px] rounded-2xl glass-subtle" /> }
);

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="container-site">
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
