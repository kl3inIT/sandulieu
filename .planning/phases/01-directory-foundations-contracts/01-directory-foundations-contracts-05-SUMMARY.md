---
phase: 01-directory-foundations-contracts
plan: 05
subsystem: ui
tags: [tanstack-form, tanstack-query, nextjs, app-router, zod]
requires:
  - phase: 01-directory-foundations-contracts
    provides: directory list-state, scope helpers, and parent-qualified query hooks
provides:
  - TanStack Form-ready contracts for organizations, departments, and members
  - Minimal organization form proof using shared form helper wiring
  - Thin admin proof routes consuming normalized URL state and scoped directory queries
affects: [directory-foundations, admin-portal, organizations, departments, members]
tech-stack:
  added: []
  patterns: [shared form contract helpers, URL-owned list state normalization, parent-qualified scope normalization]
key-files:
  created:
    - features/organizations/organization.form.ts
    - features/organizations/components/OrganizationForm.tsx
    - features/departments/department.form.ts
    - features/members/member.form.ts
    - app/(admin-portal)/admin/organizations/page.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx
  modified: []
key-decisions:
  - "Kept proof routes intentionally thin and client-driven so they can consume existing query hooks without adding later-phase CRUD UI."
  - "Wrapped useSearchParams-driven route proofs in Suspense boundaries to satisfy Next.js 16 prerender requirements while preserving URL normalization in the page layer."
patterns-established:
  - "Form contract pattern: each entity exports schema, defaults, and create<Form>Options helper for useForm reuse."
  - "Route proof pattern: normalize search params with shared list-state helpers and normalize route params with scope helpers before querying."
requirements-completed: [UX-02, UX-06, UX-07, ARCH-05]
duration: 34min
completed: 2026-04-08
---

# Phase 01 Plan 05: Directory Foundations Contracts Summary

**Directory form contracts with a real Organization TanStack Form proof and admin route proofs that normalize URL state and parent scope before querying**

## Performance

- **Duration:** 34 min
- **Started:** 2026-04-08T12:37:11Z
- **Completed:** 2026-04-08T13:11:11Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Added shared Zod-backed TanStack Form contracts for organizations, departments, and members with typed defaults and parsed submit payloads.
- Proved the form contract pattern works in real code through `OrganizationForm.tsx` using `useForm` and the exported helper.
- Added three thin admin route proofs that normalize URL-owned list state and explicit parent scope before calling directory query hooks.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create TanStack Form-ready entity contracts and one proof consumer** - `b69a740` (feat)
2. **Task 2: Add thin route proof pages that normalize URL and route state before querying** - `3e88d88` (feat)

## Files Created/Modified
- `features/organizations/organization.form.ts` - Shared organization schema, defaults, and TanStack Form-ready helper.
- `features/organizations/components/OrganizationForm.tsx` - Minimal proof consumer using `useForm` with the shared organization helper.
- `features/departments/department.form.ts` - Shared department form contract with explicit parent organization id handling.
- `features/members/member.form.ts` - Shared member form contract with explicit organization and department references.
- `app/(admin-portal)/admin/organizations/page.tsx` - Proof page normalizing search params before organization list querying.
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx` - Proof page normalizing organization route scope and search params before department querying.
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx` - Proof page normalizing department scope and search params before member querying.

## Decisions Made
- Used entity-local form contract modules instead of page-local validation wiring so later CRUD screens can reuse one submit and validation shape.
- Kept route params on stable opaque ids and rendered business codes as separate fields, matching the plan's route identity constraint.
- Used Suspense wrappers around `useSearchParams` proof pages to comply with Next.js 16 prerender behavior without changing the intended data path.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed worktree dependencies for verification**
- **Found during:** Task 1
- **Issue:** `pnpm exec eslint` could not run because the worktree had no installed executables yet.
- **Fix:** Ran `pnpm install` in the worktree before rerunning lint and build verification.
- **Files modified:** None committed
- **Verification:** `pnpm exec eslint` and `pnpm build` both ran successfully afterward.
- **Committed in:** b69a740 (part of task verification flow)

**2. [Rule 3 - Blocking] Simplified helper typing for TanStack Form options**
- **Found during:** Task 1
- **Issue:** Explicit `FormOptions` generic annotation mismatched the installed TanStack Form signature and blocked type checking.
- **Fix:** Replaced the over-specified generic typing with typed helper inputs and explicit parsed payload typing on submit.
- **Files modified:** `features/organizations/organization.form.ts`, `features/departments/department.form.ts`, `features/members/member.form.ts`
- **Verification:** `pnpm build`
- **Committed in:** b69a740 (part of task commit)

**3. [Rule 3 - Blocking] Added Suspense wrappers for `useSearchParams` proof routes**
- **Found during:** Task 2
- **Issue:** Next.js 16 build failed because `useSearchParams()` on the proof pages required a Suspense boundary.
- **Fix:** Split each proof route into a Suspense-wrapped page shell plus an inner content component that performs URL normalization and querying.
- **Files modified:** `app/(admin-portal)/admin/organizations/page.tsx`, `app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx`, `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx`
- **Verification:** `pnpm build`
- **Committed in:** 3e88d88 (part of task commit)

---

**Total deviations:** 3 auto-fixed (3 blocking)
**Impact on plan:** All auto-fixes were required to complete verification and keep the planned proof path buildable on Next.js 16.

## Issues Encountered
- The worktree initially lacked installed dependencies, so lint verification could not start until packages were installed locally.
- The route proof pages needed an extra Next.js 16 Suspense shell to keep client-side URL normalization compatible with production build rules.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Later CRUD screens can now reuse shared form contracts instead of rebuilding validation and default wiring per page.
- Admin directory pages already prove the intended orchestration path for URL state, parent scope normalization, and feature query hook consumption.

## Self-Check: PASSED
- Verified required files exist.
- Verified task commits `b69a740` and `3e88d88` exist in git history.

---
*Phase: 01-directory-foundations-contracts*
*Completed: 2026-04-08*
