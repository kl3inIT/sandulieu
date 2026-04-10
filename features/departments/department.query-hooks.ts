import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createOrganizationScope } from "@/features/directory/shared";

import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "./department.service";
import {
  departmentDeleteGuardQueryOptions,
  departmentDetailQueryOptions,
  departmentListQueryOptions,
  departmentQueryKeys,
} from "./department.query-options";
import type {
  DepartmentListParams,
  DepartmentMutationPayload,
} from "./department.types";

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

export function useDepartmentDeleteGuardQuery(
  organizationId: string,
  departmentId: string
) {
  return useQuery(
    departmentDeleteGuardQueryOptions(organizationId, departmentId)
  );
}

export function useCreateDepartmentMutation(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DepartmentMutationPayload) =>
      createDepartment(payload),
    onSuccess: async (department) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.organizationLists(organizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.detail(organizationId, department.id),
        }),
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.deleteGuard(
            organizationId,
            department.id
          ),
        }),
      ]);
    },
  });
}

export function useUpdateDepartmentMutation(organizationId: string) {
  const queryClient = useQueryClient();
  const scope = createOrganizationScope(organizationId);

  return useMutation({
    mutationFn: ({
      departmentId,
      payload,
    }: {
      departmentId: string;
      payload: DepartmentMutationPayload;
    }) => updateDepartment(scope, departmentId, payload),
    onSuccess: async (department) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.organizationLists(organizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.detail(organizationId, department.id),
        }),
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.deleteGuard(
            organizationId,
            department.id
          ),
        }),
      ]);
    },
  });
}

export function useDeleteDepartmentMutation(organizationId: string) {
  const queryClient = useQueryClient();
  const scope = createOrganizationScope(organizationId);

  return useMutation({
    mutationFn: (departmentId: string) => deleteDepartment(scope, departmentId),
    onSuccess: async (_, departmentId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.organizationLists(organizationId),
        }),
        queryClient.removeQueries({
          queryKey: departmentQueryKeys.detail(organizationId, departmentId),
        }),
        queryClient.invalidateQueries({
          queryKey: departmentQueryKeys.deleteGuard(
            organizationId,
            departmentId
          ),
        }),
      ]);
    },
  });
}
