import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import type { DepartmentMemberSummaryModel } from "@/shared/model/department.model";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export type DepartmentMemberSummaryProps = {
  summary: DepartmentMemberSummaryModel;
};

export function DepartmentMemberSummary({
  summary,
}: DepartmentMemberSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Users />
          Tóm tắt thành viên liên quan
        </CardTitle>
        <CardDescription>
          Thông tin đọc nhanh trong phạm vi phòng ban hiện tại, không mở rộng
          sang chỉnh sửa thành viên.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricField
            label="Tổng số thành viên"
            value={summary.totalMembers}
          />
          <MetricField label="Đang hoạt động" value={summary.activeMembers} />
          <MetricField label="Tạm ngưng" value={summary.inactiveMembers} />
          <MetricField label="Lưu trữ" value={summary.archivedMembers} />
        </div>

        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <span className="text-sm text-muted-foreground">Xem nhanh</span>
          {summary.previewNames.length ? (
            <ul className="flex flex-col gap-1 text-sm font-medium">
              {summary.previewNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Chưa có thành viên nào trong phòng ban này.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href={summary.manageMembersPath}>
            <ArrowRight data-icon="inline-end" />
            Mở danh sách thành viên
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

type MetricFieldProps = {
  label: string;
  value: number;
};

function MetricField({ label, value }: MetricFieldProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
