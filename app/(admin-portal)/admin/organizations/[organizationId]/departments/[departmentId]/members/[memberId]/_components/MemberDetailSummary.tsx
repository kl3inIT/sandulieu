"use client";

import type { MemberDetailResponse } from "@/features/members/member.types";
import { DirectoryStatusBadge } from "@/shared/components/directory/DirectoryStatusBadge";
import { SummaryField } from "@/shared/components/directory/SummaryField";
import { Card, CardContent } from "@/shared/components/ui/card";

type MemberDetailSummaryProps = {
  member: MemberDetailResponse;
};

export function MemberDetailSummary({ member }: MemberDetailSummaryProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryField
            label="ID ổn định"
            value={<code className="font-mono text-xs">{member.id}</code>}
          />
          <SummaryField
            label="Mã thành viên"
            value={<span className="font-semibold">{member.memberCode}</span>}
          />
          <SummaryField
            label="Họ và tên"
            value={<span className="font-semibold">{member.fullName}</span>}
          />
          <SummaryField
            label="Trạng thái"
            value={<DirectoryStatusBadge status={member.status} />}
          />
          <SummaryField
            label="Tổ chức cha"
            value={member.parentContext.organizationName}
          />
          <SummaryField
            label="Phòng ban cha"
            value={member.parentContext.departmentName}
          />
        </div>
      </CardContent>
    </Card>
  );
}
