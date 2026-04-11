import {
  DollarSign,
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { customers } from "@/features/seller/data/transactions/customers.data";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  SearchInput,
  SellerKpiCard,
  SellerPageHeader,
  StatusPill,
} from "@/features/seller/shared";

export function SellerCustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Quản lý khách hàng (CRM)"
        description="142 khách hàng đang hoạt động, 68% tỷ lệ mua lại và LTV trung bình 520M VND"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              Export CSV
            </Button>
            <Button className="h-9 rounded-xl px-4 text-sm">
              <Users data-icon="inline-start" />
              Thêm contact
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Khách hàng active"
          value="142"
          tone="emerald"
          icon={Users}
          delta="+18.4%"
        />
        <SellerKpiCard
          label="VIP Enterprise"
          value="24"
          tone="amber"
          icon={Star}
          delta="+12.5%"
        />
        <SellerKpiCard
          label="LTV trung bình"
          value="520.000.000 đ"
          tone="blue"
          icon={DollarSign}
          delta="+8.2%"
        />
        <SellerKpiCard
          label="Repeat rate"
          value="68%"
          tone="blue"
          icon={TrendingUp}
          delta="+5.4%"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <TierCard
          title="VIP"
          value="12"
          detail="khách hàng · 8.240.000.000 đ"
          tone="amber"
        />
        <TierCard
          title="ACTIVE"
          value="98"
          detail="khách hàng · 4.820.000.000 đ"
          tone="emerald"
        />
        <TierCard
          title="MỚI (30 NGÀY)"
          value="18"
          detail="khách hàng · 680.000.000 đ"
          tone="blue"
        />
        <TierCard
          title="AT RISK"
          value="14"
          detail="khách hàng · 420.000.000 đ"
          tone="rose"
        />
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader className="gap-3 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-sm">Danh sách khách hàng</CardTitle>
              <CardDescription className="text-xs">
                Xếp theo LTV, click tên để xem chi tiết hồ sơ
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <SearchInput
                placeholder="Tìm khách hàng..."
                className="w-full sm:w-56"
              />
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-full rounded-xl text-sm sm:w-40">
                  <SelectValue placeholder="Tất cả segments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả segments</SelectItem>
                    <SelectItem value="bank">Ngân hàng</SelectItem>
                    <SelectItem value="insurance">Bảo hiểm</SelectItem>
                    <SelectItem value="fintech">FinTech</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Đơn hàng</TableHead>
                <TableHead>LTV</TableHead>
                <TableHead>Đơn gần nhất</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.code}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {customer.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {customer.code}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {customer.segment}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0 text-[10px]"
                    >
                      {customer.tier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {customer.orders}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-emerald-600">
                    {customer.ltv}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell className="text-sm">{customer.rating}</TableCell>
                  <TableCell>
                    <StatusPill tone={customer.tone}>
                      {customer.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg"
                      >
                        <Eye />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg"
                      >
                        <MessageSquare />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TierCard({
  title,
  value,
  detail,
  tone,
}: {
  title: string;
  value: string;
  detail: string;
  tone: "amber" | "emerald" | "blue" | "rose";
}) {
  const toneClass =
    tone === "amber"
      ? "bg-amber-500 text-white"
      : tone === "emerald"
        ? "bg-emerald-600 text-white"
        : tone === "blue"
          ? "bg-blue-600 text-white"
          : "bg-orange-500 text-white";

  return (
    <div className={`rounded-2xl p-4 ${toneClass}`}>
      <p className="text-xs uppercase tracking-[0.16em] text-white/75">
        {title}
      </p>
      <p className="mt-1 text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-white/80">{detail}</p>
    </div>
  );
}
