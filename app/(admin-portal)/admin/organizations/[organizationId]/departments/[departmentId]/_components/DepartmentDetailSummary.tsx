import type { DepartmentDetailResponse } from "@/features/departments/department.types";
import { DirectoryStatusBadge } from "@/shared/components/directory/DirectoryStatusBadge";
import { SummaryField } from "@/shared/components/directory/SummaryField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatDateTime } from "@/shared/lib/format-date";

export type DepartmentDetailSummaryProps = {
  department: DepartmentDetailResponse;
};

export function DepartmentDetailSummary({
  department,
}: DepartmentDetailSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tóm tắt phòng ban</CardTitle>
        <CardDescription>
          Thông tin cốt lõi của phòng ban trong đúng phạm vi tổ chức cha.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <SummaryField label="ID ổn định" value={department.id} />
        <SummaryField label="Mã phòng ban" value={department.code} />
        <SummaryField label="Tên phòng ban" value={department.name} />
        <SummaryField
          label="Trạng thái"
          value={<DirectoryStatusBadge status={department.status} />}
        />
        <SummaryField
          label="Tổ chức cha"
          value={`${department.parentContext.organizationName} (${department.parentContext.organizationId})`}
        />
        <SummaryField label="Mã tổ chức" value={department.organizationId} />
        <SummaryField
          label="Ngày tạo"
          value={formatDateTime(department.createdAt)}
        />
        <SummaryField
          label="Cập nhật gần nhất"
          value={formatDateTime(department.updatedAt)}
        />
      </CardContent>
    </Card>
  );
}
