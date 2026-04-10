---
phase: 03-department-management-in-organization-scope
plan: 02
subsystem: ui
tags: [nextjs, react, departments, tanstack-query, url-state, enterprise-table]
requires:
  - phase: 03-01
    provides: organization-scoped nested department routing and shared directory URL state helpers
provides:
  - organization-scoped department enterprise list filters
  - department status badge and enterprise table states
  - URL-owned nested department browsing with row quick actions
affects:
  [department-detail, department-edit, department-delete, member-management]
tech-stack:
  added: []
  patterns:
    [
      organization-scoped URL state,
      feature-owned table components,
      route-injected row actions,
    ]
key-files:
  created:
    - features/departments/components/DepartmentListFilters.tsx
    - features/departments/components/DepartmentStatusBadge.tsx
    - features/departments/components/DepartmentListTable.tsx
    - features/departments/components/DepartmentRowActions.tsx
  modified:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx
key-decisions:
  - "Kept organization scope explicit in both the page summary and filter panel instead of adding a separate organization picker."
  - "Made DepartmentListTable accept renderRowActions so Task 1 stayed reusable while Task 2 injected nested route actions."
patterns-established:
  - "Organization-scoped list pages keep search, status, sort, and pagination in URL state via shared directory helpers."
  - "Feature tables own enterprise loading, empty, and error states while routes compose actions and navigation."
requirements-completed: [DEPT-01, DEPT-02, DEPT-03, DEPT-04, DEPT-11]
duration: unknown
completed: 2026-04-10
---

# Phase 03 Plan 02: Department Management in Organization Scope Summary

**Organization-scoped department browsing now uses URL-owned search, status filtering, sorting, pagination, and nested quick actions in an enterprise table layout.**

## Performance

- **Duration:** Unknown
- **Completed:** 2026-04-10
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Replaced the proof card list with reusable department list filters, status badge, and enterprise table components.
- Rebuilt the nested departments route around shared URL-state helpers for search, filter, sort, and pagination.
- Added nested row quick actions for detail and edit, with a reserved delete slot held for the shared delete flow planned in 03-05.

## Task Commits

1. **Task 1: Extract department list filters, badges, and enterprise table components** - `e4f23e1` (feat)
2. **Task 2: Replace the proof department list route with URL-driven organization-scoped browsing** - `96bcb02` (feat)

## Files Created/Modified

- `features/departments/components/DepartmentListFilters.tsx` - Filter panel with explicit organization scope, code/name search, and status controls.
- `features/departments/components/DepartmentStatusBadge.tsx` - Shared Vietnamese status badge mapping for department list rows and filter affordances.
- `features/departments/components/DepartmentListTable.tsx` - Enterprise department table with loading, empty, error, sort, and pagination states.
- `features/departments/components/DepartmentRowActions.tsx` - Nested detail/edit actions plus reserved delete slot.
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx` - Route orchestration for organization-scoped browsing and URL-owned state.

## Decisions Made

- Kept all user-facing copy in Vietnamese with diacritics to stay consistent with the repo UI language.
- Preserved repo layering by keeping route orchestration in `app/` and reusable list UI in `features/departments/components`.
- Avoided modifying base shadcn primitives and composed existing UI components instead.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Separated row action ownership from the reusable table component**

- **Found during:** Task 2
- **Issue:** Injecting `DepartmentRowActions` directly into `DepartmentListTable` would have coupled Task 1 reusable table code to Task 2 route behavior and blurred the plan's file/task boundary.
- **Fix:** Changed `DepartmentListTable` to accept `renderRowActions`, then injected nested actions from the route.
- **Files modified:** `features/departments/components/DepartmentListTable.tsx`, `app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx`
- **Verification:** Build and route rendering passed afterward.
- **Committed in:** `96bcb02`

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Improved reuse and preserved the intended route/component split without expanding scope.

## Known Stubs

- `features/departments/components/DepartmentRowActions.tsx` keeps the delete slot reserved because the shared delete flow is delivered in plan 03-05.

## Issues Encountered

- Initial worktree execution hit an agent-level failure before any code was produced; the plan was retried successfully.
- Worktree-local build verification was environment-sensitive because `next` was not always available in isolated worktrees.

## User Setup Required

None.

## Next Phase Readiness

- The organization-scoped department browse screen is ready for nested detail, edit, and delete flow follow-up work.

## Self-Check: PASSED

- Summary file created.
- Commits `e4f23e1` and `96bcb02` exist in git history.
