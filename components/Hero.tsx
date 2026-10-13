import type { Content } from "@/lib/content";
import { LINKS } from "@/lib/links";

export function Hero({ content }: { content: Content["hero"] }) {
  return (
    <section
      className="flex min-h-screen flex-col items-start justify-center pt-28 pb-20"
      id="hero"
    >
      <div className="w-full max-w-4xl space-y-5 md:space-y-6">
        <h1 className="max-w-3xl font-display text-4xl leading-[0.9] font-bold tracking-[-0.06em] text-on-surface sm:text-[3.2rem] md:text-[4.6rem] lg:text-[5.4rem]">
          Emanuel Grigolatto
        </h1>
        <h2 className="font-display text-xl font-light leading-tight tracking-[-0.03em] text-accent sm:text-2xl md:text-[2.2rem] lg:text-[2.8rem]">
          {content.role}
        </h2>
        <p className="max-w-2xl font-body text-sm leading-relaxed text-on-surface-variant/80 sm:text-base md:text-lg">
          {content.intro}
        </p>
        <div className="flex flex-wrap gap-stack-md pt-2">
          <a
            className="border border-accent px-8 py-4 font-label text-label-caps uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            href="#contact"
          >
            {content.cta}
          </a>
          <a
            className="border border-accent px-8 py-4 font-label text-label-caps uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            href={LINKS.cv}
            rel="noopener noreferrer"
            target="_blank"
          >
            {content.cv}
          </a>
        </div>
      </div>
    </section>
  );
}
