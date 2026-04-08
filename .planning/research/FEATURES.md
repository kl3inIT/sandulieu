# Feature Landscape

**Domain:** Enterprise directory/admin CRUD for Organization → Department → Member
**Researched:** 2026-04-08

## Table Stakes

Features users expect in a serious admin directory. Missing these makes the product feel like a demo, not an enterprise tool.

| Feature                                                         | Why Expected                                                                                                                                                                                                         | Complexity | Notes                                                                                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Hierarchical Organization → Department → Member model           | Enterprise directories are expected to reflect real reporting and ownership structure, not a flat list. Google Admin explicitly uses nested organizational units with parent/child placement and inherited settings. | Med        | Make parent-child relationships first-class in routes, forms, breadcrumbs, and delete rules.                                 |
| Full CRUD for all three entity types                            | Admin products are judged first on whether users can create, view, edit, and remove records reliably.                                                                                                                | Med        | Must include create, detail, edit, delete for Organization, Department, and Member.                                          |
| Parent-aware navigation and breadcrumbs                         | Admins need constant orientation when drilling into nested structures.                                                                                                                                               | Low        | Example: Organizations > Acme Corp > Departments > Finance > Members.                                                        |
| List pages with search, filter, pagination, sorting             | Microsoft Entra and Google Admin both assume admins browse large directories, search records, and manage from collection views.                                                                                      | Med        | Search by name/code/email; filters by parent, status, and type.                                                              |
| Membership assignment and reassignment                          | Department/member admin is not just record editing; admins must place members in the right parent container and move them when structure changes.                                                                    | Med        | Support assign on create and move on edit. Re-parenting is table stakes.                                                     |
| Status lifecycle controls                                       | Enterprise admin tools rarely treat “delete” as the only state. Google documents suspend/restore user flows; real admins expect active/inactive style states.                                                        | Med        | For Member, prefer Active/Inactive and optional Suspended over immediate hard delete.                                        |
| Safe delete with dependency guards                              | Nested structures make deletion dangerous. Admins expect protection when a parent still has children or assigned members.                                                                                            | Med        | Prevent deleting Organization with Departments; prevent deleting Department with Members unless reassigned/archived first.   |
| Validation and uniqueness rules                                 | Enterprise directories must protect data integrity from day one.                                                                                                                                                     | Med        | Enforce required fields, unique org code / department code within scope / member email or employee ID, and name constraints. |
| Empty states, loading states, error states, delete confirmation | These are baseline expectations in admin tooling and prevent accidental destructive actions.                                                                                                                         | Low        | Especially important because the app is currently mock-data-first and must still feel trustworthy.                           |
| Bulk import/export for Members                                  | In enterprise CRUD, single-record entry is not enough once directories have real staff volume. Bulk CSV-style operations are standard in Google Admin and Entra ecosystems.                                          | High       | MVP can ship export first, then CSV import with validation report.                                                           |
| Ownership metadata and timestamps                               | Admin teams expect to know who created/updated records and when they changed, even before full audit logging exists.                                                                                                 | Low        | Keep `createdAt`, `updatedAt`, and lightweight actor metadata in the model.                                                  |
| Detail views with related-entity summaries                      | Enterprise admins need context before editing.                                                                                                                                                                       | Low        | Show child counts, parent links, member counts, and recent changes on detail screens.                                        |

## Differentiators

Features that create real product advantage, but are not required for the first credible version.

| Feature                                                 | Value Proposition                                                                                                                                        | Complexity | Notes                                                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------- |
| Rule-based dynamic departments or smart member segments | Mirrors advanced enterprise directory behavior such as Entra dynamic membership. Powerful for large orgs, but overkill for v1 CRUD.                      | High       | Good future phase once schema and attributes stabilize.                     |
| Custom attributes per entity                            | Lets enterprise customers model region, cost center, HR codes, external IDs, compliance labels, and other company-specific data without schema rewrites. | High       | Very valuable, but should come after the core fixed schema is proven.       |
| Import preview with dry-run validation                  | Turns risky CSV import into an enterprise-safe workflow by showing errors, duplicates, and affected rows before commit.                                  | High       | Strong differentiator if bulk import is important to adoption.              |
| Org chart / hierarchy visualization                     | Makes structure understandable at a glance and improves discoverability for nested entities.                                                             | Med        | Nice admin experience, but not essential for initial CRUD.                  |
| Saved views and reusable filters                        | Helps operations teams revisit common slices such as inactive members, departments without managers, or one organization’s pending cleanup.              | Med        | Useful once list filtering is stable.                                       |
| Cross-entity global search                              | Lets admins jump directly from a single search box to organizations, departments, and members.                                                           | Med        | Great DX improvement after basic scoped search exists.                      |
| Merge / deduplicate workflows                           | Valuable in messy enterprise data where duplicate departments or members appear during imports or restructures.                                          | High       | Important later, not first release.                                         |
| Directory-health insights                               | Examples: departments without members, organizations with no active departments, duplicate emails, orphaned records.                                     | Med        | Differentiates by helping admins maintain data quality, not just edit rows. |
| Future auth-readiness hooks for Keycloak mapping        | Makes later identity integration smoother by keeping stable external IDs and identity status fields in the model now.                                    | Med        | Not user-visible differentiation today, but strategically important.        |

