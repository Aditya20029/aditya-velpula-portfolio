"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [active, setActive] = useState(null);
  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container-site">
        <SectionHeading
          kicker="ACT III · PROOF"
          title="Selected Projects"
          subtitle="Each of these was shipped end-to-end. Click any card to see the architecture, metrics, and stack."
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
