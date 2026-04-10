import {
  ArrowDownToLine,
  Database,
  Eye,
  Filter,
  Layers3,
  Pencil,
  Pause,
  Play,
  Search,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

const overviewCards = [
  {
    title: "Tổng bộ dữ liệu",
    value: "77",
    icon: Layers3,
    iconClassName: "bg-[#f9efcf] text-[#c58b00]",
  },
  {
    title: "Đang hoạt động",
    value: "72",
    icon: Play,
    iconClassName: "bg-[#e9fbf3] text-[#0f9f6e]",
  },
  {
    title: "Tổng bản ghi",
    value: "2,8 tỷ",
    icon: Database,
    iconClassName: "bg-[#eaf0ff] text-[#3257e3]",
  },
  {
    title: "Dung lượng",
    value: "4,2 TB",
    icon: TrendingUp,
    iconClassName: "bg-[#e8eff8] text-[#4d6b8f]",
  },
] as const;

const datasetRows = [
  {
    code: "BỘ-DC-01",
    tag: "Dân cư",
    tagClassName: "bg-[#eaf3ff] text-[#2f67d2]",
    status: "Hoạt động",
    statusClassName: "bg-[#dcfce7] text-[#15803d]",
    name: "Bộ dữ liệu dân cư toàn quốc",
    detail: "24 nguồn · Tần suất: Hàng ngày · Build cuối: 05/04/2026 02:00",
    records: "68.400.000",
    size: "482 GB",
    action: "pause" as const,
  },
  {
    code: "BỘ-DN-02",
    tag: "Doanh nghiệp",
    tagClassName: "bg-[#ebf1ff] text-[#3257e3]",
    status: "Hoạt động",
    statusClassName: "bg-[#dcfce7] text-[#15803d]",
    name: "Bộ dữ liệu BCTC doanh nghiệp",
    detail: "12 nguồn · Tần suất: Hàng quý · Build cuối: 01/04/2026 00:00",
    records: "24.800.000",
    size: "124 GB",
    action: "pause" as const,
  },
  {
    code: "BỘ-TC-01",
    tag: "Tài chính",
    tagClassName: "bg-[#eaf3ff] text-[#2f67d2]",
    status: "Hoạt động",
    statusClassName: "bg-[#dcfce7] text-[#15803d]",
    name: "Bộ dữ liệu thuế cá nhân & DN",
    detail: "16 nguồn · Tần suất: Hàng ngày · Build cuối: 05/04/2026 01:00",
    records: "52.000.000",
    size: "248 GB",
    action: "pause" as const,
  },
  {
    code: "BỘ-YT-01",
    tag: "Y tế",
    tagClassName: "bg-[#edf2ff] text-[#3367d4]",
    status: "Hoạt động",
    statusClassName: "bg-[#dcfce7] text-[#15803d]",
    name: "Bộ dữ liệu BHYT toàn dân",
    detail: "14 nguồn · Tần suất: Hàng ngày · Build cuối: 04/04/2026 22:00",
    records: "91.000.000",
    size: "620 GB",
    action: "pause" as const,
  },
  {
    code: "BỘ-YT-02",
    tag: "Y tế",
    tagClassName: "bg-[#edf2ff] text-[#3367d4]",
    status: "Đang build",
    statusClassName: "bg-[#fce7d6] text-[#d97706]",
    name: "Bộ dữ liệu tiêm chủng quốc gia",
    detail: "8 nguồn · Tần suất: Hàng tuần · Build cuối: Đang chạy",
    records: "82.000.000",
    size: "142 GB",
    action: "play" as const,
  },
  {
    code: "BỘ-GD-01",
    tag: "Giáo dục",
    tagClassName: "bg-[#eef7ff] text-[#3163d8]",
    status: "Hoạt động",
    statusClassName: "bg-[#dcfce7] text-[#15803d]",
    name: "Bộ dữ liệu giáo dục phổ thông",
    detail: "10 nguồn · Tần suất: Hàng tháng · Build cuối: 30/03/2026 00:00",
    records: "24.000.000",
    size: "42 GB",
    action: "pause" as const,
  },
] as const;

function ActionIcon({ action }: { action: "pause" | "play" }) {
  return action === "play" ? (
    <Play className="size-4" />
  ) : (
    <Pause className="size-4" />
  );
}

function PlusIcon() {
  return <span className="mr-2 text-lg leading-none">+</span>;
}

export default function AdminDatasetsPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[0.86rem] font-medium text-[#7d8ea6]">
              <Badge className="rounded-full bg-[#dfe9f7] px-3 py-1 text-[0.74rem] font-semibold text-[#4b6382] hover:bg-[#dfe9f7]">
                CB-SDL
              </Badge>
              <span>Sàn Dữ liệu Quốc gia</span>
            </div>
            <h1 className="text-[1.85rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.45rem] sm:leading-[1.02]">
              Quản lý bộ dữ liệu
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              77 bộ dữ liệu tổng hợp từ các dịch vụ CQNN · Phục vụ báo cáo định
              kỳ và phân tích chuyên sâu
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
            >
              <Filter className="mr-2 size-4" />
              Bộ lọc
            </Button>
            <Button className="h-10 rounded-[0.95rem] bg-[#10386d] px-4 text-white hover:bg-[#0f335f]">
              <PlusIcon />
              Tạo bộ dữ liệu mới
            </Button>
          </div>
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

      <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
        <CardHeader className="gap-4 px-4 py-4 pb-0 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                Danh sách bộ dữ liệu
              </CardTitle>
              <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                Tổng hợp từ các dịch vụ dữ liệu · Tham chiếu từ báo cáo cơ quan
                nhà nước
              </p>
            </div>

            <div className="w-full max-w-[28rem]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8ca0b8]" />
                <Input
                  placeholder="Tìm bộ dữ liệu..."
                  className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white pl-10 text-[0.95rem] text-[#0a2e5c] placeholder:text-[#8ca0b8]"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
          {datasetRows.map((row) => (
            <article
              key={row.code}
              className="flex flex-col gap-4 rounded-[1.2rem] border border-[#e1e7ef] bg-white px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.03)] transition-colors hover:bg-[#fbfcfe] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#d4a11f] text-[#1e1e1e] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <Database className="size-6" />
                </div>

                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[0.78rem] font-medium text-[#7f8fa4]">
                      {row.code}
                    </span>
                    <Badge
                      className={`rounded-full px-2.5 py-0.5 text-[0.74rem] font-medium hover:bg-current/0 ${row.tagClassName}`}
                    >
                      {row.tag}
                    </Badge>
                    <Badge
                      className={`rounded-full px-2.5 py-0.5 text-[0.74rem] font-medium hover:bg-current/0 ${row.statusClassName}`}
                    >
                      {row.status}
                    </Badge>
                  </div>
                  <h2 className="truncate text-[1.02rem] font-semibold leading-tight text-[#0a2e5c] sm:text-[1.12rem]">
                    {row.name}
                  </h2>
                  <p className="text-[0.83rem] text-[#7488a2] sm:text-[0.86rem]">
                    {row.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="min-w-[8rem] text-right">
                  <p className="text-[1rem] font-semibold leading-none text-[#0a2e5c] sm:text-[1.08rem]">
                    {row.records}
                  </p>
                  <p className="mt-1 text-[0.78rem] text-[#7f8fa4]">
                    {row.size}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[#304765]">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-[#304765] hover:bg-[#edf3fb] hover:text-[#0a2e5c]"
                    aria-label={`Xem ${row.name}`}
                  >
                    <Eye className="size-4.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-[#304765] hover:bg-[#edf3fb] hover:text-[#0a2e5c]"
                    aria-label={`Tải ${row.name}`}
                  >
                    <ArrowDownToLine className="size-4.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-[#304765] hover:bg-[#edf3fb] hover:text-[#0a2e5c]"
                    aria-label={`Chỉnh sửa ${row.name}`}
                  >
                    <Pencil className="size-4.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`size-8 rounded-full ${row.action === "play" ? "text-[#0f9f6e] hover:bg-[#e8fbf4]" : "text-[#ff8b1f] hover:bg-[#fff2e2]"}`}
                    aria-label={
                      row.action === "play"
                        ? `Tiếp tục ${row.name}`
                        : `Tạm dừng ${row.name}`
                    }
                  >
                    <ActionIcon action={row.action} />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
