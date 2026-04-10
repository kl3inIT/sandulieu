import {
  createDepartmentApi,
  deleteDepartmentApi,
  getDepartmentByIdApi,
  getDepartmentDeleteGuardApi,
  getDepartmentsApi,
  updateDepartmentApi,
  type DepartmentDetailApiResponse,
} from "@/shared/api/department.api";
import type {
  DepartmentMemberSummaryModel,
  DepartmentModel,
  DepartmentParentContextModel,
} from "@/shared/model/department.model";

import type {
  DepartmentDeleteGuard,
  DepartmentDeleteResult,
  DepartmentDetailResponse,
  DepartmentListParams,
  DepartmentMutationPayload,
  DepartmentQueryScope,
  DepartmentsListResponse,
} from "./department.types";

function mapDepartmentParentContext(
  response: DepartmentDetailApiResponse["parentContext"]
): DepartmentParentContextModel {
  return {
    organizationId: response.organizationId,
    organizationName: response.organizationName,
    manageOrganizationPath: response.manageOrganizationPath,
    manageDepartmentsPath: response.manageDepartmentsPath,
  };
}

function mapDepartmentMemberSummary(
  response: DepartmentDetailApiResponse["memberSummary"]
): DepartmentMemberSummaryModel {
  return {
    totalMembers: response.totalMembers,
    activeMembers: response.activeMembers,
    inactiveMembers: response.inactiveMembers,
    archivedMembers: response.archivedMembers,
    previewNames: response.previewNames,
    manageMembersPath: response.manageMembersPath,
  };
}

function mapDepartment(response: DepartmentDetailApiResponse): DepartmentModel {
  return {
    id: response.id,
    organizationId: response.organizationId,
    code: response.code,
    name: response.name,
    status: response.status,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    parentContext: mapDepartmentParentContext(response.parentContext),
    memberSummary: mapDepartmentMemberSummary(response.memberSummary),
  };
}

export async function getDepartments(
  scope: DepartmentQueryScope,
  params: DepartmentListParams
): Promise<DepartmentsListResponse> {
  const response = await getDepartmentsApi(scope, params);

  return {
    ...response,
    items: await Promise.all(
      response.items.map((department) =>
        getDepartmentById(scope, department.id)
      )
    ),
  };
}

export async function getDepartmentById(
  scope: DepartmentQueryScope,
  departmentId: string
): Promise<DepartmentDetailResponse> {
  const response = await getDepartmentByIdApi(scope, departmentId);
  return mapDepartment(response);
}

export async function createDepartment(
  payload: DepartmentMutationPayload
): Promise<DepartmentDetailResponse> {
  const response = await createDepartmentApi(payload);
  return mapDepartment(response);
}

export async function updateDepartment(
  scope: DepartmentQueryScope,
  departmentId: string,
  payload: DepartmentMutationPayload
): Promise<DepartmentDetailResponse> {
  const response = await updateDepartmentApi(scope, departmentId, payload);
  return mapDepartment(response);
}

export async function getDepartmentDeleteGuard(
  scope: DepartmentQueryScope,
  departmentId: string
): Promise<DepartmentDeleteGuard> {
  return getDepartmentDeleteGuardApi(scope, departmentId);
}

export async function deleteDepartment(
  scope: DepartmentQueryScope,
  departmentId: string
): Promise<DepartmentDeleteResult> {
  return deleteDepartmentApi(scope, departmentId);
}
