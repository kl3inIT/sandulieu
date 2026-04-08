# Technology Stack

**Analysis Date:** 2026-04-08

## Languages

**Primary:**

- TypeScript 5.x - application code and configuration across `app/**/*.tsx`, `features/**/*.ts`, `shared/**/*.ts`, and `tsconfig.json`.
- TSX with React 19.2.4 - UI components and route files in `app/**/*.tsx`, `features/posts/components/*.tsx`, and `shared/components/**/*.tsx`.

**Secondary:**

- CSS - global styling and design tokens in `app/globals.css`.
- JavaScript/ESM config syntax - tool configuration in `eslint.config.mjs` and `postcss.config.mjs`.
- Shell - Git hook automation in `.husky/pre-commit`.

## Runtime

**Environment:**

- Node.js runtime for Next.js 16.2.2 and build tooling, implied by `package.json` scripts and Node-based dependencies in `package.json`.
- Browser runtime for client components marked with `"use client"` such as `shared/providers/AppProviders.tsx`, `shared/providers/QueryProvider.tsx`, and `features/posts/components/PostForm.tsx`.

**Package Manager:**

- pnpm - required by `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and repo guidance in `CLAUDE.md`.
- Lockfile: present at `pnpm-lock.yaml`.

## Frameworks

**Core:**

- Next.js 16.2.2 - App Router web framework and build/runtime, declared in `package.json` and used in `app/layout.tsx`, `next.config.ts`, and `eslint.config.mjs`.
- React 19.2.4 - component model for all UI files, declared in `package.json` and imported across `app/**/*.tsx` and `shared/components/**/*.tsx`.
- Radix UI via `radix-ui` 1.4.3 - headless primitives used by shared UI, for example `shared/components/ui/tooltip.tsx` imports `Tooltip` from `radix-ui`.
- shadcn CLI 4.1.2 with `radix-nova` style - UI scaffolding standard configured in `components.json`.

**State/Data:**

- TanStack Query 5.96.2 - remote data fetching and cache invalidation in `shared/queryClient.ts`, `shared/providers/QueryProvider.tsx`, `features/posts/post.query-options.ts`, and `features/posts/post.query-hooks.ts`.
- TanStack React Form 1.28.6 - client-side form state and submission in `features/posts/components/PostForm.tsx`.
- Zustand 5.0.12 - small page-local state in `app/(admin-portal)/admin/posts/post-list-page.store.ts`.
- Zod 4.3.6 - schema validation in `features/posts/components/PostForm.tsx`.

**Build/Dev:**

- Tailwind CSS 4 - utility CSS engine configured through `postcss.config.mjs` and imported in `app/globals.css`.
- `@tailwindcss/postcss` 4 - PostCSS integration in `postcss.config.mjs`.
- `tw-animate-css` 1.4.0 - animation utilities imported in `app/globals.css`.
- ESLint 9 with `eslint-config-next` 16.2.2 - linting stack in `eslint.config.mjs`.
- Prettier 3.8.1 - formatting configured by `.prettierrc` and package scripts in `package.json`.
- Husky 9.1.7 + lint-staged 16.4.0 - pre-commit automation in `.husky/pre-commit` and `package.json`.

## Key Dependencies

**Critical:**

- `next` 16.2.2 - application framework and routing layer; route entry is the `app/` directory and root metadata lives in `app/layout.tsx`.
- `react` 19.2.4 and `react-dom` 19.2.4 - rendering engine for all components under `app/`, `features/`, and `shared/`.
- `@tanstack/react-query` 5.96.2 - central remote state pattern with a singleton client in `shared/queryClient.ts` and feature hooks in `features/posts/post.query-hooks.ts`.
- `axios` 1.14.0 - HTTP client wrapped by `shared/apiClient.ts` and used by `shared/api/post.api.ts`.
- `@tanstack/react-form` 1.28.6 - form orchestration for the admin posts create/update UI in `features/posts/components/PostForm.tsx`.
- `zod` 4.3.6 - input validation before mutation submission in `features/posts/components/PostForm.tsx`.

**Infrastructure:**

- `radix-ui` 1.4.3 - accessible primitive components under `shared/components/ui/*.tsx`.
- `lucide-react` 1.7.0 - icon library used throughout route shells and feature UI such as `app/(auth)/login/page.tsx` and `app/(admin-portal)/admin/posts/page.tsx`.
- `class-variance-authority` 0.7.1, `clsx` 2.1.1, and `tailwind-merge` 3.5.0 - styling composition helpers in shared UI components and `shared/lib/utils.ts`.
- `shadcn` 4.1.2 - component generation workflow defined by `components.json`.

## Configuration

**Environment:**

- No `process.env.*` usage is detected in application source via repository search, so runtime configuration is currently code-defined rather than environment-driven.
- No root `.env` file is detected during repository listing.
- External endpoints are hard-coded where used; the current post API base URL is `https://jsonplaceholder.typicode.com/posts` in `shared/api/post.api.ts`.

**Build:**

- `next.config.ts` is present with default empty config export.
- `tsconfig.json` enables strict mode, bundler module resolution, and the `@/*` path alias.
- `postcss.config.mjs` loads `@tailwindcss/postcss`.
- `eslint.config.mjs` composes Next core-web-vitals, Next TypeScript, and Prettier compatibility rules.
- `components.json` defines shadcn aliases, `radix-nova` style, and `app/globals.css` as the Tailwind CSS entry.
- `.prettierrc` sets `trailingComma: "es5"`.

## Platform Requirements

**Development:**

- Node.js with pnpm is required to run `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm format` from `package.json`.
- Git hooks require pnpm because `.husky/pre-commit` runs `pnpm lint-staged`.

**Production:**

- Next.js server deployment target; metadata references `https://sandulieu.vercel.app` in `app/layout.tsx`, which is concrete evidence of a Vercel-hosted production URL.
- No custom server, Dockerfile, or alternate deployment runtime is detected in the repository root.

---

_Stack analysis: 2026-04-08_
