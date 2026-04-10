"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, FilePenLine } from "lucide-react";

import { OrganizationDeleteDialog } from "@/features/organizations/components/OrganizationDeleteDialog";
import { OrganizationDepartmentSummary } from "@/features/organizations/components/OrganizationDepartmentSummary";
import { OrganizationDetailSummary } from "@/features/organizations/components/OrganizationDetailSummary";
import { useOrganizationDetailQuery } from "@/features/organizations/organization.query-hooks";
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

export default function AdminOrganizationDetailPage() {
  const params = useParams<{ organizationId: string }>();
  const router = useRouter();
  const organizationId = params.organizationId;
  const organizationDetailQuery = useOrganizationDetailQuery(organizationId);

  if (!organizationId?.trim()) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Mã tổ chức chưa hợp lệ</AlertTitle>
        <AlertDescription>
          Vui lòng kiểm tra lại đường dẫn trước khi tiếp tục.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Chi tiết tổ chức</Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href="/admin/organizations">
                <ArrowLeft />
                Quay lại danh sách
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
              <Building2 className="size-5" />
              Tổ chức {organizationId}
            </CardTitle>
            <CardDescription>
              Màn hình chi tiết theo hướng tóm tắt, tập trung vào thông tin cốt
              lõi và ngữ cảnh phòng ban liên quan.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={`/admin/organizations/${organizationId}/edit`}>
              <FilePenLine data-icon="inline-start" />
              Chỉnh sửa
            </Link>
          </Button>
          {organizationDetailQuery.data ? (
            <OrganizationDeleteDialog
              organizationId={organizationDetailQuery.data.id}
              organizationName={organizationDetailQuery.data.name}
              onDeleteSuccess={() => {
                router.push("/admin/organizations");
              }}
            />
          ) : null}
        </CardContent>
      </Card>

      {organizationDetailQuery.isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-48 w-full" />
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

      {organizationDetailQuery.data ? (
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <OrganizationDetailSummary
            organization={organizationDetailQuery.data}
          />
          <OrganizationDepartmentSummary
            summary={organizationDetailQuery.data.departmentSummary}
          />
        </div>
      ) : null}
    </div>
  );
}
