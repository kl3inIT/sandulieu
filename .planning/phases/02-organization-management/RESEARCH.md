# Phase 2: Organization Management - Research

**Researched:** 2026-04-10  
**Domain:** Organization CRUD vertical slice in Next.js App Router admin surface  
**Confidence:** HIGH

## User Constraints

### Locked Decisions

- Default list uses an enterprise table, not cards.
- Primary scan columns are organization code and organization name.
- Status must be visible and filterable.
- Include created/updated metadata if the contract supports it cleanly.
- Row actions must include view detail, edit, delete.
- Create/edit use dedicated routes: `/admin/organizations/new` and `/admin/organizations/[organizationId]/edit`.
- List page is for browsing and row actions, not hosting the full form inline.
- Detail page is summary-oriented, includes department context, and exposes back/edit/delete actions.
- Delete is guarded soft-delete.
- Delete must be blocked when child departments exist.
- Blocking messaging must explain both the reason and next step.
- UI copy remains Vietnamese with diacritics.

### Claude's Discretion

- Exact table column order beyond locked priorities.
- Exact visual composition within existing shadcn/Tailwind admin patterns.
- Exact department summary presentation.
- Exact helper/error wording as long as the behavior is explicit.

### Deferred Ideas

- No force delete.
- No archive-only replacement for delete.
- No dashboard-heavy analytics detail page.

## Project Constraints (from CLAUDE.md)

- Preserve the repo layering: `shared/api -> feature service -> query options/hooks -> feature UI -> app route orchestration`.
- Use Next.js 16.2.2 + React 19 conventions.
- Do not add extra design work.
- Prefer shadcn-based composition; do not modify `shared/components/ui` base components.
- Keep user-facing copy in Vietnamese with diacritics.
- No test runner is currently configured; planning should not assume Jest/Vitest/Playwright exists.

## Summary

Phase 1 already established the important foundations for Phase 2: URL-owned list state, backend-shaped paginated contracts, stable organization identity, shared query-key helpers, and a reusable TanStack Form proof for organizations. The main gap is not foundations; it is that the current organization surface is still a proof page composed of cards plus an embedded form, while Phase 2 requires a complete module with enterprise table browsing, dedicated create/edit/detail routes, and guarded delete behavior.

The best Phase 2 architecture is to keep the current feature split and promote organizations from “proof-only” to “full CRUD slice.” That means extending the organization API/service/hook layer with create, update, delete, and dependency-check behavior; moving page responsibilities into dedicated admin routes; and introducing organization-specific feature components for table, detail summary, and delete confirmation. Department data already exists and is already parent-scoped, so it should be reused as the dependency source for delete guards and detail-page department context.

**Primary recommendation:** Plan Phase 2 as one coherent organization module upgrade, not as isolated page work: first enrich contracts and service behavior, then build list/detail/create/edit/delete route orchestration on top of those contracts.

## Current Reusable Assets

### Shared foundations already in place

- `D:\DTH\sandulieu\features\directory\shared\directory-list-state.ts` provides normalized URL parsing/serialization for search, status, page, and sort state.
- `D:\DTH\sandulieu\features\directory\shared\directory-table-state.ts` already converts normalized list state into controlled TanStack-table-style pagination/sorting state.
- `D:\DTH\sandulieu\features\directory\shared\directory-query-keys.ts` already enforces backend-shaped list/detail keys.
- `D:\DTH\sandulieu\features\directory\shared\directory-scope.ts` already normalizes stable route identifiers and parent scope.
- `D:\DTH\sandulieu\shared\api\directory.contracts.ts` already defines paginated list contracts and parent scope objects.
- `D:\DTH\sandulieu\shared\model\directory-status.model.ts` already standardizes `active | inactive | archived`.

### Organization feature assets already reusable

- `D:\DTH\sandulieu\shared\api\organization.api.ts`
  - already supports list + detail retrieval
  - already supports search by code/name
  - already supports status filtering
  - already supports sorting
  - already returns paginated envelopes
- `D:\DTH\sandulieu\features\organizations\organization.service.ts`
  - already maps raw API responses into `OrganizationModel`
- `D:\DTH\sandulieu\features\organizations\organization.query-options.ts`
  - already provides list/detail query options and stable query keys
