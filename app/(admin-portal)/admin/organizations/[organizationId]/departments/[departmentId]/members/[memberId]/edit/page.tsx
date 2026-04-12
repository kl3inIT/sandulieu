"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FilePenLine } from "lucide-react";

import { MemberForm } from "@/shared/components/members/MemberForm";
import type { MemberFormPayload } from "@/features/members/member.form";
import {
  useMemberDetailQuery,
  useUpdateMemberMutation,
} from "@/features/members/member.query-hooks";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

function AdminMemberEditPageContent() {
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
  const updateMutation = useUpdateMemberMutation(
    params.organizationId,
    params.departmentId
  );

  const detailPath = `/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members/${params.memberId}`;

  async function handleSubmit(values: MemberFormPayload) {
    await updateMutation.mutateAsync({
      memberId: params.memberId,
      payload: values,
    });
    router.push(detailPath);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Cập nhật thành viên</Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href={detailPath}>
                <ArrowLeft data-icon="inline-start" />
                Quay lại chi tiết thành viên
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
              <FilePenLine />
              Chỉnh sửa thành viên
            </CardTitle>
            <CardDescription>
              Tải dữ liệu hiện tại theo cặp organizationId, departmentId và
              memberId ổn định, sau đó cập nhật bằng cùng contract kiểm tra dữ
              liệu.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {memberDetailQuery.isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : null}

          {memberDetailQuery.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa tải được thông tin thành viên</AlertTitle>
              <AlertDescription>
                {(memberDetailQuery.error as Error)?.message ||
                  "Đã có lỗi xảy ra khi lấy dữ liệu thành viên."}
              </AlertDescription>
            </Alert>
          ) : null}

          {updateMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Lưu thất bại</AlertTitle>
              <AlertDescription>
                {(updateMutation.error as Error)?.message ||
                  "Không thể lưu thông tin thành viên. Vui lòng kiểm tra lại dữ liệu và thử lại."}
              </AlertDescription>
            </Alert>
          ) : null}

          {memberDetailQuery.data ? (
            <MemberForm
              mode="update"
              initialValues={memberDetailQuery.data}
              organizationId={params.organizationId}
              departmentId={params.departmentId}
              organizationName={
                memberDetailQuery.data?.parentContext?.organizationName
              }
              departmentName={
                memberDetailQuery.data?.parentContext?.departmentName
              }
              isPending={updateMutation.isPending}
              onSubmit={handleSubmit}
              onReset={() => router.back()}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminMemberEditPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <AdminMemberEditPageContent />
    </Suspense>
  );
}
