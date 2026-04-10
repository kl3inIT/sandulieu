import type { ReactNode } from "react";

import type { OrganizationDetailResponse } from "@/features/organizations/organization.types";
import { OrganizationStatusBadge } from "@/features/organizations/components/OrganizationStatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export type OrganizationDetailSummaryProps = {
  organization: OrganizationDetailResponse;
};

export function OrganizationDetailSummary({
  organization,
}: OrganizationDetailSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tóm tắt tổ chức</CardTitle>
        <CardDescription>
          Thông tin cốt lõi của tổ chức theo id ổn định và contract hiện có.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <SummaryField label="ID ổn định" value={organization.id} />
        <SummaryField label="Mã tổ chức" value={organization.code} />
        <SummaryField label="Tên tổ chức" value={organization.name} />
        <SummaryField
          label="Trạng thái"
          value={<OrganizationStatusBadge status={organization.status} />}
        />
        <SummaryField
          label="Ngày tạo"
          value={formatDateTime(organization.createdAt)}
        />
        <SummaryField
          label="Cập nhật gần nhất"
          value={formatDateTime(organization.updatedAt)}
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
