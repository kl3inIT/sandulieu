# Roadmap: Sandulieu Enterprise Directory CRUD

## Overview

This roadmap turns the existing brownfield Next.js admin shell into a hierarchy-aware enterprise directory for Organization → Department → Member while preserving the repo’s current layered frontend architecture. The delivery sequence follows the domain’s real dependency chain: first establish stable shared contracts and admin foundations, then ship organizations, then departments within organization scope, then members within the full parent hierarchy, then harden cross-entity admin UX, and finally add auth-ready seams for later Keycloak integration without pulling real auth into v1.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Directory Foundations & Contracts** - Establish shared feature boundaries, backend-shaped mock contracts, and reusable URL/form/table foundations. (completed 2026-04-10)
- [ ] **Phase 2: Organization Management** - Deliver the first complete vertical slice for organization CRUD and guarded lifecycle behavior.
- [ ] **Phase 3: Department Management in Organization Scope** - Add nested department CRUD with organization-qualified navigation, queries, and delete rules.
- [ ] **Phase 4: Member Management & Bulk Operations** - Deliver the deepest hierarchy slice for members, including bulk actions and parent-aware assignment flows.
- [ ] **Phase 5: Cross-Entity Admin UX Consistency** - Make list, detail, badge, breadcrumb, and delete experiences consistent across all directory surfaces.
- [ ] **Phase 6: Auth-Ready Boundary** - Add future-facing auth seams so Keycloak can attach later without rewriting CRUD modules.

## Phase Details

### Phase 1: Directory Foundations & Contracts

**Goal**: The directory foundation supports backend-friendly identifiers, parent-qualified queries, URL-owned list state, and reusable TanStack-based patterns that every CRUD slice can build on.
**Depends on**: Nothing (first phase)
**Requirements**: UX-02, UX-06, UX-07, ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05
**Success Criteria** (what must be TRUE):

1. Directory list pages preserve search, filters, sorting, and pagination in shareable URL query state.
2. Directory create and edit forms use the same TanStack Form validation and submission behavior across entity types.
3. Directory table screens use a consistent TanStack Table pattern that supports server-shaped pagination, sorting, and filtering.
4. Organization, Department, and Member data flows through separate feature modules and shared API/service contracts with stable identifiers and parent-qualified query keys.

**Plans:** 6/6 plans complete
Plans:

- [ ] 01-01-PLAN.md — Shared contracts, stable identifiers, and raw mock API boundaries
- [ ] 01-02-PLAN.md — Shared URL-state, scope, manual table-state, and query-key foundations
- [ ] 01-03-PLAN.md — Organization and department feature skeletons with query-service boundaries
- [ ] 01-04-PLAN.md — Member feature skeleton with full parent-qualified query boundaries
- [ ] 01-05-PLAN.md — TanStack Form proof and route-level URL/scope consumption proof
      **UI hint**: yes

### Phase 2: Organization Management

**Goal**: Admin users can manage organizations end to end with enterprise list, detail, create, edit, and guarded delete behavior.
**Depends on**: Phase 1
**Requirements**: ORG-01, ORG-02, ORG-03, ORG-04, ORG-05, ORG-06, ORG-07, ORG-08, ORG-09, ORG-10, ORG-11
**Success Criteria** (what must be TRUE):

1. User can browse organizations in a paginated, sortable table and narrow results by search and status.
2. User can create and edit an organization with required validation, including a stable code/slug separate from the display name.
3. User can open an organization detail page that shows summary fields, status, and related department context.
4. User can delete an organization only through a guarded confirmation flow, and the UI explains when child departments block deletion.
   **Plans**: TBD
   **UI hint**: yes

### Phase 3: Department Management in Organization Scope

**Goal**: Admin users can manage departments within organization context without losing parent visibility in routes, lists, details, or delete rules.
**Depends on**: Phase 2
**Requirements**: DEPT-01, DEPT-02, DEPT-03, DEPT-04, DEPT-05, DEPT-06, DEPT-07, DEPT-08, DEPT-09, DEPT-10, DEPT-11
**Success Criteria** (what must be TRUE):

1. User can browse departments in a paginated, sortable table that respects organization scope and supports search and status filtering.
2. User can create and edit a department under a specific organization with required validation and a stable code/slug separate from the display name.
3. User can open a department detail page that shows its parent organization context, current status, and related member summary.
4. User can delete a department only through a guarded confirmation flow, and the UI explains when child members block deletion.
   **Plans**: TBD
   **UI hint**: yes

### Phase 4: Member Management & Bulk Operations

**Goal**: Admin users can manage members within the full organization and department hierarchy, including parent-aware assignment, status handling, and bulk operations.
**Depends on**: Phase 3
**Requirements**: MEM-01, MEM-02, MEM-03, MEM-04, MEM-05, MEM-06, MEM-07, MEM-08, MEM-09, MEM-10, MEM-11, MEM-12
**Success Criteria** (what must be TRUE):

1. User can browse members in a paginated, sortable table scoped by organization and department, with search and status filters.
2. User can create and edit a member under a specific department while preserving the correct organization → department relationship.
3. User can open a member detail page that clearly shows the full parent hierarchy and current status.
4. User can delete a member through a guarded confirmation flow and receive clear success or failure feedback for destructive actions.
5. User can select multiple members and run supported bulk actions with per-operation feedback.
   **Plans**: TBD
   **UI hint**: yes

### Phase 5: Cross-Entity Admin UX Consistency

**Goal**: The directory feels like one coherent admin product across organizations, departments, and members rather than three isolated CRUD screens.
**Depends on**: Phase 4
**Requirements**: UX-01, UX-03, UX-04, UX-05
**Success Criteria** (what must be TRUE):

1. User sees the same enterprise table controls, row actions, and empty-state behavior across organization, department, and member lists.
2. User can navigate detail screens with consistent breadcrumbs and parent-child context across the full hierarchy.
3. User sees status badges rendered consistently across list and detail pages for every entity type.
4. User encounters the same confirmation and dependency-summary pattern whenever deleting any directory entity.
   **Plans**: TBD
   **UI hint**: yes

### Phase 6: Auth-Ready Boundary

**Goal**: The CRUD architecture is ready for future server-side Keycloak integration without leaking auth concerns into feature modules.
**Depends on**: Phase 5
**Requirements**: ARCH-06, ARCH-07
**Success Criteria** (what must be TRUE):

1. Directory feature code can operate without direct knowledge of client secrets, token plumbing, or browser-primary Keycloak assumptions.
2. Session and auth-adjacent domain types exist so a later OIDC integration can attach to the CRUD boundaries without reshaping entity modules.
3. The app has a clear auth integration seam for future protected-route and permission behavior without coupling it to current mock CRUD delivery.
   **Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 2 → 2.1 → 2.2 → 3 → 3.1 → 4

| Phase                                          | Plans Complete | Status      | Completed  |
| ---------------------------------------------- | -------------- | ----------- | ---------- |
| 1. Directory Foundations & Contracts           | 6/6            | Complete    | 2026-04-10 |
| 2. Organization Management                     | 0/TBD          | Not started | -          |
| 3. Department Management in Organization Scope | 0/TBD          | Not started | -          |
| 4. Member Management & Bulk Operations         | 0/TBD          | Not started | -          |
| 5. Cross-Entity Admin UX Consistency           | 0/TBD          | Not started | -          |
| 6. Auth-Ready Boundary                         | 0/TBD          | Not started | -          |
