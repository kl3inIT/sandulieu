import {
  AlertTriangle,
  Funnel,
  KeyRound,
  ShieldAlert,
  UserPlus2,
  Download,
  FileClock,
  HardDriveUpload,
  Eye,
  CircleDollarSign,
  SearchCheck,
  ScrollText,
  Search,
  Users,
} from "lucide-react";

import { auditEvents } from "@/features/seller/data/account/audit.data";

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

export function SellerAuditPage() {
  const eventRoleToneClass = (role: string) => {
    if (role === "Critical") {
      return "border-rose-200 bg-rose-100/70 text-rose-700";
    }

    if (role === "Owner") {
      return "border-amber-200 bg-amber-100/70 text-amber-700";
    }

    if (role === "System") {
      return "border-slate-200 bg-slate-100 text-slate-700";
    }

    return "border-border/80 bg-muted/70 text-muted-foreground";
  };

  const eventIcon = (code: string) => {
    switch (code) {
      case "product_price_update":
      case "policy_create":
        return SearchCheck;
      case "schema_update":
        return HardDriveUpload;
      case "team_invite":
        return UserPlus2;
      case "auth_failed":
        return ShieldAlert;
      case "customer_view":
        return Eye;
      case "payout_withdraw":
      case "payout_scheduled":
        return CircleDollarSign;
      case "rfq_offer_sent":
        return FileClock;
      default:
        return KeyRound;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Audit log hoạt động"
        description="Lịch sử đầy đủ mọi hành động trên tài khoản bên bán · Ghi chuỗi NDAChain · Lưu trữ 7 năm"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              <Funnel data-icon="inline-start" />
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

      <Card className="border-border/70 shadow-sm">
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
          {auditEvents.map((event) => {
            const EventIcon = eventIcon(event.code);

            return (
              <div
                key={`${event.code}-${event.actor}-${event.action}`}
                className={`flex items-start gap-3 rounded-lg border p-3 ${
                  event.tone === "rose"
                    ? "border-rose-300 bg-rose-100"
                    : event.tone === "amber"
                      ? "border-amber-300 bg-amber-100"
                      : "border-border/70 bg-background"
                }`}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                  <EventIcon className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {event.code}
                    </span>
                    <Badge
                      variant="outline"
                      className={`rounded-full px-2 py-0 text-[10px] ${eventRoleToneClass(event.role)}`}
                    >
                      {event.role}
                    </Badge>
                  </div>
                  <p className="truncate text-sm font-semibold text-foreground">
                    {event.actor}: {event.action}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {event.target}
                  </p>
                </div>
              </div>
            );
          })}
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
