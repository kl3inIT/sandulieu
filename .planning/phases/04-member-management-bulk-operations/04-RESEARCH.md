# Phase 4: Member Management & Bulk Operations - Research

**Researched:** 2026-04-12
**Domain:** Enterprise member CRUD + bulk status change, built on top of Phase 3 department patterns
**Confidence:** HIGH

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Keep the existing 6-field model for Phase 4: `id`, `organizationId`, `departmentId`, `memberCode`, `fullName`, `status`. No new fields in this phase.
- **D-02:** Model enrichment (email, phone, position, hire date) belongs in Phase 5.
- **D-03:** Member list is always department-scoped — entry point is `/admin/organizations/[organizationId]/departments/[departmentId]/members`.
- **D-04:** No org-level aggregate member view in Phase 4.
- **D-05:** Evolve the existing proof page at `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx` into the enterprise table — do not replace from scratch.
- **D-06:** Member list uses an enterprise table (TanStack Table style), not cards.
- **D-07:** Primary scan columns: `fullName`, `memberCode`, `status` badge, row actions (view detail, edit, delete).
- **D-08:** Filters: search by `fullName` or `memberCode`, filter by `status`. URL-owned query state via existing `directory-list-state` helpers.
- **D-09:** Row actions: view detail, edit, delete.
- **D-10:** Create/edit use dedicated routes: `.../members/new` and `.../members/[memberId]/edit`.
- **D-11:** Shared `MemberForm` lives under `shared/components/members/` — mirrors `DepartmentForm.tsx`.
- **D-12:** Reuse existing `memberFormSchema` and `createMemberFormOptions` from `features/members/member.form.ts`.
- **D-13:** `organizationId` and `departmentId` pre-filled from route params, rendered read-only.
- **D-14:** Detail page is summary-first: core fields + parent hierarchy context (org name + dept name).
- **D-15:** Members have no children — no sub-entity bridge on detail page.
- **D-16:** Detail page primary actions: back to list, edit, delete.
- **D-17:** Detail page uses co-located `_components/MemberDetailSummary.tsx` under `[memberId]` route segment.
- **D-18:** Member delete is a guarded soft-delete. Members have no children — deletion is never structurally blocked.
- **D-19:** Delete confirmation dialog shows member name, requires explicit confirmation. Lives co-located under `_components/MemberDeleteDialog.tsx` at the member list route level.
- **D-20:** Mock API must add `deleteMemberApi` that removes/marks deleted the member from in-memory array.
- **D-21:** Bulk action supported: **bulk status change only** (set selected members to active / inactive / archived).
- **D-22:** Bulk delete is out of scope.
- **D-23:** Bulk reassign is out of scope.
- **D-24:** Bulk action UI: checkbox column in table, sticky action bar/toolbar when rows selected, status picker dropdown.
- **D-25:** Per-operation feedback: summary toast/alert indicating how many succeeded and how many failed.
- **D-26:** Mock API must add `bulkUpdateMemberStatusApi` — accepts array of member IDs + target status, returns per-item success/failure results.
- **D-27:** Add `useCreateMemberMutation`, `useUpdateMemberMutation`, `useDeleteMemberMutation`, `useBulkUpdateMemberStatusMutation` to `features/members/member.query-hooks.ts`.
- **D-28:** Cache invalidation on mutations must use parent-qualified member list key (scoped to `organizationId` + `departmentId`).
- **D-29:** New routes: `.../members/new/page.tsx`, `.../members/[memberId]/page.tsx`, `.../members/[memberId]/edit/page.tsx`.
- **D-30:** Co-located `_components/` per route level — `members/_components/` for list-level, `[memberId]/_components/` for detail-level.

### Claude's Discretion

- Exact table column ordering beyond the locked priorities.
- Exact visual layout of the bulk action toolbar (sticky bottom bar vs. top toolbar vs. inline above table).
- Exact wording of bulk feedback copy, as long as it communicates success/failure counts in Vietnamese with diacritics.
- Exact visual styling within the repo's existing shadcn/Tailwind admin patterns.

### Deferred Ideas (OUT OF SCOPE)

- Org-level aggregate member view (cross-department list at `/admin/organizations/[orgId]/members`).
- Member model enrichment (email, phone, position, hire date) — Phase 5.
- Bulk delete — too destructive without reassign safety net.
- Bulk reassign — requires department picker UI and cross-scope data changes.

