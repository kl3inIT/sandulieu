"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FilePenLine } from "lucide-react";

import { OrganizationForm } from "@/features/organizations/components/OrganizationForm";
import type { OrganizationFormPayload } from "@/features/organizations/organization.form";
import {
  useOrganizationDetailQuery,
  useUpdateOrganizationMutation,
} from "@/features/organizations/organization.query-hooks";
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

export default function AdminOrganizationEditPage() {
  const params = useParams<{ organizationId: string }>();
  const router = useRouter();
  const organizationId = params.organizationId;
  const organizationDetailQuery = useOrganizationDetailQuery(organizationId);
  const updateOrganizationMutation = useUpdateOrganizationMutation();

  const handleUpdateOrganization = async (values: OrganizationFormPayload) => {
    const organization = await updateOrganizationMutation.mutateAsync({
      organizationId,
      payload: values,
    });

    router.push(`/admin/organizations/${organization.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Cập nhật tổ chức</Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href={`/admin/organizations/${organizationId}`}>
                <ArrowLeft />
                Quay lại chi tiết
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
              <FilePenLine className="size-5" />
              Chỉnh sửa tổ chức
            </CardTitle>
            <CardDescription>
              Tải dữ liệu hiện tại theo organizationId ổn định rồi cập nhật bằng
              cùng contract kiểm tra dữ liệu.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {organizationDetailQuery.isLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : null}

          {organizationDetailQuery.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa tải được tổ chức</AlertTitle>
              <AlertDescription>
                {(organizationDetailQuery.error as Error).message ||
                  "Đã có lỗi xảy ra khi lấy dữ liệu tổ chức."}
              </AlertDescription>
            </Alert>
          ) : null}

          {updateOrganizationMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa thể cập nhật tổ chức</AlertTitle>
              <AlertDescription>
                {(updateOrganizationMutation.error as Error).message ||
                  "Đã có lỗi xảy ra khi cập nhật tổ chức."}
              </AlertDescription>
            </Alert>
          ) : null}

          {organizationDetailQuery.data ? (
            <OrganizationForm
              mode="update"
              submitLabel="Lưu thay đổi"
              initialValues={organizationDetailQuery.data}
              isPending={updateOrganizationMutation.isPending}
              onSubmit={handleUpdateOrganization}
              onReset={() => updateOrganizationMutation.reset()}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
