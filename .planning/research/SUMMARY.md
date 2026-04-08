# Project Research Summary

**Project:** Sandulieu Enterprise Directory CRUD
**Domain:** Enterprise directory admin CRUD for Organization → Department → Member with future Keycloak/OIDC integration
**Researched:** 2026-04-08
**Confidence:** MEDIUM-HIGH

## Executive Summary

This project is not an identity platform yet; it is an operational admin directory that needs credible enterprise CRUD behavior first. The research converges on a clear recommendation: extend the existing Next.js 16 App Router architecture rather than introducing a new admin framework, model the domain explicitly as a strict hierarchy of Organization → Department → Member, and keep parent scope visible in routes, query keys, navigation, and mutation flows. Experts build this kind of product by making hierarchy, list contracts, and delete/lifecycle rules explicit early, because those decisions determine whether later auth and RBAC can attach cleanly.

The recommended implementation path is deliberately conservative. Keep the current repo stack of Next.js, React, TypeScript, TanStack Query, TanStack Form, Zod, Axios, Zustand, and shadcn, then add TanStack Table and nuqs to support enterprise-grade lists with URL-driven state. Build top-down: shared directory contracts first, then Organization CRUD, then Department CRUD under Organization scope, then Member CRUD under Department scope. Treat mock services as backend-shaped contracts now so pagination, filters, uniqueness, dependency guards, and future permission failures do not require a rewrite later.

The biggest risks are architectural, not visual. If the team builds three flat CRUD modules, lets page files own business rules, or implements list behavior as purely client-side table state with weak query contracts, the later backend and Keycloak integration will become expensive. The mitigation is to preserve the current layering (`shared/api -> service -> query hooks -> pages/components`), encode all parent and filter dependencies into query keys and URLs, and prepare for a future server-assisted Auth.js + Keycloak integration without pulling real auth into the CRUD milestone.

## Key Findings

### Recommended Stack

The stack recommendation is strongly aligned with the current codebase: keep the existing Next.js 16.2.2 + React 19 + TypeScript shell and extend it instead of rewriting around a CRUD framework. The core additions for this milestone are TanStack Table for list/grid behavior and nuqs for URL-owned table/filter state. Forms should stay on TanStack Form + Zod, remote state should stay on TanStack Query, and Axios should remain behind the existing shared API layer to avoid churn.

A second strong recommendation is to plan auth boundaries now but defer real auth delivery. The research consistently rejects browser-primary Keycloak as the main architecture for this app. When auth work begins later, the preferred path is Auth.js with the Keycloak provider and a server-assisted confidential-client flow on the Next.js backend.

**Core technologies:**

- **Next.js 16.2.2 + React 19 + TypeScript 5.x**: app shell, route groups, server/client boundaries, and typed domain modeling — recommended because the repo already uses this stack successfully.
- **TanStack Query 5.96.2**: list/detail fetching, mutations, cache invalidation — recommended because it already matches the repo’s posts architecture and is the right server-state pattern for CRUD-heavy admin surfaces.
- **TanStack Table 8.21.3**: headless enterprise list behavior — recommended because it adds sorting, filtering, pagination, and expandable patterns without fighting the existing shadcn UI system.
- **TanStack Form 1.28.6 + Zod 4.3.6**: typed forms and validation — recommended because nested CRUD requires reusable create/edit flows with stable schema validation.
- **nuqs 2.8.9**: typed URL query state — recommended because enterprise list state should survive reloads, bookmarking, sharing, and nested navigation.
- **Axios 1.14.0**: HTTP transport behind the shared API client — recommended only because the repo already has a normalized Axios layer and this is not the right milestone for a fetch migration.
- **Auth.js + Keycloak provider**: future auth integration path — recommended because it keeps the client secret on the Next.js backend and fits the project’s stated auth direction.

**Critical version requirements:**

- Keep **Next.js 16.2.2** conventions; do not regress to older App Router assumptions.
- Keep **React Query v5** patterns for query keys and invalidation.
- Use **TanStack Table v8** patterns, especially controlled/manual-ready pagination design.
- Treat **keycloak-js** as optional and non-primary if auth is introduced later.

### Expected Features

The research is clear that a credible first release should feel like an enterprise admin tool, not a demo CRUD scaffold. That means hierarchy-aware navigation, full CRUD for all three entity types, safe reassignment and delete behavior, enterprise list mechanics, and explicit lifecycle/validation rules. It does not mean RBAC matrices, workflow engines, or full identity-platform behavior in v1.