</user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID     | Description                                                                                | Research Support                                                                                                                               |
| ------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| MEM-01 | User can view a paginated table of members within department and organization context      | Existing `useMemberListQuery`, `getMembersApi`, `directory-list-state` helpers all ready; proof page evolves into enterprise table             |
| MEM-02 | User can search members by key fields                                                      | `getMembersApi` already filters by `memberCode` + `fullName`; search wire is in place                                                          |
| MEM-03 | User can filter members by parent organization, parent department, and status              | `MemberFilters` type and filter logic in `getMembersApi` already handles org+dept+status; `parseDirectoryListState` handles URL state          |
| MEM-04 | User can sort members by defined table columns                                             | `applyMemberSort` with `MemberSortField` (`memberCode`, `fullName`, `status`) already in `getMembersApi`                                       |
| MEM-05 | User can create a member under a specific department with required validation              | `memberFormSchema`+`createMemberFormOptions` ready; need `createMemberApi` + `createMember` service + `useCreateMemberMutation`                |
| MEM-06 | User can view a member detail page with parent hierarchy context                           | Need `MemberDetailApiResponse` with `parentContext` (org name + dept name), `getMemberByIdApi` extended, `MemberDetailSummary` component       |
| MEM-07 | User can edit a member and persist updated values                                          | Need `updateMemberApi` + `updateMember` service + `useUpdateMemberMutation`; form reuses same `MemberForm` in update mode                      |
| MEM-08 | User can soft-delete a member through a guarded confirmation flow                          | Need `deleteMemberApi` (marks `deletedAt`); `MemberDeleteDialog` mirrors `DepartmentDeleteDialog` — no guard query needed (no children)        |
| MEM-09 | Member belongs to exactly one department and one organization through the parent hierarchy | Enforced by `organizationId`+`departmentId` being locked to route params in form; API scope validation pattern mirrors dept pattern            |
| MEM-10 | Member has an explicit status field usable in badges and filters                           | `DirectoryStatusBadge` already handles all 3 status values; `status` already in model and form schema                                          |
| MEM-11 | User can select multiple members and execute supported bulk actions                        | Need checkbox column in `MemberListTable`, row selection state, bulk toolbar, `bulkUpdateMemberStatusApi`, `useBulkUpdateMemberStatusMutation` |
| MEM-12 | Bulk actions show clear success/failure feedback per operation                             | `bulkUpdateMemberStatusApi` returns per-item results; feedback component (Alert-based) shows success/fail counts in Vietnamese                 |

</phase_requirements>

---

## Summary

Phase 4 is the deepest CRUD slice in the directory hierarchy — it mirrors Phase 3 (department management) almost exactly in structure but adds the bulk operations dimension. The codebase already has a fully working read path for members: `getMembersApi`, `getMemberByIdApi`, `useMemberListQuery`, `useMemberDetailQuery`, and the proof page at `.../members/page.tsx` that already wires up `directory-list-state` helpers, scope creation, and query execution. The mutation side (create, update, delete, bulk) is entirely missing and is the main implementation surface.

The key structural gap versus departments is the **bulk status change flow**: a checkbox column driving a contextual toolbar that fires `bulkUpdateMemberStatusApi`. No toast library (`sonner`) is installed — feedback for bulk results must use the existing Alert component pattern. No `Checkbox` shadcn component is installed — it must be added via the shadcn CLI before implementing the bulk selection column.

The member detail response currently returns only `MemberModel` (6 fields). To show parent hierarchy context (org name + dept name) on the detail page, `getMemberByIdApi` must be extended to return a richer `MemberDetailApiResponse` that includes a `parentContext` shape — analogous to `DepartmentDetailApiResponse.parentContext`. The `MEMBERS` in-memory array already has `organizationId` and `departmentId` so the mock API can resolve parent context from the existing `ORGANIZATION_DIRECTORY` and a new `DEPARTMENT_DIRECTORY` lookup.

**Primary recommendation:** Build Phase 4 as a strict structural clone of Phase 3 (department), then layer the bulk checkbox/toolbar/feedback on top. Every new file has an exact analog in the department implementation.

---

## Standard Stack

### Core

| Library                 | Version | Purpose                                   | Why Standard                                                                                       |
| ----------------------- | ------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `@tanstack/react-query` | 5.96.2  | Remote state, cache invalidation          | Project standard; all existing feature hooks use it [VERIFIED: package.json]                       |
| `@tanstack/react-form`  | 1.28.6  | Form state and validation                 | Project standard; `DepartmentForm.tsx` and `memberFormSchema` both use it [VERIFIED: package.json] |
| `zod`                   | 4.3.6   | Schema validation                         | Project standard; `memberFormSchema` already defined [VERIFIED: package.json]                      |
| `zustand`               | 5.0.12  | Page-local UI state (bulk selection)      | Project standard for small page-local state not suited to URL/Query cache [VERIFIED: package.json] |
| `radix-ui`              | 1.4.3   | Headless primitives via shadcn components | Project standard for all UI primitives [VERIFIED: package.json]                                    |
| `lucide-react`          | 1.7.0   | Icons                                     | Project standard [VERIFIED: package.json]                                                          |

### Components Required (Already Installed)

