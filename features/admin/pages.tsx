import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  CheckCircle2,
  CircleAlert,
  Database,
  Download,
  ExternalLink,
  Globe2,
  Layers3,
  ListChecks,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  adminComplianceStats,
  adminFieldDistribution,
  adminFootprintStats,
  adminMetrics,
  adminPendingAccounts,
  adminSectionMeta,
  adminSectionSnapshots,
  adminSecurityAlerts,
  adminSystemHealth,
  adminTransactionStats,
  adminVolumeStats,
} from "@/features/admin/data";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function AdminDashboardPage() {
  const metricIconClassNames = [
    "bg-[#f8f1df] text-[#c58b00]",
    "bg-[#edf4ff] text-[#1d4ed8]",
    "bg-[#e9f8f1] text-[#047857]",
    "bg-[#edf4ff] text-[#1d4ed8]",
  ] as const;

  const distributionBarClassNames = [
    "bg-[#3b82f6]",
    "bg-[#10b981]",
    "bg-[#f59e0b]",
    "bg-[#ff1f67]",
    "bg-[#06b6d4]",
    "bg-[#8b5cf6]",
  ] as const;

  const alertToneClassNames = [
    "bg-[#fff7e8] text-[#b45309]",
    "bg-[#fff1f3] text-[#be123c]",
    "bg-[#eef5ff] text-[#1d4ed8]",
  ] as const;

  const complianceToneClassNames = [
    "bg-[#dcfce7] text-[#059669]",
    "bg-[#dcfce7] text-[#059669]",
    "bg-[#dcfce7] text-[#059669]",
    "bg-[#fef3c7] text-[#b45309]",
    "bg-[#fef3c7] text-[#b45309]",
  ] as const;

  const footprintCardClassNames = [
    "bg-[#163b6d] text-white",
    "bg-[#059669] text-white",
    "bg-[#2554ea] text-white",
    "bg-[#d4a017] text-white",
  ] as const;

  const footprintIcons = [Building2, Database, Users, Globe2] as const;

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-3 rounded-[1.35rem] bg-[#edf3fa] px-3 py-4 sm:px-4 sm:py-4.5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2.3rem] sm:leading-[1.06]">
              Trung tâm điều hành — Sàn Dữ liệu Quốc gia
            </h1>
            <p className="text-[0.9rem] text-[#607694] sm:text-[0.92rem]">
              Tổng quan vận hành hệ thống · Cập nhật real-time · Cán bộ: Lê Minh Khoa
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Badge className="rounded-full border border-[#bde8cb] bg-[#dff7e8] px-3 py-1 text-xs font-medium text-[#047857] hover:bg-[#dff7e8]">
              <Activity className="mr-2 size-3.5" />
              Hệ thống ổn định · 99,98%
            </Badge>
            <Button
              variant="outline"
              className="h-10 rounded-[1.1rem] border-[#d9e0e7] bg-white px-3.5 text-sm text-[#0b2e5c] hover:bg-white"
            >
              <Download className="mr-2 size-3.5" />
              Xuất báo cáo ngày
            </Button>
          </div>
        </div>

        <section className="grid gap-2.5 xl:grid-cols-4">
          {adminMetrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="rounded-[1.15rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
                <CardHeader className="gap-2.5 px-4 py-4 pb-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <CardDescription className="text-[0.9rem] text-[#5f7390]">
                      {metric.label}
                    </CardDescription>
                    <div
                      className={`flex size-10 items-center justify-center rounded-[0.95rem] ${metricIconClassNames[index]}`}
                    >
                      <Icon className="size-4.5" />
                    </div>
                  </div>
                  <CardTitle className="text-[1.55rem] leading-none tracking-tight text-[#0b2e5c] sm:text-[1.75rem]">
                    {metric.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2 px-4 pb-4 pt-0">
                  <Badge className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-medium text-[#059669] hover:bg-[#dcfce7]">
                    {metric.delta}
                  </Badge>
                  <p className="text-[0.9rem] text-[#5f7390]">{metric.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </section>

      <section className="grid gap-2.5 xl:grid-cols-[1.15fr_0.55fr]">
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="px-4 py-4 pb-2.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-[1.22rem] tracking-tight text-[#0b2e5c] sm:text-[1.3rem]">
                  Lưu lượng giao dịch 30 ngày
                </CardTitle>
                <CardDescription className="mt-1 text-[0.92rem] text-[#607694]">
                  Toàn bộ giao dịch mua bán và khai thác API trên sàn
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-1">
                {adminTransactionStats.map((item, index) => (
                  <Badge
                    key={item.label}
                    className={
                      index === 0
                        ? "rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs text-[#1d4ed8] hover:bg-[#dbeafe]"
                        : index === 1
                          ? "rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs text-[#b45309] hover:bg-[#fef3c7]"
                          : "rounded-full bg-[#e8f0ff] px-2.5 py-0.5 text-xs text-[#1e3a8a] hover:bg-[#e8f0ff]"
                    }
                  >
                    {item.label}: {item.value}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 px-4 pb-4 pt-0 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {adminVolumeStats.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[0.92rem] text-[#607694]">{item.label}</p>
                    <p className="text-[1.7rem] leading-none font-semibold tracking-tight text-[#0b2e5c] sm:text-[1.9rem]">
                      {item.value}
                    </p>
                    <p className="text-[0.92rem] text-[#059669]">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="h-18 rounded-[1rem] bg-[radial-gradient(circle_at_bottom,#f8edd1_0%,rgba(248,237,209,0.2)_35%,transparent_70%)] px-6 pt-4">
                <svg viewBox="0 0 320 80" className="h-full w-full">
                  <path
                    d="M10 62 C22 67, 26 48, 38 54 S58 45, 70 50 S90 38, 102 45 S122 30, 134 37 S154 24, 166 31 S186 18, 198 24 S218 10, 230 17 S250 2, 262 8 S282 -2, 310 -12"
                    fill="none"
                    stroke="#d4a017"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="rounded-[1.1rem] bg-white">
              <div className="mb-3">
                <CardTitle className="text-[1.22rem] tracking-tight text-[#0b2e5c] sm:text-[1.3rem]">
                  Phân bố theo lĩnh vực
                </CardTitle>
                <CardDescription className="mt-1 text-[0.92rem] text-[#607694]">
                  18 lĩnh vực · 662 chỉ tiêu
                </CardDescription>
              </div>
              <div className="grid gap-2.5">
                {adminFieldDistribution.map(([label, value], index) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[0.88rem] text-[#0b2e5c]">
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                    <div className="h-2 rounded-full bg-[#e9eff6]">
                      <div
                        className={`h-2 rounded-full ${distributionBarClassNames[index]}`}
                        style={{
                          width: `${Math.max(35, (Number(value) / 124) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="px-4 py-4 pb-2.5">
            <CardTitle className="flex items-center gap-3 text-[1.22rem] tracking-tight text-[#0b2e5c] sm:text-[1.3rem]">
              <Database className="size-6" />
              Tình trạng hệ thống
            </CardTitle>
            <CardDescription className="text-lg text-[#607694]">
              Giám sát tầng hạ tầng, nghiệp vụ và liên thông bên ngoài
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5 px-5 pb-5 pt-0 md:grid-cols-2 xl:grid-cols-4">
            {adminSystemHealth.map(([label, score, detail], index) => {
              const isWarning = index === 3;

              return (
                <div
                  key={label}
                  className="rounded-[1.2rem] border border-[#d9e0e7] bg-white px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.95rem] font-medium text-[#0b2e5c]">{label}</p>
                    {isWarning ? (
                      <CircleAlert className="size-4.5 text-[#f59e0b]" />
                    ) : (
                      <ShieldCheck className="size-4.5 text-[#10b981]" />
                    )}
                  </div>
                  <p className="mt-4 text-[1.7rem] leading-none font-semibold tracking-tight text-[#0b2e5c] sm:text-[1.9rem]">
                    {score}
                  </p>
                  <p className="mt-2 text-sm text-[#607694]">{detail}</p>
                  <div className="mt-3 h-2 rounded-full bg-[#eaf1f7]">
                    <div
                      className={`h-2 rounded-full ${isWarning ? "bg-[#f59e0b]" : "bg-[#10b981]"}`}
                      style={{ width: `${Math.max(70, Number.parseFloat(score) || 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-2.5 xl:grid-cols-[1.05fr_0.5fr]">
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="flex flex-row items-start justify-between gap-2.5 px-4 py-4 pb-2.5">
            <div>
              <CardTitle className="flex items-center gap-3 text-[1.22rem] tracking-tight text-[#0b2e5c] sm:text-[1.3rem]">
                <Users className="size-6" />
                Tài khoản chờ duyệt (24)
              </CardTitle>
              <CardDescription className="text-lg text-[#607694]">
                Hồ sơ doanh nghiệp và cá nhân chờ xác minh qua DMDC
              </CardDescription>
            </div>
            <Button asChild variant="ghost" className="rounded-full px-0 text-[#0b2e5c] hover:bg-transparent">
              <Link href="/admin/accounts">
                Xem tất cả
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-2.5 px-5 pb-5 pt-0">
            {adminPendingAccounts.map((item) => (
              <div key={item.name} className="rounded-[1.2rem] border border-[#e5ebf1] px-4 py-3.5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-[1rem] bg-[#edf4fb] text-[#163b6d]">
                      <Building2 className="size-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-[0.98rem] font-semibold text-[#0b2e5c]">
                          {item.name}
                        </p>
                        {item.priority ? (
                          <Badge className="rounded-full bg-[#ffe2e7] px-2.5 py-0.5 text-xs text-[#e11d48] hover:bg-[#ffe2e7]">
                            {item.priority}
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-[#607694]">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:ml-4">
                    <span className="text-sm text-[#607694]">{item.time}</span>
                    <Button variant="outline" className="h-10 rounded-xl border-[#d9e0e7] px-4 text-[#0b2e5c]">
                      Xem
                    </Button>
                    <Button className="h-10 rounded-xl bg-[#10b981] px-4 text-white hover:bg-[#10b981]">
                      Duyệt
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
            <CardHeader className="px-4 py-4 pb-2.5">
              <CardTitle className="flex items-center gap-3 text-[1.22rem] tracking-tight text-[#0b2e5c] sm:text-[1.3rem]">
                <ShieldAlert className="size-6 text-[#f59e0b]" />
                Cảnh báo bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2.5 px-5 pb-5 pt-0">
              {adminSecurityAlerts.map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-[1.1rem] px-4 py-3.5 ${alertToneClassNames[index]}`}
                >
                  <p className="text-[0.98rem] font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm opacity-90">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
            <CardHeader className="px-4 py-4 pb-2.5">
              <CardTitle className="flex items-center gap-3 text-[1.22rem] tracking-tight text-[#0b2e5c] sm:text-[1.3rem]">
                <Shield className="size-6" />
                Tuân thủ pháp luật
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2.5 px-5 pb-5 pt-0">
              {adminComplianceStats.map(([label, value], index) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <span className="text-[0.92rem] text-[#607694]">{label}</span>
                  <Badge className={`rounded-full px-2.5 py-0.5 text-xs hover:bg-current/0 ${complianceToneClassNames[index]}`}>
                    {value}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-2.5 lg:grid-cols-4">
        {adminFootprintStats.map(([value, label, detail], index) => {
          const Icon = footprintIcons[index];

          return (
            <Card
              key={label}
              className={`rounded-[1.2rem] border-0 shadow-sm ring-0 ${footprintCardClassNames[index]}`}
            >
              <CardContent className="p-5">
                <div className="mb-6 flex items-start justify-between">
                  <Icon className="size-7 opacity-95" />
                  <ExternalLink className="size-4 opacity-80" />
                </div>
                <p className="text-[2.15rem] leading-none font-semibold tracking-tight">{value}</p>
                <p className="mt-3 text-[1.12rem] leading-tight font-medium">{label}</p>
                <p className="mt-1.5 text-sm text-white/78">{detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

export function AdminPlaceholderPage({
  section,
}: {
  section: keyof typeof adminSectionMeta;
}) {
  const meta = adminSectionMeta[section];
  const snapshot = adminSectionSnapshots[section];
  const toneClassName =
    snapshot.statusTone === "emerald"
      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      : snapshot.statusTone === "amber"
        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
        : "bg-blue-100 text-blue-700 hover:bg-blue-100";

  return (
    <div className="flex flex-col gap-5">
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#d9e0e7] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_100%)] ring-0">
          <CardHeader>
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
              Admin portal
            </p>
            <CardTitle className="text-3xl tracking-tight text-[#0f172a]">
              {meta.title}
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
              {meta.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="rounded-full px-5">
              <CheckCircle2 className="mr-2 size-4" />
              Mở bảng thao tác
            </Button>
            <Button variant="outline" className="rounded-full px-5">
              <ArrowRight className="mr-2 size-4" />
              Xem luồng liên quan
            </Button>
            <Badge className={`rounded-full px-4 py-1 text-xs ${toneClassName}`}>
              {snapshot.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-[#d9e0e7] bg-[#0b1524] text-white ring-0">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-[#d8c79a]/14 text-[#f4dfab] hover:bg-[#d8c79a]/14">
              {snapshot.accent}
            </Badge>
            <CardTitle className="text-2xl text-white">
              Khối nghiệp vụ cho {meta.title.toLowerCase()}
            </CardTitle>
            <CardDescription className="text-slate-300">
              Dữ liệu hiển thị được tách riêng theo từng route admin thay vì dùng một placeholder lặp lại cho tất cả các trang con.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5">
            {snapshot.highlights.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#0f172a]">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.metrics.map((item) => (
          <Card key={item.label} className="border-[#d9e0e7] bg-white ring-0">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-[#0f172a]">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#d9e0e7] bg-white ring-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-[#0f172a]">
              <ListChecks className="size-4" />
              Hàng đợi xử lý
            </CardTitle>
            <CardDescription>
              Các mục công việc ưu tiên cho route {meta.title.toLowerCase()}.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5">
            {snapshot.workQueue.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#e5ebf1] bg-[#fbfcfd] px-4 py-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium text-[#0f172a]">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.meta}</p>
                  </div>
                  <Badge variant="outline" className="w-fit rounded-full border-slate-200 bg-white">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="rounded-full">
              Mở danh sách đầy đủ
            </Button>
          </CardFooter>
        </Card>

        <div className="grid gap-4">
          <Card className="border-[#d9e0e7] bg-white ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-[#0f172a]">
                <Layers3 className="size-4" />
                Điểm nóng vận hành
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2.5">
              {snapshot.highlights.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#f4f7fa] px-4 py-4">
                  <p className="font-medium text-[#0f172a]">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#d9e0e7] bg-white ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-[#0f172a]">
                <Shield className="size-4" />
                Checklist cấu hình
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2.5">
              {snapshot.checklist.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-[#f4f7fa] px-4 py-3"
                >
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <strong className="text-sm text-[#0f172a]">{item.value}</strong>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#d9e0e7] bg-white ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-[#0f172a]">
                <BellRing className="size-4" />
                Cần lưu ý
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2.5">
              {[
                `Route ${meta.title} hiện đã có nội dung riêng theo section thay vì dùng placeholder lặp.`,
                "Khối UI đã tách theo loại dữ liệu để dễ nối API thật ở bước sau.",
                "Organizations và Posts vẫn giữ nguyên luồng riêng, không bị chạm vào.",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-[#f4f7fa] px-4 py-4 text-sm text-slate-600">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
