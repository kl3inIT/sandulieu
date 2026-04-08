# Phase 1: Directory Foundations & Contracts - Research

**Researched:** 2026-04-08
**Domain:** Next.js App Router admin CRUD foundations for nested directory resources with TanStack Query, TanStack Table, and TanStack Form
**Confidence:** HIGH

## User Constraints

No `CONTEXT.md` exists for this phase, so there are no locked user decisions to copy verbatim from discuss-phase. [VERIFIED: codebase grep]

- Locked Decisions: None provided via `CONTEXT.md`. [VERIFIED: codebase grep]
- Claude's Discretion: Full Phase 1 research scope as described in roadmap and user prompt. [VERIFIED: user prompt]
- Deferred Ideas: Only roadmap-level deferred items apply; Phase 1 should not pull in auth implementation, RBAC, audit logs, or approval workflows. [VERIFIED: /d/DTH/sandulieu/.planning/PROJECT.md][VERIFIED: /d/DTH/sandulieu/.planning/ROADMAP.md]

## Phase Requirements

| ID      | Description                                                                                                               | Research Support                                                                                                                                                                                                                                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UX-02   | List state for search, filters, sorting, and pagination is reflected in URL-friendly query state                          | Use page-level URL state parsing/serialization, pass parsed state into query options, and keep non-URL-only state out of Zustand. [CITED: https://nextjs.org/docs/app/api-reference/functions/use-search-params][VERIFIED: /d/DTH/sandulieu/CLAUDE.md]                                                                                                |
| UX-06   | Forms use TanStack Form-based validation and submission patterns consistently                                             | Create directory form schemas, shared default-value builders, TanStack Form-ready helpers, and at least one proof consumer using `useForm`. [CITED: https://tanstack.com/form/latest/docs/framework/react/guides/validation][VERIFIED: /d/DTH/sandulieu/features/posts/components/PostForm.tsx]                                                       |
| UX-07   | Table screens use TanStack Table patterns consistently across entities                                                    | Create reusable directory list-state contracts and table adapters for controlled sorting/filtering/pagination with manual server-shaped behavior. [CITED: https://tanstack.com/table/latest/docs/guide/pagination][CITED: https://tanstack.com/table/latest/docs/guide/sorting][CITED: https://tanstack.com/table/latest/docs/guide/column-filtering] |
| ARCH-01 | Organization, Department, and Member are implemented as separate feature modules that preserve the existing repo layering | Keep `shared/api -> feature service -> query hooks -> pages/components`, matching posts and CLAUDE.md. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md][VERIFIED: /d/DTH/sandulieu/features/posts]                                                                                                                                                              |
| ARCH-02 | Mock data flows through shared API contracts and feature services rather than page-local in-memory logic                  | Put wire contracts in `shared/api/*.ts`, map to UI/domain models in feature services, and keep pages orchestration-only. [VERIFIED: /d/DTH/sandulieu/shared/api/post.api.ts][VERIFIED: /d/DTH/sandulieu/features/posts/post.service.ts]                                                                                                               |
| ARCH-03 | List/query contracts are shaped to resemble future backend behavior for filtering, sorting, and pagination                | Standardize list query params and paginated response envelopes now, even if mock data is local/in-memory behind the shared API boundary. [CITED: https://tanstack.com/table/latest/docs/guide/pagination][CITED: https://tanstack.com/table/latest/docs/guide/sorting][CITED: https://tanstack.com/table/latest/docs/guide/column-filtering]          |
| ARCH-04 | Parent-qualified query keys prevent cache collisions across nested resources                                              | Include every variable dependency and parent scope in query keys; do not use flat keys for nested resources. [CITED: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys][VERIFIED: /d/DTH/sandulieu/features/posts/post.query-options.ts]                                                                                       |
| ARCH-05 | Entity identifiers and route params remain stable and backend-friendly                                                    | Separate immutable IDs/codes from display names and keep route params/backend identity stable across edits. [VERIFIED: /d/DTH/sandulieu/.planning/REQUIREMENTS.md][RESOLVED]                                                                                                                                                                          |

## Project Constraints (from CLAUDE.md)

- Use Next.js 16.2.2 with React 19; do not assume older Next.js conventions. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Before changing framework-specific behavior, read relevant docs in `node_modules/next/dist/docs/`. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Do not add extra visual design work unless explicitly requested. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Prefer the shadcn CLI with `pnpm dlx shadcn@latest ...` when implementing UI. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Do not modify base shadcn components under `shared/components/ui` unless explicitly asked. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Only build custom UI markup when no suitable shadcn component/block exists or the user explicitly wants it. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Preserve the current layering: `shared/api/*.ts` -> feature service -> query options/hooks -> feature UI -> `app/*` orchestration. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Prefer Zustand only for UI state that does not belong in URL params, React Query cache, or local component state. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Use the `@/*` path alias. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- Keep user-facing UI text in Vietnamese with diacritics when implementation happens later. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md]
- There is currently no test runner configured in `package.json`; do not assume Jest/Vitest/Playwright is installed. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md][VERIFIED: /d/DTH/sandulieu/package.json]

## Summary

Phase 1 should create the reusable contracts and module seams that let later organization, department, and member slices behave like backend-driven CRUD screens without rewriting list state, query keys, or form plumbing in each phase. The current posts feature already proves the repo’s preferred layering and shared provider setup, but it is too flat and too page-specific to serve nested directory resources without generalization. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md][VERIFIED: /d/DTH/sandulieu/features/posts][VERIFIED: /d/DTH/sandulieu/shared/providers/AppProviders.tsx]

