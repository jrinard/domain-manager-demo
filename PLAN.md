# Domain Manager Portfolio — Standalone Repo Plan

> **Resume prompt:** “Read `PLAN.md` in domain-manager-portfolio and continue unchecked items.”

## What this repo is

A **standalone** copy of the Domain Manager UI (Tryyb / Menu / Mastery configuration) for portfolio and hiring demos. It does **not** depend on the Spacedock monorepo at runtime — only the one-time `sync-from-spacedock.sh` script copies source from Spacedock when you update.

Deploy target: Vercel / Netlify / GitHub Pages (static SPA + MSW in browser).

## Architecture

```
domain-manager-portfolio/          ← own git repo
├── src/                           ← Vite demo app (MSW, providers, banner)
├── packages/                      ← vendored from Spacedock (via sync script)
│   ├── interfaces/domain-manager/
│   ├── domain/
│   ├── falcon/
│   ├── falcon-ui/
│   ├── tyto/
│   └── …
├── scripts/sync-from-spacedock.sh
├── tsconfig.base.json             ← path aliases (copied from Spacedock)
└── vite.config.ts                 ← falcon tailwind plugin + tsconfig paths
```

**UI:** `@interfaces/domain-manager` → `DomainManagerRoutes`

**Demo flag:** `VITE_DOMAIN_MANAGER_DEMO=true` limits tabs to Tryyb / Menu / Mastery. Patches apply **only in this repo** via `scripts/patch-for-portfolio.sh` after sync — Spacedock is never modified.

**API:** MSW on `http://localhost:4400/api` with in-memory store (`src/mocks/demoStore.ts`).

**team-editor stub:** `src/stubs/team-editor.tsx` via Vite alias — avoids copying the whole team-editor package.

## Demo domains

| ID   | Name               |
|------|--------------------|
| 551  | Columbia Bank (default) |
| 1001 | Acme Learning Co.  |
| 1002 | Northwind Academy  |
| 1003 | Contoso Training   |

Each has live + draft configs for Tryyb, Menu, and Mastery.

## Out of scope

Theme tab, Images, R3, uploads, new-domain wizard, real API.

## Progress checklist

- [x] Standalone repo scaffold + PLAN + README
- [x] `sync-from-spacedock.sh` to vendor packages
- [x] MSW demo store + handlers (in-memory save)
- [x] Vite app + providers + session seed
- [x] DomainHeader portfolio demo flag (`patch-for-portfolio.sh`, not in Spacedock)
- [x] team-editor stub
- [x] Run `./scripts/sync-from-spacedock.sh` (copies packages from Spacedock)
- [x] Run `pnpm install` && `pnpm dev`
- [x] Production build (`pnpm build`) passes
- [ ] Smoke test all three tabs + layout/menu builders in browser
- [ ] Deploy (Vercel: `pnpm build`, output `dist`)
- [ ] Optional: strip `@mocaworks` / internal URLs from README screenshots

## First-time setup

```bash
# 1. Clone this repo (after you push it to GitHub)
git clone <your-repo-url>
cd domain-manager-portfolio

# 2. Vendor UI packages from Spacedock (one-time / when updating UI)
./scripts/sync-from-spacedock.sh /path/to/spacedock

# 3. Install & run
pnpm install
pnpm dev
```

Open http://localhost:4400/domain-manager/domain/551/tryyb

## Updating UI from Spacedock

When you change Domain Manager in Spacedock:

```bash
./scripts/sync-from-spacedock.sh ../spacedock
pnpm dev   # verify
git commit -am "Sync domain-manager from spacedock"
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Missing package after sync | Add path to `PACKAGE_DIRS` in `scripts/sync-from-spacedock.sh`, re-sync |
| `Cannot find module '@spacedock/...'` | Check `tsconfig.base.json` paths |
| Empty version lists | MSW not running — check console for worker registration |
| Permission error | Session not seeded — see `DemoProviders.tsx` |

## Legal / IP

Confirm you may publish this code publicly. Sanitize company names in demo fixtures if needed.
