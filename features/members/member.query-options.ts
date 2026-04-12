import { queryOptions } from "@tanstack/react-query";

import {
  createDepartmentScope,
  createDirectoryDetailKey,
  createDirectoryListKey,
} from "@/features/directory/shared";

import { getMemberById, getMembers } from "./member.service";
import type { MemberListParams } from "./member.types";

export const memberQueryKeys = {
  all: ["directory", "members"] as const,
  lists: () => [...memberQueryKeys.all, "list"] as const,
  departmentLists: (_organizationId: string, _departmentId: string) =>
    [...memberQueryKeys.lists()] as const,
  list: (
    organizationId: string,
    departmentId: string,
    params: MemberListParams
  ) => {
    const scope = createDepartmentScope(organizationId, departmentId);

    return createDirectoryListKey("members", params, scope);
  },
  details: () => [...memberQueryKeys.all, "detail"] as const,
  detail: (organizationId: string, departmentId: string, memberId: string) => {
    const scope = createDepartmentScope(organizationId, departmentId);

    return createDirectoryDetailKey("members", memberId, scope);
  },
};

export function memberListQueryOptions(
  organizationId: string,
  departmentId: string,
  params: MemberListParams
) {
  const scope = createDepartmentScope(organizationId, departmentId);

  return queryOptions({
    queryKey: memberQueryKeys.list(organizationId, departmentId, params),
    queryFn: () => getMembers(scope, params),
  });
}

export function memberDetailQueryOptions(
  organizationId: string,
  departmentId: string,
  memberId: string
) {
  const scope = createDepartmentScope(organizationId, departmentId);

  return queryOptions({
    queryKey: memberQueryKeys.detail(organizationId, departmentId, memberId),
    queryFn: () => getMemberById(scope, memberId),
    enabled: memberId.trim().length > 0,
  });
}
