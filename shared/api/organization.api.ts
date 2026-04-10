import type {
  DirectoryListQuery,
  PaginatedResult,
} from "@/shared/api/directory.contracts";
import { getDepartmentsApi } from "@/shared/api/department.api";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type OrganizationDepartmentSummaryApiResponse = {
  count: number;
  previewNames: string[];
  managePath: string;
};

export type OrganizationApiResponse = {
  id: string;
  code: string;
  name: string;
  status: DirectoryStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  departmentSummary: OrganizationDepartmentSummaryApiResponse;
};

export type OrganizationCreateApiInput = {
  id: string;
  code: string;
  name: string;
  status: DirectoryStatus;
};

export type OrganizationUpdateApiInput = OrganizationCreateApiInput;

export type OrganizationDeleteGuardMessageKey =
  | "deletable"
  | "hasDependentDepartments";

export type OrganizationDeleteGuardApiResponse = {
  allowed: boolean;
  organizationId: string;
  dependentDepartmentCount: number;
  dependentDepartmentNames: string[];
  messageKey: OrganizationDeleteGuardMessageKey;
  message: string;
  nextStep: string;
  manageDepartmentsPath: string;
};

export type DeleteOrganizationApiResponse = {
  id: string;
  deletedAt: string;
};

export type OrganizationSortField =
  | "code"
  | "name"
  | "status"
  | "createdAt"
  | "updatedAt";

export type OrganizationFilters = Record<string, never>;

export type OrganizationListQuery = DirectoryListQuery<
  OrganizationSortField,
  OrganizationFilters
>;

let organizations: OrganizationApiResponse[] = [
  {
    id: "org-acme",
    code: "ORG-ACME",
    name: "Tập đoàn ACME Việt Nam",
    status: "active",
    createdAt: "2025-11-18T08:00:00.000Z",
    updatedAt: "2026-03-25T09:30:00.000Z",
    departmentSummary: createDepartmentSummary("org-acme", [
      "Kinh doanh doanh nghiệp",
      "Vận hành vùng Nam",
    ]),
  },
  {
    id: "org-sao-mai",
    code: "ORG-SM",
    name: "Công ty Sao Mai Logistics",
    status: "inactive",
    createdAt: "2025-12-01T02:15:00.000Z",
    updatedAt: "2026-02-11T04:45:00.000Z",
    departmentSummary: createDepartmentSummary("org-sao-mai", [
      "Nhân sự trung tâm",
    ]),
  },
  {
    id: "org-thien-long",
    code: "ORG-TL",
    name: "Thiên Long Manufacturing",
    status: "archived",
    createdAt: "2025-09-10T01:00:00.000Z",
    updatedAt: "2026-01-09T10:20:00.000Z",
    departmentSummary: createDepartmentSummary("org-thien-long", []),
  },
];

export async function getOrganizationsApi(
  query: OrganizationListQuery
): Promise<PaginatedResult<OrganizationApiResponse>> {
  const activeOrganizations = await Promise.all(
    organizations
      .filter((organization) => !organization.deletedAt)
      .map(enrichOrganization)
  );

  const filteredItems = activeOrganizations.filter((organization) => {
    const matchesSearch =
      !query.search ||
      [organization.code, organization.name]
        .join(" ")
        .toLowerCase()
        .includes(query.search.toLowerCase());

    const matchesStatus =
      !query.statuses?.length || query.statuses.includes(organization.status);

    return matchesSearch && matchesStatus;
  });

  const sortedItems = applyOrganizationSort(filteredItems, query);
  return paginateResults(sortedItems, query);
}

export async function getOrganizationByIdApi(
  organizationId: string
): Promise<OrganizationApiResponse> {
  const organization = getOrganizationRecordById(organizationId);
  return enrichOrganization(organization);
}

export async function createOrganizationApi(
  input: OrganizationCreateApiInput
): Promise<OrganizationApiResponse> {
  const payload = normalizeOrganizationInput(input);

  assertUniqueOrganizationIdentity(payload);

  const timestamp = getTimestamp();
  const createdOrganization: OrganizationApiResponse = {
    ...payload,
    createdAt: timestamp,
    updatedAt: timestamp,
    departmentSummary: createDepartmentSummary(payload.id, []),
  };

  organizations = [createdOrganization, ...organizations];

  return enrichOrganization(createdOrganization);
}

export async function updateOrganizationApi(
  organizationId: string,
  input: OrganizationUpdateApiInput
): Promise<OrganizationApiResponse> {
  const existingOrganization = getOrganizationRecordById(organizationId);
  const payload = normalizeOrganizationInput(input);

  if (payload.id !== organizationId) {
    throw new Error("Không thể thay đổi id ổn định của tổ chức.");
  }

  assertUniqueOrganizationIdentity(payload, organizationId);

  const updatedOrganization: OrganizationApiResponse = {
    ...existingOrganization,
    ...payload,
    updatedAt: getTimestamp(),
  };

  organizations = organizations.map((organization) =>
    organization.id === organizationId ? updatedOrganization : organization
  );

  return enrichOrganization(updatedOrganization);
}

