# Ruizhe Huang — Portfolio

Personal site for MIT **16.S893: AI Agents for Engineering Research**.

**Live:** https://16s893-ai-for-engineering-research.github.io/ruizhe/

## Stack

Astro (static output) + Tailwind, with the React integration available for interactive
islands. No client-side framework ships on the critical path — the only browser script
is a small decorative canvas on the landing page.

## Development

```bash
npm install
npm run dev      # http://localhost:4321  (serves from / via DEV=true)
npm run build    # static build into dist/
npm run preview  # serve the built site at the /ruizhe base path
```

`npm run dev` sets `DEV=true`, which switches the Astro `base` from `/ruizhe` to `/`
so local URLs stay clean. Production builds always use `/ruizhe`.

## Editing content

Most facts live in two data modules rather than in markup:

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Profile, contact, research interests, research projects, publications, education, awards, skills, service |
| `src/data/devlog.ts` | Dev log entries (newest first) |

Page-specific content:

- `src/pages/project.astro` — course project scaffold. Each section has a `body: []`
  array; add strings and the draft placeholder is replaced automatically.
- `src/pages/about.astro` — the narrative intro paragraphs are inline.

## Structure

```
src/
├── components/
│   ├── Header.astro        # nav + theme toggle
│   ├── Footer.astro
│   └── WindField.astro     # decorative advected-particle canvas
├── data/
│   ├── site.ts             # profile and CV content
│   └── devlog.ts           # dev log entries
├── layouts/
│   └── BaseLayout.astro    # head, meta, theme bootstrap, chrome
├── lib/
│   └── paths.ts            # base-path-aware url() helper
├── pages/
│   ├── index.astro         # home
│   ├── about.astro
│   ├── project.astro
│   ├── dev-log.astro
│   └── 404.astro
└── styles/
    └── globals.css         # design tokens, light/dark palettes
```

### Internal links

Always build internal hrefs with the `url()` helper from `src/lib/paths.ts`. A bare
`href="/about"` breaks in production, where the site is served from `/ruizhe/`.

```astro
import { url } from '../lib/paths';
<a href={url('/about')}>About</a>
```

## Theming

Colors are CSS custom properties on `:root` in `src/styles/globals.css`, defined for
light, `prefers-color-scheme: dark`, and an explicit `[data-theme]` override set by the
header toggle and persisted to `localStorage`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages. The repository must have **Settings → Pages → Source** set to
**GitHub Actions**.

## Credits

The marmot photograph on the Marmot project card (`src/images/marmot.jpg`) is by
**Colin Canterbury / U.S. Fish and Wildlife Service** and is in the **public domain**.
Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Marmot_day.jpg).

No attribution is legally required for a public-domain work; the credit line is
rendered on the page anyway as a courtesy. If you swap the image, replace the
`imageCredit` entry on that research item in `src/data/site.ts` to match the new
file's licence.
