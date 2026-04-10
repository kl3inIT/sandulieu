import type { ReactNode } from "react";

import type { DepartmentDetailResponse } from "@/features/departments/department.types";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type DepartmentDetailSummaryProps = {
  department: DepartmentDetailResponse;
};

const STATUS_LABELS: Record<DirectoryStatus, string> = {
  active: "Đang hoạt động",
  inactive: "Tạm ngưng",
  archived: "Lưu trữ",
};

const STATUS_VARIANTS: Record<
  DirectoryStatus,
  "default" | "secondary" | "outline"
> = {
  active: "default",
  inactive: "secondary",
  archived: "outline",
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
          value={
            <Badge variant={STATUS_VARIANTS[department.status]}>
              {STATUS_LABELS[department.status]}
            </Badge>
          }
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

type SummaryFieldProps = {
  label: string;
  value: ReactNode;
};

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function formatDateTime(value: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