export async function getOrganizationDeleteGuardApi(
  organizationId: string
): Promise<OrganizationDeleteGuardApiResponse> {
  getOrganizationRecordById(organizationId);

  const departmentResult = await getDepartmentsApi(
    { organizationId },
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
      },
    }
  );

  const dependentDepartmentCount = departmentResult.rowCount;
  const dependentDepartmentNames = departmentResult.items.map(
    (department) => department.name
  );
  const manageDepartmentsPath = `/admin/organizations/${organizationId}/departments`;

  if (dependentDepartmentCount > 0) {
    return {
      allowed: false,
      organizationId,
      dependentDepartmentCount,
      dependentDepartmentNames,
      messageKey: "hasDependentDepartments",
      message: `Không thể xoá tổ chức vì vẫn còn ${dependentDepartmentCount} phòng ban phụ thuộc.`,
      nextStep:
        "Hãy xử lý hoặc chuyển các phòng ban sang nơi khác trước khi thử xoá lại.",
      manageDepartmentsPath,
    };
  }

  return {
    allowed: true,
    organizationId,
    dependentDepartmentCount: 0,
    dependentDepartmentNames: [],
    messageKey: "deletable",
    message: "Tổ chức này có thể được xoá mềm.",
    nextStep:
      "Bạn có thể tiếp tục xoá nếu không còn nhu cầu sử dụng tổ chức này.",
    manageDepartmentsPath,
  };
}

export async function deleteOrganizationApi(
  organizationId: string
): Promise<DeleteOrganizationApiResponse> {
  const guard = await getOrganizationDeleteGuardApi(organizationId);

  if (!guard.allowed) {
    throw new Error(`${guard.message} ${guard.nextStep}`);
  }

  const organization = getOrganizationRecordById(organizationId);
  const deletedAt = getTimestamp();

  organizations = organizations.map((item) =>
    item.id === organizationId
      ? {
          ...organization,
          deletedAt,
          updatedAt: deletedAt,
        }
      : item
  );

  return {
    id: organizationId,
    deletedAt,
  };
}

async function enrichOrganization(
  organization: OrganizationApiResponse
): Promise<OrganizationApiResponse> {
  const departmentSummary = await getOrganizationDepartmentSummary(
    organization.id
  );

  return {
    ...organization,
    departmentSummary,
  };
}

async function getOrganizationDepartmentSummary(
  organizationId: string
): Promise<OrganizationDepartmentSummaryApiResponse> {
  const departmentResult = await getDepartmentsApi(
    { organizationId },
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
      },
    }
  );

  return createDepartmentSummary(
    organizationId,
    departmentResult.items.map((department) => department.name),
    departmentResult.rowCount
  );
}

function createDepartmentSummary(
  organizationId: string,
  departmentNames: string[],
  count = departmentNames.length
): OrganizationDepartmentSummaryApiResponse {
  return {
    count,
    previewNames: departmentNames.slice(0, 3),
    managePath: `/admin/organizations/${organizationId}/departments`,
  };
}

function getOrganizationRecordById(organizationId: string) {
  const organization = organizations.find(
    (item) => item.id === organizationId && !item.deletedAt
  );

  if (!organization) {
    throw new Error("Không tìm thấy tổ chức.");
  }

  return organization;
}

function assertUniqueOrganizationIdentity(
  payload: OrganizationCreateApiInput,
  excludeOrganizationId?: string
) {
  const normalizedId = normalizeLookupValue(payload.id);
  const normalizedCode = normalizeLookupValue(payload.code);

  const conflictingId = organizations.find(
    (organization) =>
      organization.id !== excludeOrganizationId &&
      normalizeLookupValue(organization.id) === normalizedId
  );

  if (conflictingId) {
    throw new Error("ID tổ chức đã tồn tại.");
  }

  const conflictingCode = organizations.find(
    (organization) =>
      organization.id !== excludeOrganizationId &&
      normalizeLookupValue(organization.code) === normalizedCode
  );

  if (conflictingCode) {
    throw new Error("Mã tổ chức đã tồn tại.");
  }
}

function normalizeOrganizationInput(
  input: OrganizationCreateApiInput
): OrganizationCreateApiInput {
  return {
    id: input.id.trim(),
    code: input.code.trim(),
    name: input.name.trim(),
    status: input.status,
  };
}

function applyOrganizationSort(
  items: OrganizationApiResponse[],
  query: OrganizationListQuery
): OrganizationApiResponse[] {
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
  items: OrganizationApiResponse[],
  query: OrganizationListQuery
): PaginatedResult<OrganizationApiResponse> {
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
