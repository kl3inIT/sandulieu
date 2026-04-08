# Architecture

**Analysis Date:** 2026-04-08

## Pattern Overview

**Overall:** App Router Next.js application organized by route-group portals with a thin feature layer and shared infrastructure.

**Key Characteristics:**

- Route groups under `app/` are the primary architectural boundary: `app/(public-portal)`, `app/(auth)`, `app/(admin-portal)`, `app/(buyer-portal)`, and `app/(seller-portal)`.
- Only the admin posts flow is implemented as a full data-backed feature; other portals are shell pages with static composition in `app/(public-portal)/page.tsx`, `app/(auth)/login/page.tsx`, `app/(buyer-portal)/buyer/page.tsx`, and `app/(seller-portal)/seller/page.tsx`.
- Data access is layered: route pages call feature hooks from `features/posts`, feature services map raw API data, and HTTP calls stay in `shared/api/post.api.ts` and `shared/apiClient.ts`.

## Layers

**Routing and page composition:**

- Purpose: Define URLs, route-group layouts, page shells, and page-local orchestration.
- Location: `app/`
- Contains: `layout.tsx`, route-group layouts, page components, and page-local Zustand state in `app/(admin-portal)/admin/posts/post-list-page.store.ts`.
- Depends on: `features/*`, `shared/components/*`, `shared/providers/*`.
- Used by: Next.js App Router runtime via `app/layout.tsx` and route files.

**Feature domain layer:**

- Purpose: Keep domain-specific UI, query hooks, query options, types, and service mapping together.
- Location: `features/posts/`
- Contains: feature barrel export in `features/posts/index.ts`, query hooks in `features/posts/post.query-hooks.ts`, query options in `features/posts/post.query-options.ts`, service mapping in `features/posts/post.service.ts`, types in `features/posts/post.types.ts`, and UI in `features/posts/components/*`.
- Depends on: `shared/api/post.api.ts`, `shared/model/post.model.ts`, `@tanstack/react-query`, `@tanstack/react-form`, and shared UI components.
- Used by: admin routes `app/(admin-portal)/admin/posts/page.tsx` and `app/(admin-portal)/admin/posts/[postId]/page.tsx`.

**Shared infrastructure and primitives:**

- Purpose: Centralize reusable API utilities, providers, layout building blocks, models, hooks, and UI primitives.
- Location: `shared/`
- Contains: Axios client in `shared/apiClient.ts`, raw post API calls in `shared/api/post.api.ts`, query client in `shared/queryClient.ts`, providers in `shared/providers/*`, shared models in `shared/model/post.model.ts`, layout components in `shared/components/layout/*`, shadcn-based UI in `shared/components/ui/*`, and utility helpers in `shared/lib/utils.ts`.
- Depends on: external libraries declared in `package.json` such as `axios`, `@tanstack/react-query`, `radix-ui`, and `zustand`.
- Used by: all route groups and the posts feature.

## Data Flow

**Admin posts CRUD flow:**

1. `app/(admin-portal)/admin/posts/page.tsx` and `app/(admin-portal)/admin/posts/[postId]/page.tsx` call `usePostsQuery`, `usePostDetailQuery`, `useCreatePostMutation`, `useUpdatePostMutation`, and `useDeletePostMutation` from `features/posts/post.query-hooks.ts`.
2. `features/posts/post.query-hooks.ts` composes `useQuery` and `useMutation` from TanStack Query and invalidates keys from `features/posts/post.query-options.ts`.
3. `features/posts/post.query-options.ts` defines stable keys like `postQueryKeys.list()` and `postQueryKeys.detail(postId)` and binds them to service functions.
4. `features/posts/post.service.ts` maps `PostApiResponse` from `shared/api/post.api.ts` into the app-facing `PostModel` from `shared/model/post.model.ts`.
5. `shared/api/post.api.ts` performs raw HTTP requests against `https://jsonplaceholder.typicode.com/posts` through helpers from `shared/apiClient.ts`.
6. `shared/apiClient.ts` normalizes Axios failures into plain `Error` instances before they propagate back to the feature hooks and route UI.

**Application bootstrap flow:**

1. `app/layout.tsx` sets metadata, fonts, and global HTML/body wrappers.
2. `app/layout.tsx` wraps all routes with `AppProviders` from `shared/providers/AppProviders.tsx`.
3. `shared/providers/AppProviders.tsx` composes `TooltipProvider` and `QueryProvider`.
4. `shared/providers/QueryProvider.tsx` mounts `QueryClientProvider` with the singleton `queryClient` from `shared/queryClient.ts`.

**State Management:**

