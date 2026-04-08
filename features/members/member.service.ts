import {
  getMemberByIdApi,
  getMembersApi,
  type MemberApiResponse,
} from "@/shared/api/member.api";
import type { MemberModel } from "@/shared/model/member.model";

import type {
  MemberDetailResponse,
  MemberListParams,
  MemberQueryScope,
  MembersListResponse,
} from "./member.types";

function mapMember(response: MemberApiResponse): MemberModel {
  return {
    id: response.id,
    organizationId: response.organizationId,
    departmentId: response.departmentId,
    memberCode: response.memberCode,
    fullName: response.fullName,
    status: response.status,
  };
}

export async function getMembers(
  scope: MemberQueryScope,
  params: MemberListParams
): Promise<MembersListResponse> {
  const response = await getMembersApi(scope, params);

  return {
    ...response,
    items: response.items.map(mapMember),
  };
}

export async function getMemberById(
  scope: MemberQueryScope,
  memberId: string
): Promise<MemberDetailResponse> {
  const response = await getMemberByIdApi(scope, memberId);
  return mapMember(response);
}
