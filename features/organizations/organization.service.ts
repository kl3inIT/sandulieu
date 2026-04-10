import {
  createOrganizationApi,
  deleteOrganizationApi,
  getOrganizationByIdApi,
  getOrganizationDeleteGuardApi,
  getOrganizationsApi,
  type OrganizationApiResponse,
  updateOrganizationApi,
} from "@/shared/api/organization.api";
import type { OrganizationModel } from "@/shared/model/organization.model";

import type {
  OrganizationDeleteGuard,
  OrganizationDeleteResult,
  OrganizationDetailResponse,
  OrganizationListParams,
  OrganizationMutationPayload,
  OrganizationsListResponse,
} from "./organization.types";

function mapOrganization(response: OrganizationApiResponse): OrganizationModel {
  return {
    id: response.id,
    code: response.code,
    name: response.name,
    status: response.status,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    departmentSummary: response.departmentSummary,
  };
}

export async function getOrganizations(
  params: OrganizationListParams
): Promise<OrganizationsListResponse> {
  const response = await getOrganizationsApi(params);

  return {
    ...response,
    items: response.items.map(mapOrganization),
  };
}

export async function getOrganizationById(
  organizationId: string
): Promise<OrganizationDetailResponse> {
  const response = await getOrganizationByIdApi(organizationId);
  return mapOrganization(response);
}

export async function createOrganization(
  payload: OrganizationMutationPayload
): Promise<OrganizationDetailResponse> {
  const response = await createOrganizationApi(payload);
  return mapOrganization(response);
}

export async function updateOrganization(
  organizationId: string,
  payload: OrganizationMutationPayload
): Promise<OrganizationDetailResponse> {
  const response = await updateOrganizationApi(organizationId, payload);
  return mapOrganization(response);
}

export async function getOrganizationDeleteGuard(
  organizationId: string
): Promise<OrganizationDeleteGuard> {
  return getOrganizationDeleteGuardApi(organizationId);
}

export async function deleteOrganization(
  organizationId: string
): Promise<OrganizationDeleteResult> {
  return deleteOrganizationApi(organizationId);
}
