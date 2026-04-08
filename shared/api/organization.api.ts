import type {
  DirectoryListQuery,
  PaginatedResult,
} from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type OrganizationApiResponse = {
  id: string;
  code: string;
  name: string;
  status: DirectoryStatus;
};

export type OrganizationSortField = "code" | "name" | "status";

export type OrganizationFilters = Record<string, never>;

export type OrganizationListQuery = DirectoryListQuery<
  OrganizationSortField,
  OrganizationFilters
>;

const ORGANIZATIONS: OrganizationApiResponse[] = [
  {
    id: "org-acme",
    code: "ORG-ACME",
    name: "Tập đoàn ACME Việt Nam",
    status: "active",
  },
  {
    id: "org-sao-mai",
    code: "ORG-SM",
    name: "Công ty Sao Mai Logistics",
    status: "inactive",
  },
  {
    id: "org-thien-long",
    code: "ORG-TL",
    name: "Thiên Long Manufacturing",
    status: "archived",
  },
];

export async function getOrganizationsApi(
  query: OrganizationListQuery
): Promise<PaginatedResult<OrganizationApiResponse>> {
  const filteredItems = ORGANIZATIONS.filter((organization) => {
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
  const organization = ORGANIZATIONS.find((item) => item.id === organizationId);

  if (!organization) {
    throw new Error("Không tìm thấy tổ chức.");
  }

  return organization;
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
