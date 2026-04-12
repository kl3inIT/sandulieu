"use client";

import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type MemberListFiltersProps = {
  search: string;
  statuses: DirectoryStatus[];
  onSearchChange: (search: string) => void;
  onStatusChange: (statuses: DirectoryStatus[]) => void;
};

export function MemberListFilters({
  search,
  statuses,
  onSearchChange,
  onStatusChange,
}: MemberListFiltersProps) {
  const selectedStatus = statuses.length === 1 ? statuses[0] : "";

  const handleStatusChange = (value: string) => {
    if (value === "") {
      onStatusChange([]);
    } else {
      onStatusChange([value as DirectoryStatus]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Tìm theo mã hoặc họ tên..."
        className="max-w-xs"
      />
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tất cả trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tất cả trạng thái</SelectItem>
          <SelectItem value="active">Hoạt động</SelectItem>
          <SelectItem value="inactive">Không hoạt động</SelectItem>
          <SelectItem value="archived">Đã lưu trữ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
