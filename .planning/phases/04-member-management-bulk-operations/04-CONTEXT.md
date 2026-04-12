# Phase 4: Member Management & Bulk Operations - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver full CRUD for members within the organization → department hierarchy: enterprise table list scoped by department, dedicated create/edit routes, a summary-first detail page showing parent hierarchy context, a guarded soft-delete flow, and bulk status change across selected members.

This phase does not add an org-level cross-department member view, does not enrich the member data model beyond current fields, and does not implement bulk delete or bulk reassign.

</domain>

<decisions>
## Implementation Decisions

### Member data model

- **D-01:** Keep the existing 6-field model for Phase 4: `id`, `organizationId`, `departmentId`, `memberCode`, `fullName`, `status`. No new fields (email, phone, position, hire date) in this phase.
- **D-02:** Model enrichment belongs in Phase 5 (Cross-Entity Admin UX Consistency) once the CRUD foundation is stable.

### List scope and entry point

- **D-03:** The member list is always department-scoped — entry point is `/admin/organizations/[organizationId]/departments/[departmentId]/members`. Both `organizationId` and `departmentId` are always present in scope.
- **D-04:** There is no org-level aggregate member view in Phase 4. The `organizationId` filter in `MemberFilters` supports API-level scoping but the UI entry is always dept-scoped.
- **D-05:** The existing proof page at `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx` should evolve into the enterprise table (not be replaced from scratch).

### List experience

- **D-06:** Member list uses an enterprise table (TanStack Table), not cards — consistent with org and dept lists established in prior phases.
- **D-07:** Primary scan columns: `fullName`, `memberCode`, `status` badge, and row actions (view detail, edit, delete).
- **D-08:** Filters: search by `fullName` or `memberCode`, filter by `status`. URL-owned query state via the existing `directory-list-state` helpers.
- **D-09:** Row actions expose at minimum: view detail, edit, delete (consistent with Phase 2/3 row action pattern).

### Create and edit flow

- **D-10:** Create and edit use dedicated routes: `.../members/new` and `.../members/[memberId]/edit` — consistent with org and dept route structure.
- **D-11:** The shared `MemberForm` component lives under `shared/components/members/` (mirrors `shared/components/departments/DepartmentForm.tsx` and `shared/components/organizations/OrganizationForm.tsx`).
- **D-12:** The existing `memberFormSchema` and `createMemberFormOptions` from `features/members/member.form.ts` are the form foundation — reuse them directly.
- **D-13:** `organizationId` and `departmentId` are pre-filled from route params and rendered as read-only fields, not free-text inputs.

### Member detail page

- **D-14:** Detail page is summary-first: core member fields (memberCode, fullName, status badge) with parent hierarchy context (organization name + department name shown as context, mirrors how dept detail shows org context).
- **D-15:** Members have no children — there is no "children summary" section. The detail page does not need a sub-entity bridge.
- **D-16:** Primary actions on detail page: back to list, edit, delete — consistent with org and dept detail pages.
- **D-17:** Detail page uses a co-located `_components/MemberDetailSummary.tsx` under the `[memberId]` route segment.

### Delete behavior

- **D-18:** Member delete is a guarded soft-delete (consistent with Phase 2/3). Members have no children — deletion is never structurally blocked.
- **D-19:** The delete confirmation dialog still shows the member name and requires explicit confirmation. The dialog component lives co-located under `_components/MemberDeleteDialog.tsx` at the member list route level.
- **D-20:** Mock API must add a `deleteMemberApi` function that removes (or marks deleted) the member from the in-memory array.

### Bulk operations

- **D-21:** Bulk action supported in Phase 4: **bulk status change only** (set selected members to active / inactive / archived).
- **D-22:** Bulk delete is out of scope for this phase — too destructive without a reassign safety net.
- **D-23:** Bulk reassign to another department is out of scope — adds picker UI complexity and cross-department scope changes.
- **D-24:** Bulk action UI: checkbox column in the table, a sticky action bar or toolbar that appears when rows are selected, a status picker dropdown for the bulk change.
- **D-25:** Per-operation feedback for bulk status change: show a summary toast/alert indicating how many succeeded and how many failed (MEM-12).
- **D-26:** Mock API must add a `bulkUpdateMemberStatusApi` function that accepts an array of member IDs and a target status, and returns per-item success/failure results.

### Mutation hooks

- **D-27:** Add `useCreateMemberMutation`, `useUpdateMemberMutation`, `useDeleteMemberMutation`, and `useBulkUpdateMemberStatusMutation` to `features/members/member.query-hooks.ts` — consistent with the org and dept mutation hook pattern.
- **D-28:** Cache invalidation on mutations must use the parent-qualified member list key (scoped to `organizationId` + `departmentId`) to avoid cross-department cache collisions.

### Route structure

- **D-29:** New routes to create:
  - `.../members/new/page.tsx` — create form route
  - `.../members/[memberId]/page.tsx` — member detail route
  - `.../members/[memberId]/edit/page.tsx` — edit form route
- **D-30:** Co-located `_components/` per route level (mirrors Phase 3 pattern):
  - `.../members/_components/` — `MemberListTable`, `MemberListFilters`, `MemberDeleteDialog`, `MemberRowActions`
  - `.../members/[memberId]/_components/` — `MemberDetailSummary`

### Claude's Discretion

