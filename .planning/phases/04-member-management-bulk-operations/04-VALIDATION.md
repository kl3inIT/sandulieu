---
phase: 4
slug: member-management-bulk-operations
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-12
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                            |
| ---------------------- | ------------------------------------------------ |
| **Framework**          | none — no test runner configured (see CLAUDE.md) |
| **Config file**        | none — Wave 0 installs if needed                 |
| **Quick run command**  | `pnpm lint`                                      |
| **Full suite command** | `pnpm build`                                     |
| **Estimated runtime**  | ~30 seconds                                      |

---

## Sampling Rate

- **After every task commit:** Run `pnpm lint`
- **After every plan wave:** Run `pnpm build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status     |
| -------- | ---- | ---- | ----------- | ---------- | --------------- | --------- | ----------------- | ----------- | ---------- |
| 04-01-01 | 01   | 0    | MEM-01      | —          | N/A             | lint      | `pnpm lint`       | ❌ W0       | ⬜ pending |
| 04-01-02 | 01   | 1    | MEM-01      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-02-01 | 02   | 1    | MEM-02      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-03-01 | 03   | 1    | MEM-03      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-04-01 | 04   | 2    | MEM-04      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-05-01 | 05   | 2    | MEM-05      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-06-01 | 06   | 3    | MEM-06      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-07-01 | 07   | 3    | MEM-07      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-08-01 | 08   | 3    | MEM-08      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-09-01 | 09   | 4    | MEM-09      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-10-01 | 10   | 4    | MEM-10      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-11-01 | 11   | 4    | MEM-11      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |
| 04-12-01 | 12   | 5    | MEM-12      | —          | N/A             | build     | `pnpm build`      | ❌ W0       | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

- No test framework installed. Validation is via `pnpm lint` and `pnpm build` only.
- [ ] `pnpm dlx shadcn@latest add checkbox` — install missing Checkbox component before bulk selection tasks

_Existing infrastructure (lint + build) covers all phase requirements._

---

## Manual-Only Verifications

| Behavior                                 | Requirement    | Why Manual                               | Test Instructions                                                                       |
| ---------------------------------------- | -------------- | ---------------------------------------- | --------------------------------------------------------------------------------------- |
| Paginated member list with search/filter | MEM-01         | No E2E runner; UI interaction needed     | Load member list, apply status filter, search by name, verify pagination controls work  |
| Bulk selection + action                  | MEM-09, MEM-10 | No E2E runner; multi-step UI interaction | Select 3 members via checkbox, trigger bulk delete, verify per-operation feedback       |
| Member detail hierarchy display          | MEM-05         | No E2E runner; visual verification       | Navigate to member detail, verify org name → dept name → member name hierarchy is shown |
| Delete confirmation flow                 | MEM-06         | No E2E runner; modal interaction needed  | Click delete on a member, verify AlertDialog appears, confirm, verify member removed    |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
