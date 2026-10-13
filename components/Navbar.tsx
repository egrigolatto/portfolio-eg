"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LANG_COOKIE, LANGS } from "@/lib/content";
import type { Content, Lang } from "@/lib/content";

const NAV_ANCHORS = [
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
] as const;

const FOCUS_STYLES =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function LanguageButtons({
  active,
  groupLabel,
  onSwitch,
}: {
  active: Lang;
  groupLabel: string;
  onSwitch: (lang: Lang) => void;
}) {
  return (
    <span
      aria-label={groupLabel}
      className="flex items-center gap-2 font-label text-label-caps tracking-widest"
      role="group"
    >
      {LANGS.map((code, index) => (
        <span className="contents" key={code}>
          {index > 0 && (
            <span aria-hidden className="text-hairline">
              /
            </span>
          )}
          {code === active ? (
            <span aria-current="true" className="px-1 text-accent" lang={code}>
              {code.toUpperCase()}
            </span>
          ) : (
            <button
              className={`-m-1 px-1 py-1 font-label text-label-caps text-on-surface-variant transition-colors hover:text-accent ${FOCUS_STYLES}`}
              lang={code}
              onClick={() => onSwitch(code)}
              type="button"
            >
              {code.toUpperCase()}
            </button>
          )}
        </span>
      ))}
    </span>
  );
}

export function Navbar({
  content,
  lang,
}: {
  content: Content["nav"];
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links = NAV_ANCHORS.map((anchor) => ({
    href: anchor.href,
    label: content[anchor.key],
  }));

  function switchTo(next: Lang) {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <nav
      aria-label={content.menuLabel}
      className="fixed top-0 z-50 w-full bg-transparent"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-gutter py-6">
        <a
          className={`font-display text-body-lg font-bold uppercase tracking-widest text-on-surface transition-colors hover:text-accent ${FOCUS_STYLES}`}
          href="#hero"
        >
          EG
        </a>

        <div className="hidden items-center gap-stack-lg md:flex">
          {links.map((link) => (
            <a
              className={`-my-2 flex items-center py-2 font-label text-label-caps font-bold tracking-widest text-on-surface transition-colors hover:text-accent ${FOCUS_STYLES}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
          <LanguageButtons
            active={lang}
            groupLabel={content.languageLabel}
            onSwitch={switchTo}
          />
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          className={`-m-2 p-2 text-on-surface transition-colors hover:text-accent md:hidden ${FOCUS_STYLES}`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="sr-only">
            {open ? content.menuClose : content.menuOpen}
          </span>
          {open ? (
            <svg
              aria-hidden
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              aria-hidden
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          className="border-b border-white/10 bg-background/95 backdrop-blur-sm md:hidden"
          id="mobile-menu"
        >
          <ul className="mx-auto max-w-page py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className={`block px-gutter py-4 font-label text-label-caps font-bold tracking-widest text-on-surface transition-colors hover:text-accent ${FOCUS_STYLES}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between border-t border-hairline/10 px-gutter py-4">
              <LanguageButtons
                active={lang}
                groupLabel={content.languageLabel}
                onSwitch={switchTo}
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
