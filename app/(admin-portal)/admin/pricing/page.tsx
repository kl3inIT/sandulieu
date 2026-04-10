import {
  Box,
  DollarSign,
  Percent,
  TrendingUp,
  Building2,
  Pencil,
  Plus,
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
    title: "Đơn giá cơ bản",
    value: "662",
    icon: DollarSign,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
  {
    title: "Gói dịch vụ",
    value: "24",
    icon: Box,
    iconClassName: "bg-[#eef3ff] text-[#315fda]",
  },
  {
    title: "Mã chiết khấu",
    value: "18",
    icon: Percent,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Doanh thu phí NT",
    value: "2.420.000.000 đ",
    icon: TrendingUp,
    iconClassName: "bg-[#eef3ff] text-[#315fda]",
  },
] as const;

const basePrices = [
  {
    name: "Xác thực VNeID",
    code: "DV-DC-001 · VAT 8%",
    price: "200 đ",
    unit: "/call",
  },
  {
    name: "Tra cứu doanh nghiệp",
    code: "DV-DN-042 · VAT 8%",
    price: "500 đ",
    unit: "/call",
  },
  {
    name: "Mã số thuế cá nhân",
    code: "DV-TC-118 · VAT 8%",
    price: "150 đ",
    unit: "/call",
  },
  {
    name: "BHXH tra cứu",
    code: "DV-BHXH-007 · VAT 8%",
    price: "300 đ",
    unit: "/call",
  },
  {
    name: "Thông tin cư trú",
    code: "DV-DC-002 · VAT 8%",
    price: "400 đ",
    unit: "/call",
  },
] as const;

const packages = [
  {
    name: "Gói Khởi nghiệp",
    meta: "3 dịch vụ · 10.000 calls/tháng",
    price: "2.400.000 đ",
    unit: "/tháng",
    accent: false,
  },
  {
    name: "Gói Doanh nghiệp",
    meta: "8 dịch vụ · 100.000 calls/tháng",
    price: "18.000.000 đ",
    unit: "/tháng",
    accent: true,
    badge: "Phổ biến",
  },
  {
    name: "Gói Enterprise",
    meta: "20 dịch vụ · 500.000 calls/tháng",
    price: "72.000.000 đ",
    unit: "/tháng",
    accent: false,
  },
  {
    name: "Gói Ngân hàng",
    meta: "28 dịch vụ · 2.000.000 calls/tháng",
    price: "240.000.000 đ",
    unit: "/tháng",
    accent: false,
  },
] as const;

const discountItems = [
  {
    code: "NEWYEAR2026",
    description: "Giảm 15% cho khách hàng mới",
    used: "Đã dùng: 248/1000",
    tone: "gold" as const,
    type: "Phần trăm",
  },
  {
    code: "ENTERPRISE50",
    description: "Giảm 50% phí nền tảng cho HĐ ≥500M",
    used: "Đã dùng: 12/50",
    tone: "gold" as const,
    type: "Cố định",
  },
  {
    code: "STARTUP_FREE",
    description: "Miễn phí 3 tháng cho doanh nghiệp khởi nghiệp",
    used: "Đã dùng: 84/200",
    tone: "gold" as const,
    type: "Miễn phí",
  },
] as const;

const platformFees = [
  { tier: "Giao dịch < 100M VND", fee: "5%", detail: "Phí giao dịch cơ bản" },
  {
    tier: "Giao dịch 100M-1B VND",
    fee: "3,5%",
    detail: "Ưu đãi cho giao dịch vừa",
  },
  { tier: "Giao dịch > 1B VND", fee: "2%", detail: "Enterprise tier" },
] as const;

export default function AdminPricingPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
              Biểu phí dịch vụ
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Cấu trúc giá, gói cước, mã chiết khấu và biểu phí nền tảng
            </p>
          </div>
          <Button className="h-10 rounded-[0.95rem] bg-[#10386d] px-4 text-white hover:bg-[#0f335f]">
            <PlusIcon /> Tạo cấu trúc giá mới
          </Button>
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

      <section className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <DollarSign className="size-5" />
              Đơn giá cơ bản
            </CardTitle>
            <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
              Giá gốc cho mỗi dịch vụ · Top 5 dịch vụ
            </p>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {basePrices.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-[1.1rem] border border-[#e8edf3] px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-[#0a2e5c]">{item.name}</p>
                  <p className="text-[0.76rem] text-[#7b8da5]">{item.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-[1.05rem] font-semibold text-[#0a2e5c]">
                    {item.price}
                  </p>
                  <p className="text-[0.76rem] text-[#7b8da5]">{item.unit}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="rounded-full hover:bg-[#edf3fb]"
                >
                  <Pencil className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              Gói dịch vụ
            </CardTitle>
            <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
              Gói kết hợp nhiều dịch vụ với giá ưu đãi
            </p>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {packages.map((item) => (
              <div
                key={item.name}
                className={
                  item.accent
                    ? "rounded-[1.1rem] border border-[#e8dcc3] bg-[#fffaf0] px-4 py-3"
                    : "rounded-[1.1rem] border border-[#e8edf3] px-4 py-3"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#0a2e5c]">
                        {item.name}
                      </p>
                      {item.badge ? (
                        <Badge className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-[#ca8a04] hover:bg-[#fef3c7]">
                          {item.badge}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-[0.84rem] text-[#7b8da5]">{item.meta}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[1.1rem] font-semibold text-[#0a2e5c]">
                      {item.price}
                    </p>
                    <p className="text-[0.76rem] text-[#7b8da5]">{item.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
        <CardHeader className="px-4 py-4 pb-0 sm:px-5">
          <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
            <Percent className="size-5" />
            Mã chiết khấu
          </CardTitle>
          <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
            Voucher và mã khuyến mãi đang hoạt động
          </p>
        </CardHeader>
        <CardContent className="grid gap-3 px-4 pb-4 pt-4 sm:px-5 xl:grid-cols-3">
          {discountItems.map((item) => (
            <div
              key={item.code}
              className="rounded-[1.1rem] border border-dashed border-[#d8e0ea] bg-[#fffaf1] px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#0a2e5c]">{item.code}</p>
                  <p className="mt-1 text-[0.84rem] text-[#7b8da5]">
                    {item.description}
                  </p>
                  <p className="mt-3 text-[0.84rem] text-[#7b8da5]">
                    {item.used}
                  </p>
                </div>
                <Badge className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-[#ca8a04] hover:bg-[#fef3c7]">
                  {item.type}
                </Badge>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#edf2f7]">
                <div className="h-2 w-[26%] rounded-full bg-[#d6a520]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
        <CardHeader className="px-4 py-4 pb-0 sm:px-5">
          <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
            <Building2 className="size-5" />
            Biểu phí nền tảng
          </CardTitle>
          <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
            Phí Sàn thu trên mỗi giao dịch
          </p>
        </CardHeader>
        <CardContent className="grid gap-3 px-4 pb-4 pt-4 sm:px-5 xl:grid-cols-3">
          {platformFees.map((item) => (
            <div
              key={item.tier}
              className="rounded-[1.1rem] border border-[#e8edf3] px-4 py-4"
            >
              <p className="text-[0.84rem] text-[#7b8da5]">{item.tier}</p>
              <p className="mt-1 text-[2rem] font-semibold tracking-tight text-[#0a2e5c]">
                {item.fee}
              </p>
              <p className="mt-1 text-[0.84rem] text-[#7b8da5]">
                {item.detail}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PlusIcon() {
  return <Plus className="mr-2 size-4" />;
}
