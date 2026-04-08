# Architecture Patterns

**Domain:** Enterprise directory CRUD admin app with future Keycloak integration
**Researched:** 2026-04-08

## Recommended Architecture

Use the existing repo layering, but make the domain hierarchy explicit and keep authentication as a later cross-cutting boundary rather than mixing it into the CRUD modules now.

Recommended shape:

```text
app/(admin-portal)/admin/organizations/*           ← routes, page orchestration, URL state
  ↓
features/organizations/*                           ← organization list/detail/forms/hooks/ui
features/departments/*                             ← department list/detail/forms/hooks/ui
features/members/*                                 ← member list/detail/forms/hooks/ui
  ↓
features/*/*.query-hooks.ts                        ← TanStack Query mutations/queries
features/*/*.query-options.ts                      ← stable query keys and query option builders
features/*/*.service.ts                            ← map wire data <-> app models
  ↓
shared/api/organization.api.ts
shared/api/department.api.ts
shared/api/member.api.ts                           ← raw HTTP/mock adapters only
shared/apiClient.ts                                ← axios client + error normalization
shared/model/*                                     ← app-facing models and list/detail DTOs
shared/auth/*                                      ← later: auth client/session helpers only
  ↓
mock data source now / app-owned backend later
```

The critical decision is to model each entity as its own feature module, not as one giant `directory` feature file tree. The hierarchy should appear in routing, query keys, and page composition, but each feature should still own its own service mapping, hooks, and UI. That keeps the current posts pattern intact while scaling it to a parent-child domain.

For navigation and screens, use nested admin routes:

- `/admin/organizations`
- `/admin/organizations/new`
- `/admin/organizations/[organizationId]`
- `/admin/organizations/[organizationId]/departments`
- `/admin/organizations/[organizationId]/departments/new`
- `/admin/organizations/[organizationId]/departments/[departmentId]`
- `/admin/organizations/[organizationId]/departments/[departmentId]/members`
- `/admin/organizations/[organizationId]/departments/[departmentId]/members/new`
- `/admin/organizations/[organizationId]/departments/[departmentId]/members/[memberId]`

This route structure makes parent context explicit, supports breadcrumbs naturally, and prevents department/member pages from losing the organization/department scope.

## Component Boundaries

| Component                                                              | Responsibility                                                                         | Communicates With                                                    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `app/(admin-portal)/admin/organizations/*` pages                       | Route params, search params, page composition, modal/open state, breadcrumb context    | Feature hooks/components only                                        |
| `features/organizations/components/*`                                  | Organization table, filters, forms, detail cards, delete confirmation UI               | Organization hooks, shared UI                                        |
| `features/departments/components/*`                                    | Department table/forms/detail under an organization                                    | Department hooks, shared UI, parent context props                    |
| `features/members/components/*`                                        | Member table/forms/detail under department and organization                            | Member hooks, shared UI, parent context props                        |
| `features/*/*.query-hooks.ts`                                          | `useQuery`/`useMutation`, cache invalidation, optimistic or pessimistic update policy  | Query options, services, TanStack Query                              |
| `features/*/*.query-options.ts`                                        | Stable query keys and option builders for list/detail/filter/pagination variants       | Services                                                             |
| `features/*/*.service.ts`                                              | Map raw API/mock data into app-facing models; keep pages unaware of wire format        | `shared/api/*`, `shared/model/*`                                     |
| `shared/api/organization.api.ts`, `department.api.ts`, `member.api.ts` | Raw transport calls or mock repository access only                                     | `shared/apiClient.ts`, mock source now, backend later                |
| `shared/model/*`                                                       | Canonical frontend models and input/output types                                       | Feature services and UI                                              |
| `shared/components/layout/*`                                           | Admin shell, breadcrumb slots, page chrome                                             | Route-group layouts and pages                                        |
| `shared/components/ui/*`                                               | Reusable shadcn-based primitives                                                       | Features and pages                                                   |
| `shared/auth/*` later                                                  | Session read/write helpers, auth config, permission helpers, token-aware fetch helpers | Middleware/proxy, server actions/route handlers later, app providers |
| `middleware.ts` or Next.js proxy layer later                           | Route protection and redirect decisions only                                           | Auth/session helpers                                                 |
| Next.js server-side auth boundary later                                | Code exchange, refresh, logout, secret-holding integration with Keycloak               | Keycloak endpoints, secure cookies, UI routes                        |

