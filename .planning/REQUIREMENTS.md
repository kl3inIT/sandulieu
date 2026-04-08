# Requirements: Sandulieu Enterprise Directory CRUD

**Defined:** 2026-04-08
**Core Value:** Deliver a realistic enterprise CRUD foundation that feels production-ready in structure and UX before real backend and identity integration are added.

## v1 Requirements

### Organizations

- [ ] **ORG-01**: User can view a paginated list of organizations in a table
- [ ] **ORG-02**: User can search organizations by name or code
- [ ] **ORG-03**: User can filter organizations by status
- [ ] **ORG-04**: User can sort organizations by defined table columns
- [ ] **ORG-05**: User can create an organization with required fields and validation
- [ ] **ORG-06**: User can view an organization detail page with summary information and related department context
- [ ] **ORG-07**: User can edit an organization and persist updated values
- [ ] **ORG-08**: User can soft-delete an organization through a guarded confirmation flow
- [ ] **ORG-09**: User can see why an organization cannot be deleted when dependent child records still exist
- [ ] **ORG-10**: Organization has a stable code/slug separate from display name
- [ ] **ORG-11**: Organization has an explicit status field usable in badges and filters

### Departments

- [ ] **DEPT-01**: User can view a paginated table of departments within organization context
- [ ] **DEPT-02**: User can search departments by name or code
- [ ] **DEPT-03**: User can filter departments by parent organization and status
- [ ] **DEPT-04**: User can sort departments by defined table columns
- [ ] **DEPT-05**: User can create a department under a specific organization with required validation
- [ ] **DEPT-06**: User can view a department detail page with parent organization context and related member summary
- [ ] **DEPT-07**: User can edit a department and persist updated values
- [ ] **DEPT-08**: User can soft-delete a department through a guarded confirmation flow
- [ ] **DEPT-09**: User can see why a department cannot be deleted when dependent members still exist
- [ ] **DEPT-10**: Department has a stable code/slug separate from display name
- [ ] **DEPT-11**: Department has an explicit status field usable in badges and filters

### Members

- [ ] **MEM-01**: User can view a paginated table of members within department and organization context
- [ ] **MEM-02**: User can search members by key fields
- [ ] **MEM-03**: User can filter members by parent organization, parent department, and status
- [ ] **MEM-04**: User can sort members by defined table columns
- [ ] **MEM-05**: User can create a member under a specific department with required validation
- [ ] **MEM-06**: User can view a member detail page with parent hierarchy context
- [ ] **MEM-07**: User can edit a member and persist updated values
- [ ] **MEM-08**: User can soft-delete a member through a guarded confirmation flow
- [ ] **MEM-09**: Member belongs to exactly one department and one organization through the parent hierarchy
- [ ] **MEM-10**: Member has an explicit status field usable in badges and filters
- [ ] **MEM-11**: User can select multiple members and execute supported bulk actions
- [ ] **MEM-12**: Bulk actions show clear success/failure feedback per operation

### Shared Admin UX

- [ ] **UX-01**: All entity lists use enterprise-style table controls with row actions and empty states
- [ ] **UX-02**: List state for search, filters, sorting, and pagination is reflected in URL-friendly query state
- [ ] **UX-03**: Detail pages show breadcrumb and parent-child navigation context
- [ ] **UX-04**: Delete flows use consistent confirmation patterns across entities
- [ ] **UX-05**: Status values are shown as badges consistently across list and detail pages
- [ ] **UX-06**: Forms use TanStack Form-based validation and submission patterns consistently
- [ ] **UX-07**: Table screens use TanStack Table patterns consistently across entities

### Architecture and Data Contracts

- [ ] **ARCH-01**: Organization, Department, and Member are implemented as separate feature modules that preserve the existing repo layering
- [ ] **ARCH-02**: Mock data flows through shared API contracts and feature services rather than page-local in-memory logic
- [ ] **ARCH-03**: List/query contracts are shaped to resemble future backend behavior for filtering, sorting, and pagination
- [ ] **ARCH-04**: Parent-qualified query keys prevent cache collisions across nested resources
- [ ] **ARCH-05**: Entity identifiers and route params remain stable and backend-friendly
- [ ] **ARCH-06**: Auth integration seams exist for future server-side Keycloak integration without leaking client secret concerns into frontend feature code
- [ ] **ARCH-07**: OIDC-ready session/domain types are defined so future Keycloak integration can attach without rewriting CRUD feature boundaries

