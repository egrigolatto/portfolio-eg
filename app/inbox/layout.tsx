import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Inbox — Emanuel Grigolatto",
};

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative z-10 min-h-screen pb-24 pt-32">{children}</div>;
}
