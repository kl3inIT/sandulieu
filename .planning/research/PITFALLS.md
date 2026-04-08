# Domain Pitfalls

**Domain:** Enterprise directory CRUD admin for Organization → Department → Member with future Keycloak/OIDC integration
**Researched:** 2026-04-08
**Overall confidence:** MEDIUM-HIGH

## Critical Pitfalls

Mistakes here commonly force rewrites, create security debt, or make later auth integration harder than it should be.

### Pitfall 1: Building nested CRUD as three unrelated flat modules

**Severity:** Critical  
**Likelihood:** High

**What goes wrong:** Teams implement Organization, Department, and Member as separate CRUD screens without a clear parent-child contract. Departments are editable without guaranteed organization context; members are fetchable without department or organization scope; delete behavior is defined per page instead of per hierarchy rule.

**Why it happens:** CRUD scaffolding is faster when each entity is treated as a standalone table, and the UI looks complete before the domain rules are actually modeled.

**Consequences:**

- Broken breadcrumbs, filters, and navigation context
- Inconsistent query keys and cache invalidation
- Hard-to-reason-about delete rules such as "can I delete an organization with departments?"
- Painful future RBAC because resource scope is ambiguous

**Prevention:**

- Define hierarchy invariants first: `Department belongs to exactly one Organization`; `Member belongs to exactly one Department and one Organization-derived scope`
- Make parent context first-class in route structure, query keys, page state, and mutation payloads
- Decide now whether child records are hard-blocking, soft-blocking, or cascade-deleting parent deletes
- Model list filters and detail pages around scoped access, not global entity fetches only

**Detection:**

- Child pages can load with no parent context
- Query keys do not include parent identifiers where they should
- Delete confirmation copy cannot explain impact on children
- Same Department or Member screen is being reused for both global and nested flows without explicit scope handling

### Pitfall 2: Letting page code own business rules instead of the feature/service layer

**Severity:** Critical  
**Likelihood:** High

**What goes wrong:** Validation, parent resolution, mapping, and delete constraints end up inside page components or table renderers instead of the existing `shared/api → service → query hooks → page/components` layering.

**Why it happens:** Admin UIs feel "frontend-only," so teams place filtering and domain rules wherever the table or form is rendered.

**Consequences:**

- Duplicate rules across list, detail, create, and edit screens
- Inconsistent data transforms between routes
- Future backend swap becomes expensive because behavior is coupled to UI components
- Harder auth retrofit because authorization checks do not have clear server-ready seams

**Prevention:**

- Keep wire shapes, mock API calls, and mapping out of route files
- Put domain transforms and hierarchy enforcement in feature services
- Keep query keys/options centralized so nested invalidation is predictable
- Treat route pages as orchestration only

**Detection:**

- Page files import mock datasets directly
- Table column definitions perform business-rule lookups or relationship repair
- Similar validation logic appears in multiple forms/pages
- Service layer returns UI-specific shapes instead of stable domain models

### Pitfall 3: Designing list pages without server-ready query contracts

**Severity:** Critical  
**Likelihood:** High

**What goes wrong:** Search, pagination, sort, and parent filters are implemented as client-only table behavior over a full in-memory dataset. It works with mocks, then collapses when a real backend arrives.

**Why it happens:** Early mock data makes full-array filtering feel harmless, and TanStack Table can hide the fact that there is no durable query contract underneath.

**Consequences:**

- Rewrites when real APIs need page-based or cursor-based fetching
- Query cache pollution because filters are not encoded in query keys
- Inconsistent UX between list states and detail mutations
- Slow pages once data volume grows

**Prevention:**

- Define list contracts now: parent scope, search fields, status filters, page params, sort params, total count behavior
- Treat mock services as if they were real backend endpoints
- Encode all list state that affects data retrieval into query keys
- Separate table presentation from data-fetch contract

**Detection:**

- One query key serves every list variant
- Pagination is purely client-side over the full result set
- Search/filter state is not represented in query keys
- Mutation success handlers refetch "everything" instead of scoped lists

### Pitfall 4: Using optimistic updates carelessly in a hierarchical admin

**Severity:** Critical  
**Likelihood:** Medium

**What goes wrong:** Teams optimistically remove or update rows without accounting for cross-list effects: a member update affects department counts, organization summaries, filtered lists, and detail pages simultaneously.

**Why it happens:** Optimistic UI feels modern, but nested admin data has more derived state than a flat todo list.

**Consequences:**

- Count badges drift from actual data
- Parent summary cards disagree with child lists
- Rollback logic becomes brittle
- Users see records disappear or duplicate across filtered views

