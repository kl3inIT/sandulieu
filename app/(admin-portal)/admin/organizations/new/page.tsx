"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";

import { OrganizationForm } from "@/shared/components/organizations/OrganizationForm";
import { useCreateOrganizationMutation } from "@/features/organizations/organization.query-hooks";
import type { OrganizationFormPayload } from "@/features/organizations/organization.form";
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

export default function AdminOrganizationCreatePage() {
  const router = useRouter();
  const createOrganizationMutation = useCreateOrganizationMutation();

  const handleCreateOrganization = async (values: OrganizationFormPayload) => {
    const organization = await createOrganizationMutation.mutateAsync(values);
    router.push(`/admin/organizations/${organization.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline">Tạo tổ chức</Badge>
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
              Thêm tổ chức mới
            </CardTitle>
            <CardDescription>
              Tạo tổ chức bằng form dùng chung để giữ rõ ràng id ổn định, mã
              nghiệp vụ, tên hiển thị và trạng thái.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {createOrganizationMutation.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa thể tạo tổ chức</AlertTitle>
              <AlertDescription>
                {(createOrganizationMutation.error as Error).message ||
                  "Đã có lỗi xảy ra khi tạo tổ chức."}
              </AlertDescription>
            </Alert>
          ) : null}

          <OrganizationForm
            mode="create"
            submitLabel="Tạo tổ chức"
            isPending={createOrganizationMutation.isPending}
            onSubmit={handleCreateOrganization}
            onReset={() => createOrganizationMutation.reset()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
