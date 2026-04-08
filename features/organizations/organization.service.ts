import {
  getOrganizationByIdApi,
  getOrganizationsApi,
  type OrganizationApiResponse,
} from "@/shared/api/organization.api";
import type { OrganizationModel } from "@/shared/model/organization.model";

import type {
  OrganizationDetailResponse,
  OrganizationListParams,
  OrganizationsListResponse,
} from "./organization.types";

function mapOrganization(response: OrganizationApiResponse): OrganizationModel {
  return {
    id: response.id,
    code: response.code,
    name: response.name,
    status: response.status,
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
