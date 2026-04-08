import type {
  OrganizationFilters,
  OrganizationListQuery,
  OrganizationSortField,
} from "@/shared/api/organization.api";
import type { OrganizationModel } from "@/shared/model/organization.model";

export type Organization = OrganizationModel;
export type OrganizationListParams = OrganizationListQuery;
export type OrganizationListFilters = OrganizationFilters;
export type OrganizationListSortField = OrganizationSortField;
export type OrganizationsListResponse = {
  items: Organization[];
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
};
export type OrganizationDetailResponse = Organization;
