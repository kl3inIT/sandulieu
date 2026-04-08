import type { DepartmentScope } from "@/shared/api/directory.contracts";
import type {
  MemberFilters,
  MemberListQuery,
  MemberSortField,
} from "@/shared/api/member.api";
import type { MemberModel } from "@/shared/model/member.model";

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
export type MemberDetailResponse = Member;