**Prevention:**

- Prefer conservative invalidation over broad optimistic mutation for nested entities in v1
- If optimistic updates are used, limit them to low-risk fields and define rollback per affected cache key
- Keep aggregate values derived from the same source contract, not ad hoc local math

**Detection:**

- Teams cannot enumerate which queries a single mutation affects
- Badge counts are manually adjusted in UI state
- Rollback code is larger than mutation code

### Pitfall 5: Deferring auth entirely in the architecture, not just in delivery

**Severity:** Critical  
**Likelihood:** High

**What goes wrong:** Teams say "Keycloak comes later" and build everything as if no auth boundary will ever exist. The app then depends on browser-side direct API calls, global client state for identity assumptions, and route structures that cannot express scoped access later.

**Why it happens:** Auth is out of scope for the milestone, so teams stop designing for it altogether.

**Consequences:**

- Expensive rewrite when adding session checks, protected mutations, and role-aware navigation
- Leaky browser architecture around tokens or secrets
- Admin pages that cannot distinguish authenticated shell from authorized data access

**Prevention:**

- Separate identity-dependent concerns from CRUD UI now
- Leave clear seams for future protected server boundaries, even if current data is mocked
- Keep authorization assumptions out of presentational components
- Model resource scope consistently so future RBAC can attach to organization/department/member resources

**Detection:**

- Feature code assumes current user context from client-only globals
- No obvious place exists to verify session before data access
- Route structure does not distinguish protected read vs protected mutation paths

### Pitfall 6: Planning Keycloak as a pure SPA token flow when a Next.js server exists

**Severity:** Critical  
**Likelihood:** High

**What goes wrong:** Teams plan to let the browser own OAuth/OIDC tokens long-term even though the app already has a Next.js server capable of holding secrets and session cookies.

**Why it happens:** SPA examples are easy to copy, and Keycloak’s JavaScript adapter makes direct browser auth look straightforward.

**Consequences:**

- Greater XSS blast radius for tokens
- Pressure to store refresh/access tokens in the browser
- Harder logout/session consistency across tabs and browsers
- Client secret handling becomes impossible or unsafe in frontend code

**Prevention:**

- Plan for a backend-assisted flow from the start: confidential-client style exchanges on the Next.js backend, session cookie to browser
- Treat the browser as a UI consumer, not the long-term token vault
- Keep future integration aligned with Authorization Code flow, PKCE where applicable, and strict redirect URIs

**Detection:**

- Architecture docs talk about putting client secret anywhere near client bundles
- Teams assume `react-oidc-context` alone solves the whole security model
- Browser storage is proposed for long-lived tokens

### Pitfall 7: Misunderstanding Keycloak/browser limitations and over-trusting silent SSO

**Severity:** Critical  
**Likelihood:** Medium

**What goes wrong:** Teams assume iframe-based silent SSO checks and cross-tab logout detection will behave uniformly across browsers.

**Why it happens:** Older SPA auth patterns rely on third-party cookies and hidden iframe session checks.

**Consequences:**

- Login startup behavior differs by browser
- Logout in another tab is not reflected promptly
- Session state appears random to users
- Support burden rises after rollout

**Prevention:**

- Treat silent SSO and iframe session checks as best-effort, not core correctness mechanisms
- Design UX for explicit session expiry handling
- Avoid auth designs that require tokens in URLs or third-party-cookie-dependent checks
- Prefer server-managed session semantics where possible

**Detection:**

- Auth design assumes silent `check-sso` is guaranteed
- Cross-tab logout is treated as immediate without token refresh or server session checks
- Browser privacy settings are not part of test planning

## Moderate Pitfalls

### Pitfall 8: Overengineering enterprise features before core CRUD stabilizes

**Severity:** Moderate  
**Likelihood:** High

**What goes wrong:** Teams introduce audit logs, approval flows, field-level permissions, import/export pipelines, org trees, and advanced bulk actions before the base Organization/Department/Member CRUD contracts are stable.

**Consequences:**

- Roadmap thrash
- Rewrites because core data shape keeps changing
- Slower delivery of the only features users currently need

**Prevention:**

- Finish stable CRUD contracts, nested navigation, and list mechanics first
- Defer RBAC, audit logs, and workflow automation until entity lifecycles are proven
- Keep extension points, not full implementations, for later enterprise concerns

### Pitfall 9: Inconsistent identifier strategy across mock data and future backend

**Severity:** Moderate  
**Likelihood:** Medium

**What goes wrong:** Mock data uses simple incremental IDs, while later identity/resource systems require UUIDs, external IDs, slugs, or composite keys.

