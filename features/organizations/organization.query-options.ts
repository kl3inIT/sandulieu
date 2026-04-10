import { queryOptions } from "@tanstack/react-query";

import {
  createDirectoryDetailKey,
  createDirectoryListKey,
} from "@/features/directory/shared";

import {
  getOrganizationById,
  getOrganizationDeleteGuard,
  getOrganizations,
} from "./organization.service";
import type { OrganizationListParams } from "./organization.types";

export const organizationQueryKeys = {
  all: ["directory", "organizations"] as const,
  lists: () => [...organizationQueryKeys.all, "list"] as const,
  list: (params: OrganizationListParams) =>
    createDirectoryListKey("organizations", params),
  details: () => [...organizationQueryKeys.all, "detail"] as const,
  detail: (organizationId: string) =>
    createDirectoryDetailKey("organizations", organizationId),
  deleteGuards: () => [...organizationQueryKeys.all, "delete-guard"] as const,
  deleteGuard: (organizationId: string) =>
    [...organizationQueryKeys.deleteGuards(), { organizationId }] as const,
};

export function organizationListQueryOptions(params: OrganizationListParams) {
  return queryOptions({
    queryKey: organizationQueryKeys.list(params),
    queryFn: () => getOrganizations(params),
  });
}

export function organizationDetailQueryOptions(organizationId: string) {
  return queryOptions({
    queryKey: organizationQueryKeys.detail(organizationId),
    queryFn: () => getOrganizationById(organizationId),
    enabled: organizationId.trim().length > 0,
  });
}

export function organizationDeleteGuardQueryOptions(organizationId: string) {
  return queryOptions({
    queryKey: organizationQueryKeys.deleteGuard(organizationId),
    queryFn: () => getOrganizationDeleteGuard(organizationId),
    enabled: organizationId.trim().length > 0,
  });
}
