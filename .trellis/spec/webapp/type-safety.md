# Type Safety

> TypeScript patterns, Zod validation, and type organization.

---

## Overview

This project uses **TypeScript (strict mode)**. All new code must be typed. Runtime validation uses **Zod** for form inputs and API request bodies.

---

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false,
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Core Types

```ts
// src/types/index.ts

// QingLong Environment Variable
export interface EnvItem {
  id?: number;
  name: string;
  value: string;
  remarks?: string;
  status?: number;    // 0=disabled, 1=enabled
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

// QingLong Connection Config
export interface QLConnection {
  id?: number;
  name: string;
  url: string;        // e.g. "http://192.168.1.100:5700"
  token: string;      // OpenAPI Bearer Token
  createdAt?: string;
  updatedAt?: string;
}

// daliyPushConfigs (parsed from JSON string)
export interface DailyPushConfig {
  fullInLoveDate: string;
  birthday: string;
  birthday2: string;
  location: string;
  adm: string;
  key: string;            // QWeather API Key
  weatherIndex: number;
  oneType: string;
  templateId: string;
  name: string;
  name2?: string;
  appId: string;
  appSecret: string;
  toUser: string[];
}
```

---

## Zod Validation Schemas

```ts
// DailyPushConfig validation
export const dailyPushSchema = z.object({
  fullInLoveDate: z.string().min(1, "请输入纪念日"),
  birthday: z.string().min(1, "请输入生日"),
  birthday2: z.string().optional(),
  location: z.string().min(1, "请输入城市名称"),
  adm: z.string().min(1, "请输入行政区"),
  key: z.string().min(1, "请输入天气API Key"),
  weatherIndex: z.coerce.number().int().min(1).max(10),
  oneType: z.string().default("a"),
  templateId: z.string().min(1, "请输入微信模板ID"),
  name: z.string().min(1, "请输入昵称"),
  name2: z.string().optional(),
  appId: z.string().min(1, "请输入AppID"),
  appSecret: z.string().min(1, "请输入AppSecret"),
  toUser: z.array(z.string()).min(1, "至少需要一个收件人"),
});

// QL Connection validation
export const qlConnectionSchema = z.object({
  url: z.string().url("请输入有效的URL").includes("://"),
  token: z.string().min(1, "请输入Token"),
});
```

---

## API Route Validation

```ts
// src/app/api/qinglong/envs/route.ts
import { z } from "zod";

const createEnvSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  remarks: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createEnvSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  // ...
}
```

---

## Forbidden Patterns

- ❌ No `any` — use `unknown` + type narrowing
- ❌ No `as` type assertions without justification comment
- ❌ No `@ts-ignore` / `@ts-expect-error`
- ❌ No non-null assertions (`!`) — use optional chaining or guard checks
- ❌ No `require()` — use ESM `import` only
