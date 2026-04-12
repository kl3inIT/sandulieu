import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import type { DirectorySort } from "@/shared/api/directory.contracts";
import type { Organization } from "@/features/organizations/organization.types";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { DirectoryStatusBadge } from "@/shared/components/directory/DirectoryStatusBadge";
import { formatDateTime } from "@/shared/lib/format-date";

import { OrganizationRowActions } from "./OrganizationRowActions";

export type OrganizationTableSortField =
  | "code"
  | "name"
  | "status"
  | "createdAt"
  | "updatedAt";

type OrganizationListTableProps = {
  organizations: Organization[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  sort: readonly DirectorySort<OrganizationTableSortField>[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  onSortChange: (field: OrganizationTableSortField) => void;
  onPageChange: (pageIndex: number) => void;
};

export function OrganizationListTable({
  organizations,
  isLoading,
  isError,
  errorMessage,
  sort,
  pageIndex,
  pageSize,
  pageCount,
  rowCount,
  onSortChange,
  onPageChange,
}: OrganizationListTableProps) {
  const hasMetadataColumns = organizations.some(
    (organization) => organization.createdAt || organization.updatedAt
  );

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được danh sách tổ chức</AlertTitle>
        <AlertDescription>
          {errorMessage || "Đã có lỗi xảy ra khi lấy dữ liệu tổ chức."}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Đang tải danh sách tổ chức</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (organizations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chưa có tổ chức phù hợp</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hãy thay đổi từ khoá tìm kiếm hoặc bộ lọc trạng thái để xem dữ liệu
            khác.
          </p>
        </CardContent>
      </Card>
    );
  }

  const canGoToPreviousPage = pageIndex > 0;
  const canGoToNextPage = pageIndex + 1 < pageCount;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Danh sách tổ chức</CardTitle>
        <p className="text-sm text-muted-foreground">
          Hiển thị {organizations.length} / {rowCount} tổ chức, trang{" "}
          {pageIndex + 1}, kích thước {pageSize}.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <SortableHeader
                field="code"
                label="Mã tổ chức"
                sort={sort}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="name"
                label="Tên tổ chức"
                sort={sort}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="status"
                label="Trạng thái"
                sort={sort}
                onSortChange={onSortChange}
              />
              {hasMetadataColumns ? (
                <>
                  <SortableHeader
                    field="createdAt"
                    label="Ngày tạo"
                    sort={sort}
                    onSortChange={onSortChange}
                  />
                  <SortableHeader
                    field="updatedAt"
                    label="Cập nhật gần nhất"
                    sort={sort}
                    onSortChange={onSortChange}
                  />
                </>
              ) : null}
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization, index) => (
              <TableRow key={organization.id}>
                <TableCell className="text-muted-foreground">
                  {pageIndex * pageSize + index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {organization.code}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{organization.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ID ổn định: {organization.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DirectoryStatusBadge status={organization.status} />
                </TableCell>
                {hasMetadataColumns ? (
                  <>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(organization.createdAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(organization.updatedAt)}
                    </TableCell>
                  </>
                ) : null}
                <TableCell>
                  <OrganizationRowActions
                    organizationId={organization.id}
                    organizationName={organization.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Hành vi phân trang đang bám theo trạng thái trang từ query
            backend-shaped.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!canGoToPreviousPage}
              onClick={() => onPageChange(pageIndex - 1)}
            >
              Trang trước
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!canGoToNextPage}
              onClick={() => onPageChange(pageIndex + 1)}
            >
              Trang sau
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type SortableHeaderProps = {
  field: OrganizationTableSortField;
  label: string;
  sort: readonly DirectorySort<OrganizationTableSortField>[];
  onSortChange: (field: OrganizationTableSortField) => void;
};

function SortableHeader({
  field,
  label,
  sort,
  onSortChange,
}: SortableHeaderProps) {
  const activeSort = sort.find((item) => item.field === field);

  return (
    <TableHead>
      <Button
        type="button"
        variant="ghost"
        className="h-auto px-0 py-0 font-medium"
        onClick={() => onSortChange(field)}
      >
        {label}
        {activeSort ? (
          activeSort.direction === "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          )
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    </TableHead>
  );
}
