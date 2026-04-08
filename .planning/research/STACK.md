# Technology Stack

**Project:** Sandulieu Enterprise Directory CRUD
**Researched:** 2026-04-08
**Scope:** Next build step for a brownfield Next.js admin app adding nested Organization → Department → Member CRUD, while preparing for later Keycloak/OIDC integration.

## Recommended Stack

This should be an extension of the existing app, not a rewrite. The standard 2026 choice for this codebase is:

- keep **Next.js + React + TypeScript** as the app shell
- keep **TanStack Query** for server-state and mutation orchestration
- add **TanStack Table** for enterprise list screens
- keep **TanStack Form + Zod** for typed CRUD forms
- add **nuqs** for URL-driven table state like search, filters, pagination, and sort
- keep **Axios** only because the repo already has a shared API client and normalized error layer
- prepare for auth with **Auth.js + Keycloak provider** later, not `keycloak-js` in the main admin UI now

That stack fits the repo’s current layering, supports nested admin CRUD well, and avoids introducing an admin-framework rewrite that would fight the existing shadcn-based UI.

### Core Framework

| Technology | Version | Purpose                                                                  | Why                                                                                                                                                        | Confidence |
| ---------- | ------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Next.js    | 16.2.2  | App shell, routing, layouts, server/client boundaries                    | Already in production here. The right move is to extend the current App Router structure instead of swapping frameworks mid-project.                       | HIGH       |
| React      | 19.2.4  | UI runtime                                                               | Already aligned with Next.js 16.2.2 in this repo. No value in introducing an alternate UI runtime for CRUD screens.                                        | HIGH       |
| TypeScript | 5.x     | End-to-end typing across models, table columns, forms, and API contracts | Nested CRUD gets brittle fast without strict types. TypeScript is what makes table state, form validation, and service mapping safe as the domain expands. | HIGH       |

### Data and CRUD Layer

| Technology            | Version | Purpose                                                            | Why                                                                                                                                                                                                                  | Confidence |
| --------------------- | ------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| @tanstack/react-query | 5.96.2  | Querying, mutations, invalidation, optimistic UX where appropriate | This repo already uses it. Official docs explicitly support caching, invalidation, and optimistic updates, which are the core mechanics of admin CRUD. Keep one server-state pattern instead of adding a second one. | HIGH       |
| axios                 | 1.14.0  | HTTP client behind the shared API layer                            | In a greenfield app I would be more open to native `fetch`, but this repo already has `shared/apiClient.ts` and normalized Axios error handling. Keep Axios to avoid churn and preserve the service boundary.        | MEDIUM     |
| zod                   | 4.3.6   | Schema validation for forms and request payloads                   | Zod gives one source of truth for create/edit validation and is already in use. It is the cleanest way to validate nested member/department payloads before mutation submission.                                     | HIGH       |

### Enterprise Table and Filter Stack

| Technology              | Version | Purpose                                                                | Why                                                                                                                                                                                                                                     | Confidence |
| ----------------------- | ------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| @tanstack/react-table   | 8.21.3  | Headless enterprise list/grid behavior                                 | Official docs describe it as headless and suitable for table/grid use cases. That is exactly what you want with shadcn: keep your design system, add sorting/filtering/pagination/expanding without importing a whole visual framework. | HIGH       |
| nuqs                    | 2.8.9   | URL query state for search, filter, sort, pagination, parent selection | Enterprise admin screens should keep list state in the URL so pages are shareable and reload-safe. nuqs is purpose-built for typed query-string state in Next.js. Use it instead of hand-rolling `useSearchParams` parsing.             | HIGH       |
| @tanstack/react-virtual | 3.13.23 | Optional row virtualization for large lists later                      | Do not make virtualization part of the first CRUD milestone. Add it only if Organization/Member tables become large enough that pagination alone is not enough.                                                                         | MEDIUM     |

### Form and UI State

| Technology                | Version               | Purpose                                                      | Why                                                                                                                                                                                                             | Confidence |
| ------------------------- | --------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| @tanstack/react-form      | 1.28.6                | Typed create/edit forms with async validation and submission | Already in the repo. Official docs support type-safe fields, sync/async validation, dynamic validation, array fields, and async submit flows. That fits nested enterprise forms better than custom local state. | HIGH       |
| zustand                   | 5.0.12                | Small ephemeral UI state only                                | Keep it for things like selected delete target, drawer open state, or bulk action dialog state. Do not expand it into a second data layer for entities already managed by TanStack Query.                       | HIGH       |
| shadcn + Radix primitives | current repo standard | Visual components and accessibility layer                    | The repo already uses shadcn and Radix-style primitives. TanStack’s headless approach composes well with this; a prebuilt admin kit would fight it.                                                             | HIGH       |

### Authentication Readiness

