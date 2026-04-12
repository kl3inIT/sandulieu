---
phase: 04-member-management-bulk-operations
verified: 2026-04-12T10:00:00Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Truy cập /admin/organizations/org-acme/departments/dept-acme-sales/members — kiểm tra table hiển thị đúng dữ liệu thành viên, tìm kiếm 'NV-001' lọc về 1 hàng, filter 'Không hoạt động' chỉ hiển thị thành viên inactive"
    expected: "Table có dữ liệu thực từ mock MEMBERS array, search và status filter phản ánh trong URL query params"
    why_human: "Cần browser để xác minh URL state cập nhật đúng và table hiển thị đúng visual response khi filter/sort thay đổi"
  - test: "Truy cập .../members/new — điền memberCode rỗng rồi submit, sau đó điền đầy đủ và submit"
    expected: "Lỗi validation inline tiếng Việt xuất hiện khi rỗng; khi submit hợp lệ, thành viên mới xuất hiện trong danh sách"
    why_human: "Form validation behavior và redirect flow cần xác minh thủ công trên browser"
  - test: "Truy cập .../members/[memberId] — kiểm tra summary card hiển thị đủ 6 trường, bao gồm Tổ chức cha và Phòng ban cha"
    expected: "parentContext.organizationName và parentContext.departmentName hiển thị tên thực, không phải ID"
    why_human: "Cần xác minh giá trị runtime được resolve đúng từ ORGANIZATION_DIRECTORY và DEPARTMENT_DIRECTORY trong mock API"
  - test: "Từ trang detail, click Xoá — confirm dialog xuất hiện, nhấn Xoá — thành viên bị xóa mềm và redirect về danh sách"
    expected: "Thành viên không còn trong danh sách sau khi xóa; deletedAt được set"
    why_human: "Kiểm tra luồng xóa end-to-end, bao gồm redirect và danh sách refresh sau mutation"
  - test: "Từ danh sách, chọn nhiều hàng bằng checkbox — MemberBulkActionBar xuất hiện, chọn 'Không hoạt động', click Áp dụng"
    expected: "Alert feedback xuất hiện với số lượng thành viên cập nhật thành công; status badges trong table cập nhật"
    why_human: "Cần xác minh indeterminate checkbox state, bulk feedback Alert render đúng 3 trạng thái, cache invalidation làm list refresh"
---

# Phase 04: Member Management & Bulk Operations — Verification Report

