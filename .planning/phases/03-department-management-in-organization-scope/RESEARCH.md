# Phase 3: Department Management in Organization Scope - Research

**Researched:** 2026-04-10  
**Domain:** Department CRUD vertical slice in organization-qualified admin routes  
**Confidence:** HIGH

## User Constraints

No `CONTEXT.md` exists for this phase, so planning uses roadmap requirements, prior-phase artifacts, and current code patterns.

### Locked Decisions

- Phase 3 must deliver department CRUD inside organization-qualified routes and queries.
- Parent organization visibility must remain explicit across lists, detail, edit, and delete flows.
- Department deletion must be guarded and blocked when child members still exist.
- UI copy remains Vietnamese with diacritics when implemented.
- The repo layering remains `shared/api -> feature service -> query options/hooks -> feature UI -> app route orchestration`.

### Claude's Discretion

- Exact table column ordering beyond code/name/status priorities.
- Exact summary-card composition for parent organization and member context.
- Exact wording of helper/error text, as long as behavior is explicit and Vietnamese.

### Deferred Ideas

- No Phase 4 member CRUD work beyond read-only member summary and delete dependency checks.
- No extra cross-entity UX harmonization beyond what Phase 3 needs to ship departments end to end.
- No auth, RBAC, audit-log, or approval-flow work.

## Project Constraints

- Preserve the repo layering: `shared/api -> feature service -> query options/hooks -> feature UI -> app route orchestration`.
- Use Next.js 16.2.2 + React 19 conventions.
- Do not add extra design work.
- Prefer shadcn-based composition; do not modify `shared/components/ui` base components.
- Keep user-facing copy in Vietnamese with diacritics.
- No test runner is currently configured; planning should not assume Jest/Vitest/Playwright exists.

## Summary

Phase 3 should be planned as the department equivalent of the already-established organization vertical slice. The biggest planning insight is that the foundational work from Phase 1 already exists: URL-owned list state, parent-qualified scope helpers, backend-shaped query contracts, and department feature skeletons are already present. The missing work is the real production CRUD slice: richer department contracts, create/update/delete mutation support, nested list/detail/create/edit pages, and a guarded delete flow driven by member dependencies.

A second key insight is that current code is ahead of planning state. Even though `.planning/STATE.md` still reports stale phase progress, the repository already contains substantial Phase 2-style organization patterns that should be treated as the canonical template for Phase 3. Department planning should mirror those patterns closely: dedicated nested routes, enterprise table browsing, detail-summary layout, and a shared destructive flow reused by both list and detail surfaces.

**Primary recommendation:** Plan Phase 3 as five execute plans across three waves: first strengthen the department data boundary and mutation layer, then ship nested list/create-edit/detail screens in parallel, then finish with a shared guarded delete flow.

## Current Reusable Assets

### Shared foundations already in place

- `D:\DTH\sandulieu\features\directory\shared\directory-list-state.ts` provides normalized URL parsing/serialization for search, status, page, and sort state.
- `D:\DTH\sandulieu\features\directory\shared\directory-table-state.ts` converts normalized list state into controlled TanStack-table-style pagination/sorting state.
- `D:\DTH\sandulieu\features\directory\shared\directory-query-keys.ts` already enforces backend-shaped list/detail keys.
- `D:\DTH\sandulieu\features\directory\shared\directory-scope.ts` already normalizes stable route identifiers and parent scope.
- `D:\DTH\sandulieu\shared\api\directory.contracts.ts` already defines paginated list contracts and parent scope objects.
- `D:\DTH\sandulieu\shared\model\directory-status.model.ts` already standardizes `active | inactive | archived`.

### Department feature assets already reusable

- `D:\DTH\sandulieu\shared\api\department.api.ts`
  - already supports organization-scoped list + detail retrieval
  - already supports search by code/name
  - already supports status filtering
  - already supports sorting and paginated envelopes
- `D:\DTH\sandulieu\features\departments\department.service.ts`
  - already maps raw API responses into `DepartmentModel`
- `D:\DTH\sandulieu\features\departments\department.query-options.ts`
  - already provides organization-qualified list/detail query options and stable query keys
- `D:\DTH\sandulieu\features\departments\department.query-hooks.ts`
  - already exposes list/detail read hooks
- `D:\DTH\sandulieu\features\departments\department.form.ts`
  - already provides schema/defaults for future reusable form behavior

### Organization slice patterns to copy

- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\new\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\edit\page.tsx`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationDeleteDialog.tsx`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationDepartmentSummary.tsx`

### Downstream member assets already reusable

- `D:\DTH\sandulieu\shared\api\member.api.ts`
  - already stores member records keyed by `organizationId` and `departmentId`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\departments\[departmentId]\members\page.tsx`
  - already proves the nested members route target that Phase 3 detail/delete flows should link into

## Current State vs DEPT-01..DEPT-11

| Requirement                                                | Current Status | Notes                                                                                               |
| ---------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| DEPT-01 paginated department table in organization context | Partial        | Data contract exists, but UI is still proof-level.                                                  |
| DEPT-02 search by name/code                                | Partial        | Query contract supports it; production controls are not complete.                                   |
| DEPT-03 status + organization-scoped filtering             | Partial        | Organization scope exists via route; status filtering exists in contract; production UX incomplete. |
| DEPT-04 sorting                                            | Partial        | Contract supports it; enterprise table UX incomplete.                                               |
| DEPT-05 create with validation                             | Missing        | Form schema exists; no dedicated nested create route or persistence path.                           |
| DEPT-06 detail page with parent org + member summary       | Missing        | No real department detail route yet.                                                                |
| DEPT-07 edit and persist updates                           | Missing        | No nested edit route or mutation support.                                                           |
| DEPT-08 guarded soft-delete                                | Missing        | No delete contract, no mutation, no shared dialog.                                                  |
| DEPT-09 explain blocked delete because of child members    | Missing        | Member data can support it, but no dependency guard flow exists.                                    |
| DEPT-10 stable code separate from display name             | Present        | `id`, `organizationId`, `code`, `name` are already distinct in current contracts.                   |
| DEPT-11 explicit status for badges/filters                 | Present        | Status contract already exists end to end.                                                          |

## Missing Capabilities

### Data/API layer gaps

1. No department create API.
2. No department update API.
3. No department delete/soft-delete API.
4. No structured delete-guard contract.
5. No member-summary-rich detail contract.
6. No uniqueness/conflict behavior for scoped department `id` / `code`.

### Service/query gaps

1. No department mutations in `features/departments`.
2. No invalidation strategy for create/update/delete.
3. No reusable delete-guard helper for both list and detail surfaces.
4. No richer detail mapping for parent + member summary.

### Route/UI gaps

1. `app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx` is still a proof page.
2. No `/admin/organizations/[organizationId]/departments/new`.
3. No `/admin/organizations/[organizationId]/departments/[departmentId]`.
4. No `/admin/organizations/[organizationId]/departments/[departmentId]/edit`.
5. No department list components directory.
6. No shared department delete dialog.

## Recommended Plan Split

### Plan 03-01 — Contracts and mutation foundation

Strengthen `shared/api`, `shared/model`, and `features/departments` so department CRUD, member-summary detail data, and delete-guard behavior exist behind the correct feature boundary.

### Plan 03-02 — Production list route

Replace the proof nested departments page with a production organization-scoped enterprise table using URL-owned list state and explicit parent visibility.

### Plan 03-03 — Dedicated create/edit routes

Add nested create and edit pages that reuse a feature-level department form and redirect back into the nested detail route.

### Plan 03-04 — Detail page and member summary

Add the summary-oriented department detail route with parent organization context and a clear navigation bridge into nested members.

### Plan 03-05 — Shared guarded delete UX

Reuse one strict delete dialog across list and detail surfaces, blocking deletion when members still exist in the same `organizationId + departmentId` scope.

## Validation Strategy

1. Run focused `pnpm exec eslint ...` commands for touched files per plan.
2. Run `pnpm build` after each plan or at minimum after each wave.
3. Manually inspect:
   - `/admin/organizations/<organizationId>/departments`
   - `/admin/organizations/<organizationId>/departments/new`
   - `/admin/organizations/<organizationId>/departments/<departmentId>`
   - `/admin/organizations/<organizationId>/departments/<departmentId>/edit`
   - blocked delete routes to `/admin/organizations/<organizationId>/departments/<departmentId>/members`
4. Explicitly verify:
   - parent organization visibility is never lost
   - URL-owned list state still drives search/filter/sort/pagination
   - detail page shows parent context and member summary
   - delete guard is based on real member records under `organizationId + departmentId`
   - query identity remains parent-qualified

---

_Research completed: 2026-04-10_
