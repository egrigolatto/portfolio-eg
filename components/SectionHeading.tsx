export function SectionHeading({
  label,
  className = "mb-12",
}: {
  className?: string;
  label: string;
}) {
  return (
    <h2
      className={`flex items-center gap-4 font-label text-label-caps tracking-widest text-on-surface-variant uppercase ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-hairline/50" />
      <span>{label}</span>
    </h2>
  );
}
