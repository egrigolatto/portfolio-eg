import Image from "next/image";

import type { Project } from "@/lib/projects";

type ProjectCardContent = {
  alt: string;
  description: string;
  live: string;
  source: string;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectCard({
  content,
  index,
  project,
}: {
  content: ProjectCardContent;
  index: number;
  project: Project;
}) {
  const imageRight = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  const imageBlock = (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-surface-deep/50 shadow-2xl lg:col-span-6 ${
        imageRight ? "lg:order-2" : ""
      }`}
    >
      <div className="aspect-video w-full overflow-hidden">
        <Image
          alt={content.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          height={768}
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={project.imageSrc}
          width={1376}
        />
      </div>
    </div>
  );

  return (
    <article className="group border-b border-hairline/10 pb-16 transition-colors hover:border-hairline/30">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {imageBlock}
        <div
          className={`flex flex-col justify-center space-y-6 lg:col-span-6 ${
            imageRight ? "lg:order-1" : ""
          }`}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex items-center gap-4">
                <h3 className="font-display text-headline-md font-light text-on-surface transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <span className="font-label text-[10px] tracking-widest text-on-surface-variant/50">
                  {number}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-6 font-label text-label-caps tracking-widest">
                <a
                  className="group/link flex items-center gap-1 text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={project.liveDemoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="uppercase">{content.live}</span>
                  <ArrowIcon />
                </a>
                <a
                  className="group/link flex items-center gap-1 text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={project.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="uppercase">{content.source}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
            <p className="max-w-2xl font-body text-body-md leading-relaxed text-on-surface-variant/80">
              {content.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2 font-label text-[10px] tracking-widest text-on-surface-variant/70">
            {project.tags.map((tag) => (
              <span
                className="rounded border border-hairline/20 bg-surface-deep/50 px-3 py-1"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
