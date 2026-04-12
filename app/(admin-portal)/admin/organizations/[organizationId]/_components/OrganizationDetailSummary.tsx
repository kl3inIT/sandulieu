import type { OrganizationDetailResponse } from "@/features/organizations/organization.types";
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
          value={<DirectoryStatusBadge status={organization.status} />}
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
