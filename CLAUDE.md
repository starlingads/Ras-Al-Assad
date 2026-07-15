# Ras Al Assad — Project Guide

UAE solar EPC / MEP contractor website. Next.js 15 App Router + Sanity CMS.

**The authoritative specification is [`docs/superpowers/plans/2026-07-15-sanity-cms-implementation.md`](docs/superpowers/plans/2026-07-15-sanity-cms-implementation.md).** Read it before any CMS work. If this file and the plan ever disagree, the plan wins — fix this file.

---

## The two rules that override convenience

### 1. Never hardcode business content

Every piece of editable content **originates from Sanity**: text, images, buttons, colors, navigation, metadata, statistics, categories, filters, project details, partner info, contact info, and any future marketing section.

The frontend contains **only** layout, styling, animations, and business logic.

There is no "it's just one string" exception. This project is actively migrating away from a 42-project hardcoded array that started exactly that way.

Allowed in code (these are not business content): design tokens the client doesn't manage, animation timings, calculation algorithms, route paths, ARIA labels, developer-facing error strings.

### 2. CMS First Development

Before building any component, page, or feature, ask: **should the client be able to edit this?** If yes, model it in Sanity *first*, then build against the generated types.

Order is always: **schema → sample content → GROQ query → TypeGen → component.**

Never build against hardcoded data "for now, wire it up later." That is deliberate technical debt and costs more to retrofit than to do correctly once.

---

## Architecture

- **Studio** is embedded at `/studio`, isolated via a separate root layout in `src/app/(studio)/`.
- **Site** routes live under `src/app/(site)/` — a route group, so URLs are unaffected (`(site)/about/page.tsx` → `/about`).
  Studio must never inherit `globals.css` (Tailwind preflight) or the `<Navbar/>`/`<Footer/>` shell.
- **`src/sanity/`** — `env.ts` (validated config), `lib/client.ts`, `lib/queries.ts`, `schemaTypes/`, `structure/`.
- **Content boundary:** Sanity holds public marketing content only. Leads, users, and private/operational data belong to Supabase (future) — never the Content Lake, which is publicly readable.

## Dependency stack — do not drift

Next 16 · React 19 · Sanity 6 · `next-sanity@13`. Build-verified 2026-07-15; full rationale in **Part 0** of the plan.

**The trap that cost two revisions of this plan:** Next.js does not use the `react` in `node_modules` — it aliases `react` to a copy it vendors itself. Next 15 vendors a pre-19.2 React canary lacking `useEffectEvent`, which Sanity 5/6 require, so **Next 15 + Sanity 5/6 installs cleanly and then fails to build**. A green `npm install` is not evidence of compatibility.

Before bumping any of next / react / sanity / next-sanity, verify the vendored React:

```bash
node -e "console.log(/useEffectEvent/.test(require('fs').readFileSync('node_modules/next/dist/compiled/react/cjs/react.development.js','utf8')))"
```

Node >= 22.12 (Sanity 6's floor). Sanity 4 is EOL — abandoned the day Sanity 5 shipped.

## Conventions

- TypeScript strict. No `any`. Consume TypeGen output; never hand-write query result types.
- Server Components by default; `"use client"` only when a component needs state, effects, or browser APIs.
- Schema fields are written for a **non-technical client**: business-language titles, a description saying *where it appears*, no exposed `slug`/`ref`/`orderRank` jargon. See Part 12 of the plan.
- Preserve the existing design exactly. Layout/styling changes require a reason tied to CMS integration.
- Every commit leaves the project working: typecheck, lint, and build must pass.

## Commands

```bash
npm run dev        # localhost:3000  (site) + /studio
npm run build      # production build — requires NEXT_PUBLIC_SANITY_PROJECT_ID
npm run lint
npx tsc --noEmit   # typecheck
```

Requires `.env.local` (see `.env.example`). Node >= 22.12.
