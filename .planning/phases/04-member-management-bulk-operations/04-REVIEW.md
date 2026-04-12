---
phase: 04-member-management-bulk-operations
reviewed: 2026-04-12T00:00:00Z
depth: standard
files_reviewed: 18
files_reviewed_list:
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/_components/MemberDetailSummary.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/edit/page.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/page.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberBulkActionBar.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberDeleteDialog.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListFilters.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberRowActions.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/new/page.tsx
  - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx
  - features/members/member.query-hooks.ts
  - features/members/member.query-options.ts
  - features/members/member.service.ts
  - features/members/member.types.ts
  - shared/api/member.api.ts
  - shared/components/members/MemberForm.tsx
  - shared/components/ui/checkbox.tsx
  - shared/model/member.model.ts
findings:
  critical: 0
  warning: 5
  info: 4
  total: 9
status: issues_found
---

# Phase 04: Code Review Report

**Reviewed:** 2026-04-12T00:00:00Z
**Depth:** standard
**Files Reviewed:** 18
**Status:** issues_found

## Summary

This phase introduces the member management CRUD surface with bulk status update operations. The overall architecture is clean and consistent with the existing posts feature pattern: layered API -> service -> query-options -> query-hooks -> page. The bulk operation design is well-structured and the form layer is properly validated with Zod.

Five warnings were found — none are crashes in isolation, but three of them combine to create a meaningful UX correctness issue around unhandled async errors on the detail page. Two additional warnings concern stale selection state after page changes and a redundant `id` field exposed in the edit form payload. Four info-level items cover dead props, a magic value, duplicate display copy, and a minor comment artifact.

No critical (security, data-loss, auth-bypass) issues were found.

---

## Warnings

### WR-01: Unhandled rejection on delete in `AdminMemberDetailPage` — UI can freeze

**File:** `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/page.tsx:50-56`

**Issue:** `handleDeleteConfirm` is an `async` function called directly from `AlertDialogAction`'s `onClick`. If `deleteMutation.mutateAsync` rejects (e.g. network error, member already deleted), the promise rejection is unhandled: there is no `try/catch` and no `onError` callback. The `AlertDialog` stays open with the confirm button visually re-enabled (since `isPending` returns to `false`), and the user sees no error message — they can click "Xoá" repeatedly. The same pattern in `MembersPageContent` (`handleDeleteConfirm` line 141-147) avoids the issue by using `.mutate` with an `onSuccess` callback instead of `mutateAsync`, which is the safer default when the caller does not need to await.

**Fix:** Either catch the rejection and display an error, or switch from `mutateAsync` to `mutate` with `onSuccess`/`onError` callbacks:

```tsx
// Option A — keep mutateAsync, add try/catch
async function handleDeleteConfirm() {
  try {
    await deleteMutation.mutateAsync(params.memberId);
    router.push(
      memberDetailQuery.data?.parentContext.manageMembersPath ??
        `/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members`
    );
  } catch {
    // deleteMutation.isError + deleteMutation.error are now set; render an Alert
  }
}

// Option B — switch to .mutate
deleteMutation.mutate(params.memberId, {
  onSuccess: () =>
    router.push(
      memberDetailQuery.data?.parentContext.manageMembersPath ?? fallback
    ),
});
```

---

### WR-02: Unhandled rejection on bulk apply — error is silently swallowed

**File:** `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx:154-161`

**Issue:** `handleBulkApply` calls `bulkMutation.mutateAsync` inside an `async` function without a `try/catch`. If the mutation rejects (e.g. network failure before any result arrives), the rejection is unhandled. `setBulkFeedback` on line 160 is never reached, so the action bar stays in the "applying" spinner state until the component re-renders for another reason. Additionally the stale `bulkFeedback` from a previous successful run may still be shown.

**Fix:**

```tsx
async function handleBulkApply(targetStatus: DirectoryStatus) {
  setBulkFeedback(null);
  try {
    const result = await bulkMutation.mutateAsync({
      memberIds: selectedIds,
      targetStatus,
    });
    setBulkFeedback(result);
  } catch {
    // bulkMutation.isError / bulkMutation.error are set; optionally set an error feedback state
  }
}
```

---

### WR-03: Selected IDs not reset on page/filter change — bulk action operates on stale set

**File:** `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx:114-134`

**Issue:** When the user changes the search term (`handleSearchChange`), the status filter (`handleStatusChange`), the sort order (`handleSortChange`), or the page (`handlePageChange`), `selectedIds` is never cleared. The visible rows on the new page will differ from the stored IDs. A subsequent bulk update will fire against IDs the user can no longer see and did not intend to update on the new filtered/paged view. This is a logic error, not a cosmetic issue.

**Fix:** Clear `selectedIds` (and `bulkFeedback`) in each state-change handler, or centralize the clear inside `updatePartialState`:

```tsx
const updatePartialState = (
  partialState: Partial<DirectoryListState<MemberListSortField>>
) => {
  setSelectedIds([]); // clear stale selection
  setBulkFeedback(null); // clear stale feedback
  updateListState({
    ...normalizedState,
    ...partialState,
  });
};
```

---

### WR-04: `id` field sent in `updateMemberApi` payload allows client-supplied ID override

**File:** `shared/api/member.api.ts:248-279` cross-referenced with `features/members/member.types.ts:31` and `shared/api/member.api.ts:43`

