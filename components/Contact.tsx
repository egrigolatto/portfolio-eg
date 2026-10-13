import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { siGithub } from "simple-icons";
import { LINKS } from "@/lib/links";

import type { Content } from "@/lib/content";

export function Contact({ content }: { content: Content["contact"] }) {
  return (
    <section className="py-24" id="contact">
      <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
        <div>
          <SectionHeading label={content.label} />
          <p className="mb-12 max-w-md font-body text-body-lg leading-relaxed text-on-surface-variant/80">
            {content.invitation}
          </p>
          <div className="space-y-8 font-label text-label-caps tracking-widest text-on-surface">
            <a
              className="group flex w-fit items-center gap-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={LINKS.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden
                className="h-5 w-5 fill-on-surface-variant transition-colors group-hover:fill-accent"
                viewBox="0 0 24 24"
              >
                <path d={siGithub.path} />
              </svg>
              <span className="uppercase transition-colors group-hover:text-accent">
                {content.github}
              </span>
            </a>
            <a
              className="group flex w-fit items-center gap-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={LINKS.cv}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden
                className="h-5 w-5 stroke-on-surface-variant transition-colors group-hover:stroke-accent"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 3h7l4 4v14H7V3zm7 0v4h4M10 12h6M10 16h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="uppercase transition-colors group-hover:text-accent">
                {content.cv}
              </span>
            </a>
          </div>
        </div>
        <ContactForm content={content} />
      </div>
    </section>
  );
}
