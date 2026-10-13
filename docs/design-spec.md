# Portfolio Design Specification

## 0. Stitch reference

The Stitch project is the visual source of truth.

- Project: `Portfolio` (`projects/6488551835094126637`)
- Main screen: `Alex | Portfolio - Celestial Brief Aligned`
  (`screens/c8d15b2a03c248308751e1ec4211ff47`, desktop)
- Project image screens:
  - Aether Engine: `screens/2adcc5785a9a4a9886d7f356780a85ff`
  - Nebula Protocol: `screens/14e3b11d243c4e74a53ff0f490756619`
  - Krypton Core: `screens/b43dffd8b04e4029b6df819317b226ac`

Rules:

- The HTML export of the main screen represents the current design state.
  Screenshots may lag behind it.
- The Stitch project-level design theme (emerald accent, Hanken/Inter/Geist
  fonts, sharp corners) is outdated. It does not apply to this
  implementation.
- When this document and the Stitch screen disagree, the screen wins unless
  the disagreement is listed below as an approved deviation.

Approved deviations from the Stitch design:

- The animated WebGL starfield shader is replaced by a CSS-only drifting
  starfield (no WebGL, no canvas, no client JS; see section 14).
- Technical Toolkit icons use brand SVGs (simple-icons) instead of Material
  Symbols glyphs (see section 8).
- The interface is bilingual (ES/EN). All displayed strings come from
  `lib/content/es.ts` and `lib/content/en.ts`; Spanish is the default. A
  small `ES / EN` text toggle lives at the end of the desktop navigation
  and inside the mobile menu (active language in the accent color). Layout
  and visual treatment remain exactly as in the mockup; only text content
  and the toggle itself are additions.
- The About section includes, in addition to the statement, a study line
  and a LinkedIn link provided by the owner (see section 6).

## 1. Overview

This document translates the Stitch visual mockup into implementation
requirements for the Next.js portfolio.

The Stitch screen (HTML export and screenshot, see section 0) is the visual
source of truth.

The implementation should reproduce the design rather than reinterpret it,
except for the approved deviations listed in section 0.

## 2. Visual direction

Overall style:

- Minimalist
- Dark
- Technical
- Editorial
- Spacious
- High contrast
- Subtle futuristic/cosmic atmosphere

The interface should feel polished without relying on excessive animation,
gradients or decorative UI.

## 3. Page structure

The portfolio is a single-page experience with these sections:

1. Navigation
2. Hero
3. About
4. Projects
5. Technical Toolkit
6. Contact
7. Footer

Navigation links should scroll to the corresponding sections.

## 4. Navigation

Desktop:

- Small monogram `EG` on the left.
- Small navigation links on the right.
- Links (anchor scroll to sections; labels come from the language
  dictionary):
  - About / Sobre mí → `#about`
  - Projects / Proyectos → `#projects`
  - Skills / Habilidades → `#skills`
  - Contact / Contacto → `#contact`
- `ES / EN` text toggle at the end of the link row (see section 0).

Visual characteristics:

- Very small typography.
- Large amount of empty space.
- Minimal borders.
- No large navigation container.
- Navigation should remain visually subtle.

Mobile:

- The mockup shows only a menu icon; the menu itself is not designed.
- Implement a simple accessible mobile menu: a toggle button that reveals
  the same anchor links as a list or overlay.
- Preserve the minimalist appearance.

Do not add a complex navigation drawer unless necessary.

## 5. Hero

Content hierarchy:

- Large name:
  - `Emanuel`
  - `Grigolatto`
- Main role:
  - `Full Stack Developer`
- Short introduction.
- Small CTA:
  - `GET IN TOUCH` / `ESCRÍBEME` (anchors to contact)
  - `MI CV` / `MY CV` (opens the owner's CV in a new tab; same bordered
    button style, added by owner request)

Visual characteristics:

- Very large heading.
- Strong contrast.
- Lavender/purple accent in the role.
- Large empty space below the hero content.
- Subtle star/noise background effect.
- The heading wraps into two lines (`Emanuel` / `Grigolatto`) through a
  constrained max width, not through manual line breaks.
- The role uses the accent color with a light font weight.
- The CTA is a bordered rectangle button (1px accent border, accent text,
  sharp corners) that inverts on hover (accent background, dark text).

The background effect should remain lightweight. Avoid a heavy canvas/WebGL
implementation unless it is actually necessary to reproduce the design.

The CTA should navigate to the contact section.

## 6. About

Section label: `ABOUT` / `SOBRE MÍ` (from the dictionary).

