"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FilePenLine } from "lucide-react";

import { DepartmentForm } from "@/features/departments/components/DepartmentForm";
import type { DepartmentFormPayload } from "@/features/departments/department.form";
import {
  useDepartmentDetailQuery,
  useUpdateDepartmentMutation,
} from "@/features/departments/department.query-hooks";
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

export default function AdminOrganizationDepartmentEditPage() {
  const params = useParams<{ organizationId: string; departmentId: string }>();
  const router = useRouter();
  const organizationId = params.organizationId;
  const departmentId = params.departmentId;
  const departmentDetailQuery = useDepartmentDetailQuery(
    organizationId,
    departmentId
  );
  const updateDepartmentMutation = useUpdateDepartmentMutation(organizationId);

  const handleUpdateDepartment = async (values: DepartmentFormPayload) => {
    const department = await updateDepartmentMutation.mutateAsync({
      departmentId,
      payload: {
        ...values,
        id: departmentId,
        organizationId,
      },
    });

    router.push(
      `/admin/organizations/${organizationId}/departments/${department.id}`
    );
  };

  const detailPath = `/admin/organizations/${organizationId}/departments/${departmentId}`;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Cập nhật phòng ban</Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href={detailPath}>
                <ArrowLeft data-icon="inline-start" />
                Quay lại chi tiết phòng ban
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl">
              <FilePenLine />
              Chỉnh sửa phòng ban
            </CardTitle>
            <CardDescription>
              Tải dữ liệu hiện tại theo cặp organizationId và departmentId ổn
              định, sau đó cập nhật bằng cùng contract kiểm tra dữ liệu.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {departmentDetailQuery.isLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
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

          {updateDepartmentMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa thể cập nhật phòng ban</AlertTitle>
              <AlertDescription>
                {(updateDepartmentMutation.error as Error).message ||
                  "Đã có lỗi xảy ra khi cập nhật phòng ban."}
              </AlertDescription>
            </Alert>
          ) : null}

          {departmentDetailQuery.data ? (
            <DepartmentForm
              mode="update"
              organizationId={organizationId}
              initialValues={departmentDetailQuery.data}
              submitLabel="Lưu thay đổi"
              isPending={updateDepartmentMutation.isPending}
              onSubmit={handleUpdateDepartment}
              onReset={() => updateDepartmentMutation.reset()}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