## v2 Requirements

### Authentication

- **AUTH-01**: User can authenticate with Keycloak using Next.js backend-held client secret flows
- **AUTH-02**: Protected admin routes enforce authenticated session behavior
- **AUTH-03**: Role-aware authorization is applied across organization-scoped resources

### Audit and Workflow

- **AUD-01**: User can view audit history for create, update, delete, and bulk actions
- **WF-01**: Sensitive changes support approval workflows

### Directory Operations

- **DIR-01**: User can move or reassign members across departments through explicit reassignment flows
- **DIR-02**: User can import and export directory data in bulk

## Out of Scope

| Feature                   | Reason                                                                        |
| ------------------------- | ----------------------------------------------------------------------------- |
| Real Keycloak integration | Deferred until after the CRUD foundation and stable resource boundaries exist |
| Fine-grained RBAC         | Deferred until auth is in place and resource scopes are validated             |
| Audit logs                | Deferred until core create/update/delete flows are stable                     |
| Approval workflows        | Deferred until the base admin operating model is implemented                  |

## Traceability

| Requirement | Phase     | Status  |
| ----------- | --------- | ------- |
| ORG-01      | Phase TBD | Pending |
| ORG-02      | Phase TBD | Pending |
| ORG-03      | Phase TBD | Pending |
| ORG-04      | Phase TBD | Pending |
| ORG-05      | Phase TBD | Pending |
| ORG-06      | Phase TBD | Pending |
| ORG-07      | Phase TBD | Pending |
| ORG-08      | Phase TBD | Pending |
| ORG-09      | Phase TBD | Pending |
| ORG-10      | Phase TBD | Pending |
| ORG-11      | Phase TBD | Pending |
| DEPT-01     | Phase TBD | Pending |
| DEPT-02     | Phase TBD | Pending |
| DEPT-03     | Phase TBD | Pending |
| DEPT-04     | Phase TBD | Pending |
| DEPT-05     | Phase TBD | Pending |
| DEPT-06     | Phase TBD | Pending |
| DEPT-07     | Phase TBD | Pending |
| DEPT-08     | Phase TBD | Pending |
| DEPT-09     | Phase TBD | Pending |
| DEPT-10     | Phase TBD | Pending |
| DEPT-11     | Phase TBD | Pending |
| MEM-01      | Phase TBD | Pending |
| MEM-02      | Phase TBD | Pending |
| MEM-03      | Phase TBD | Pending |
| MEM-04      | Phase TBD | Pending |
| MEM-05      | Phase TBD | Pending |
| MEM-06      | Phase TBD | Pending |
| MEM-07      | Phase TBD | Pending |
| MEM-08      | Phase TBD | Pending |
| MEM-09      | Phase TBD | Pending |
| MEM-10      | Phase TBD | Pending |
| MEM-11      | Phase TBD | Pending |
| MEM-12      | Phase TBD | Pending |
| UX-01       | Phase TBD | Pending |
| UX-02       | Phase TBD | Pending |
| UX-03       | Phase TBD | Pending |
| UX-04       | Phase TBD | Pending |
| UX-05       | Phase TBD | Pending |
| UX-06       | Phase TBD | Pending |
| UX-07       | Phase TBD | Pending |
| ARCH-01     | Phase TBD | Pending |
| ARCH-02     | Phase TBD | Pending |
| ARCH-03     | Phase TBD | Pending |
| ARCH-04     | Phase TBD | Pending |
| ARCH-05     | Phase TBD | Pending |
| ARCH-06     | Phase TBD | Pending |
| ARCH-07     | Phase TBD | Pending |

**Coverage:**

- v1 requirements: 48 total
- Mapped to phases: 0
- Unmapped: 48 ⚠️

---

_Requirements defined: 2026-04-08_
_Last updated: 2026-04-08 after initial definition_
