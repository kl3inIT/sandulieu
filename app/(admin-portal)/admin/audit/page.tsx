import {
  Activity,
  ArrowDownToLine,
  Eye,
  FileText,
  Filter,
  Shield,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

import { AdminPageHeader } from "@/shared/components/admin/admin-page-header";
import { AdminStatCard } from "@/shared/components/admin/admin-stat-card";
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
    title: "Events hôm nay",
    value: "2.480",
    icon: Activity,
    iconClassName: "bg-[#eef3ff] text-[#315fda]",
  },
  {
    title: "Critical events",
    value: "2",
    icon: ShieldAlert,
    iconClassName: "bg-[#fff1f3] text-[#f43f5e]",
  },
  {
    title: "Admin active",
    value: "24",
    icon: Users,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Tổng log 30 ngày",
    value: "74.400",
    icon: FileText,
    iconClassName: "bg-[#eef3ff] text-[#315fda]",
  },
] as const;

const severityItems = [
  { label: "INFO", value: 2428, progress: 100, tone: "blue" as const },
  { label: "WARN", value: 42, progress: 1.7, tone: "amber" as const },
  { label: "CRITICAL", value: 8, progress: 0.3, tone: "red" as const },
  { label: "AUDIT", value: 2, progress: 0.1, tone: "slate" as const },
] as const;

const categoryItems = [
  { label: "Service mgmt", value: 482, progress: 48, tone: "navy" as const },
  { label: "Consent ops", value: 842, progress: 100, tone: "green" as const },
  { label: "API calls", value: 620, progress: 74, tone: "blue" as const },
  {
    label: "Account approve",
    value: 248,
    progress: 30,
    tone: "amber" as const,
  },
  { label: "Pricing updates", value: 142, progress: 18, tone: "gold" as const },
  { label: "Quality review", value: 84, progress: 10, tone: "purple" as const },
] as const;

const topUsers = [
  { name: "Lê Minh Khoa", role: "Super Admin", value: "842" },
  { name: "Nguyễn Thị Lan", role: "Admin CQNN", value: "620" },
  { name: "System", role: "Automation", value: "18.400" },
  { name: "Trần Văn Hùng", role: "Evaluator", value: "248" },
  { name: "Phạm Đức Anh", role: "Technician", value: "142" },
] as const;

const logItems = [
  {
    type: "service.create",
    tag: "Super Admin",
    title: "Lê Minh Khoa · Tạo dịch vụ mới 'Thông tin cư trú theo CCCD'",
    target: "Target: DV-DC-003 · IP: 14.237.82.14 · 05/04/2026 14:32:18",
    tone: "blue" as const,
  },
  {
    type: "account.approve",
    tag: "Admin CQNN",
    title: "Nguyễn Thị Lan · Duyệt tài khoản doanh nghiệp",
    target:
      "Target: CUST-0142 · (FinTech Việt) · IP: 14.237.82.16 · 05/04/2026 14:28:42",
    tone: "blue" as const,
  },
  {
    type: "pii.alert",
    tag: "System",
    title:
      "System · Phát hiện 2 trường dữ liệu cá nhân chưa mask trong sản phẩm bên bán đăng",
    target: "Target: SP-TC-042 · IP: internal · 05/04/2026 14:15:08",
    tone: "red" as const,
  },
  {
    type: "quality.vote",
    tag: "Evaluator",
    title: "Trần Văn Hùng · Vote Gold 94/100 cho SP-TC-007",
    target: "Target: TD-2026-04-0842 · IP: 14.237.82.18 · 05/04/2026 13:42:15",
    tone: "slate" as const,
  },
  {
    type: "dispute.mediate",
    tag: "Super Admin",
    title:
      "Lê Minh Khoa · Ra phán quyết: chấp nhận thỏa thuận rebuild + 3 tháng extended SLA",
    target: "Target: KN-2026-04-0148 · IP: 14.237.82.14 · 05/04/2026 12:08:30",
    tone: "amber" as const,
  },
  {
    type: "consent.revoke",
    tag: "System",
    title: "System · Công dân thu hồi consent qua VNeID dashboard",
    target: "Target: CR-2026-04-0150 · IP: internal · 05/04/2026 11:32:45",
    tone: "slate" as const,
  },
  {
    type: "api.rateLimit",
    tag: "Technician",
    title: "Phạm Đức Anh · Phát hiện rate limit exceeded, auto-throttle",
    target: "Target: IP 14.237.x.x · 14.237.82.22 · 05/04/2026 10:45:20",
    tone: "amber" as const,
  },
  {
    type: "auth.failed",
    tag: "System",
    title: "System · 10 lần đăng nhập thất bại, đã khóa IP 24h",
    target: "Target: attacker@unknown.ru · IP: 203.x.x.x · 05/04/2026 09:18:08",
    tone: "red" as const,
  },
  {
    type: "pricing.update",
    tag: "Admin CQNN",
    title: "Nguyễn Thị Lan · Cập nhật giá từ 200 → 250 VNĐ/call",
    target: "Target: DV-DC-001 · IP: 14.237.82.16 · 05/04/2026 08:52:12",
    tone: "amber" as const,
  },
  {
    type: "dataset.build",
    tag: "System",
    title: "System · Chạy scheduled build dataset dân cư",
    target: "Target: BỘ-DC-01 · IP: internal · 05/04/2026 08:15:00",
    tone: "slate" as const,
  },
] as const;

