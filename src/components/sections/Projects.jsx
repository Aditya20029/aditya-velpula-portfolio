"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAccent from "@/components/ui/SectionAccent";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [active, setActive] = useState(null);
  return (
    <section id="projects" className="section relative overflow-hidden" aria-label="Projects">
      <SectionAccent
        variant="ring"
        size={560}
        position={{ top: "30%", left: "5%" }}
        opacity={0.18}
        reverse
      />
      <SectionAccent
        variant="orb"
        size={400}
        position={{ top: "78%", left: "95%" }}
        opacity={0.28}
      />
      <div className="container-site relative z-10">
        <SectionHeading
          kicker="SELECTED WORK"
          title="Things I've Shipped"
          subtitle="Seven projects, end-to-end. Tap any card for the architecture, metrics, and stack."
        />
        <div className="section-divider my-12" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
