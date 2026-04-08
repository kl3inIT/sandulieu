import { useQuery } from "@tanstack/react-query";

import {
  departmentDetailQueryOptions,
  departmentListQueryOptions,
} from "./department.query-options";
import type { DepartmentListParams } from "./department.types";

export function useDepartmentListQuery(
  organizationId: string,
  params: DepartmentListParams
) {
  return useQuery(departmentListQueryOptions(organizationId, params));
}

export function useDepartmentDetailQuery(
  organizationId: string,
  departmentId: string
) {
  return useQuery(departmentDetailQueryOptions(organizationId, departmentId));
}
