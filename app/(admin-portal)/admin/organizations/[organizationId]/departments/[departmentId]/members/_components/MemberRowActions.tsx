"use client";

import Link from "next/link";

import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Member } from "@/features/members/member.types";
import { Button } from "@/shared/components/ui/button";

type MemberRowActionsProps = {
  organizationId: string;
  departmentId: string;
  member: Member;
  onDeleteClick: (member: Member) => void;
};

export function MemberRowActions({
  organizationId,
  departmentId,
  member,
  onDeleteClick,
}: MemberRowActionsProps) {
  const detailHref = `/admin/organizations/${organizationId}/departments/${departmentId}/members/${member.id}`;
  const editHref = `/admin/organizations/${organizationId}/departments/${departmentId}/members/${member.id}/edit`;

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" asChild aria-label="Xem chi tiết">
        <Link href={detailHref}>
          <Eye size={16} />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild aria-label="Chỉnh sửa">
        <Link href={editHref}>
          <Pencil size={16} />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Xoá"
        className="text-destructive hover:text-destructive"
        onClick={() => onDeleteClick(member)}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