- Server state uses TanStack Query through `shared/queryClient.ts` and feature hooks in `features/posts/post.query-hooks.ts`.
- Form state uses TanStack Form in `features/posts/components/PostForm.tsx`.
- Small page-local UI state uses Zustand in `app/(admin-portal)/admin/posts/post-list-page.store.ts` for `deletingPostId`.
- Static portal pages such as `app/(buyer-portal)/buyer/page.tsx` and `app/(seller-portal)/seller/page.tsx` keep state inline as constant arrays because they are currently static shells.

## Key Abstractions

**Portal route groups:**

- Purpose: Separate major product surfaces by layout and navigation shell.
- Examples: `app/(public-portal)/layout.tsx`, `app/(auth)/layout.tsx`, `app/(admin-portal)/layout.tsx`, `app/(buyer-portal)/buyer/layout.tsx`, `app/(seller-portal)/seller/layout.tsx`
- Pattern: Each route group owns its own frame while inheriting global providers from `app/layout.tsx`.

**Feature barrel export:**

- Purpose: Expose a single feature entrypoint to route pages.
- Examples: `features/posts/index.ts`
- Pattern: Pages import feature APIs from `@/features/posts` instead of deep-importing each file.

**Service mapping boundary:**

- Purpose: Keep raw wire-format response types separate from app models.
- Examples: `features/posts/post.service.ts`, `shared/api/post.api.ts`, `shared/model/post.model.ts`
- Pattern: Map `PostApiResponse` to `PostModel` before data reaches pages or components.

**Reusable layout shell components:**

- Purpose: Share portal-specific navigation and branding without duplicating layout markup in pages.
- Examples: `shared/components/layout/public-header.tsx`, `shared/components/layout/public-footer.tsx`, `shared/components/layout/portal-header.tsx`, `shared/components/layout/portal-sidebar.tsx`, `shared/components/layout/admin-app-sidebar.tsx`
- Pattern: Route-group layouts assemble these components and keep page files focused on content.

## Entry Points

**Root application shell:**

- Location: `app/layout.tsx`
- Triggers: Every request and navigation in the App Router.
- Responsibilities: Declare global metadata, load fonts, import `app/globals.css`, and mount shared providers.

**Public portal:**

- Location: `app/(public-portal)/layout.tsx` and `app/(public-portal)/page.tsx`
- Triggers: `/`
- Responsibilities: Render marketing-style public landing content with `PublicHeader` and `PublicFooter` from `shared/components/layout/*`.

**Auth portal:**

- Location: `app/(auth)/layout.tsx` and `app/(auth)/login/page.tsx`
- Triggers: `/login`
- Responsibilities: Render the login shell and demo quick-access links to `/buyer`, `/seller`, and `/admin`.

**Admin portal:**

- Location: `app/(admin-portal)/layout.tsx`, `app/(admin-portal)/admin/page.tsx`, `app/(admin-portal)/admin/posts/page.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`
- Triggers: `/admin`, `/admin/posts`, `/admin/posts/[postId]`
- Responsibilities: Render the admin shell, static dashboard cards, and the live posts CRUD flow.

**Buyer portal:**

- Location: `app/(buyer-portal)/buyer/layout.tsx` and `app/(buyer-portal)/buyer/page.tsx`
- Triggers: `/buyer`
- Responsibilities: Render buyer-specific navigation shell and static overview content.

**Seller portal:**

- Location: `app/(seller-portal)/seller/layout.tsx` and `app/(seller-portal)/seller/page.tsx`
- Triggers: `/seller`
- Responsibilities: Render seller-specific navigation shell and static overview content.

## Error Handling

**Strategy:** UI surfaces rely on normalized `Error` objects from the shared Axios layer and render route-level alert states.

**Patterns:**

- `shared/apiClient.ts` converts Axios failures into plain `Error` instances with readable messages before rejecting.
- `app/(admin-portal)/admin/posts/page.tsx` and `app/(admin-portal)/admin/posts/[postId]/page.tsx` check `isError` on query and mutation objects and render `Alert` components from `shared/components/ui/alert.tsx`.
- Invalid dynamic route params are rejected in `app/(admin-portal)/admin/posts/[postId]/page.tsx` before any feature UI renders.

## Cross-Cutting Concerns

**Logging:**

- Not detected in application code under `app/`, `features/`, or `shared/`.

**Validation:**

- Form validation lives in `features/posts/components/PostForm.tsx` via a `zod` schema and TanStack Form validators.
- Dynamic route param validation is handled inline in `app/(admin-portal)/admin/posts/[postId]/page.tsx` with numeric guards.

**Authentication:**

- No real auth/session boundary is implemented.
- `app/(auth)/login/page.tsx` is UI-only and exposes demo navigation links.
- There are no active route handlers under `app/api`, and no server-side auth middleware is present in the inspected source tree.

---

_Architecture analysis: 2026-04-08_
