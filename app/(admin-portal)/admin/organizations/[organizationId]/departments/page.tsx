"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import {
  buildDirectoryTableState,
  createOrganizationScope,
  getDefaultDirectoryListState,
  parseDirectoryListState,
  toDirectoryListQuery,
} from "@/features/directory/shared";
import { useDepartmentListQuery } from "@/features/departments/department.query-hooks";
import type { DepartmentListSortField } from "@/features/departments/department.types";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
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
  const searchParams = useSearchParams();
  const organizationScope = createOrganizationScope(params.organizationId);
  const normalizedState = parseDirectoryListState(searchParams, {
    allowedSortFields: DEPARTMENT_SORT_FIELDS,
    defaultSort: defaultDepartmentListState.sort,
    defaultPageSize: defaultDepartmentListState.pageSize,
  });
  const departmentQuery = useDepartmentListQuery(
    organizationScope.organizationId,
    toDirectoryListQuery(normalizedState, {
      organizationId: organizationScope.organizationId,
    })
  );
  const tableState = buildDirectoryTableState(normalizedState);

  if (departmentQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được danh sách phòng ban</AlertTitle>
        <AlertDescription>
          {(departmentQuery.error as Error).message ||
            "Đã có lỗi xảy ra khi lấy dữ liệu phòng ban."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Badge variant="outline">Scope proof</Badge>
              <CardTitle>
                Phòng ban của tổ chức {organizationScope.organizationId}
              </CardTitle>
              <CardDescription>
                Route param đã được chuẩn hóa qua createOrganizationScope trước khi query.
              </CardDescription>
            </div>
            <Badge variant="secondary">
              Trang {tableState.pagination.pageIndex + 1} / kích thước{" "}
              {tableState.pagination.pageSize}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>Tìm kiếm: {normalizedState.search || "Không có"}</span>
            <span>
              Trạng thái: {normalizedState.statuses.join(", ") || "Tất cả"}
            </span>
            <span>
              Sắp xếp: {normalizedState.sort
                .map((item) => `${item.field}:${item.direction}`)
                .join(", ") || "Mặc định"}
            </span>
          </div>

          {departmentQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              Đang tải dữ liệu phòng ban...
            </p>
          ) : null}

          <div className="flex flex-col gap-3">
            {(departmentQuery.data?.items ?? []).map((department) => (
              <Card key={department.id} size="sm">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle>{department.name}</CardTitle>
                      <CardDescription>
                        {department.code} · {department.id}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{department.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/admin/organizations/${organizationScope.organizationId}/departments/${department.id}/members`}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Xem thành viên của phòng ban này
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminOrganizationDepartmentsPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-muted-foreground">Đang chuẩn hóa phạm vi tổ chức...</p>}
    >
      <DepartmentsPageContent />
    </Suspense>
  );
}
