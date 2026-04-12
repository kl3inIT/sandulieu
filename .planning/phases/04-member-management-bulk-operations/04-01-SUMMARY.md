---
phase: "04"
plan: "01"
subsystem: members
tags:
  [
    api,
    service,
    query-hooks,
    mutations,
    bulk-operations,
    soft-delete,
    cache-invalidation,
  ]
dependency_graph:
  requires: []
  provides:
    - shared/api/member.api.ts — full CRUD + bulk API with soft-delete and parentContext
    - features/members/member.types.ts — MemberMutationPayload, MemberDeleteResult, BulkUpdateMemberStatusResult, MemberDetailResponse with parentContext
    - features/members/member.service.ts — createMember, updateMember, deleteMember, bulkUpdateMemberStatus
    - features/members/member.query-options.ts — departmentLists scoped invalidation key
    - features/members/member.query-hooks.ts — 4 mutation hooks with parent-qualified cache invalidation
    - shared/model/member.model.ts — MemberParentContextModel
  affects:
    - All Wave 2 and Wave 3 member UI plans depend on these mutation boundaries
tech_stack:
  added: []
  patterns:
    - Structural analog of department feature layer (same layering, same cache invalidation pattern)
    - Soft-delete via deletedAt field — mirrors department.api.ts pattern
    - departmentLists(organizationId, departmentId) scoped cache invalidation key — per D-28
    - Parent-qualified cache invalidation to prevent cross-department contamination — T-04-03
key_files:
  created: []
  modified:
    - shared/api/member.api.ts
    - shared/model/member.model.ts
    - features/members/member.types.ts
    - features/members/member.service.ts
    - features/members/member.query-options.ts
    - features/members/member.query-hooks.ts
decisions:
  - Member cache invalidation uses departmentLists(organizationId, departmentId) key to prevent cross-department cache contamination
  - deleteMemberApi performs soft-delete (sets deletedAt) instead of hard deletion — consistent with department pattern
  - bulkUpdateMemberStatusApi accepts memberIds without scope argument — member IDs are globally unique in mock data
metrics:
  duration: ~25min
  completed: "2026-04-12"
  tasks_completed: 2
  files_modified: 6
---

# Phase 04 Plan 01: Member Data Layer Mutations Summary

**One-liner:** Full CRUD + bulk mutation API/service/hooks for members with soft-delete, parentContext enrichment, and department-scoped cache invalidation.

## Tasks Completed

| Task | Name                                                                               | Commit  | Files                                                       |
| ---- | ---------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------- |
| 1    | Extend member API with mutation functions and richer detail response               | 04c866c | shared/api/member.api.ts                                    |
| 2    | Extend member types, service, query-options, and query-hooks with mutation support | 7d3967e | shared/model/member.model.ts, features/members/\* (5 files) |

## What Was Built

### Task 1 — shared/api/member.api.ts

- Changed `MEMBERS` from `const` to `let` to support in-memory mutations
- Added `deletedAt?: string` to `MemberApiResponse` for soft-delete tracking
- `getMembersApi` now filters out soft-deleted records (`!member.deletedAt`)
- `getMemberByIdApi` now returns `MemberDetailApiResponse` with `parentContext` resolved from `ORGANIZATION_DIRECTORY` and `DEPARTMENT_DIRECTORY` lookup maps
- Added new API response/input types: `MemberParentContextApiResponse`, `MemberDetailApiResponse`, `MemberCreateApiInput`, `MemberUpdateApiInput`, `DeleteMemberApiResponse`, `BulkUpdateMemberStatusApiInput`, `BulkUpdateMemberStatusItemResult`, `BulkUpdateMemberStatusApiResponse`
- Added `createMemberApi` — appends member, validates memberCode uniqueness within department
- Added `updateMemberApi` — finds by id+scope, updates fields in place, returns enriched detail
- Added `deleteMemberApi` — sets `deletedAt`, returns `DeleteMemberApiResponse`
- Added `bulkUpdateMemberStatusApi` — processes each memberId, returns per-member success/failure results

### Task 2 — Feature Layer

- `shared/model/member.model.ts`: Added `MemberParentContextModel` with 7 fields (organizationId, organizationName, departmentId, departmentName, 3 navigation paths)
- `features/members/member.types.ts`: Added `MemberMutationPayload`, `MemberDeleteResult`, `BulkUpdateMemberStatusResult`, `MemberDetailApiContract`; updated `MemberDetailResponse` to `MemberModel & { parentContext: MemberParentContextModel }`
- `features/members/member.service.ts`: Added `mapMemberParentContext`, `mapMemberDetail`; added `createMember`, `updateMember`, `deleteMember`, `bulkUpdateMemberStatus` service functions
- `features/members/member.query-options.ts`: Added `departmentLists(organizationId, departmentId)` key for scoped invalidation
- `features/members/member.query-hooks.ts`: Added `useCreateMemberMutation`, `useUpdateMemberMutation`, `useDeleteMemberMutation`, `useBulkUpdateMemberStatusMutation` — all with parent-qualified `departmentLists` cache invalidation

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all mutation functions are wired end-to-end through the mock API layer. No placeholder data or hardcoded empty values were introduced.

## Threat Flags

No new threat surface beyond what the plan's threat model covers. `departmentLists` invalidation key correctly scopes to both `organizationId` and `departmentId` per T-04-03 mitigation.

## Self-Check: PASSED

- `shared/api/member.api.ts` — FOUND (04c866c)
- `shared/model/member.model.ts` — FOUND (7d3967e)
- `features/members/member.types.ts` — FOUND (7d3967e)
- `features/members/member.service.ts` — FOUND (7d3967e)
- `features/members/member.query-options.ts` — FOUND (7d3967e)
- `features/members/member.query-hooks.ts` — FOUND (7d3967e)
- `pnpm build` — PASSED (Exit: 0)
- `pnpm exec tsc --noEmit` — PASSED (Exit: 0)
- `pnpm lint` — PASSED (Exit: 0)
