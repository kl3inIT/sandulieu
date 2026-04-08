import type {
  DirectoryListQuery,
  OrganizationScope,
  PaginatedResult,
} from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type DepartmentApiResponse = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: DirectoryStatus;
};

export type DepartmentSortField = "code" | "name" | "status";

export type DepartmentFilters = {
  organizationId?: string;
};

export type DepartmentListQuery = DirectoryListQuery<
  DepartmentSortField,
  DepartmentFilters
>;

const DEPARTMENTS: DepartmentApiResponse[] = [
  {
    id: "dept-acme-sales",
    organizationId: "org-acme",
    code: "SALE",
    name: "Kinh doanh doanh nghiệp",
    status: "active",
  },
  {
    id: "dept-acme-ops",
    organizationId: "org-acme",
    code: "OPS",
    name: "Vận hành vùng Nam",
    status: "inactive",
  },
  {
    id: "dept-sao-mai-hr",
    organizationId: "org-sao-mai",
    code: "HR",
    name: "Nhân sự trung tâm",
    status: "active",
  },
];

export async function getDepartmentsApi(
  scope: OrganizationScope,
  query: DepartmentListQuery
): Promise<PaginatedResult<DepartmentApiResponse>> {
  const filteredItems = DEPARTMENTS.filter((department) => {
    if (department.organizationId !== scope.organizationId) {
      return false;
    }

    const matchesFilterOrganization =
      !query.filters.organizationId ||
      query.filters.organizationId === department.organizationId;

    const matchesSearch =
      !query.search ||
      [department.code, department.name]
        .join(" ")
        .toLowerCase()
        .includes(query.search.toLowerCase());

    const matchesStatus =
      !query.statuses?.length || query.statuses.includes(department.status);

    return matchesFilterOrganization && matchesSearch && matchesStatus;
  });

  const sortedItems = applyDepartmentSort(filteredItems, query);
  return paginateResults(sortedItems, query);
}

export async function getDepartmentByIdApi(
  scope: OrganizationScope,
  departmentId: string
): Promise<DepartmentApiResponse> {
  const department = DEPARTMENTS.find(
    (item) =>
      item.organizationId === scope.organizationId && item.id === departmentId
  );

  if (!department) {
    throw new Error("Không tìm thấy phòng ban.");
  }

  return department;
}

function applyDepartmentSort(
  items: DepartmentApiResponse[],
  query: DepartmentListQuery
): DepartmentApiResponse[] {
  if (!query.sort?.length) {
    return items;
  }

  return [...items].sort((left, right) => {
    for (const sort of query.sort ?? []) {
      const comparison = compareValues(left[sort.field], right[sort.field]);

      if (comparison !== 0) {
        return sort.direction === "asc" ? comparison : -comparison;
      }
    }

    return 0;
  });
}

function paginateResults(
  items: DepartmentApiResponse[],
  query: DepartmentListQuery
): PaginatedResult<DepartmentApiResponse> {
  const pageIndex = Math.max(0, query.page.pageIndex);
  const pageSize = Math.min(Math.max(1, query.page.pageSize), 100);
  const start = pageIndex * pageSize;
  const pagedItems = items.slice(start, start + pageSize);

  return {
    items: pagedItems,
    pageIndex,
    pageSize,
    rowCount: items.length,
    pageCount: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}

function compareValues(left: string, right: string): number {
  return left.localeCompare(right, "vi");
}
