# External Integrations

**Analysis Date:** 2026-04-08

## APIs & External Services

**Demo content API:**

- JSONPlaceholder - placeholder posts CRUD backend for the admin posts feature.
  - SDK/Client: `axios` through `shared/apiClient.ts` and `shared/api/post.api.ts`.
  - Auth: Not applicable; `shared/api/post.api.ts` calls `https://jsonplaceholder.typicode.com/posts` with no token handling.
  - Evidence: `shared/api/post.api.ts`, `features/posts/post.service.ts`, and `features/posts/post.query-hooks.ts`.

**Hosting metadata:**

- Vercel-hosted public site URL - used as the canonical metadata base for generated links and metadata.
  - SDK/Client: Next.js metadata API in `app/layout.tsx`.
  - Auth: Not applicable.
  - Evidence: `metadataBase: new URL("https://sandulieu.vercel.app")` in `app/layout.tsx`.

## Data Storage

**Databases:**

- Not detected.
  - Connection: No database connection env var usage is detected in repository source.
  - Client: No ORM or database client package is declared in `package.json`.

**File Storage:**

- Local filesystem only for source assets and generated output directories such as `public/` and `output/`.
- No cloud object storage SDK or storage client is detected in `package.json` or imports.

**Caching:**

- In-memory client cache only via TanStack Query.
  - Implementation: singleton `QueryClient` in `shared/queryClient.ts` with `staleTime: 30_000`, `retry: 1` for queries, and `retry: 0` for mutations.
  - Scope: browser session cache through `shared/providers/QueryProvider.tsx`.
- No Redis, Memcached, or external cache service is detected.

## Authentication & Identity

**Auth Provider:**

- Not implemented in code; current login is UI-only.
  - Implementation: demo login screen in `app/(auth)/login/page.tsx` with Vietnamese copy referencing VNeID and role-based quick links, but no SDK calls, session handling, middleware, or auth provider package.
  - Evidence: `app/(auth)/login/page.tsx` contains button text `Đăng nhập bằng VNeID`, while repo guidance in `CLAUDE.md` states there is no real auth/session/backend integration yet.

## Monitoring & Observability

**Error Tracking:**

- None detected.
  - No Sentry, LogRocket, Datadog, New Relic, or similar package is declared in `package.json`.

**Logs:**

- Minimal client/server error normalization only.
  - Approach: `shared/apiClient.ts` converts Axios failures into plain `Error` instances with normalized messages.
  - No structured logging library is detected.

## CI/CD & Deployment

**Hosting:**

- Vercel is the strongest detected target.
  - Evidence: production metadata URL `https://sandulieu.vercel.app` in `app/layout.tsx` and stock Vercel deployment guidance in `README.md`.

**CI Pipeline:**

- Repository-level CI workflow is not detected.
  - No project `.github/workflows/*` files are found outside `node_modules`.
- Local commit-time quality gate exists.
  - Evidence: `.husky/pre-commit` runs `pnpm lint-staged`.

## Environment Configuration

**Required env vars:**

- None detected in current application code.
- Repository search finds no `process.env.*` references in `app/`, `features/`, `shared/`, or config files.

**Secrets location:**

- Not detected.
- No root `.env` file is detected during repository listing.
- Because no env variable usage is implemented, secrets storage is not wired into runtime code at present.

## Webhooks & Callbacks

**Incoming:**

- None detected.
  - No `app/api/*` route handlers, webhook endpoints, or callback handlers are found in the analyzed integration paths.

**Outgoing:**

- `GET/POST/PUT/DELETE https://jsonplaceholder.typicode.com/posts` from `shared/api/post.api.ts`.
- No email, SMS, payment, analytics, or cloud service callbacks are detected.

---

_Integration audit: 2026-04-08_
