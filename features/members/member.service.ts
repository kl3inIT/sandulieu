import {
  bulkUpdateMemberStatusApi,
  createMemberApi,
  deleteMemberApi,
  getMemberByIdApi,
  getMembersApi,
  updateMemberApi,
  type BulkUpdateMemberStatusApiInput,
  type MemberDetailApiResponse,
} from "@/shared/api/member.api";
import type {
  MemberModel,
  MemberParentContextModel,
} from "@/shared/model/member.model";

import type {
  BulkUpdateMemberStatusResult,
  MemberDeleteResult,
  MemberDetailResponse,
  MemberListParams,
  MemberMutationPayload,
  MemberQueryScope,
  MembersListResponse,
} from "./member.types";

function mapMemberParentContext(
  response: MemberDetailApiResponse["parentContext"]
): MemberParentContextModel {
  return { ...response };
}

function mapMemberDetail(
  response: MemberDetailApiResponse
): MemberDetailResponse {
  const base: MemberModel = {
    id: response.id,
    organizationId: response.organizationId,
    departmentId: response.departmentId,
    memberCode: response.memberCode,
    fullName: response.fullName,
    status: response.status,
  };

  return {
    ...base,
    parentContext: mapMemberParentContext(response.parentContext),
  };
}

export async function getMembers(
  scope: MemberQueryScope,
  params: MemberListParams
): Promise<MembersListResponse> {
  const response = await getMembersApi(scope, params);

  return {
    ...response,
    items: response.items.map((item) => ({
      id: item.id,
      organizationId: item.organizationId,
      departmentId: item.departmentId,
      memberCode: item.memberCode,
      fullName: item.fullName,
      status: item.status,
    })),
  };
}

export async function getMemberById(
  scope: MemberQueryScope,
  memberId: string
): Promise<MemberDetailResponse> {
  const response = await getMemberByIdApi(scope, memberId);
  return mapMemberDetail(response);
}

export async function createMember(
  payload: MemberMutationPayload
): Promise<MemberDetailResponse> {
  const response = await createMemberApi(payload);
  return mapMemberDetail(response);
}

export async function updateMember(
  scope: MemberQueryScope,
  memberId: string,
  payload: MemberMutationPayload
): Promise<MemberDetailResponse> {
  const response = await updateMemberApi(scope, memberId, payload);
  return mapMemberDetail(response);
}

export async function deleteMember(
  scope: MemberQueryScope,
  memberId: string
): Promise<MemberDeleteResult> {
  return deleteMemberApi(scope, memberId);
}

export async function bulkUpdateMemberStatus(
  input: BulkUpdateMemberStatusApiInput
): Promise<BulkUpdateMemberStatusResult> {
  return bulkUpdateMemberStatusApi(input);
}