| Technology                     | Version                       | Purpose                                                                    | Why                                                                                                                                                                                                                                                                            | Confidence |
| ------------------------------ | ----------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Auth.js with Keycloak provider | current Auth.js provider docs | Future server-side OIDC integration for Next.js                            | The official Auth.js Keycloak provider supports Keycloak directly and uses server-held env vars including client secret and issuer. That matches your requirement to keep the secret on the Next.js backend.                                                                   | HIGH       |
| keycloak-js                    | 26.2.3                        | Optional low-level browser adapter, only if later needed for special cases | Official Keycloak docs say browser apps should use a public client, tokens stay in memory, and silent SSO/session behavior is affected by third-party cookie restrictions. That makes it a poor primary integration choice for this app’s later confidential-client direction. | HIGH       |
| react-oidc-context             | 3.3.1                         | Not recommended as the primary first integration path here                 | It can be useful for pure browser-managed OIDC state, but your stated target is backend-held secret in Next.js. For this project, Auth.js is the cleaner default because it keeps the confidential pieces server-side.                                                         | MEDIUM     |

## Prescriptive Build Choices

### 1. Keep the current layering and duplicate the posts pattern

For each entity domain:

- `shared/api/*.ts` for raw requests or mock adapters
- `features/organizations|departments|members/*.service.ts` for mapping and domain rules
- `*.query-options.ts` for stable keys
- `*.query-hooks.ts` for queries, mutations, and invalidation
- feature components for forms/tables/detail cards
- route pages for orchestration only

Do not collapse table logic, mutations, and wire-format mapping into page files.

### 2. Use TanStack Table as the standard list engine

Use TanStack Table for:

- column definitions
- sorting
- global search
- column filters
- pagination state
- expandable rows where useful
- manual server-side mode later when a real backend arrives

For this milestone, start with client-side table behavior over mock/service data. Official docs explicitly support starting client-side and moving to manual server-side filtering/pagination later.

### 3. Put list state in the URL with nuqs

For enterprise CRUD, the list page URL should own:

- selected organization
- selected department
- search term
- status filter
- page index
- page size
- sort key/order

That makes admin pages bookmarkable, shareable, and resilient to reload/navigation. It also prevents table state from getting trapped in component state.

### 4. Keep TanStack Query as the only server-state source of truth

Use Query for:

- list queries
- detail queries
- create/update/delete mutations
- invalidating organization/department/member lists after mutation
- invalidating parent-aware detail views when child counts or child lists change

Do not put entity collections in Zustand or duplicate them in route-local state.

### 5. Keep forms in TanStack Form + Zod

Use Zod schemas per entity and map them into TanStack Form validators. This is the cleanest path for:

- reusable create/edit forms
- nested validation rules
- field-level errors
- async submit states
- future server-side validation mapping when a real API exists

### 6. Prepare for Keycloak by designing boundaries now, not integrating it now

Prepare now by introducing these seams:

- `shared/auth/` boundary for session/user/permission adapters
- route-level auth guards behind a feature flag or stubbed session provider
- role-aware navigation config kept outside UI components
- mutation/action permission checks abstracted away from page components

Then, when auth is introduced, use **Auth.js + Keycloak provider** as the default path. That fits Next.js better than leading with browser-only OIDC state management.

## Supporting Libraries

| Library                                          | Version                    | Purpose                      | When to Use                                                                 | Confidence |
| ------------------------------------------------ | -------------------------- | ---------------------------- | --------------------------------------------------------------------------- | ---------- |
| @tanstack/react-table                            | 8.21.3                     | Table engine for admin lists | Use on all Organization, Department, and Member list pages.                 | HIGH       |
| nuqs                                             | 2.8.9                      | Typed URL search params      | Use for all list and nested parent-filter state.                            | HIGH       |
| @tanstack/react-virtual                          | 3.13.23                    | Virtual scrolling            | Use only if lists become too large for normal pagination UX.                | MEDIUM     |
| lucide-react                                     | current repo version 1.7.0 | Icons for status/actions     | Keep using existing icon stack; do not add another icon system.             | HIGH       |
| class-variance-authority / clsx / tailwind-merge | current repo stack         | Shared styling composition   | Keep using current utility stack; no need for a second styling abstraction. | HIGH       |

## What Not to Use and Why

| Category                                   | Do Not Use                                                  | Why Not                                                                                                                                                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin framework                            | react-admin                                                 | Great for greenfield CRUD dashboards, but too opinionated for this repo. It would pull the app toward its own resource conventions and UI patterns instead of extending your existing feature/service/App Router structure. |
| Component suite with data grid as strategy | MUI Data Grid / Ant Design Table as the main stack decision | They solve tables by bringing a full visual system. This repo already uses shadcn/Radix patterns. Importing a second dominant design system creates UI inconsistency and migration drag.                                    |
| Extra global state                         | Redux Toolkit for entity CRUD state                         | TanStack Query already owns remote/server state well. Adding Redux here would create duplicate sources of truth and more boilerplate without solving a real problem.                                                        |
| Homemade table state                       | Custom sorting/filter/pagination hooks from scratch         | TanStack Table already gives the right primitives. Hand-rolling this is slower, less tested, and harder to migrate to server-side mode later.                                                                               |
| Browser-primary Keycloak integration       | `keycloak-js` as the main auth architecture                 | Official docs warn about browser-session limitations and require public-client assumptions. Your target is backend-held secret, so make server-side Auth.js the primary plan.                                               |
| Early virtualization                       | Virtualized tables in the first CRUD milestone              | Adds complexity before you know you need it. Start with pagination and only add virtualization if usage proves the need.                                                                                                    |