The feature set should therefore center on stable nested operations: admins must be able to create, edit, move, list, and safely deactivate or delete directory entities while always understanding parent scope and relationship impact.

**Must have (table stakes):**

- **Hierarchy-backed Organization → Department → Member model** — parent-child relationships must be first-class in routes, forms, breadcrumbs, and delete rules.
- **Full CRUD for all three entity types** — create, detail, edit, and delete/archive behavior for Organization, Department, and Member.
- **Parent-aware navigation and breadcrumbs** — users must not lose context while drilling into nested entities.
- **Enterprise list pages** — search, filters, pagination, sorting, status badges, empty/loading/error states.
- **Membership assignment and reassignment** — members must be assignable on create and movable on edit.
- **Status lifecycle controls** — especially for members, prefer Active/Inactive style lifecycle over delete-only semantics.
- **Safe delete with dependency guards** — parent delete behavior must account for children and relationship impact.
- **Validation and uniqueness rules** — enforce required fields and stable uniqueness such as org code, scoped department code, and member email/employee ID.
- **Detail views with related summaries** — child counts, parent links, and quick context before editing.
- **Ownership metadata and timestamps** — lightweight operational history before full audit logging exists.

**Should have (competitive):**

- **Bulk export, then bulk import** — export is a strong early enhancement; CSV import becomes more valuable once validation/reporting is stable.
- **Cross-entity global search** — useful after scoped list search works reliably.
- **Saved views and reusable filters** — strong productivity enhancement once list state contracts are stable.
- **Directory-health insights** — surfaces data quality issues like empty departments or duplicate identities.
- **Future identity-ready fields** — external IDs and status mapping hooks to ease later Keycloak integration.

**Defer (v2+):**

- **Fine-grained RBAC matrix** — explicitly out of scope until resource boundaries are proven.
- **Full audit log subsystem** — expensive and should follow stable CRUD semantics.
- **Approval workflows** — too much state/process complexity for v1.
- **Dynamic rule-based departments or smart segments** — valuable later, but too schema-heavy early on.
- **Custom attributes** — wait until the fixed schema proves insufficient.
- **Org chart visualization** — nice enhancement, not a prerequisite for solid CRUD.
- **Real Keycloak login/session integration** — defer to a dedicated auth phase.

### Architecture Approach

The architecture recommendation is to preserve the repo’s existing layering and duplicate the proven posts pattern across three peer domain features: `organizations`, `departments`, and `members`. The hierarchy should be encoded in route structure, query keys, and breadcrumbs, while each feature keeps its own service mapping, query options, hooks, and UI. Routes should remain orchestration-only; feature services should own domain transforms; shared API files should own transport and mock/backend adapters.

**Major components:**

1. **Admin route pages under `app/(admin-portal)/admin/organizations/*`** — own route params, URL/search params, page composition, breadcrumb context, and post-mutation navigation.
2. **Feature modules under `features/organizations`, `features/departments`, and `features/members`** — own tables, forms, detail cards, query hooks, query options, and service-layer mapping.
3. **Shared transport/model/auth boundaries under `shared/api`, `shared/model`, and later `shared/auth`** — own raw transport, app-facing DTOs, and future session/auth helpers.
4. **TanStack Query + TanStack Table + nuqs coordination layer** — own parent-qualified query keys, controlled table state, and URL-driven filtering/pagination.
5. **Later backend-for-frontend auth boundary** — own Keycloak code exchange, secure cookie session handling, and route protection when auth work starts.

### Critical Pitfalls

The most dangerous mistakes all stem from collapsing domain structure too early or deferring auth thinking too completely. The project can move fast, but only if hierarchy, query contracts, and service boundaries remain disciplined.

1. **Building nested CRUD as three unrelated flat modules** — avoid by making parent context mandatory in routes, query keys, filters, and delete semantics from day one.
2. **Letting page code own business rules** — avoid by preserving `shared/api -> service -> query hooks -> pages/components` and keeping domain transforms out of route files.
3. **Designing list pages without server-ready query contracts** — avoid by defining parent scope, search, pagination, sort, and filter contracts now and encoding them into query keys and URL state.
4. **Using optimistic updates carelessly in a hierarchical admin** — avoid by preferring conservative invalidation in v1 and limiting optimism to low-risk fields only.
5. **Deferring auth in architecture instead of delivery** — avoid by creating auth seams now even while postponing real Keycloak rollout.
6. **Planning Keycloak as a pure SPA token flow** — avoid by using a later server-assisted Auth.js + Keycloak pattern with backend-held secrets and cookie sessions.