**Consequences:**

- Route params and table selection logic need migration
- Client cache keys become unstable
- Import/export and cross-system integration become harder

**Prevention:**

- Decide now what identifiers are stable for URLs, UI selection, and backend mapping
- Keep app models flexible enough to add external IDs later
- Do not overload display name as identity

### Pitfall 10: Treating status and lifecycle as presentation-only fields

**Severity:** Moderate  
**Likelihood:** Medium

**What goes wrong:** Status badges are added for UI polish, but no lifecycle rules exist for active/inactive/archived entities.

**Consequences:**

- Search/filter semantics become unclear
- Delete/archive behavior conflicts later
- Auth and provisioning workflows cannot rely on status meaning

**Prevention:**

- Define status semantics per entity early
- Decide whether inactive members remain searchable/selectable
- Tie badge presentation to explicit domain enums, not arbitrary strings

### Pitfall 11: Weak delete semantics in a nested domain

**Severity:** Moderate  
**Likelihood:** High

**What goes wrong:** Delete is implemented as a generic confirmation modal with no relationship awareness.

**Consequences:**

- Users accidentally remove parent entities without understanding child impact
- Teams later add ad hoc blocking rules per page
- Data restore/undo becomes inconsistent

**Prevention:**

- Define delete policy per entity: hard delete, soft delete, block when children exist, or cascade with summary
- Put impact summary in confirmation UX
- Make mock layer simulate real delete constraints

### Pitfall 12: Navigation that does not preserve parent scope

**Severity:** Moderate  
**Likelihood:** High

**What goes wrong:** Users drill from Organization to Department to Member, then lose context when returning, filtering, or opening detail pages.

**Consequences:**

- Frustrating admin UX
- More duplicated queries than necessary
- Harder future authorization because scope is hidden in incidental UI state

**Prevention:**

- Preserve parent context in route params, search params, breadcrumbs, and back-navigation behavior
- Keep page-local state only for transient UI, not canonical resource scope

## Minor Pitfalls

### Pitfall 13: Mixing display models and edit models too early

**Severity:** Minor  
**Likelihood:** Medium

**What goes wrong:** One TypeScript shape tries to serve table rows, detail views, forms, and future API payloads.

**Prevention:**

- Separate list summary, detail, and save payload models as the domain grows
- Keep mapping in the service layer

### Pitfall 14: Hard-coding organizational text, metrics, and labels in route files

**Severity:** Minor  
**Likelihood:** High

**What goes wrong:** Placeholder labels and metrics become quasi-domain truth scattered across pages.

**Prevention:**

- Centralize shared labels/config where appropriate
- Keep route files focused on composition

### Pitfall 15: Skipping empty, loading, and partial-data states for nested pages

**Severity:** Minor  
**Likelihood:** High

**What goes wrong:** Pages assume every organization has departments and every department has members.

**Prevention:**

- Design empty states intentionally for each level
- Make zero-child states part of acceptance criteria

## Security and Architecture Traps

### Trap 1: Putting secrets or confidential-client logic in the browser

**Severity:** Critical  
**Likelihood:** Medium

**What goes wrong:** Teams forget that confidential-client behavior belongs on the server side. Keycloak client secrets and token introspection credentials are server concerns.

**Prevention:**

- Keep client secret on the Next.js backend only
- Use server-held session/cookie boundaries for future auth
- Do not let browser code perform confidential-client operations

### Trap 2: Assuming middleware/proxy alone is authorization

**Severity:** Critical  
**Likelihood:** Medium

**What goes wrong:** Teams gate routes at the edge and think the data is protected, while actual reads/mutations remain callable through server actions or APIs without definitive checks.

**Prevention:**

- Use middleware/proxy only for coarse redirect behavior
- Plan definitive authorization checks close to data access and mutations
- Treat UI hiding as convenience, not enforcement

### Trap 3: Depending on token introspection for every request

**Severity:** Moderate  
**Likelihood:** Medium

**What goes wrong:** Teams design every protected request to call back to Keycloak for introspection.

**Consequences:**

- Extra latency
- Keycloak load growth
- More failure modes than needed

**Prevention:**

- Prefer local JWT validation where appropriate in server-side integrations
- Reserve introspection for cases that truly need active-state checks
- Remember introspection is limited to confidential clients

### Trap 4: Loose redirect URI configuration

**Severity:** Critical  
**Likelihood:** Medium

**What goes wrong:** Wildcards or overly broad redirect URIs are allowed to speed up development.

**Consequences:**

