import {
  AlertTriangle,
  ArrowRight,
  CircleCheck,
  Clock3,
  Eye,
  FileText,
  Flag,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Sparkles,
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
import { Input } from "@/shared/components/ui/input";

const overviewCards = [
  {
    title: "Chờ duyệt",
    value: "24",
    icon: Clock3,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
  {
    title: "Ưu tiên cao",
    value: "6",
    icon: AlertTriangle,
    iconClassName: "bg-[#fff1f2] text-[#f43f5e]",
  },
  {
    title: "Đã duyệt tuần này",
    value: "142",
    icon: ShieldCheck,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Từ chối tuần này",
    value: "8",
    icon: ShieldX,
    iconClassName: "bg-[#eaf0fb] text-[#315f9e]",
  },
] as const;

const workflowSteps = [
  "Bên bán đăng sản phẩm",
  "Kiểm tra tự động 8 tiêu chí (cấu trúc, dữ liệu cá nhân, siêu dữ liệu, pháp lý)",
  "Cán bộ sản xem xét",
  "Hội đồng thẩm định chất lượng",
  "Xuất bản lên danh mục",
] as const;

const moderationRows = [
  {
    code: "SP-TC-042",
    category: "Tài chính",
    priority: "Ưu tiên cao",
    autoCheck: "Auto-check: 8/8",
    title: "Chỉ số phái sinh CK Q1/2026",
    seller: "CTCP DL Tài chính Việt",
    tier: "Platinum",
    submittedAt: "Nộp 2 giờ trước",
    askPrice: "52.000.000 đ",
    quality: "94/100",
    pii: "Clean",
    piiTone: "ok" as const,
    autoChecks: "8/8",
    warning: undefined,
    actions: [
      "Review chi tiết",
      "Chuyển Hội đồng TD",
      "Duyệt nhanh",
      "Từ chối",
    ],
  },
  {
    code: "SP-YT-018",
    category: "Y tế",
    priority: "Ưu tiên cao",
    autoCheck: "Auto-check: 6/8",
    title: "Dữ liệu dịch tễ học COVID-25",
    seller: "Medatek Vietnam",
    tier: "Gold",
    submittedAt: "Nộp 4 giờ trước",
    askPrice: "38.000.000 đ",
    quality: "88/100",
    pii: "2 cảnh báo",
    piiTone: "warn" as const,
    autoChecks: "6/8",
    warning:
      "Cảnh báo PII: Phát hiện 2 trường có thể chứa dữ liệu cá nhân chưa mask. Yêu cầu seller xử lý trước khi duyệt.",
    actions: [
      "Review chi tiết",
      "Chuyển Hội đồng TD",
      "Yêu cầu seller xử lý PII",
      "Từ chối",
    ],
  },
  {
    code: "SP-GT-024",
    category: "Giao thông",
    priority: "Trung bình",
    autoCheck: "Auto-check: 8/8",
    title: "Dữ liệu giao thông TP.HCM Q1",
    seller: "GLN Logistics",
    tier: "Gold",
    submittedAt: "Nộp 6 giờ trước",
    askPrice: "24.000.000 đ",
    quality: "91/100",
    pii: "Clean",
    piiTone: "ok" as const,
    autoChecks: "8/8",
    warning: undefined,
    actions: [
      "Review chi tiết",
      "Chuyển Hội đồng TD",
      "Duyệt nhanh",
      "Từ chối",
    ],
  },
] as const;

function tonePiiClass(tone: "ok" | "warn") {
  return tone === "ok"
    ? "bg-[#ecfff7] text-[#0f9f6e]"
    : "bg-[#fff1f2] text-[#f43f5e]";
}

function actionButtonClass(label: string) {
  if (label === "Duyệt nhanh") {
    return "bg-[#159f67] text-white hover:bg-[#118456]";
  }

  if (label === "Từ chối") {
    return "border-[#ffd7d7] text-[#ef4444] hover:bg-[#fff6f6] hover:text-[#dc2626]";
  }

  if (label === "Yêu cầu seller xử lý PII") {
    return "border-[#ffd9bf] text-[#d97706] hover:bg-[#fff8ef] hover:text-[#c46a00]";
  }

  return "border-[#d8e0ea] bg-white text-[#0a2e5c] hover:bg-[#f8fbff]";
}

export default function AdminModerationPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="space-y-2">
          <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
            Duyệt sản phẩm
          </h1>
          <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
            Giám sát quy trình kiểm duyệt sản phẩm trước khi xuất bản lên danh
            mục
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

      <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
        <CardContent className="px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3 rounded-[1rem] border border-[#dbe6f2] bg-[#eef4ff] px-4 py-3 text-[#315f9e]">
            <Shield className="mt-0.5 size-4 shrink-0" />
            <p className="text-[0.92rem] leading-6">
              <strong>Quy trình kiểm duyệt sản phẩm:</strong> Bên bán đăng sản
              phẩm → Kiểm tra tự động 8 tiêu chí (cấu trúc, dữ liệu cá nhân,
              siêu dữ liệu, pháp lý) → Cán bộ sàn xem xét → Hội đồng thẩm định
              chất lượng → Xuất bản lên danh mục. Ở bước này cán bộ sàn kiểm tra
              sơ bộ trước khi chuyển Hội đồng thẩm định chính thức.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                  Queue duyệt sản phẩm
                </CardTitle>
              </div>

              <div className="w-full max-w-[27rem]">
                <div className="relative">
                  <Sparkles className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8ca0b8]" />
                  <Input
                    aria-label="Tìm mã SP / tên seller"
                    placeholder="Tìm mã SP / tên seller..."
                    className="h-10 w-full rounded-[0.95rem] border-[#d8e0ea] bg-white pl-10 pr-3 text-[0.95rem] text-[#0a2e5c] placeholder:text-[#8ca0b8] focus-visible:border-[#b9c7db]"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 px-4 pb-4 pt-4 sm:px-5">
            {moderationRows.map((item) => (
              <article
                key={item.code}
                className="rounded-[1.2rem] border border-[#e8dcc3] bg-[#fffdf5] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.03)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 gap-3.5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-[0.95rem] bg-[#0d2d59] text-[#f1b62c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <FileText className="size-6" />
                    </div>

                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-[0.76rem]">
                        <span className="text-[#7b8da5]">{item.code}</span>
                        <Badge className="rounded-full bg-[#eaf1fb] px-2.5 py-0.5 text-[#2d63d8] hover:bg-[#eaf1fb]">
                          {item.category}
                        </Badge>
                        <Badge className="rounded-full bg-[#ffe6e6] px-2.5 py-0.5 text-[#ef4444] hover:bg-[#ffe6e6]">
                          {item.priority}
                        </Badge>
                        <Badge className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[#16a34a] hover:bg-[#dcfce7]">
                          {item.autoCheck}
                        </Badge>
                      </div>

                      <h2 className="text-[1.04rem] font-semibold leading-tight text-[#0a2e5c] sm:text-[1.12rem]">
                        {item.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2 text-[0.84rem] text-[#7a8da4]">
                        <span>{item.seller}</span>
                        <Badge className="rounded-full bg-[#f4eddc] px-2.5 py-0.5 text-[#b98900] hover:bg-[#f4eddc]">
                          {item.tier}
                        </Badge>
                        <span>· {item.submittedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start">
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

                <div className="mt-4 grid gap-2.5 xl:grid-cols-4">
                  <div className="rounded-[0.95rem] border border-[#dbe4ee] bg-[#eef4fb] px-4 py-3">
                    <p className="text-[0.84rem] text-[#7b8da5]">Giá đề xuất</p>
                    <p className="mt-1 text-[1.05rem] font-semibold text-[#16a34a]">
                      {item.askPrice}
                    </p>
                  </div>
                  <div className="rounded-[0.95rem] border border-[#dbe4ee] bg-[#eef4fb] px-4 py-3">
                    <p className="text-[0.84rem] text-[#7b8da5]">
                      Quality tự động
                    </p>
                    <p className="mt-1 text-[1.05rem] font-semibold text-[#16a34a]">
                      {item.quality}
                    </p>
                  </div>
                  <div className="rounded-[0.95rem] border border-[#dbe4ee] bg-[#eef4fb] px-4 py-3">
                    <p className="text-[0.84rem] text-[#7b8da5]">PII Flags</p>
                    <p
                      className={`mt-1 text-[1.05rem] font-semibold ${item.piiTone === "ok" ? "text-[#0f9f6e]" : "text-[#f43f5e]"}`}
                    >
                      {item.pii}
                    </p>
                  </div>
                  <div className="rounded-[0.95rem] border border-[#dbe4ee] bg-[#eef4fb] px-4 py-3">
                    <p className="text-[0.84rem] text-[#7b8da5]">Auto checks</p>
                    <p className="mt-1 text-[1.05rem] font-semibold text-[#0a2e5c]">
                      {item.autoChecks}
                    </p>
                  </div>
                </div>

                {item.warning ? (
                  <div className="mt-3 flex items-start gap-2 rounded-[0.9rem] border border-[#ffd7dd] bg-[#fff0f3] px-4 py-3 text-[#e11d48]">
                    <Flag className="mt-0.5 size-4 shrink-0" />
                    <p className="text-[0.88rem] leading-6">{item.warning}</p>
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#efe3c8] pt-4">
                  {item.actions.map((label) => (
                    <Button
                      key={label}
                      variant={label === "Duyệt nhanh" ? "default" : "outline"}
                      className={`h-9 rounded-[0.85rem] px-4 ${actionButtonClass(label)}`}
                    >
                      {label === "Duyệt nhanh" ? (
                        <CircleCheck className="mr-2 size-4" />
                      ) : null}
                      {label}
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
