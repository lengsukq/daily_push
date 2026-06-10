# Quality Guidelines

> Code standards, Clean Code principles, Docker deployment, error handling.

---

## Overview

Quality is maintained through Clean Code principles, TypeScript strict mode, Zod runtime validation, consistent error handling in API routes, and Docker-driven deployment.

---

## Clean Code Principles

本项目严格遵循 **Clean Code**（Robert C. Martin）准则。所有代码必须符合以下标准。

### 1. 命名 — 传达意图

```ts
// ❌ Bad
const d = new Date();
const fn = async () => { ... };
const arr = ['a', 'b'];

// ✅ Good
const today = new Date();
const fetchEnvironments = async () => { ... };
const recipientIds = ['user1', 'user2'];
```

- 类/组件名：名词（`EnvList`, `QlConnection`）
- 函数名：动词或动词短语（`fetchEnvs`, `formatDate`, `validateConfig`）
- 布尔变量：用 `is`, `has`, `should` 前缀（`isEnabled`, `hasError`）
- 不要用缩写（`cfg` → `config`, `envs` → `environments` 属合理缩写）

### 2. 函数 — 只做一件事

```ts
// ❌ Bad — 一个函数做了三件事
async function handleEnvSave(data: any) {
  const validated = validateSchema(data);       // 1. 校验
  await saveToDatabase(validated);              // 2. 持久化
  await notifyQinglong(validated as EnvItem);   // 3. 通知外部
}

// ✅ Good
async function handleEnvSave(data: unknown) {
  const validated = validateDailyPushConfig(data);
  await saveEnvironment(validated);
}
```

- 一个函数不应超过 **20 行**（特殊情况不超过 30 行）
- 函数参数不超过 **3 个** — 多于 3 个用对象参数
- 没有副作用 — 函数不应修改外部状态

### 3. DRY — 不要重复

```ts
// ❌ Bad — URL 构造重复三次
const url1 = `${config.url}/api/envs`;
const url2 = `${config.url}/api/envs/${id}`;
const url3 = `${config.url}/api/envs/disable`;

// ✅ Good
const envsEndpoint = (path = '') => `${config.url}/api/envs${path}`;
const url1 = envsEndpoint();
const url2 = envsEndpoint(`/${id}`);
const url3 = envsEndpoint('/disable');
```

- 重复代码出现 **2 次以上** → 提取为函数或常量
- 魔法字符串/数字 → 命名常量

### 4. 注释 — 解释"为什么", 不是"是什么"

```ts
// ❌ Bad — 注释说的是代码已经在表达的事
// 将日期格式化为 YYYY-MM-DD
const formattedDate = dayjs(date).format('YYYY-MM-DD');

// ✅ Good — 注释解释原因
// 青龙面板 API 只接受 YYYY-MM-DD 格式
const formattedDate = dayjs(date).format('YYYY-MM-DD');
```

- 好代码自文档化 — 用命名和结构表达意图
- 注释只用来解释**为什么**这样做，而非**做了什么**

### 5. 错误处理

- 永远不要用 try/catch 控制业务逻辑流程
- 自定义错误类（`class QlApiError extends Error`）
- 每个 API route 有统一的错误响应格式

```ts
// ✅ Good
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }
  console.error('[unhandled]', error);
  return NextResponse.json({ error: '内部错误' }, { status: 500 });
}
```

### 6. 单一职责原则（SRP）

- **一个文件 = 一个职责**
- 组件文件只负责渲染 — 数据获取分离到 Server Components 或 hooks
- API route 只负责路由 — 业务逻辑分离到 `lib/`
- 工具函数分离到独立的模块文件

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
