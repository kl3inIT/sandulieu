"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { DirectorySort } from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import {
  buildDirectoryTableState,
  getDefaultDirectoryListState,
  parseDirectoryListState,
  serializeDirectoryListState,
  toDirectoryListQuery,
  type DirectoryListState,
} from "@/features/directory/shared";
import { OrganizationListFilters } from "./_components/OrganizationListFilters";
import {
  OrganizationListTable,
  type OrganizationTableSortField,
} from "./_components/OrganizationListTable";
import { useOrganizationListQuery } from "@/features/organizations/organization.query-hooks";
import type { OrganizationListSortField } from "@/features/organizations/organization.types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const ORGANIZATION_SORT_FIELDS = [
  "code",
  "name",
  "status",
  "createdAt",
  "updatedAt",
] as const satisfies readonly OrganizationListSortField[];

const defaultOrganizationListState = getDefaultDirectoryListState({
  allowedSortFields: ORGANIZATION_SORT_FIELDS,
  defaultSort: [{ field: "name", direction: "asc" }],
});

function OrganizationsPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const normalizedState = parseDirectoryListState(searchParams, {
    allowedSortFields: ORGANIZATION_SORT_FIELDS,
    defaultSort: defaultOrganizationListState.sort,
    defaultPageSize: defaultOrganizationListState.pageSize,
  });

  const tableState = buildDirectoryTableState(normalizedState);
  const organizationQuery = useOrganizationListQuery(
    toDirectoryListQuery(normalizedState, {})
  );

  const rowCount = organizationQuery.data?.rowCount ?? 0;
  const pageCount = organizationQuery.data?.pageCount ?? 0;
  const organizations = organizationQuery.data?.items ?? [];

  const summaryText = useMemo(() => {
    if (normalizedState.statuses.length === 0) {
      return "Tất cả trạng thái";
    }

    return normalizedState.statuses.join(", ");
  }, [normalizedState.statuses]);

  const updateListState = (
    nextState: DirectoryListState<OrganizationListSortField>
  ) => {
    const nextSearchParams = serializeDirectoryListState(nextState);
    const nextQuery = nextSearchParams.toString();

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  const updatePartialState = (
    partialState: Partial<DirectoryListState<OrganizationListSortField>>
  ) => {
    updateListState({
      ...normalizedState,
      ...partialState,
    });
  };

  const handleSearchSubmit = (value: string) => {
    updatePartialState({
      search: value.trim(),
      pageIndex: 0,
    });
  };

  const handleStatusToggle = (status: DirectoryStatus) => {
    const hasStatus = normalizedState.statuses.includes(status);
    const nextStatuses = hasStatus
      ? normalizedState.statuses.filter((item) => item !== status)
      : [...normalizedState.statuses, status];

    updatePartialState({
      statuses: nextStatuses,
      pageIndex: 0,
    });
  };

  const handleClearFilters = () => {
    updateListState(defaultOrganizationListState);
  };

  const handleSortChange = (field: OrganizationTableSortField) => {
    const currentSort = normalizedState.sort[0];
    let nextSort: DirectorySort<OrganizationListSortField>[];

    if (!currentSort || currentSort.field !== field) {
      nextSort = [{ field, direction: "asc" }];
    } else if (currentSort.direction === "asc") {
      nextSort = [{ field, direction: "desc" }];
    } else {
      nextSort = [...defaultOrganizationListState.sort];
    }

    updatePartialState({
      sort: nextSort,
      pageIndex: 0,
    });
  };

  const handlePageChange = (pageIndex: number) => {
    updatePartialState({ pageIndex });
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Badge variant="outline">Danh mục tổ chức</Badge>
              <CardTitle>Quản lý tổ chức</CardTitle>
              <CardDescription>
                Tra cứu, lọc trạng thái, sắp xếp và phân trang danh sách tổ chức
                bằng trạng thái URL dùng chung.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/organizations/new">Tạo tổ chức</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Tìm kiếm: {normalizedState.search || "Chưa nhập"}</span>
          <span>Trạng thái: {summaryText}</span>
          <span>
            Sắp xếp:{" "}
            {normalizedState.sort
              .map((item) => `${item.field}:${item.direction}`)
              .join(", ")}
          </span>
          <span>
            Trang: {tableState.pagination.pageIndex + 1} · Kích thước trang:{" "}
            {tableState.pagination.pageSize}
          </span>
        </CardContent>
      </Card>

      <OrganizationListFilters
        searchValue={normalizedState.search}
        selectedStatuses={normalizedState.statuses}
        onSearchSubmit={handleSearchSubmit}
        onStatusToggle={handleStatusToggle}
        onClearFilters={handleClearFilters}
      />

      <OrganizationListTable
        organizations={organizations}
        isLoading={organizationQuery.isLoading}
        isError={organizationQuery.isError}
        errorMessage={
          organizationQuery.error instanceof Error
            ? organizationQuery.error.message
            : undefined
        }
        sort={normalizedState.sort}
        pageIndex={normalizedState.pageIndex}
        pageSize={normalizedState.pageSize}
        pageCount={pageCount}
        rowCount={rowCount}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default function AdminOrganizationsPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground">Đang chuẩn hóa URL...</p>
      }
    >
      <OrganizationsPageContent />
    </Suspense>
  );
}