**Phase Goal:** Admin users can manage members within the full organization and department hierarchy, including parent-aware assignment, status handling, and bulk operations.
**Verified:** 2026-04-12T10:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                                                              | Status     | Evidence                                                                                                                                                                                                                           |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | User can browse members in a paginated, sortable table scoped by organization and department, with search and status filters       | ✓ VERIFIED | `MemberListTable.tsx` có column sortable, `MemberListFilters.tsx` có search + status Select, `page.tsx` wire URL state qua `parseDirectoryListState` + `serializeDirectoryListState`                                               |
| 2   | User can create and edit a member under a specific department while preserving the correct organization → department relationship  | ✓ VERIFIED | `new/page.tsx` dùng `useCreateMemberMutation`; `edit/page.tsx` dùng `useUpdateMemberMutation` + `useMemberDetailQuery`; `MemberForm.tsx` render organizationId/departmentId dưới dạng read-only `<p>`                              |
| 3   | User can open a member detail page that clearly shows the full parent hierarchy and current status                                 | ✓ VERIFIED | `MemberDetailSummary.tsx` có 6 SummaryField bao gồm "Tổ chức cha" (`parentContext.organizationName`) và "Phòng ban cha" (`parentContext.departmentName`); `DirectoryStatusBadge` dùng cho status                                   |
| 4   | User can delete a member through a guarded confirmation flow and receive clear success or failure feedback for destructive actions | ✓ VERIFIED | `MemberDeleteDialog.tsx` (AlertDialog xác nhận) wired `useDeleteMemberMutation` cả ở `page.tsx` (list) lẫn `[memberId]/page.tsx` (detail); inline `Alert` cho mutation error                                                       |
| 5   | User can select multiple members and run supported bulk actions with per-operation feedback                                        | ✓ VERIFIED | `MemberListTable.tsx` có checkbox column (first column, indeterminate header); `MemberBulkActionBar.tsx` có status picker, "Áp dụng", "Bỏ chọn tất cả"; feedback Alert 3 trạng thái (all-success/partial/all-fail) bằng tiếng Việt |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact                                                         | Expected                                                                                      | Status     | Details                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shared/api/member.api.ts`                                       | Full CRUD + bulk API với soft-delete và parentContext                                         | ✓ VERIFIED | `createMemberApi`, `updateMemberApi`, `deleteMemberApi`, `bulkUpdateMemberStatusApi` tồn tại; `let MEMBERS` (đã đổi từ const); `deletedAt` filter trong `getMembersApi`; `MemberDetailApiResponse` với `parentContext`; `BulkUpdateMemberStatusApiResponse` |
| `features/members/member.types.ts`                               | MemberMutationPayload, MemberDeleteResult, BulkUpdateMemberStatusResult, MemberDetailResponse | ✓ VERIFIED | Tất cả 4 type tồn tại; `MemberDetailResponse = MemberModel & { parentContext: MemberParentContextModel }`                                                                                                                                                   |
| `features/members/member.service.ts`                             | createMember, updateMember, deleteMember, bulkUpdateMemberStatus                              | ✓ VERIFIED | 4 service function, mỗi hàm gọi API tương ứng                                                                                                                                                                                                               |
| `features/members/member.query-options.ts`                       | departmentLists(organizationId, departmentId) key                                             | ✓ VERIFIED | `departmentLists: (organizationId, departmentId) => [...]` tồn tại ở dòng 15                                                                                                                                                                                |
| `features/members/member.query-hooks.ts`                         | 4 mutation hooks với parent-qualified cache invalidation                                      | ✓ VERIFIED | `useCreateMemberMutation`, `useUpdateMemberMutation`, `useDeleteMemberMutation`, `useBulkUpdateMemberStatusMutation`; tất cả invalidate `memberQueryKeys.departmentLists(organizationId, departmentId)`                                                     |
| `shared/model/member.model.ts`                                   | MemberParentContextModel                                                                      | ✓ VERIFIED | `export type MemberParentContextModel` tồn tại                                                                                                                                                                                                              |
| `app/.../members/_components/MemberListTable.tsx`                | Enterprise table với checkbox, sortable headers, pagination                                   | ✓ VERIFIED | `Checkbox` import, `selectedIds`/`onSelectionChange` props, `DirectoryStatusBadge`, "Trang trước"/"Trang sau" pagination                                                                                                                                    |
| `app/.../members/_components/MemberListFilters.tsx`              | Search input + status Select wired to URL state                                               | ✓ VERIFIED | `onSearchChange`/`onStatusChange` props; placeholder "Tìm theo mã hoặc họ tên..."; Select với 4 options                                                                                                                                                     |
| `app/.../members/_components/MemberRowActions.tsx`               | Ba ghost icon buttons: Eye, Pencil, Trash2                                                    | ✓ VERIFIED | aria-label "Xem chi tiết", "Chỉnh sửa", "Xoá"; Trash2 gọi `onDeleteClick(member)`                                                                                                                                                                           |
| `app/.../members/_components/MemberDeleteDialog.tsx`             | AlertDialog soft-delete xác nhận                                                              | ✓ VERIFIED | Title "Xoá thành viên"; "Quay lại" cancel; "Xoá" confirm                                                                                                                                                                                                    |
| `app/.../members/_components/MemberBulkActionBar.tsx`            | Bulk action toolbar với status picker và 3-state feedback                                     | ✓ VERIFIED | `{N} thành viên được chọn`; Select status picker; "Áp dụng"/"Bỏ chọn tất cả"; `BulkFeedbackAlert` với 3 trạng thái tiếng Việt; returns `null` khi `selectedCount === 0`                                                                                     |
| `app/.../members/page.tsx`                                       | Enterprise list page evolved (proof card list đã xóa)                                         | ✓ VERIFIED | Import và wire tất cả 4 components + MemberBulkActionBar; `Danh sách thành viên` h1; "Thêm thành viên" button; URL state wired; không còn proof card artifacts                                                                                              |
| `shared/components/members/MemberForm.tsx`                       | TanStack Form create/edit form với read-only parent context                                   | ✓ VERIFIED | `createMemberFormOptions`; organizationName/departmentName as `<p>` read-only; "Lưu thành viên"/"Lưu thay đổi"; "Quay lại"; 3 status options tiếng Việt                                                                                                     |
| `app/.../members/new/page.tsx`                                   | Create member route wiring useCreateMemberMutation                                            | ✓ VERIFIED | `useCreateMemberMutation`; "Thêm thành viên mới" h1; "Lưu thất bại" error Alert                                                                                                                                                                             |
| `app/.../members/[memberId]/edit/page.tsx`                       | Edit member route wiring useUpdateMemberMutation + useMemberDetailQuery                       | ✓ VERIFIED | `useUpdateMemberMutation` + `useMemberDetailQuery`; "Chỉnh sửa thành viên" h1                                                                                                                                                                               |
| `app/.../members/[memberId]/_components/MemberDetailSummary.tsx` | Summary card với 6 SummaryField và parent hierarchy                                           | ✓ VERIFIED | 6 `SummaryField` calls; `parentContext.organizationName`/`parentContext.departmentName`; `DirectoryStatusBadge`                                                                                                                                             |
| `app/.../members/[memberId]/page.tsx`                            | Detail page wiring useMemberDetailQuery + useDeleteMemberMutation                             | ✓ VERIFIED | `useMemberDetailQuery` + `useDeleteMemberMutation`; "Chi tiết thành viên"; 3 action buttons; AlertDialog delete                                                                                                                                             |
| `shared/components/ui/checkbox.tsx`                              | Shadcn Checkbox component                                                                     | ✓ VERIFIED | File tồn tại (installed via shadcn CLI, import path đã sửa sang `@/shared/lib/utils`)                                                                                                                                                                       |

### Key Link Verification

| From                                     | To                                                                | Via                                                                                  | Status  | Details                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| `features/members/member.query-hooks.ts` | `features/members/member.query-options.ts`                        | `memberQueryKeys.departmentLists(organizationId, departmentId)`                      | ✓ WIRED | Tất cả 4 mutation hooks gọi `memberQueryKeys.departmentLists(...)` cho cache invalidation              |
| `features/members/member.service.ts`     | `shared/api/member.api.ts`                                        | `createMemberApi`, `updateMemberApi`, `deleteMemberApi`, `bulkUpdateMemberStatusApi` | ✓ WIRED | Service import và gọi trực tiếp từng API function                                                      |
| `members/page.tsx`                       | `MemberListTable`                                                 | `renderRowActions` prop truyền `MemberRowActions`                                    | ✓ WIRED | `renderRowActions={(member) => <MemberRowActions .../>}` trong page.tsx dòng 210                       |
| `MemberDeleteDialog`                     | `useDeleteMemberMutation`                                         | `onConfirm` callback                                                                 | ✓ WIRED | `handleDeleteConfirm` gọi `deleteMemberMutation.mutate(deletingMember.id)`                             |
| `members/page.tsx`                       | `parseDirectoryListState` + `serializeDirectoryListState`         | `useSearchParams`                                                                    | ✓ WIRED | Import và sử dụng ở dòng 58, 70-76, 100-102                                                            |
| `new/page.tsx`                           | `useCreateMemberMutation`                                         | `onSubmit` callback                                                                  | ✓ WIRED | `handleSubmit` gọi `createMutation.mutateAsync(values)` rồi redirect                                   |
| `[memberId]/edit/page.tsx`               | `useUpdateMemberMutation` + `useMemberDetailQuery`                | pre-populated form                                                                   | ✓ WIRED | `initialValues={memberDetailQuery.data}`; submit gọi `updateMutation.mutateAsync({memberId, payload})` |
| `MemberForm`                             | `createMemberFormOptions` từ `features/members/member.form`       | `useForm` hook                                                                       | ✓ WIRED | Import `createMemberFormOptions` và gọi trong `useForm(...)`                                           |
| `members/page.tsx`                       | `useBulkUpdateMemberStatusMutation`                               | `MemberBulkActionBar` onApply callback                                               | ✓ WIRED | `handleBulkApply` gọi `bulkMutation.mutateAsync({memberIds: selectedIds, targetStatus})`               |
| `MemberListTable`                        | `selectedIds` state (trong page.tsx)                              | `onSelectionChange` callback prop                                                    | ✓ WIRED | `onSelectionChange={handleSelectionChange}` trong page.tsx dòng 208                                    |
| `MemberBulkActionBar`                    | `BulkUpdateMemberStatusResult`                                    | `bulkResult` prop rendering Alert                                                    | ✓ WIRED | `feedback={bulkFeedback}` prop; `BulkFeedbackAlert` render từ feedback prop                            |
| `[memberId]/page.tsx`                    | `useMemberDetailQuery`                                            | query data feeding `MemberDetailSummary`                                             | ✓ WIRED | `memberDetailQuery.data` truyền vào `<MemberDetailSummary member={...}>`                               |
| `[memberId]/page.tsx`                    | `useDeleteMemberMutation`                                         | Xoá button -> AlertDialog -> mutation                                                | ✓ WIRED | `handleDeleteConfirm` gọi `deleteMutation.mutateAsync(params.memberId)`                                |
| `MemberDetailSummary`                    | `parentContext.organizationName` + `parentContext.departmentName` | `SummaryField` component                                                             | ✓ WIRED | Dòng 35-39 render `member.parentContext.organizationName` và `member.parentContext.departmentName`     |

### Data-Flow Trace (Level 4)

| Artifact                     | Data Variable        | Source                                                   | Produces Real Data                                                                                   | Status    |
| ---------------------------- | -------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------- |
| `MemberListTable.tsx`        | `members` prop       | `memberQuery.data?.items ?? []` trong page.tsx           | Có — `getMembersApi` trả về filtered `MEMBERS` array từ mock store                                   | ✓ FLOWING |
| `MemberDetailSummary.tsx`    | `member` prop        | `memberDetailQuery.data` trong `[memberId]/page.tsx`     | Có — `getMemberByIdApi` resolve `parentContext` từ `ORGANIZATION_DIRECTORY` + `DEPARTMENT_DIRECTORY` | ✓ FLOWING |
| `MemberBulkActionBar.tsx`    | `feedback` prop      | `bulkFeedback` state sau `bulkMutation.mutateAsync(...)` | Có — `bulkUpdateMemberStatusApi` tính `successCount`/`failureCount` từ kết quả thực tế               | ✓ FLOWING |
| `MemberForm.tsx` (edit mode) | `initialValues` prop | `memberDetailQuery.data` từ `useMemberDetailQuery`       | Có — `getMemberByIdApi` trả về member thực từ MEMBERS array                                          | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior                    | Command                                                 | Result                                                                                                                                                         | Status |
| --------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| TypeScript không có lỗi     | `pnpm exec tsc --noEmit`                                | Exit code 0, không có output lỗi                                                                                                                               | ✓ PASS |
| Build production thành công | `pnpm build`                                            | Exit code 0; 4 member routes được build: `/admin/.../members`, `/admin/.../members/[memberId]`, `/admin/.../members/[memberId]/edit`, `/admin/.../members/new` | ✓ PASS |
| Lint các file Phase 04      | `pnpm exec eslint [phase 04 files]`                     | Exit code 0, không có lỗi/warning                                                                                                                              | ✓ PASS |
| Module exports đầy đủ       | `features/members/index.ts` export `*` từ 4 sub-modules | Có 4 export `*` covering hooks, options, service, types                                                                                                        | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan                | Description                                                                            | Status      | Evidence                                                                                                                                 |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| MEM-01      | 04-02                      | User can view paginated table of members within department and organization context    | ✓ SATISFIED | `MemberListTable` + `page.tsx` + `useMemberListQuery` — paginated, scoped                                                                |
| MEM-02      | 04-02                      | User can search members by key fields                                                  | ✓ SATISFIED | `MemberListFilters` search input; `handleSearchChange` -> URL state -> query                                                             |
| MEM-03      | 04-02                      | User can filter members by parent organization, parent department, and status          | ✓ SATISFIED | Status filter trong `MemberListFilters`; scope từ route params (org + dept)                                                              |
| MEM-04      | 04-02                      | User can sort members by defined table columns                                         | ✓ SATISFIED | Sortable headers (memberCode, fullName, status) trong `MemberListTable`; `handleSortChange` -> URL state                                 |
| MEM-05      | 04-01, 04-03               | User can create a member under a specific department with required validation          | ✓ SATISFIED | `new/page.tsx` + `MemberForm` + `useCreateMemberMutation`; form schema validation; read-only org/dept                                    |
| MEM-06      | 04-04                      | User can view a member detail page with parent hierarchy context                       | ✓ SATISFIED | `[memberId]/page.tsx` + `MemberDetailSummary` với "Tổ chức cha" + "Phòng ban cha" từ `parentContext`                                     |
| MEM-07      | 04-01, 04-03               | User can edit a member and persist updated values                                      | ✓ SATISFIED | `edit/page.tsx` + `MemberForm` pre-populated + `useUpdateMemberMutation`                                                                 |
| MEM-08      | 04-01, 04-02, 04-04        | User can soft-delete a member through a guarded confirmation flow                      | ✓ SATISFIED | `MemberDeleteDialog` (list) + AlertDialog (detail) + `useDeleteMemberMutation` -> `deleteMemberApi` (soft-delete với deletedAt)          |
| MEM-09      | 04-01, 04-02, 04-03, 04-04 | Member belongs to exactly one department and one organization through parent hierarchy | ✓ SATISFIED | organizationId + departmentId route-locked (read-only trong form); `parentContext` trong detail; `createDepartmentScope` scope mọi query |
| MEM-10      | 04-01, 04-02, 04-04        | Member has an explicit status field usable in badges and filters                       | ✓ SATISFIED | `DirectoryStatusBadge` trong `MemberListTable` và `MemberDetailSummary`; status Select trong filter và form                              |
| MEM-11      | 04-05                      | User can select multiple members and execute supported bulk actions                    | ✓ SATISFIED | Checkbox column (first column, indeterminate header) + `MemberBulkActionBar` với status picker + `useBulkUpdateMemberStatusMutation`     |
| MEM-12      | 04-05                      | Bulk actions show clear success/failure feedback per operation                         | ✓ SATISFIED | `BulkFeedbackAlert` 3-state: all-success/partial/all-fail với counts tiếng Việt; feedback state cleared khi deselect                     |

### Anti-Patterns Found

| File                      | Line | Pattern                         | Severity | Impact                                                                                                           |
| ------------------------- | ---- | ------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `MemberBulkActionBar.tsx` | 83   | `return null`                   | ℹ️ Info  | Intentional — behavior per UI-SPEC khi `selectedCount === 0`, không phải stub                                    |
| `MemberBulkActionBar.tsx` | 101  | `placeholder="Chọn trạng thái"` | ℹ️ Info  | UI placeholder attribute của shadcn Select, không phải nội dung placeholder; Select có giá trị mặc định "active" |

Không phát hiện TODO/FIXME/HACK/stub pattern nào trong các file Phase 04. Tất cả implementation đều wired end-to-end.

### Human Verification Required

#### 1. Member List — Filter, Sort, Search Behavior

**Test:** Truy cập `/admin/organizations/org-acme/departments/dept-acme-sales/members`. Kiểm tra table có rows. Nhập "NV-001" vào search — kỳ vọng table filter về 1 hàng. Filter status "Không hoạt động" — chỉ inactive members hiện. Sort column "Mã thành viên" — rows reorder và URL cập nhật sort param.
**Expected:** Table phản ánh mock data thực; URL query params cập nhật sau mỗi thay đổi filter/sort; pagination hiển thị số lượng đúng.
**Why human:** Behavior runtime của `parseDirectoryListState`, URL serialization, và table re-render cần xác minh qua browser.

#### 2. Create Member — Form Validation và Redirect

**Test:** Truy cập `.../members/new`. Submit form trống — kỳ vọng inline validation error tiếng Việt. Submit hợp lệ với memberCode unique — kỳ vọng redirect về member list với thành viên mới xuất hiện.
**Expected:** Validation errors inline (không phải toast); redirect về list sau create thành công; thành viên mới có đúng org/dept scope.
**Why human:** Form validation trigger và redirect flow cần xác minh thủ công trong browser.

#### 3. Member Detail — parentContext Name Resolution

**Test:** Truy cập `.../members/member-acme-001`. Kiểm tra "Tổ chức cha" hiển thị "Acme Corporation" (không phải "org-acme") và "Phòng ban cha" hiển thị "Kinh doanh" (không phải "dept-acme-sales").
**Expected:** Tên thực được resolve từ `ORGANIZATION_DIRECTORY` và `DEPARTMENT_DIRECTORY` trong mock API.
**Why human:** Runtime lookup cần xác minh trong browser với dữ liệu thực.

#### 4. Delete Flow — Guarded Confirmation và Feedback

**Test:** Từ list page, click "Xoá" trên một hàng. Xác nhận AlertDialog xuất hiện với tên thành viên. Click "Xoá" — thành viên biến mất khỏi list, dialog đóng. Từ detail page, thử tương tự rồi xác nhận redirect về list.
**Expected:** Soft-delete (deletedAt set, không xóa khỏi array); danh sách cập nhật sau mutation do cache invalidation; không có lỗi sau khi xóa.
**Why human:** End-to-end delete flow (cả từ list và detail) với cache invalidation và redirect cần xác minh visual trong browser.

#### 5. Bulk Operations — Selection, Action Bar, Feedback

**Test:** Chọn 1 row — BulkActionBar xuất hiện với "1 thành viên được chọn". Chọn header checkbox — tất cả rows được chọn, count cập nhật. Chọn status "Không hoạt động", click "Áp dụng" — Alert feedback xuất hiện. Click "Bỏ chọn tất cả" — bar biến mất, feedback cleared.
**Expected:** Indeterminate header checkbox khi chọn một phần; feedback Alert hiển thị đúng 3 trạng thái tùy vào kết quả; table refresh sau bulk mutation.
**Why human:** Indeterminate checkbox visual state và 3-state feedback Alert cần xác minh runtime; cache invalidation làm list refresh cần browser confirmation.

### Gaps Summary

Không có gaps. Tất cả 5 success criteria đã được verified ở code level. Tất cả artifacts tồn tại, có nội dung thực sự (không phải stub), và đều được wired đúng. TypeScript, build, và lint đều pass.

Trạng thái `human_needed` phản ánh rằng 5 hành vi runtime (filter/sort URL state, form validation, parentContext name resolution, delete flow với cache invalidation, bulk operations visual feedback) cần xác minh thủ công trên browser trước khi phase được coi là fully delivered.

---

_Verified: 2026-04-12T10:00:00Z_
_Verifier: Claude (gsd-verifier)_
