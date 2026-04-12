"use client";

import { Search } from "lucide-react";

import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import { Button } from "@/shared/components/ui/button";
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
  onSearchSubmit: (search: string) => void;
  onStatusChange: (statuses: DirectoryStatus[]) => void;
};

export function MemberListFilters({
  search,
  statuses,
  onSearchSubmit,
  onStatusChange,
}: MemberListFiltersProps) {
  const selectedStatus = statuses.length === 1 ? statuses[0] : "all";

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      onStatusChange([]);
    } else {
      onStatusChange([value as DirectoryStatus]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSearchSubmit(String(formData.get("search") ?? ""));
        }}
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              key={search}
              name="search"
              defaultValue={search}
              className="pl-9"
              placeholder="Tìm theo mã hoặc họ tên..."
            />
          </div>
          <Button type="submit">Áp dụng</Button>
        </div>
      </form>

      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tất cả trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="active">Hoạt động</SelectItem>
          <SelectItem value="inactive">Không hoạt động</SelectItem>
          <SelectItem value="archived">Đã lưu trữ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