### Recommended Feature Split

Do this as three peer features plus a thin shared directory vocabulary layer if needed:

```text
features/
  organizations/
    components/
    organization.types.ts
    organization.service.ts
    organization.query-options.ts
    organization.query-hooks.ts
    index.ts
  departments/
    components/
    department.types.ts
    department.service.ts
    department.query-options.ts
    department.query-hooks.ts
    index.ts
  members/
    components/
    member.types.ts
    member.service.ts
    member.query-options.ts
    member.query-hooks.ts
    index.ts
```

If shared lookup logic emerges, add a small `features/directory-shared/` or `shared/model/directory/*` area for reusable enums and filter contracts. Do not collapse all three entities into one monolithic feature; that will turn parent-child rules into tangled conditional logic.

## Data Flow

### CRUD data flow

The direction should stay one-way and layered:

```text
Route page/search params
  → feature query hook
  → query options/query key
  → feature service
  → shared API client/mock adapter
  → data source
  → service maps raw response to model
  → query cache
  → feature component renders UI
```

### Organization flow

1. Admin organization page reads URL state such as `q`, `page`, `pageSize`, and `status`.
2. Page passes those values into `useOrganizationsQuery(filters)`.
3. Query hook uses an object-based key such as `['organizations', 'list', { q, page, pageSize, status }]`.
4. Service requests a paginated organization list from the mock API layer.
5. Service maps raw list items into `OrganizationListItemModel`.
6. TanStack Table renders rows using controlled pagination/filter state.
7. Mutations invalidate list and relevant detail keys.

### Department flow

Departments must always be parent-aware, even if a future API technically supports global queries.

```text
organizationId from route
  + department list filters from search params
  → useDepartmentsQuery({ organizationId, ...filters })
  → ['organizations', organizationId, 'departments', 'list', { ...filters }]
  → department service/api
```

That parent-qualified key design matters. TanStack Query guidance is to include every variable the fetch depends on in the query key. For this domain, `organizationId`, `departmentId`, filters, and pagination all belong in the key. That prevents cross-parent cache pollution.

### Member flow

Members should usually be queried within both organization and department scope:

```text
organizationId + departmentId + filters
  → useMembersQuery({ organizationId, departmentId, ...filters })
  → ['organizations', organizationId, 'departments', departmentId, 'members', 'list', { ...filters }]
```

Even if a later global member search is needed, treat that as a separate query surface with separate keys, not as an overloaded version of the nested query.

### Form and mutation flow

```text
Form component (TanStack Form)
  → validate input schema
  → submit normalized feature input
  → mutation hook
  → service
  → shared API/mock layer
  → response mapped to model
  → invalidate affected list/detail queries
  → route refresh/navigation/toast in page layer
```

Keep form submission side effects split cleanly:

- Feature hook owns data mutation and cache invalidation.
- Page owns navigation after success.
- Form owns field validation and local UX state.

### Later Keycloak flow

When Keycloak is introduced, do not let feature modules talk to Keycloak directly.

Recommended future auth flow:

```text
Browser hits protected admin route
  → Next.js middleware/proxy checks session cookie
  → if missing, redirect to server-side login start route
  → Next.js server-side auth route redirects to Keycloak authorization endpoint
  → Keycloak redirects back with auth code
  → Next.js server-side callback exchanges code using confidential client secret
  → server stores session in secure httpOnly cookie
  → frontend reads session state from app-owned auth boundary
  → feature data calls use app-owned API/auth-aware fetcher, not Keycloak SDK directly
```

This is the right fit for the user’s requirement that the Keycloak client secret live on the Next.js backend. Official Keycloak docs are clear that any client secret usage belongs to a confidential backend client, not browser code. The JavaScript adapter docs are also explicit that browser apps cannot securely keep client credentials.

## Patterns to Follow

### Pattern 1: Parent-qualified feature modules

**What:** Treat child entities as first-class features, but require parent identifiers in their list/detail APIs and route context.
**When:** Any Department or Member screen.
**Example:**

