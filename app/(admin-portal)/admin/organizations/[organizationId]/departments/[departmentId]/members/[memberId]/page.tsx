"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { MemberDetailSummary } from "./_components/MemberDetailSummary";
import {
  useMemberDetailQuery,
  useDeleteMemberMutation,
} from "@/features/members/member.query-hooks";
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
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

function AdminMemberDetailPageContent() {
  const params = useParams<{
    organizationId: string;
    departmentId: string;
    memberId: string;
  }>();
  const router = useRouter();

  const memberDetailQuery = useMemberDetailQuery(
    params.organizationId,
    params.departmentId,
    params.memberId
  );
  const deleteMutation = useDeleteMemberMutation(
    params.organizationId,
    params.departmentId
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  async function handleDeleteConfirm() {
    await deleteMutation.mutateAsync(params.memberId);
    router.push(
      memberDetailQuery.data?.parentContext.manageMembersPath ??
        `/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members`
    );
  }

  if (memberDetailQuery.isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />;
  }

  if (memberDetailQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được thông tin thành viên</AlertTitle>
        <AlertDescription>
          Đã có lỗi xảy ra khi lấy chi tiết thành viên.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Chi tiết thành viên</h1>

      {memberDetailQuery.data ? (
        <MemberDetailSummary member={memberDetailQuery.data} />
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link
            href={
              memberDetailQuery.data?.parentContext.manageMembersPath ??
              `/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members`
            }
          >
            Quay lại danh sách
          </Link>
        </Button>
        <Button variant="default" asChild>
          <Link
            href={`/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members/${params.memberId}/edit`}
          >
            Chỉnh sửa
          </Link>
        </Button>
        <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
          Xoá
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá thành viên</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sắp xoá thành viên &quot;{memberDetailQuery.data?.fullName}
              &quot;. Thao tác này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Quay lại
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AdminMemberDetailPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
      <AdminMemberDetailPageContent />
    </Suspense>
  );
}
