import type {
  DirectoryListQuery,
  OrganizationScope,
  PaginatedResult,
} from "@/shared/api/directory.contracts";
import { getMembersApi } from "@/shared/api/member.api";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

type OrganizationDirectoryEntry = {
  id: string;
  name: string;
  managePath: string;
};

const ORGANIZATION_DIRECTORY: Record<string, OrganizationDirectoryEntry> = {
  "org-acme": {
    id: "org-acme",
    name: "Tập đoàn ACME Việt Nam",
    managePath: "/admin/organizations/org-acme",
  },
  "org-sao-mai": {
    id: "org-sao-mai",
    name: "Công ty Sao Mai Logistics",
    managePath: "/admin/organizations/org-sao-mai",
  },
  "org-thien-long": {
    id: "org-thien-long",
    name: "Thiên Long Manufacturing",
    managePath: "/admin/organizations/org-thien-long",
  },
};

export type DepartmentParentContextApiResponse = {
  organizationId: string;
  organizationName: string;
  manageOrganizationPath: string;
  manageDepartmentsPath: string;
};

export type DepartmentMemberSummaryApiResponse = {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  archivedMembers: number;
  previewNames: string[];
  manageMembersPath: string;
};

export type DepartmentApiResponse = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: DirectoryStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type DepartmentDetailApiResponse = DepartmentApiResponse & {
  parentContext: DepartmentParentContextApiResponse;
  memberSummary: DepartmentMemberSummaryApiResponse;
};

export type DepartmentCreateApiInput = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: DirectoryStatus;
};

export type DepartmentUpdateApiInput = DepartmentCreateApiInput;

export type DepartmentDeleteGuardMessageKey =
  | "deletable"
  | "hasDependentMembers";

export type DepartmentDeleteGuardApiResponse = {
  allowed: boolean;
  organizationId: string;
  departmentId: string;
  dependentMemberCount: number;
  dependentMemberNames: string[];
  messageKey: DepartmentDeleteGuardMessageKey;
  message: string;
  nextStep: string;
  manageMembersPath: string;
};

export type DeleteDepartmentApiResponse = {
  id: string;
  organizationId: string;
  deletedAt: string;
};

export type DepartmentSortField =
  | "code"
  | "name"
  | "status"
  | "createdAt"
  | "updatedAt";

export type DepartmentFilters = {
  organizationId?: string;
};

export type DepartmentListQuery = DirectoryListQuery<
  DepartmentSortField,
  DepartmentFilters
>;

let departments: DepartmentApiResponse[] = [
  {
    id: "dept-acme-sales",
    organizationId: "org-acme",
    code: "SALE",
    name: "Kinh doanh doanh nghiệp",
    status: "active",
    createdAt: "2025-12-05T02:00:00.000Z",
    updatedAt: "2026-03-20T03:15:00.000Z",
  },
  {
    id: "dept-acme-ops",
    organizationId: "org-acme",
    code: "OPS",
    name: "Vận hành vùng Nam",
    status: "inactive",
    createdAt: "2025-12-10T01:10:00.000Z",
    updatedAt: "2026-03-01T08:45:00.000Z",
  },
  {
    id: "dept-sao-mai-hr",
    organizationId: "org-sao-mai",
    code: "HR",
    name: "Nhân sự trung tâm",
    status: "active",
    createdAt: "2025-12-12T04:20:00.000Z",
    updatedAt: "2026-02-14T09:00:00.000Z",
  },
];

