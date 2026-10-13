import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Sora } from "next/font/google";

import "./globals.css";

import { Starfield } from "@/components/Starfield";
import { dictionaries } from "@/lib/content";
import { getActiveLang } from "@/lib/content/server";
import { siteUrl } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getActiveLang();
  const { meta } = dictionaries[lang];

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: "Emanuel Grigolatto",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: "/",
      title: meta.title,
      description: meta.description,
      siteName: "Emanuel Grigolatto",
      locale: lang === "es" ? "es_AR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#081425",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getActiveLang();

  return (
    <html lang={lang}>
      <body
        className={`${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} bg-background font-body text-on-surface antialiased`}
      >
        <Starfield />
        {children}
      </body>
    </html>
  );
}
