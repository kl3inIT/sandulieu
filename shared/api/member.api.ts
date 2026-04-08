import type {
  DepartmentScope,
  DirectoryListQuery,
  PaginatedResult,
} from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type MemberApiResponse = {
  id: string;
  organizationId: string;
  departmentId: string;
  memberCode: string;
  fullName: string;
  status: DirectoryStatus;
};

export type MemberSortField = "memberCode" | "fullName" | "status";

export type MemberFilters = {
  organizationId?: string;
  departmentId?: string;
};

export type MemberListQuery = DirectoryListQuery<MemberSortField, MemberFilters>;

const MEMBERS: MemberApiResponse[] = [
  {
    id: "member-acme-001",
    organizationId: "org-acme",
    departmentId: "dept-acme-sales",
    memberCode: "NV-001",
    fullName: "Nguyễn Minh An",
    status: "active",
  },
  {
    id: "member-acme-002",
    organizationId: "org-acme",
    departmentId: "dept-acme-sales",
    memberCode: "NV-002",
    fullName: "Trần Bảo Vy",
    status: "inactive",
  },
  {
    id: "member-acme-003",
    organizationId: "org-acme",
    departmentId: "dept-acme-ops",
    memberCode: "NV-003",
    fullName: "Lê Quốc Hưng",
    status: "archived",
  },
  {
    id: "member-sao-mai-001",
    organizationId: "org-sao-mai",
    departmentId: "dept-sao-mai-hr",
    memberCode: "NV-101",
    fullName: "Phạm Thu Hà",
    status: "active",
  },
];

export async function getMembersApi(
  scope: DepartmentScope,
  query: MemberListQuery
): Promise<PaginatedResult<MemberApiResponse>> {
  const filteredItems = MEMBERS.filter((member) => {
    if (
      member.organizationId !== scope.organizationId ||
      member.departmentId !== scope.departmentId
    ) {
      return false;
    }

    const matchesOrganizationFilter =
      !query.filters.organizationId ||
      query.filters.organizationId === member.organizationId;

    const matchesDepartmentFilter =
      !query.filters.departmentId ||
      query.filters.departmentId === member.departmentId;

    const matchesSearch =
      !query.search ||
      [member.memberCode, member.fullName]
        .join(" ")
        .toLowerCase()
        .includes(query.search.toLowerCase());

    const matchesStatus =
      !query.statuses?.length || query.statuses.includes(member.status);

    return (
      matchesOrganizationFilter &&
      matchesDepartmentFilter &&
      matchesSearch &&
      matchesStatus
    );
  });

  const sortedItems = applyMemberSort(filteredItems, query);
  return paginateResults(sortedItems, query);
}

export async function getMemberByIdApi(
  scope: DepartmentScope,
  memberId: string
): Promise<MemberApiResponse> {
  const member = MEMBERS.find(
    (item) =>
      item.organizationId === scope.organizationId &&
      item.departmentId === scope.departmentId &&
      item.id === memberId
  );

  if (!member) {
    throw new Error("Không tìm thấy thành viên.");
  }

  return member;
}

function applyMemberSort(
  items: MemberApiResponse[],
  query: MemberListQuery
): MemberApiResponse[] {
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
  items: MemberApiResponse[],
  query: MemberListQuery
): PaginatedResult<MemberApiResponse> {
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
