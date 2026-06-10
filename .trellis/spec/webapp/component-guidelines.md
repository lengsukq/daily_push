# Component Guidelines

> shadcn/ui component patterns with iOS-inspired design system.

---

## Overview

All UI components use **shadcn/ui** as the base (installed via `npx shadcn-ui@latest init`). Custom components follow shadcn's convention: copy the source, customize freely. All styling is done via TailwindCSS utility classes.

---

## iOS Design System

### Core Tokens

```ts
// tailwind.config.ts
theme: {
  extend: {
    borderRadius: {
      xl: '12px',    // cards
      '2xl': '16px',  // modals
      '3xl': '20px',  // sheets
    },
    colors: {
      'glass-bg': 'rgba(255, 255, 255, 0.7)',
      'glass-border': 'rgba(255, 255, 255, 0.3)',
      'glass-shadow': 'rgba(0, 0, 0, 0.06)',
    },
    backdropBlur: {
      glass: '20px',
    },
  },
}
```

### Glassmorphism Pattern

```tsx
// GlassContainer component
<div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/5">
  {children}
</div>
```

### Card Pattern (iOS-style)

```tsx
<Card className="rounded-2xl border-0 shadow-lg shadow-black/5 bg-white/80 backdrop-blur-xl">
  <CardHeader className="pb-2">
    <CardTitle className="text-lg font-semibold text-gray-900">Title</CardTitle>
    <CardDescription className="text-sm text-gray-500">Description</CardDescription>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
</Card>
```

### Animation Pattern

Use `framer-motion` or CSS transitions for iOS-style animations:

```tsx
// Button press effect
<button className="active:scale-95 transition-transform duration-150 ease-out">
  Press me
</button>

// Fade in on mount
<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
  Content
</div>
```

---

## Component Patterns

### Server Components (default)

Prefer server components for data fetching. Use `async` component pattern:

```tsx
// src/app/env/page.tsx — Server Component
export default async function EnvListPage() {
  const envs = await getEnvs();  // fetch from QL API
  return <EnvList envs={envs} />;
}
```

### Client Components (when needed)

Add `"use client"` only when using hooks, state, or event handlers. Keep client boundary minimal:

```tsx
"use client";
import { useState } from "react";
// Interactive parts only
```

### shadcn/ui Customization

Do NOT modify `components/ui/*.tsx` directly — re-install via `npx shadcn-ui@latest add` instead. For iOS-style variants, extend with className prop:

```tsx
<Button className="rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all">
  iOS Button
</Button>
```

---

## Forbidden Patterns

- ❌ No inline `<style>` tags — use Tailwind only
- ❌ No CSS modules — Tailwind utilities handle everything
- ❌ No third-party CSS frameworks (Bootstrap, etc.)
- ❌ Don't modify shadcn/ui source primitives — wrap/extend instead
