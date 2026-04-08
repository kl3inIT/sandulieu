---
phase: 01-directory-foundations-contracts
plan: 01
subsystem: api
tags: [nextjs, react, typescript, tanstack-query, mock-api, contracts]
requires: []
provides:
  - Shared backend-shaped directory list contracts for pagination, sorting, filtering, and parent scopes
  - Stable UI-facing models for organizations, departments, and members
  - Mock raw API modules for organizations, departments, and members with explicit nested scopes
affects: [organizations, departments, members, query-keys, admin-crud]
tech-stack:
  added: []
  patterns: [shared-api-contracts, stable-identifiers, parent-qualified-mock-apis]
key-files:
  created:
    - shared/api/directory.contracts.ts
    - shared/api/organization.api.ts
    - shared/api/department.api.ts
    - shared/api/member.api.ts
    - shared/model/directory-status.model.ts
    - shared/model/organization.model.ts
    - shared/model/department.model.ts
    - shared/model/member.model.ts
  modified: []
key-decisions:
  - "Used shared DirectoryListQuery and PaginatedResult contracts so all directory entities share one backend-shaped list protocol."
  - "Kept immutable id fields separate from business codes and display names to preserve stable route and cache identity."
  - "Required OrganizationScope and DepartmentScope in nested raw API functions so child datasets always carry explicit parent context."
patterns-established:
  - "Directory raw API files stay transport-oriented and do not map DTOs into UI models."
  - "Nested resources accept explicit scope objects rather than inferring parent context from route-local state."
requirements-completed: [ARCH-02, ARCH-03, ARCH-05]
duration: 5min
completed: 2026-04-08
---

# Phase 01 Plan 01: Directory Foundations & Contracts Summary

**Backend-shaped directory contracts with stable entity identities and parent-qualified mock APIs for organizations, departments, and members**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-08T12:11:04Z
- **Completed:** 2026-04-08T12:16:12Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Added one shared contract module for pagination, sorting, filtering, and nested parent scopes across the directory domain.
- Defined stable UI-facing status and entity model types that separate immutable ids from business codes and display names.
- Added raw mock API modules for organizations, departments, and members with paginated list responses and explicit nested scope arguments.

## Task Commits

Each task was committed atomically:

1. **Task 1: Define shared directory wire contracts and stable model identities** - `4a4a85f` (feat)
2. **Task 2: Add raw mock API files that enforce the shared contracts** - `001dcc1` (feat)

## Files Created/Modified
- `shared/api/directory.contracts.ts` - Shared list query, pagination, sorting, and parent scope contracts.
- `shared/model/directory-status.model.ts` - Shared status vocabulary for directory entities.
- `shared/model/organization.model.ts` - Stable organization model with immutable id and separate business code.
- `shared/model/department.model.ts` - Stable department model with parent organization reference.
- `shared/model/member.model.ts` - Stable member model with explicit organization and department references.
- `shared/api/organization.api.ts` - Raw organization mock API with paginated list and detail access.
- `shared/api/department.api.ts` - Raw department mock API with organization-qualified list and detail access.
- `shared/api/member.api.ts` - Raw member mock API with department-qualified list and detail access.

## Decisions Made
- Used `statuses` in the shared list contract so all entity lists can share the same filter vocabulary from the start.
- Bounded pagination at the API boundary by normalizing `pageIndex` and constraining `pageSize` to finite values.
- Kept nested detail functions parent-qualified instead of accepting child ids alone to avoid future cache and data-scope ambiguity.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed project dependencies so lint verification could run**
- **Found during:** Task 1 (Define shared directory wire contracts and stable model identities)
- **Issue:** `pnpm exec eslint` failed because the worktree had no installed dependencies and the local `eslint` executable was unavailable.
- **Fix:** Ran `pnpm install` in the worktree before rerunning the plan verification commands.
- **Files modified:** None committed
- **Verification:** `pnpm exec eslint` completed successfully for task files and final plan files
- **Committed in:** Not applicable

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The auto-fix was necessary to run required verification. No product scope changed.

## Issues Encountered
- The required initial branch-base check revealed the worktree was not based on commit `3aa4540`, so the worktree was softly reset to that base before execution and the planning files were restored from git.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- The shared API/model seam is ready for feature services, query keys, and directory list state work in later plans.
- Later phases can build query options and UI flows without redefining identity, pagination, or nested scope contracts.

## Self-Check: PASSED

---
*Phase: 01-directory-foundations-contracts*
*Completed: 2026-04-08*
