# Personal Portfolio

Personal developer portfolio built with Next.js, React, TypeScript and
Tailwind CSS.

## Project philosophy

The project intentionally favors:

- minimal architecture
- simple components
- strong visual fidelity
- accessibility
- performance
- maintainability

No backend or authentication: the site is fully static-friendly. The only
server component is the minimal inbox described below (one Neon Postgres
table and one private password-gated route). There is deliberately no
general admin area.

## Inbox panel

Visitors' form messages are stored in Neon Postgres and reviewed at
`/inbox` (password login, `noindex`, gated by `proxy.ts`). Requires
`PANEL_PASSWORD` and `PANEL_JWT_SECRET` in `.env.local` / Vercel (see
`.env.example`). Generate secrets with `openssl rand -hex 32`.

## Languages

The UI is bilingual (Spanish / English) with a small `ES / EN` toggle in the
navigation. The active language is stored in a cookie and the strings live in
`lib/content/es.ts` and `lib/content/en.ts`.

## Documentation

- `AGENTS.md` — instructions for OpenCode and project development rules.
- `docs/design-spec.md` — implementation specification derived from the Stitch
  design.
- `docs/development-plan.md` — incremental implementation plan.

## AI-assisted development

OpenCode is used as the coding agent.

Context7 is configured as the documentation MCP so version-sensitive questions
about Next.js, React and other libraries can use current documentation.

The Stitch MCP server expects the API key in a `STITCH_API_KEY` environment
variable (export it from your shell profile); it is never stored in the repo.

Recommended skills:

```bash
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --agent opencode --yes
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent opencode --yes
```

## Development

Install dependencies:

```bash
pnpm install
```

Configure the database: copy `.env.example` to `.env.local` and set
`DATABASE_URL` from your Neon project (pooled endpoint). Then create the
table with `db/messages.sql` (Neon Console > SQL Editor).

Run development server:

```bash
pnpm dev
```

Run lint:

```bash
pnpm lint
```

Type-check:

```bash
pnpm typecheck
```

Build:

```bash
pnpm build
```

## Deployment

The portfolio is deployed on Vercel.

The `NEXT_PUBLIC_SITE_URL` environment variable must be set to the final
public domain (used for the metadata base, Open Graph URLs and the
sitemap). Update it and redeploy when a custom domain replaces the
`*.vercel.app` URL.