```typescript
const departmentQueryKeys = {
  all: ["departments"] as const,
  byOrganization: (organizationId: string) =>
    ["organizations", organizationId, "departments"] as const,
  list: (organizationId: string, filters: DepartmentListFilters) =>
    ["organizations", organizationId, "departments", "list", filters] as const,
  detail: (organizationId: string, departmentId: string) =>
    ["organizations", organizationId, "departments", departmentId] as const,
};
```

This mirrors current TanStack Query guidance: include every dependent variable in the key, prefer serializable values, and use object segments for filters.

### Pattern 2: Separate list models from detail models

**What:** Use lighter list row models and richer detail/edit models.
**When:** Enterprise tables with filters, badges, and nested counts.
**Example:**

```typescript
type OrganizationListItem = {
  id: string;
  name: string;
  code: string;
  status: "active" | "inactive";
  departmentCount: number;
  memberCount: number;
};

type OrganizationDetail = OrganizationListItem & {
  description?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
};
```

This keeps list pages fast and avoids over-coupling table rendering to full entity payloads.

### Pattern 3: URL-driven list state

**What:** Put search, status filter, page, page size, and selected parent scope in search params where practical.
**When:** Any enterprise table page.
**Example:**

```text
/admin/organizations/acme/departments?page=2&pageSize=20&q=finance&status=active
```

This gives shareable URLs, predictable refetching, and simpler page refresh behavior.

### Pattern 4: Table as a controlled shell, not a data owner

**What:** TanStack Table should render current rows and state, but the source of truth for pagination/filtering should remain in page/query state.
**When:** Organization, Department, and Member list pages.
**Example:**

```typescript
const table = useReactTable({
  data: query.data?.items ?? [],
  columns,
  manualPagination: true,
  rowCount: query.data?.total ?? 0,
  state: { pagination },
  onPaginationChange: setPagination,
});
```

TanStack Table’s current docs favor client-side pagination only when the dataset is modest. For enterprise directories, architecture should assume manual/server-style pagination contracts early, even if the first mock implementation computes totals in-memory.

### Pattern 5: Backend-for-frontend auth boundary later

**What:** Keep Keycloak redirect and token exchange concerns in Next.js server-side routes, with the browser dealing only in app session state.
**When:** Once authentication starts.
**Example:**

```text
shared/auth/config.ts
shared/auth/session.ts
app/api/auth/login/route.ts
app/api/auth/callback/route.ts
app/api/auth/logout/route.ts
middleware.ts
```

This preserves the existing frontend layering while creating a safe place for secret-bearing auth operations.

## Anti-Patterns to Avoid

### Anti-Pattern 1: One giant `directory` feature

**What:** Putting Organization, Department, and Member hooks, forms, tables, and mappers into one oversized feature package.
**Why bad:** Parent-child rules, cache invalidation, and route-specific UI become tangled quickly.
**Instead:** Keep peer features with explicit cross-feature contracts.

### Anti-Pattern 2: Child entities fetched without parent scope

**What:** Querying departments by only `departmentId` or members by only `memberId` in list/detail screens.
**Why bad:** Loses breadcrumb context, invites cache collisions, and weakens authorization boundaries later.
**Instead:** Keep route params and query keys parent-qualified.

### Anti-Pattern 3: Page files calling Axios or mocks directly

**What:** Repeating fetch logic inside `app/(admin-portal)` route pages.
**Why bad:** Breaks the repo’s existing architecture and makes the later backend swap expensive.
**Instead:** Preserve `shared/api -> feature service -> query hooks -> pages/components`.

### Anti-Pattern 4: Keycloak logic inside feature hooks

**What:** Having `useMembersQuery` or admin pages directly manage OIDC redirects or Keycloak tokens.
**Why bad:** Couples business features to identity vendor mechanics and makes testing harder.
**Instead:** Put auth in a shared/server boundary and expose only session/permission state to features.

### Anti-Pattern 5: Frontend-held client secret

**What:** Using a Keycloak confidential client from browser code.
**Why bad:** Officially unsafe and incompatible with secure client secret handling.
**Instead:** Keep code exchange and secret use on the Next.js backend only.

## Suggested Build Order

The domain has strong dependencies, so build top-down.

1. **Directory shared contracts**
   - Define models, filter types, status enums, table result shape, breadcrumb context shape.
   - Why first: all three features depend on naming, list contracts, and parent identifiers.

