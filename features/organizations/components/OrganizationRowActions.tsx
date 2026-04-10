import Link from "next/link";

import { OrganizationDeleteDialog } from "@/features/organizations/components/OrganizationDeleteDialog";
import { Button } from "@/shared/components/ui/button";

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
    <div className="flex flex-wrap justify-end gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href={detailHref}>Chi tiết</Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={editHref}>Chỉnh sửa</Link>
      </Button>
      <OrganizationDeleteDialog
        organizationId={organizationId}
        organizationName={organizationName}
      />
    </div>
  );
}
