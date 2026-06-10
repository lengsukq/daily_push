# Web Application Guidelines

> Best practices for the Next.js full-stack management application.

---

## Overview

This is a **Next.js (App Router) full-stack application** that serves as a visual management UI for QingLong (青龙) environment variables. The frontend uses TailwindCSS + shadcn/ui with iOS-inspired design (rounded corners, glassmorphism, animations). The backend provides API routes that proxy to QingLong's OpenAPI, with SQLite persistence.

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Next.js App Router file layout | Filled |
| [Component Guidelines](./component-guidelines.md) | shadcn/ui component patterns, iOS style | Filled |
| [Page & Route Patterns](./hook-guidelines.md) | App Router pages, layouts, API routes | Filled |
| [State & Data Management](./state-management.md) | Server state, forms, SQLite/Drizzle | Filled |
| [Type Safety](./type-safety.md) | TypeScript patterns, Zod validation | Filled |
| [Quality Guidelines](./quality-guidelines.md) | Clean Code, error handling, Docker, code standards | Filled |
| [3D Elements Guide](./design/3d-elements-guide.md) | 3D Web UI design patterns, CSS 3D, glassmorphism | Filled |

---

## Key Technical Decisions

| Decision | Choice |
|----------|--------|
| Framework | Next.js 14+ (App Router) |
| Styling | TailwindCSS + shadcn/ui |
| UI Style | iOS-inspired: large radius, glassmorphism, white, animations |
| 3D Enhancement | 3D Elements: CSS 3D transforms, perspective, layered shadows, glow effects |
| Database | SQLite via Drizzle ORM |
| Auth | API Token (no user auth for MVP) |
| Deployment | Docker multi-stage build |
| Language | TypeScript (strict) |

---

**Clean Code**: All code must follow the Clean Code principles documented in [Quality Guidelines](./quality-guidelines.md#clean-code-principles).

**Language**: Chinese in user-facing UI, English in code/specs.
