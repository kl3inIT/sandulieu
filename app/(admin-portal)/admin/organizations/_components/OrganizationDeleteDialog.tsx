"use client";

import Link from "next/link";
import { useState, type ReactElement } from "react";

import {
  useDeleteOrganizationMutation,
  useOrganizationDeleteGuardQuery,
} from "@/features/organizations/organization.query-hooks";
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

export type OrganizationDeleteDialogProps = {
  organizationId: string;
  organizationName: string;
  trigger?: ReactElement;
  triggerLabel?: string;
  onDeleteSuccess?: () => void;
};

export function OrganizationDeleteDialog({
  organizationId,
  organizationName,
  trigger,
  triggerLabel = "Xoá",
  onDeleteSuccess,
}: OrganizationDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteGuardQuery = useOrganizationDeleteGuardQuery(organizationId);
  const deleteOrganizationMutation = useDeleteOrganizationMutation();

  const handleConfirmDelete = async () => {
    await deleteOrganizationMutation.mutateAsync(organizationId);
    setOpen(false);
    onDeleteSuccess?.();
  };

  const isBlocked = deleteGuardQuery.data
    ? !deleteGuardQuery.data.allowed
    : false;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="outline">
            {triggerLabel}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xoá tổ chức</AlertDialogTitle>
          <AlertDialogDescription>
            Đây là thao tác xoá mềm có kiểm soát đối với tổ chức
            <span className="font-medium text-foreground">
              {" "}
              {organizationName}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteGuardQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">
            Đang kiểm tra ràng buộc phòng ban trước khi xoá...
          </p>
        ) : null}

        {deleteGuardQuery.isError ? (
          <Alert variant="destructive">
            <AlertTitle>Chưa kiểm tra được điều kiện xoá</AlertTitle>
            <AlertDescription>
              {(deleteGuardQuery.error as Error).message ||
                "Đã có lỗi xảy ra khi kiểm tra ràng buộc xoá tổ chức."}
            </AlertDescription>
          </Alert>
        ) : null}

        {deleteGuardQuery.data && isBlocked ? (
          <div className="flex flex-col gap-4">
            <Alert>
              <AlertTitle>Không thể xoá tổ chức lúc này</AlertTitle>
              <AlertDescription>
                {deleteGuardQuery.data.message} {deleteGuardQuery.data.nextStep}
              </AlertDescription>
            </Alert>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {deleteGuardQuery.data.dependentDepartmentCount} phòng ban phụ
                thuộc
              </Badge>
            </div>

            {deleteGuardQuery.data.dependentDepartmentNames.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Một số phòng ban cần xử lý trước
                </p>
                <div className="flex flex-wrap gap-2">
                  {deleteGuardQuery.data.dependentDepartmentNames.map(
                    (name) => (
                      <Badge key={name} variant="outline">
                        {name}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            ) : null}

            <Button asChild variant="outline">
              <Link href={deleteGuardQuery.data.manageDepartmentsPath}>
                Đi tới danh sách phòng ban của tổ chức
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

        {deleteOrganizationMutation.isError ? (
          <Alert variant="destructive">
            <AlertTitle>Chưa thể xoá tổ chức</AlertTitle>
            <AlertDescription>
              {(deleteOrganizationMutation.error as Error).message ||
                "Đã có lỗi xảy ra khi xoá tổ chức."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteOrganizationMutation.isPending}>
            Huỷ
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={
              deleteOrganizationMutation.isPending ||
              deleteGuardQuery.isLoading ||
              deleteGuardQuery.isError ||
              isBlocked
            }
            onClick={(event) => {
              event.preventDefault();
              void handleConfirmDelete();
            }}
          >
            {deleteOrganizationMutation.isPending
              ? "Đang xoá tổ chức"
              : "Xác nhận xoá"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