- `D:\DTH\sandulieu\features\organizations\organization.query-hooks.ts`
  - already exposes list/detail hooks
- `D:\DTH\sandulieu\features\organizations\organization.form.ts`
  - already provides Zod schema, defaults, and TanStack Form options
- `D:\DTH\sandulieu\features\organizations\components\OrganizationForm.tsx`
  - already provides a reusable create/update form shell

### Downstream organization-context assets already reusable

- `D:\DTH\sandulieu\shared\api\department.api.ts`
  - already stores department records keyed by `organizationId`
- `D:\DTH\sandulieu\features\departments\department.query-options.ts`
  - already enforces organization-qualified list/detail keys
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\departments\page.tsx`
  - already demonstrates organization-scoped downstream navigation
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\departments\[departmentId]\members\page.tsx`
  - already proves nested scope continuation

## Current State vs ORG-01..ORG-11

| Requirement                                            | Current Status | Notes                                                                              |
| ------------------------------------------------------ | -------------- | ---------------------------------------------------------------------------------- |
| ORG-01 paginated organization table                    | Partial        | Pagination contract exists, but UI is card list, not enterprise table.             |
| ORG-02 search by name/code                             | Partial        | Data contract supports it; no production table controls yet.                       |
| ORG-03 status filter                                   | Partial        | Data contract supports it; no production filter UI yet.                            |
| ORG-04 sorting                                         | Partial        | Contract supports it; no production sortable table UI yet.                         |
| ORG-05 create with validation                          | Partial        | Form proof exists; no dedicated route or persistence path.                         |
| ORG-06 detail page with summary + department context   | Missing        | No organization detail route/page yet.                                             |
| ORG-07 edit and persist updates                        | Missing        | Form can support update mode, but no edit route or update API/service/hook exists. |
| ORG-08 guarded soft-delete                             | Missing        | No delete contract, no mutation, no confirmation flow.                             |
| ORG-09 explain blocked delete because of child records | Missing        | Department data can support the check, but no dependency guard flow exists.        |
| ORG-10 stable code/slug separate from display name     | Present        | `id`, `code`, `name` are already separate in model/form/API.                       |
| ORG-11 explicit status for badges/filters              | Present        | Status contract already exists end to end.                                         |

## Missing Capabilities

### Data/API layer gaps

1. No organization create API.
2. No organization update API.
3. No organization delete/soft-delete API.
4. No organization detail payload enriched with descriptive fields, timestamps, or dependency summary.
5. No delete precondition/dependency result contract.
6. No uniqueness/conflict behavior for `id` or `code`.
7. No created/updated fields in `OrganizationApiResponse`, despite Phase 2 wanting metadata if supported cleanly.

### Service/query gaps

1. No mutations in `features/organizations`.
2. No invalidation strategy for create/update/delete.
3. No reusable detail query shape that includes department summary.
4. No delete guard helper returning dependency messaging payload.

### Route/UI gaps

1. `app/(admin-portal)/admin/organizations/page.tsx` is still a proof page.
2. No `/admin/organizations/new`.
3. No `/admin/organizations/[organizationId]`.
4. No `/admin/organizations/[organizationId]/edit`.
5. No list table component.
6. No row action menu/action group.
7. No delete confirmation dialog/alert-dialog.
8. No empty state, no filter controls, no pagination controls, no detail-page summary layout.

## Recommended Architecture Boundaries

### 1. List page

**Route:** `/admin/organizations`  
**Responsibilities:**

- own URL state consumption
- call list query hook
- orchestrate filters, table state, pagination, row actions
- navigate to detail/create/edit/delete flows

**Should not:**

- contain form business logic
- call raw API directly
- own mutation implementation details

**Recommended feature components:**

- `OrganizationListTable`
- `OrganizationStatusBadge`
- `OrganizationRowActions`
- optional `OrganizationListFilters`

### 2. Detail page

**Route:** `/admin/organizations/[organizationId]`  
**Responsibilities:**

- fetch organization detail by stable id
- render summary fields
- render department context summary
- expose visible actions: back, edit, delete
- deep-link to `/admin/organizations/[organizationId]/departments`

**Recommended detail payload shape:**

- base organization fields
- optional descriptive metadata
- timestamps if added
- department summary: count + preview or count + CTA

### 3. Create page

**Route:** `/admin/organizations/new`  
**Responsibilities:**

