import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import { Badge } from "@/shared/components/ui/badge";

type DepartmentStatusBadgeProps = {
  status: DirectoryStatus;
};

const STATUS_LABELS: Record<DirectoryStatus, string> = {
  active: "Đang hoạt động",
  inactive: "Tạm ngưng",
  archived: "Lưu trữ",
};

const STATUS_VARIANTS: Record<
  DirectoryStatus,
  "default" | "secondary" | "outline"
> = {
  active: "default",
  inactive: "secondary",
  archived: "outline",
};

export function DepartmentStatusBadge({
  status,
}: DepartmentStatusBadgeProps) {
  return <Badge variant={STATUS_VARIANTS[status]}>{STATUS_LABELS[status]}</Badge>;
}
