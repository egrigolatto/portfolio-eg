import { About } from "@/components/About";
import { Container } from "@/components/Container";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Toolkit } from "@/components/Toolkit";
import { dictionaries } from "@/lib/content";
import { getActiveLang } from "@/lib/content/server";

export default async function Home() {
  const lang = await getActiveLang();
  const content = dictionaries[lang];

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-2 focus:font-label focus:text-label-caps focus:uppercase focus:tracking-widest focus:text-accent"
        href="#main"
      >
        {content.nav.skip}
      </a>
      <Navbar content={content.nav} lang={lang} />
      <main
        className="relative z-10 w-full outline-none"
        id="main"
        tabIndex={-1}
      >
        <Container>
          <Hero content={content.hero} />
        </Container>
        <div className="relative mt-12 w-full bg-band pt-12 pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 left-0 h-48 w-full bg-gradient-to-b from-transparent to-band"
          />
          <Container className="space-y-48">
            <About content={content.about} />
            <Projects content={content.projects} />
            <Toolkit content={content.toolkit} />
            <Contact content={content.contact} />
          </Container>
          <Footer content={content.footer} />
        </div>
      </main>
    </>
  );
}
