import type {
  DepartmentScope,
  DirectoryListQuery,
  PaginatedResult,
} from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

// ─── API Response Types ───────────────────────────────────────────────────────

export type MemberApiResponse = {
  id: string;
  organizationId: string;
  departmentId: string;
  memberCode: string;
  fullName: string;
  status: DirectoryStatus;
  deletedAt?: string;
};

export type MemberParentContextApiResponse = {
  organizationId: string;
  organizationName: string;
  departmentId: string;
  departmentName: string;
  manageOrganizationPath: string;
  manageDepartmentsPath: string;
  manageMembersPath: string;
};

export type MemberDetailApiResponse = MemberApiResponse & {
  parentContext: MemberParentContextApiResponse;
};

export type MemberCreateApiInput = {
  id: string;
  organizationId: string;
  departmentId: string;
  memberCode: string;
  fullName: string;
  status: DirectoryStatus;
};

export type MemberUpdateApiInput = MemberCreateApiInput;

export type DeleteMemberApiResponse = {
  id: string;
  organizationId: string;
  departmentId: string;
  deletedAt: string;
};

export type BulkUpdateMemberStatusApiInput = {
  memberIds: string[];
  targetStatus: DirectoryStatus;
};

export type BulkUpdateMemberStatusItemResult = {
  memberId: string;
  success: boolean;
  error?: string;
};

export type BulkUpdateMemberStatusApiResponse = {
  results: BulkUpdateMemberStatusItemResult[];
  successCount: number;
  failureCount: number;
};

export type MemberSortField = "memberCode" | "fullName" | "status";

export type MemberFilters = {
  organizationId?: string;
  departmentId?: string;
};

export type MemberListQuery = DirectoryListQuery<
  MemberSortField,
  MemberFilters
>;

// ─── Directory Lookup Constants ───────────────────────────────────────────────

const ORGANIZATION_DIRECTORY: Record<string, { name: string }> = {
  "org-acme": { name: "Acme Corporation" },
  "org-sao-mai": { name: "Sao Mai Group" },
};

const DEPARTMENT_DIRECTORY: Record<
  string,
  { name: string; organizationId: string }
> = {
  "dept-acme-sales": { name: "Kinh doanh", organizationId: "org-acme" },
  "dept-acme-ops": { name: "Vận hành", organizationId: "org-acme" },
  "dept-sao-mai-hr": { name: "Nhân sự", organizationId: "org-sao-mai" },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

let MEMBERS: MemberApiResponse[] = [
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

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getMembersApi(
  scope: DepartmentScope,
  query: MemberListQuery
): Promise<PaginatedResult<MemberApiResponse>> {
  const filteredItems = MEMBERS.filter((member) => {
    if (member.deletedAt) {
      return false;
    }

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
): Promise<MemberDetailApiResponse> {
  const member = MEMBERS.find(
    (item) =>
      item.organizationId === scope.organizationId &&
      item.departmentId === scope.departmentId &&
      item.id === memberId
  );

  if (!member || member.deletedAt) {
    throw new Error("Không tìm thấy thành viên.");
  }

  const organization = ORGANIZATION_DIRECTORY[member.organizationId];
  const department = DEPARTMENT_DIRECTORY[member.departmentId];

  const parentContext: MemberParentContextApiResponse = {
    organizationId: member.organizationId,
    organizationName: organization?.name ?? member.organizationId,
    departmentId: member.departmentId,
    departmentName: department?.name ?? member.departmentId,
    manageOrganizationPath: `/admin/organizations/${member.organizationId}`,
    manageDepartmentsPath: `/admin/organizations/${member.organizationId}/departments`,
    manageMembersPath: `/admin/organizations/${member.organizationId}/departments/${member.departmentId}/members`,
  };

  return {
    ...member,
    parentContext,
  };
}

export async function createMemberApi(
  input: MemberCreateApiInput
): Promise<MemberDetailApiResponse> {
  const normalizedCode = input.memberCode.trim().toLocaleLowerCase("vi");
  const conflict = MEMBERS.find(
    (m) =>
      m.departmentId === input.departmentId &&
      !m.deletedAt &&
      m.memberCode.trim().toLocaleLowerCase("vi") === normalizedCode
  );

  if (conflict) {
    throw new Error("Mã thành viên đã tồn tại.");
  }

  const newMember: MemberApiResponse = {
    id: input.id,
    organizationId: input.organizationId,
    departmentId: input.departmentId,
    memberCode: input.memberCode.trim(),
    fullName: input.fullName.trim(),
    status: input.status,
  };

  MEMBERS = [newMember, ...MEMBERS];

  return getMemberByIdApi(
    { organizationId: input.organizationId, departmentId: input.departmentId },
    input.id
  );
}

export async function updateMemberApi(
  scope: DepartmentScope,
  memberId: string,
  input: MemberUpdateApiInput
): Promise<MemberDetailApiResponse> {
  const existingIndex = MEMBERS.findIndex(
    (m) =>
      m.id === memberId &&
      m.organizationId === scope.organizationId &&
      m.departmentId === scope.departmentId &&
      !m.deletedAt
  );

  if (existingIndex === -1) {
    throw new Error("Không tìm thấy thành viên.");
  }

  const existing = MEMBERS[existingIndex];

  MEMBERS = MEMBERS.map((m, idx) =>
    idx === existingIndex
      ? {
          ...existing,
          memberCode: input.memberCode.trim(),
          fullName: input.fullName.trim(),
          status: input.status,
        }
      : m
  );

  return getMemberByIdApi(scope, memberId);
}

export async function deleteMemberApi(
  scope: DepartmentScope,
  memberId: string
): Promise<DeleteMemberApiResponse> {
  const existingIndex = MEMBERS.findIndex(
    (m) =>
      m.id === memberId &&
      m.organizationId === scope.organizationId &&
      m.departmentId === scope.departmentId &&
      !m.deletedAt
  );

  if (existingIndex === -1) {
    throw new Error("Không tìm thấy thành viên.");
  }

  const deletedAt = new Date().toISOString();

  MEMBERS = MEMBERS.map((m, idx) =>
    idx === existingIndex ? { ...m, deletedAt } : m
  );

  return {
    id: memberId,
    organizationId: scope.organizationId,
    departmentId: scope.departmentId,
    deletedAt,
  };
}

export async function bulkUpdateMemberStatusApi(
  input: BulkUpdateMemberStatusApiInput
): Promise<BulkUpdateMemberStatusApiResponse> {
  const results: BulkUpdateMemberStatusItemResult[] = input.memberIds.map(
    (memberId) => {
      const idx = MEMBERS.findIndex((m) => m.id === memberId && !m.deletedAt);

      if (idx === -1) {
        return {
          memberId,
          success: false,
          error: "Không tìm thấy thành viên.",
        };
      }

      MEMBERS = MEMBERS.map((m, i) =>
        i === idx ? { ...m, status: input.targetStatus } : m
      );

      return { memberId, success: true };
    }
  );

  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.filter((r) => !r.success).length;

  return { results, successCount, failureCount };
}

// ─── Private Helpers ──────────────────────────────────────────────────────────

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
