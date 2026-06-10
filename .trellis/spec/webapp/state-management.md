# State & Data Management

> Server state, forms, SQLite/Drizzle persistence patterns.

---

## Overview

This app uses a **server-first** data model. QingLong connection config (URL + Token) persists in SQLite via Drizzle ORM. Environment variable data lives in QingLong itself — the app is a proxy viewer/editor.

---

## Data Flow

```
User (Browser)
  │
  ▼
Next.js API Route (server)
  │
  ├── SQLite (via Drizzle)  ← QingLong connection config
  │
  └── QingLong OpenAPI (via axios)  ← Environment variables
        GET/POST/PUT/DELETE /api/envs
```

---

## SQLite + Drizzle

### Schema

```ts
// src/lib/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const qlConnections = sqliteTable("ql_connections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().default("default"),
  url: text("url").notNull(),
  token: text("token").notNull(),
  createdAt: text("created_at").notNull().default("(datetime('now'))"),
  updatedAt: text("updated_at").notNull().default("(datetime('now'))"),
});
```

### Client

```ts
// src/lib/db/index.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("data/ql-manager.db");
export const db = drizzle(sqlite);
export { qlConnections } from "./schema";
```

### Query Patterns

```ts
import { db, qlConnections } from "@/lib/db";

// Get active connection
const config = db.select().from(qlConnections).where(eq(qlConnections.name, "default")).get();

// Upsert connection
db.insert(qlConnections).values({ url, token }).onConflictDoUpdate({
  target: qlConnections.name,
  set: { url, token, updatedAt: new Date().toISOString() },
}).run();
```

---

## Form State

For the `daliyPushConfigs` editable form, use **React Hook Form + Zod**:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const configSchema = z.object({
  fullInLoveDate: z.string(),
  birthday: z.string(),
  birthday2: z.string(),
  location: z.string().min(1, "请输入城市"),
  adm: z.string().min(1, "请输入行政区"),
  key: z.string().min(1, "请输入天气API Key"),
  name: z.string(),
  name2: z.string().optional(),
  appId: z.string().min(1, "请输入AppID"),
  appSecret: z.string().min(1, "请输入AppSecret"),
  templateId: z.string().min(1, "请输入模板ID"),
  toUser: z.array(z.string()).min(1, "至少需要一个收件人"),
});

type ConfigFormData = z.infer<typeof configSchema>;
```

Form submission serializes the data back to a JSON string and pushes to QingLong via API route.

---

## Data Flow for Environment Variables

```
GET  /api/qinglong/envs    → fetch all envs from QingLong
POST /api/qinglong/envs    → create new env (JSON.stringify the form)
PUT  /api/qinglong/envs/:id → update existing env
DELETE /api/qinglong/envs  → delete envs by id[]
```

For `daliyPushConfigs`, the value is a JSON string. The UI parses it into a form, edits fields, then re-stringifies before saving.

---

## No Client-Side State Library

- No React Context for data (server fetch is sufficient for MVP)
- No Redux/Zustand — each page fetches its own data
- `useSWR` or `use` hook for mutations (create/update/delete) if needed
