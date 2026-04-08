---
phase: 01-directory-foundations-contracts
plan: 02
subsystem: ui
tags:
  [
    nextjs,
    react,
    typescript,
    tanstack-query,
    tanstack-table,
    url-state,
    query-keys,
  ]
requires:
  - phase: 01-directory-foundations-contracts
    provides:
      - Shared backend-shaped directory list contracts for pagination, sorting, filtering, and parent scopes
      - Stable UI-facing models for organizations, departments, and members
provides:
  - Reusable URL-owned directory list state parsing and serialization helpers
  - Stable organization and department scope builders for nested resource context
  - Manual TanStack Table state adapters and parent-qualified directory query key helpers
affects:
  [organizations, departments, members, admin-crud, query-options, list-pages]
tech-stack:
  added: []
  patterns:
    [url-owned-list-state, parent-qualified-query-keys, manual-table-state]
key-files:
  created:
    - features/directory/shared/directory-filters.ts
    - features/directory/shared/directory-list-state.ts
    - features/directory/shared/directory-scope.ts
    - features/directory/shared/directory-table-state.ts
    - features/directory/shared/directory-query-keys.ts
    - features/directory/shared/index.ts
  modified: []
key-decisions:
  - "Normalized untrusted search params into one typed directory list state before they can drive queries or table controls."
  - "Kept directory table helpers manual-only so later screens stay aligned with backend-shaped pagination and sorting."
  - "Structured directory query keys as entity plus list/detail plus scoped payload objects so nested caches remain isolated by parent context."
patterns-established:
  - "Directory list screens should parse and serialize URL state through shared helpers instead of page-local searchParams logic."
  - "Nested directory resources should build scope objects from stable ids only before composing query keys or API params."
requirements-completed: [UX-02, UX-07, ARCH-03, ARCH-04]
duration: 13min
completed: 2026-04-08
---

# Phase 01 Plan 02: Directory Foundations & Contracts Summary

**URL-owned directory list state, stable nested scope builders, and manual table/query-key helpers for upcoming organization, department, and member CRUD screens**

## Performance

- **Duration:** 13 min
- **Started:** 2026-04-08T12:00:00Z
- **Completed:** 2026-04-08T12:13:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Added reusable parsing, normalization, and serialization helpers so directory list pages can round-trip search, statuses, pagination, and sort state through URL params.
- Added explicit organization and department scope builders that reject ambiguous whitespace and display-name style identifiers.
- Added shared manual table-state adapters and parent-qualified query-key helpers for future directory query option modules.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the shared URL-owned list-state codec and scope helpers** - `c899a83` (feat)
2. **Task 2: Build manual table-state and structured query-key helpers** - `bc89d75` (feat)

## Files Created/Modified

- `features/directory/shared/directory-filters.ts` - Centralizes URL param names plus normalization and list-query shaping helpers.
- `features/directory/shared/directory-list-state.ts` - Builds default directory list state, parses it from URL params, and serializes it back.
- `features/directory/shared/directory-scope.ts` - Creates stable organization and department scope objects from parent ids.
- `features/directory/shared/directory-table-state.ts` - Adapts normalized list state into manual TanStack Table pagination and sorting inputs.
- `features/directory/shared/directory-query-keys.ts` - Creates scoped directory list and detail query keys that include params payloads.
- `features/directory/shared/index.ts` - Exposes the shared directory helper surface for later feature modules.

## Decisions Made

- Used repeated `status` query params instead of a comma-joined filter string so parsing stays simple and order-preserving.
- Reset ownership of list filtering rules into feature-level helpers instead of Zustand to keep deep-link and refresh behavior consistent with the URL.
- Kept query key scope optional for top-level organizations but first-class in the shared payload shape so nested resource keys can never flatten accidentally.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed project dependencies so eslint verification could run**

- **Found during:** Task 1 (Build the shared URL-owned list-state codec and scope helpers)
- **Issue:** `pnpm exec eslint` failed because this worktree did not have installed dependencies and the local `eslint` binary was unavailable.
- **Fix:** Ran `pnpm install` before rerunning the task and plan verification commands.
- **Files modified:** None committed
- **Verification:** `pnpm exec eslint` completed successfully for all plan files after installation.
- **Committed in:** Not applicable

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The auto-fix was required to complete automated verification. No scope changed.

## Issues Encountered

- The required base-commit guard showed the worktree was not sitting on commit `01a2b20`, so the worktree was softly reset to that commit and tracked files were restored before plan execution continued.
- A Windows-path Python scan failed during stub checking, so the modified files were checked directly instead.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Organization, department, and member list screens can now share one URL state model instead of duplicating search-param parsing.
- Future query option modules can compose cache-safe nested list/detail keys with explicit parent scope.
- Manual table helpers are ready for backend-shaped pagination without introducing client-side sorting over partial pages.

## Self-Check: PASSED

---

_Phase: 01-directory-foundations-contracts_
_Completed: 2026-04-08_