## Implications for Roadmap

Based on the combined research, the roadmap should be organized around dependency order, not around parallel CRUD scaffolding. The hierarchy is real: Organization is the parent contract, Department depends on Organization, and Member depends on both. Authentication should come after CRUD contracts stabilize, not before.

### Phase 1: Shared Directory Contracts and List Foundations

**Rationale:** Every downstream phase depends on stable entity models, identifiers, status enums, uniqueness rules, query contracts, and parent-aware URL conventions.
**Delivers:** Shared models/DTOs, filter types, status semantics, list result shape, query key conventions, URL-state conventions, and reusable table/filter primitives.
**Addresses:** Hierarchy model, validation rules, list pages with search/filter/pagination/sort, ownership metadata.
**Avoids:** Flat-module sprawl, weak identifier strategy, status-as-cosmetic-field mistakes, unrealistic mock contracts.

### Phase 2: Organization Vertical Slice

**Rationale:** Department CRUD cannot be shaped correctly until Organization routes, identifiers, detail pages, and delete/lifecycle rules are stable.
**Delivers:** Organization list, detail, create, edit, status handling, guarded delete, and parent summary patterns.
**Uses:** Next.js App Router, TanStack Query, TanStack Table, TanStack Form, Zod, nuqs.
**Implements:** First complete feature module following the current posts layering.
**Addresses:** Full CRUD, enterprise lists, validation, safe delete, detail summaries, ownership metadata.
**Avoids:** Page-owned business logic, query-key inconsistency, premature shared abstraction.

### Phase 3: Department Vertical Slice Under Organization Scope

**Rationale:** This phase validates the parent-aware nested architecture before the deepest member workflows add more complexity.
**Delivers:** Nested department routes under organization, scoped department lists/details/forms, breadcrumbs, organization-qualified query keys, and dependency-aware delete behavior.
**Addresses:** Parent-aware navigation, nested CRUD, scoped filtering, relationship-safe lifecycle behavior.
**Avoids:** Child screens without parent scope, broken breadcrumbs, cache pollution across organizations.

### Phase 4: Member Vertical Slice and Reassignment Flows

**Rationale:** Members are the deepest and most operationally sensitive entity; by this point the hierarchy and list contracts should already be proven.
**Delivers:** Member list/detail/create/edit, department-scoped membership assignment, reassignment/move flows, member status lifecycle, and guarded destructive actions.
**Addresses:** Full member CRUD, membership assignment/reassignment, lifecycle controls, list UX, safe delete behavior.
**Avoids:** Treating members as global contacts, client-only full-array list behavior, brittle optimistic updates.

### Phase 5: Cross-Module UX Hardening

**Rationale:** Once all three entity slices exist, real duplication and navigation pain become visible and can be consolidated safely.
**Delivers:** Shared enterprise list toolbar patterns, consistent empty/error/loading states, status badges, delete confirmation UX with dependency summaries, linked related-entity navigation, and export-first bulk operations.
**Addresses:** Trustworthy admin UX, related summaries, export support, more coherent navigation.
**Avoids:** Overengineering abstractions before real usage patterns appear, weak delete confirmations, lost parent scope.

### Phase 6: Auth-Ready Boundary

**Rationale:** The project brief defers auth, but this is the right point to introduce the seam before deeper rollout or enterprise hardening.
**Delivers:** `shared/auth` boundary, app-owned session helpers, route protection seam, permission adapter interfaces, and role-aware navigation configuration without full RBAC implementation.
**Addresses:** Future identity readiness, clean protected-route seams, separation of auth from feature modules.
**Avoids:** Architecting as if auth will never arrive, client-only identity assumptions, middleware-only protection thinking.

### Phase 7: Keycloak/OIDC Integration

**Rationale:** Only after resource scope, routes, and CRUD semantics are stable should authentication bind to them.
**Delivers:** Auth.js + Keycloak integration, Authorization Code flow, backend-held secret, secure cookie session, protected admin access, and initial role/claim mapping.
**Addresses:** Real authentication rollout, secure session semantics, groundwork for later RBAC.
**Avoids:** Browser-token architecture, frontend-held client secrets, over-trusting silent SSO patterns.

