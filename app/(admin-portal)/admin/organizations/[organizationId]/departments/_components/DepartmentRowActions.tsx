import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

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
    <div className="flex justify-end gap-1">
      <Button asChild size="icon" variant="ghost">
        <Link href={detailHref}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="ghost">
        <Link href={editHref}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <DepartmentDeleteDialog
        organizationId={organizationId}
        departmentId={departmentId}
        departmentName={departmentName}
        trigger={
          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
}
