import type { OrganizationScope } from "@/shared/api/directory.contracts";
import type {
  DepartmentFilters,
  DepartmentListQuery,
  DepartmentSortField,
} from "@/shared/api/department.api";
import type { DepartmentModel } from "@/shared/model/department.model";

export type Department = DepartmentModel;
export type DepartmentListParams = DepartmentListQuery;
export type DepartmentListFilters = DepartmentFilters;
export type DepartmentListSortField = DepartmentSortField;
export type DepartmentQueryScope = OrganizationScope;
export type DepartmentsListResponse = {
  items: Department[];
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
};
export type DepartmentDetailResponse = Department;