| Component                                                                 | File                                    | Status                     |
| ------------------------------------------------------------------------- | --------------------------------------- | -------------------------- |
| `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` | `shared/components/ui/table.tsx`        | Available [VERIFIED: glob] |
| `Alert`, `AlertTitle`, `AlertDescription`                                 | `shared/components/ui/alert.tsx`        | Available [VERIFIED: glob] |
| `AlertDialog`, `AlertDialogAction`, etc.                                  | `shared/components/ui/alert-dialog.tsx` | Available [VERIFIED: glob] |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`                  | `shared/components/ui/select.tsx`       | Available [VERIFIED: glob] |
| `Badge`                                                                   | `shared/components/ui/badge.tsx`        | Available [VERIFIED: glob] |
| `Button`                                                                  | `shared/components/ui/button.tsx`       | Available [VERIFIED: glob] |
| `Card`, `CardContent`, `CardHeader`, etc.                                 | `shared/components/ui/card.tsx`         | Available [VERIFIED: glob] |
| `Skeleton`                                                                | `shared/components/ui/skeleton.tsx`     | Available [VERIFIED: glob] |
| `Input`                                                                   | `shared/components/ui/input.tsx`        | Available [VERIFIED: glob] |
| `Field`, `FieldLabel`, `FieldContent`, etc.                               | `shared/components/ui/field.tsx`        | Available [VERIFIED: glob] |

### Components to Add via shadcn CLI

| Component  | Purpose                                | Why Needed                                                   | Install Command                       |
| ---------- | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------- |
| `checkbox` | Checkbox column for bulk row selection | Not present in `shared/components/ui/` [VERIFIED: glob scan] | `pnpm dlx shadcn@latest add checkbox` |

**No toast library is installed.** `sonner` is not in `package.json` [VERIFIED: package.json]. Bulk operation feedback uses the existing `Alert` component pattern (inline feedback in the toolbar/results area). This is consistent with how errors are already surfaced everywhere else in the codebase.

---

## Architecture Patterns

### New Route Structure

```
app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/
└── members/
    ├── page.tsx                          ← EVOLVE existing proof page into enterprise table
    ├── new/
    │   └── page.tsx                      ← Create form route (NEW)
    ├── _components/
    │   ├── MemberListTable.tsx           ← Table with checkbox column (NEW)
    │   ├── MemberListFilters.tsx         ← Search + status filter bar (NEW)
    │   ├── MemberDeleteDialog.tsx        ← AlertDialog delete confirmation (NEW)
    │   ├── MemberRowActions.tsx          ← View/Edit/Delete button row (NEW)
    │   └── MemberBulkActionBar.tsx       ← Contextual toolbar for bulk status (NEW)
    └── [memberId]/
        ├── page.tsx                      ← Detail page (NEW)
        ├── edit/
        │   └── page.tsx                  ← Edit form route (NEW)
        └── _components/
            └── MemberDetailSummary.tsx   ← Summary card with parent context (NEW)
```

### New Feature/Shared Files

```
features/members/
├── member.form.ts            ← EXISTING — no changes needed
├── member.query-options.ts   ← EXTEND with mutation-aware invalidation key helpers
├── member.query-hooks.ts     ← EXTEND with 4 mutation hooks
├── member.service.ts         ← EXTEND with create/update/delete/bulk service functions
├── member.types.ts           ← EXTEND with MutationPayload, DeleteResult, BulkResult types
└── index.ts                  ← EXTEND exports

shared/api/member.api.ts      ← EXTEND with 4 new API functions + richer detail response
shared/model/member.model.ts  ← NO CHANGES (6-field model locked by D-01)
shared/components/members/
└── MemberForm.tsx            ← NEW (mirrors DepartmentForm.tsx exactly)
```

### Pattern 1: Mock API Extension (member.api.ts)

**What:** Extend the existing `MEMBERS` in-memory array (currently `const`) to `let`, add mutation functions that operate on it — exactly how `department.api.ts` works.

**Key difference vs. departments:** Members have no children so there is no delete guard query — `deleteMemberApi` can soft-delete directly without the `getDepartmentDeleteGuardApi` intermediate step.

**Detail enrichment:** `getMemberByIdApi` must return `MemberDetailApiResponse` (extended from `MemberApiResponse`) that includes `parentContext` with org name and dept name. This requires a `DEPARTMENT_DIRECTORY` lookup similar to `ORGANIZATION_DIRECTORY` in `department.api.ts`.

```typescript
// Source: patterns verified from shared/api/department.api.ts
export type MemberParentContextApiResponse = {
  organizationId: string;
  organizationName: string;
  departmentId: string;
  departmentName: string;
  manageOrganizationPath: string;
  manageDepartmentsPath: string;
  manageMembersPath: string;
};

export type MemberDetailApiResponse = MemberApiResponse & {
  parentContext: MemberParentContextApiResponse;
};

export type MemberCreateApiInput = {
  id: string;
  organizationId: string;
  departmentId: string;
  memberCode: string;
  fullName: string;
  status: DirectoryStatus;
};

export type MemberUpdateApiInput = MemberCreateApiInput;

export type DeleteMemberApiResponse = {
  id: string;
  organizationId: string;
  departmentId: string;
  deletedAt: string;
};

export type BulkUpdateMemberStatusApiInput = {
  memberIds: string[];
  targetStatus: DirectoryStatus;
};

export type BulkUpdateMemberStatusItemResult = {
  memberId: string;
  success: boolean;
  error?: string;
};

