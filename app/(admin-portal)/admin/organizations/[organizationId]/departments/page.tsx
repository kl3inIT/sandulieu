"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { DirectorySort } from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import {
  buildDirectoryTableState,
  createOrganizationScope,
  getDefaultDirectoryListState,
  parseDirectoryListState,
  serializeDirectoryListState,
  toDirectoryListQuery,
  type DirectoryListState,
} from "@/features/directory/shared";
import { DepartmentListFilters } from "./_components/DepartmentListFilters";
import { DepartmentListTable } from "./_components/DepartmentListTable";
import { DepartmentRowActions } from "./_components/DepartmentRowActions";
import type { DepartmentTableSortField } from "./_components/DepartmentListTable";
import { useDepartmentListQuery } from "@/features/departments/department.query-hooks";
import type { DepartmentListSortField } from "@/features/departments/department.types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const DEPARTMENT_SORT_FIELDS = [
  "code",
  "name",
  "status",
] as const satisfies readonly DepartmentListSortField[];

const defaultDepartmentListState = getDefaultDirectoryListState({
  allowedSortFields: DEPARTMENT_SORT_FIELDS,
  defaultSort: [{ field: "name", direction: "asc" }],
});

function DepartmentsPageContent() {
  const params = useParams<{ organizationId: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const organizationScope = createOrganizationScope(params.organizationId);

  const normalizedState = parseDirectoryListState(searchParams, {
    allowedSortFields: DEPARTMENT_SORT_FIELDS,
    defaultSort: defaultDepartmentListState.sort,
    defaultPageSize: defaultDepartmentListState.pageSize,
  });

  const tableState = buildDirectoryTableState(normalizedState);
  const departmentQuery = useDepartmentListQuery(
    organizationScope.organizationId,
    toDirectoryListQuery(normalizedState, {
      organizationId: organizationScope.organizationId,
    })
  );

  const rowCount = departmentQuery.data?.rowCount ?? 0;
  const pageCount = departmentQuery.data?.pageCount ?? 0;
  const departments = departmentQuery.data?.items ?? [];

  const summaryText = useMemo(() => {
    if (normalizedState.statuses.length === 0) {
      return "Tất cả trạng thái";
    }

    return normalizedState.statuses.join(", ");
  }, [normalizedState.statuses]);

  const updateListState = (
    nextState: DirectoryListState<DepartmentListSortField>
  ) => {
    const nextSearchParams = serializeDirectoryListState(nextState);
    const nextQuery = nextSearchParams.toString();

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  const updatePartialState = (
    partialState: Partial<DirectoryListState<DepartmentListSortField>>
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
    updateListState(defaultDepartmentListState);
  };

  const handleSortChange = (field: DepartmentTableSortField) => {
    const currentSort = normalizedState.sort[0];
    let nextSort: DirectorySort<DepartmentListSortField>[];

    if (!currentSort || currentSort.field !== field) {
      nextSort = [{ field, direction: "asc" }];
    } else if (currentSort.direction === "asc") {
      nextSort = [{ field, direction: "desc" }];
    } else {
      nextSort = [...defaultDepartmentListState.sort];
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
              <Badge variant="outline">Phòng ban theo tổ chức</Badge>
              <CardTitle>
                Quản lý phòng ban của tổ chức {organizationScope.organizationId}
              </CardTitle>
              <CardDescription>
                Tra cứu, lọc trạng thái, sắp xếp và phân trang danh sách phòng
                ban bằng URL-state trong phạm vi tổ chức hiện tại.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link
                  href={`/admin/organizations/${organizationScope.organizationId}`}
                >
                  Chi tiết tổ chức
                </Link>
              </Button>
              <Button asChild>
                <Link
                  href={`/admin/organizations/${organizationScope.organizationId}/departments/new`}
                >
                  Tạo phòng ban
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Tổ chức: {organizationScope.organizationId}</span>
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

      <DepartmentListFilters
        organizationId={organizationScope.organizationId}
        searchValue={normalizedState.search}
        selectedStatuses={normalizedState.statuses}
        onSearchSubmit={handleSearchSubmit}
        onStatusToggle={handleStatusToggle}
        onClearFilters={handleClearFilters}
      />

      <DepartmentListTable
        organizationId={organizationScope.organizationId}
        departments={departments}
        isLoading={departmentQuery.isLoading}
        isError={departmentQuery.isError}
        errorMessage={
          departmentQuery.error instanceof Error
            ? departmentQuery.error.message
            : undefined
        }
        sort={normalizedState.sort}
        pageIndex={normalizedState.pageIndex}
        pageSize={normalizedState.pageSize}
        pageCount={pageCount}
        rowCount={rowCount}
        renderRowActions={(department) => (
          <DepartmentRowActions
            organizationId={organizationScope.organizationId}
            departmentId={department.id}
            departmentName={department.name}
          />
        )}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default function AdminOrganizationDepartmentsPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground">
          Đang chuẩn hóa phạm vi tổ chức...
        </p>
      }
    >
      <DepartmentsPageContent />
    </Suspense>
  );
}
