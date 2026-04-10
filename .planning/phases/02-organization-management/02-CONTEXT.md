# Phase 2: Organization Management - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the first complete vertical slice for organization management so admin users can browse organizations in an enterprise-style table, create and edit organizations through dedicated routes, open an organization detail page, and use a guarded delete flow that blocks deletion when child departments still exist.

This phase clarifies how organization management should behave and be presented. It does not add new capabilities outside Phase 2 scope.

</domain>

<decisions>
## Implementation Decisions

### Organization list experience

- **D-01:** The default organization list must use an enterprise table, not cards.
- **D-02:** The table should prominently show organization code and organization name as the primary scan columns.
- **D-03:** The list must include a clear status badge column/state for fast scanning and status filtering.
- **D-04:** The list should include created/updated summary metadata by default if the current data contract can support it cleanly.
- **D-05:** Each row should expose quick actions for at least view detail, edit, and delete.

### Create and edit flow

- **D-06:** Create and edit organization flows should use dedicated admin routes instead of inline list editing.
- **D-07:** Route structure should be explicit nested admin routes such as `/admin/organizations/new` and `/admin/organizations/[organizationId]/edit`.
- **D-08:** The organization list page should focus on browsing and row actions, not hosting the full production create/edit form inline.

### Organization detail page

- **D-09:** The organization detail page must emphasize a summary view plus department context, not a dashboard-heavy layout.
- **D-10:** Required core information includes stable id, business code, organization name, status, and the main descriptive organization fields available in the model.
- **D-11:** The detail page must include department summary context and a clear path into the related department surface.
- **D-12:** Primary actions such as back to list, edit, and delete must be visible on the detail page.
- **D-13:** Extra metadata such as timestamps or system metadata is acceptable and should be included if the mock contract supports it without inventing unrelated scope.

### Delete guard behavior

- **D-14:** Delete remains a guarded soft-delete flow, not archive-only and not force delete.
- **D-15:** Organization deletion must be blocked when child departments still exist.
- **D-16:** The confirmation/error messaging must explain both the blocking reason and the next step, directing the user to manage departments before retrying deletion.
- **D-17:** The delete UX should feel strict and explicit for destructive actions rather than permissive.

### Claude's Discretion

- Exact table column ordering beyond the locked priorities above.
- Exact visual styling and spacing, as long as it stays within the repo’s existing shadcn/Tailwind admin patterns.
- Exact representation of department summary context (count badges, summary card, inline stats, or similar) as long as the path into departments is clear.
- Exact wording of helper/error copy, as long as it remains Vietnamese with diacritics and communicates the locked behavior above.

</decisions>

<specifics>
## Specific Ideas

- The list should feel like an enterprise admin table rather than the current posts-style card list.
- Dedicated routes should make the CRUD flow feel like a real admin module instead of a page proof.
- The detail page should be a summary-oriented screen with related department context, not an analytics dashboard.
- When delete is blocked, the UI should do more than say “cannot delete” — it should tell the user what to do next.

</specifics>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product scope and requirements

- `.planning/ROADMAP.md` — Phase 2 goal, dependency, and success criteria for Organization Management.
- `.planning/REQUIREMENTS.md` — ORG-01 through ORG-11 define the required organization CRUD behaviors.
- `.planning/PROJECT.md` — project-level constraints, scope, and product direction for the directory CRUD initiative.
- `.planning/STATE.md` — current milestone and phase progression context.

### Prior phase foundation

- `.planning/phases/01-directory-foundations-contracts/RESEARCH.md` — recommended Phase 1 architecture, list-state, query-key, and identity decisions that Phase 2 builds on.
- `.planning/phases/01-directory-foundations-contracts/VALIDATION.md` — validation expectations for the shared directory contracts and proof wiring already established.

### Codebase guidance

- `CLAUDE.md` — repo-specific rules for Next.js 16, layering, shadcn usage, and Vietnamese UI copy.
- `.planning/codebase/STRUCTURE.md` — where new feature, route, and shared code should live.
- `.planning/codebase/CONVENTIONS.md` — naming, layering, UI, and workflow conventions to preserve.
- `.planning/codebase/STACK.md` — current framework and package versions used by this phase.

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `features/organizations/organization.service.ts` — existing organization service mapping layer can be extended from proof-only behavior into real Phase 2 CRUD behavior.
- `features/organizations/organization.query-options.ts` and `features/organizations/organization.query-hooks.ts` — existing organization query key and hook scaffolding already matches the layered data pattern.
- `features/organizations/components/OrganizationForm.tsx` and `features/organizations/organization.form.ts` — existing TanStack Form-based organization form proof can be reused for dedicated create/edit routes.
- `features/directory/shared/*` — shared list-state, scope, and table-state helpers from Phase 1 should be reused for the organization list screen.
- `shared/components/ui/*` — shadcn-based primitives such as `Button`, `Card`, `Alert`, `Badge`, `Input`, and field primitives are the UI baseline.

### Established Patterns

- The repo expects `shared/api -> feature service -> query options/hooks -> feature UI -> app route orchestration` and Phase 2 should keep that split.
- Current organization proof code already parses URL-owned list state in `app/(admin-portal)/admin/organizations/page.tsx`; production list behavior should evolve that pattern rather than replacing it with page-local ad hoc state.
- Feature-specific React components live under `features/<domain>/components`, while route files under `app/` orchestrate page state and layout.
- User-facing text should remain in Vietnamese with diacritics.

### Integration Points

- `app/(admin-portal)/admin/organizations/page.tsx` is the current route entry that should mature from proof page into the production organization list screen.
- New dedicated routes should live under `app/(admin-portal)/admin/organizations/` for create, detail, and edit experiences.
- Department context should connect to the existing nested department route space under `/admin/organizations/[organizationId]/departments`.

</code_context>

<deferred>
## Deferred Ideas

- Force delete for organizations with dependent departments is explicitly out of scope for this phase.
- Archive-only replacement for delete is not the chosen direction for this phase.
- A dashboard-style organization detail experience with heavy analytics or activity views is not part of this phase.

</deferred>

---

_Phase: 02-organization-management_
_Context gathered: 2026-04-10_
