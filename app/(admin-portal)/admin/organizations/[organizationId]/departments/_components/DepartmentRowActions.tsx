import Link from "next/link";

import { Button } from "@/shared/components/ui/button";

import { DepartmentDeleteDialog } from "./DepartmentDeleteDialog";

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
      <DepartmentDeleteDialog
        organizationId={organizationId}
        departmentId={departmentId}
        departmentName={departmentName}
        trigger={
          <Button type="button" size="sm" variant="outline">
            Xoá
          </Button>
        }
      />
    </div>
  );
}
