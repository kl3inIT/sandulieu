import { useQuery } from "@tanstack/react-query";

import {
  memberDetailQueryOptions,
  memberListQueryOptions,
} from "./member.query-options";
import type { MemberListParams } from "./member.types";

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
