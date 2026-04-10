# Phase 3 Validation: Department Management in Organization Scope

**Phase:** 03-department-management-in-organization-scope  
**Updated:** 2026-04-10  
**Purpose:** Define the executable validation gate for Phase 3 planning and execution review.

## Validation Gate

This repo still has no configured test runner, so Phase 3 validation is a combination of:

1. File-level ESLint commands per plan
2. `pnpm build` for integration validation
3. Focused manual review of nested route identity, parent visibility, URL-owned list state, and guarded delete behavior

## Requirement Coverage Matrix

| Requirement | Planned In                 | Validation Signal                               | Pass Condition                                                                         |
| ----------- | -------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| DEPT-01     | 03-02                      | ESLint + build + manual route review            | Departments list renders as a paginated organization-scoped table.                     |
| DEPT-02     | 03-02                      | ESLint + build + manual route review            | Search by code/name is driven by URL-owned list state.                                 |
| DEPT-03     | 03-02                      | ESLint + build + manual route review            | Parent organization visibility remains explicit while status filtering works.          |
| DEPT-04     | 03-02                      | ESLint + build + manual route review            | Sorting flows through shared directory state and scoped query params.                  |
| DEPT-05     | 03-01, 03-03               | ESLint + build + manual route review            | Nested create route uses shared form helpers and create mutation successfully.         |
| DEPT-06     | 03-01, 03-04               | ESLint + build + manual detail review           | Detail page shows department summary, parent organization context, and member summary. |
| DEPT-07     | 03-01, 03-03               | ESLint + build + manual route review            | Nested edit route hydrates existing data and persists updates through feature hooks.   |
| DEPT-08     | 03-01, 03-05               | ESLint + build + manual destructive-flow review | Department delete is only available through the guarded shared dialog.                 |
| DEPT-09     | 03-01, 03-05               | ESLint + build + manual destructive-flow review | Blocked delete clearly explains dependent members and routes user to nested members.   |
| DEPT-10     | 03-01, 03-03               | ESLint + manual contract review                 | Stable id remains distinct from business code and display name.                        |
| DEPT-11     | 03-01, 03-02, 03-03, 03-04 | ESLint + build + manual review                  | Explicit status appears in filters, badges, form flow, and detail summary.             |

## Required Automated Commands

Run these during execution review:

```bash
pnpm exec eslint shared/api/department.api.ts shared/model/department.model.ts features/departments/department.types.ts features/departments/department.service.ts features/departments/department.query-options.ts features/departments/department.query-hooks.ts features/departments/department.form.ts features/departments/index.ts
pnpm exec eslint features/departments/components/DepartmentListFilters.tsx features/departments/components/DepartmentStatusBadge.tsx features/departments/components/DepartmentListTable.tsx features/departments/components/DepartmentRowActions.tsx features/departments/components/DepartmentForm.tsx features/departments/components/DepartmentDetailSummary.tsx features/departments/components/DepartmentMemberSummary.tsx features/departments/components/DepartmentDeleteDialog.tsx
pnpm exec eslint "app/(admin-portal)/admin/organizations/[organizationId]/departments/page.tsx" "app/(admin-portal)/admin/organizations/[organizationId]/departments/new/page.tsx" "app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/page.tsx" "app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/edit/page.tsx"
pnpm build
```

## Manual Review Focus

Reviewers must explicitly inspect these load-bearing behaviors:

- Route identity always remains `organizationId + departmentId`; no mutable code/name is used for cache or route identity.
- URL-owned list state continues to drive search, status filter, sort, and pagination on the nested departments list.
- Parent organization visibility is preserved on list, create, edit, detail, and blocked-delete paths.
- Department detail shows related member summary sourced through the department feature boundary, not raw page-level API calls.
- Delete guard blocks when dependent members exist and routes the user to `/admin/organizations/[organizationId]/departments/[departmentId]/members`.

## Exit Criteria

Phase 3 passes validation when:

- All listed ESLint commands pass.
- `pnpm build` passes.
- Nested list/detail/create/edit/delete flows satisfy the manual review focus above.
- No plan leaves parent-qualified identity, nested route continuity, or delete-guard behavior ambiguous.
