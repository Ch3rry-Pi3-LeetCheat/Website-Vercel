# Leet-Cheat Website Setup Guide

This guide documents the local setup, content workflow, and deployment steps
for the Leet-Cheat site.

## Prerequisites

### Accounts

- GitHub (repo hosting)
- Vercel (deployments)

### Local tooling

- Node.js 18+
- npm
- Git

Quick checks:

```powershell
node -v
npm -v
git --version
```

## Local Development

Install dependencies:

```powershell
npm install
```

Run the dev server:

```powershell
npm run dev
```

Open:

- http://localhost:3000

## Core Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run lint` - lint

## Project Structure

- `app/`
  - `algorithms-data-structures/` article pages for ADS
  - `topics/` topic hubs (e.g., Python programming)
- `components/`
  - `ArticleLayout.tsx` main article layout with ToC + rails
  - `ArticleToc.tsx` sticky ToC with scroll tracking
  - `CollapsibleExample.tsx` collapsible example blocks
  - `CodeBlock.tsx` Shiki-highlighted code with copy button
  - `InfoPanel.tsx` intro/intuition callout boxes
- `lib/`
  - `adsTopics.ts` list of ADS pages for the right rail
- `public/diagrams/` SVG diagrams for articles

## Authoring New Articles

1. Create a new route:
   - Example: `app/algorithms-data-structures/python/linked-lists/page.tsx`
2. Use `ArticleLayout` for structure:
   - Provide `eyebrow`, `title`, `description`, and `tocItems`.
3. Add sections with stable ids:
   - Use `id="section-id"` and `className="scroll-mt-28"` so ToC scroll
     positioning is correct.
4. Use `InfoPanel` for intro/intuition blocks:
   - `variant="intro"` or `variant="intuition"`.
5. Use `CollapsibleExample` for examples:
   - Pair with `CodeBlock` and `OutputBlock`.
6. Add diagrams as SVG:
   - Save to `public/diagrams/<topic>/<name>.svg`
   - Embed using `<img src="/diagrams/<topic>/<name>.svg" />`

## Code Highlighting (Shiki)

`CodeBlock` uses Shiki for server-side highlighting. No client-side setup
needed. If you add new languages, add them in `lib/shiki.ts`.

## Fonts

The site uses the Google font `Dekko` for both body and display text (configured
in `app/layout.tsx`).

## Deployment (Vercel)

1. Push the repo to GitHub.
2. In Vercel, create a new project and import the repo.
3. Set environment variables (optional but recommended):
   - `NEXT_PUBLIC_SITE_URL` = your production URL
4. Deploy.

Every push to `main` will trigger a production deployment.
