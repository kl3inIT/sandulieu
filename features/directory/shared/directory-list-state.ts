import type { DirectorySort } from "@/shared/api/directory.contracts";

import {
  applyDirectoryListQueryState,
  createDirectorySearchParams,
  DEFAULT_DIRECTORY_PAGE_INDEX,
  DEFAULT_DIRECTORY_PAGE_SIZE,
  DIRECTORY_PARAM_KEYS,
  normalizeDirectoryPageIndex,
  normalizeDirectoryPageSize,
  normalizeDirectorySearch,
  normalizeDirectorySortValue,
  normalizeDirectoryStatuses,
  serializeDirectorySortValue,
  type DirectoryListState,
  type DirectorySearchParamsInput,
} from "./directory-filters";

export type ParseDirectoryListStateOptions<TSortField extends string> = {
  allowedSortFields: readonly TSortField[];
  defaultPageSize?: number;
  defaultSort?: readonly DirectorySort<TSortField>[];
};

export function getDefaultDirectoryListState<TSortField extends string>(
  options: ParseDirectoryListStateOptions<TSortField>,
): DirectoryListState<TSortField> {
  return {
    search: "",
    statuses: [],
    pageIndex: DEFAULT_DIRECTORY_PAGE_INDEX,
    pageSize: normalizeDefaultPageSize(options.defaultPageSize),
    sort: [...(options.defaultSort ?? [])],
  };
}

export function parseDirectoryListState<TSortField extends string>(
  input: DirectorySearchParamsInput,
  options: ParseDirectoryListStateOptions<TSortField>,
): DirectoryListState<TSortField> {
  const params = createDirectorySearchParams(input);
  const defaultState = getDefaultDirectoryListState(options);
  const sort = normalizeDirectorySortValue(
    params.get(DIRECTORY_PARAM_KEYS.sort),
    options.allowedSortFields,
  );

  return {
    search: normalizeDirectorySearch(params.get(DIRECTORY_PARAM_KEYS.search)),
    statuses: normalizeDirectoryStatuses(params.getAll(DIRECTORY_PARAM_KEYS.statuses)),
    pageIndex: normalizeDirectoryPageIndex(params.get(DIRECTORY_PARAM_KEYS.pageIndex)),
    pageSize:
      normalizeDirectoryPageSize(params.get(DIRECTORY_PARAM_KEYS.pageSize)) ??
      defaultState.pageSize,
    sort: sort.length > 0 ? sort : defaultState.sort,
  };
}

export function serializeDirectoryListState<TSortField extends string>(
  state: DirectoryListState<TSortField>,
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.search) {
    params.set(DIRECTORY_PARAM_KEYS.search, state.search);
  }

  for (const status of state.statuses) {
    params.append(DIRECTORY_PARAM_KEYS.statuses, status);
  }

  if (state.pageIndex > DEFAULT_DIRECTORY_PAGE_INDEX) {
    params.set(DIRECTORY_PARAM_KEYS.pageIndex, String(state.pageIndex));
  }

  if (state.pageSize !== DEFAULT_DIRECTORY_PAGE_SIZE) {
    params.set(DIRECTORY_PARAM_KEYS.pageSize, String(state.pageSize));
  }

  if (state.sort.length > 0) {
    params.set(DIRECTORY_PARAM_KEYS.sort, serializeDirectorySortValue(state.sort));
  }

  return params;
}

export function toDirectoryListQuery<TSortField extends string, TFilters>(
  state: DirectoryListState<TSortField>,
  filters: TFilters,
) {
  return applyDirectoryListQueryState(state, filters);
}

function normalizeDefaultPageSize(value: number | undefined) {
  if (!Number.isInteger(value) || !value || value < 1) {
    return DEFAULT_DIRECTORY_PAGE_SIZE;
  }

  return value;
}
