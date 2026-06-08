# Domain Manager
This repo exists for showcase purposes.

Customers are organized into **domains**, each with its own white-labeled experience in the product. Domain Manager is the admin interface that lets a customer configure their domain — custom logos, home page layouts, navigation menus, and related UI settings — without touching code.

This repo is a trimmed-down copy of that interface, extracted from a larger monorepo to showcase my UI design and front-end development work. Domain Manager was an Epic I owned end to end — I managed sprint tickets, kept the project moving, and did the design and front-end build. Other developers handled shared dependencies, backend endpoints, and supporting code, but the bulk of the work was mine.

<img width="1622" height="1142" alt="demo-home" src="https://github.com/user-attachments/assets/5171a7de-496d-4e62-aef5-74dd3ebdb2dc" />
<img width="1563" height="1163" alt="demo-home-edit" src="https://github.com/user-attachments/assets/21329249-b458-41d5-bd9d-9cd57c2dbd72" />
<img width="1613" height="1149" alt="demo-menu" src="https://github.com/user-attachments/assets/c8e881c9-5fe1-488e-99b2-b7e201d79dcb" />


## Setup

Run these in the terminal:

```bash
source .profile-addons
pni
pnpm dev
# pxr tryyb:start
```

For this standalone portfolio repo:

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

→ http://localhost:4400/domain-manager/domain/551/home

## Versions

| Package | Version |
|---------|---------|
| React | 18.3.1 |
| React DOM | 18.3.1 |
| React Router | 6.29.0 |
| Vite | 6.3.5 |
| TypeScript | ~5.8.3 |
| Tailwind CSS | 3.4.3 |
| TanStack Query | ^4.29.12 |
| MSW | 1.3.2 |

## Technical summary

React 18 SPA built with Vite and TypeScript. Styling uses Tailwind CSS and Radix UI primitives. Data fetching goes through TanStack Query; API calls are mocked in the browser with MSW (no backend required). The Domain Manager UI lives under `packages/interfaces/domain-manager/` and is wired into a thin demo shell in `src/`. React Router handles tab and domain routing. The demo runs on port 4400 with in-memory mock data for **Columbia Bank** (551) plus two sample domains (**Acme Learning Co.**, **Northwind Academy**).

## Reference

- **[PLAN.md](./PLAN.md)** — architecture, sync workflow, demo domains, checklist, troubleshooting
- **`src/`** — demo app, MSW mocks, providers (portfolio-only changes go here)
- **`packages/`** — vendored Domain Manager UI from Spacedock (update via sync script, not hand-edited)
- **Default domain:** 551 (Columbia Bank) — mock data in `src/mocks/demoStore.ts`
- **Out of scope:** Theme, Images, R3, uploads, new-domain wizard, real backend





