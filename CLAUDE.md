# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start (needs a build first)
npm run lint    # eslint .
```

There is no test framework, no test script, and no test files in this repo. Do not invent one unless asked — verify changes with `npm run build` and `npm run lint`.

`README.md` is unmodified `create-next-app` boilerplate and is wrong about this project (it describes `pages/api`; this is App Router only). Don't trust it.

Two ESLint configs exist: `eslint.config.mjs` (flat, what ESLint 9 actually uses) and a leftover `.eslintrc.json`. Edit the flat one.

## What this is

A Next.js booking and rental website for Lovely Homestay, with stays, cars, experiences, and flights. **There is no backend.** All content is hardcoded in [src/data/](src/data/) behind `async` functions that fake a data layer.

## Architecture

### Data layer and inferred types

[src/data/](src/data/) exports `async` getters returning literal arrays (`getStayListings`, `getCarListings`, `getExperienceListings`, `getFlightListings`, `getBlogPosts`, `getAuthors`, `getStayCategories`, …). Types are **derived from the data, not declared**:

```ts
export type TStayListing = Awaited<ReturnType<typeof getStayListings>>[number]
```

Consequence: editing a field in a mock array silently changes the type across every consumer. When adding a field, add it to **every** object in that array or it becomes optional/`undefined` in the inferred union. Replacing the mocks with a real API means keeping these function signatures and the shape.

`getXListingByHandle(handle)` deliberately **falls back to the first listing** when the handle doesn't match (commented "for demo porpose"), so detail pages never 404. Change that before wiring real data.

None of the `[handle]` / `[[...handle]]` routes define `generateStaticParams`, so every detail page renders on demand.

### Route groups pick page chrome, not URLs

All groups in [src/app/](src/app/) are naming-only — `(app)`, `(account)`, `(auth)`, and nested `(home-pages)`, `(search-pages)`, `(listings)`, `(categories)`, `(other-pages)` produce no URL segments. Their purpose is to attach a different layout/shell.

[src/app/application-layout.tsx](src/app/application-layout.tsx) is the shared shell (`Aside.Provider` → desktop header / mobile `HeroSearchFormMobile` → children → `FooterQuickNavigation` → footer → `AsideSidebarNavigation`). Most group layouts wrap it and pass a `header` prop. The home group's layout re-implements that same shell inline instead of reusing it — expect to change both when touching global chrome.

`(listings)` keeps shared detail-page sections in [src/app/(app)/(listings)/components/](src/app/(app)/(listings)/components/), imported by relative path from sibling routes.

### Numbered component variants are intentional

`header.tsx` / `header2` / `header3`, `footer` … `footer4`, `section-hero-2/3/4`, `card-category1`–`card-category8`, `post-card1`–`post-card3`: these are alternative designs a template buyer chooses between, selected in the layouts (see the `{/* Chose footer style here!!!! */}` comment). **Do not deduplicate or "refactor" them into one configurable component** — that destroys the product. Only edit the variant actually in use.

### RTL is a build-time switch

`NEXT_PUBLIC_THEME_DIR` (`'ltr' | 'rtl'`, typed in [environment.d.ts](environment.d.ts), set in `.env.local`) drives `<html lang dir>` plus a Radix `DirectionProvider` in [src/app/layout.tsx](src/app/layout.tsx). All new styling must use logical Tailwind properties — `ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`, `text-start`, and `rtl:rotate-180` on directional icons — never `pl-`/`pr-`/`left-`/`right-`. The existing code follows this consistently.

### Styling

Tailwind v4, CSS-first: **there is no `tailwind.config.js`**. Everything lives in [src/styles/tailwind.css](src/styles/tailwind.css) via `@import`, `@theme`, `@plugin`, `@custom-variant`. `components.json` reflects this with `"tailwind.config": ""`.

Dark mode is `next-themes` with `attribute="class"`, defaulting to light with system detection disabled, plus `@custom-variant dark (&:where(.dark, .dark *))`.

shadcn is configured with the `radix-maia` style and **hugeicons** as its icon library, but `@heroicons/react` and `lucide-react` are also in active use. Match whatever the file you're editing already imports.

Prettier: no semicolons, single quotes, 120 columns, with `prettier-plugin-organize-imports` and `prettier-plugin-tailwindcss`.

### Images (Vercel free tier is being exceeded because of this)

Remote images come from `images.pexels.com` (allowed in `next.config.mjs` `remotePatterns`); local ones are static imports from [src/images/](src/images/). Every request for an optimized image bills a Vercel *Image Optimization cache read* and an *edge request*, cache hit or not, so the count of optimized images served is the cost driver — not `minimumCacheTTL`.

Current state: 75 of 123 pexels URLs carry no size query params, so the optimizer fetches 4–5 MB originals; [src/images/](src/images/) is ~24 MB with a 7.2 MB `hero-img-stay.png`; `deviceSizes`/`imageSizes` are left at the 16 default widths.

When adding images: always append `?auto=compress&cs=tinysrgb&w=<width>` to pexels URLs, keep local assets under ~1920px wide, and always pass `sizes` alongside `fill`.

### Misc

- Path alias `@/*` → `./src/*`.
- `reactStrictMode: false` in `next.config.mjs`.
- The only API route is `src/app/api/hello`. There is no middleware.
- Several `add-listing` step pages and search forms call `router.prefetch(...)` inside `useEffect` on mount.
- [src/routers/types.ts](src/routers/types.ts) is a vestigial `Route` type re-export from the pre-App-Router template; not part of routing.
