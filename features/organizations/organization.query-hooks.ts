import { useQuery } from "@tanstack/react-query";

import {
  organizationDetailQueryOptions,
  organizationListQueryOptions,
} from "./organization.query-options";
import type { OrganizationListParams } from "./organization.types";

export function useOrganizationListQuery(params: OrganizationListParams) {
  return useQuery(organizationListQueryOptions(params));
}

export function useOrganizationDetailQuery(organizationId: string) {
  return useQuery(organizationDetailQueryOptions(organizationId));
}
