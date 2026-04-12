---
phase: "04"
plan: "05"
subsystem: members-ui-bulk
tags:
  [
    bulk-operations,
    checkbox,
    multi-select,
    status-picker,
    inline-feedback,
    vietnamese-copy,
  ]
dependency_graph:
  requires:
    - 04-01 — useBulkUpdateMemberStatusMutation, BulkUpdateMemberStatusResult
    - 04-02 — MemberListTable (extended with checkbox column)
  provides:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberBulkActionBar.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx (extended)
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx (extended)
    - shared/components/ui/checkbox.tsx
  affects:
    - MemberListTable now requires selectedIds + onSelectionChange props from consumers
tech_stack:
  added:
    - "@radix-ui/react-checkbox (via shadcn checkbox component)"
  patterns:
    - Checkbox column as first column with indeterminate header state — per UI-SPEC column order
    - MemberBulkActionBar rendered null when selectedCount === 0 (hidden state via conditional return)
    - Three-state BulkFeedbackAlert (all-success / partial / all-fail) with Vietnamese copy
    - Bulk mutation via mutateAsync pattern — awaits result then sets feedback state
    - handleSelectionChange clears feedback on deselect-all
key_files:
  created:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberBulkActionBar.tsx
    - shared/components/ui/checkbox.tsx
  modified:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/_components/MemberListTable.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/page.tsx
decisions:
  - Loading skeleton rows now render a proper Table structure with 6 columns to match the new checkbox column — improves visual consistency during loading state
  - BulkFeedbackAlert uses Alert (default, not destructive) for partial fail — per UI-SPEC "Alert default green/Alert default/Alert destructive" state table
metrics:
  duration: ~20min
  completed: "2026-04-12"
  tasks_completed: 2
  files_modified: 4
---

# Phase 04 Plan 05: Bulk Operations — Checkbox Selection and BulkActionBar Summary

**One-liner:** Checkbox multi-select column added to MemberListTable with indeterminate header, MemberBulkActionBar with status picker and three-state Vietnamese feedback Alert, all wired via useBulkUpdateMemberStatusMutation in members/page.tsx.

## Tasks Completed

| Task | Name                                                                                      | Commit  | Files                                                                  |
| ---- | ----------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| 1    | Install Checkbox, extend MemberListTable with checkbox column, create MemberBulkActionBar | c01ccf2 | checkbox.tsx (new), MemberListTable.tsx, MemberBulkActionBar.tsx (new) |
| 2    | Wire bulk selection state and useBulkUpdateMemberStatusMutation in members/page.tsx       | 7d291b5 | page.tsx                                                               |

## What Was Built

### Task 1 — Checkbox + MemberListTable extension + MemberBulkActionBar

**shared/components/ui/checkbox.tsx (installed via shadcn CLI):**

- Installed `pnpm dlx shadcn@latest add checkbox`
- Fixed auto-generated import path from `@/lib/utils` → `@/shared/lib/utils` (Rule 3 — blocking deviation)

**MemberListTable.tsx (extended, not rewritten):**

- Added `selectedIds: string[]` and `onSelectionChange: (ids: string[]) => void` to props type
- Inserted `<TableHead className="w-[40px]">` with `<Checkbox>` as first column in header
- Header checkbox uses three-state `checked` prop: `true` (all selected) / `"indeterminate"` (partial) / `false` (none)
- Each data row gets `<TableCell>` with `<Checkbox>` as first cell with `aria-label="Chọn {fullName}"`
- Loading skeleton updated to render full Table structure with 6 columns matching new schema

**MemberBulkActionBar.tsx (new file):**

- `"use client"` component; returns `null` when `selectedCount === 0`
- Layout: `flex items-center justify-between gap-4 rounded-md border bg-muted px-4 py-3`
- Left: `"{N} thành viên được chọn"` in `text-sm font-semibold`
- Right: `Select` (status picker: Hoạt động/Không hoạt động/Đã lưu trữ) + "Áp dụng" Button + "Bỏ chọn tất cả" Button (ghost)
- `LoaderCircle` spinner shown inside "Áp dụng" when `isApplying`
- Internal `BulkFeedbackAlert` renders below bar with three states:
  - All success: `Alert` default — "Đã cập nhật trạng thái cho {N} thành viên thành công."
  - All fail: `Alert variant="destructive"` — "Không thể cập nhật trạng thái cho {N} thành viên. Vui lòng thử lại."
  - Partial: `Alert` default — "Cập nhật thành công: {S} thành viên. Thất bại: {F} thành viên."

### Task 2 — members/page.tsx wiring

- Added `selectedIds` and `bulkFeedback` state
- Added `bulkMutation = useBulkUpdateMemberStatusMutation(organizationId, departmentId)`
- `handleSelectionChange(ids)`: sets selectedIds, clears feedback when deselecting all
- `handleBulkApply(targetStatus)`: clears feedback, calls `bulkMutation.mutateAsync`, sets result as feedback
- `handleDeselectAll()`: clears both selectedIds and feedback
- `MemberBulkActionBar` inserted between `MemberListFilters` and `MemberListTable` in `CardContent`
- `MemberListTable` now receives `selectedIds` and `onSelectionChange={handleSelectionChange}`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed checkbox.tsx import path**

- **Found during:** Task 1 TypeScript check
- **Issue:** shadcn CLI generated `import { cn } from "@/lib/utils"` but this repo uses `@/shared/lib/utils` path alias
- **Fix:** Changed import to `@/shared/lib/utils` — consistent with all other shadcn components in the repo
- **Files modified:** shared/components/ui/checkbox.tsx
- **Commit:** c01ccf2

**2. [Rule 2 - Enhancement] Loading skeleton upgraded to full Table structure**

- **Found during:** Task 1 implementation
- **Issue:** Original loading skeleton used plain `<Skeleton>` rows in `CardContent`. After adding a checkbox column, the table now has 6 columns. Updated skeleton to render a proper `<Table>` with matching header and skeleton rows for visual consistency during loading.
- **Files modified:** MemberListTable.tsx
- **Commit:** c01ccf2

## Known Stubs

None — all components are fully wired end-to-end. Checkbox selection flows through `onSelectionChange` to page state. `handleBulkApply` calls `bulkMutation.mutateAsync` which executes through `bulkUpdateMemberStatus` service → `bulkUpdateMemberStatusApi` mock. Feedback state renders real result counts.

## Threat Flags

**T-04-16 (targetStatus from Select) — mitigate confirmed:** `DirectoryStatus` TypeScript type constrains the value. `setTargetStatus(v as DirectoryStatus)` is typed. Select options are hardcoded strings matching the enum — no free-text entry path.

No new threat surface beyond the plan's threat model.

## Self-Check: PASSED

- `shared/components/ui/checkbox.tsx` — FOUND (c01ccf2)
- `MemberListTable.tsx` (checkbox column) — FOUND (c01ccf2)
- `MemberBulkActionBar.tsx` — FOUND (c01ccf2)
- `members/page.tsx` (bulk wiring) — FOUND (7d291b5)
- `pnpm exec tsc --noEmit` — PASSED (Exit: 0)
- `pnpm exec eslint` — PASSED (Exit: 0)
- `pnpm build` — PASSED (Exit: 0)
