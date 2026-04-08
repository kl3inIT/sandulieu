# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Required repo rules

- This repo uses Next.js 16.2.2 with React 19. Do not assume older Next.js conventions still apply.
- Before changing framework-specific behavior, read the relevant docs in `node_modules/next/dist/docs/` and heed deprecation notices.
- Do not add extra visual design work unless the user explicitly asks for design changes.
- When implementing UI, prefer the shadcn CLI with this repo's package manager: `pnpm dlx shadcn@latest ...`.
- Do not modify base shadcn components under `shared/components/ui` unless the user explicitly asks for it.
- Only build custom UI markup when no suitable shadcn component/block exists, or when the user explicitly wants custom UI.

## Common commands

This repo uses `pnpm` (`pnpm-lock.yaml` is present).

- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build production app: `pnpm build`
- Start production server: `pnpm start`
- Run lint: `pnpm lint`
- Lint specific files: `pnpm exec eslint app features shared`
- Auto-fix lint issues in specific files: `pnpm exec eslint app/path/to/file.tsx --fix`
- Format entire repo: `pnpm format`
- Check formatting only: `pnpm format:check`
- Format specific files: `pnpm exec prettier --write app/path/to/file.tsx`

## Testing status

- There is currently no test runner configured in `package.json`.
- Do not assume Jest/Vitest/Playwright is already installed.
- If asked to add tests, first decide with the user what test stack should be introduced.

## High-level architecture

### App structure

This is an App Router Next.js app organized around separate route groups for distinct product surfaces:

- `app/(public-portal)` — public landing experience
- `app/(auth)` — login/auth shell
- `app/(admin-portal)` — admin dashboard and admin post management flow
- `app/(buyer-portal)` — buyer-facing portal shell
- `app/(seller-portal)` — seller-facing portal shell

Each route group has its own layout and visual shell. The route groups are the main architectural boundary in the app right now.

### Layering and responsibilities

The codebase mostly follows this split:

- `app/` — route entrypoints, layouts, page composition, portal-specific page state
- `features/` — domain features; currently the main implemented feature is posts
- `shared/` — reusable infrastructure and UI primitives used across portals

For the posts flow, keep this layering intact:

- `shared/api/*.ts` — raw API calls and wire-format response types
- `features/posts/post.service.ts` — maps API responses into app models
- `features/posts/post.query-options.ts` — query keys and TanStack Query option builders
- `features/posts/post.query-hooks.ts` — feature-level query/mutation hooks and cache invalidation
- `features/posts/components/*` — feature UI
- `app/(admin-portal)/admin/posts/*` — page orchestration and page-local state

Avoid collapsing API, mapping, hooks, and page logic into a single file.

### Data flow

The only real data flow implemented today is the admin posts feature:

1. Route pages under `app/(admin-portal)/admin/posts/*` call hooks from `features/posts`.
2. Hooks in `features/posts/post.query-hooks.ts` use TanStack Query for fetch/mutate and cache invalidation.
3. Query options and keys live in `features/posts/post.query-options.ts`.
4. Service functions in `features/posts/post.service.ts` call the shared API layer and map responses to `PostModel`.
5. Raw HTTP calls live in `shared/api/post.api.ts`, currently backed by JSONPlaceholder.
6. Axios setup and shared error normalization live in `shared/apiClient.ts`.

If you add more domains, follow the same pattern rather than calling Axios directly from pages/components.

### Client state and providers

- Global providers are wired in `app/layout.tsx` through `shared/providers/AppProviders.tsx`.
- `AppProviders` currently composes TanStack Query and tooltip support.
- The singleton query client is defined in `shared/queryClient.ts`.
- Small page-local client state uses Zustand; example: `app/(admin-portal)/admin/posts/post-list-page.store.ts` tracks the currently deleting post.

Prefer Zustand only for UI state that does not belong in URL params, React Query cache, or local component state.

### UI system

- Shared UI primitives live under `shared/components/ui` and are shadcn-based (`components.json` uses the `radix-nova` style).
- Shared layout building blocks live under `shared/components/layout`.
- Use the `@/*` path alias from `tsconfig.json`.
- Existing UI text is Vietnamese with diacritics; keep new user-facing copy consistent.

### Current product state

The repo is still mostly a shell application with one implemented CRUD-style feature:

- Public, buyer, seller, and login pages are currently portal shells / scaffolding pages.
- The admin area is the most functional surface.
- The login flow is UI-only at the moment; there is no real auth/session/backend integration yet.
- Admin posts currently use JSONPlaceholder as a placeholder API, so treat that flow as demo infrastructure rather than real backend integration.

### Important implementation notes

- `shared/apiClient.ts` converts Axios failures into plain `Error` instances with normalized messages; keep that behavior if you extend the API layer.
- Query invalidation for posts is centralized in the feature hooks; preserve that pattern when adding mutations.
- The repo currently has no `app/api` route handlers in active use; most behavior is client-driven pages calling external APIs.
- There are existing uncommitted changes in the working tree. Check before overwriting or moving files involved in the posts API/service area.
