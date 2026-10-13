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

No backend, database or authentication is required for the initial version.

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

The portfolio is intended to be deployed on Vercel.

Before production, set the `NEXT_PUBLIC_SITE_URL` environment variable to the
final domain (used for metadata base, Open Graph URLs and the sitemap).

## Future work

A future phase may add a private authenticated area for reviewing messages
submitted through the contact form.

That functionality is intentionally excluded from the initial UI
implementation.
