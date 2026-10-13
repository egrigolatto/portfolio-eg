# Portfolio Project

## Purpose

This repository contains my personal developer portfolio.

The primary goal is a professional, minimal, fast and maintainable portfolio.
The implementation must stay intentionally simple. Do not introduce
architecture, dependencies or abstractions that are not justified by the
portfolio's actual requirements.

## Source of truth

The Stitch project/design is the visual source of truth.

Stitch identifiers:

- Project: `Portfolio` (`projects/6488551835094126637`)
- Main screen: `screens/c8d15b2a03c248308751e1ec4211ff47`

When the Stitch MCP is available, use it to inspect the original Stitch
design and reference its structure, visual properties and components.

The HTML export of the main screen represents the current design state;
screenshots may lag behind it. The Stitch project-level design theme is
outdated and must be ignored.

Do not reinterpret or redesign the interface based on personal assumptions.

The `docs/design-spec.md` file provides implementation guidance derived from
the design, but it does not override the original Stitch design.

When there is ambiguity:

1. Prefer the original Stitch design (screen HTML export first).
2. Use `docs/design-spec.md` for implementation guidance.
3. Choose the simplest implementation that preserves the visual result.

Approved deviations from the Stitch design (static starfield background,
brand SVG icons) are documented in `docs/design-spec.md` §0. Any new
deviation must be recorded there before implementing it.

The Stitch design defines the intended visual result, not the implementation
architecture.

Do not blindly reproduce Stitch-generated code.

Reimplement the design using idiomatic Next.js, React, TypeScript and
Tailwind CSS.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- pnpm
- Vercel for deployment

Use the current stable versions selected during project initialization.
When a framework or library API is version-sensitive, consult Context7
before implementing it.

## Architecture

Use the Next.js App Router.

Prefer Server Components by default.

Use Client Components only when browser interactivity actually requires them.

Keep the project structure simple. The current structure is:

```text
app/            # App Router pages, metadata routes, server actions
components/     # UI components (server-first; client only where needed)
lib/            # data, content dictionaries, links, db helpers
public/         # static assets and local images
docs/           # design-spec, development-plan, stitch reference
```

Do not introduce:

- a backend
- a database
- authentication
- global state management
- a CMS
- an API layer
- unnecessary design-system abstractions

unless a concrete requirement appears.

## UI and components

Create reusable components when a pattern is repeated or clearly represents
a meaningful UI concept.

Good candidates include:

- Navbar
- SectionHeading
- ProjectCard
- TechnologyItem
- ContactForm
- Footer

Do not create a component for every small HTML fragment.

Prefer semantic HTML and accessible native elements.

## Accessibility

- Use semantic HTML.
- Maintain a logical heading hierarchy.
- All interactive elements must be keyboard accessible.
- Provide visible focus states.
- Images require appropriate `alt` text.
- Decorative images should use empty alt text when appropriate.
- Form controls must have associated labels.
- Do not rely on color alone to communicate meaning.

## Responsive design

The portfolio must work well on:

- mobile
- tablet
- desktop

Do not create a separate mobile implementation unless genuinely necessary.

Use responsive CSS and preserve the visual intent of the Stitch design.

## Performance

- Prefer Server Components.
- Avoid unnecessary client-side JavaScript.
- Use `next/image` where appropriate for local/project images.
- Avoid unnecessary dependencies.
- Avoid unnecessary animations.
- Do not add a state-management library for simple UI state.

## TypeScript

- Keep strict type checking enabled.
- Avoid `any`.
- Prefer explicit, useful types over excessive generic abstractions.

## Content

Content shown in the Stitch mockup is partly placeholder content.

Do not invent professional experience, technologies, project details or claims.
Use clearly marked placeholder content until the real portfolio content is
provided.

The UI is bilingual (Spanish default / English). All displayed strings live in
`lib/content/es.ts` and `lib/content/en.ts` (types enforced through the
dictionary index). Add or change copy only there, keeping both files in sync.
Shared external URLs live in `lib/links.ts`. Project data is split: neutral
data in `lib/projects.ts`, descriptions and alt text localized in
`content.projects.items[slug]`.

## Contact form and inbox panel

Implemented and shipped. Architecture (deliberately minimal):

- Neon Serverless Postgres (free tier, via Vercel integration), single
  `messages` table, accessed with `@neondatabase/serverless` from
  `lib/db.ts`. No ORM, no codegen.
- Form submits through a server action (`app/actions/messages.ts`) with
  server-side validation and a honeypot field.
- Private panel at `/inbox`: password login (env `PANEL_PASSWORD`,
  timing-safe compare) issuing a signed session cookie (`jose`, env
  `PANEL_JWT_SECRET`); access gated in `proxy.ts` (Next 16 replacement of
  middleware). Panel lists newest-first with pagination, read/unread flag,
  delete and `mailto:` replies.
- `/inbox` routes are `noindex`.
- No email provider: replies happen manually from the panel.
- Secrets only through environment variables; `.env*` stays gitignored.

Do not extend the panel into a general admin area.

## Context7

When implementation depends on current library or framework documentation,
use Context7.

In particular, consult Context7 before making version-sensitive decisions
about Next.js, React, Tailwind CSS, Vercel-related configuration or external
libraries.

Do not use Context7 merely for trivial TypeScript or HTML questions.

## Verification

Before considering a significant change complete:

1. Run ESLint.
2. Run TypeScript type checking when available.
3. Run the production build.
4. Verify the affected section at mobile and desktop widths.
5. Check that no unrelated files were modified.

For visual changes, compare the implementation against the Stitch design before
declaring the task complete.

## Git

Use Conventional Commits.

Examples:

- `feat(ui): add portfolio hero`
- `feat(ui): implement projects section`
- `style(ui): refine responsive spacing`
- `fix(ui): correct mobile navigation`
- `chore: configure linting`

Keep commits small and focused.

## Working style

Before making large changes:

1. Inspect the existing project.
2. Read the relevant documentation.
3. Explain the implementation plan briefly.
4. Make the smallest change that satisfies the requirement.
5. Verify the result.

Do not rewrite unrelated code.

Avoid premature abstraction and overengineering.
