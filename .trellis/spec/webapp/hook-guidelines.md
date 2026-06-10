# Page & Route Patterns

> App Router pages, layouts, API routes, and data fetching patterns.

---

## Overview

Next.js App Router organizes routes by filesystem. Pages are Server Components by default. API routes are `route.ts` files under `src/app/api/`. Data fetching from QingLong API is done server-side.

---

## Page Patterns

### List Page (Server Component)

```tsx
// src/app/env/page.tsx
import { getEnvs } from "@/lib/api/qinglong";
import { EnvList } from "@/components/env/env-list";

export default async function EnvListPage() {
  const envs = await getEnvs();  // SSR fetch
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">环境变量</h1>
      <EnvList envs={envs} />
    </div>
  );
}
```

### Detail Page (with params)

```tsx
// src/app/env/[id]/page.tsx
export default async function EnvDetailPage({ params }: { params: { id: string } }) {
  const env = await getEnvById(params.id);
  return <EnvForm env={env} />;
}
```

### Loading & Error States

```tsx
// src/app/env/loading.tsx
export default function Loading() {
  return <Skeleton className="h-96 rounded-2xl" />;
}

// src/app/env/error.tsx
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-red-500">加载失败: {error.message}</p>
      <Button onClick={reset}>重试</Button>
    </div>
  );
}
```

---

## API Route Patterns

### Proxy to QingLong API

```ts
// src/app/api/qinglong/envs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getQlConnection } from "@/lib/db";
import { qlApiClient } from "@/lib/api/qinglong";

export async function GET() {
  const config = await getQlConnection();
  if (!config) return NextResponse.json({ error: "未配置青龙连接" }, { status: 400 });

  const data = await qlApiClient.getEnvs(config);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const config = await getQlConnection();
  const data = await qlApiClient.createEnv(config, body);
  return NextResponse.json(data, { status: 201 });
}
```

### Error Handling in API Routes

```ts
try {
  const data = await qlApiClient.getEnvs(config);
  return NextResponse.json(data);
} catch (error) {
  console.error("[QL API]", error);
  return NextResponse.json(
    { error: "青龙面板连接失败", detail: (error as Error).message },
    { status: 502 }
  );
}
```

---

## QingLong API Client

```ts
// src/lib/api/qinglong.ts
import axios from "axios";

export interface QLConfig {
  url: string;      // e.g. "http://192.168.1.100:5700"
  token: string;    // QingLong OpenAPI Token
}

export const qlApiClient = {
  async getEnvs(config: QLConfig) {
    const { data } = await axios.get(`${config.url}/api/envs`, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },
  async createEnv(config: QLConfig, env: any) {
    const { data } = await axios.post(`${config.url}/api/envs`, [env], {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },
  async updateEnv(config: QLConfig, id: number, env: any) {
    const { data } = await axios.put(`${config.url}/api/envs`, { ...env, id }, {
      headers: { Authorization: `Bearer ${config.token}` },
    });
    return data;
  },
  async deleteEnvs(config: QLConfig, ids: number[]) {
    const { data } = await axios.delete(`${config.url}/api/envs`, {
      headers: { Authorization: `Bearer ${config.token}` },
      data: ids,
    });
    return data;
  },
};
```

---

## Middleware Pattern

No auth middleware needed for MVP. Future auth can be added via Next.js Middleware (`src/middleware.ts`).
