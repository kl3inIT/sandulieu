import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type SortDirection = "asc" | "desc";

export type DirectoryPage = {
  pageIndex: number;
  pageSize: number;
};

export type DirectorySort<TSortField extends string> = {
  field: TSortField;
  direction: SortDirection;
};

export type DirectoryListQuery<
  TSortField extends string,
  TFilters = Record<string, never>,
> = {
  search?: string;
  statuses?: DirectoryStatus[];
  sort?: DirectorySort<TSortField>[];
  page: DirectoryPage;
  filters: TFilters;
};

export type PaginatedResult<TItem> = {
  items: TItem[];
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
};

export type OrganizationScope = {
  organizationId: string;
};

export type DepartmentScope = {
  organizationId: string;
  departmentId: string;
};
