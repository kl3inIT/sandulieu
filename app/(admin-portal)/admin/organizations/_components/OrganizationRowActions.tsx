import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { OrganizationDeleteDialog } from "./OrganizationDeleteDialog";

type OrganizationRowActionsProps = {
  organizationId: string;
  organizationName: string;
};

export function OrganizationRowActions({
  organizationId,
  organizationName,
}: OrganizationRowActionsProps) {
  const detailHref = `/admin/organizations/${organizationId}`;
  const editHref = `/admin/organizations/${organizationId}/edit`;

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
      <OrganizationDeleteDialog
        organizationId={organizationId}
        organizationName={organizationName}
        trigger={
          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
}
