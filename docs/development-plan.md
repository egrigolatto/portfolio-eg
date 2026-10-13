# Development Plan

## Goal

Build the portfolio in small, verifiable stages.

Do not implement the future private message-management area during the initial
UI phase.

## Phase 0 — Project setup

- [x] Create Next.js project
- [x] Configure TypeScript
- [x] Configure Tailwind CSS
- [x] Configure ESLint
- [x] Configure project scripts
- [x] Add `AGENTS.md`
- [x] Add `docs/design-spec.md`
- [x] Configure Context7
- [x] Install selected OpenCode skills (`vercel-react-best-practices`,
      `web-design-guidelines`, installed under `.agents/skills`)
- [x] Download the Stitch HTML export and screenshot of the main screen for
      reference (`docs/stitch/`, see `docs/design-spec.md` §0)
- [x] Download the three Stitch project image screens into `public/images/`
      as placeholder assets

Verification:

- `pnpm lint`
- `pnpm build`

## Phase 1 — Visual foundation

- [x] Establish background
- [x] Establish typography (Sora / Hanken Grotesk / JetBrains Mono via
      `next/font/google`)
- [x] Establish colors (Tailwind v4 `@theme` tokens in `app/globals.css`)
- [x] Establish container width (`max-w-page` + `Container` component)
- [x] Establish spacing scale (`gutter`, `margin-*`, `stack-*` tokens)
- [x] Implement static CSS/SVG starfield (approved deviation, no WebGL)
- [x] Create basic reusable UI primitives only where needed (`Container`)

Use the exact tokens fixed in `docs/design-spec.md` §11–§13.

Verification:

- Compare desktop result with Stitch.
- Check mobile rendering.

## Phase 2 — Navigation and Hero

- [x] Navbar
- [x] Section anchors (`#about`, `#projects`, `#skills`, `#contact`; targets
      land in Phases 3–6)
- [x] Simple accessible mobile menu
- [x] Hero heading
- [x] Role
- [x] Introduction
- [x] CTA

Verification:

- Navigation works.
- CTA scrolls to contact.
- Keyboard navigation works.

## Phase 3 — About

- [x] Section heading (`SectionHeading` primitive with dash + caps label)
- [x] Main statement
- [x] Responsive spacing

Keep this section intentionally simple.

## Phase 4 — Projects

- [x] Create project data structure (`lib/projects.ts`)
- [x] Create reusable `ProjectCard`
- [x] Implement alternating desktop layout
- [x] Implement mobile layout (image → text for every project)
- [x] Add project images (local placeholders downloaded from Stitch, see
      `docs/design-spec.md` §0)
- [x] Add technology tags
- [x] Add live/source links

Use real portfolio projects before final launch.

## Phase 5 — Technical Toolkit

- [x] Create technology data (`lib/technologies.ts`)
- [x] Create reusable `TechnologyItem`
- [x] Implement responsive grid (2 cols mobile / 5 cols desktop)
- [x] Add brand SVG icons (simple-icons, approved deviation)
- [x] Add only technologies actually used (currently the mockup's placeholder
      list)

## Phase 6 — Contact UI

- [x] Build contact layout
- [x] Build accessible form with floating labels
- [x] Add basic validation (native `required` / `type=email`)
- [x] Add social/contact link (GitHub)

Do not implement persistence yet.

## Phase 7 — Footer

- [x] Implement footer
- [x] Verify responsive layout

## Phase 7.5 — Starfield animation + bilingual content

- [x] CSS-only drifting starfield (3 box-shadow layers, no JS/WebGL/canvas)
- [x] `prefers-reduced-motion` freezes the starfield
- [x] ES/EN dictionaries (`lib/content/es.ts`, `lib/content/en.ts`)
- [x] Cookie-based language server-side (`lang` cookie, ES default)
- [x] `ES / EN` toggle in navbar and mobile menu
- [x] Real Spanish copy from PFO1 (hero, about, contact, footer, form)
- [x] About: study line + LinkedIn link (approved deviation, spec §6)
- [x] Real GitHub/LinkedIn URLs centralized in `lib/links.ts`
- [x] Bilingual `lang` attribute + metadata
- [x] CV button in Hero CTA row + CV link in Contact (real URL in
      `lib/links.ts`)

## Phase 8 — Quality pass

- [x] Responsive review (mobile project header wrap; section anchor offsets)
- [x] Accessibility review (Web Interface Guidelines applied to all
      components)
- [x] Keyboard navigation review
- [ ] Image optimization — deferred until real project images arrive
- [x] Metadata (metadataBase via `NEXT_PUBLIC_SITE_URL`, canonical,
      theme-color)
- [x] Open Graph (+ Twitter card, generated `opengraph-image`)
- [x] Favicon (EG monogram `app/icon.svg`)
- [x] Sitemap
- [x] robots.txt
- [x] Production build

Use the web-design-guidelines skill for the UI review.

Use vercel-react-best-practices for the React/Next.js review.

Install both skills before this phase (see README); if they cannot be
installed, perform the reviews manually against the same criteria.

## Phase 9 — Deploy

- [ ] Push repository to GitHub
- [ ] Connect repository to Vercel
- [ ] Configure production domain if applicable
- [ ] Verify production build
- [ ] Test contact UI
- [ ] Test all project links
- [ ] Test mobile and desktop

## Phase 10 — Message persistence + /inbox panel

Decided architecture (see AGENTS.md "Contact form and inbox panel"):

- [x] Neon project + `messages` table (created; SQL kept in `db/messages.sql`)
- [x] `@neondatabase/serverless` in `lib/db.ts`; env vars in `.env.local` /
      Vercel (`.env.example` documents the shape)
- [x] Server action `app/actions/messages.ts` (validation + honeypot)
- [x] `ContactForm` wired with `useActionState` (pending, inline errors +
      focus-first-error, values preserved on error, real success copy in
      both dictionaries)
- [x] Login `/inbox/login` (password from `PANEL_PASSWORD`, `jose` signed
      cookie, in-memory rate limit) + gate in `proxy.ts` (Next 16)
- [x] `/inbox` list: pagination (20/page), read/unread, delete with
      inline confirmation, `mailto:`, logout, `noindex`
- [x] End-to-end verification (public submit → inbox → toggle → delete →
      logout → re-gate → rate limit)

## Phase 11 — Deploy and domain

- [x] First real project loaded (Split Expenses): data, bilingual copy and
      real screenshot captured from the live demo; placeholder projects and
      their images removed
- [ ] More real projects as they ship
- [ ] Remove secrets from `opencode.json`; `git init`; push to GitHub
- [ ] Vercel import + Neon integration + `NEXT_PUBLIC_SITE_URL`
- [ ] Student Developer Pack (apply early, it takes days): Namecheap free
      .ME → DNS to Vercel (`A 76.76.21.21`, `CNAME cname.vercel-dns.com`)
      → SSL + redirects → update site URL env