export async function getDepartmentsApi(
  scope: OrganizationScope,
  query: DepartmentListQuery
): Promise<PaginatedResult<DepartmentApiResponse>> {
  assertOrganizationScope(scope.organizationId);

  const filteredItems = getActiveDepartmentsByOrganization(
    scope.organizationId
  ).filter((department) => {
    const matchesFilterOrganization =
      !query.filters.organizationId ||
      query.filters.organizationId === department.organizationId;

    const matchesSearch =
      !query.search ||
      [department.id, department.code, department.name]
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
): Promise<DepartmentDetailApiResponse> {
  const department = getDepartmentRecordById(
    scope.organizationId,
    departmentId
  );
  return enrichDepartment(department);
}

export async function createDepartmentApi(
  input: DepartmentCreateApiInput
): Promise<DepartmentDetailApiResponse> {
  const payload = normalizeDepartmentInput(input);

  assertOrganizationScope(payload.organizationId);
  assertUniqueDepartmentIdentity(payload);

  const timestamp = getTimestamp();
  const department: DepartmentApiResponse = {
    ...payload,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  departments = [department, ...departments];

  return enrichDepartment(department);
}

export async function updateDepartmentApi(
  scope: OrganizationScope,
  departmentId: string,
  input: DepartmentUpdateApiInput
): Promise<DepartmentDetailApiResponse> {
  const existingDepartment = getDepartmentRecordById(
    scope.organizationId,
    departmentId
  );
  const payload = normalizeDepartmentInput(input);

  assertOrganizationScope(payload.organizationId);

  if (payload.organizationId !== scope.organizationId) {
    throw new Error(
      "Không thể chuyển phòng ban sang tổ chức khác trong luồng cập nhật này."
    );
  }

  if (payload.id !== departmentId) {
    throw new Error("Không thể thay đổi id ổn định của phòng ban.");
  }

  assertUniqueDepartmentIdentity(payload, departmentId);

  const updatedDepartment: DepartmentApiResponse = {
    ...existingDepartment,
    ...payload,
    updatedAt: getTimestamp(),
  };

  departments = departments.map((department) =>
    department.id === departmentId &&
    department.organizationId === scope.organizationId
      ? updatedDepartment
      : department
  );

  return enrichDepartment(updatedDepartment);
}

export async function getDepartmentDeleteGuardApi(
  scope: OrganizationScope,
  departmentId: string
): Promise<DepartmentDeleteGuardApiResponse> {
  getDepartmentRecordById(scope.organizationId, departmentId);

  const memberSummary = await getDepartmentMemberSummary(
    scope.organizationId,
    departmentId
  );

  if (memberSummary.totalMembers > 0) {
    return {
      allowed: false,
      organizationId: scope.organizationId,
      departmentId,
      dependentMemberCount: memberSummary.totalMembers,
      dependentMemberNames: memberSummary.previewNames,
      messageKey: "hasDependentMembers",
      message: `Không thể xoá phòng ban vì vẫn còn ${memberSummary.totalMembers} thành viên phụ thuộc.`,
      nextStep:
        "Hãy điều chuyển hoặc ngừng hiệu lực các thành viên liên quan trước khi thử xoá lại.",
      manageMembersPath: memberSummary.manageMembersPath,
    };
  }

  return {
    allowed: true,
    organizationId: scope.organizationId,
    departmentId,
    dependentMemberCount: 0,
    dependentMemberNames: [],
    messageKey: "deletable",
    message: "Phòng ban này có thể được xoá mềm.",
    nextStep: "Bạn có thể tiếp tục xoá nếu phòng ban không còn được sử dụng.",
    manageMembersPath: memberSummary.manageMembersPath,
  };
}

export async function deleteDepartmentApi(
  scope: OrganizationScope,
  departmentId: string
): Promise<DeleteDepartmentApiResponse> {
  const guard = await getDepartmentDeleteGuardApi(scope, departmentId);

  if (!guard.allowed) {
    throw new Error(`${guard.message} ${guard.nextStep}`);
  }

  const department = getDepartmentRecordById(
    scope.organizationId,
    departmentId
  );
  const deletedAt = getTimestamp();

  departments = departments.map((item) =>
    item.id === departmentId && item.organizationId === scope.organizationId
      ? {
          ...department,
          deletedAt,
          updatedAt: deletedAt,
        }
      : item
  );

  return {
    id: departmentId,
    organizationId: scope.organizationId,
    deletedAt,
  };
}

async function enrichDepartment(
  department: DepartmentApiResponse
): Promise<DepartmentDetailApiResponse> {
  const [parentContext, memberSummary] = await Promise.all([
    getDepartmentParentContext(department.organizationId),
    getDepartmentMemberSummary(department.organizationId, department.id),
  ]);

  return {
    ...department,
    parentContext,
    memberSummary,
  };
}

async function getDepartmentMemberSummary(
  organizationId: string,
  departmentId: string
): Promise<DepartmentMemberSummaryApiResponse> {
  const memberResult = await getMembersApi(
    { organizationId, departmentId },
    {
      search: "",
      statuses: undefined,
      sort: [],
      page: {
        pageIndex: 0,
        pageSize: 100,
      },
      filters: {
        organizationId,
        departmentId,
      },
    }
  );

  const activeMembers = memberResult.items.filter(
    (member) => member.status === "active"
  ).length;
  const inactiveMembers = memberResult.items.filter(
    (member) => member.status === "inactive"
  ).length;
  const archivedMembers = memberResult.items.filter(
    (member) => member.status === "archived"
  ).length;

  return {
    totalMembers: memberResult.rowCount,
    activeMembers,
    inactiveMembers,
    archivedMembers,
    previewNames: memberResult.items
      .map((member) => member.fullName)
      .slice(0, 3),
    manageMembersPath: `/admin/organizations/${organizationId}/departments/${departmentId}/members`,
  };
}

async function getDepartmentParentContext(
  organizationId: string
): Promise<DepartmentParentContextApiResponse> {
  const organization = ORGANIZATION_DIRECTORY[organizationId];

  if (!organization) {
    throw new Error("Không tìm thấy tổ chức cha của phòng ban.");
  }

  return {
    organizationId,
    organizationName: organization.name,
    manageOrganizationPath: organization.managePath,
    manageDepartmentsPath: `${organization.managePath}/departments`,
  };
}

function getActiveDepartmentsByOrganization(organizationId: string) {
  return departments.filter(
    (department) =>
      department.organizationId === organizationId && !department.deletedAt
  );
}

function getDepartmentRecordById(organizationId: string, departmentId: string) {
  assertOrganizationScope(organizationId);

  const department = departments.find(
    (item) =>
      item.organizationId === organizationId &&
      item.id === departmentId &&
      !item.deletedAt
  );

  if (!department) {
    throw new Error("Không tìm thấy phòng ban.");
  }

  return department;
}

function assertUniqueDepartmentIdentity(
  payload: DepartmentCreateApiInput,
  excludeDepartmentId?: string
) {
  const scopedDepartments = departments.filter(
    (department) =>
      department.organizationId === payload.organizationId &&
      !department.deletedAt &&
      department.id !== excludeDepartmentId
  );
  const normalizedId = normalizeLookupValue(payload.id);
  const normalizedCode = normalizeLookupValue(payload.code);

  const conflictingId = scopedDepartments.find(
    (department) => normalizeLookupValue(department.id) === normalizedId
  );

  if (conflictingId) {
    throw new Error("ID phòng ban đã tồn tại trong tổ chức này.");
  }

  const conflictingCode = scopedDepartments.find(
    (department) => normalizeLookupValue(department.code) === normalizedCode
  );

  if (conflictingCode) {
    throw new Error("Mã phòng ban đã tồn tại trong tổ chức này.");
  }
}

function assertOrganizationScope(organizationId: string) {
  if (!ORGANIZATION_DIRECTORY[organizationId]) {
    throw new Error("Không tìm thấy tổ chức.");
  }
}

function normalizeDepartmentInput(
  input: DepartmentCreateApiInput
): DepartmentCreateApiInput {
  return {
    id: input.id.trim(),
    organizationId: input.organizationId.trim(),
    code: input.code.trim(),
    name: input.name.trim(),
    status: input.status,
  };
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

function normalizeLookupValue(value: string) {
  return value.trim().toLocaleLowerCase("vi");
}

function getTimestamp() {
  return new Date().toISOString();
}
