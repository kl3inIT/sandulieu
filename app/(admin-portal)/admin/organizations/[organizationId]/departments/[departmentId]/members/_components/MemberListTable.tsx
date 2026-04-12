"use client";

import type { ReactNode } from "react";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import type { DirectorySort } from "@/shared/api/directory.contracts";
import type { Member } from "@/features/members/member.types";
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
import { Checkbox } from "@/shared/components/ui/checkbox";
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

export type MemberTableSortField = "memberCode" | "fullName" | "status";

type MemberListTableProps = {
  organizationId: string;
  departmentId: string;
  members: Member[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  sort: readonly DirectorySort<MemberTableSortField>[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  selectedIds: string[];
  renderRowActions?: (member: Member) => ReactNode;
  onSortChange: (field: MemberTableSortField) => void;
  onPageChange: (pageIndex: number) => void;
  onSelectionChange: (ids: string[]) => void;
};

export function MemberListTable({
  // organizationId and departmentId are kept in props for future use (e.g. scoped links)
  organizationId: _organizationId, // eslint-disable-line @typescript-eslint/no-unused-vars
  departmentId: _departmentId, // eslint-disable-line @typescript-eslint/no-unused-vars
  members,
  isLoading,
  isError,
  errorMessage,
  sort,
  pageIndex,
  pageSize,
  pageCount,
  rowCount,
  selectedIds,
  renderRowActions,
  onSortChange,
  onPageChange,
  onSelectionChange,
}: MemberListTableProps) {
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được danh sách thành viên</AlertTitle>
        <AlertDescription>
          {errorMessage || "Đã có lỗi xảy ra khi lấy dữ liệu thành viên."}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Đang tải danh sách thành viên</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]" />
                <TableHead className="text-muted-foreground">#</TableHead>
                <TableHead>Mã thành viên</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 2].map((i) => (
                <TableRow key={i}>
                  <TableCell />
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (members.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chưa có thành viên phù hợp</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Hãy thay đổi từ khoá tìm kiếm hoặc trạng thái để xem dữ liệu khác
            trong phạm vi phòng ban hiện tại.
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
        <CardTitle>Danh sách thành viên</CardTitle>
        <p className="text-sm text-muted-foreground">
          Hiển thị {members.length} / {rowCount} thành viên, trang{" "}
          {pageIndex + 1}, kích thước {pageSize}.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    members.length > 0 && selectedIds.length === members.length
                      ? true
                      : selectedIds.length > 0 &&
                          selectedIds.length < members.length
                        ? "indeterminate"
                        : false
                  }
                  onCheckedChange={(checked) => {
                    onSelectionChange(checked ? members.map((m) => m.id) : []);
                  }}
                  aria-label="Chọn tất cả"
                />
              </TableHead>
              <TableHead className="text-muted-foreground">#</TableHead>
              <SortableHeader
                field="memberCode"
                label="Mã thành viên"
                sort={sort}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="fullName"
                label="Họ và tên"
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
            {members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(member.id)}
                    onCheckedChange={(checked) => {
                      onSelectionChange(
                        checked
                          ? [...selectedIds, member.id]
                          : selectedIds.filter((id) => id !== member.id)
                      );
                    }}
                    aria-label={`Chọn ${member.fullName}`}
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {pageIndex * pageSize + index + 1}
                </TableCell>
                <TableCell className="font-semibold">
                  {member.memberCode}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{member.fullName}</span>
                    <span className="text-xs text-muted-foreground">
                      {member.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DirectoryStatusBadge status={member.status} />
                </TableCell>
                <TableCell className="text-right">
                  {renderRowActions ? renderRowActions(member) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {members.length} / {rowCount} thành viên, trang{" "}
            {pageIndex + 1}, kích thước {pageSize}.
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
  field: MemberTableSortField;
  label: string;
  sort: readonly DirectorySort<MemberTableSortField>[];
  onSortChange: (field: MemberTableSortField) => void;
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
        className="h-auto px-0 py-0 font-semibold"
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
