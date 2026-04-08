# Phase 1 Validation: Directory Foundations & Contracts

**Phase:** 01-directory-foundations-contracts
**Updated:** 2026-04-08
**Purpose:** Provide the explicit validation gate for Phase 1 research and plan review so execution can be checked against the documented Validation Architecture.

## Validation Gate

Phase 1 has no project test runner yet, so the executable gate is a combination of:

1. File-level ESLint commands per task
2. `pnpm build` for integration-proof tasks
3. Focused structural review of route-state, query-key, and TanStack Form wiring

This artifact closes the documented gate referenced in `RESEARCH.md` and gives a concrete review target for checks 8a-8d.

## Requirement Coverage Matrix

| Requirement | Planned In          | Validation Signal                   | Pass Condition                                                                                                  |
| ----------- | ------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| UX-02       | 01-02, 01-05        | ESLint + build + route proof review | Route proof pages normalize search params with shared list-state helpers before querying.                       |
| UX-06       | 01-05               | ESLint + build + form proof review  | Entity form modules export TanStack Form-ready helpers and `OrganizationForm.tsx` proves a real `useForm` path. |
| UX-07       | 01-02, 01-05        | ESLint + build + route proof review | Shared manual table-state helpers exist and proof pages feed normalized list state into the query/table path.   |
| ARCH-01     | 01-03, 01-04        | ESLint + file-structure review      | Organization, department, and member exist as separate feature modules following repo layering.                 |
| ARCH-02     | 01-01, 01-03, 01-04 | ESLint + import-boundary review     | Shared API files remain raw wire boundaries and services map DTOs into shared models.                           |
| ARCH-03     | 01-01, 01-02        | ESLint + contract review            | Shared list/query contracts match backend-shaped pagination, sorting, and filtering.                            |
| ARCH-04     | 01-02, 01-03, 01-04 | ESLint + query-key review           | Department/member query keys include explicit parent scope and params.                                          |
| ARCH-05     | 01-01, 01-05        | ESLint + route identity review      | Stable opaque ids remain route identity, while business codes stay separate from display fields.                |

## Check 8a-8d Mapping

| Check | What to Review                                                        | Evidence Source                                                        |
| ----- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 8a    | Shared contracts and model/API seams exist                            | `01-01-PLAN.md` outputs + ESLint pass                                  |
| 8b    | URL-owned list state and table/query-key helpers are executable       | `01-02-PLAN.md` outputs + route proof usage in Plan 05                 |
| 8c    | Feature modules preserve layering and parent-qualified query identity | `01-03-PLAN.md` and `01-04-PLAN.md` outputs + import/query-key review  |
| 8d    | TanStack Form and route proof wiring are real, not declarative only   | `01-05-PLAN.md` outputs + `pnpm build` + `OrganizationForm.tsx` review |

## Required Automated Commands

Run these during execution review:

```bash
pnpm exec eslint shared/api/directory.contracts.ts shared/model/directory-status.model.ts shared/model/organization.model.ts shared/model/department.model.ts shared/model/member.model.ts shared/api/organization.api.ts shared/api/department.api.ts shared/api/member.api.ts
pnpm exec eslint features/directory/shared/directory-list-state.ts features/directory/shared/directory-scope.ts features/directory/shared/directory-filters.ts features/directory/shared/directory-table-state.ts features/directory/shared/directory-query-keys.ts features/directory/shared/index.ts
pnpm exec eslint features/organizations/index.ts features/organizations/organization.types.ts features/organizations/organization.service.ts features/organizations/organization.query-options.ts features/organizations/organization.query-hooks.ts features/departments/index.ts features/departments/department.types.ts features/departments/department.service.ts features/departments/department.query-options.ts features/departments/department.query-hooks.ts
pnpm exec eslint features/members/index.ts features/members/member.types.ts features/members/member.service.ts features/members/member.query-options.ts features/members/member.query-hooks.ts
pnpm exec eslint features/organizations/organization.form.ts features/organizations/components/OrganizationForm.tsx features/departments/department.form.ts features/members/member.form.ts "app/(admin-portal)/admin/organizations/page.tsx" "app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx" "app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx"
pnpm build
```

## Manual Review Focus

Because no test runner exists yet, reviewers must explicitly inspect these load-bearing paths:

- Route proof pages call shared list-state parsing helpers instead of ad hoc `searchParams.get(...)` branches.
- Department and member queries cannot be called without the required parent scope.
- `OrganizationForm.tsx` consumes exported form helpers via `useForm`, proving Phase 1 has real TanStack Form behavior rather than schema-only files.
- Route params use stable opaque `id` values, not mutable display names.

## Exit Criteria

Phase 1 passes validation when:

- All required ESLint commands pass.
- `pnpm build` passes.
- The proof pages and form proof component satisfy the manual review focus above.
- No plan can be marked complete while leaving route identity, parent scope, or TanStack Form proof ambiguous.
