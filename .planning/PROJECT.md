# Sandulieu Enterprise Directory CRUD

## What This Is

Sandulieu is a Next.js admin-oriented enterprise directory application that currently provides portal shells and a demo posts flow. The next product step is to turn it into a full CRUD management experience for nested organizational data: organizations, departments, and members, using the repo’s existing layered frontend architecture with mock data and enterprise-style admin screens.

## Core Value

Deliver a realistic enterprise CRUD foundation that feels production-ready in structure and UX before real backend and identity integration are added.

## Requirements

### Validated

- ✓ Public, auth, admin, buyer, and seller portal shells exist with route-group-based layouts — existing
- ✓ Global provider infrastructure is already wired for TanStack Query and shared UI primitives — existing
- ✓ A full demo CRUD-style posts feature already exists using the layered pattern `shared/api → feature service → query hooks → pages/components` — existing

### Active

- [ ] Build full CRUD for Organization with enterprise list, detail, create, edit, and delete flows
- [ ] Build full CRUD for Department nested under Organization with parent-aware list and detail flows
- [ ] Build full CRUD for Member nested under Department and Organization with parent-aware list and detail flows
- [ ] Keep the implementation in the current frontend mock architecture using service and mock data layers instead of Next.js `app/api` route handlers
- [ ] Use TanStack stack patterns where appropriate, including TanStack Form and TanStack Table, in a way that matches the current repo layering
- [ ] Add enterprise list-page capabilities across the CRUD surfaces, including search, parent filters, pagination, status badges, empty states, and delete confirmation
- [ ] Prepare the architecture for a later Keycloak integration where the client secret is stored in the Next.js backend

### Out of Scope

- Real Keycloak integration in this initial CRUD phase — auth should come after the CRUD foundation is complete
- Fine-grained RBAC, audit logs, and approval workflows — explicitly deferred until after the core CRUD foundation exists

## Context

This is a brownfield Next.js 16.2.2 + React 19 application with a codebase map already generated in `.planning/codebase/`. The repo is organized around App Router route groups and a layered split between `app/`, `features/`, and `shared/`. The current implemented data feature is admin posts, which uses TanStack Query, service mapping, and a shared API layer against demo infrastructure. The user wants the next project phase to evolve that existing structure into a more enterprise-like nested management domain centered on organizations, departments, and members.

The desired domain is a three-level hierarchy: Organization → Department → Member. Full CRUD is required across all three levels, including list and detail screens. The user wants enterprise admin patterns built in from the start rather than minimal demo pages, and specifically wants the stack to lean on TanStack tooling such as TanStack Form and TanStack Table.

The long-term auth direction is Keycloak. The user has already decided that the Keycloak client secret should live on the Next.js backend side, and `react-oidc-context` may be used later if it fits the implementation. For this initialization, auth is intentionally not part of the first delivery phase beyond keeping the architecture ready for it.

## Constraints

- **Tech stack**: Must stay within the current Next.js 16.2.2, React 19, pnpm, TanStack, shadcn-based codebase — because this repo already has established architectural and tooling conventions
- **Architecture**: Must preserve the existing layering `shared/api → feature service → query hooks → pages/components` — because the repository instructions explicitly require that split
- **Mock backend approach**: Must use client-side mock/service data rather than `app/api/*` route handlers for this phase — because the user chose to continue the current mock architecture style
- **CRUD scope**: Must cover list/detail/create/edit/delete for Organization, Department, and Member — because the user asked for full CRUD across the nested domain, not partial demos
- **UX baseline**: Must include enterprise list mechanics such as search, filters, pagination, badges, empty states, and delete confirmation — because the user wants production-like admin behavior from the first iteration
- **Auth sequencing**: Must defer real Keycloak integration until after CRUD is established — because the user explicitly wants auth in a later phase
- **Language**: Planning documents should be in English — because the user explicitly requested English for the initialization output

## Key Decisions

| Decision                                                             | Rationale                                                                                                             | Outcome   |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| Use a nested enterprise domain of Organization → Department → Member | Gives the project a realistic three-level business hierarchy instead of a flat demo model                             | — Pending |
| Keep mock data in the existing frontend service architecture         | Preserves the current repo structure and avoids introducing `app/api` route handlers during the CRUD foundation phase | — Pending |
| Require full CRUD list/detail flows for all three entity levels      | The goal is a complete enterprise admin foundation, not a partial prototype                                           | — Pending |
| Use TanStack Form and TanStack Table patterns where appropriate      | Matches the user’s requested stack direction for forms and table-heavy enterprise screens                             | — Pending |
| Defer Keycloak integration until after the CRUD foundation ships     | Keeps v1 focused while still designing toward backend-held secrets and future OIDC integration                        | — Pending |
| Defer RBAC, audit logging, and approval flows                        | Prevents enterprise scope from expanding before the core CRUD model is stable                                         | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):

1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):

1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---

_Last updated: 2026-04-08 after initialization_