- Open redirect exposure
- Poor environment discipline
- Harder production hardening later

**Prevention:**

- Keep redirect URIs as specific as possible
- Use HTTPS in production
- Treat environment-specific callback registration as a deployment concern, not a frontend shortcut

## Sequencing Mistakes and Overengineering Risks

### Mistake 1: Adding Keycloak before the CRUD contracts exist

**Why it fails:** Auth amplifies every domain ambiguity. If parent-child resource rules, identifiers, and list contracts are unstable, auth integration locks those mistakes in.

**Better sequence:**

1. Stabilize Organization/Department/Member models and hierarchy rules
2. Stabilize list/detail/create/edit/delete contracts with realistic mock services
3. Add protected server-side auth/session boundaries
4. Integrate Keycloak/OIDC
5. Add RBAC and auditability after resource boundaries are proven

### Mistake 2: Adding RBAC before resource scoping is explicit

**Why it fails:** Role matrices are meaningless if the system cannot clearly express "which organization/department/member is in scope."

**Better sequence:**

- First define resource identity and hierarchy
- Then define action surfaces
- Then bind roles/permissions to those surfaces

### Mistake 3: Building backend-free mocks that cannot simulate auth-ready behavior

**Why it fails:** Teams use simplistic arrays that cannot model filtered queries, permission-denied outcomes, conflict cases, or parent delete constraints.

**Better sequence:**

- Make the mock service layer behave like a real backend contract
- Include permission/error shapes in the contract even before real auth is active

## Phase-Specific Warnings

| Phase Topic                  | Likely Pitfall                                                             | Mitigation                                                                               |
| ---------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Organization CRUD foundation | Treating organizations as flat rows with no future child constraints       | Define hierarchy invariants and delete/archive policy before UI build-out                |
| Department CRUD              | Losing organization scope in list/detail/edit flows                        | Require parent-aware query keys, breadcrumbs, and route/search param strategy            |
| Member CRUD                  | Modeling members as global contacts instead of department-scoped resources | Decide canonical membership scope and relationship rules before forms/tables proliferate |
| Enterprise table UX          | Shipping client-only search/pagination over full arrays                    | Define backend-ready query contract and encode retrieval state in query keys             |
| Form architecture            | Duplicating validation logic per page                                      | Centralize domain validation and payload mapping in feature-layer seams                  |
| Mock backend                 | Using unrealistic dummy arrays that ignore hierarchy and conflicts         | Simulate child constraints, not-found states, duplicate checks, and scoped queries       |
| Auth preparation             | Assuming "we'll add Keycloak later" without server-ready boundaries        | Preserve seams for server session verification and protected mutations now               |
| Keycloak rollout             | Choosing browser-token architecture because it's faster                    | Use a server-assisted OIDC design with backend-held secret and cookie session boundary   |
| Authorization                | Implementing middleware-only protection                                    | Add definitive checks near data access/mutations once auth starts                        |
| Enterprise extensions        | Starting RBAC/audit logs before CRUD semantics settle                      | Defer until resource boundaries and lifecycle rules are stable                           |

## Most Important Recommendations

1. Model the hierarchy before building screens. Nested CRUD fails when parent-child invariants are implicit.
2. Keep mock services backend-shaped. If the mock contract is unrealistic, the future backend migration will be a rewrite.
3. Preserve the repo's existing layering. It is the main defense against page-level business-logic sprawl.
4. Design now for server-assisted OIDC later. Do not let a browser-token architecture become the default by accident.
5. Sequence work as CRUD contracts first, then auth boundary, then RBAC/audit concerns.

## Sources

- Next.js docs index for authentication guide path: https://nextjs.org/docs/llms.txt
- Next.js official authentication guide path: https://nextjs.org/docs/app/guides/authentication
- Keycloak OIDC layers: https://www.keycloak.org/securing-apps/oidc-layers
- Keycloak JavaScript adapter: https://www.keycloak.org/securing-apps/javascript-adapter
- OAuth.com SPA security considerations: https://oauth.com/oauth2-servers/single-page-apps/security-considerations/

## Confidence Notes

- **HIGH:** Keycloak flow guidance, redirect URI strictness, introspection limitations, browser-token caveats, token persistence guidance
- **MEDIUM:** Next.js server-boundary and cookie-session recommendations, because the direct authentication page fetch was unreliable through the available fetch tool, though the official path and broader Next.js server-security guidance align with this recommendation
- **MEDIUM:** Nested CRUD architecture and sequencing recommendations, because they are based on strong cross-source ecosystem patterns plus the current repo architecture and constraints rather than a single official framework document
