import {
  AlertTriangle,
  Download,
  ScrollText,
  Search,
  Users,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { SellerKpiCard, SellerPageHeader } from "@/features/seller/shared";

const auditEvents = [
  {
    role: "Owner",
    actor: "Trần Thị Mai",
    action: "Cập nhật giá từ 45M → 48M VND",
    target: "Target: SP-TC-001 · IP: 14.237.83.14 · 05/04/2026 14:32:18",
    tone: "blue" as const,
  },
  {
    role: "Sales Manager",
    actor: "Nguyễn Quang Huy",
    action: "Gửi chào giá 2,28B tới VIB",
    target: "Target: RFQ-2026-04-0482 · IP: 14.237.83.15 · 05/04/2026 14:08:42",
    tone: "blue" as const,
  },
  {
    role: "Data Engineer",
    actor: "Phạm Văn Minh",
    action: "Thêm field 'source_timestamp' vào schema v2.4",
    target: "Target: SP-TC-003 · IP: 14.237.83.18 · 05/04/2026 14:15:06",
    tone: "amber" as const,
  },
  {
    role: "Finance",
    actor: "Lê Thị Hà",
    action: "Rút 185M VND về ngân hàng",
    target:
      "Target: Vietcombank ••••3847 · IP: 14.237.83.22 · 05/04/2026 13:24:15",
    tone: "blue" as const,
  },
  {
    role: "Owner",
    actor: "Trần Thị Mai",
    action: "Mời thành viên mới với role Support Agent",
    target: "Target: user-ngoc · IP: 14.237.83.24 · 05/04/2026 12:08:30",
    tone: "blue" as const,
  },
  {
    role: "Content Manager",
    actor: "Hoàng Thị Lan",
    action: "Cập nhật meta description và keywords",
    target: "Target: storefront · IP: 14.237.83.22 · 05/04/2026 11:32:45",
    tone: "blue" as const,
  },
  {
    role: "Owner",
    actor: "Trần Thị Mai",
    action: "Tạo policy mới cho Enterprise tier",
    target:
      "Target: enterprise-policy · IP: 14.237.83.24 · 05/04/2026 10:45:20",
    tone: "blue" as const,
  },
  {
    role: "Critical",
    actor: "System",
    action: "5 lần đăng nhập thất bại, đã khóa IP",
    target: "Target: unknown@attacker.ru · IP: 203.x.x.x · 05/04/2026 09:18:08",
    tone: "rose" as const,
  },
  {
    role: "Sales Manager",
    actor: "Nguyễn Quang Huy",
    action: "Xem hồ sơ khách hàng",
    target: "Target: CUST-001 · IP: 14.237.83.15 · 05/04/2026 08:52:12",
    tone: "blue" as const,
  },
];

export function SellerAuditPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Audit log hoạt động"
        description="Lịch sử đầy đủ mọi hành động trên tài khoản bên bán, ghi chuỗi NDAChain và lưu trữ 7 năm"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              Bộ lọc
            </Button>
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              <Download data-icon="inline-start" />
              Export CSV
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Events hôm nay"
          value="284"
          tone="blue"
          icon={ScrollText}
        />
        <SellerKpiCard
          label="Critical events"
          value="1"
          tone="rose"
          icon={AlertTriangle}
        />
        <SellerKpiCard
          label="Thành viên active"
          value="5"
          tone="emerald"
          icon={Users}
        />
        <SellerKpiCard
          label="Tổng 30 ngày"
          value="8.420"
          tone="blue"
          icon={ScrollText}
        />
      </div>

      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="gap-3 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-sm">Activity feed</CardTitle>
              <CardDescription className="text-xs">
                Sắp xếp theo thời gian mới nhất, mọi action đều immutable
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-9 w-full rounded-xl pl-8 text-sm sm:w-64"
                  placeholder="Tìm theo user, action, target..."
                />
              </div>
              <Select defaultValue="all-severity">
                <SelectTrigger className="h-9 w-full rounded-xl text-sm sm:w-40">
                  <SelectValue placeholder="Tất cả severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-severity">
                      Tất cả severity
                    </SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="all-users">
                <SelectTrigger className="h-9 w-full rounded-xl text-sm sm:w-36">
                  <SelectValue placeholder="Tất cả users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-users">Tất cả users</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="sales">Sales Manager</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {auditEvents.map((event) => (
            <div
              key={`${event.actor}-${event.action}`}
              className={`rounded-xl border p-3 ${
                event.tone === "rose"
                  ? "border-rose-200 bg-rose-50"
                  : event.tone === "amber"
                    ? "border-amber-200 bg-amber-50"
                    : "border-border/70 bg-background"
              }`}
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full px-2 py-0 text-[10px]"
                >
                  {event.role}
                </Badge>
              </div>
              <p className="text-sm font-medium">
                {event.actor}: {event.action}
              </p>
              <p className="text-xs text-muted-foreground">{event.target}</p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>Hiển thị 10/8.420 events</span>
            <Button variant="outline" className="h-8 rounded-lg px-3 text-xs">
              Tải thêm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
