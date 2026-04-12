---
phase: "04"
plan: "02"
subsystem: members-ui
tags:
  [
    member-list,
    enterprise-table,
    url-state,
    sort,
    filter,
    pagination,
    delete-dialog,
    row-actions,
  ]
dependency_graph:
  requires:
    - 04-01 — member.query-hooks (useMemberListQuery, useDeleteMemberMutation)
    - features/directory/shared — parseDirectoryListState, serializeDirectoryListState, buildDirectoryTableState
    - shared/components/directory/DirectoryStatusBadge
  provides:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListFilters.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberRowActions.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberDeleteDialog.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx (evolved)
  affects:
    - Plan 05 (bulk operations) extends MemberListTable with checkbox column
tech_stack:
  added: []
  patterns:
    - Enterprise table with sortable headers, loading/empty/error states — mirrors DepartmentListTable
    - URL-owned filter/sort/page state via serializeDirectoryListState + router.replace
    - AlertDialog for soft-delete confirmation — no dependency guard (members have no children, per D-18)
    - renderRowActions prop pattern for row action injection
key_files:
  created:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListFilters.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberRowActions.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberDeleteDialog.tsx
  modified:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx
decisions:
  - Used normalizedState.sort directly for MemberListTable sort prop — buildDirectoryTableState returns DirectoryTableState with sorting (TanStack format) not sort (DirectorySort[]), and MemberListTable expects DirectorySort[]
  - Implemented URL update via serializeDirectoryListState + router.replace (same pattern as departments/page.tsx) — useDirectoryListNavigation does not exist in features/directory/shared
  - MemberListFilters uses Select (single-status) instead of toggle buttons — plan spec calls for single Select with "Tất cả trạng thái" option, simpler than multi-toggle
metrics:
  duration: ~25min
  completed: "2026-04-12"
  tasks_completed: 2
  files_modified: 5
---

# Phase 04 Plan 02: Member Enterprise List Page Summary

**One-liner:** Enterprise member list page with sortable TanStack-style table, URL-owned filter/sort/page state, three ghost row actions, and AlertDialog soft-delete — replaces proof card list.

## Tasks Completed

| Task | Name                                                                            | Commit  | Files                                   |
| ---- | ------------------------------------------------------------------------------- | ------- | --------------------------------------- |
| 1    | Create MemberListTable, MemberListFilters, MemberRowActions, MemberDeleteDialog | b9cfbd2 | 4 new files in \_components/            |
| 2    | Evolve members/page.tsx into enterprise list page                               | f9d177a | page.tsx (147 insertions, 80 deletions) |

## What Was Built

### Task 1 — Four \_components/ files

**MemberListTable.tsx:**

- Columns: # (index), Mã thành viên (memberCode, font-semibold), Họ và tên (fullName + stable ID sub-label), Trạng thái (DirectoryStatusBadge), Thao tác (renderRowActions)
- Sortable headers using ArrowUp/ArrowDown/ArrowUpDown icons
- Loading state: three Skeleton rows inside Card
- Empty state: "Chưa có thành viên phù hợp" with body copy in Card
- Error state: Alert destructive with "Chưa tải được danh sách thành viên"
- Pagination: "Trang trước" / "Trang sau" buttons with description text

**MemberListFilters.tsx:**

- Search Input with placeholder "Tìm theo mã hoặc họ tên..."
- Status Select with options: Tất cả trạng thái, Hoạt động, Không hoạt động, Đã lưu trữ
- Single-status selection (passes array of 0 or 1 to parent)

**MemberRowActions.tsx:**

- Three ghost icon buttons: Eye (Xem chi tiết → detail href), Pencil (Chỉnh sửa → edit href), Trash2 (Xoá → calls onDeleteClick)
- Trash2 button uses `text-destructive hover:text-destructive`

**MemberDeleteDialog.tsx:**

- AlertDialog with title "Xoá thành viên", description includes member fullName
- Cancel: "Quay lại", Confirm: "Xoá" (destructive bg)
- No dependency guard section (members have no children per D-18)

### Task 2 — Evolved members/page.tsx

- Replaced proof card list (Department scope proof badges, card-per-member render) with full enterprise layout
- Header row: "Danh sách thành viên" h1 + "Thêm thành viên" Button → members/new
- Card wrapping MemberListFilters + MemberListTable
- URL state: search, statuses, sort, pageIndex all serialized via serializeDirectoryListState + router.replace
- Delete flow: useDeleteMemberMutation → mutate on confirm → close dialog on success
- MemberDeleteDialog rendered at page level with deletingMember state

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed incorrect sort prop — used normalizedState.sort instead of tableState.sort**

- **Found during:** Task 2 TypeScript check
- **Issue:** Plan spec referenced `tableState.sort` but `buildDirectoryTableState` returns `DirectoryTableState` which has `sorting` (TanStack `{ id, desc }[]` format) not `sort`. MemberListTable expects `DirectorySort<MemberTableSortField>[]`.
- **Fix:** Pass `normalizedState.sort` directly to the `sort` prop of MemberListTable — same source used in DepartmentListTable analog.
- **Files modified:** page.tsx
- **Commit:** f9d177a

**2. [Rule 3 - Blocking] useDirectoryListNavigation does not exist in features/directory/shared**

- **Found during:** Task 2 implementation
- **Issue:** Plan spec mentioned `useDirectoryListNavigation` hook from `features/directory/shared` but the module only exports parse/serialize/build utilities, no navigation hook.
- **Fix:** Implemented URL navigation inline using `serializeDirectoryListState + router.replace`, matching the established pattern in departments/page.tsx exactly.
- **Files modified:** page.tsx
- **Commit:** f9d177a

## Known Stubs

None — all components are fully wired end-to-end. MemberListFilters reads from URL state and updates it on change. MemberListTable renders real data from useMemberListQuery. MemberDeleteDialog calls useDeleteMemberMutation which executes soft-delete in mock API.

## Threat Flags

No new threat surface beyond the plan's threat model. URL params flow through `parseDirectoryListState` which normalizes and whitelists sort fields (T-04-05 mitigation confirmed). Delete action gated by AlertDialog confirmation (T-04-06 accepted).

## Self-Check: PASSED

- `MemberListTable.tsx` — FOUND (b9cfbd2)
- `MemberListFilters.tsx` — FOUND (b9cfbd2)
- `MemberRowActions.tsx` — FOUND (b9cfbd2)
- `MemberDeleteDialog.tsx` — FOUND (b9cfbd2)
- `members/page.tsx` (evolved) — FOUND (f9d177a)
- `pnpm build` — PASSED (Exit: 0)
- `npx tsc --noEmit` — PASSED (Exit: 0)
- `pnpm lint` — PASSED (Exit: 0)