**Issue:** `MemberUpdateApiInput` is typed as `MemberCreateApiInput` (alias, line 43 in `member.api.ts`), which includes `id`, `organizationId`, and `departmentId`. The `updateMemberApi` function ignores those three fields from `input` and uses only `scope.organizationId`, `scope.departmentId`, and `memberId` from the URL path for lookup, so they are harmless in the current mock. However, the `MemberForm` is used for both create and update flows and submits the `id` field in the payload (line 81 in `new/page.tsx`, line 51 in `edit/page.tsx` via `updateMutation.mutateAsync`). When this moves to a real backend, a client-supplied `id` in the update body is a common IDOR-class risk. Keeping `id` out of the update contract is the correct fix at the type level now, before the real API is wired.

**Fix:** Define a separate `MemberUpdateApiInput` type that omits `id`:

```ts
// shared/api/member.api.ts
export type MemberUpdateApiInput = Omit<MemberCreateApiInput, "id">;
```

Then strip `id` from the form payload before calling `updateMutation.mutateAsync` in the edit page, or exclude it from the form schema used in update mode.

---

### WR-05: `bulkUpdateMemberStatusApi` does not scope by `organizationId`/`departmentId`

**File:** `shared/api/member.api.ts:311-338`

**Issue:** `bulkUpdateMemberStatusApi` accepts only `memberIds` and `targetStatus` — no scope. The lookup on line 316 is `MEMBERS.findIndex((m) => m.id === memberId && !m.deletedAt)`, which matches members across any organization and department. A member ID that belongs to a different department will be updated without any scope check. All other API functions (`getMembersApi`, `getMemberByIdApi`, `updateMemberApi`, `deleteMemberApi`) enforce `scope.organizationId` and `scope.departmentId`. This is an inconsistency that will become a real authorization gap when the mock is replaced with a real backend that uses the same contract.

**Fix:** Add `scope: DepartmentScope` to `BulkUpdateMemberStatusApiInput` and enforce it in the lookup:

```ts
export type BulkUpdateMemberStatusApiInput = {
  scope: DepartmentScope; // add this
  memberIds: string[];
  targetStatus: DirectoryStatus;
};

// inside bulkUpdateMemberStatusApi:
const idx = MEMBERS.findIndex(
  (m) =>
    m.id === memberId &&
    m.organizationId === input.scope.organizationId &&
    m.departmentId === input.scope.departmentId &&
    !m.deletedAt
);
```

Update the call site in `member.query-hooks.ts` (line 136-138) and pass the scope down from `useBulkUpdateMemberStatusMutation`.

---

## Info

### IN-01: `organizationId` and `departmentId` props in `MemberListTable` are unused dead code

**File:** `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx:56-57`

**Issue:** Both props are prefixed with `_` and suppressed with eslint-disable comments, indicating they are accepted but not consumed. The comment says "kept for future use (e.g. scoped links)" — however the scoped links are already produced by `MemberRowActions` (which receives those props directly from `MembersPageContent`). If there is no concrete planned usage, carrying them as dead props adds noise and maintenance burden.

**Fix:** Remove `organizationId` and `departmentId` from `MemberListTableProps` and the function signature. If scoped links are needed inside the table in future, they can be re-added then.

---

### IN-02: `generatedId` computed outside `handleSubmit` — stable across re-renders but never regenerated on retry

**File:** `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/new/page.tsx:36`

**Issue:** `const generatedId = \`member-${crypto.randomUUID().split("-")[0]}\``is evaluated at component render time. This means the same generated ID is used if the form is submitted, fails, and is submitted again without a remount. In the mock this is harmless because the failed`createMemberApi`throws before inserting. On a real backend the server might receive duplicate IDs across retry attempts. The ID is also exposed to the user in the form (in read-only display via`getMemberFormDefaults`→ rendered in`MemberForm`), though it is not shown visually in the current implementation.

**Fix:** Move ID generation inside `handleSubmit`, or generate it via `useMemo` with a refresh mechanism:

```tsx
async function handleSubmit(values: MemberFormPayload) {
  const id = `member-${crypto.randomUUID().split("-")[0]}`;
  await createMutation.mutateAsync({ ...values, id });
  router.push(membersPath);
}
```

And remove `id` from `initialValues` passed to `MemberForm` (make it server/handler-assigned). This also keeps the `id` hidden from the rendered form entirely.

---

### IN-03: Pagination summary text is duplicated

**File:** `app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx:151-153` and `241-243`

**Issue:** The string "Hiển thị {members.length} / {rowCount} thành viên, trang {pageIndex + 1}, kích thước {pageSize}." appears twice in the same component — once in the `CardHeader` and once in the pagination footer. Both show the same values. One of them is redundant.

**Fix:** Remove the duplicate from the `CardHeader` (lines 151-153) and keep only the one in the pagination footer (lines 241-243), which is already positioned alongside the pagination controls where users expect it.

---

### IN-04: `mapMemberParentContext` is a no-op spread — dead abstraction

**File:** `features/members/member.service.ts:26-29`

**Issue:** `mapMemberParentContext` exists as an explicit mapping function but its body is `return { ...response }` — a shallow clone with no field renaming or transformation. Since the `MemberParentContextApiResponse` and `MemberParentContextModel` types are structurally identical (all seven fields are the same names and same types), this function adds no value and will mislead future developers into thinking a non-trivial transformation exists.

**Fix:** Remove the function and inline the spread directly in `mapMemberDetail`, or simply assign `response.parentContext` directly once the types are confirmed identical:

```ts
function mapMemberDetail(
  response: MemberDetailApiResponse
): MemberDetailResponse {
  return {
    id: response.id,
    organizationId: response.organizationId,
    departmentId: response.departmentId,
    memberCode: response.memberCode,
    fullName: response.fullName,
    status: response.status,
    parentContext: response.parentContext,
  };
}
```

---

_Reviewed: 2026-04-12T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