- host `OrganizationForm` in create mode
- call create mutation
- handle submit success/failure feedback
- redirect to detail or list after success

### 4. Edit page

**Route:** `/admin/organizations/[organizationId]/edit`  
**Responsibilities:**

- fetch existing organization detail
- hydrate `OrganizationForm`
- lock route identity to `organizationId`
- call update mutation
- redirect back to detail on success

### 5. Delete behavior

**Recommended boundary:**

- UI confirmation component in `features/organizations/components`
- delete guard logic in service/API layer
- mutation + invalidation in query-hooks/query-options layer
- route/page only opens dialog and handles success navigation

This keeps destructive behavior consistent with the repo’s layering and makes later department/member delete flows parallel.

## Delete Guard Strategy

### Recommended contract behavior

For organization deletion, return a structured guard result before destructive completion:

- `allowed: true` when no child departments exist
- `allowed: false` with dependency summary when departments still exist

### Recommended dependency source

Use department records from `shared/api/department.api.ts` as the source of truth for Phase 2 mock guard logic. This is better than duplicating dependency state inside organizations because Phase 3 will build directly on department ownership.

### Recommended UX flow

1. User clicks delete from list row or detail page.
2. Alert dialog opens with strict destructive framing.
3. System checks organization dependency state.
4. If no departments:
   - show irreversible soft-delete confirmation copy
   - confirm delete
   - invalidate organization list/detail queries
   - navigate back to list if deleting from detail
5. If departments exist:
   - block the destructive action
   - show count and direction to next step
   - provide CTA to manage departments

### Recommended blocked messaging shape

Message should clearly include:

- why blocked: organization still has child departments
- what to do next: remove or reassign departments first
- where to go: link to `/admin/organizations/[organizationId]/departments`

A good planning rule is: the blocked state should not reuse the same generic confirm body as a valid delete. It should render as a different dependency-warning state.

### Suggested guard payload

```ts
type OrganizationDeleteGuard = {
  allowed: boolean;
  dependentDepartmentCount: number;
  dependentDepartmentNames?: string[];
  messageKey: "hasDependentDepartments" | "deletable";
};
```

## Likely File Touch Set

### High-probability existing-file changes

- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\page.tsx`
- `D:\DTH\sandulieu\shared\api\organization.api.ts`
- `D:\DTH\sandulieu\shared\model\organization.model.ts`
- `D:\DTH\sandulieu\features\organizations\organization.service.ts`
- `D:\DTH\sandulieu\features\organizations\organization.query-options.ts`
- `D:\DTH\sandulieu\features\organizations\organization.query-hooks.ts`
- `D:\DTH\sandulieu\features\organizations\organization.form.ts`
- `D:\DTH\sandulieu\features\organizations\index.ts`

### Likely new route files

- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\new\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\edit\page.tsx`

### Likely new feature components

- `D:\DTH\sandulieu\features\organizations\components\OrganizationListTable.tsx`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationRowActions.tsx`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationDeleteDialog.tsx`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationDetailSummary.tsx`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationDepartmentSummary.tsx`
- possibly `OrganizationStatusBadge.tsx`

### Possible downstream touch

- `D:\DTH\sandulieu\shared\api\department.api.ts`
  - if dependency summary helpers are added here or if organization detail wants department count sourced centrally

## Sequencing Risks

### 1. Turning the proof page directly into the final page without extracting components

Risk: route file becomes a monolith and collapses the repo’s intended layering.

### 2. Adding create/edit routes before mutation contracts exist

Risk: pages become UI shells with mock-local submit behavior and have to be rewritten.

### 3. Implementing delete as UI-only state

Risk: guard logic drifts from the data layer and becomes hard to reuse in Phase 3 department delete.

### 4. Using department list page as the only “detail context”

Risk: ORG-06 remains effectively unfulfilled because detail becomes an indirect navigation pattern instead of a real organization summary screen.

### 5. Overloading `OrganizationForm` with route/data-fetch logic

Risk: reusable form becomes page-coupled and harder to reuse across create and edit.

### 6. Adding metadata columns before metadata exists in contracts

Risk: planners may promise created/updated columns that the model cannot yet cleanly support.

## Concrete Planning Recommendations

### Recommended implementation order

