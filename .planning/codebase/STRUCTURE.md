# Codebase Structure

**Analysis Date:** 2026-04-08

## Directory Layout

```text
sandulieu/
├── app/                    # Next.js App Router routes, route-group layouts, and page orchestration
├── features/               # Domain features; `features/posts/` is the only implemented data feature
├── shared/                 # Shared API utilities, providers, models, layout blocks, and UI primitives
├── public/                 # Static assets bundled by Next.js
├── output/                 # Generated review/reference artifacts, not runtime app code
├── components.json         # shadcn configuration and aliases
├── next.config.ts          # Next.js configuration
├── package.json            # Scripts and dependencies
└── tsconfig.json           # TypeScript compiler options and `@/*` path alias
```

## Directory Purposes

**`app/`:**

- Purpose: Hold all route entrypoints and route-group layout boundaries.
- Contains: `app/layout.tsx`, `app/globals.css`, and grouped routes in `app/(public-portal)`, `app/(auth)`, `app/(admin-portal)`, `app/(buyer-portal)`, and `app/(seller-portal)`.
- Key files: `app/layout.tsx`, `app/(public-portal)/page.tsx`, `app/(auth)/login/page.tsx`, `app/(admin-portal)/admin/posts/page.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`

**`features/posts/`:**

- Purpose: Hold the posts domain end to end without mixing it into route files.
- Contains: feature hooks, query options, service mapping, feature types, barrel exports, and post-specific UI components.
- Key files: `features/posts/index.ts`, `features/posts/post.query-hooks.ts`, `features/posts/post.query-options.ts`, `features/posts/post.service.ts`, `features/posts/components/PostForm.tsx`

**`features/order/`:**

- Purpose: Reserved feature directory only.
- Contains: No files detected.
- Key files: Not applicable

**`shared/api/`:**

- Purpose: Hold raw API functions and wire-format response types.
- Contains: `shared/api/post.api.ts`
- Key files: `shared/api/post.api.ts`

**`shared/providers/`:**

- Purpose: Hold React provider composition used at the app root.
- Contains: `shared/providers/AppProviders.tsx`, `shared/providers/QueryProvider.tsx`
- Key files: `shared/providers/AppProviders.tsx`, `shared/providers/QueryProvider.tsx`

**`shared/components/layout/`:**

- Purpose: Hold reusable layout and navigation building blocks shared across portals.
- Contains: admin, public, and generic portal shell components.
- Key files: `shared/components/layout/admin-app-sidebar.tsx`, `shared/components/layout/portal-header.tsx`, `shared/components/layout/portal-sidebar.tsx`, `shared/components/layout/public-header.tsx`, `shared/components/layout/public-footer.tsx`, `shared/components/layout/site-mark.tsx`

**`shared/components/ui/`:**

- Purpose: Hold reusable shadcn-style UI primitives and composable building blocks.
- Contains: components such as `button.tsx`, `card.tsx`, `alert.tsx`, `sidebar.tsx`, `tooltip.tsx`, and `field.tsx`.
- Key files: `shared/components/ui/button.tsx`, `shared/components/ui/card.tsx`, `shared/components/ui/sidebar.tsx`, `shared/components/ui/field.tsx`

**`shared/model/`:**

- Purpose: Hold app-facing data models separate from wire-format API responses.
- Contains: `shared/model/post.model.ts`
- Key files: `shared/model/post.model.ts`

**`shared/lib/`:**

- Purpose: Hold generic helper utilities.
- Contains: `shared/lib/utils.ts`
- Key files: `shared/lib/utils.ts`

**`shared/hooks/`:**

- Purpose: Hold reusable hooks consumed by shared UI or layouts.
- Contains: `shared/hooks/use-mobile.ts`
- Key files: `shared/hooks/use-mobile.ts`

**`public/`:**

- Purpose: Hold static public assets.
- Contains: starter SVG assets such as `public/next.svg` and `public/vercel.svg`.
- Key files: `public/next.svg`, `public/vercel.svg`

**`output/`:**

- Purpose: Hold generated YAML snapshots and Playwright review artifacts.
- Contains: files such as `output/local-admin.yaml`, `output/local-home.yaml`, and nested output under `output/playwright/`.
- Key files: `output/local-admin.yaml`, `output/local-admin-posts.yaml`, `output/local-home.yaml`

## Key File Locations

**Entry Points:**

- `app/layout.tsx`: Global App Router layout, metadata, fonts, CSS import, and provider mounting.
- `app/(public-portal)/page.tsx`: Public home page for `/`.
- `app/(auth)/login/page.tsx`: Login page for `/login`.
- `app/(admin-portal)/admin/page.tsx`: Admin dashboard entry for `/admin`.
- `app/(admin-portal)/admin/posts/page.tsx`: Admin posts list/create page for `/admin/posts`.
- `app/(admin-portal)/admin/posts/[postId]/page.tsx`: Admin post detail/update/delete page for `/admin/posts/[postId]`.
- `app/(buyer-portal)/buyer/page.tsx`: Buyer overview page for `/buyer`.
- `app/(seller-portal)/seller/page.tsx`: Seller overview page for `/seller`.

**Configuration:**

- `package.json`: NPM scripts, runtime dependencies, lint and format tooling.
- `tsconfig.json`: TypeScript settings and `@/*` alias.
- `components.json`: shadcn component generator configuration pointing at `shared/components/*`.
- `next.config.ts`: Next.js config stub.
- `eslint.config.mjs`: ESLint configuration.
- `.prettierrc`: Prettier configuration.

**Core Logic:**

- `features/posts/post.query-hooks.ts`: Feature-level React Query hooks and cache invalidation.
- `features/posts/post.query-options.ts`: Query keys and query option builders.
- `features/posts/post.service.ts`: Mapping layer between raw API and app model.
- `shared/api/post.api.ts`: Raw HTTP requests for posts.
- `shared/apiClient.ts`: Shared Axios client and error normalization.
- `shared/queryClient.ts`: Singleton QueryClient configuration.

**Testing:**

- No test directory or test files detected under `app/`, `features/`, or `shared/`.
- No configured test runner detected in `package.json`.

## Naming Conventions

**Files:**

- Route files use Next.js conventions: `page.tsx` and `layout.tsx`, for example `app/(public-portal)/page.tsx` and `app/(admin-portal)/layout.tsx`.
- Feature modules use dot-separated role names in lowercase, for example `features/posts/post.query-hooks.ts`, `features/posts/post.query-options.ts`, and `features/posts/post.service.ts`.
- React component files outside routes use PascalCase, for example `features/posts/components/PostForm.tsx`, `features/posts/components/PostList.tsx`, and `shared/components/layout/PortalHeader`-style names implemented as `portal-header.tsx` for shared layout files and PascalCase for feature components.
- Shared UI primitives use lowercase filenames matching component purpose, for example `shared/components/ui/button.tsx` and `shared/components/ui/card.tsx`.

**Directories:**

- Route groups use parenthesized Next.js group names, for example `app/(admin-portal)` and `app/(public-portal)`.
- Feature directories use plural domain names, for example `features/posts/`.
- Shared subdirectories are responsibility-based: `shared/api/`, `shared/providers/`, `shared/model/`, `shared/lib/`, `shared/hooks/`, `shared/components/layout/`, and `shared/components/ui/`.

## Where to Add New Code

**New Feature:**

- Primary code: create a new domain directory under `features/` following the posts pattern, for example `features/<domain>/` with service, query options, query hooks, types, and components split into separate files.
- Route orchestration: add page files under the owning route group in `app/`, following the current separation used by `app/(admin-portal)/admin/posts/*`.
- Raw API access: place new transport calls in `shared/api/*.ts` rather than calling Axios directly from route files.
- App-facing models: place shared models in `shared/model/` when they are reused beyond a single feature.
- Tests: no existing pattern is established; coordinate test placement when a test stack is introduced.

**New Component/Module:**

- Portal-specific layout or shell code: add to `shared/components/layout/` if reused by multiple pages in the same portal style.
- Feature-specific UI: add to the owning feature under `features/<domain>/components/`.
- Route-only composition: keep directly in the route file under `app/.../page.tsx` when it is only orchestration logic.

**Utilities:**

- Shared helpers: `shared/lib/`
- Shared reusable hooks: `shared/hooks/`
- Shared provider wiring: `shared/providers/`

## Special Directories

**`app/(admin-portal)/admin/posts/`:**

- Purpose: Live admin CRUD route segment for posts, including list page, dynamic detail page, and page-local Zustand store.
- Generated: No
- Committed: Yes

**`shared/components/ui/`:**

- Purpose: Base UI primitives generated and maintained in shadcn style.
- Generated: Partially; structure is aligned with `components.json`.
- Committed: Yes

**`output/`:**

- Purpose: Generated review and reference artifacts such as YAML captures.
- Generated: Yes
- Committed: Yes

**`.planning/codebase/`:**

- Purpose: Mapping documents consumed by planning/execution workflows.
- Generated: Yes
- Committed: Intended to be committed as planning artifacts

---

_Structure analysis: 2026-04-08_