export type BulkUpdateMemberStatusApiResponse = {
  results: BulkUpdateMemberStatusItemResult[];
  successCount: number;
  failureCount: number;
};
```

**Important:** The `MEMBERS` array must be changed from `const` to `let` to support mutations. The `deleteMemberApi` sets `deletedAt` on the record (soft delete). The `getMembersApi` must filter out soft-deleted records (add `!member.deletedAt` to filter — mirrors `getActiveDepartmentsByOrganization`).

### Pattern 2: Service Layer Extension (member.service.ts)

**What:** Add 4 service functions that call new API functions and map responses to app models — mirrors exactly how `department.service.ts` extends the API layer.

```typescript
// Source: patterns verified from features/departments/department.service.ts
export async function createMember(
  payload: MemberMutationPayload
): Promise<MemberDetailResponse>;
export async function updateMember(
  scope: MemberQueryScope,
  memberId: string,
  payload: MemberMutationPayload
): Promise<MemberDetailResponse>;
export async function deleteMember(
  scope: MemberQueryScope,
  memberId: string
): Promise<MemberDeleteResult>;
export async function bulkUpdateMemberStatus(
  scope: MemberQueryScope,
  input: BulkUpdateMemberStatusInput
): Promise<MemberBulkUpdateResult>;
```

`getMemberById` in `member.service.ts` must be updated to map the richer `MemberDetailApiResponse` (with `parentContext`) into a `MemberDetailResponse` that includes the parent context fields.

### Pattern 3: Query Keys and Cache Invalidation (member.query-options.ts)

**What:** Add a `departmentLists` scope key to `memberQueryKeys` (analogous to `departmentQueryKeys.organizationLists`) so mutations can invalidate all member list queries under a given org+dept scope in one call.

```typescript
// Source: patterns verified from features/departments/department.query-options.ts
export const memberQueryKeys = {
  // ... existing keys ...
  departmentLists: (organizationId: string, departmentId: string) =>
    [
      ...memberQueryKeys.lists(),
      { scope: createDepartmentScope(organizationId, departmentId) },
    ] as const,
};
```

**Cache invalidation strategy for mutations:**

- `useCreateMemberMutation`: invalidate `memberQueryKeys.departmentLists(orgId, deptId)`
- `useUpdateMemberMutation`: invalidate `departmentLists` + specific `detail` key
- `useDeleteMemberMutation`: invalidate `departmentLists` + `removeQueries` for the deleted detail
- `useBulkUpdateMemberStatusMutation`: invalidate `departmentLists` (multiple members changed)

### Pattern 4: Mutation Hooks (member.query-hooks.ts)

**What:** 4 `useMutation` hooks following the exact same structure as `department.query-hooks.ts`. Each hook closes over `organizationId` and `departmentId` for scoped invalidation.

```typescript
// Source: patterns verified from features/departments/department.query-hooks.ts
export function useCreateMemberMutation(
  organizationId: string,
  departmentId: string
);
export function useUpdateMemberMutation(
  organizationId: string,
  departmentId: string
);
export function useDeleteMemberMutation(
  organizationId: string,
  departmentId: string
);
export function useBulkUpdateMemberStatusMutation(
  organizationId: string,
  departmentId: string
);
```

### Pattern 5: MemberForm (shared/components/members/MemberForm.tsx)

**What:** Client component using `useForm` from `@tanstack/react-form`, wired to `createMemberFormOptions` from `member.form.ts`. Identical structure to `DepartmentForm.tsx`.

**Key difference vs. DepartmentForm:** There are two read-only parent fields (`organizationId` AND `departmentId`) instead of one. Both are pre-filled from route params and rendered with `disabled` inputs — D-13.

Fields (in display order):

1. `organizationId` — read-only, locked to route param
2. `departmentId` — read-only, locked to route param
3. `id` — editable on create, disabled on update (stable identifier)
4. `memberCode` — always editable
5. `fullName` — always editable
6. `status` — `<select>` element matching DepartmentForm pattern

### Pattern 6: MemberListTable with Checkbox Column

**What:** Extends the `DepartmentListTable` pattern with a leading checkbox column for bulk selection. Row selection state is managed via a Zustand store or local `useState` in the page — the table component receives selected IDs and callbacks.

**Checkbox column approach (no @tanstack/react-table installed):**

The repo does NOT use `@tanstack/react-table` [VERIFIED: package.json]. The `DepartmentListTable.tsx` is a manual table with shadcn `Table` primitives. `MemberListTable` follows the same manual approach but adds:

- A leading `<TableHead>` with a "select all" `Checkbox`
- Each `<TableRow>` includes a `<TableCell>` with an individual `Checkbox`
- Props: `selectedMemberIds: Set<string>`, `onSelectionChange: (ids: Set<string>) => void`

The `Checkbox` component must be added via `pnpm dlx shadcn@latest add checkbox` before implementing this column.

### Pattern 7: MemberBulkActionBar

**What:** A conditional toolbar that renders only when `selectedMemberIds.size > 0`. Shows selected count, a `Select` dropdown for target status, a confirm button, and a clear selection button.

**Placement:** Rendered between `MemberListFilters` and `MemberListTable` in the page — appears contextually without DOM restructuring. This is the simplest approach given no sticky positioning infrastructure exists in the admin layout.

**Feedback:** After `bulkUpdateMemberStatusMutation.mutateAsync` resolves, render an `Alert` (not toast — no toast library installed) showing success count and failure count in Vietnamese.

```tsx
// Feedback pattern — Alert component, not toast
{
  bulkResult && (
    <Alert variant={bulkResult.failureCount > 0 ? "destructive" : "default"}>
      <AlertTitle>Kết quả cập nhật hàng loạt</AlertTitle>
      <AlertDescription>
        {bulkResult.successCount} thành viên đã được cập nhật thành công.
        {bulkResult.failureCount > 0 &&
          ` ${bulkResult.failureCount} thành viên không thể cập nhật.`}
      </AlertDescription>
    </Alert>
  );
}
```

### Pattern 8: MemberDeleteDialog

**What:** Simplified `AlertDialog` that confirms member name before soft-delete. No guard query needed (members have no children — D-18). Calls `useDeleteMemberMutation` directly.

```typescript
// Source: patterns verified from DepartmentDeleteDialog.tsx (simplified — no guard query)
type MemberDeleteDialogProps = {
  organizationId: string;
  departmentId: string;
  memberId: string;
  memberName: string;
  trigger: ReactElement;
  onDeleteSuccess?: () => void;
};
```

### Pattern 9: MemberDetailSummary

**What:** Card component using `SummaryField` primitives to render member core fields + parent context. No sub-entity bridge (D-15).

Fields to show:

- `id` (ID ổn định), `memberCode`, `fullName`, `status` (badge)
- `organizationId`, parent org name (from `parentContext.organizationName`)
- `departmentId`, parent dept name (from `parentContext.departmentName`)

### Pattern 10: Member Detail Response Enrichment

**What:** `getMemberByIdApi` must be extended to return `MemberDetailApiResponse` that includes `parentContext`. This requires a `DEPARTMENT_DIRECTORY` in `member.api.ts` that maps `departmentId` to department metadata.

**Implementation approach:**

- Add a `DEPARTMENT_DIRECTORY` map keyed by `departmentId` containing `{ id, name, organizationId, managePath }` for the existing seed departments (`dept-acme-sales`, `dept-acme-ops`, `dept-sao-mai-hr`).
- `getMemberByIdApi` resolves parent context from both `ORGANIZATION_DIRECTORY` and `DEPARTMENT_DIRECTORY` after finding the member record.
- The `getMembers` (list) API continues returning `MemberApiResponse` (no enrichment needed for list rows).

### Anti-Patterns to Avoid

- **Calling `getMemberByIdApi` inside `getMembers` for enrichment:** `department.service.ts` does call `getDepartmentById` inside `getDepartments` for enrichment on the list. For members, the list does NOT need `parentContext` (not shown in list columns) — avoid the extra per-row API calls.
- **Hard-coding toast/notification:** `sonner` is not installed. Use `Alert` for all feedback states.
- **Using `@tanstack/react-table` selection API:** Not installed. Implement selection manually with `Set<string>` state.
- **Forgetting `!member.deletedAt` filter in `getMembersApi`:** After mutations are added, the `getMembersApi` filter must exclude soft-deleted records. The current implementation does NOT filter by `deletedAt` — this must be fixed when adding mutation support.
- **Calling `getDepartmentMemberSummary` after member mutations:** `department.api.ts` uses `getMembersApi` to compute member counts. After member mutations (create/delete/bulk-update), department member summary queries should also be invalidated if they are cached — but this is optional since the dept detail page re-fetches on visit.

---

## Don't Hand-Roll

| Problem                                                  | Don't Build              | Use Instead                                                                                                     | Why                                                                                            |
| -------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| URL-owned list state (search, filters, sort, pagination) | Custom URL param parsing | `parseDirectoryListState`, `serializeDirectoryListState`, `toDirectoryListQuery` in `features/directory/shared` | Already handles all normalization, serialization, and type safety [VERIFIED: codebase]         |
| Scoped cache keys                                        | Custom key arrays        | `createDepartmentScope`, `createDirectoryListKey`, `createDirectoryDetailKey` in `features/directory/shared`    | Guarantees consistent key structure for scope-qualified invalidation [VERIFIED: codebase]      |
| Status badge rendering                                   | Custom badge component   | `DirectoryStatusBadge` in `shared/components/directory/`                                                        | Handles all 3 statuses with correct Vietnamese labels and variant mapping [VERIFIED: codebase] |
| Summary field layout                                     | Custom card layout       | `SummaryField` in `shared/components/directory/`                                                                | Consistent visual treatment across all entity detail pages [VERIFIED: codebase]                |
| Form field error messages                                | Custom error display     | `getFieldErrors` from `shared/lib/form-errors.ts` + `FieldError` from `shared/components/ui/field.tsx`          | Handles both string and object error shapes from TanStack Form [VERIFIED: codebase]            |
| Form validation schema                                   | Custom zod schema        | `memberFormSchema`, `createMemberFormOptions`, `getMemberFormDefaults` in `features/members/member.form.ts`     | Already complete and validated [VERIFIED: codebase]                                            |
| Member list query                                        | New query setup          | `useMemberListQuery`, `memberListQueryOptions` in `features/members/`                                           | Already implemented; extend, don't replace [VERIFIED: codebase]                                |
| Member detail query                                      | New query setup          | `useMemberDetailQuery`, `memberDetailQueryOptions`                                                              | Already implemented [VERIFIED: codebase]                                                       |
| In-memory pagination/sort                                | Custom array operations  | `paginateResults`, `applyMemberSort` already in `getMembersApi`                                                 | Already implemented; only extend filter/mutation logic [VERIFIED: codebase]                    |

---

## Common Pitfalls

### Pitfall 1: `MEMBERS` array is `const` — mutations will silently no-op

**What goes wrong:** `const MEMBERS: MemberApiResponse[]` in `member.api.ts` cannot be reassigned. Any mutation function that tries `MEMBERS = MEMBERS.filter(...)` will be a TypeScript error; any that tries `MEMBERS.push(...)` will mutate by reference but `getMembersApi` won't see soft-deleted records unless the array is replaced.

**Why it happens:** The read-only API layer was built without mutations in mind. Compare: `department.api.ts` uses `let departments: DepartmentApiResponse[]`.

**How to avoid:** Change `const MEMBERS` to `let MEMBERS` as the first step when extending `member.api.ts`. Then filter by `!member.deletedAt` in `getMembersApi`.

**Warning signs:** `createMemberApi` appears to work but the list doesn't show the new member; `deleteMemberApi` appears to succeed but the member re-appears after page refresh (within the same session).

### Pitfall 2: Missing `parentContext` in member detail causes `MemberDetailSummary` to fail

**What goes wrong:** `getMemberByIdApi` currently returns bare `MemberApiResponse`. If `MemberDetailSummary` expects `parentContext.organizationName` and `parentContext.departmentName`, TypeScript will error or the component will crash at runtime.

**Why it happens:** The service layer enrichment (adding parent context) is the new work in Phase 4 — it doesn't exist yet.

**How to avoid:** Add `DEPARTMENT_DIRECTORY` to `member.api.ts`, extend `getMemberByIdApi` to return `MemberDetailApiResponse`, update `getMemberById` in `member.service.ts` to map the new shape, and update `MemberDetailResponse` in `member.types.ts` to include the parent context model.

**Warning signs:** TypeScript errors on `department.parentContext` accessing properties of undefined; detail page crashes with "Cannot read properties of undefined."

### Pitfall 3: Bulk mutation invalidating the wrong scope

**What goes wrong:** If `useBulkUpdateMemberStatusMutation` invalidates `memberQueryKeys.lists()` (all member lists) instead of `memberQueryKeys.departmentLists(orgId, deptId)`, it may over-invalidate or fail to hit the correct scoped query key.

**Why it happens:** The scoped invalidation pattern (using `departmentLists` key) must be added to `memberQueryKeys` — it doesn't exist there yet (only `lists()` and specific `list(...)` keys exist).

**How to avoid:** Add `memberQueryKeys.departmentLists(organizationId, departmentId)` key to `member.query-options.ts` before writing mutation hooks. Verify the key structure matches how `departmentQueryKeys.organizationLists` works.

### Pitfall 4: Soft-delete not filtering from list

**What goes wrong:** After `deleteMemberApi` sets `deletedAt` on a member record, `getMembersApi` still returns that member because the filter only checks `organizationId`/`departmentId`/search/status — it never checks `deletedAt`.

**Why it happens:** The original `getMembersApi` was written without delete semantics.

**How to avoid:** Add `!member.deletedAt` as the first condition in the `getMembersApi` filter chain — exactly as `getActiveDepartmentsByOrganization` does in `department.api.ts`.

### Pitfall 5: Checkbox component not installed

**What goes wrong:** Importing `Checkbox` from `@/shared/components/ui/checkbox` fails with a module-not-found error because the component hasn't been added via the shadcn CLI.

**Why it happens:** `Checkbox` is a shadcn component that must be explicitly generated — it is not included in the current `shared/components/ui/` [VERIFIED: glob scan].

**How to avoid:** Run `pnpm dlx shadcn@latest add checkbox` as the first task of the bulk operations implementation wave. Do not hand-roll a checkbox.

### Pitfall 6: `id` field on member — stable identifier conflict

**What goes wrong:** `memberFormSchema` includes `id` as a required field (the stable identifier, like `member-acme-001`). On create, the user must supply this. The `createMemberApi` must verify uniqueness within the org+dept scope.

**Why it happens:** Members use a stable string ID (not auto-generated UUID) consistent with the pattern established for orgs and depts in Phase 1 (ARCH-05).

**How to avoid:** `createMemberApi` must check for ID collisions within the in-memory array before inserting. Add an `assertUniqueMemberIdentity` helper modeled on `assertUniqueDepartmentIdentity` in `department.api.ts`.

### Pitfall 7: `useEffect` dependency warning in `MemberForm`

**What goes wrong:** `DepartmentForm.tsx` uses `useEffect` to reset form when `defaults` change — but `defaults` is a new object on every render, causing infinite rerender loops unless memoized.

**Why it happens:** `getDepartmentFormDefaults` returns a new object on every call.

**How to avoid:** In `MemberForm.tsx`, wrap `getMemberFormDefaults(...)` in `useMemo` with stable deps (`organizationId`, `departmentId`, `initialValues`), matching the same pattern `DepartmentForm.tsx` already uses (it calls the function inline — if ESLint warns, add `useMemo`).

---

## Code Examples

### Extending member.api.ts — mutation function signatures

```typescript
// Source: patterns verified from shared/api/department.api.ts
let MEMBERS: MemberApiResponse[] = [
  /* existing seed data */
];

