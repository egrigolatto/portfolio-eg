import { SectionHeading } from "@/components/SectionHeading";
import { TechnologyItem } from "@/components/TechnologyItem";
import { technologies } from "@/lib/technologies";

import type { Content } from "@/lib/content";

export function Toolkit({ content }: { content: Content["toolkit"] }) {
  return (
    <section className="py-24" id="skills">
      <SectionHeading className="mb-16" label={content.label} />
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5">
        {technologies.map((technology) => (
          <TechnologyItem key={technology.name} technology={technology} />
        ))}
      </div>
    </section>
  );
}
