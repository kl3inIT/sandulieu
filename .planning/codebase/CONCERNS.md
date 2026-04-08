# Codebase Concerns

**Analysis Date:** 2026-04-08

## Tech Debt

**Demo backend wired into the only live CRUD flow:**

- Issue: The only implemented data flow depends on a hard-coded JSONPlaceholder endpoint instead of project-owned configuration or a real backend.
- Files: `CLAUDE.md`, `shared/api/post.api.ts`, `features/posts/post.service.ts`, `features/posts/post.query-hooks.ts`, `app/(admin-portal)/admin/posts/page.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`
- Impact: The admin posts area looks production-like but behaves as demo infrastructure, so create/update/delete behavior cannot be treated as a reliable system of record.
- Fix approach: Move the base URL out of `shared/api/post.api.ts` into environment-based configuration, replace JSONPlaceholder with a real service, and preserve the existing `shared/api` → `features/posts/*.service.ts` → query hooks layering.

**Large amount of product meaning is encoded as static UI copy:**

- Issue: Multiple pages present detailed operational, compliance, and market claims as hard-coded arrays and strings inside route files.
- Files: `app/(public-portal)/page.tsx`, `app/(auth)/login/page.tsx`, `app/(admin-portal)/admin/page.tsx`, `app/(buyer-portal)/buyer/page.tsx`, `app/(seller-portal)/seller/page.tsx`
- Impact: Product messaging, counts, and labels drift quickly because they are not sourced from data, config, or CMS-managed content.
- Fix approach: Extract reusable content/config modules for static copy first, then replace placeholder metrics with real data sources where applicable.

**Feature barrel exports mix data and UI surfaces:**

- Issue: `features/posts/index.ts` re-exports hooks, service functions, types, and presentational components from one barrel.
- Files: `features/posts/index.ts`, `app/(admin-portal)/admin/posts/page.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`
- Impact: Route pages can import the entire feature surface without clear boundaries, making it easier to couple page orchestration to internal feature details over time.
- Fix approach: Split imports by responsibility or maintain separate barrels for data, types, and UI components.

## Known Bugs

**Login page advertises authentication that does not exist:**

- Symptoms: The screen presents VNeID login, account login, forgot password, and registration cues, but no submit handling, provider SDK, session creation, or redirect logic exists.
- Files: `app/(auth)/login/page.tsx`, `CLAUDE.md`
- Trigger: Open `/login` and submit the form or click the main login controls.
- Workaround: Use the demo quick-access links in `app/(auth)/login/page.tsx` to navigate to `/buyer`, `/seller`, or `/admin`.

**Admin navigation contains non-live links rendered as clickable items:**

- Symptoms: Sidebar entries use `href="#"` while still rendering through `Link`, and only a subset of items are marked `live`.
- Files: `shared/components/layout/admin-app-sidebar.tsx`
- Trigger: Click `Giám sát hệ thống`, `Thông báo`, `Nhóm dịch vụ`, `Catalog dịch vụ`, or `Duyệt tài khoản` in the admin sidebar.
- Workaround: Use only the live entries `/admin` and `/admin/posts`.

**Buyer and seller sidebars expose duplicate routes for distinct sections:**

- Symptoms: Every buyer sidebar item points to `/buyer`, and every seller sidebar item points to `/seller`, so different menu labels do not navigate to different experiences.
- Files: `app/(buyer-portal)/buyer/layout.tsx`, `app/(seller-portal)/seller/layout.tsx`, `shared/components/layout/portal-sidebar.tsx`
- Trigger: Click any non-overview item in the buyer or seller sidebars.
- Workaround: Treat both portals as single-page shells until real nested routes exist.

## Security Considerations

**No authentication, authorization, or route protection:**

- Risk: Admin-, buyer-, and seller-labeled areas are navigable by URL with no middleware, no session checks, and no protected server boundary.
- Files: `CLAUDE.md`, `app/(admin-portal)/layout.tsx`, `app/(buyer-portal)/buyer/layout.tsx`, `app/(seller-portal)/seller/layout.tsx`
- Current mitigation: None detected in application code. No `middleware.ts` and no `app/api` auth layer were found.
- Recommendations: Add real auth/session handling, route guards, and role checks before treating portal shells as secure surfaces.

**Brand and trust signals exceed implemented controls:**

- Risk: Pages mention VNeID, SSO, 2FA, KYC scale, policy compliance, and system health, but the repository does not contain the integrations needed to support those statements.
- Files: `app/(auth)/login/page.tsx`, `app/(public-portal)/page.tsx`, `app/(admin-portal)/admin/page.tsx`, `CLAUDE.md`
- Current mitigation: `CLAUDE.md` explicitly states login is UI-only and posts are demo-backed.
- Recommendations: Either reduce trust-signaling copy until controls exist or add the real implementations and evidence paths.

**Client-only external API usage exposes integration assumptions in the browser:**

- Risk: The app currently calls the posts endpoint directly from client-side query hooks through Axios helpers with no server mediation.
- Files: `features/posts/post.query-hooks.ts`, `features/posts/post.service.ts`, `shared/api/post.api.ts`, `shared/apiClient.ts`
- Current mitigation: Axios timeout and normalized error messages in `shared/apiClient.ts`.
- Recommendations: Introduce a server-side boundary for sensitive APIs and keep client-side hooks focused on app-owned endpoints.

## Performance Bottlenecks

**Post list fetch loads the full remote collection with no pagination or filtering:**