Main statement (ES default, from the owner's real copy):

`Siempre con ganas de entender cómo funciona todo, aprendiendo un poco más
cada día.`

The statement is the main visual element.

Additional owner-provided content (approved deviation, see section 0):

- Secondary line: `Estudiante de la Tecnicatura Superior en Desarrollo de
  Software en IFTS 29.` (body-lg, secondary text)
- LinkedIn link row (`Conóceme mejor` / `Get to know me`), styled like the
  Contact social link: 20px brand icon + mono caps label, accent on hover.

Do not add:

- biography paragraphs
- skill lists
- cards
- statistics

unless explicitly requested later.

## 7. Projects

Section label: `PROJECTS` / `PROYECTOS`.

The mockup's three placeholder entries (Aether Engine, Nebula Protocol,
Krypton Core) were removed once real content arrived. The section now
renders one real project (Split Expenses) and grows naturally as more
real projects are added.

Each project entry contains:

- Project name
- Index number (`01`, `02`, …) next to the name
- `VER DEMO` / `LIVE DEMO` link (opens the live demo in a new tab)
- `VER CÓDIGO` / `SOURCE` link (opens the repository in a new tab)
- Short description (localized in `lib/content/{es,en}.ts`)
- Technology tags (language-neutral, in `lib/projects.ts`)

Links are aligned to the right of the title row, opposite the name and
index.

Visual structure:

- Entries alternate image/text on desktop (no visual effect with a single
  project); on mobile every entry stacks image → text.
- Project entries are separated by hairline bottom borders.
- Images use a 16:9 aspect ratio, rounded corners (`rounded-xl`), a subtle
  1px light border, a soft shadow and a slight scale transition on hover.
- Project images are local real screenshots of the deployed project.
- Language-neutral data (name, slug, URLs, image, tags) lives in
  `lib/projects.ts`; descriptions and alt text are localized through
  `content.projects.items[slug]`.

A reusable `ProjectCard` component supports the alternating layout.

## 8. Technical Toolkit

Section label:

`TECHNICAL TOOLKIT`

The mockup displays a grid of technologies.

Current visual examples include:

- HTML
- CSS
- JavaScript
- TypeScript
- React
- Node.js
- Python
- PostgreSQL
- Git
- Docker

The final technology list should reflect technologies actually used by the
portfolio owner.

Do not add technologies merely because they look good in the design.

Use a reusable `TechnologyItem` component.

Approved deviation: the mockup uses Material Symbols glyphs. The
implementation uses monochrome brand SVGs (simple-icons) instead, keeping
the same visual behavior: muted color at rest, accent color on hover.

Grid: 2 columns on mobile, 5 columns on desktop.

## 9. Contact

Two-column desktop layout:

### Left

- Section label: `CONTACT`
- Short invitation to contact.
- Social/contact links (GitHub + `MI CV`/`MY CV` row with document icon,
  same mono-caps style).

### Right

Minimal form with:

- Name
- Email
- Message
- Submit button

The form should visually match the mockup:

- transparent/dark background
- subtle bottom borders
- floating labels: the label sits inside the field and moves above it on
  focus or when the field has content
- transparent placeholder
- bottom border transitions to the accent color on focus
- minimal controls
- understated submit button (bordered rectangle, same style as the hero CTA)

### Submission behavior

The form submits through a server action that validates server-side
(lengths, email format, honeypot) and persists the message to Neon
Serverless Postgres. Success and error feedback is rendered inline via
`useActionState`, announced through `aria-live`, and the submit button
shows a pending state while the action runs.

Submitted messages are reviewed in the private panel at `/inbox`
(password login, signed session cookie, `noindex`; gated in `proxy.ts`).
The panel supports pagination, read/unread, delete and `mailto:` replies.
No email provider: replies are sent manually from the panel.

The public UI keeps the mockup appearance; persistence adds no visible
design beyond the success/error copy from the language dictionaries.

## 10. Footer

Minimal horizontal footer.

The mockup contains:

