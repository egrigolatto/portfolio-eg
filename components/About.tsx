import { SectionHeading } from "@/components/SectionHeading";
import { siLinkedinPath } from "@/lib/icons";
import { LINKS } from "@/lib/links";

import type { Content } from "@/lib/content";

export function About({ content }: { content: Content["about"] }) {
  return (
    <section className="py-24" id="about">
      <div className="max-w-3xl">
        <SectionHeading label={content.label} />
        <p className="font-display text-headline-md leading-tight font-light text-on-surface md:text-headline-lg">
          {content.statement}
        </p>
        <p className="mt-stack-md max-w-xl font-body text-body-lg leading-relaxed text-on-surface-variant/80">
          {content.study}
        </p>
        <div className="mt-12 font-label text-label-caps tracking-widest text-on-surface">
          <a
            className="group flex w-fit items-center gap-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            href={LINKS.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden
              className="h-5 w-5 fill-on-surface-variant transition-colors group-hover:fill-accent"
              viewBox="0 0 24 24"
            >
              <path d={siLinkedinPath} />
            </svg>
            <span className="uppercase transition-colors group-hover:text-accent">
              {content.linkedin}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
