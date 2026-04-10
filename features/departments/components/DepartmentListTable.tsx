import type { ReactNode } from "react";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import type { DirectorySort } from "@/shared/api/directory.contracts";
import type { Department } from "@/features/departments/department.types";
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

import { DepartmentStatusBadge } from "./DepartmentStatusBadge";

export type DepartmentTableSortField = "code" | "name" | "status";

type DepartmentListTableProps = {
  organizationId: string;
  departments: Department[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  sort: readonly DirectorySort<DepartmentTableSortField>[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  renderRowActions?: (department: Department) => ReactNode;
  onSortChange: (field: DepartmentTableSortField) => void;
  onPageChange: (pageIndex: number) => void;
};

export function DepartmentListTable({
  organizationId,
  departments,
  isLoading,
  isError,
  errorMessage,
  sort,
  pageIndex,
  pageSize,
  pageCount,
  rowCount,
  renderRowActions,
  onSortChange,
  onPageChange,
}: DepartmentListTableProps) {
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được danh sách phòng ban</AlertTitle>
        <AlertDescription>
          {errorMessage || "Đã có lỗi xảy ra khi lấy dữ liệu phòng ban."}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Đang tải danh sách phòng ban</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (departments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chưa có phòng ban phù hợp</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Hãy thay đổi từ khoá tìm kiếm hoặc trạng thái để xem dữ liệu khác
            trong phạm vi tổ chức hiện tại.
          </p>
          <p className="text-sm text-muted-foreground">
            Phạm vi đang áp dụng: {organizationId}.
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
        <CardTitle>Danh sách phòng ban</CardTitle>
        <p className="text-sm text-muted-foreground">
          Hiển thị {departments.length} / {rowCount} phòng ban, trang {pageIndex + 1}
          , kích thước {pageSize}.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <SortableHeader
                field="code"
                label="Mã phòng ban"
                sort={sort}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="name"
                label="Tên phòng ban"
                sort={sort}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="status"
                label="Trạng thái"
                sort={sort}
                onSortChange={onSortChange}
              />
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department, index) => (
              <TableRow key={department.id}>
                <TableCell className="text-muted-foreground">
                  {pageIndex * pageSize + index + 1}
                </TableCell>
                <TableCell className="font-medium">{department.code}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{department.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ID ổn định: {department.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DepartmentStatusBadge status={department.status} />
                </TableCell>
                <TableCell>
                  {renderRowActions ? renderRowActions(department) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Bảng dùng phân trang và sắp xếp backend-shaped trong phạm vi tổ chức.
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
  field: DepartmentTableSortField;
  label: string;
  sort: readonly DirectorySort<DepartmentTableSortField>[];
  onSortChange: (field: DepartmentTableSortField) => void;
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