2. **Organization vertical slice**
   - List, detail, create, edit, delete.
   - Why second: Department depends on selecting and displaying an Organization parent.

3. **Department vertical slice**
   - Nested list/detail/forms under Organization.
   - Why third: Member depends on Department context; Department validates the parent-aware pattern.

4. **Member vertical slice**
   - Nested list/detail/forms under Department and Organization.
   - Why fourth: deepest hierarchy, most likely to expose pagination/filter and breadcrumb complexity.

5. **Shared enterprise list infrastructure**
   - Reusable table toolbar, empty state, status badge, confirm delete dialog, filter primitives.
   - Why here: build after the first real slice reveals actual duplication, not before.

6. **Navigation refinement and cross-module linking**
   - Breadcrumbs, parent summary cards, “view departments”, “view members”, related counts.
   - Why now: needs all entities present.

7. **Auth-ready backend boundary**
   - Add app-owned auth routes, session helpers, protected-route checks, and permission seam without full RBAC yet.
   - Why after CRUD: user explicitly deferred real auth, but the seam should be added before broader rollout.

8. **Keycloak integration**
   - Authorization Code flow, secure cookie session, role claim mapping, protected admin routes.
   - Why last: should attach to stable route and domain boundaries, not a moving CRUD foundation.

## Build Order Dependencies

```text
Shared directory contracts
  → Organization CRUD
  → Department CRUD
  → Member CRUD
  → Shared table/filter abstractions
  → Auth seam
  → Keycloak integration
```

More explicitly:

```text
Organization exists
  → Department can be created
Department exists
  → Member can be created
Stable CRUD routes and IDs exist
  → Auth protection can target real surfaces
Stable auth seam exists
  → Keycloak can be integrated safely
```

## Scalability Considerations

| Concern           | At 100 users                          | At 10K users                                          | At 1M users                                                             |
| ----------------- | ------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------- |
| List pagination   | Mock/manual pagination acceptable     | Server-style pagination contract required             | Cursor or optimized server pagination likely needed                     |
| Query cache size  | Per-page cache keys are simple        | Filter explosion requires disciplined key design      | Aggressive cache scoping and invalidation strategy needed               |
| Nested navigation | Breadcrumbs and parent headers enough | Cross-module links and saved filters become important | Global search and federated directory lookup likely needed              |
| Auth              | Deferred or lightweight session seam  | Protected routes and role-aware UI required           | Centralized policy enforcement and token/session observability required |
| Data source       | Frontend mock acceptable              | App-owned backend/API should replace mocks            | Service boundaries, auditability, and search indexing become important  |

## Architecture Recommendation

For this repo, the best fit is:

- keep route groups as the top-level portal boundary,
- add three peer domain features for Organization, Department, and Member,
- encode hierarchy in routes, query keys, and breadcrumbs,
- keep page orchestration in `app/`, domain logic in `features/`, and transport in `shared/api`,
- design list pages around URL state plus TanStack Query/TanStack Table,
- and prepare Keycloak as a later backend-for-frontend auth boundary, not as frontend feature logic.

That is the most natural extension of the current posts architecture and the safest path toward later secure identity integration.

## Confidence

- **CRUD module structure:** HIGH — strongly supported by the existing repo architecture plus common enterprise admin patterns.
- **TanStack query/table recommendations:** HIGH — verified against current official TanStack docs for query keys and pagination.
- **Keycloak integration split:** HIGH — verified against official Keycloak OIDC layers and JavaScript adapter docs.
- **Exact Next.js auth implementation details:** MEDIUM — recommendation aligns with current App Router practice and project constraints, but the direct Next.js auth doc page could not be fetched from the guessed URL during research.

## Sources

- Existing project architecture: `D:/DTH/sandulieu/.planning/PROJECT.md`
- Existing codebase architecture: `D:/DTH/sandulieu/.planning/codebase/ARCHITECTURE.md`
- Existing codebase concerns: `D:/DTH/sandulieu/.planning/codebase/CONCERNS.md`
- TanStack Query query keys: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
- TanStack Table pagination guide: https://tanstack.com/table/latest/docs/guide/pagination
- Keycloak OIDC layers: https://www.keycloak.org/securing-apps/oidc-layers
- Keycloak JavaScript adapter: https://www.keycloak.org/securing-apps/javascript-adapter
