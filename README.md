# Robinson Franzman LLP — rfllplaw.com

Version 1 of the firm website. Next.js 15 (App Router) + React 19 + TypeScript, styled with plain
CSS and design tokens. No UI framework, no animation library, no CSS framework — three runtime
dependencies total.

---

## Running it locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**

Other commands:

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                         |
| `npm run build`     | Production build (also type-checks every page)             |
| `npm start`         | Serve the production build locally                         |
| `npm run typecheck` | TypeScript check only, no build                            |

---

## Where the content lives

**You do not need to touch React components to edit the site.** All copy, all firm information and
all structured content live in `src/content/`:

| File            | Contains                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| `site.ts`       | Firm name, office address, phone, email, navigation, footer, legal notices |
| `home.ts`       | Homepage hero, positioning statement, lifecycle band, section headings    |
| `about.ts`      | About page copy                                                          |
| `practices.ts`  | The six practice groups — overview, capabilities, related practices, SEO  |
| `attorneys.ts`  | Attorney profiles, credentials, contact details                          |
| `matters.ts`    | Representative matters                                                   |
| `insights.ts`   | Articles, categories, and article bodies                                 |

Adding a seventh practice, a fifth attorney, or a new article is a matter of adding one object to
the relevant array. Navigation, the practice grid, cross-links, the search index, the sitemap and
the JSON-LD schema all pick it up automatically.

---

## Placeholders

Every piece of unconfirmed firm information is written in `[square brackets]` and renders with a
visible highlight so it cannot ship by accident. See **PLACEHOLDERS.md** for the full checklist.

Nothing has been invented: no attorney credentials, no education, no admissions, no awards, no
rankings, no client names, no deal values and no case outcomes.

---

## Photography

The site currently renders original abstract architectural artwork generated in SVG
(`src/components/Artwork.tsx`) wherever photography will go. To replace it with real images:

1. Drop files into `public/images/` (attorney portraits go in `public/images/attorneys/`).
2. Point the relevant content field at the file — e.g. in `attorneys.ts`,
   `portrait: '/images/attorneys/todd-robinson.jpg'`, or in `home.ts`, `hero.image`.
3. Write real alt text in the matching `*Alt` field.

The `<Figure>` component then serves an optimized, lazily loaded, responsive `next/image`
automatically. Recommended sizes: hero ≥ 2400 px wide; portraits 1200 × 1500 (4:5).

---

## Deploying to Netlify

The repo is Netlify-ready via `netlify.toml`.

1. Push to GitHub/GitLab and connect the repository in Netlify.
2. Netlify auto-detects Next.js; `netlify.toml` sets the build command, Node 20 and the
   `@netlify/plugin-nextjs` runtime.
3. Add the custom domain `rfllplaw.com` in Netlify → Domain management.
4. Update `site.url` in `src/content/site.ts` if the canonical host changes (it drives canonical
   URLs, Open Graph, the sitemap and structured data).

### Contact form

The form uses **Netlify Forms**. The form definition lives at `public/__forms.html` (Netlify scans
static HTML at deploy time); the React form posts to it. Submissions appear under **Forms** in the
Netlify dashboard. Add a notification email there. No server code or third-party service required.

The form will not submit successfully on `localhost` — Netlify Forms only exists on a deployed
site. Everything else, including validation and the success state, works locally.

---

## SEO

- Unique `<title>` and meta description on every route
- Canonical URL on every route (`src/lib/seo.ts`)
- Open Graph + Twitter cards; social card image generated at `/opengraph-image`
- `sitemap.xml` and `robots.txt` generated from content data
- JSON-LD: Organization / LegalService, WebSite + SearchAction, per-practice LegalService,
  Person for attorneys, Article for insights, BreadcrumbList on every interior page
- Semantic landmarks, one `<h1>` per page, ordered heading hierarchy
- Placeholder attorney profiles are `noindex` and excluded from the sitemap until real content is
  supplied (`isPlaceholder: false`)

---

## Accessibility

- Skip link to `#main`
- Visible focus ring on every interactive element, inverted on dark sections
- Full keyboard support: menu and search close on `Escape`, search opens with `⌘K` / `Ctrl+K`
- Labelled form fields, `aria-invalid` + `aria-describedby` on errors, `aria-live` result counts
- `prefers-reduced-motion` disables every entrance animation
- Body copy meets WCAG AA contrast on both the light and dark palettes

---

## Project structure

```
src/
  app/                     routes (App Router)
    layout.tsx             shell: header, footer, global schema
    page.tsx               homepage
    about/ contact/ experience/ insights/ practices/ attorneys/ search/
    privacy/ disclaimer/ attorney-advertising/ terms/
    sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
  components/              reusable UI
  content/                 all copy and data  ← edit here
  lib/                     seo, schema, search, formatting
  styles/                  tokens → base → layout → components → pages
public/
  __forms.html             Netlify Forms definition
  images/                  photography goes here
```

## Design tokens

`src/styles/tokens.css` is the single source of truth for color, type scale, spacing rhythm and
motion. Changing `--accent`, `--paper` or `--font-display` there re-skins the entire site.
