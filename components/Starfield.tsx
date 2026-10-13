export function Starfield() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute left-1/2 top-[-20vh] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-3xl" />
      <div className="absolute bottom-[-10vh] right-[-10vw] h-[50vh] w-[50vw] rounded-full bg-accent-strong/[0.05] blur-3xl" />
      <div className="star-layer star-layer--sm" />
      <div className="star-layer star-layer--md" />
      <div className="star-layer star-layer--lg" />
    </div>
  );
}
