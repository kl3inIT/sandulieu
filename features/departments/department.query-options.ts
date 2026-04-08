import { queryOptions } from "@tanstack/react-query";

import {
  createDirectoryDetailKey,
  createDirectoryListKey,
  createOrganizationScope,
} from "@/features/directory/shared";

import { getDepartmentById, getDepartments } from "./department.service";
import type { DepartmentListParams } from "./department.types";

export const departmentQueryKeys = {
  all: ["directory", "departments"] as const,
  lists: () => [...departmentQueryKeys.all, "list"] as const,
  list: (organizationId: string, params: DepartmentListParams) => {
    const scope = createOrganizationScope(organizationId);

    return createDirectoryListKey("departments", params, scope);
  },
  details: () => [...departmentQueryKeys.all, "detail"] as const,
  detail: (organizationId: string, departmentId: string) => {
    const scope = createOrganizationScope(organizationId);

    return createDirectoryDetailKey("departments", departmentId, scope);
  },
};

export function departmentListQueryOptions(
  organizationId: string,
  params: DepartmentListParams
) {
  const scope = createOrganizationScope(organizationId);

  return queryOptions({
    queryKey: departmentQueryKeys.list(organizationId, params),
    queryFn: () => getDepartments(scope, params),
  });
}

export function departmentDetailQueryOptions(
  organizationId: string,
  departmentId: string
) {
  const scope = createOrganizationScope(organizationId);

  return queryOptions({
    queryKey: departmentQueryKeys.detail(organizationId, departmentId),
    queryFn: () => getDepartmentById(scope, departmentId),
    enabled: departmentId.trim().length > 0,
  });
}
