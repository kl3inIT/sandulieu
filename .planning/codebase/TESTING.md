# Testing Patterns

**Analysis Date:** 2026-04-08

## Test Framework

**Runner:**

- Not detected in application code or root tooling configuration.
- Config: Not detected. Root-level test config files such as `D:\DTH\sandulieu\jest.config.*`, `D:\DTH\sandulieu\vitest.config.*`, `D:\DTH\sandulieu\playwright.config.*`, and `D:\DTH\sandulieu\cypress.config.*` are absent.

**Assertion Library:**

- Not detected. No app-level dependency or script indicates Jest, Vitest, Playwright Test, Cypress, Testing Library, or another assertion/test runner in `D:\DTH\sandulieu\package.json`.

**Run Commands:**

```bash
pnpm lint              # Static analysis only; runs `eslint` from `D:\DTH\sandulieu\package.json`
pnpm format:check      # Formatting check only; runs Prettier from `D:\DTH\sandulieu\package.json`
Not configured         # Run all tests
Not configured         # Watch mode
Not configured         # Coverage
```

## Test File Organization

**Location:**

- No repository-owned test suite is detected under `D:\DTH\sandulieu\app`, `D:\DTH\sandulieu\features`, or `D:\DTH\sandulieu\shared`.
- Glob matches for `*.test.*` and `*.spec.*` are limited to `D:\DTH\sandulieu\node_modules`, which should not be treated as project tests.

**Naming:**

- No application test naming pattern is established yet.

**Structure:**

```text
No project test directories or co-located `*.test.*` / `*.spec.*` files detected under:
- `D:\DTH\sandulieu\app`
- `D:\DTH\sandulieu\features`
- `D:\DTH\sandulieu\shared`
```

## Test Structure

**Suite Organization:**

```typescript
// Not established in this repository.
// No project-owned `describe`, `it`, or `test` suites are present under
// `D:\DTH\sandulieu\app`, `D:\DTH\sandulieu\features`, or `D:\DTH\sandulieu\shared`.
```

**Patterns:**

- Setup pattern: Not established.
- Teardown pattern: Not established.
- Assertion pattern: Not established.
- Quality signals currently come from static tooling instead of executable tests:
  - `D:\DTH\sandulieu\eslint.config.mjs` applies `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`, and `eslint-config-prettier`.
  - `D:\DTH\sandulieu\.prettierrc` sets `trailingComma: "es5"`.
  - `D:\DTH\sandulieu\.husky\pre-commit` runs `pnpm lint-staged` before commit.
  - `D:\DTH\sandulieu\package.json` defines `lint-staged` rules to run `eslint --fix` for `*.{js,jsx,ts,tsx}` and `prettier --write` for `*.{js,jsx,ts,tsx,json,md,css,scss}`.

## Mocking

**Framework:** Not detected.

**Patterns:**

```typescript
// Not established.
// No mocking utilities or test doubles are configured in `D:\DTH\sandulieu\package.json`.
```

**What to Mock:**

- No repository convention is established because no automated test stack is configured.
- If a test stack is introduced later, follow the existing architecture boundary in `D:\DTH\sandulieu\CLAUDE.md`: treat `D:\DTH\sandulieu\shared/api/post.api.ts` as the raw API layer and `D:\DTH\sandulieu\features/posts/post.service.ts` as the mapping/service layer.

**What NOT to Mock:**

- No repository convention is established.
- Preserve feature boundaries documented in `D:\DTH\sandulieu\CLAUDE.md`; avoid testing page orchestration by collapsing `app`, `features`, and `shared` layers into one unit.

## Fixtures and Factories

**Test Data:**

```typescript
// Not established.
// No fixture, seed, or factory helpers are present in project-owned source directories.
```

**Location:**

- Not applicable. No fixtures or factories are detected under `D:\DTH\sandulieu\app`, `D:\DTH\sandulieu\features`, or `D:\DTH\sandulieu\shared`.

## Coverage

**Requirements:**

- None enforced. `D:\DTH\sandulieu\package.json` has no coverage script, and no test runner configuration is present.

**View Coverage:**

```bash
Not configured
```

## Test Types

**Unit Tests:**

- Not used in current repository state.
- No unit test files or runner configuration are present in `D:\DTH\sandulieu\package.json` or root config files.

**Integration Tests:**

- Not used as a configured repository pattern.
- `D:\DTH\sandulieu\CLAUDE.md` describes the admin posts data flow across `app`, `features`, and `shared`, but there is no executable integration test harness covering that flow.

**E2E Tests:**

- Not used as a configured repository pattern.
- Runtime artifacts exist under `D:\DTH\sandulieu\.playwright-cli` and `D:\DTH\sandulieu\output`, but there is no root Playwright configuration or `package.json` script wiring these into a supported test workflow.

## Common Patterns

**Async Testing:**

```typescript
// Not established because no automated async test suite is configured.
```

**Error Testing:**

```typescript
// Not established because no automated error-path test suite is configured.
```

## Repository Instructions Affecting Testing

- `D:\DTH\sandulieu\CLAUDE.md` explicitly states:
  - There is currently no test runner configured in `D:\DTH\sandulieu\package.json`.
  - Do not assume Jest, Vitest, or Playwright is installed.
  - If tests are added, first decide with the user what test stack should be introduced.
- Use `pnpm` as the package manager because `D:\DTH\sandulieu\pnpm-lock.yaml` is present and `D:\DTH\sandulieu\CLAUDE.md` instructs commands with `pnpm`.
- Current quality enforcement is commit-time linting and formatting, not automated test execution:
  - `D:\DTH\sandulieu\.husky\pre-commit`
  - `D:\DTH\sandulieu\package.json`
  - `D:\DTH\sandulieu\eslint.config.mjs`
  - `D:\DTH\sandulieu\.prettierrc`

---

_Testing analysis: 2026-04-08_
