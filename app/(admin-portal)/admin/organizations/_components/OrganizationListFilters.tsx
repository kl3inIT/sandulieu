import { Search } from "lucide-react";

import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

type OrganizationListFiltersProps = {
  searchValue: string;
  selectedStatuses: DirectoryStatus[];
  onSearchSubmit: (value: string) => void;
  onStatusToggle: (status: DirectoryStatus) => void;
  onClearFilters: () => void;
};

const FILTERABLE_STATUSES: Array<{ value: DirectoryStatus; label: string }> = [
  { value: "active", label: "Đang hoạt động" },
  { value: "inactive", label: "Tạm ngưng" },
  { value: "archived", label: "Lưu trữ" },
];

export function OrganizationListFilters({
  searchValue,
  selectedStatuses,
  onSearchSubmit,
  onStatusToggle,
  onClearFilters,
}: OrganizationListFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground">
      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          onSearchSubmit(String(formData.get("search") ?? ""));
        }}
      >
        <p className="text-sm font-medium">Tìm kiếm theo mã hoặc tên tổ chức</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              key={searchValue}
              name="search"
              defaultValue={searchValue}
              className="pl-9"
              placeholder="Ví dụ: ORG, ACME, Sao Mai"
            />
          </div>
          <Button type="submit">Áp dụng</Button>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Trạng thái</p>
        <div className="flex flex-wrap gap-2">
          {FILTERABLE_STATUSES.map((status) => {
            const isSelected = selectedStatuses.includes(status.value);

            return (
              <Button
                key={status.value}
                type="button"
                variant={isSelected ? "default" : "outline"}
                onClick={() => onStatusToggle(status.value)}
              >
                {status.label}
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
