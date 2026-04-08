# Coding Conventions

**Analysis Date:** 2026-04-08

## Naming Patterns

**Files:**

- Use lowercase kebab-case for most shared and route-adjacent files, especially layouts, helpers, stores, API files, and feature support modules: `app/(admin-portal)/admin/posts/post-list-page.store.ts`, `shared/api/post.api.ts`, `shared/apiClient.ts`, `shared/providers/AppProviders.tsx`, `shared/components/layout/public-header.tsx`.
- Use PascalCase for React component files that export named UI components: `features/posts/components/PostForm.tsx`, `features/posts/components/PostList.tsx`, `features/posts/components/PostDetailCard.tsx`.
- Keep Next.js route entry files on framework names instead of feature names: `app/layout.tsx`, `app/(public-portal)/page.tsx`, `app/(auth)/layout.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`.
- Keep feature modules grouped by domain under `features/<domain>/`, with filenames describing role rather than screen: `features/posts/post.service.ts`, `features/posts/post.query-hooks.ts`, `features/posts/post.query-options.ts`, `features/posts/post.types.ts`.

**Functions:**

- Use camelCase for functions, hooks, and helpers: `usePostsQuery` in `features/posts/post.query-hooks.ts`, `getPosts` in `features/posts/post.service.ts`, `getPostsApi` in `shared/api/post.api.ts`, `cn` in `shared/lib/utils.ts`.
- Prefix hooks with `use` and keep them in hook-oriented modules: `useCreatePostMutation`, `useDeletePostMutation` in `features/posts/post.query-hooks.ts`, `usePostListPageStore` in `app/(admin-portal)/admin/posts/post-list-page.store.ts`.
- Use verb-first names for API and service functions so call sites read as actions: `createPostApi`, `updatePostApi`, `deletePost`, `getPostById`.
- Use `map...` naming for transformation helpers between API and app models: `mapPost` in `features/posts/post.service.ts`.

**Variables:**

- Use camelCase for local variables and configuration objects: `createPostMutation`, `deletePostMutation`, `createPostDefaults` in `app/(admin-portal)/admin/posts/page.tsx`; `beVietnamPro`, `jetbrainsMono` in `app/layout.tsx`.
- Use descriptive collection names for UI content arrays and navigation data: `navigation` in `shared/components/layout/public-header.tsx`, `groups` in `shared/components/layout/admin-app-sidebar.tsx`, `catalogItems`, `features`, `roles`, `news` in `app/(public-portal)/page.tsx`.
- Use UPPER_SNAKE_CASE for module constants that act like configuration: `POSTS_ENDPOINT` in `shared/api/post.api.ts`.

**Types:**

- Use PascalCase for TypeScript types and props objects: `PostFormValues` in `features/posts/post.types.ts`, `PostListPageStore` in `app/(admin-portal)/admin/posts/post-list-page.store.ts`, `PostApiResponse` and `SavePostApiPayload` in `shared/api/post.api.ts`.
- Use `...Props` suffix for component props types: `PostFormProps` in `features/posts/components/PostForm.tsx`.
- Use domain-oriented aliases when re-exporting model types for feature consumption: `Post = PostModel` in `features/posts/post.types.ts`.

## Code Style

**Formatting:**

- Use Prettier as the formatter. `package.json` defines `pnpm format` as `prettier . --write` and `pnpm format:check` as `prettier . --check`.
- Let Prettier drive line wrapping, trailing commas, and quote style. Current source uses double quotes, trailing commas in multiline objects/arrays, and semicolons throughout files such as `app/layout.tsx`, `features/posts/components/PostForm.tsx`, and `shared/apiClient.ts`.
- Keep JSX props multiline once components become dense. This pattern appears in `app/(admin-portal)/admin/posts/page.tsx`, `app/(public-portal)/page.tsx`, and `app/(auth)/login/page.tsx`.
- Preserve the existing Tailwind-first styling approach. Utility classes are embedded directly in JSX and base tokens live in `app/globals.css`.

**Linting:**

- Use ESLint 9 with flat config from `eslint.config.mjs`.
- Extend Next.js presets from `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, then apply `eslint-config-prettier` as shown in `eslint.config.mjs`.
- Respect the configured global ignores in `eslint.config.mjs`: `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.
- Run lint through pnpm. `package.json` exposes `pnpm lint`, and `CLAUDE.md` prescribes `pnpm exec eslint app features shared` for targeted linting.

## Import Organization

**Order:**

1. External framework and library imports first: `next/*`, `react`, `@tanstack/*`, `lucide-react`, `zod`, `zustand` in files such as `app/layout.tsx`, `features/posts/components/PostForm.tsx`, `features/posts/post.query-hooks.ts`, and `app/(admin-portal)/admin/posts/post-list-page.store.ts`.
2. Internal absolute imports via `@/*` second, grouped by layer or domain: `@/features/posts`, `@/shared/components/ui/button`, `@/shared/providers/AppProviders`.
3. Relative imports last for same-folder feature files: `./post.service`, `./post.query-options` in `features/posts/post.query-hooks.ts`, and `./post-list-page.store` in `app/(admin-portal)/admin/posts/page.tsx`.

