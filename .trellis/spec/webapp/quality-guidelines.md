# Quality Guidelines

> Code standards, Docker deployment, error handling, and best practices.

---

## Overview

Quality is maintained through TypeScript strict mode, Zod runtime validation, consistent error handling in API routes, and Docker-driven deployment.

---

## Error Handling

### API Route Errors

```ts
export async function GET() {
  try {
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json(
        { error: "未配置青龙连接，请先在设置页面配置" },
        { status: 400 }
      );
    }
    const data = await qlApiClient.getEnvs(config);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[envs]", error);
    return NextResponse.json(
      { error: "青龙面板请求失败", detail: (error as Error).message },
      { status: 502 }
    );
  }
}
```

### Form Validation Errors

Use Zod + react-hook-form for consistent form error display:

```tsx
const { errors } = form.formState;
{errors.location && (
  <p className="text-sm text-red-500">{errors.location.message}</p>
)}
```

---

## Docker Deployment

```dockerfile
# docker/Dockerfile — Multi-stage build
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
services:
  ql-env-manager:
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data  # SQLite persistence
    restart: unless-stopped
```

---

## Code Style

| Rule | Standard |
|------|----------|
| Indentation | 2 spaces |
| Quotes | Single quotes for JS/TS |
| Semicolons | Required |
| Imports | Group: external → internal (`@/`), blank line between |
| Naming | camelCase for variables/functions, PascalCase for components/types |
| File names | kebab-case for files (`env-list.tsx`) |
| Max line length | 100 characters |

---

## Linting

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

Run before every commit:
```bash
npm run lint
npm run typecheck  # tsc --noEmit
```

---

## Security

- ❌ No secrets in code — store QingLong Token in SQLite only
- ❌ No `eval()` or dynamic `require()`
- ✅ Validate all API inputs with Zod
- ✅ Sanitize error messages — never leak QL Token in client responses

---

## Forbidden Patterns

- ❌ No `console.log` in production — use `console.error` for errors only
- ❌ No `var` — use `const` / `let`
- ❌ No class components — functional components + hooks only
- ❌ No page router (`pages/`) — App Router only
- ❌ No `getServerSideProps` / `getStaticProps` — use Server Components or `fetch` in Server Components
