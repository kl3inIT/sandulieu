import { Search } from "lucide-react";

import {
  DIRECTORY_STATUSES,
  type DirectoryStatus,
} from "@/shared/model/directory-status.model";
import { DirectoryStatusBadge } from "@/shared/components/directory/DirectoryStatusBadge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

type DepartmentListFiltersProps = {
  organizationId: string;
  searchValue: string;
  selectedStatuses: DirectoryStatus[];
  onSearchSubmit: (value: string) => void;
  onStatusToggle: (status: DirectoryStatus) => void;
  onClearFilters: () => void;
};

export function DepartmentListFilters({
  organizationId,
  searchValue,
  selectedStatuses,
  onSearchSubmit,
  onStatusToggle,
  onClearFilters,
}: DepartmentListFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Phạm vi tổ chức đang áp dụng</p>
        <p className="text-sm text-muted-foreground">
          Chỉ hiển thị phòng ban thuộc tổ chức có mã ổn định {organizationId}.
        </p>
      </div>

      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          onSearchSubmit(String(formData.get("search") ?? ""));
        }}
      >
        <p className="text-sm font-medium">
          Tìm kiếm theo mã hoặc tên phòng ban
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              key={searchValue}
              name="search"
              defaultValue={searchValue}
              className="pl-9"
              placeholder="Ví dụ: SALE, OPS, Nhân sự"
            />
          </div>
          <Button type="submit">Áp dụng</Button>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Trạng thái</p>
        <div className="flex flex-wrap gap-2">
          {DIRECTORY_STATUSES.map((status) => {
            const isSelected = selectedStatuses.includes(status);

            return (
              <Button
                key={status}
                type="button"
                variant={isSelected ? "default" : "outline"}
                onClick={() => onStatusToggle(status)}
              >
                <DirectoryStatusBadge status={status} />
              </Button>
            );
          })}
          <Button type="button" variant="ghost" onClick={onClearFilters}>
            Xoá bộ lọc
          </Button>
        </div>
      </div>
    </div>
  );
}
