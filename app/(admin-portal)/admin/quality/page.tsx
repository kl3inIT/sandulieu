import {
  ArrowRight,
  CircleCheck,
  Eye,
  Flag,
  FileText,
  Handshake,
  Medal,
  Sparkles,
  SquareDashedMousePointer,
  Users,
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
    title: "Hồ sơ đang thẩm định",
    value: "12",
    icon: SquareDashedMousePointer,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
  {
    title: "Hoàn thành tháng này",
    value: "84",
    icon: CircleCheck,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Thẩm định viên",
    value: "28",
    icon: Users,
    iconClassName: "bg-[#eef2ff] text-[#315fda]",
  },
  {
    title: "Điểm TB ngành",
    value: "89,4/100",
    icon: Medal,
    iconClassName: "bg-[#fff4de] text-[#c58b00]",
  },
] as const;

const workflowItems = [
  {
    code: "TĐ-2026-04-0842",
    priority: "Ưu tiên cao",
    category: "Chấm điểm CL",
    title: "Báo cáo tín dụng SME Q1/2026",
    meta: "CTCP DL Tài chính Việt · HĐ Tài chính #2 · Còn 2 ngày",
    progress: 78,
  },
  {
    code: "TĐ-2026-04-0838",
    priority: "Trung bình",
    category: "Xem xét hồ sơ",
    title: "Dữ liệu y tế cộng đồng 2025",
    meta: "Medatek · HĐ Y tế #1 · Còn 4 ngày",
    progress: 29,
  },
  {
    code: "TĐ-2026-04-0836",
    priority: "Ưu tiên cao",
    category: "Định giá",
    title: "Chỉ số rủi ro tín dụng SME",
    meta: "CTCP DL Tài chính Việt · HĐ Tài chính #1 · Còn 1 ngày",
    progress: 84,
  },
  {
    code: "TĐ-2026-04-0832",
    priority: "Thấp",
    category: "Tiếp nhận",
    title: "Báo cáo giáo dục mầm non",
    meta: "EduData Vietnam · HĐ Giáo dục #1 · Còn 5 ngày",
    progress: 17,
  },
  {
    code: "TĐ-2026-04-0828",
    priority: "Trung bình",
    category: "Chấm điểm CL",
    title: "Bộ dữ liệu logistics nội địa",
    meta: "GLN Logistics · HĐ Thương mại · Còn 3 ngày",
    progress: 61,
  },
] as const;

const councilItems = [
  {
    name: "HĐ Tài chính #1",
    detail: "Tài chính - Ngân hàng",
    members: "5 TV",
    progress: "3/5 đang làm việc",
    progressValue: 60,
  },
  {
    name: "HĐ Tài chính #2",
    detail: "Chứng khoán - Bảo hiểm",
    members: "5 TV",
    progress: "2/5 đang làm việc",
    progressValue: 40,
  },
  {
    name: "HĐ Y tế #1",
    detail: "Y tế - Dược - BHXH",
    members: "7 TV",
    progress: "4/7 đang làm việc",
    progressValue: 57,
  },
  {
    name: "HĐ Giáo dục #1",
    detail: "Giáo dục - Đào tạo",
    members: "5 TV",
    progress: "1/5 đang làm việc",
    progressValue: 20,
  },
  {
    name: "HĐ Thương mại",
    detail: "Thương mại - Logistics",
    members: "6 TV",
    progress: "2/6 đang làm việc",
    progressValue: 33,
  },
] as const;

function PriorityBadge({ label }: { label: string }) {
  if (label === "Ưu tiên cao") {
    return (
      <Badge className="rounded-full bg-[#ffe0e0] px-2.5 py-0.5 text-[#ef4444] hover:bg-[#ffe0e0]">
        {label}
      </Badge>
    );
  }

  if (label === "Trung bình") {
    return (
      <Badge className="rounded-full bg-[#ffe8c7] px-2.5 py-0.5 text-[#d97706] hover:bg-[#ffe8c7]">
        {label}
      </Badge>
    );
  }

  return (
    <Badge className="rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-[#315fda] hover:bg-[#eef2ff]">
      {label}
    </Badge>
  );
}

export default function AdminQualityPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
              Hội đồng thẩm định chất lượng &amp; giá
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Quản lý 5 hội đồng · 28 thẩm định viên · Thẩm định chất lượng và
              định giá độc lập
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
            >
              <Users className="mr-2 size-4" />
              Thêm thẩm định viên
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
            >
              <Handshake className="mr-2 size-4" />
              Phân công
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

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.7fr]">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                  Hồ sơ đang thẩm định
                </CardTitle>
                <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                  Xếp theo mức độ ưu tiên và hạn chót
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {workflowItems.map((item) => (
              <article
                key={item.code}
                className="rounded-[1.2rem] border border-[#dbe4ee] bg-white px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.03)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[0.75rem] bg-[#dbe7f4] text-[#244d7b]">
                      <FileIcon />
                    </div>

                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-[0.76rem]">
                        <span className="text-[#7b8da5]">{item.code}</span>
                        <PriorityBadge label={item.priority} />
                        <Badge className="rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-[#315fda] hover:bg-[#dbeafe]">
                          {item.category}
                        </Badge>
                      </div>

                      <h2 className="text-[1.04rem] font-semibold leading-tight text-[#0a2e5c] sm:text-[1.12rem]">
                        {item.title}
                      </h2>

                      <p className="text-[0.84rem] text-[#7a8da4]">
                        {item.meta}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-full text-[#0a2e5c] hover:bg-[#edf3fb] hover:text-[#0a2e5c]"
                  >
                    <Eye className="size-4" />
                    <span className="sr-only">Xem hồ sơ</span>
                  </Button>
                </div>

                <div className="mt-4 h-2 rounded-full bg-[#edf2f7]">
                  <div
                    className="h-2 rounded-full bg-[#f59e0b]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              Các hội đồng
            </CardTitle>
            <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
              5 hội đồng chuyên ngành
            </p>
          </CardHeader>

          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {councilItems.map((item) => (
              <article
                key={item.name}
                className="rounded-[1.15rem] border border-[#dbe4ee] bg-white px-4 py-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#0a2e5c]">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-[0.84rem] text-[#7a8da4]">
                      {item.detail}
                    </p>
                  </div>
                  <Badge className="rounded-full bg-[#eaf1fb] px-2.5 py-0.5 text-[#315fda] hover:bg-[#eaf1fb]">
                    {item.members}
                  </Badge>
                </div>

                <div className="mt-3 h-1.5 rounded-full bg-[#edf2f7]">
                  <div
                    className="h-1.5 rounded-full bg-[#f59e0b]"
                    style={{ width: `${item.progressValue}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-[0.84rem] text-[#7a8da4]">
                  <span>{item.detail}</span>
                  <span>{item.progress}</span>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
        <CardContent className="flex items-start gap-3 px-4 py-4 sm:px-5">
          <Flag className="mt-0.5 size-4 shrink-0 text-[#2d63d8]" />
          <p className="text-[0.92rem] leading-6 text-[#315f9e]">
            Hội đồng thẩm định đang xử lý các hồ sơ có mức độ ưu tiên cao, đồng
            thời phối hợp đánh giá chất lượng và định giá độc lập trước khi xuất
            bản lên danh mục chính thức.
          </p>
          <Button
            variant="ghost"
            className="ml-auto h-9 rounded-[0.85rem] px-4 text-[#0a2e5c] hover:bg-[#edf3fb]"
          >
            Xem quy trình
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function FileIcon() {
  return <FileText className="size-4" />;
}