- Exact table column ordering beyond the locked priorities above.
- Exact visual layout of the bulk action toolbar (sticky bottom bar vs. top toolbar vs. inline above table).
- Exact wording of bulk feedback copy, as long as it communicates success/failure counts in Vietnamese with diacritics.
- Exact visual styling within the repo's existing shadcn/Tailwind admin patterns.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product scope and requirements

- `.planning/ROADMAP.md` — Phase 4 goal, dependency, and success criteria for Member Management.
- `.planning/REQUIREMENTS.md` — MEM-01 through MEM-12 define the required member CRUD and bulk behaviors.
- `.planning/PROJECT.md` — project-level constraints, scope, and product direction.
- `.planning/STATE.md` — current milestone and phase progression context.

### Prior phase foundation

- `.planning/phases/01-directory-foundations-contracts/` — shared list-state, query-key, scope, and table-state helpers that Phase 4 builds on.
- `.planning/phases/02-organization-management/02-CONTEXT.md` — org CRUD decisions that establish the patterns Phase 4 must mirror (table, routes, detail, delete).
- `.planning/phases/03-department-management-in-organization-scope/` — dept CRUD implementation; the closest structural analog to member CRUD.

### Key existing files

- `features/members/member.form.ts` — existing form schema and `createMemberFormOptions` to reuse.
- `features/members/member.query-hooks.ts` — extend with mutation hooks.
- `features/members/member.query-options.ts` — extend with mutation-aware invalidation.
- `features/members/member.service.ts` — extend with create/update/delete/bulk service functions.
- `shared/api/member.api.ts` — extend with `createMemberApi`, `updateMemberApi`, `deleteMemberApi`, `bulkUpdateMemberStatusApi`.
- `shared/model/member.model.ts` — MemberModel (no changes needed).
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx` — proof page to evolve into enterprise table.
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/_components/DepartmentMemberSummary.tsx` — existing bridge into member list.

### Codebase guidance

- `CLAUDE.md` — repo-specific rules for Next.js 16, layering, shadcn usage, and Vietnamese UI copy.
- `.planning/codebase/STRUCTURE.md` — where new feature, route, and shared code should live.
- `.planning/codebase/CONVENTIONS.md` — naming, layering, UI, and workflow conventions to preserve.
- `.planning/codebase/STACK.md` — current framework and package versions.

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `features/members/member.form.ts` — `memberFormSchema`, `createMemberFormOptions`, `getMemberFormDefaults` ready to use; `organizationId` and `departmentId` fields already in schema.
- `features/members/member.query-hooks.ts` — `useMemberListQuery` and `useMemberDetailQuery` already implemented; add mutation hooks here.
- `features/members/member.query-options.ts` — `memberListQueryOptions`, `memberDetailQueryOptions`, `memberQueryKeys` already implemented; extend with mutation invalidation.
- `features/directory/shared/` — `parseDirectoryListState`, `buildDirectoryTableState`, `createDepartmentScope`, `toDirectoryListQuery` all available for the member list.
- `shared/components/directory/DirectoryStatusBadge.tsx` — reuse for member status badges.
- `shared/components/directory/SummaryField.tsx` — reuse for member detail summary rows.
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/_components/DepartmentListTable.tsx` — structural analog for `MemberListTable`.
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/_components/DepartmentDeleteDialog.tsx` — structural analog for `MemberDeleteDialog`.
- `shared/components/departments/DepartmentForm.tsx` — structural analog for `MemberForm` in `shared/components/members/`.

### Established Patterns

- Co-located `_components/` per route level: list-level components under `_components/` at the `members/` route, detail-level components under `_components/` at the `[memberId]/` route.
- Shared cross-route forms live in `shared/components/<domain>/` (e.g., `shared/components/members/MemberForm.tsx`).
- Mock API in `shared/api/<domain>.api.ts` with an in-memory array and filter/sort/paginate helpers — extend rather than replace.
- Mutation hooks invalidate using parent-qualified query keys to avoid cross-scope cache collisions.
- User-facing text in Vietnamese with diacritics.

### Integration Points

- `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx` — evolve this proof page into the enterprise table (do not create a parallel file).
- `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/_components/DepartmentMemberSummary.tsx` — already bridges dept detail → member list; no changes needed unless member count needs to reflect mock mutations.
- New routes slot under `.../departments/[departmentId]/members/` following the same segment pattern as `.../organizations/[organizationId]/departments/`.

</code_context>

<specifics>
## Specific Ideas

- The bulk status change toolbar should feel like an enterprise admin pattern — appear contextually when rows are checked, show selected count, offer status options, give clear per-item feedback summary after execution.
- The member list should feel consistent with the org and dept lists — same table density, same row action placement, same filter bar position.
- The create/edit form should pre-populate `organizationId` and `departmentId` from route params and show them as read-only so the user sees the parent context without being able to accidentally change it.

</specifics>

<deferred>
## Deferred Ideas

- **Org-level aggregate member view** — a cross-department member list at `/admin/organizations/[orgId]/members` is a new capability, not in Phase 4 scope.
- **Member model enrichment** — adding email, phone, position, hire date belongs in Phase 5.
- **Bulk delete** — too destructive without a reassign safety net; defer to a later phase with explicit reassignment flows (v2 DIR-01).
- **Bulk reassign** — requires department picker UI and cross-scope data changes; defer to v2 DIR-01.

</deferred>

---

_Phase: 04-member-management-bulk-operations_
_Context gathered: 2026-04-12_