The most important design choice is to make URL query state, list request contracts, and query keys all describe the same backend-shaped state object. That means the planner should treat list state as a contract artifact, not as incidental component state. TanStack Table should run in controlled/manual mode for sorting, filtering, and pagination so the table reflects server-shaped data instead of performing local-only behavior that later fights the backend. [CITED: https://nextjs.org/docs/app/api-reference/functions/use-search-params][CITED: https://tanstack.com/table/latest/docs/guide/pagination][CITED: https://tanstack.com/table/latest/docs/guide/sorting][CITED: https://tanstack.com/table/latest/docs/guide/column-filtering]

The second key choice is to define stable identifiers and parent-qualified scopes now. Organizations, departments, and members should each have an immutable primary identifier plus a stable business code where the requirements call for it, and all nested resource list/detail keys should include parent scope. This avoids cache collisions, route ambiguity, and future backend refactors when departments and members stop being effectively global. [VERIFIED: /d/DTH/sandulieu/.planning/REQUIREMENTS.md][CITED: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys]

**Primary recommendation:** Build Phase 1 around one shared directory list contract, one shared URL-state codec, one shared table-state adapter, three separate feature modules, and one proof layer that demonstrates both route-state consumption and TanStack Form behavior with real consumers. [VERIFIED: /d/DTH/sandulieu/.planning/ROADMAP.md][CITED: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys][CITED: https://tanstack.com/table/latest/docs/guide/pagination]

## Standard Stack

### Core

| Library               | Version | Purpose                                                       | Why Standard                                                                                                                                                                                                                                                 |
| --------------------- | ------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Next.js               | 16.2.2  | App Router pages and URL/search-param ownership               | Already required by the repo and current route structure. [VERIFIED: npm registry][VERIFIED: /d/DTH/sandulieu/package.json]                                                                                                                                  |
| @tanstack/react-query | 5.96.2  | Server-state fetching, caching, invalidation                  | Already the repo standard and supports stable variable-based keys. [VERIFIED: npm registry][VERIFIED: /d/DTH/sandulieu/features/posts/post.query-hooks.ts][CITED: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys]                  |
| @tanstack/react-form  | 1.28.6  | Reusable form validation/submission behavior                  | Already used in posts and supports timing-specific plus schema-based validation. [VERIFIED: npm registry][VERIFIED: /d/DTH/sandulieu/features/posts/components/PostForm.tsx][CITED: https://tanstack.com/form/latest/docs/framework/react/guides/validation] |
| @tanstack/react-table | 8.21.3  | Controlled admin table state for sorting/filtering/pagination | Best fit for the roadmap’s enterprise table requirement and current TanStack direction. [VERIFIED: npm registry][VERIFIED: /d/DTH/sandulieu/.planning/ROADMAP.md][CITED: https://tanstack.com/table/latest/docs/guide/pagination]                            |
| zod                   | 4.3.6   | Schema validation for form values and query-param parsing     | Already in repo and already used with TanStack Form. [VERIFIED: npm registry][VERIFIED: /d/DTH/sandulieu/features/posts/components/PostForm.tsx]                                                                                                             |
| axios                 | 1.14.0  | Shared transport layer behind mock API contracts              | Already the repo standard via `shared/apiClient.ts`. [VERIFIED: npm registry][VERIFIED: /d/DTH/sandulieu/shared/apiClient.ts]                                                                                                                                |

### Supporting

| Library                 | Version                  | Purpose                         | When to Use                                                                                                                                                                                                                        |
| ----------------------- | ------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| next/navigation         | bundled with Next 16.2.2 | Read and update URL query state | Use in page/list-state client components for URL-owned list state. [VERIFIED: /d/DTH/sandulieu/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md]                                              |
| Zustand                 | 5.0.12                   | Small non-URL UI state only     | Use for ephemeral UI such as open row menus or pending destructive row IDs, not list filters/pagination. [VERIFIED: /d/DTH/sandulieu/CLAUDE.md][VERIFIED: /d/DTH/sandulieu/app/(admin-portal)/admin/posts/post-list-page.store.ts] |
| shadcn field primitives | repo source              | Consistent form composition     | Use `FieldGroup`, `Field`, `FieldLabel`, `FieldError`, etc. instead of ad hoc form wrappers. [VERIFIED: /d/DTH/sandulieu/shared/components/ui/field.tsx][VERIFIED: /d/DTH/sandulieu/.agents/skills/shadcn/SKILL.md]                |

## Recommended Artifacts for Phase 1

| Artifact                                                  | Recommended Location                                                   | Why It Belongs in Phase 1                                               |
| --------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Directory entity contracts and list-query types           | `shared/api/directory.contracts.ts`                                    | Makes list requests/responses stable before UI slices ship.             |
| URL state codec for list screens                          | `features/directory/shared/directory-list-state.ts`                    | Centralizes parse/serialize/default logic for query params.             |
| Parent-scope helpers                                      | `features/directory/shared/directory-scope.ts`                         | Prevents each feature from inventing incompatible parent scoping rules. |
| Shared TanStack Table adapter for directory lists         | `features/directory/shared/directory-table-state.ts`                   | Aligns manual pagination/sorting/filtering with contract types.         |
| Shared status enums                                       | `shared/model/directory-status.model.ts`                               | Keeps filters and badges consistent across entities.                    |
| Feature skeletons for organizations, departments, members | `features/organizations`, `features/departments`, `features/members`   | Satisfies ARCH-01 early and gives later phases stable seams.            |
| API contract files per entity                             | `shared/api/organization.api.ts`, `department.api.ts`, `member.api.ts` | Preserves raw wire contracts separate from mapped models.               |
| Query key factories per entity                            | `*.query-options.ts` in each feature                                   | Prevents nested cache collisions from day one.                          |
| Reusable form schemas/default builders/helpers            | `features/*/*.form.ts`                                                 | Makes TanStack Form usage consistent before create/edit pages multiply. |
| One minimal proof form consumer                           | `features/organizations/components/OrganizationForm.tsx`               | Proves the exported form API really works with `useForm`.               |

## Concrete Proposed Module Layout

```text
shared/
├── api/
│   ├── directory.contracts.ts
│   ├── organization.api.ts
│   ├── department.api.ts
│   └── member.api.ts
├── model/
│   ├── directory-status.model.ts
│   ├── organization.model.ts
│   ├── department.model.ts
│   └── member.model.ts

features/
├── directory/
│   └── shared/
│       ├── directory-list-state.ts
│       ├── directory-table-state.ts
│       ├── directory-scope.ts
│       ├── directory-filters.ts
│       └── directory-query-keys.ts
├── organizations/
│   ├── index.ts
│   ├── organization.types.ts
│   ├── organization.service.ts
│   ├── organization.query-options.ts
│   ├── organization.query-hooks.ts
│   ├── organization.form.ts
│   └── components/
├── departments/
│   ├── index.ts
│   ├── department.types.ts
│   ├── department.service.ts
│   ├── department.query-options.ts
│   ├── department.query-hooks.ts
│   ├── department.form.ts
│   └── components/
└── members/
    ├── index.ts
    ├── member.types.ts
    ├── member.service.ts
    ├── member.query-options.ts
    ├── member.query-hooks.ts
    ├── member.form.ts
    └── components/

app/
└── (admin-portal)/admin/
    ├── organizations/
    ├── organizations/[organizationId]/departments/
    └── organizations/[organizationId]/departments/[departmentId]/members/
```

## Backend-Shaped Contracts

### Stable Identifier Strategy (RESOLVED)

Use stable opaque `id` values as Phase 1 route params and cache/detail identity. Keep business `code` as a separate stable domain field for display, search, filters, and future backend use, but do not make `code` the primary route identity in Phase 1. Display names remain editable and must never be used as route or cache identity. This resolves the former route-identity open question and keeps ARCH-05 unambiguous.

Recommended fields:

| Entity       | Required Identity Fields                                                   | Notes                                                                                                       |
| ------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Organization | `id`, `code`, `name`, `status`                                             | `id` is route/query identity; `code` is a separate business identifier; `name` is editable display value.   |
| Department   | `id`, `organizationId`, `code`, `name`, `status`                           | `id` is only safe when paired with organization scope; `code` is a business identifier, not route identity. |
| Member       | `id`, `organizationId`, `departmentId`, `memberCode`, `fullName`, `status` | Keep both parent references explicit in API payloads and query keys.                                        |

### Department Uniqueness Scope (RESOLVED)

Treat department identity as organization-scoped in Phase 1 contracts. Even if a future backend guarantees globally unique department IDs, feature query keys and route-level data access should remain parent-qualified by `organizationId` because that is the safer brownfield choice and aligns with the nested route model. This resolves the former department uniqueness open question.

### Recommended Status Contract

Use explicit status values on all three entities because the requirements require filterable, badge-friendly statuses. Keep the status vocabulary aligned across entities unless a domain-specific reason emerges later.

Recommended baseline enum: `"active" | "inactive" | "archived"`.

### Recommended List Query Contract

Use one normalized request contract shape for all entity lists, with entity-specific filters added in a typed `filters` object.

```ts
export type SortDirection = "asc" | "desc";

export type DirectorySort<TSortField extends string> = {
  field: TSortField;
  direction: SortDirection;
};

export type DirectoryPage = {
  pageIndex: number;
  pageSize: number;
};

export type DirectoryListQuery<TSortField extends string, TFilters> = {
  search?: string;
  status?: string[];
  sort?: DirectorySort<TSortField>[];
  page: DirectoryPage;
  filters: TFilters;
};
```

### Recommended Paginated Response Envelope

```ts
export type PaginatedResult<TItem> = {
  items: TItem[];
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
};
```

### Parent-Qualified Scoping Contract

Use explicit parent scope objects on nested list/detail contracts instead of relying on implicit route context inside feature hooks.

```ts
export type OrganizationScope = {
  organizationId: string;
};

export type DepartmentScope = {
  organizationId: string;
  departmentId: string;
};
```

For Phase 1 proof routes, both departments and members stay parent-qualified even when detail lookups are involved.

## Architecture Patterns

### Recommended Project Structure

```text
shared/api/*.ts
shared/model/*.ts
features/*/*.service.ts
features/*/*.query-options.ts
features/*/*.query-hooks.ts
features/*/*.form.ts
features/*/components/*
app/(admin-portal)/**/page.tsx
```

### Pattern 1: URL-Owned List State

Parse list state from the route’s search params, normalize it through one typed codec, then feed that typed state into both query options and table state.

### Pattern 2: Manual TanStack Table for Backend-Shaped Lists

Keep pagination, sorting, and filtering controlled outside the table instance and enable manual modes so the table reflects already-processed data from the query result.

### Pattern 3: Query Keys Include Every Variable Dependency

Parent scope, detail identifiers, and list contract inputs belong in query keys so cache entries are unique to the fetched resource.

### Pattern 4: Form Validation Lives at Feature Edge, Not Page Edge

Keep TanStack Form setup inside feature form modules/components, with Zod schemas and default value factories co-located, and export TanStack Form-ready helpers so page files stay responsible only for orchestration.

### Anti-Patterns to Avoid

- List state in Zustand
- Flat nested query keys
- Client-side table transforms on server-shaped pages
- Pages calling Axios directly
- Using display names as route identifiers
- Schema-only `*.form.ts` files with no proof that `useForm` can consume them

## Query Key Structure Recommendation

```ts
organizationQueryKeys = {
  all: ["organizations"],
  lists: () => ["organizations", "list"],
  list: (params) => ["organizations", "list", params],
  details: () => ["organizations", "detail"],
  detail: (organizationId) => ["organizations", "detail", organizationId],
};

departmentQueryKeys = {
  all: ["departments"],
  lists: () => ["departments", "list"],
  list: (scope, params) => ["departments", "list", scope, params],
  details: () => ["departments", "detail"],
  detail: (scope) => ["departments", "detail", scope],
};

memberQueryKeys = {
  all: ["members"],
  lists: () => ["members", "list"],
  list: (scope, params) => ["members", "list", scope, params],
  details: () => ["members", "detail"],
  detail: (scope) => ["members", "detail", scope],
};
```

## Shared Table UI Decision (RESOLVED)

Phase 1 should deliver shared table state/contracts and thin route proof consumption only. It should not add shared table UI primitives or broader design composition in this phase. Shared visual table composition belongs to later CRUD UI work, with broader cross-entity polish deferred to Phase 5. This resolves the former shared-table-UI open question while keeping Phase 1 within scope.

## Common Pitfalls

- Colliding nested query keys across parent contexts
- URL state and table state drifting apart
- Mixing client-side transforms with server-shaped data
- Using mutable display fields as identifiers
- Over-generalizing Phase 1 into a framework project

## Validation Architecture

### Test Framework

| Property           | Value                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Framework          | None configured. [VERIFIED: /d/DTH/sandulieu/package.json][VERIFIED: /d/DTH/sandulieu/.planning/codebase/TESTING.md] |
| Config file        | none — rely on lint/build/manual review gates defined in `VALIDATION.md`.                                            |
| Quick run command  | `pnpm lint` [VERIFIED: /d/DTH/sandulieu/package.json]                                                                |
| Full suite command | `pnpm lint && pnpm format:check` [VERIFIED: /d/DTH/sandulieu/package.json]                                           |

### Validation Gate

Phase 1 validation is now tracked in `VALIDATION.md`. That artifact defines the requirement-to-check matrix, automated commands, and the manual review focus for route proof and TanStack Form proof.

## Recommended Planning Split (RESOLVED)

Use **4 PLAN.md chunks** for this phase.

1. **Plan 01 - Shared contracts and raw API boundaries**
2. **Plan 02 - URL-state, table-state, scope, and query-key foundations**
3. **Plan 03 - Feature skeletons and query/service boundaries**
4. **Plan 04 - Form proof and route proof wiring**

This split keeps plans inside the file-budget threshold and separates contract definition from proof wiring.

## Assumptions Log

| #   | Claim                                                                                                             | Section                         | Risk if Wrong                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| A1  | Shared directory foundations should live under `features/directory/shared/*` instead of another exact folder name | Concrete Proposed Module Layout | Low - mostly file-move churn                                                                      |
| A2  | Baseline status enum should be `active                                                                            | inactive                        | archived`                                                                                         | Backend-Shaped Contracts | Medium - filter UI and badge mapping may need rewrite |
| A3  | Stable opaque `id` values should be route identity, while `code` remains a separate business identifier           | Stable Identifier Strategy      | Medium - future backend/public URL strategy could evolve, but this is explicit and executable now |
| A4  | Department detail/query keys should stay parent-qualified even if backend IDs are globally unique                 | Department Uniqueness Scope     | Low - slightly more verbose keys, but safe                                                        |
| A5  | Phase 1 should split into 4 plan chunks                                                                           | Recommended Planning Split      | Low - planning granularity only                                                                   |

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - based on current repo dependencies and official docs.
- Architecture: HIGH - based on existing repo layering, roadmap requirements, and current posts reference implementation.
- Pitfalls: MEDIUM - grounded in official TanStack/Next docs plus repo behavior.

**Research date:** 2026-04-08
**Valid until:** 2026-05-08
