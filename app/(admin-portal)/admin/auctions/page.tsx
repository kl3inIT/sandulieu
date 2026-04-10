import {
  ArrowRight,
  Eye,
  Gavel,
  HandCoins,
  PartyPopper,
  Zap,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const overviewCards = [
  {
    title: "Đang diễn ra",
    value: "3",
    icon: Zap,
    iconClassName: "bg-[#fff4e3] text-[#d97706]",
  },
  {
    title: "Tổng doanh thu đấu giá 2026",
    value: "82.400.000.000 đ",
    icon: HandCoins,
    iconClassName: "bg-[#edf6ff] text-[#2563eb]",
  },
  {
    title: "Phiên đã hoàn thành",
    value: "142",
    icon: Gavel,
    iconClassName: "bg-[#eaf1fb] text-[#335eea]",
  },
  {
    title: "Tỷ lệ thành công",
    value: "91,5%",
    icon: PartyPopper,
    iconClassName: "bg-[#fff0db] text-[#c58b00]",
  },
] as const;

const auctionRows = [
  {
    code: "AUC-2026-0412",
    status: "LIVE",
    title: "Bộ dữ liệu lịch sử giao dịch CK 2020-2025",
    meta: "Người bán: CTCP DL Tài chính Việt · 8 người đấu · 24 lượt đặt · 2d 14h",
    startPrice: "500.000.000 đ",
    currentPrice: "1.240.000.000 đ",
    growth: "+148%",
    reservePrice: "62.000.000 đ",
    progress: 72,
    highlight: false,
  },
  {
    code: "AUC-2026-0418",
    status: "LIVE",
    title: "Báo cáo tín dụng SME Q1/2026",
    meta: "Người bán: CTCP DL Tài chính Việt · 5 người đấu · 18 lượt đặt · 5d 2h",
    startPrice: "300.000.000 đ",
    currentPrice: "680.000.000 đ",
    growth: "+127%",
    reservePrice: "34.000.000 đ",
    progress: 51,
    highlight: false,
  },
  {
    code: "AUC-2026-0421",
    status: "SẮP KẾT THÚC",
    title: "Bộ dữ liệu tiêu dùng thành thị 2025",
    meta: "Người bán: CTCP Nghiên cứu Xã hội · 7 người đấu · 31 lượt đặt · 1d 06h",
    startPrice: "220.000.000 đ",
    currentPrice: "540.000.000 đ",
    growth: "+145%",
    reservePrice: "28.000.000 đ",
    progress: 84,
    highlight: true,
  },
] as const;

export default function AdminAuctionsPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="space-y-2">
          <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
            Đấu giá
          </h1>
          <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
            Giám sát và tổ chức các phiên đấu giá minh bạch trên toàn Sàn
          </p>
        </div>

        <section className="grid gap-3 xl:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className="rounded-[1.15rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_8px_18px_rgba(11,46,92,0.05)] ring-0"
              >
                <CardContent className="flex items-start justify-between gap-3 px-4 py-5">
                  <div className="space-y-2">
                    <p className="text-[0.92rem] text-[#7187a2]">
                      {card.title}
                    </p>
                    <p className="text-[2rem] leading-none font-semibold tracking-tight text-[#091f40] sm:text-[2.15rem]">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`flex size-11 items-center justify-center rounded-[0.95rem] ${card.iconClassName}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </section>

      <div className="space-y-4">
        {auctionRows.map((item) => (
          <Card
            key={item.code}
            className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0"
          >
            <CardHeader className="px-4 py-4 pb-3 sm:px-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[0.76rem] text-[#8a98ac]">
                    <span>{item.code}</span>
                    <Badge className="rounded-full bg-[#fff0c8] px-2.5 py-0.5 text-[0.72rem] font-semibold text-[#d97706] hover:bg-[#fff0c8]">
                      {item.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-[1.14rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.28rem]">
                    {item.title}
                  </CardTitle>
                  <p className="text-[0.92rem] text-[#6a7f99]">{item.meta}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-9 rounded-[0.85rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] hover:bg-[#f8fbff]"
                  >
                    <Eye className="mr-2 size-4" />
                    Theo dõi
                  </Button>
                  <Button className="h-9 rounded-[0.85rem] bg-[#d6a520] px-4 text-[#0b2348] hover:bg-[#c89317]">
                    Can thiệp
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-4 sm:px-5">
              <div className="grid gap-3 xl:grid-cols-4">
                <div className="rounded-[0.95rem] border border-[#dbe4ee] px-4 py-3">
                  <p className="text-[0.84rem] text-[#7b8da5]">Giá khởi điểm</p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-[#0a2e5c]">
                    {item.startPrice}
                  </p>
                </div>
                <div className="rounded-[0.95rem] border border-[#cfe7db] bg-[#ecfff7] px-4 py-3">
                  <p className="text-[0.84rem] text-[#4b8b72]">Giá hiện tại</p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-[#0f8b5f]">
                    {item.currentPrice}
                  </p>
                </div>
                <div className="rounded-[0.95rem] border border-[#dbe4ee] px-4 py-3">
                  <p className="text-[0.84rem] text-[#7b8da5]">
                    Tăng so với khởi điểm
                  </p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-[#0a2e5c]">
                    {item.growth}
                  </p>
                </div>
                <div className="rounded-[0.95rem] border border-[#dbe4ee] px-4 py-3">
                  <p className="text-[0.84rem] text-[#7b8da5]">
                    Phí nền tảng (5%)
                  </p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-[#c58b00]">
                    {item.reservePrice}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 rounded-full bg-[#edf2f7]">
                <div
                  className={`h-2 rounded-full ${item.highlight ? "bg-[#d6a520]" : "bg-[#b88a13]"}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="rounded-[1.35rem] border-dashed border-[#d8e0ea] bg-white/70 shadow-none ring-0">
          <CardContent className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div>
              <p className="font-semibold text-[#0a2e5c]">
                Xem thêm phiên đấu giá
              </p>
              <p className="text-sm text-[#6a7f99]">
                Mở danh sách đầy đủ và theo dõi tiến độ từng phiên
              </p>
            </div>
            <Button
              variant="outline"
              className="h-9 rounded-[0.85rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] hover:bg-[#f8fbff]"
            >
              Danh sách đầy đủ
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
