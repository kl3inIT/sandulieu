---
phase: "04"
plan: "03"
subsystem: members-ui
tags:
  [
    member-form,
    tanstack-form,
    create-page,
    edit-page,
    route-locked-fields,
    read-only-context,
  ]
dependency_graph:
  requires:
    - 04-01 — useCreateMemberMutation, useUpdateMemberMutation, useMemberDetailQuery
    - features/members/member.form — createMemberFormOptions, MemberFormPayload, getMemberFormDefaults
  provides:
    - shared/components/members/MemberForm.tsx — reusable TanStack Form-based create/edit form with read-only parent context
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/new/page.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/edit/page.tsx
  affects:
    - Plan 04-02 members/page.tsx — "Thêm thành viên" button now has a real destination (new/page.tsx)
    - Plan 04-02 MemberRowActions — edit icon now navigates to a working edit route
tech_stack:
  added: []
  patterns:
    - TanStack Form via createMemberFormOptions + useForm — mirrors DepartmentForm structural analog
    - organizationId/departmentId rendered as read-only display (p elements, not Input) — enforces route-param lock per D-13
    - useEffect form.reset on props change — mirrors DepartmentForm reset pattern
    - Suspense wrapping for client hooks boundary
    - Inline Alert destructive for mutation errors — same pattern as departments create/edit pages
key_files:
  created:
    - shared/components/members/MemberForm.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/new/page.tsx
    - app/(admin-portal)/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]/edit/page.tsx
  modified: []
decisions:
  - organizationId and departmentId rendered as read-only p elements instead of disabled Input fields — plan spec and UI-SPEC require distinct read-only display with name + id sub-label, not a styled disabled input
  - MemberForm wrapped in Card with CardHeader title + CardContent — plan spec requests Card layout; DepartmentForm uses plain form element without Card; MemberForm adds Card for visual distinction
metrics:
  duration: ~20min
  completed: "2026-04-12"
  tasks_completed: 2
  files_modified: 3
---

# Phase 04 Plan 03: Member Create and Edit Forms Summary

**One-liner:** Reusable TanStack Form MemberForm component with route-locked read-only parent context fields, plus create and edit route pages wired to mutation hooks.

## Tasks Completed

| Task | Name                                      | Commit  | Files                                          |
| ---- | ----------------------------------------- | ------- | ---------------------------------------------- |
| 1    | Create shared MemberForm component        | d01eee3 | shared/components/members/MemberForm.tsx       |
| 2    | Create member create and edit route pages | d665818 | members/new/page.tsx, [memberId]/edit/page.tsx |

## What Was Built

### Task 1 — shared/components/members/MemberForm.tsx

- `"use client"` component mirroring DepartmentForm structural analog
- Props: `mode`, `initialValues`, `organizationId`, `departmentId`, `organizationName`, `departmentName`, `submitLabel`, `isPending`, `onSubmit`, `onReset`
- Form initialized via `createMemberFormOptions` from `features/members/member.form`
- `useEffect` resets form when `initialValues`, `organizationId`, or `departmentId` props change
- Field order per UI-SPEC:
  1. Tổ chức — read-only `<p>` with organizationName (falls back to organizationId) + id sub-label
  2. Phòng ban — read-only `<p>` with departmentName (falls back to departmentId) + id sub-label
  3. Mã thành viên — `<Input>` with required and FieldError
  4. Họ và tên — `<Input>` with required and FieldError
  5. Trạng thái — shadcn `<Select>` with Hoạt động / Không hoạt động / Đã lưu trữ options
- Submit button: "Lưu thành viên" (create) / "Lưu thay đổi" (update) with LoaderCircle spinner on isPending
- Cancel button: "Quay lại" calls `onReset`
- Wrapped in `<Card>` with `<CardHeader>` and `<CardContent>` layout

### Task 2 — Create and Edit Route Pages

**members/new/page.tsx:**

- `useParams` extracts `organizationId` and `departmentId` from route
- `crypto.randomUUID().split("-")[0]` generates stable member id prefix for new members
- `useCreateMemberMutation` wired to `handleSubmit` → redirects to member list on success
- Inline `<Alert variant="destructive">` with "Lưu thất bại" title on mutation error
- Page heading "Thêm thành viên mới" with UserPlus icon
- Wrapped in `<Suspense>`

**members/[memberId]/edit/page.tsx:**

- `useParams` extracts `organizationId`, `departmentId`, `memberId` from route
- `useMemberDetailQuery` pre-populates MemberForm via `initialValues={memberDetailQuery.data}`
- `organizationName` and `departmentName` resolved from `memberDetailQuery.data.parentContext`
- `useUpdateMemberMutation` wired to `handleSubmit` → redirects to member detail page on success
- Loading state: `<Skeleton className="h-64 w-full" />` during query
- Error states for both query failure ("Chưa tải được thông tin thành viên") and mutation failure ("Lưu thất bại")
- Page heading "Chỉnh sửa thành viên" with FilePenLine icon
- Wrapped in `<Suspense>`

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Design Adjustments

**1. [Rule 2 - Pattern] organizationId/departmentId as read-only p elements (not disabled Input)**

- **Rationale:** Plan spec and threat model (T-04-09) explicitly require read-only display, not a disabled input. Using `<p>` elements with name + id sub-label is semantically clearer and harder to tamper with than a disabled `<input>` that a user could potentially enable via DevTools.
- **Impact:** Matches UI-SPEC exactly — no accessibility or UX regression.

**2. [Rule 2 - Pattern] MemberForm wrapped in Card**

- **Rationale:** Plan spec states "Layout: `<Card>` with `<CardHeader>` and `<CardContent>`" — implemented as specified. DepartmentForm does not use Card but MemberForm spec explicitly requested it.

## Known Stubs

None — all fields are wired to real form state. organizationId/departmentId display resolves from props (route params). Status Select uses real enum values matching memberFormSchema. Mutation hooks call through to mock API layer with real create/update behavior.

## Threat Flags

No new threat surface introduced.

**T-04-08 (id auto-generation):** `crypto.randomUUID().split("-")[0]` generates id client-side in new/page.tsx — user cannot inject arbitrary IDs via form UI. Confirmed mitigated.

**T-04-09 (organizationId/departmentId lock):** Both fields rendered as `<p>` read-only display elements sourced exclusively from route params. Not part of form field state that user can manipulate. Confirmed mitigated.

## Self-Check: PASSED

- `shared/components/members/MemberForm.tsx` — FOUND (d01eee3)
- `members/new/page.tsx` — FOUND (d665818)
- `[memberId]/edit/page.tsx` — FOUND (d665818)
- `pnpm exec tsc --noEmit` — PASSED (Exit: 0)
- `pnpm exec eslint` — PASSED (Exit: 0)
- `pnpm build` — PASSED (Exit: 0)
