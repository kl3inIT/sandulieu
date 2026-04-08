import type {
  DirectoryListQuery,
  DirectorySort,
  SortDirection,
} from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export const DIRECTORY_PARAM_KEYS = {
  search: "search",
  statuses: "status",
  pageIndex: "page",
  pageSize: "pageSize",
  sort: "sort",
} as const;

export const DEFAULT_DIRECTORY_PAGE_INDEX = 0;
export const DEFAULT_DIRECTORY_PAGE_SIZE = 10;
export const MAX_DIRECTORY_PAGE_SIZE = 100;

export type DirectoryListState<TSortField extends string> = {
  search: string;
  statuses: DirectoryStatus[];
  pageIndex: number;
  pageSize: number;
  sort: DirectorySort<TSortField>[];
};

export type DirectorySearchParamsInput =
  | URLSearchParams
  | string
  | Record<string, string | string[] | undefined>;

export function createDirectorySearchParams(
  input: DirectorySearchParamsInput,
): URLSearchParams {
  if (input instanceof URLSearchParams) {
    return new URLSearchParams(input);
  }

  if (typeof input === "string") {
    return new URLSearchParams(input);
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item) {
          params.append(key, item);
        }
      }

      continue;
    }

    if (value) {
      params.set(key, value);
    }
  }

  return params;
}

export function normalizeDirectorySearch(value: string | null | undefined) {
  return value?.trim() ?? "";
}

export function normalizeDirectoryStatuses(
  values: Iterable<string | null | undefined>,
): DirectoryStatus[] {
  const statuses = new Set<DirectoryStatus>();

  for (const value of values) {
    if (value === "active" || value === "inactive") {
      statuses.add(value);
    }
  }

  return [...statuses];
}

export function normalizeDirectoryPageIndex(value: string | null | undefined) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return DEFAULT_DIRECTORY_PAGE_INDEX;
  }

  return parsed;
}

export function normalizeDirectoryPageSize(value: string | null | undefined) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return DEFAULT_DIRECTORY_PAGE_SIZE;
  }

  return Math.min(parsed, MAX_DIRECTORY_PAGE_SIZE);
}

export function normalizeDirectorySortValue<TSortField extends string>(
  value: string | null | undefined,
  allowedFields: readonly TSortField[],
): DirectorySort<TSortField>[] {
  if (!value) {
    return [];
  }

  const allowedFieldSet = new Set<string>(allowedFields);
  const results: DirectorySort<TSortField>[] = [];
  const seenFields = new Set<string>();

  for (const part of value.split(",")) {
    const trimmedPart = part.trim();

    if (!trimmedPart) {
      continue;
    }

    const [rawField, rawDirection] = trimmedPart.split(":");
    const field = rawField?.trim();
    const direction = normalizeSortDirection(rawDirection);

    if (!field || !direction || !allowedFieldSet.has(field) || seenFields.has(field)) {
      continue;
    }

    results.push({
      field: field as TSortField,
      direction,
    });
    seenFields.add(field);
  }

  return results;
}

export function serializeDirectorySortValue<TSortField extends string>(
  sort: readonly DirectorySort<TSortField>[],
) {
  return sort.map(({ field, direction }) => `${field}:${direction}`).join(",");
}

export function haveDirectoryFiltersChanged<TSortField extends string>(
  currentState: DirectoryListState<TSortField>,
  nextState: DirectoryListState<TSortField>,
) {
  return (
    currentState.search !== nextState.search ||
    currentState.pageSize !== nextState.pageSize ||
    serializeDirectorySortValue(currentState.sort) !==
      serializeDirectorySortValue(nextState.sort) ||
    currentState.statuses.length !== nextState.statuses.length ||
    currentState.statuses.some((status, index) => status !== nextState.statuses[index])
  );
}

export function applyDirectoryListQueryState<
  TSortField extends string,
  TFilters = Record<string, never>,
>(
  state: DirectoryListState<TSortField>,
  filters: TFilters,
): DirectoryListQuery<TSortField, TFilters> {
  return {
    search: state.search || undefined,
    statuses: state.statuses.length > 0 ? [...state.statuses] : undefined,
    sort: state.sort.length > 0 ? [...state.sort] : undefined,
    page: {
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
    },
    filters,
  };
}

function normalizeSortDirection(value: string | null | undefined): SortDirection | null {
  if (value === "asc" || value === "desc") {
    return value;
  }

  return null;
}