**Path Aliases:**

- Use the `@/*` alias defined in `tsconfig.json` instead of long relative traversals.
- Current alias usage consistently targets repository-root paths such as `@/shared/components/ui/button`, `@/shared/api/post.api`, and `@/features/posts`.
- Keep alias targets aligned with layer boundaries from `CLAUDE.md`: `app/` for route composition, `features/` for domain logic, and `shared/` for reusable infrastructure and UI.

## Error Handling

**Patterns:**

- Normalize HTTP failures in the shared API client, not in page code. `shared/apiClient.ts` converts Axios errors into plain `Error` instances with a normalized message and rejects them as `Error`.
- Surface errors in route pages and feature UIs using alert components and `Error.message`, as in `app/(admin-portal)/admin/posts/page.tsx`.
- Prefer `try/finally` for transient UI state cleanup around async mutations, as shown by `handleDeletePost` in `app/(admin-portal)/admin/posts/page.tsx`.
- Keep validation close to form submission. `features/posts/components/PostForm.tsx` uses a `zod` schema (`postFormSchema`) and parses values in `onSubmit` before calling the passed handler.

## Logging

**Framework:** None detected.

**Patterns:**

- No `console.*` logging is present in searched application files under `app/`, `features/`, and `shared/`.
- Follow the current convention of avoiding ad hoc console logging in committed code unless a user explicitly asks for debug instrumentation.
- When errors need to reach the UI, convert them to user-facing state or alerts rather than logging only to the console, following `app/(admin-portal)/admin/posts/page.tsx` and `shared/apiClient.ts`.

## Comments

**When to Comment:**

- Keep comments sparse. Searched application code contains essentially no inline explanatory comments; behavior is expressed through structure and naming.
- Reserve comments for configuration clarification where necessary. `eslint.config.mjs` includes concise comments that explain why ignores are being overridden.
- Prefer descriptive identifiers over explanatory comments in components, stores, and services.

**JSDoc/TSDoc:**

- Not used in the current codebase areas reviewed. Files such as `features/posts/post.service.ts`, `shared/api/post.api.ts`, and `shared/providers/AppProviders.tsx` rely on TypeScript types and naming instead of docblocks.

## Function Design

**Size:**

- Keep service and hook functions small and single-purpose. Examples include `getPosts` in `features/posts/post.service.ts`, `getPostsApi` in `shared/api/post.api.ts`, and each mutation hook in `features/posts/post.query-hooks.ts`.
- Route page components can be larger when they orchestrate UI sections, but they still centralize event handlers near the top and render declarative sections below, as in `app/(admin-portal)/admin/posts/page.tsx` and `app/(public-portal)/page.tsx`.

**Parameters:**

- Use typed parameter objects or typed scalars rather than untyped `any`. Examples: `postId: number` in `features/posts/post.query-hooks.ts` and `shared/api/post.api.ts`, `payload: CreatePostPayload` in `features/posts/post.service.ts`.
- For components, destructure props directly in the function signature and type them with a dedicated `...Props` alias, as in `features/posts/components/PostForm.tsx`.
- Use `Readonly<...>` for structural props passed into layouts/providers, as seen in `app/layout.tsx`, `shared/providers/AppProviders.tsx`, and `app/(seller-portal)/seller/layout.tsx`.

**Return Values:**

- Use explicit Promise return types for async data functions: `Promise<PostModel>`, `Promise<void>`, `Promise<TResponse>` in `features/posts/post.service.ts`, `shared/api/post.api.ts`, and `shared/apiClient.ts`.
- Return hook objects directly from TanStack Query helpers instead of wrapping them in custom result objects, as in `features/posts/post.query-hooks.ts`.
- Return transformed app models from services instead of raw wire responses. `features/posts/post.service.ts` maps `PostApiResponse` into `PostModel` before returning.

## Module Design

**Exports:**

- Prefer named exports for components, hooks, helpers, and utilities: `export function PostForm`, `export function usePostsQuery`, `export function cn`, `export function AppProviders`.
- Use default exports for Next.js route entrypoints and layouts, following framework conventions in `app/layout.tsx`, `app/(public-portal)/page.tsx`, `app/(auth)/login/page.tsx`, and route-group layouts.
- Keep feature APIs consumable through a barrel file. `features/posts/index.ts` re-exports hooks, query options, services, types, and components for simpler route imports.

**Barrel Files:**

- Use barrel files selectively at the feature boundary. `features/posts/index.ts` is the main example.
- Do not create broad barrels for `shared/components/ui`; imports currently stay explicit, e.g. `@/shared/components/ui/button`, `@/shared/components/ui/card`, `@/shared/components/ui/alert`.

## Architectural Boundary Conventions

**Route groups:**

