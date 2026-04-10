import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "./organization.service";
import {
  organizationDeleteGuardQueryOptions,
  organizationDetailQueryOptions,
  organizationListQueryOptions,
  organizationQueryKeys,
} from "./organization.query-options";
import type {
  OrganizationListParams,
  OrganizationMutationPayload,
} from "./organization.types";

export function useOrganizationListQuery(params: OrganizationListParams) {
  return useQuery(organizationListQueryOptions(params));
}

export function useOrganizationDetailQuery(organizationId: string) {
  return useQuery(organizationDetailQueryOptions(organizationId));
}

export function useOrganizationDeleteGuardQuery(organizationId: string) {
  return useQuery(organizationDeleteGuardQueryOptions(organizationId));
}

export function useCreateOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: OrganizationMutationPayload) =>
      createOrganization(payload),
    onSuccess: async (organization) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.detail(organization.id),
        }),
      ]);
    },
  });
}

export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: OrganizationMutationPayload;
    }) => updateOrganization(organizationId, payload),
    onSuccess: async (organization) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.detail(organization.id),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.deleteGuard(organization.id),
        }),
      ]);
    },
  });
}

export function useDeleteOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (organizationId: string) => deleteOrganization(organizationId),
    onSuccess: async (_, organizationId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.lists(),
        }),
        queryClient.removeQueries({
          queryKey: organizationQueryKeys.detail(organizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationQueryKeys.deleteGuard(organizationId),
        }),
      ]);
    },
  });
}