- small brand text on the left (the mockup's `ALEX` is a placeholder; use
  the owner's monogram/name)
- copyright in the center with a dynamic year (the mockup's `2024` is a
  placeholder)
- small GitHub link on the right

Keep it subtle.

## 11. Typography

Fonts (from the Stitch screen):

- Display and headings: Sora
- Body: Hanken Grotesk
- Labels and metadata (uppercase, tracked): JetBrains Mono

Load them with `next/font/google`.

Type scale (desktop):

- display: 72px / 1.1 / 700 / -0.02em (hero heading goes up to 100px)
- headline-lg: 48px / 1.2 / 600
- headline-md: 30px / 1.3 / 500
- body-lg: 18px / 1.6
- body-md: 16px / 1.6
- label-caps: 12px / 1.0 / 500 / +0.1em, uppercase

On mobile the display scale drops to ~60px and headline-lg to ~32px.

## 12. Color direction

Use a very dark background, close to black/navy.

Exact values (from the Stitch screen export):

- Background: `#081425`
- Section band background: `#03050a`, with a top gradient transition from
  transparent into the band
- Primary text (on-surface): `#d8e3fb`
- Secondary text (on-surface-variant): `#c7c4d8`, often at 80% opacity
- Accent (primary): `#c3c0ff`
- Accent inversion (hover backgrounds): `#4f46e5`
- Text on accent fill (CTA hover): `#1d00a5`
- Hairline borders: `#464555` at low opacity, or `white/10`
- Deep surface (project cards/chips background): `#040e1f`, often at 50%
  opacity

Corner roundness: sharp (0px) everywhere except project images
(`rounded-xl`) and technology tags (`rounded`, 4px), matching the mockup.

Do not introduce additional accent colors.

## 13. Spacing

Spacing is one of the defining characteristics of the design.

Important:

- Sections have generous vertical separation.
- Content does not fill the viewport unnecessarily.
- Text blocks remain relatively narrow.
- Project rows have substantial vertical spacing.
- The design should breathe.

Do not compress the page just to reduce its total height.

Concrete values (from the Stitch screen export):

- Content container: max 1280px, centered
- Horizontal padding: 64px desktop, 20px mobile
- Vertical stacks: 12px / 24px / 48px
- Sections: generous vertical padding (~96px) with large gaps (~192px)
  between them

## 14. Background effect

The Stitch screen uses an animated WebGL starfield shader (nebula glow,
drifting and blinking stars) as a fixed full-page background.

Approved deviation: the implementation uses no WebGL, canvas or client JS.

Implementation (adapted from the owner's PFO1 CSS technique):

- Three fixed full-viewport `.star-layer` divs rendered by the `Starfield`
  Server Component: 1px/90s, 2px/180s and 3px/270s upward drifts
  (`translateY` over a 2000px seamless loop via `::after`), creating slow
  parallax.
- Stars are pure `box-shadow` dot lists defined in `app/globals.css`,
  palette-tinted (`#d8e3fb` dust, `#c3c0ff` large layer, reduced opacity).
- The subtle nebula glow stays as two static blurred gradient divs.
- Under `prefers-reduced-motion: reduce` all layers stop (`animation:
  none`) leaving a still starfield.
- `aria-hidden`, `pointer-events: none`, `-z-10`; content sections keep
  their opaque band background, as in the mockup.

## 15. Responsive behavior

### Mobile

The design should become a single-column layout.

Projects should stack as:

```text
image
text

text
image

image
text
```

or, preferably, consistently:

```text
image
text
```

for each project if alternating order becomes awkward on small screens.

The priority is readability and preservation of the design's hierarchy.

### Desktop

Use a constrained content width with generous horizontal margins.

Project rows should use a balanced two-column layout.

The exact breakpoint should be chosen based on the content rather than copied
blindly from the screenshot.

## 16. Motion

Motion should be minimal.

Allowed:

- subtle hover transitions
- subtle link transitions
- subtle image scale/opacity transitions

Avoid:

- scroll-jacking
- large entrance animations
- continuous animated backgrounds
- excessive parallax

Respect `prefers-reduced-motion`.

## 17. Images

Project images are content, not decorative filler.

Use:

- optimized local assets
- meaningful alt text
- consistent aspect ratios
- appropriate loading behavior

Do not use remote image services unless there is a clear reason.

## 18. Design implementation rule

When there is a conflict between:

- visual complexity
- technical complexity

prefer the simplest technical implementation that reproduces the visual
result accurately.

The portfolio should look sophisticated while its code remains simple.

## 19. Placeholder content

The mockup's placeholder projects were replaced by real content. There
are currently no placeholder texts in the UI:

- The only listed project is real: Split Expenses (demo, repository and
  screenshot captured from the live app).
- GitHub `https://github.com/egrigolatto`, LinkedIn
  `https://www.linkedin.com/in/emanuelgrigolatto/` and CV
  `https://cv-grigolattoemanuel.vercel.app/` are shared links in
  `lib/links.ts` (CV used by Hero and Contact).

When new projects are added, follow the section 7 data split
(`lib/projects.ts` + localized `content.projects.items[slug]`) and use
real screenshots from the deployed app.
