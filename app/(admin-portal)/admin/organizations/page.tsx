"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  buildDirectoryTableState,
  getDefaultDirectoryListState,
  parseDirectoryListState,
  toDirectoryListQuery,
} from "@/features/directory/shared";
import { useOrganizationListQuery } from "@/features/organizations/organization.query-hooks";
import type { OrganizationListSortField } from "@/features/organizations/organization.types";
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

const ORGANIZATION_SORT_FIELDS = [
  "code",
  "name",
  "status",
] as const satisfies readonly OrganizationListSortField[];

const defaultOrganizationListState = getDefaultDirectoryListState({
  allowedSortFields: ORGANIZATION_SORT_FIELDS,
  defaultSort: [{ field: "name", direction: "asc" }],
});

function OrganizationsPageContent() {
  const searchParams = useSearchParams();
  const normalizedState = parseDirectoryListState(searchParams, {
    allowedSortFields: ORGANIZATION_SORT_FIELDS,
    defaultSort: defaultOrganizationListState.sort,
    defaultPageSize: defaultOrganizationListState.pageSize,
  });
  const organizationQuery = useOrganizationListQuery(
    toDirectoryListQuery(normalizedState, {})
  );
  const tableState = buildDirectoryTableState(normalizedState);

  if (organizationQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được danh sách tổ chức</AlertTitle>
        <AlertDescription>
          {(organizationQuery.error as Error).message ||
            "Đã có lỗi xảy ra khi lấy dữ liệu tổ chức."}
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
              <Badge variant="outline">Proof URL-owned state</Badge>
              <CardTitle>Danh sách tổ chức</CardTitle>
              <CardDescription>
                Search params đã được chuẩn hóa trước khi tạo query và table state.
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

          {organizationQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              Đang tải dữ liệu tổ chức...
            </p>
          ) : null}

          <div className="flex flex-col gap-3">
            {(organizationQuery.data?.items ?? []).map((organization) => (
              <Card key={organization.id} size="sm">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle>{organization.name}</CardTitle>
                      <CardDescription>
                        {organization.code} · {organization.id}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{organization.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/admin/organizations/${organization.id}/departments`}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Xem phòng ban của tổ chức này
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

export default function AdminOrganizationsPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-muted-foreground">Đang chuẩn hóa URL...</p>}
    >
      <OrganizationsPageContent />
    </Suspense>
  );
}
