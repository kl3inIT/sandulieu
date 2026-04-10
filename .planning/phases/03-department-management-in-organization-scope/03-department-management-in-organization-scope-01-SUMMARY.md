---
phase: 03-department-management-in-organization-scope
plan: 01
subsystem: api
tags: [departments, react-query, zod, mock-api, nested-crud]
requires:
  - phase: 01-directory-foundations-contracts
    provides: parent-qualified query keys, feature layering, TanStack form foundations
  - phase: 02-organization-management
    provides: organization CRUD baseline and nested organization routes
provides:
  - production-shaped department CRUD mock contracts with enriched detail payloads
  - organization-qualified department mutation hooks and delete-guard queries
  - reusable department form hydration helpers for nested create and edit routes
affects:
  [phase-03-routes, department-detail, department-list, delete-confirmation]
tech-stack:
  added: []
  patterns:
    [
      organization-qualified query invalidation,
      soft-delete guard contracts,
      reusable nested form hydration,
    ]
key-files:
  created: []
  modified:
    - shared/api/department.api.ts
    - shared/model/department.model.ts
    - features/departments/department.types.ts
    - features/departments/department.service.ts
    - features/departments/department.query-options.ts
    - features/departments/department.query-hooks.ts
    - features/departments/department.form.ts
    - features/departments/index.ts
key-decisions:
  - "Department detail responses now carry parent organization context and member summary so Phase 3 routes do not need ad-hoc joins."
  - "Department cache invalidation stays organization-qualified to avoid cross-organization collisions in nested admin routes."
  - "Delete guard semantics use member data under organizationId plus departmentId scope and soft-delete departments instead of hard deletion."
patterns-established:
  - "Department API mirrors organization CRUD shape with create/update/delete guard endpoints and soft-delete timestamps."
  - "Department feature exports route-safe mutations and reusable delete-guard query helpers from the feature boundary."
requirements-completed:
  [DEPT-05, DEPT-06, DEPT-07, DEPT-08, DEPT-09, DEPT-10, DEPT-11]
duration: 26min
completed: 2026-04-10
---

# Phase 03 Plan 01: Department Management in Organization Scope Summary

**Department CRUD contracts now expose enriched parent-aware detail, guarded soft-delete semantics, and organization-scoped mutation hooks for nested admin routes.**

## Performance

- **Duration:** 26 min
- **Started:** 2026-04-10T08:26:25Z
- **Completed:** 2026-04-10T08:41:56Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Expanded the department mock API into a backend-shaped CRUD boundary with create, update, delete guard, and soft-delete flows.
- Added service and React Query mutation surfaces that preserve organization-qualified cache identity and invalidation.
- Refined reusable department form helpers so later nested create and edit routes can share one contract safely.

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand department contracts for production CRUD and scoped guard semantics** - `b13e97a` (feat)
2. **Task 2: Add department service/query mutation surface with organization-qualified invalidation** - `f5dfef8` (feat)
3. **Task 3: Align the reusable department form contract with dedicated create/edit routes** - `aa2bc8f` (feat)

**Additional verification fix:** `50c3ab7` (fix)

## Files Created/Modified

- `shared/api/department.api.ts` - Adds department CRUD, enriched detail payloads, member-based delete guard, and soft-delete behavior.
- `shared/model/department.model.ts` - Extends the app model with parent context and member summary fields.
- `features/departments/department.types.ts` - Defines mutation, delete-guard, and response contracts for the feature boundary.
- `features/departments/department.service.ts` - Maps enriched API responses and exposes create/update/delete/guard services.
- `features/departments/department.query-options.ts` - Adds organization-qualified list/detail/delete-guard query keys and options.
- `features/departments/department.query-hooks.ts` - Adds list/detail/guard plus create/update/delete hooks with targeted invalidation.
- `features/departments/department.form.ts` - Adds create/update form hydration helpers for nested routes.
- `features/departments/index.ts` - Re-exports form helpers with the department feature surface.

## Decisions Made

- Kept stable department identity on `organizationId + id` while leaving `code` and `name` editable business fields.
- Reused member mock data as the only dependency source for delete blocking and member summary to avoid duplicating child state.
- Kept delete behavior as soft-delete so removed departments disappear from subsequent scoped reads without force-delete semantics.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Restored CLI tool resolution for verification commands**

- **Found during:** Task 1 verification
- **Issue:** Worktree-local `pnpm exec eslint` and pre-commit hook commands could not resolve installed binaries even though dependencies existed in the repository root.
- **Fix:** Ran verification and commit hooks with the repository root `node_modules/.bin` on `PATH` so hooks still executed normally.
- **Files modified:** None
- **Verification:** ESLint and git hooks both executed successfully afterward.
- **Committed in:** Not applicable

**2. [Rule 1 - Bug] Fixed typed parent organization lookup for build-time type checking**

- **Found during:** Final verification
- **Issue:** `ORGANIZATION_DIRECTORY[organizationId]` failed TypeScript checking because the lookup object was inferred with literal keys only.
- **Fix:** Introduced a typed `Record<string, OrganizationDirectoryEntry>` for dynamic parent-context lookups.
- **Files modified:** `shared/api/department.api.ts`
- **Verification:** `pnpm build` passed.
- **Committed in:** `50c3ab7`

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes were required for successful verification and did not expand scope beyond the department foundation.

## Issues Encountered

- Husky warned that the repository's pre-commit bootstrap is deprecated, but hooks still ran and the commits completed successfully.
- Next.js build reported a workspace-root warning because the worktree contains an additional lockfile; this did not block compilation or type checking.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Department routes can now build on a complete feature boundary for create, edit, detail, and guarded delete flows.
- The next department UI plans can consume reusable member summary and parent context directly from the feature layer.

## Self-Check: PASSED

- Verified summary file and key implementation files exist.
- Verified commits `b13e97a`, `f5dfef8`, `aa2bc8f`, and `50c3ab7` exist in git history.
