import type { PropsWithChildren } from "react";

export function Container({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-margin-mobile md:px-margin-desktop ${className}`}
    >
      {children}
    </div>
  );
}
