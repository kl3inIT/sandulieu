import type {
  DepartmentScope,
  DirectoryListQuery,
  OrganizationScope,
} from "@/shared/api/directory.contracts";

export type DirectoryQueryScope = OrganizationScope | DepartmentScope | null;

type DirectoryEntityName = "organizations" | "departments" | "members";

export function createDirectoryListKey<
  TEntityName extends DirectoryEntityName,
  TSortField extends string,
  TFilters,
>(
  entityName: TEntityName,
  params: DirectoryListQuery<TSortField, TFilters>,
  scope: DirectoryQueryScope = null,
) {
  return ["directory", entityName, "list", { scope, params }] as const;
}

export function createDirectoryDetailKey<
  TEntityName extends DirectoryEntityName,
  TIdentifier extends string | number,
>(
  entityName: TEntityName,
  identifier: TIdentifier,
  scope: DirectoryQueryScope = null,
) {
  return ["directory", entityName, "detail", { scope, identifier }] as const;
}