export async function createMemberApi(
  input: MemberCreateApiInput
): Promise<MemberDetailApiResponse> {
  // normalize, assert scope, assert uniqueness, push, return enriched
}

export async function updateMemberApi(
  scope: DepartmentScope,
  memberId: string,
  input: MemberUpdateApiInput
): Promise<MemberDetailApiResponse> {
  // find existing, validate scope match, assert uniqueness (exclude self), map, replace, return enriched
}

export async function deleteMemberApi(
  scope: DepartmentScope,
  memberId: string
): Promise<DeleteMemberApiResponse> {
  // find member, set deletedAt, update array, return { id, organizationId, departmentId, deletedAt }
}

export async function bulkUpdateMemberStatusApi(
  scope: DepartmentScope,
  input: BulkUpdateMemberStatusApiInput
): Promise<BulkUpdateMemberStatusApiResponse> {
  // iterate memberIds, try to update each, collect per-item success/failure
  // returns { results: [...], successCount, failureCount }
}
```

### memberQueryKeys extension

```typescript
// Source: patterns verified from features/departments/department.query-options.ts
export const memberQueryKeys = {
  all: ["directory", "members"] as const,
  lists: () => [...memberQueryKeys.all, "list"] as const,
  departmentLists: (organizationId: string, departmentId: string) =>
    [
      ...memberQueryKeys.lists(),
      { scope: createDepartmentScope(organizationId, departmentId) },
    ] as const,
  list: (organizationId, departmentId, params) => {
    const scope = createDepartmentScope(organizationId, departmentId);
    return createDirectoryListKey("members", params, scope);
  },
  details: () => [...memberQueryKeys.all, "detail"] as const,
  detail: (organizationId, departmentId, memberId) => {
    const scope = createDepartmentScope(organizationId, departmentId);
    return createDirectoryDetailKey("members", memberId, scope);
  },
};
```

### Mutation hook pattern for bulk

```typescript
// Source: patterns verified from features/departments/department.query-hooks.ts
export function useBulkUpdateMemberStatusMutation(
  organizationId: string,
  departmentId: string
) {
  const queryClient = useQueryClient();
  const scope = createDepartmentScope(organizationId, departmentId);

  return useMutation({
    mutationFn: (input: BulkUpdateMemberStatusInput) =>
      bulkUpdateMemberStatus(scope, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: memberQueryKeys.departmentLists(organizationId, departmentId),
      });
    },
  });
}
```

### Member list page — bulk selection state

```typescript
// Prefer useState for selection state on the list page (not Zustand)
// since it is ephemeral and page-local — resets on navigation
const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(
  new Set()
);
const [bulkResult, setBulkResult] =
  useState<BulkUpdateMemberStatusApiResponse | null>(null);