- Treat route groups under `app/` as primary product-surface boundaries, per `CLAUDE.md`: `app/(public-portal)`, `app/(auth)`, `app/(admin-portal)`, `app/(buyer-portal)`, and `app/(seller-portal)`.
- Keep page-level orchestration and page-local state inside `app/`. The current example is `app/(admin-portal)/admin/posts/page.tsx` plus `app/(admin-portal)/admin/posts/post-list-page.store.ts`.

**Feature layering:**

- Follow the layered split required by `CLAUDE.md`: raw HTTP in `shared/api/*.ts`, data mapping in `features/posts/post.service.ts`, query keys/options in `features/posts/post.query-options.ts`, query hooks in `features/posts/post.query-hooks.ts`, and page composition in `app/(admin-portal)/admin/posts/*`.
- Do not call Axios directly from pages or feature components. `CLAUDE.md` explicitly says to preserve the `shared/api` → `service` → `query hooks` → `page` flow.
- Use Zustand only for small UI state that does not belong in URL params, component state, or TanStack Query cache. The current reference is `app/(admin-portal)/admin/posts/post-list-page.store.ts`.

## UI and Component Conventions

**shadcn-first rule:**

- Follow `CLAUDE.md` and `AGENTS.md`: prefer the shadcn CLI via pnpm (`pnpm dlx shadcn@latest ...`) before building custom UI.
- Do not modify base shadcn primitives under `shared/components/ui` unless the user explicitly asks. This instruction is explicit in `CLAUDE.md`.
- Build custom UI markup only when no suitable shadcn component/block exists or when the user explicitly wants custom markup.

**Shared UI usage:**

- Reuse primitives from `shared/components/ui` in feature and route code. Common imports include `Button`, `Card`, `Badge`, `Alert`, `Input`, and `Skeleton` in `app/(admin-portal)/admin/posts/page.tsx`, `app/(public-portal)/page.tsx`, and `features/posts/components/PostForm.tsx`.
- Keep layout shell components in `shared/components/layout` and consume them from route-group layouts: `shared/components/layout/public-header.tsx`, `shared/components/layout/public-footer.tsx`, `shared/components/layout/admin-app-sidebar.tsx`, `shared/components/layout/portal-header.tsx`, `shared/components/layout/portal-sidebar.tsx`.
- Use `cn` from `shared/lib/utils.ts` to merge class names inside reusable components, as seen throughout `shared/components/ui/*.tsx`.

**Styling:**

- Use Tailwind CSS utilities directly in JSX and keep token definitions in `app/globals.css`.
- Respect the Tailwind/shadcn setup from `components.json`: style `radix-nova`, CSS source `app/globals.css`, CSS variables enabled, icon library `lucide`, and aliases pointing into `shared/components` and `shared/hooks`.
- Preserve the established rounded, card-based UI language already encoded in shared primitives and route pages. Do not introduce unrelated design systems.

## Workflow Conventions

**Package manager:**

- Use `pnpm` for all project commands. `CLAUDE.md` states the repo uses `pnpm`, and `package.json` scripts are designed around it.
- Treat `pnpm-lock.yaml` as the lockfile authority.

**Core commands:**

- Use `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format`, and `pnpm format:check` from `package.json`.
- Use targeted lint/format commands from `CLAUDE.md` when touching a small set of files: `pnpm exec eslint app features shared` and `pnpm exec prettier --write app/path/to/file.tsx`.

**Pre-commit checks:**

- Git hooks are managed by Husky. `package.json` includes `prepare: "husky"`.
- `.husky/pre-commit` runs `pnpm lint-staged`.
- `lint-staged` in `package.json` auto-runs `eslint --fix` for `*.{js,jsx,ts,tsx}` and `prettier --write` for `*.{js,jsx,ts,tsx,json,md,css,scss}`.
- Expect formatting and basic lint fixes to be enforced before commit.

**Framework-specific workflow:**

- Before changing Next.js behavior, read the relevant docs under `node_modules/next/dist/docs/`, per `CLAUDE.md` and `AGENTS.md`.
- Use current Next.js 16.2.2 and React 19 conventions only; do not fall back to older App Router assumptions.
- Treat the repo as having no established test runner. `CLAUDE.md` explicitly says there is no test runner configured in `package.json` and that test-stack choices should be discussed before adding tests.

## Language and Text Conventions

**User-facing language:**

- Keep user-facing copy in Vietnamese with diacritics. This is mandated by `CLAUDE.md` and reflected throughout `app/layout.tsx`, `app/(public-portal)/page.tsx`, `app/(auth)/login/page.tsx`, `features/posts/components/PostForm.tsx`, and `shared/components/layout/admin-app-sidebar.tsx`.
- Match the current tone: product and UI text is formal, service-oriented, and domain-specific rather than playful.

**Metadata and locale:**

- Keep the document language and app shell aligned with Vietnamese. `app/layout.tsx` sets `<html lang="vi">`.
- Maintain Vietnamese labels, error messages, helper text, and CTA copy consistently across portals.

---

_Convention analysis: 2026-04-08_
