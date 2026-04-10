import {
  Clock,
  DollarSign,
  FileSearch,
  Send,
  Sparkles,
  TrendingUp,
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
import { SellerKpiCard, SellerPageHeader } from "@/features/seller/shared";

const demands = [
  {
    id: "RFQ-2026-04-0482",
    category: "Tài chính",
    type: "Enterprise",
    matchLabel: "Phù hợp 95%",
    name: "Cần dữ liệu giao dịch thẻ tín dụng 2023-2025",
    organization:
      "Ngân hàng TMCP Quốc tế (VIB) · Đăng 2 giờ trước · 4 seller đã chào",
    budget: "2.500.000.000 đ",
    deadline: "15/04/2026",
    score: "95/100",
  },
  {
    id: "RFQ-2026-04-0481",
    category: "Y tế",
    type: "Enterprise",
    matchLabel: "Phù hợp 72%",
    name: "Dữ liệu sức khỏe cộng đồng theo vùng",
    organization:
      "CTCP Bảo hiểm Bảo Việt · Đăng 5 giờ trước · 2 seller đã chào",
    budget: "800.000.000 đ",
    deadline: "20/04/2026",
    score: "72/100",
  },
  {
    id: "RFQ-2026-04-0480",
    category: "Xây dựng",
    type: "Enterprise",
    matchLabel: "Phù hợp 45%",
    name: "Dữ liệu quy hoạch đô thị 5 TP lớn",
    organization: "Vingroup Real Estate · Đăng 1 ngày trước · 6 seller đã chào",
    budget: "1.200.000.000 đ",
    deadline: "30/04/2026",
    score: "45/100",
  },
  {
    id: "RFQ-2026-04-0479",
    category: "Tài chính",
    type: "Standard",
    matchLabel: "Phù hợp 98%",
    name: "Dữ liệu tín dụng SME cho định giá rủi ro",
    organization: "PVI Insurance · Đăng 1 ngày trước · 4 seller đã chào",
    budget: "600.000.000 đ",
    deadline: "10/04/2026",
    score: "98/100",
  },
  {
    id: "RFQ-2026-04-0478",
    category: "Giao thông",
    type: "Standard",
    matchLabel: "Phù hợp 58%",
    name: "Dữ liệu giao thông và mật độ dân cư TP.HCM",
    organization: "Grab Vietnam · Đăng 2 ngày trước · 5 seller đã chào",
    budget: "450.000.000 đ",
    deadline: "25/04/2026",
    score: "58/100",
  },
];

export function SellerDemandsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Nhu cầu mua từ thị trường"
        description="Khám phá 247 yêu cầu dữ liệu đang mở và chào giá trực tiếp đến khách hàng"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              Bộ lọc nâng cao
            </Button>
            <Button className="h-9 rounded-xl px-4 text-sm">
              <Sparkles data-icon="inline-start" />
              AI Match cho tôi
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Nhu cầu mới (7 ngày)"
          value="42"
          tone="amber"
          icon={Clock}
        />
        <SellerKpiCard
          label="Phù hợp với bạn (≥70%)"
          value="18"
          tone="emerald"
          icon={TrendingUp}
        />
        <SellerKpiCard
          label="Chào giá đã gửi"
          value="12"
          tone="blue"
          icon={Send}
        />
        <SellerKpiCard
          label="Tổng budget tháng này"
          value="45.200.000.000 đ"
          tone="violet"
          icon={DollarSign}
        />
      </div>

      <div className="flex flex-col gap-4">
        {demands.map((demand) => (
          <Card
            key={demand.id}
            className="rounded-2xl border-border/70 shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <FileSearch className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {demand.id}
                    </span>
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0 text-[10px]"
                    >
                      {demand.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0 text-[10px]"
                    >
                      {demand.type}
                    </Badge>
                    <Badge className="rounded-full px-2 py-0 text-[10px]">
                      {demand.matchLabel}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm">{demand.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {demand.organization}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid gap-3 md:grid-cols-3">
                <DemandStat label="Ngân sách" value={demand.budget} />
                <DemandStat label="Hạn chào giá" value={demand.deadline} />
                <DemandStat
                  label="Điểm phù hợp AI"
                  value={demand.score}
                  tone="emerald"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="h-8 flex-1 rounded-lg text-xs"
                >
                  Xem chi tiết yêu cầu
                </Button>
                <Button className="h-8 flex-1 rounded-lg text-xs">
                  <Send data-icon="inline-start" />
                  Gửi chào giá
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemandStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald";
}) {
  return (
    <div className="rounded-xl bg-muted/40 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`text-sm font-semibold ${tone === "emerald" ? "text-emerald-600" : "text-primary"}`}
      >
        {value}
      </p>
    </div>
  );
}