function toneClasses(
  tone:
    | "blue"
    | "amber"
    | "red"
    | "slate"
    | "navy"
    | "green"
    | "gold"
    | "purple"
) {
  switch (tone) {
    case "blue":
      return "bg-[#2f67d2]";
    case "amber":
      return "bg-[#f59e0b]";
    case "red":
      return "bg-[#ef4444]";
    case "navy":
      return "bg-[#0f2f64]";
    case "green":
      return "bg-[#10b981]";
    case "gold":
      return "bg-[#d6a520]";
    case "purple":
      return "bg-[#8b5cf6]";
    default:
      return "bg-[#cbd5e1]";
  }
}

function progressWidth(value: number) {
  return `${Math.max(6, Math.min(100, value))}%`;
}

export default function AdminAuditPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <AdminPageHeader
          className="xl:items-start xl:justify-between"
          contentClassName="space-y-2"
          titleClassName="text-[1.9rem] text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]"
          descriptionClassName="max-w-4xl leading-6 text-[#6a7f99] sm:text-[1rem]"
          actionsClassName="flex-col gap-2 sm:flex-row sm:items-center"
          title="Nhật ký kiểm toán toàn hệ thống"
          description="Tra cứu/lọc/xuất nhật ký · Ghi chuỗi NDACchain · Lưu trữ 7 năm theo Nghị định 13/2023"
          actions={
            <>
              <Button
                variant="outline"
                className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
              >
                <Filter className="mr-2 size-4" />
                Bộ lọc nâng cao
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
              >
                <ArrowDownToLine className="mr-2 size-4" />
                Export CSV / JSON
              </Button>
            </>
          }
        />

        <section className="grid gap-3 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <AdminStatCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              cardClassName="rounded-[1.15rem] border-[#d8e0ea] shadow-[0_1px_0_rgba(13,43,88,0.04),0_8px_18px_rgba(11,46,92,0.05)]"
              contentClassName="px-4 py-5"
              headerClassName="items-start gap-3"
              titleClassName="text-[0.92rem] text-[#7187a2]"
              valueClassName="text-[2rem] font-semibold tracking-tight text-[#091f40] sm:text-[2.15rem]"
              iconClassName={`size-11 rounded-[0.95rem] ${card.iconClassName}`}
            />
          ))}
        </section>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                  Events theo severity
                </CardTitle>
                <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                  Full-text search · Filter theo user/severity/category/date ·
                  Immutable NDACchain
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <div className="relative w-full sm:w-[18rem]">
                  <Sparkles className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8ca0b8]" />
                  <Input
                    placeholder="Tim user/action/target..."
                    className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white pl-10 text-[0.95rem] text-[#0a2e5c] placeholder:text-[#8ca0b8]"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="h-10 rounded-[0.95rem] border border-[#d8e0ea] bg-white px-3 text-[0.95rem] text-[#0a2e5c] outline-none">
                    <option>Tất cả severity</option>
                  </select>
                  <select className="h-10 rounded-[0.95rem] border border-[#d8e0ea] bg-white px-3 text-[0.95rem] text-[#0a2e5c] outline-none">
                    <option>30 ngày qua</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 px-4 pb-4 pt-4 sm:px-5 lg:grid-cols-[1.05fr_1fr_0.9fr]">
            <div className="rounded-[1.15rem] border border-[#e8edf3] px-4 py-4">
              <p className="text-[1rem] font-semibold text-[#0a2e5c]">
                Events hôm nay
              </p>
              <div className="mt-4 space-y-4">
                {severityItems.map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[0.88rem] text-[#315f9e]">
                      <span>{item.label}</span>
                      <strong>
                        {item.value.toLocaleString("en-US").replace(/,/g, ".")}
                      </strong>
                    </div>
                    <div className="h-2 rounded-full bg-[#edf2f7]">
                      <div
                        className={`h-2 rounded-full ${toneClasses(item.tone)}`}
                        style={{ width: progressWidth(item.progress) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.15rem] border border-[#e8edf3] px-4 py-4">
              <p className="text-[1rem] font-semibold text-[#0a2e5c]">
                Top categories
              </p>
              <div className="mt-4 space-y-4">
                {categoryItems.map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[0.88rem] text-[#315f9e]">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                    <div className="h-2 rounded-full bg-[#edf2f7]">
                      <div
                        className={`h-2 rounded-full ${toneClasses(item.tone)}`}
                        style={{ width: progressWidth(item.progress) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.15rem] border border-[#e8edf3] px-4 py-4">
              <p className="text-[1rem] font-semibold text-[#0a2e5c]">
                Top users (30d)
              </p>
              <div className="mt-4 space-y-2.5">
                {topUsers.map((user) => (
                  <div
                    key={user.name}
                    className="flex items-center justify-between rounded-[0.85rem] border border-[#e8edf3] px-3 py-2"
                  >
                    <div>
                      <p className="text-[0.9rem] font-semibold text-[#0a2e5c]">
                        {user.name}
                      </p>
                      <p className="text-[0.72rem] text-[#7b8da5]">
                        {user.role}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-[#f3f6fb] px-2.5 py-0.5 text-[#64748b] hover:bg-[#f3f6fb]">
                      {user.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
            <CardHeader className="px-4 py-4 pb-0 sm:px-5">
              <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                Log viewer (Activity feed)
              </CardTitle>
              <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                Full-text search · Filter theo user/severity/category/date ·
                Immutable NDACchain
              </p>
            </CardHeader>

            <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
              {logItems.map((item) => (
                <div
                  key={item.title}
                  className={[
                    "rounded-[1.1rem] border px-4 py-3.5",
                    item.tone === "red"
                      ? "border-[#ffd7dd] bg-[#fff0f3]"
                      : item.tone === "amber"
                        ? "border-[#f6e3b0] bg-[#fff8e8]"
                        : "border-[#e8edf3] bg-white",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={[
                        "flex size-10 shrink-0 items-center justify-center rounded-[0.85rem]",
                        item.tone === "red"
                          ? "bg-[#ffe0e7] text-[#f43f5e]"
                          : item.tone === "amber"
                            ? "bg-[#fff1cf] text-[#d97706]"
                            : "bg-[#eaf1fb] text-[#315fda]",
                      ].join(" ")}
                    >
                      {item.tone === "red" ? (
                        <ShieldAlert className="size-4" />
                      ) : (
                        <FileText className="size-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[0.74rem] uppercase tracking-[0.08em] text-[#7b8da5]">
                        <span>{item.type}</span>
                        <Badge className="rounded-full bg-[#eef3fb] px-2.5 py-0.5 text-[#64748b] hover:bg-[#eef3fb]">
                          {item.tag}
                        </Badge>
                        {item.tone === "red" ? (
                          <Badge className="rounded-full bg-[#ffe0e7] px-2.5 py-0.5 text-[#ef4444] hover:bg-[#ffe0e7]">
                            CRITICAL
                          </Badge>
                        ) : item.tone === "amber" ? (
                          <Badge className="rounded-full bg-[#fff1cf] px-2.5 py-0.5 text-[#d97706] hover:bg-[#fff1cf]">
                            WARN
                          </Badge>
                        ) : null}
                      </div>

                      <p className="mt-1 text-[0.96rem] font-semibold text-[#0a2e5c]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[0.76rem] text-[#7b8da5]">
                        {item.target}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="rounded-full text-[#0a2e5c] hover:bg-[#edf3fb]"
                    >
                      <Eye className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2 text-[0.88rem] text-[#7b8da5]">
                <span>Hiển thị 10/74.400 events</span>
                <Button
                  variant="outline"
                  className="h-9 rounded-[0.85rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] hover:bg-[#f8fbff]"
                >
                  Tải thêm
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-[#f3f1e8] shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
            <CardContent className="px-4 py-4 sm:px-5">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 size-5 text-[#0a2e5c]" />
                <div className="space-y-2">
                  <p className="font-semibold text-[#0a2e5c]">
                    Immutable audit với NDACchain:
                  </p>
                  <p className="text-[0.92rem] leading-6 text-[#315f9e]">
                    Tất cả events được ghi vào blockchain NDACchain quốc gia ·
                    Không thể sửa đổi · Xác thực tính toàn vẹn bằng Merkle tree
                    root hash · Lưu trữ 7 năm theo Nghị định 13/2023 · Sẵn sàng
                    cung cấp cho thanh tra, kiểm toán theo yêu cầu pháp luật.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-[#7b8da5]">
                    <span>Last Merkle root:</span>
                    <Badge className="rounded-full bg-white px-2.5 py-0.5 text-[#0a2e5c] hover:bg-white">
                      0v4f8a2h
                    </Badge>
                    <Badge className="rounded-full bg-white px-2.5 py-0.5 text-[#0a2e5c] hover:bg-white">
                      9c3c1f
                    </Badge>
                    <span>(block #2.842.118)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
