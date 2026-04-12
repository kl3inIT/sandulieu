import type { DepartmentScope } from "@/shared/api/directory.contracts";
import type {
  BulkUpdateMemberStatusApiResponse,
  DeleteMemberApiResponse,
  MemberCreateApiInput,
  MemberDetailApiResponse,
  MemberFilters,
  MemberListQuery,
  MemberSortField,
} from "@/shared/api/member.api";
import type {
  MemberModel,
  MemberParentContextModel,
} from "@/shared/model/member.model";

export type Member = MemberModel;
export type MemberListParams = MemberListQuery;
export type MemberListFilters = MemberFilters;
export type MemberListSortField = MemberSortField;
export type MemberQueryScope = DepartmentScope;
export type MembersListResponse = {
  items: Member[];
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
};
export type MemberDetailResponse = MemberModel & {
  parentContext: MemberParentContextModel;
};
export type MemberMutationPayload = MemberCreateApiInput;
export type MemberDeleteResult = DeleteMemberApiResponse;
export type BulkUpdateMemberStatusResult = BulkUpdateMemberStatusApiResponse;
export type MemberDetailApiContract = MemberDetailApiResponse;
