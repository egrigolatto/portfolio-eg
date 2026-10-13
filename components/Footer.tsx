import { LINKS } from "@/lib/links";

import type { Content } from "@/lib/content";

export function Footer({ content }: { content: Content["footer"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-hairline/10 py-12">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-stack-md px-gutter md:flex-row">
        <div className="font-display text-label-caps font-bold uppercase tracking-widest text-on-surface-variant">
          EG
        </div>
        <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
          © {year} Emanuel Grigolatto. {content.rights}
        </div>
        <div className="flex gap-8 font-label text-[10px] uppercase tracking-widest">
          <a
            className="text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            href={LINKS.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            {content.github}
          </a>
        </div>
      </div>
    </footer>
  );
}
