import Link from "next/link";

import type { OrganizationDepartmentSummary as OrganizationDepartmentSummaryModel } from "@/shared/model/organization.model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export type OrganizationDepartmentSummaryProps = {
  summary: OrganizationDepartmentSummaryModel;
};

export function OrganizationDepartmentSummary({
  summary,
}: OrganizationDepartmentSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ngữ cảnh phòng ban</CardTitle>
        <CardDescription>
          Xem nhanh số phòng ban liên quan và đi tới bề mặt quản lý theo tổ
          chức.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{summary.count} phòng ban</Badge>
          <span className="text-sm text-muted-foreground">
            Dữ liệu này chỉ mang tính ngữ cảnh đọc nhanh trong Phase 2.
          </span>
        </div>

        {summary.previewNames.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Một số phòng ban hiện có</p>
            <div className="flex flex-wrap gap-2">
              {summary.previewNames.map((name) => (
                <Badge key={name} variant="outline">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Tổ chức này hiện chưa có phòng ban phụ thuộc.
          </p>
        )}

        <div>
          <Button asChild variant="outline">
            <Link href={summary.managePath}>Quản lý phòng ban của tổ chức</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
