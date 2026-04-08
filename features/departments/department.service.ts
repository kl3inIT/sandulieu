import {
  getDepartmentByIdApi,
  getDepartmentsApi,
  type DepartmentApiResponse,
} from "@/shared/api/department.api";
import type { DepartmentModel } from "@/shared/model/department.model";

import type {
  DepartmentDetailResponse,
  DepartmentListParams,
  DepartmentQueryScope,
  DepartmentsListResponse,
} from "./department.types";

function mapDepartment(response: DepartmentApiResponse): DepartmentModel {
  return {
    id: response.id,
    organizationId: response.organizationId,
    code: response.code,
    name: response.name,
    status: response.status,
  };
}

export async function getDepartments(
  scope: DepartmentQueryScope,
  params: DepartmentListParams
): Promise<DepartmentsListResponse> {
  const response = await getDepartmentsApi(scope, params);

  return {
    ...response,
    items: response.items.map(mapDepartment),
  };
}

export async function getDepartmentById(
  scope: DepartmentQueryScope,
  departmentId: string
): Promise<DepartmentDetailResponse> {
  const response = await getDepartmentByIdApi(scope, departmentId);
  return mapDepartment(response);
}