### Phase Ordering Rationale

- Build top-down because the domain itself is top-down: Department depends on Organization, and Member depends on Department plus Organization.
- Stabilize query contracts and identifiers before scaling UI; otherwise list pages and cache keys will need rewrites.
- Delay auth until CRUD resource boundaries are real; auth amplifies domain ambiguity rather than solving it.
- Consolidate shared UI infrastructure only after one or two real vertical slices reveal what is truly reusable.
- Prefer export-first bulk operations over import-first, because import depends more heavily on stable validation and uniqueness rules.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 5: Cross-Module UX Hardening** — bulk import/export scope, file format expectations, and operational error-report UX may need more targeted research.
- **Phase 6: Auth-Ready Boundary** — app-specific decisions around session shape, permission adapters, and route-guard strategy need implementation-focused planning.
- **Phase 7: Keycloak/OIDC Integration** — definitely needs dedicated `/gsd-research-phase` work because browser constraints, callback configuration, session strategy, and role mapping are integration-sensitive.

Phases with standard patterns (skip research-phase):

- **Phase 1: Shared Directory Contracts and List Foundations** — well-supported by the combined stack, architecture, and pitfalls research.
- **Phase 2: Organization Vertical Slice** — standard CRUD pattern with strong guidance already available.
- **Phase 3: Department Vertical Slice** — same architectural pattern, now parent-qualified.
- **Phase 4: Member Vertical Slice and Reassignment Flows** — more complex than earlier slices, but still well-covered by current research and common admin patterns.

## Confidence Assessment

| Area         | Confidence  | Notes                                                                                                                                                     |
| ------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH        | Strongest area. Recommendations align with the current repo and are backed by official TanStack, Auth.js, and Keycloak documentation plus version checks. |
| Features     | MEDIUM-HIGH | Table-stakes are well grounded in Google Admin and Microsoft Entra patterns, but some prioritization remains product-judgment-specific.                   |
| Architecture | HIGH        | Very consistent with the current repo shape and supported by established App Router + TanStack layering patterns.                                         |
| Pitfalls     | MEDIUM-HIGH | Auth and security pitfalls are strongly supported; nested CRUD sequencing guidance is partly synthesis from ecosystem patterns plus repo constraints.     |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

Some important planning questions remain unresolved and should be made explicit before implementation begins.

- **Canonical identifier strategy:** Decide early whether URLs and cache keys use UUIDs, slugs, or backend-generated opaque IDs, and keep room for future external IDs.
- **Exact delete policy per entity:** Confirm whether Organization and Department deletion is blocked, soft-deleted, or cascaded with explicit impact summaries.
- **Status model semantics:** Define whether each entity supports only Active/Inactive or also Archived/Suspended and how those states affect list visibility and reassignment.
- **Initial bulk operations scope:** Validate whether export-only is enough for first release or whether CSV import is a business requirement sooner.
- **Future auth contract shape:** Before the auth phase, define session shape, user/resource scope mapping, and where definitive authorization checks will live.
- **Mock backend realism:** Ensure the mock layer can simulate pagination, scoped queries, duplicate validation, not-found states, and dependency conflicts so the backend swap is evolutionary rather than a rewrite.

## Sources

### Primary (HIGH confidence)

- TanStack Query official docs — query invalidation, query keys, and CRUD cache patterns
- TanStack Table official docs — pagination, filtering, and controlled/manual-ready table architecture
- TanStack Form official docs — typed forms, validation, and submission flows
- Auth.js Keycloak provider docs — future server-side Keycloak integration path
- Keycloak official OIDC layers and JavaScript adapter docs — secret handling, client types, and browser limitations

### Secondary (MEDIUM confidence)

- Google Admin organizational unit and user management docs — enterprise directory table-stakes and hierarchy expectations
- Microsoft Entra management docs — enterprise admin list/search/lifecycle expectations
- Existing repo architecture and planning docs — current layering, route boundaries, and integration constraints

### Tertiary (LOW confidence)

- None material enough to drive roadmap decisions; the main uncertainties are implementation-specific choices rather than unsupported research.

---

_Research completed: 2026-04-08_
_Ready for roadmap: yes_