## Anti-Features

Features to deliberately NOT build in the first enterprise CRUD milestone.

| Anti-Feature                                                | Why Avoid                                                                                                                       | What to Do Instead                                                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Fine-grained RBAC matrix in v1                              | The project explicitly defers RBAC. Building per-field or per-action permissions now will slow down the core data model and UI. | Keep one trusted admin role assumption in the first CRUD milestone; design components so auth rules can wrap them later. |
| Full audit log subsystem                                    | Valuable, but expensive to do correctly and explicitly out of scope in the project brief.                                       | Store lightweight created/updated metadata now so a real audit trail can attach later.                                   |
| Approval workflows for entity changes                       | Adds state explosion and process complexity before the core CRUD UX is stable.                                                  | Use immediate admin edits with confirmations and dependency guards.                                                      |
| Dynamic rule builder in v1                                  | Powerful, but requires stable schema semantics, validation, explainability, and background recomputation.                       | Start with explicit membership and parent assignment only.                                                               |
| Hard-delete-first behavior for everything                   | Dangerous in nested directories; accidental deletions create cleanup work and broken references.                                | Prefer status changes, archival semantics, and guarded delete flows.                                                     |
| Deep customization of hierarchy rules before usage is known | Prematurely supporting arbitrary graph relationships usually creates a harder UX and data model.                                | Keep a strict tree: Organization contains Departments; Department contains Members.                                      |
| Real Keycloak login/session work in this milestone          | The brief explicitly says CRUD foundation first, auth later.                                                                    | Add identity-ready fields and service boundaries only.                                                                   |
| Public-facing directory browsing                            | This is an admin CRUD product, not an employee social directory in phase one.                                                   | Keep the scope on admin portal management workflows.                                                                     |

## Feature Dependencies

```text
Hierarchy model → Parent-aware routing/breadcrumbs
Hierarchy model → Safe delete rules
Hierarchy model → Detail pages with related summaries

Organization CRUD → Department CRUD
Department CRUD → Member CRUD

Validation rules → Create/Edit forms
Validation rules → Bulk import

List pages → Search/filter/sort/pagination
List pages → Saved views
List pages → Cross-entity search

Member status lifecycle → Safe delete strategy
Ownership metadata/timestamps → Directory-health insights

Stable fixed schema → Custom attributes
Stable fixed schema → Dynamic rule-based segments
Stable external IDs → Future Keycloak integration
```

## MVP Recommendation

Prioritize:

1. **Hierarchy-backed CRUD for Organization, Department, and Member**
2. **Enterprise list pages** with search, parent filters, pagination, status badges, empty/error/loading states
3. **Safe lifecycle management** with dependency-aware delete, member status control, and reassignment/move flows

Defer:

- **Dynamic rule-based segments**: too much schema and rule complexity before core CRUD stabilizes
- **Custom attributes**: high-value, but only after the fixed schema proves insufficient
- **Org chart visualization**: useful, but should follow reliable data entry and navigation
- **Full import preview/dry-run**: excellent phase-two enhancement after base CSV/export support exists
- **RBAC, audit logs, approval workflows, and real Keycloak integration**: explicitly deferred by project scope

## Opinionated Recommendation

For this project, treat the product as an **operational admin directory**, not an identity platform. That means the first release should optimize for:

- clean hierarchy management
- fast list-driven CRUD
- safe moves and deletes
- reliable data integrity
- future identity-readiness without implementing auth yet

The biggest mistake would be acting like advanced IAM features are table stakes for v1. They are not. Table stakes here are the boring but essential admin behaviors: nested CRUD, bulk-friendly listing, integrity checks, and predictable lifecycle handling.

## Sources

- Microsoft Entra group management docs: https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups
- Microsoft Entra dynamic membership docs: https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership
- Google Admin organizational unit docs: https://knowledge.workspace.google.com/admin/users/advanced/add-an-organizational-unit?hl=en&visit_id=639112282814978911-535375207&rd=1
- Google Admin user creation docs: https://knowledge.workspace.google.com/admin/users/add-an-account-for-a-new-user?hl=en&visit_id=639112283385655247-3861852781&rd=1

## Confidence

- **Table stakes:** MEDIUM-HIGH — supported by current official enterprise admin documentation patterns from Microsoft Entra and Google Admin, then adapted to the project’s Organization → Department → Member domain.
- **Differentiators:** MEDIUM — based on official advanced directory capabilities plus product judgment about what should be deferred.
- **Anti-features:** HIGH — strongly supported by the project brief’s explicit scope boundaries and by common enterprise CRUD delivery sequencing.
