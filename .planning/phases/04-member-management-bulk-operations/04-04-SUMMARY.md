---
phase: "04"
plan: "04"
subsystem: members-ui
tags:
  [
    member-detail,
    summary-card,
    parent-hierarchy,
    delete-dialog,
    soft-delete,
    status-badge,
  ]
dependency_graph:
  requires:
    - 04-01 — useMemberDetailQuery, useDeleteMemberMutation, MemberDetailResponse with parentContext
    - shared/components/directory/SummaryField
    - shared/components/directory/DirectoryStatusBadge
  provides:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/_components/MemberDetailSummary.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/page.tsx
  affects:
    - Plan 04-02 MemberRowActions — Eye (Xem chi tiết) icon now navigates to a working detail route
    - Plan 04-03 edit/page.tsx — "Chỉnh sửa" button on detail page links to the working edit route
tech_stack:
  added: []
  patterns:
    - SummaryField grid layout — mirrors DepartmentDetailSummary structural analog
    - DirectoryStatusBadge for status field — consistent with department detail
    - AlertDialog for delete confirmation from detail page — consistent with Plan 02 list delete pattern
    - Suspense boundary wrapping client hooks — same pattern as edit/page.tsx in Plan 03
    - useMemberDetailQuery + useDeleteMemberMutation wired to page — same hook composition as edit page
key_files:
  created:
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/_components/MemberDetailSummary.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/page.tsx
  modified: []
decisions:
  - MemberDetailSummary uses CardContent with pt-4 (no CardHeader) — plan spec calls for a plain grid card, not a titled card; DepartmentDetailSummary has CardHeader but plan spec explicitly lists just the 6 fields in a grid
metrics:
  duration: ~15min
  completed: "2026-04-12"
  tasks_completed: 1
  files_modified: 2
---

# Phase 04 Plan 04: Member Detail Page Summary

**One-liner:** Member detail page with 6-field SummaryField grid showing full parent hierarchy context, DirectoryStatusBadge status, and guarded soft-delete via AlertDialog directly from the detail view.

## Tasks Completed

| Task | Name                                                        | Commit  | Files                                        |
| ---- | ----------------------------------------------------------- | ------- | -------------------------------------------- |
| 1    | Create MemberDetailSummary component and member detail page | 7463f03 | MemberDetailSummary.tsx, [memberId]/page.tsx |

## What Was Built

### Task 1 — Two new files

**MemberDetailSummary.tsx:**

- `"use client"` component with `MemberDetailSummaryProps` typed as `{ member: MemberDetailResponse }`
- Card with `CardContent className="pt-4"` containing a `grid gap-4 sm:grid-cols-2` layout
- 6 SummaryField entries in order per UI-SPEC:
  1. "ID ổn định" — `<code className="font-mono text-xs">{member.id}</code>`
  2. "Mã thành viên" — `<span className="font-semibold">{member.memberCode}</span>`
  3. "Họ và tên" — `<span className="font-semibold">{member.fullName}</span>`
  4. "Trạng thái" — `<DirectoryStatusBadge status={member.status} />`
  5. "Tổ chức cha" — `member.parentContext.organizationName` (plain text)
  6. "Phòng ban cha" — `member.parentContext.departmentName` (plain text)

**[memberId]/page.tsx:**

- `"use client"` component wrapped in `<Suspense>` boundary with skeleton fallback
- `useParams` extracts `organizationId`, `departmentId`, `memberId` from route
- `useMemberDetailQuery` wired; loading returns `<Skeleton className="h-64 w-full rounded-lg" />`
- Error state returns `<Alert variant="destructive">` with Vietnamese copy
- Data state: `<h1>Chi tiết thành viên</h1>` + `<MemberDetailSummary>` + 3-button action row
- Action buttons: "Quay lại danh sách" (outline, Link to manageMembersPath), "Chỉnh sửa" (default, Link to edit route), "Xoá" (destructive, opens AlertDialog)
- `useDeleteMemberMutation` wired: `handleDeleteConfirm` calls `mutateAsync(memberId)` then redirects to `manageMembersPath`
- AlertDialog with title "Xoá thành viên", member fullName in description, "Quay lại" cancel and "Xoá" confirm (disabled while isPending)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all fields render real data from `useMemberDetailQuery`. parentContext resolves organizationName and departmentName from the mock API layer. Delete flow calls through `useDeleteMemberMutation` to `deleteMemberApi` which performs real soft-delete in mock store.

## Threat Flags

No new threat surface beyond the plan's threat model.

**T-04-11 (route param → getMemberByIdApi):** Route param flows to `useMemberDetailQuery` which scopes lookup to organizationId + departmentId + memberId. Confirmed no cross-scope access risk in mock layer.

**T-04-12 (Delete from detail page):** AlertDialog provides UX confirmation guard. Soft-delete (sets deletedAt) — data remains in mock store. Confirmed accepted mitigation.

**T-04-13 (parentContext fields):** Non-sensitive directory hierarchy metadata displayed consistently with department detail pattern. Confirmed accepted.

## Self-Check: PASSED

- `MemberDetailSummary.tsx` — FOUND (7463f03)
- `[memberId]/page.tsx` — FOUND (7463f03)
- `pnpm build` — PASSED (Exit: 0)
- `pnpm exec tsc --noEmit` — PASSED (Exit: 0)
- `pnpm exec eslint` — PASSED (Exit: 0)