- Problem: `getPosts()` pulls the full collection and `PostList` renders every card returned.
- Files: `shared/api/post.api.ts`, `features/posts/post.service.ts`, `features/posts/post.query-options.ts`, `features/posts/components/PostList.tsx`
- Cause: The query layer has only one list query key and no pagination, search, or partial-fetch strategy.
- Improvement path: Add paginated query options, server-supported filtering, and a slimmer summary model for list pages.

**Static-heavy route files will become hard to maintain as real features arrive:**

- Problem: Several route files combine layout, content arrays, and page rendering in one module.
- Files: `app/(public-portal)/page.tsx`, `app/(admin-portal)/admin/page.tsx`, `app/(auth)/login/page.tsx`
- Cause: Early-stage scaffolding keeps most content local to the page files.
- Improvement path: Extract data/config blocks and repeated UI sections before these files become multi-purpose maintenance hotspots.

## Fragile Areas

**Admin posts flow is the only real vertical slice:**

- Files: `shared/api/post.api.ts`, `shared/apiClient.ts`, `features/posts/post.service.ts`, `features/posts/post.query-options.ts`, `features/posts/post.query-hooks.ts`, `features/posts/components/PostList.tsx`, `features/posts/components/PostForm.tsx`, `features/posts/components/PostDetailCard.tsx`, `app/(admin-portal)/admin/posts/page.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`, `app/(admin-portal)/admin/posts/post-list-page.store.ts`
- Why fragile: The repo’s only end-to-end data flow is concentrated here, so changes to API shape, query keys, invalidation, or form behavior can break the only interactive feature.
- Safe modification: Preserve the current layer split documented in `CLAUDE.md` and keep cache invalidation inside `features/posts/post.query-hooks.ts`.
- Test coverage: No repository tests were found under `app/`, `features/`, or `shared/`.

**Portal shell navigation can drift from real routes:**

- Files: `shared/components/layout/admin-app-sidebar.tsx`, `app/(buyer-portal)/buyer/layout.tsx`, `app/(seller-portal)/seller/layout.tsx`, `shared/components/layout/portal-sidebar.tsx`
- Why fragile: Navigation labels imply multiple functional sections, but route coverage is mostly placeholders or duplicated hrefs.
- Safe modification: Create target routes before expanding menu depth, and replace `#` or duplicate portal hrefs with real destinations incrementally.
- Test coverage: No navigation tests detected.

## Scaling Limits

**Current architecture supports one implemented domain, not many:**

- Current capacity: The repository has one active domain feature under `features/posts/` and several portal shells under `app/`.
- Limit: Repeating current page-local hard-coded content patterns across more domains will create duplicated logic and unclear ownership between `app/`, `features/`, and `shared/`.
- Scaling path: Add new domains using the existing posts layering, create app-owned APIs/config, and avoid putting business logic directly in route files.

**Operational content does not scale with real product data:**

- Current capacity: Metrics and operational states are hard-coded in arrays in route modules.
- Limit: Each new dashboard section would require manual code edits instead of data updates.
- Scaling path: Move dashboard content to typed data sources and define stable contracts for metrics, alerts, and navigation sections.

## Dependencies at Risk

**No test framework dependency is installed or configured:**

- Risk: Regression detection depends entirely on manual validation.
- Impact: Refactors in the only live feature and in shared layout primitives can ship unnoticed breakage.
- Migration plan: Choose and add a test stack intentionally before broader feature expansion; `CLAUDE.md` explicitly says not to assume Jest, Vitest, or Playwright is present.

## Missing Critical Features

**Real authentication and session management:**

- Problem: The login experience is presentational only.
- Blocks: Protected routing, role-specific behavior, real admin access, and trustworthy buyer/seller/admin separation.

**App-owned backend/API layer:**

- Problem: No active `app/api` route handlers were found, and the only CRUD flow uses an external placeholder API.
- Blocks: Persistent data, secure mutations, environment-specific backends, and controlled integration behavior.

**Route completion behind portal navigation:**

- Problem: Buyer, seller, and most admin sections are shells or placeholder entries.
- Blocks: Navigation credibility, feature discoverability, and phased rollout of portal-specific workflows.

## Test Coverage Gaps

**Entire application code lacks tests:**

- What's not tested: Route rendering, query hooks, service mapping, form validation behavior, deletion flow, and layout navigation.
- Files: `app/**/*.tsx`, `features/posts/**/*`, `shared/**/*`
- Risk: UI regressions and broken data flows will only be caught manually.
- Priority: High

**Posts data flow has no safety net despite being the only interactive feature:**

- What's not tested: `mapPost()` transformations, query invalidation behavior, invalid `postId` handling, and form validation in create/update flows.
- Files: `features/posts/post.service.ts`, `features/posts/post.query-hooks.ts`, `features/posts/post.query-options.ts`, `features/posts/components/PostForm.tsx`, `app/(admin-portal)/admin/posts/page.tsx`, `app/(admin-portal)/admin/posts/[postId]/page.tsx`
- Risk: The app’s only real workflow can regress silently.
- Priority: High

**Navigation and portal-shell behavior are unverified:**

- What's not tested: Sidebar active states, dead-link behavior, duplicate href behavior, and route-shell composition.
- Files: `shared/components/layout/admin-app-sidebar.tsx`, `shared/components/layout/portal-sidebar.tsx`, `app/(public-portal)/layout.tsx`, `app/(auth)/layout.tsx`, `app/(buyer-portal)/buyer/layout.tsx`, `app/(seller-portal)/seller/layout.tsx`
- Risk: Users can encounter misleading navigation without automated detection.
- Priority: Medium

---

_Concerns audit: 2026-04-08_