const handleBulkStatusChange = async (targetStatus: DirectoryStatus) => {
  const result = await bulkMutation.mutateAsync({
    memberIds: Array.from(selectedMemberIds),
    targetStatus,
  });
  setBulkResult(result);
  setSelectedMemberIds(new Set());
};
```

---

## State of the Art

| Old Approach                                                | Current Approach                                           | When Changed  | Impact                                     |
| ----------------------------------------------------------- | ---------------------------------------------------------- | ------------- | ------------------------------------------ |
| `const MEMBERS` (read-only mock)                            | Must become `let MEMBERS` with soft-delete support         | Phase 4 (now) | Unlocks all mutations                      |
| `getMemberByIdApi` returns bare 6 fields                    | Must return `MemberDetailApiResponse` with `parentContext` | Phase 4 (now) | Enables detail page with hierarchy context |
| `useMemberListQuery` and `useMemberDetailQuery` (read-only) | Extended with 4 mutation hooks                             | Phase 4 (now) | Completes the feature boundary             |

---

## Assumptions Log

| #   | Claim                                                                                                  | Section               | Risk if Wrong                                                                                                    |
| --- | ------------------------------------------------------------------------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A1  | `sonner` (toast) is not installed and should not be added — bulk feedback uses Alert                   | Standard Stack        | Low: `sonner` would be a clean addition, but inline Alert is sufficient and avoids adding a dependency mid-phase |
| A2  | `@tanstack/react-table` is not used in this project — row selection is manual with `Set<string>` state | Architecture Patterns | Low: the manual approach is simpler given the existing `DepartmentListTable` pattern                             |

---

## Open Questions

1. **Should `getMemberById` service also enrich list items with parent context?**
   - What we know: `department.service.ts` calls `getDepartmentById` per list item to enrich with `parentContext` + `memberSummary`. This is expensive (N+1 pattern in mock land).
   - What's unclear: Members don't show `parentContext` in list columns (D-07). There's no reason to enrich list items.
   - Recommendation: Do NOT enrich list items. `getMembers` service returns `MemberModel[]` only (current behavior, already correct). Only `getMemberById` needs the enriched `MemberDetailApiResponse`.

2. **Should `DepartmentMemberSummary` (on dept detail page) reflect mutations?**
   - What we know: `DepartmentMemberSummary` calls `getDepartmentMemberSummary` which calls `getMembersApi`. After member create/delete/bulk-update, counts will be stale unless dept queries are also invalidated.
   - What's unclear: Whether the planner should add dept detail cache invalidation to member mutation hooks.
   - Recommendation: Yes — add `queryClient.invalidateQueries({ queryKey: departmentQueryKeys.detail(organizationId, departmentId) })` to `onSuccess` for `useCreateMemberMutation`, `useDeleteMemberMutation`, and `useBulkUpdateMemberStatusMutation`. This keeps dept member count accurate.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 4 is purely client-side mock code changes. No external tools, services, databases, CLIs, or runtimes beyond the existing dev server are required.

---

## Validation Architecture

Per `.planning/config.json` absence of `workflow.nyquist_validation: false` — this section applies. However, per `CLAUDE.md` and `CONVENTIONS.md`, there is **no configured test runner** in `package.json`. Tests cannot be automated at this time.

### Test Framework

| Property           | Value                                                 |
| ------------------ | ----------------------------------------------------- |
| Framework          | None configured [VERIFIED: CLAUDE.md, CONVENTIONS.md] |
| Config file        | None                                                  |
| Quick run command  | N/A — no test runner                                  |
| Full suite command | N/A                                                   |

### Phase Requirements → Test Map

| Req ID | Behavior                                                     | Test Type | Automated Command | File Exists? |
| ------ | ------------------------------------------------------------ | --------- | ----------------- | ------------ |
| MEM-01 | Paginated member table renders with dept scope               | manual    | —                 | N/A          |
| MEM-02 | Search by fullName/memberCode narrows results                | manual    | —                 | N/A          |
| MEM-03 | Status filter and URL state round-trip                       | manual    | —                 | N/A          |
| MEM-04 | Sort by memberCode/fullName/status                           | manual    | —                 | N/A          |
| MEM-05 | Create member form validates and persists to in-memory array | manual    | —                 | N/A          |
| MEM-06 | Detail page shows parentContext (org name + dept name)       | manual    | —                 | N/A          |
| MEM-07 | Edit member persists changes                                 | manual    | —                 | N/A          |
| MEM-08 | Delete confirmation soft-deletes and removes from list       | manual    | —                 | N/A          |
| MEM-09 | organizationId+departmentId locked to route params in form   | manual    | —                 | N/A          |
| MEM-10 | Status badge renders active/inactive/archived consistently   | manual    | —                 | N/A          |
| MEM-11 | Checkbox column enables multi-select, bulk toolbar appears   | manual    | —                 | N/A          |
| MEM-12 | Bulk status change shows success/failure counts              | manual    | —                 | N/A          |

**Wave 0 gaps:** None to create — no test infrastructure to bootstrap. Per CLAUDE.md: "If asked to add tests, first decide with the user what test stack should be introduced."

---

## Security Domain

No `security_enforcement` flag found in config. Phase 4 is a client-side mock CRUD feature with no authentication, no real HTTP calls, and no external API integration. The only relevant consideration is:

- **Input validation (V5):** `memberFormSchema` with Zod already validates all user inputs client-side. The mock API layer asserts uniqueness and scope via `assertUniqueMemberIdentity`. [VERIFIED: codebase]
- **No auth surface:** All routes are unprotected admin pages behind the existing admin layout — auth is deferred to Phase 6 (ARCH-06, ARCH-07). [VERIFIED: REQUIREMENTS.md]

---

## Project Constraints (from CLAUDE.md)

| Directive                                                                                                       | Impact on Phase 4                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js 16.2.2 with React 19 — do not assume older conventions                                                  | Use App Router conventions only; `"use client"` on interactive components                                                             |
| Do not add extra visual design work unless explicitly asked                                                     | Only implement the enterprise table, form, and bulk toolbar — no decorative additions                                                 |
| Prefer `pnpm dlx shadcn@latest ...` for new UI components                                                       | Use `pnpm dlx shadcn@latest add checkbox` for the Checkbox component                                                                  |
| Do not modify base shadcn components under `shared/components/ui`                                               | The `Checkbox` component will be generated there — only consume it, don't modify it                                                   |
| Build custom UI markup only when no suitable shadcn component exists                                            | Use `Select`, `AlertDialog`, `Alert`, `Table`, `Badge` from `shared/components/ui` — all already present                              |
| User-facing copy in Vietnamese with diacritics                                                                  | All labels, messages, placeholders, error text, bulk feedback copy must be Vietnamese with diacritics                                 |
| Follow repo layering: `shared/api` → `service` → `query hooks` → `page`                                         | Never call mutation functions directly from page components — always through hooks                                                    |
| Zustand only for small UI state that does not belong in URL params, React Query cache, or local component state | Bulk selection (`selectedMemberIds`) is ephemeral page-local state — use `useState` not Zustand; bulk result feedback also `useState` |
| No test runner configured                                                                                       | Do not add test files unless user requests it                                                                                         |

---

## Sources

### Primary (HIGH confidence)

- Codebase inspection: `features/departments/department.query-hooks.ts` — verified mutation hook pattern
- Codebase inspection: `features/departments/department.service.ts` — verified service layer pattern
- Codebase inspection: `features/departments/department.query-options.ts` — verified query key scoping pattern
- Codebase inspection: `shared/api/department.api.ts` — verified mock API mutation pattern, soft-delete, delete guard, enrichment
- Codebase inspection: `shared/api/member.api.ts` — verified current state (read-only, const array)
- Codebase inspection: `features/members/member.form.ts` — verified existing schema is complete
- Codebase inspection: `features/members/member.query-hooks.ts` — verified read hooks exist, mutations absent
- Codebase inspection: `features/members/member.query-options.ts` — verified query keys exist, departmentLists key absent
- Codebase inspection: `shared/components/departments/DepartmentForm.tsx` — verified form pattern
- Codebase inspection: `app/.../departments/_components/DepartmentListTable.tsx` — verified manual table pattern (no @tanstack/react-table)
- Codebase inspection: `app/.../departments/_components/DepartmentDeleteDialog.tsx` — verified delete dialog pattern
- Codebase inspection: `app/.../departments/page.tsx` — verified full list page orchestration pattern
- Codebase inspection: `package.json` — verified sonner not installed, @tanstack/react-table not installed
- Codebase inspection: `shared/components/ui/` glob — verified Checkbox not installed, Select installed

### Secondary (MEDIUM confidence)

- `.planning/phases/04-member-management-bulk-operations/04-CONTEXT.md` — all implementation decisions [CITED: project planning]

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all packages and components verified against package.json and file system
- Architecture: HIGH — all patterns verified against existing department implementation
- Pitfalls: HIGH — all pitfalls identified by direct code inspection of the current member.api.ts state
- Bulk operations pattern: HIGH — design is constrained by what's already in the codebase (no toast, no tanstack-table, manual approach)

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable — no fast-moving external dependencies; all decisions are codebase-internal)
