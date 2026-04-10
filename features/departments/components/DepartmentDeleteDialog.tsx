"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";

import {
  useDeleteDepartmentMutation,
  useDepartmentDeleteGuardQuery,
} from "@/features/departments/department.query-hooks";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

export type DepartmentDeleteDialogProps = {
  organizationId: string;
  departmentId: string;
  departmentName: string;
  trigger: ReactElement;
  onDeleteSuccess?: () => void;
};

export function DepartmentDeleteDialog({
  organizationId,
  departmentId,
  departmentName,
  trigger,
  onDeleteSuccess,
}: DepartmentDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteGuardQuery = useDepartmentDeleteGuardQuery(
    organizationId,
    departmentId
  );
  const deleteDepartmentMutation = useDeleteDepartmentMutation(organizationId);

  const handleConfirmDelete = async () => {
    await deleteDepartmentMutation.mutateAsync(departmentId);
    setOpen(false);
    onDeleteSuccess?.();
  };

  const isBlocked = deleteGuardQuery.data
    ? !deleteGuardQuery.data.allowed
    : false;
  const previewNames = deleteGuardQuery.data?.dependentMemberNames ?? [];
  const manageMembersPath =
    deleteGuardQuery.data?.manageMembersPath ??
    `/admin/organizations/${organizationId}/departments/${departmentId}/members`;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xoá phòng ban</AlertDialogTitle>
          <AlertDialogDescription>
            Đây là thao tác xoá mềm có kiểm soát đối với phòng ban
            <span className="font-medium text-foreground">
              {" "}
              {departmentName}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteGuardQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">
            Đang kiểm tra ràng buộc thành viên trước khi xoá...
          </p>
        ) : null}

        {deleteGuardQuery.isError ? (
          <Alert variant="destructive">
            <AlertTitle>Chưa kiểm tra được điều kiện xoá</AlertTitle>
            <AlertDescription>
              {(deleteGuardQuery.error as Error).message ||
                "Đã có lỗi xảy ra khi kiểm tra ràng buộc xoá phòng ban."}
            </AlertDescription>
          </Alert>
        ) : null}

        {deleteGuardQuery.data && isBlocked ? (
          <div className="flex flex-col gap-4">
            <Alert>
              <AlertTitle>Không thể xoá phòng ban lúc này</AlertTitle>
              <AlertDescription>
                {deleteGuardQuery.data.message} {deleteGuardQuery.data.nextStep}
              </AlertDescription>
            </Alert>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {deleteGuardQuery.data.dependentMemberCount} thành viên phụ
                thuộc
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Phòng ban này vẫn còn thành viên trong cùng phạm vi tổ chức. Vui
              lòng xử lý thành viên trước rồi thử xoá lại.
            </p>

            {previewNames.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Một số thành viên cần xử lý trước
                </p>
                <div className="flex flex-wrap gap-2">
                  {previewNames.map((name) => (
                    <Badge key={name} variant="outline">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <Button asChild variant="outline">
              <Link href={manageMembersPath}>
                Đi tới danh sách thành viên của phòng ban
              </Link>
            </Button>
          </div>
        ) : null}

        {deleteGuardQuery.data && !isBlocked ? (
          <Alert>
            <AlertTitle>Có thể tiếp tục xoá mềm</AlertTitle>
            <AlertDescription>
              {deleteGuardQuery.data.message} {deleteGuardQuery.data.nextStep}
            </AlertDescription>
          </Alert>
        ) : null}

        {deleteDepartmentMutation.isError ? (
          <Alert variant="destructive">
            <AlertTitle>Chưa thể xoá phòng ban</AlertTitle>
            <AlertDescription>
              {(deleteDepartmentMutation.error as Error).message ||
                "Đã có lỗi xảy ra khi xoá phòng ban."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteDepartmentMutation.isPending}>
            Huỷ
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={
              deleteDepartmentMutation.isPending ||
              deleteGuardQuery.isLoading ||
              deleteGuardQuery.isError ||
              isBlocked
            }
            onClick={(event) => {
              event.preventDefault();
              void handleConfirmDelete();
            }}
          >
            {deleteDepartmentMutation.isPending
              ? "Đang xoá phòng ban"
              : "Xác nhận xoá"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
