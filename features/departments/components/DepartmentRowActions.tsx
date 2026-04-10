import Link from "next/link";

import { Button } from "@/shared/components/ui/button";

type DepartmentRowActionsProps = {
  organizationId: string;
  departmentId: string;
  departmentName: string;
};

export function DepartmentRowActions({
  organizationId,
  departmentId,
  departmentName,
}: DepartmentRowActionsProps) {
  const detailHref = `/admin/organizations/${organizationId}/departments/${departmentId}`;
  const editHref = `/admin/organizations/${organizationId}/departments/${departmentId}/edit`;

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href={detailHref}>Chi tiết</Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={editHref}>Chỉnh sửa</Link>
      </Button>
      <Button type="button" size="sm" variant="ghost" disabled>
        Xoá ({departmentName})
      </Button>
    </div>
  );
}
