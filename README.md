# Leet-Cheat Website

Educational web platform that teaches coding interview patterns, system design,
and applied ML/AI with intuitive, article-first lessons.

## Live Site

- Production: TBD

## Overview

This repository contains the Leet-Cheat web experience. The site is built as
an article-driven learning hub with structured pages, a sticky table of
contents, collapsible examples, and copyable code blocks.

## Features

- Article layout with sticky Table of Contents and scroll tracking
- Collapsible examples with code + expected output blocks
- Syntax-highlighted Python (Shiki) with copy button
- Right-hand "within topic" rail for related pages
- Responsive layout for desktop, tablet, and mobile
- Diagram support via SVGs

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shiki (syntax highlighting)
- Vercel (hosting and deployments)

## Content Architecture

- `app/algorithms-data-structures/...` ADS articles
- `app/topics/python-programming/...` Python programming articles
- `components/ArticleLayout.tsx` main article layout
- `components/ArticleToc.tsx` scroll-tracking table of contents
- `components/CodeBlock.tsx` Shiki-based code blocks with copy button
- `public/diagrams/...` SVG diagrams used in articles

## Local Development

```powershell
npm install
npm run dev
```

Visit: `http://localhost:3000`

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run lint` - lint

## Documentation

Setup and workflow details live in `guides/setup.md`.
