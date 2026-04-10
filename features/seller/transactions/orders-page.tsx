import { CheckCircle2, Clock, Eye, FileSearch, TrendingUp } from "lucide-react";

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

const orders = [
  {
    id: "ORD-2026-04-12847",
    date: "05/04/2026",
    customer: "Ngân hàng TMCP Việt Nam",
    product: "Báo cáo tín dụng DN Q1/2026",
    delivery: "API",
    value: "48.000.000 đ",
    contract: "HĐ-2026-0412",
    status: "Hoàn tất",
    tone: "emerald" as const,
  },
  {
    id: "ORD-2026-04-12846",
    date: "05/04/2026",
    customer: "CTCP Chứng khoán HCM",
    product: "Dữ liệu tỷ giá realtime",
    delivery: "WebSocket",
    value: "120.000.000 đ",
    contract: "HĐ-2026-0411",
    status: "Đang bàn giao",
    tone: "blue" as const,
  },
  {
    id: "ORD-2026-04-12845",
    date: "04/04/2026",
    customer: "Vietnam Airlines",
    product: "Dự báo kinh tế vĩ mô 2026",
    delivery: "CSV",
    value: "25.000.000 đ",
    contract: "HĐ-2026-0410",
    status: "Hoàn tất",
    tone: "emerald" as const,
  },
  {
    id: "ORD-2026-04-12844",
    date: "04/04/2026",
    customer: "VNG Corporation",
    product: "DS DN niêm yết HOSE/HNX",
    delivery: "API",
    value: "18.000.000 đ",
    contract: "HĐ-2026-0409",
    status: "Đang xử lý",
    tone: "amber" as const,
    actionLabel: "Bàn giao",
  },
  {
    id: "ORD-2026-04-12843",
    date: "03/04/2026",
    customer: "Techcombank",
    product: "Chỉ số rủi ro tín dụng SME",
    delivery: "API",
    value: "32.000.000 đ",
    contract: "HĐ-2026-0408",
    status: "Đang bàn giao",
    tone: "blue" as const,
  },
  {
    id: "ORD-2026-04-12842",
    date: "03/04/2026",
    customer: "PVComBank",
    product: "Báo cáo tín dụng DN Q1/2026",
    delivery: "API + CSV",
    value: "48.000.000 đ",
    contract: "HĐ-2026-0407",
    status: "Ký HĐ",
    tone: "amber" as const,
    actionLabel: "Ký số",
  },
  {
    id: "ORD-2026-04-12841",
    date: "02/04/2026",
    customer: "SSI Securities",
    product: "Dữ liệu lịch sử CK 2020-2025",
    delivery: "Parquet",
    value: "85.000.000 đ",
    contract: "HĐ-2026-0406",
    status: "Hoàn tất",
    tone: "emerald" as const,
  },
];

export function SellerOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Đơn hàng nhận được"
        description="Quản lý 2.847 đơn hàng, bàn giao dữ liệu và theo dõi thanh toán"
        actions={
          <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
            Bộ lọc
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Đơn hàng tháng này"
          value="142"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Chờ bàn giao"
          value="5"
          tone="amber"
          icon={Clock}
        />
        <SellerKpiCard
          label="Đang ký hợp đồng"
          value="3"
          tone="blue"
          icon={FileSearch}
        />
        <SellerKpiCard
          label="Hoàn tất tháng này"
          value="134"
          tone="emerald"
          icon={TrendingUp}
        />
      </div>

      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="gap-3 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-sm">Danh sách đơn hàng</CardTitle>
              <CardDescription className="text-xs">
                Theo thời gian mới nhất, trạng thái cập nhật real-time
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <SearchInput
                placeholder="Mã đơn, khách hàng..."
                className="w-full sm:w-64"
              />
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-full rounded-xl text-sm sm:w-44">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="done">Hoàn tất</SelectItem>
                    <SelectItem value="delivery">Đang bàn giao</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="contract">Ký HĐ</SelectItem>
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
                <TableHead>Mã đơn</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Bàn giao</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Hợp đồng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {order.product}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0 text-[10px]"
                    >
                      {order.delivery}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-emerald-600">
                    {order.value}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {order.contract}
                  </TableCell>
                  <TableCell>
                    <StatusPill tone={order.tone}>{order.status}</StatusPill>
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
                      {order.actionLabel ? (
                        <Button
                          size="sm"
                          className="h-8 rounded-lg px-3 text-xs"
                        >
                          {order.actionLabel}
                        </Button>
                      ) : null}
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
