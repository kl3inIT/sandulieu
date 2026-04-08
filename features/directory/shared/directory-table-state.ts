import type { DirectorySort } from "@/shared/api/directory.contracts";

import type { DirectoryListState } from "./directory-filters";

export type DirectoryTableSortingState = Array<{
  id: string;
  desc: boolean;
}>;

export type DirectoryTableState = {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: DirectoryTableSortingState;
  globalFilter: string;
};

export function buildDirectoryTableState<TSortField extends string>(
  state: DirectoryListState<TSortField>,
): DirectoryTableState {
  return {
    pagination: {
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
    },
    sorting: toDirectorySortState(state.sort),
    globalFilter: state.search,
  };
}

export function toDirectorySortState<TSortField extends string>(
  sort: readonly DirectorySort<TSortField>[],
): DirectoryTableSortingState {
  return sort.map(({ field, direction }) => ({
    id: field,
    desc: direction === "desc",
  }));
}
