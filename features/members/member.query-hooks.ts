import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { BulkUpdateMemberStatusApiInput } from "@/shared/api/member.api";
import { createDepartmentScope } from "@/features/directory/shared";

import {
  bulkUpdateMemberStatus,
  createMember,
  deleteMember,
  updateMember,
} from "./member.service";
import {
  memberDetailQueryOptions,
  memberListQueryOptions,
  memberQueryKeys,
} from "./member.query-options";
import type { MemberListParams, MemberMutationPayload } from "./member.types";

export function useMemberListQuery(
  organizationId: string,
  departmentId: string,
  params: MemberListParams
) {
  return useQuery(memberListQueryOptions(organizationId, departmentId, params));
}

export function useMemberDetailQuery(
  organizationId: string,
  departmentId: string,
  memberId: string
) {
  return useQuery(
    memberDetailQueryOptions(organizationId, departmentId, memberId)
  );
}

export function useCreateMemberMutation(
  organizationId: string,
  departmentId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MemberMutationPayload) => createMember(payload),
    onSuccess: async (member) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: memberQueryKeys.departmentLists(
            organizationId,
            departmentId
          ),
        }),
        queryClient.invalidateQueries({
          queryKey: memberQueryKeys.detail(
            organizationId,
            departmentId,
            member.id
          ),
        }),
      ]);
    },
  });
}

export function useUpdateMemberMutation(
  organizationId: string,
  departmentId: string
) {
  const queryClient = useQueryClient();
  const scope = createDepartmentScope(organizationId, departmentId);

  return useMutation({
    mutationFn: ({
      memberId,
      payload,
    }: {
      memberId: string;
      payload: MemberMutationPayload;
    }) => updateMember(scope, memberId, payload),
    onSuccess: async (member) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: memberQueryKeys.departmentLists(
            organizationId,
            departmentId
          ),
        }),
        queryClient.invalidateQueries({
          queryKey: memberQueryKeys.detail(
            organizationId,
            departmentId,
            member.id
          ),
        }),
      ]);
    },
  });
}

export function useDeleteMemberMutation(
  organizationId: string,
  departmentId: string
) {
  const queryClient = useQueryClient();
  const scope = createDepartmentScope(organizationId, departmentId);

  return useMutation({
    mutationFn: (memberId: string) => deleteMember(scope, memberId),
    onSuccess: async (_, memberId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: memberQueryKeys.departmentLists(
            organizationId,
            departmentId
          ),
        }),
        queryClient.removeQueries({
          queryKey: memberQueryKeys.detail(
            organizationId,
            departmentId,
            memberId
          ),
        }),
      ]);
    },
  });
}

export function useBulkUpdateMemberStatusMutation(
  organizationId: string,
  departmentId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: BulkUpdateMemberStatusApiInput) =>
      bulkUpdateMemberStatus(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: memberQueryKeys.departmentLists(organizationId, departmentId),
      });
    },
  });
}
