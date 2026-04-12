# Phase 4: Member Management & Bulk Operations - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-12
**Phase:** 04-member-management-bulk-operations
**Areas discussed:** All areas auto-decided by Claude (user delegated all decisions)

---

## Member Data Fields

| Option               | Description                                      | Selected |
| -------------------- | ------------------------------------------------ | -------- |
| Stay lean (6 fields) | Keep existing model, defer enrichment to Phase 5 | ✓        |
| Expand model         | Add email, phone, position, hire date in Phase 4 |          |

**Decision:** Stay lean — 6 existing fields sufficient for full CRUD and bulk operations.
**Notes:** Model enrichment deferred to Phase 5 (Cross-Entity UX Consistency).

---

## List Scope Strategy

| Option                 | Description                                                    | Selected |
| ---------------------- | -------------------------------------------------------------- | -------- |
| Department-scoped only | Always requires organizationId + departmentId in scope         | ✓        |
| Add org-level view     | Cross-department member list at /organizations/[orgId]/members |          |

**Decision:** Department-scoped only — consistent with existing route structure and Phase 3 pattern.
**Notes:** Org-level aggregate view is a new capability, deferred.

---

## Bulk Operations

| Option                                 | Description                                      | Selected |
| -------------------------------------- | ------------------------------------------------ | -------- |
| Bulk status change only                | Set selected members to active/inactive/archived | ✓        |
| Bulk status + bulk delete              | Also allow deleting multiple members at once     |          |
| All three (status + delete + reassign) | Full bulk operation suite                        |          |

**Decision:** Bulk status change only for Phase 4.
**Notes:** Bulk delete deferred (destructive without reassign safety net). Bulk reassign deferred (requires department picker UI complexity).

---

## Member Detail Page

| Option                            | Description                                                  | Selected |
| --------------------------------- | ------------------------------------------------------------ | -------- |
| Fields + parent hierarchy context | Summary fields + org/dept context cards, no children section | ✓        |
| Fields only                       | Minimal detail, just the 6 model fields                      |          |
| Fields + contact section stub     | Add placeholder for future email/phone fields                |          |

**Decision:** Summary fields + parent org/dept context cards. No children section (members have no children). Primary actions: back to list, edit, delete.
**Notes:** Mirrors how dept detail shows org context — consistent pattern.

---

## Claude's Discretion

- Exact table column ordering
- Bulk action toolbar placement (sticky bottom vs. top toolbar vs. inline)
- Exact Vietnamese copy wording for bulk feedback

## Deferred Ideas

- Org-level aggregate member view — future phase
- Member model enrichment (email, phone, position) — Phase 5
- Bulk delete — v2 DIR-01
- Bulk reassign — v2 DIR-01
