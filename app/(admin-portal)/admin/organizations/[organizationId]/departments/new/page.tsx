"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";

import { DepartmentForm } from "@/features/departments/components/DepartmentForm";
import type { DepartmentFormPayload } from "@/features/departments/department.form";
import { useCreateDepartmentMutation } from "@/features/departments/department.query-hooks";
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

export default function AdminOrganizationDepartmentCreatePage() {
  const params = useParams<{ organizationId: string }>();
  const router = useRouter();
  const organizationId = params.organizationId;
  const createDepartmentMutation = useCreateDepartmentMutation(organizationId);

  const handleCreateDepartment = async (values: DepartmentFormPayload) => {
    const department = await createDepartmentMutation.mutateAsync({
      ...values,
      organizationId,
    });

    router.push(
      `/admin/organizations/${organizationId}/departments/${department.id}`
    );
  };

  const departmentsPath = `/admin/organizations/${organizationId}/departments`;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Tạo phòng ban</Badge>
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
              Thêm phòng ban mới
            </CardTitle>
            <CardDescription>
              Tạo phòng ban trong phạm vi tổ chức hiện tại bằng form dùng chung
              để giữ rõ ID ổn định, mã nghiệp vụ, tên hiển thị và trạng thái.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {createDepartmentMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa thể tạo phòng ban</AlertTitle>
              <AlertDescription>
                {(createDepartmentMutation.error as Error).message ||
                  "Đã có lỗi xảy ra khi tạo phòng ban."}
              </AlertDescription>
            </Alert>
          ) : null}

          <DepartmentForm
            mode="create"
            organizationId={organizationId}
            submitLabel="Tạo phòng ban"
            isPending={createDepartmentMutation.isPending}
            onSubmit={handleCreateDepartment}
            onReset={() => createDepartmentMutation.reset()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
