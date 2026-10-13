import type { Technology } from "@/lib/technologies";

export function TechnologyItem({ technology }: { technology: Technology }) {
  return (
    <div className="group flex flex-col items-center gap-4">
      <svg
        aria-hidden
        className="h-12 w-12 fill-on-surface-variant transition-colors group-hover:fill-accent"
        viewBox="0 0 24 24"
      >
        <path d={technology.iconPath} />
      </svg>
      <span className="font-label text-label-caps tracking-widest text-on-surface">
        {technology.name}
      </span>
    </div>
  );
}
