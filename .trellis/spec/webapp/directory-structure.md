# Directory Structure

> Next.js App Router file layout for this project.

---

## Overview

Standard Next.js App Router structure with `src/` directory. Pages live under `src/app/`, UI components under `src/components/`, API routes under `src/app/api/`.

---

## Directory Layout

```
ql-env-manager/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (ThemeProvider, glassmorphism wrapper)
│   │   ├── page.tsx            # Dashboard / env list page
│   │   ├── globals.css         # Tailwind imports + iOS-style theme variables
│   │   ├── env/
│   │   │   ├── page.tsx        # Environment variable list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # Single env var detail/edit
│   │   │   └── new/
│   │   │       └── page.tsx    # Create new env var
│   │   ├── settings/
│   │   │   └── page.tsx        # QingLong connection settings
│   │   └── api/
│   │       ├── qinglong/
│   │       │   ├── envs/
│   │       │   │   ├── route.ts        # GET/POST envs
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts    # PUT/DELETE env by id
│   │       │   └── config/
│   │       │       └── route.ts        # QL connection config CRUD
│   │       └── env-config/
│   │           └── route.ts            # daliyPushConfigs structured data
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (button, card, dialog, etc.)
│   │   ├── env/
│   │   │   ├── env-list.tsx    # Environment variable list with search/filter
│   │   │   ├── env-card.tsx    # Single env var card (iOS glass style)
│   │   │   └── env-form.tsx    # daliyPushConfigs grouped form
│   │   ├── settings/
│   │   │   └── ql-connection-form.tsx
│   │   └── layout/
│   │       ├── sidebar.tsx
│   │       ├── glass-container.tsx  # Glassmorphism wrapper component
│   │       └── theme-toggle.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts      # Drizzle schema (ql_connections table)
│   │   │   └── index.ts       # SQLite client
│   │   ├── api/
│   │   │   └── qinglong.ts    # QingLong API client (axios instance)
│   │   └── utils.ts           # cn() helper, formatters
│   ├── hooks/
│   │   ├── use-envs.ts        # SWR/React Query hook for env list
│   │   └── use-ql-config.ts   # QL connection config hook
│   └── types/
│       └── index.ts           # TypeScript types (EnvItem, QLConfig, etc.)
├── public/
├── docker/
│   └── Dockerfile
├── docker-compose.yml
├── drizzle.config.ts
├── tailwind.config.ts
├── components.json            # shadcn/ui config
└── package.json
```

---

## Naming Conventions

| Pattern | Description | Example |
|---------|-------------|---------|
| `src/app/**/page.tsx` | App Router pages | `src/app/env/page.tsx` |
| `src/app/**/layout.tsx` | Layouts | `src/app/layout.tsx` |
| `src/app/api/**/route.ts` | API routes | `src/app/api/qinglong/envs/route.ts` |
| `src/components/ui/*.tsx` | shadcn/ui primitives | `src/components/ui/button.tsx` |
| `src/components/*/*.tsx` | Feature components | `src/components/env/env-list.tsx` |
| `src/lib/**/*.ts` | Utilities, DB, API client | `src/lib/api/qinglong.ts` |
| `src/hooks/*.ts` | React hooks | `src/hooks/use-envs.ts` |
| `src/types/*.ts` | TypeScript types | `src/types/index.ts` |

---

## Route Conventions (App Router)

```
/                   → Dashboard (env var overview)
/env                → Environment variable list
/env/new            → Create new daliyPushConfigs
/env/[id]           → Edit specific env var
/settings           → QingLong connection settings
/api/qinglong/envs  → Proxy to QL API (GET list, POST create)
/api/qinglong/envs/[id] → Proxy to QL API (PUT update, DELETE)
/api/qinglong/config    → CRUD for QL connection config (SQLite)
```
