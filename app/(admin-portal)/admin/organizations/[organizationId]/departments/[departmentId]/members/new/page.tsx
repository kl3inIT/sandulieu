"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";

import { MemberForm } from "@/shared/components/members/MemberForm";
import type { MemberFormPayload } from "@/features/members/member.form";
import { useCreateMemberMutation } from "@/features/members/member.query-hooks";
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

function AdminMemberCreatePageContent() {
  const params = useParams<{ organizationId: string; departmentId: string }>();
  const router = useRouter();

  const createMutation = useCreateMemberMutation(
    params.organizationId,
    params.departmentId
  );

  const generatedId = `member-${crypto.randomUUID().split("-")[0]}`;
  const membersPath = `/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members`;

  async function handleSubmit(values: MemberFormPayload) {
    await createMutation.mutateAsync(values);
    router.push(membersPath);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Thêm thành viên</Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href={membersPath}>
                <ArrowLeft data-icon="inline-start" />
                Quay lại danh sách thành viên
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
              <UserPlus />
              Thêm thành viên mới
            </CardTitle>
            <CardDescription>
              Tạo thành viên mới trong phạm vi phòng ban hiện tại. Tổ chức và
              phòng ban được khóa theo route để giữ ngữ cảnh cha nhất quán.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {createMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Lưu thất bại</AlertTitle>
              <AlertDescription>
                {(createMutation.error as Error)?.message ||
                  "Không thể lưu thông tin thành viên. Vui lòng kiểm tra lại dữ liệu và thử lại."}
              </AlertDescription>
            </Alert>
          ) : null}

          <MemberForm
            mode="create"
            initialValues={{
              id: generatedId,
              organizationId: params.organizationId,
              departmentId: params.departmentId,
            }}
            organizationId={params.organizationId}
            departmentId={params.departmentId}
            isPending={createMutation.isPending}
            onSubmit={handleSubmit}
            onReset={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminMemberCreatePage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <AdminMemberCreatePageContent />
    </Suspense>
  );
}