## Recommended Implementation Shape for This Milestone

### Entity modules

Create three feature domains:

- `features/organizations`
- `features/departments`
- `features/members`

Each should have:

- `*.types.ts`
- `*.service.ts`
- `*.query-options.ts`
- `*.query-hooks.ts`
- `components/*`

### Table behavior baseline

Use the same table capability set across all list screens:

- global search
- column filters
- sortable columns
- status badges
- row actions
- pagination
- empty state
- delete confirmation
- parent-aware filters via URL state

### Nested entity strategy

Do not render the entire Organization → Department → Member hierarchy in one mega-screen first.

Standard pattern:

- Organization list/detail first
- Department list scoped by selected organization
- Member list scoped by selected organization and optional department
- optional expanded rows later, but only when it improves drill-down, not as the default information architecture

That is simpler to build, easier to query, and easier to secure later when permissions arrive.

## Alternatives Considered

| Category      | Recommended                      | Alternative                                | Why Not                                                                                                                    |
| ------------- | -------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Data fetching | TanStack Query 5.96.2            | SWR                                        | Query is already implemented in the repo and has stronger mutation/invalidation workflows for CRUD-heavy admin interfaces. |
| Table layer   | TanStack Table 8.21.3            | MUI Data Grid                              | TanStack Table fits headless shadcn composition better and avoids importing a second visual system.                        |
| URL state     | nuqs 2.8.9                       | Manual `useSearchParams` parsing           | Manual parsing becomes repetitive and error-prone once filters, paging, and nested parent context grow.                    |
| Forms         | TanStack Form 1.28.6 + Zod 4.3.6 | React Hook Form                            | RHF is viable, but the repo already uses TanStack Form, so switching adds inconsistency without enough upside.             |
| Future auth   | Auth.js + Keycloak provider      | `react-oidc-context` as primary auth layer | This app wants server-held secrets and later backend-managed auth boundaries. Auth.js fits that direction better.          |
| HTTP client   | Keep Axios 1.14.0                | Migrate now to native `fetch`              | A fetch migration is not the next milestone. Preserve the existing shared client and error normalization first.            |

## Installation

```bash
# Enterprise CRUD stack additions
pnpm add @tanstack/react-table nuqs

# Optional later, only if large lists justify it
pnpm add @tanstack/react-virtual

# Future auth phase, not this CRUD milestone
pnpm add next-auth
```

Notes:

- Do not add `keycloak-js` or `react-oidc-context` in the CRUD foundation milestone.
- Do not add a heavy admin framework or second design system.

## Decision Summary

Use this stack for the next phase:

1. **Keep** Next.js 16.2.2, React 19.2.4, TypeScript 5, TanStack Query, TanStack Form, Zod, Axios, Zustand.
2. **Add now** `@tanstack/react-table` and `nuqs`.
3. **Add later if needed** `@tanstack/react-virtual`.
4. **Plan later auth around** Auth.js + Keycloak provider.
5. **Avoid** react-admin, MUI/AntD as the main admin stack, Redux for CRUD state, and browser-primary Keycloak integration.

This is the most standard 2026 brownfield stack for your repo because it improves enterprise CRUD capability without breaking the architecture you already have.

## Sources

- TanStack Query React overview — https://tanstack.com/query/latest/docs/framework/react/overview
- TanStack Query invalidation guide — https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
- TanStack Table introduction — https://tanstack.com/table/latest/docs/introduction
- TanStack Table pagination guide — https://tanstack.com/table/latest/docs/guide/pagination
- TanStack Table global filtering guide — https://tanstack.com/table/latest/docs/guide/global-filtering
- TanStack Table expanding guide — https://tanstack.com/table/latest/docs/guide/expanding
- TanStack Form overview — https://tanstack.com/form/latest/docs/overview
- nuqs installation/docs — https://nuqs.dev/docs/installation
- Auth.js Keycloak provider — https://authjs.dev/getting-started/providers/keycloak
- Keycloak JavaScript adapter — https://www.keycloak.org/securing-apps/javascript-adapter
- npm package registry versions checked on 2026-04-08:
  - https://www.npmjs.com/package/@tanstack/react-query
  - https://www.npmjs.com/package/@tanstack/react-table
  - https://www.npmjs.com/package/@tanstack/react-form
  - https://www.npmjs.com/package/@tanstack/react-virtual
  - https://www.npmjs.com/package/nuqs
  - https://www.npmjs.com/package/keycloak-js
  - https://www.npmjs.com/package/react-oidc-context
  - https://www.npmjs.com/package/zod
  - https://www.npmjs.com/package/axios
  - https://www.npmjs.com/package/zustand
