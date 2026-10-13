import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/lib/projects";

import type { Content } from "@/lib/content";

export function Projects({ content }: { content: Content["projects"] }) {
  return (
    <section className="py-24" id="projects">
      <SectionHeading className="mb-16" label={content.label} />
      <div className="space-y-24">
        {projects.map((project, index) => {
          const item = content.items[project.slug as keyof typeof content.items];

          return (
            <ProjectCard
              content={{
                alt: item.alt,
                description: item.description,
                live: content.live,
                source: content.source,
              }}
              index={index}
              key={project.slug}
              project={project}
            />
          );
        })}
      </div>
    </section>
  );
}