1. **Expand organization contracts first**
   - add descriptive fields only if needed
   - add timestamps if Phase 2 wants metadata
   - add create/update/delete/guard API contracts

2. **Add service and hook mutations**
   - create
   - update
   - delete with guard result
   - query invalidation rules for list/detail

3. **Extract organization UI components**
   - table
   - row actions
   - delete dialog
   - detail summary blocks

4. **Replace proof list page with production list page**
   - enterprise table
   - search/status/sort/pagination controls
   - quick actions

5. **Add dedicated create and edit routes**
   - reuse `OrganizationForm`
   - no inline production form on list page

6. **Add organization detail route**
   - summary fields
   - department context
   - back/edit/delete actions

7. **Wire blocked-delete messaging to department surface**
   - show count
   - link to departments page
   - ensure detail and list both use the same delete path

### Recommended planning split

- Plan A: organization contracts, mock persistence semantics, mutations, delete-guard contract
- Plan B: organization list page productionization with enterprise table and row actions
- Plan C: dedicated create/edit routes using shared form
- Plan D: detail page with department context and strict delete dialog

This split keeps contract work ahead of route work and reduces rework.

## What the Planner Should Assume

- Stable route identity remains `organizationId`, not `code`.
- `code` remains a business field visible in list/detail/form.
- Organization detail should become the canonical landing page after create/edit success.
- Delete guard logic should be reusable later for departments, so the planner should avoid a one-off organization-only implementation.
- Phase 2 can satisfy department context on the organization detail page without implementing full department CRUD changes yet, because department list data already exists.

## Open Questions (RESOLVED)

1. **Descriptive organization fields**: Phase 2 detail should remain centered on the current core fields plus metadata that the mock contract can support cleanly. Do not invent `description`, `address`, or contact fields unless they are added deliberately in the contract work of Plan 02-01 and remain tightly tied to the organization summary scope.
2. **Blocked delete messaging depth**: The blocked delete state should always show the dependent department count and may include a short preview list of department names when the guard contract can provide it cleanly without expanding scope.
3. **Create success redirect**: Successful create should redirect to the organization detail route so detail becomes the canonical landing page for the newly created record.
4. **Archived editability**: Archived organizations remain editable in Phase 2 unless a later requirement explicitly restricts that behavior. Phase 2 should not introduce extra status-based editing rules beyond the requested CRUD scope.

These decisions are now resolved for planning and execution.

## Relevant Files Read

- `D:\DTH\sandulieu\.planning\ROADMAP.md`
- `D:\DTH\sandulieu\.planning\REQUIREMENTS.md`
- `D:\DTH\sandulieu\.planning\PROJECT.md`
- `D:\DTH\sandulieu\.planning\STATE.md`
- `D:\DTH\sandulieu\.planning\phases\02-organization-management\02-CONTEXT.md`
- `D:\DTH\sandulieu\.planning\phases\01-directory-foundations-contracts\RESEARCH.md`
- `D:\DTH\sandulieu\CLAUDE.md`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\departments\page.tsx`
- `D:\DTH\sandulieu\app\(admin-portal)\admin\organizations\[organizationId]\departments\[departmentId]\members\page.tsx`
- `D:\DTH\sandulieu\features\organizations\organization.service.ts`
- `D:\DTH\sandulieu\features\organizations\organization.query-options.ts`
- `D:\DTH\sandulieu\features\organizations\organization.query-hooks.ts`
- `D:\DTH\sandulieu\features\organizations\organization.form.ts`
- `D:\DTH\sandulieu\features\organizations\components\OrganizationForm.tsx`
- `D:\DTH\sandulieu\features\directory\shared\directory-list-state.ts`
- `D:\DTH\sandulieu\features\directory\shared\directory-table-state.ts`
- `D:\DTH\sandulieu\features\directory\shared\directory-query-keys.ts`
- `D:\DTH\sandulieu\features\directory\shared\directory-scope.ts`
- `D:\DTH\sandulieu\shared\api\organization.api.ts`
- `D:\DTH\sandulieu\shared\api\department.api.ts`
- `D:\DTH\sandulieu\shared\api\directory.contracts.ts`
- `D:\DTH\sandulieu\shared\model\organization.model.ts`
- `D:\DTH\sandulieu\shared\model\department.model.ts`

## RESEARCH COMPLETE
