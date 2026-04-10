"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, FilePenLine } from "lucide-react";

import { DepartmentDeleteDialog } from "@/features/departments/components/DepartmentDeleteDialog";
import { DepartmentDetailSummary } from "@/features/departments/components/DepartmentDetailSummary";
import { DepartmentMemberSummary } from "@/features/departments/components/DepartmentMemberSummary";
import { useDepartmentDetailQuery } from "@/features/departments/department.query-hooks";
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

export default function AdminDepartmentDetailPage() {
  const params = useParams<{ organizationId: string; departmentId: string }>();
  const router = useRouter();
  const organizationId = params.organizationId;
  const departmentId = params.departmentId;
  const departmentDetailQuery = useDepartmentDetailQuery(
    organizationId,
    departmentId
  );

  if (!organizationId?.trim() || !departmentId?.trim()) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Phạm vi phòng ban chưa hợp lệ</AlertTitle>
        <AlertDescription>
          Vui lòng kiểm tra lại đường dẫn tổ chức và phòng ban trước khi tiếp
          tục.
        </AlertDescription>
      </Alert>
    );
  }

  const departmentsPath = `/admin/organizations/${organizationId}/departments`;
  const editPath = `${departmentsPath}/${departmentId}/edit`;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Chi tiết phòng ban</Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href={departmentsPath}>
                <ArrowLeft data-icon="inline-start" />
                Quay lại danh sách phòng ban
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
              <Building2 />
              Phòng ban {departmentId}
            </CardTitle>
            <CardDescription>
              Màn hình chi tiết theo hướng tóm tắt, giữ rõ ngữ cảnh tổ chức cha
              và cầu nối sang tầng thành viên.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href={editPath}>
                <FilePenLine data-icon="inline-start" />
                Chỉnh sửa phòng ban
              </Link>
            </Button>

            {departmentDetailQuery.data ? (
              <DepartmentDeleteDialog
                organizationId={organizationId}
                departmentId={departmentId}
                departmentName={departmentDetailQuery.data.name}
                onDeleteSuccess={() => {
                  router.push(departmentsPath);
                }}
                trigger={
                  <Button type="button" variant="outline">
                    Xoá phòng ban
                  </Button>
                }
              />
            ) : null}
          </div>

          {departmentDetailQuery.data ? (
            <div className="flex flex-col gap-2 rounded-lg border p-4 text-sm">
              <span className="text-muted-foreground">
                Ngữ cảnh tổ chức cha
              </span>
              <div className="font-medium">
                {departmentDetailQuery.data.parentContext.organizationName}
              </div>
              <div className="text-muted-foreground">
                ID tổ chức:{" "}
                {departmentDetailQuery.data.parentContext.organizationId}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={
                      departmentDetailQuery.data.parentContext
                        .manageOrganizationPath
                    }
                  >
                    Xem chi tiết tổ chức
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={
                      departmentDetailQuery.data.parentContext
                        .manageDepartmentsPath
                    }
                  >
                    Danh sách phòng ban cùng tổ chức
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {departmentDetailQuery.isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : null}

      {departmentDetailQuery.isError ? (
        <Alert variant="destructive">
          <AlertTitle>Chưa tải được phòng ban</AlertTitle>
          <AlertDescription>
            {(departmentDetailQuery.error as Error).message ||
              "Đã có lỗi xảy ra khi lấy dữ liệu phòng ban."}
          </AlertDescription>
        </Alert>
      ) : null}

      {departmentDetailQuery.data ? (
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <DepartmentDetailSummary department={departmentDetailQuery.data} />
          <DepartmentMemberSummary
            summary={departmentDetailQuery.data.memberSummary}
          />
        </div>
      ) : null}
    </div>
  );
}
