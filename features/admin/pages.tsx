import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  Check,
  CheckCircle2,
  Circle,
  CircleAlert,
  Cpu,
  Database,
  Download,
  Factory,
  ExternalLink,
  Eye,
  FileText,
  Globe2,
  HandCoins,
  HeartPulse,
  Landmark,
  Layers3,
  ListChecks,
  Pencil,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  TriangleAlert,
  Users,
  Wallet,
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
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";

export function AdminDashboardPage() {
  const metricIconClassNames = [
    "bg-[#f8f1df] text-[#c58b00]",
    "bg-[#edf4ff] text-[#1d4ed8]",
    "bg-[#e9f8f1] text-[#047857]",
    "bg-[#edf4ff] text-[#1d4ed8]",
  ] as const;

  const distributionBarClassNames = [
    "[&>[data-slot=progress-indicator]]:bg-[#3b82f6]",
    "[&>[data-slot=progress-indicator]]:bg-[#10b981]",
    "[&>[data-slot=progress-indicator]]:bg-[#f59e0b]",
    "[&>[data-slot=progress-indicator]]:bg-[#ff1f67]",
    "[&>[data-slot=progress-indicator]]:bg-[#06b6d4]",
    "[&>[data-slot=progress-indicator]]:bg-[#8b5cf6]",
  ] as const;

  const alertToneClassNames = [
    "bg-[#fff7e8] text-[#b45309]",
    "bg-[#fff1f3] text-[#be123c]",
    "bg-[#eef5ff] text-[#1d4ed8]",
  ] as const;
  const securityAlertIcons = [TriangleAlert, ShieldAlert, Siren] as const;

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
              Tổng quan vận hành hệ thống · Cập nhật real-time · Cán bộ: Lê Minh
              Khoa
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
              <Card
                key={metric.label}
                className="rounded-[1.15rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
              >
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
                  <p className="text-[0.9rem] text-[#5f7390]">
                    {metric.detail}
                  </p>
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
                    <p className="text-[0.92rem] text-[#607694]">
                      {item.label}
                    </p>
                    <p className="text-[1.7rem] leading-none font-semibold tracking-tight text-[#0b2e5c] sm:text-[1.9rem]">
                      {item.value}
                    </p>
                    <p className="text-[0.92rem] text-[#059669]">
                      {item.detail}
                    </p>
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
                    <Progress
                      value={Math.max(35, (Number(value) / 124) * 100)}
                      className={cn(
                        "h-2 rounded-full bg-[#e9eff6]",
                        distributionBarClassNames[index]
                      )}
                    />
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
                    <p className="text-[0.95rem] font-medium text-[#0b2e5c]">
                      {label}
                    </p>
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
                  <Progress
                    value={Math.max(70, Number.parseFloat(score) || 100)}
                    className={cn(
                      "mt-3 h-2 rounded-full bg-[#eaf1f7]",
                      isWarning
                        ? "[&>[data-slot=progress-indicator]]:bg-[#f59e0b]"
                        : "[&>[data-slot=progress-indicator]]:bg-[#10b981]"
                    )}
                  />
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
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-0 text-[#0b2e5c] hover:bg-transparent"
            >
              <Link href="/admin/accounts">
                Xem tất cả
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-2.5 px-5 pb-5 pt-0">
            {adminPendingAccounts.map((item) => (
              <div
                key={item.name}
                className="rounded-[1.2rem] border border-[#e5ebf1] px-4 py-3.5"
              >
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
                      <p className="mt-1 text-sm text-[#607694]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:ml-4">
                    <span className="text-sm text-[#607694]">{item.time}</span>
                    <Button
                      variant="outline"
                      className="h-10 rounded-xl border-[#d9e0e7] px-4 text-[#0b2e5c]"
                    >
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
              {adminSecurityAlerts.map((item, index) => {
                const Icon = securityAlertIcons[index];

                return (
                  <Alert
                    key={item.title}
                    className={cn(
                      "rounded-[1.1rem] border-0 px-4 py-3.5 [&>svg]:top-4 [&>svg~*]:pl-8",
                      alertToneClassNames[index]
                    )}
                  >
                    <Icon className="size-4.5" />
                    <AlertTitle className="text-[0.98rem] font-semibold">
                      {item.title}
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-sm opacity-90">
                      {item.detail}
                    </AlertDescription>
                  </Alert>
                );
              })}
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
                <div
                  key={label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-[0.92rem] text-[#607694]">{label}</span>
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs hover:bg-current/0 ${complianceToneClassNames[index]}`}
                  >
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
                <p className="text-[2.15rem] leading-none font-semibold tracking-tight">
                  {value}
                </p>
                <p className="mt-3 text-[1.12rem] leading-tight font-medium">
                  {label}
                </p>
                <p className="mt-1.5 text-sm text-white/78">{detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

export function AdminMonitoringPage() {
  const statCards = [
    {
      label: "Uptime toàn hệ thống",
      value: "99,98%",
      tone: "bg-[#e6f8f0] text-[#059669]",
      icon: Activity,
    },
    {
      label: "Request / giây",
      value: "8.420",
      detail: "+12.4%",
      detailLabel: "peak",
      tone: "bg-[#edf4ff] text-[#2554ea]",
      icon: Plus,
    },
    {
      label: "Độ trễ p95",
      value: "124ms",
      detail: "-8.2%",
      tone: "bg-[#f8f1df] text-[#c58b00]",
      icon: Circle,
    },
    {
      label: "Cảnh báo đang mở",
      value: "3",
      tone: "bg-[#fff6e8] text-[#d97706]",
      icon: TriangleAlert,
    },
  ] as const;

  const clusterStats = [
    {
      name: "API Gateway Cluster (12 nodes)",
      cpu: 42,
      ram: 58,
      ramTone: "bg-[#3b82f6]",
    },
    {
      name: "Business Logic (16 nodes)",
      cpu: 64,
      ram: 72,
      ramTone: "bg-[#3b82f6]",
    },
    { name: "Data Layer (8 nodes)", cpu: 38, ram: 81, ramTone: "bg-[#f59e0b]" },
    {
      name: "Search & Index (6 nodes)",
      cpu: 52,
      ram: 45,
      ramTone: "bg-[#3b82f6]",
    },
  ] as const;

  const microservices = [
    ["api-gateway", "healthy · 99.86%", "ok"],
    ["auth-svc", "healthy · 99.22%", "ok"],
    ["vneid-connector", "healthy · 99.36%", "ok"],
    ["company-svc", "healthy · 99.88%", "ok"],
    ["tax-svc", "healthy · 99.76%", "ok"],
    ["bhxh-svc", "healthy · 99.48%", "ok"],
    ["auction-svc", "healthy · 99.84%", "ok"],
    ["payment-gw", "degraded · 99.25%", "warn"],
    ["consent-svc", "healthy · 99.49%", "ok"],
    ["audit-svc", "healthy · 99.96%", "ok"],
    ["notification", "healthy · 99.14%", "ok"],
    ["pii-detector", "degraded · 99.49%", "warn"],
    ["clean-room", "healthy · 99.74%", "ok"],
    ["quality-svc", "healthy · 99.30%", "ok"],
    ["pricing-svc", "healthy · 99.19%", "ok"],
    ["search-svc", "healthy · 99.92%", "ok"],
    ["catalog-svc", "healthy · 99.75%", "ok"],
    ["dmdc-sync", "healthy · 99.06%", "ok"],
    ["report-svc", "healthy · 99.48%", "ok"],
    ["analytics", "healthy · 99.49%", "ok"],
    ["webhook-svc", "healthy · 99.12%", "ok"],
    ["cdn-edge", "healthy · 99.60%", "ok"],
    ["ml-recommend", "healthy · 99.34%", "ok"],
    ["backup-svc", "healthy · 99.40%", "ok"],
  ] as const;

  const logs = [
    [
      "14:32:18",
      "INFO",
      "api-gateway",
      "POST /v1/vneid/verify 200 OK · 98ms · user=fintech",
    ],
    [
      "14:32:17",
      "WARN",
      "rate-limiter",
      "Threshold 80% on DV-TCKT-001 for client=vib-bank",
    ],
    [
      "14:32:15",
      "INFO",
      "consent-svc",
      "Consent receipt CR-2026-04-0124 issued",
    ],
    [
      "14:32:12",
      "INFO",
      "dmdc-sync",
      "Incremental sync completed · 842 records",
    ],
    [
      "14:32:08",
      "ERROR",
      "payment-gw",
      "Connection timeout to VNPay (retry 2/3)",
    ],
    [
      "14:32:05",
      "INFO",
      "api-gateway",
      "GET /v1/company/0108234567 200 OK · 142ms",
    ],
    [
      "14:32:01",
      "WARN",
      "pii-detector",
      "Potential PII in SP-TC-042 dataset sample",
    ],
    ["14:31:58", "INFO", "auction-svc", "New bid 1.24B VNĐ on AUC-2026-0412"],
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-4 rounded-[1.35rem] bg-[#edf3fa] px-3 py-4 sm:px-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-[2.2rem] font-semibold tracking-tight text-[#0b2e5c]">
              Giám sát hệ thống
            </h1>
            <p className="mt-1 text-[0.98rem] text-[#607694]">
              Thời gian thực monitoring toàn bộ hạ tầng · Grafana + Prometheus +
              ELK stack
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full border border-[#bde8cb] bg-[#dff7e8] px-4 py-1 text-sm text-[#047857] hover:bg-[#dff7e8]">
              <Activity className="mr-2 size-4" />
              Tất cả hệ thống ổn định
            </Badge>
            <Button
              variant="outline"
              className="h-10 rounded-[1rem] border-[#d9e0e7] bg-white px-4 text-[#0b2e5c]"
            >
              Cấu hình cảnh báo
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.95rem] text-[#607694]">
                      {item.label}
                    </p>
                    <div
                      className={`flex size-14 items-center justify-center rounded-[1rem] ${item.tone}`}
                    >
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <p className="mt-3 text-[2.1rem] font-semibold tracking-tight text-[#0b2e5c]">
                    {item.value}
                  </p>
                  {item.detail ? (
                    <div className="mt-4 flex items-center gap-2">
                      <Badge className="rounded-full bg-[#e6f8f0] px-2 py-0.5 text-sm text-[#059669] hover:bg-[#e6f8f0]">
                        {item.detail}
                      </Badge>
                      {item.detailLabel ? (
                        <span className="text-sm text-[#607694]">
                          {item.detailLabel}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[1.2rem] text-[#0b2e5c]">
              <Cpu className="size-5" />
              CPU & Memory toàn cluster
            </CardTitle>
            <CardDescription className="text-lg text-[#607694]">
              42 nodes · Kubernetes
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {clusterStats.map((item) => (
              <div key={item.name} className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.98rem] font-medium text-[#0b2e5c]">
                    {item.name}
                  </span>
                  <span className="text-[0.98rem] text-[#607694]">
                    CPU {item.cpu}% · RAM {item.ram}%
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="h-3 rounded-full bg-[#e8eef6]">
                    <div
                      className="h-3 rounded-full bg-[#10b981]"
                      style={{ width: `${item.cpu}%` }}
                    />
                  </div>
                  <div className="h-3 rounded-full bg-[#e8eef6]">
                    <div
                      className={`h-3 rounded-full ${item.ramTone}`}
                      style={{ width: `${item.ram}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[1.2rem] text-[#0b2e5c]">
              <Activity className="size-5" />
              Throughput (req/s)
            </CardTitle>
            <CardDescription className="text-lg text-[#607694]">
              30 phút gần nhất · Thời gian thực
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <p className="text-[2.2rem] font-semibold tracking-tight text-[#0b2e5c]">
                  8.420 req/s
                </p>
                <p className="text-lg text-[#059669]">
                  Peak hôm nay: 12.450 req/s
                </p>
              </div>
              <div className="h-20 rounded-[1rem] bg-[linear-gradient(180deg,#ffffff_0%,#f4f7fb_100%)] px-6 pt-4">
                <svg viewBox="0 0 300 80" className="h-full w-full">
                  <path
                    d="M12 58 L42 38 L58 45 L82 28 L98 34 L126 16 L142 22 L160 10 L178 18 L198 6 L214 14 L234 2 L252 12 L276 8"
                    fill="none"
                    stroke="#163b6d"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-[0.95rem] text-[#607694]">Ingress</p>
                  <p className="text-[1.45rem] font-semibold text-[#0b2e5c]">
                    4,2 Gbps
                  </p>
                </div>
                <div>
                  <p className="text-[0.95rem] text-[#607694]">Egress</p>
                  <p className="text-[1.45rem] font-semibold text-[#0b2e5c]">
                    3,8 Gbps
                  </p>
                </div>
                <div>
                  <p className="text-[0.95rem] text-[#607694]">
                    Active connections
                  </p>
                  <p className="text-[1.45rem] font-semibold text-[#0b2e5c]">
                    24.840
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-[1.2rem] text-[#0b2e5c]">
            <Database className="size-5" />
            Dịch vụ microservices (24)
          </CardTitle>
          <CardDescription className="text-lg text-[#607694]">
            Trạng thái health-check real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          {microservices.map(([name, detail, status]) => (
            <div
              key={name}
              className={cn(
                "rounded-[1rem] border px-4 py-3",
                status === "warn"
                  ? "border-[#f7e4b5] bg-[#fff9e8]"
                  : "border-[#dbe4ef] bg-white"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[0.96rem] font-semibold text-[#0b2e5c]">
                  {name}
                </p>
                {status === "warn" ? (
                  <TriangleAlert className="size-4 text-[#f59e0b]" />
                ) : (
                  <Check className="size-4 text-[#10b981]" />
                )}
              </div>
              <p className="mt-2 text-sm text-[#607694]">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3">
          <div>
            <CardTitle className="flex items-center gap-3 text-[1.2rem] text-[#0b2e5c]">
              <FileText className="size-5" />
              Log tập trung (live tail)
            </CardTitle>
            <CardDescription className="text-lg text-[#607694]">
              ELK stack · Stream từ tất cả 24 microservices
            </CardDescription>
          </div>
          <Badge className="rounded-full border border-[#bde8cb] bg-[#dff7e8] px-3 py-1 text-sm text-[#047857] hover:bg-[#dff7e8]">
            LIVE
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-[1.2rem] bg-[#071427] px-4 py-4 font-mono text-sm">
            {logs.map(([time, level, service, message]) => (
              <div
                key={`${time}-${service}`}
                className="flex flex-wrap gap-x-4 gap-y-1 border-b border-white/10 py-2 text-[#dbe7ff] last:border-b-0"
              >
                <span className="text-[#8ea7c7]">{time}</span>
                <span
                  className={cn(
                    "font-semibold",
                    level === "ERROR"
                      ? "text-[#ff5a67]"
                      : level === "WARN"
                        ? "text-[#fbbf24]"
                        : "text-[#00e5a8]"
                  )}
                >
                  [{level}]
                </span>
                <span className="text-[#ffd84d]">{service}</span>
                <span>{message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminNotificationsPage() {
  const stats = [
    ["Chưa đọc", "6", BellRing, "bg-[#fff7e8] text-[#d97706]"],
    ["Critical", "3", Siren, "bg-[#fff1f3] text-[#e11d48]"],
    [
      "Cần phản hồi trong 24h",
      "8",
      CheckCircle2,
      "bg-[#e6f8f0] text-[#059669]",
    ],
    ["Tổng tháng này", "2.840", Activity, "bg-[#edf4ff] text-[#163b6d]"],
  ] as const;

  const categories = [
    ["Tất cả", "10", true],
    ["Chưa đọc", "6", false],
    ["Quan trọng", "5", false],
    ["Duyệt tài khoản", "1", false],
    ["PII & Bảo mật", "2", false],
    ["Khiếu nại", "1", false],
    ["Thẩm định", "1", false],
    ["Đấu giá", "1", false],
    ["Transactions", "1", false],
    ["Hệ thống", "3", false],
  ] as const;

  const notifications = [
    [
      "6 tài khoản Ưu tiên cao đang chờ duyệt",
      "Bao gồm NH TMCP Quốc tế VIB, Viện Nghiên cứu Kinh tế TW, CTCP FinTech Việt. Đã có xác minh DMDC.",
      "Quan trọng",
      "5 phút trước",
      "approval",
    ],
    [
      "CRITICAL: Phát hiện PII chưa mask trong SP-TC-042",
      "CTCP DL Tài chính upload sản phẩm có 2 field CCCD chưa hash. Cần xử lý ngay để tuân thủ NĐ 13/2023.",
      "Quan trọng",
      "15 phút trước",
      "security",
    ],
    [
      "Khiếu nại mới KN-2026-04-0148 cần mediator",
      "VCB khiếu nại CTCP DL Tài chính về chất lượng dữ liệu SP-TC-001. Giá trị tranh chấp 48M. Hạn phản hồi 48h.",
      "Quan trọng",
      "1 giờ trước",
      "warning",
    ],
    [
      "3 hồ sơ thẩm định chờ vote cuối",
      "TD-2026-04-0842, TD-2026-04-0836, TD-2026-04-0828. Bạn là thẩm định viên cuối chưa vote.",
      "",
      "2 giờ trước",
      "review",
    ],
    [
      "Phiên đấu giá AUC-2026-0412 sắp kết thúc (còn 2h)",
      "Giá hiện tại 2,15 tỷ (+148% khởi điểm). 8 bidders đang tích cực đặt. Monitoring cần chú ý.",
      "",
      "2 giờ trước",
      "auction",
    ],
    [
      "10 lần đăng nhập thất bại từ IP Nga",
      "203.x.x.x đã bị WAF block 24h. Không có thành công. Kiểm tra để đảm bảo không phải brute force có mục đích.",
      "Quan trọng",
      "3 giờ trước",
      "security",
    ],
    [
      "Payment Gateway degraded (98,45% uptime)",
      "VNPay connection timeout 4 lần trong giờ qua. Rate hiện tại vẫn OK nhưng cần theo dõi.",
      "",
      "4 giờ trước",
      "ops",
    ],
    [
      "Dataset BỘ-YT-02 đang build (đã 45 phút)",
      "Tiến trình 62% · ETL pipeline cho 82M records tiêm chủng. Dự kiến hoàn tất trong 30 phút nữa.",
      "",
      "5 giờ trước",
      "dataset",
    ],
    [
      "Giao dịch lớn 2,4 tỷ VNĐ flagged",
      "ORD-2026-04-12840 giá trị cao bất thường. Đã tự động gắn flag để CB-SDL review.",
      "Quan trọng",
      "6 giờ trước",
      "money",
    ],
    [
      "Báo cáo CQNN tháng 3 đã gửi thành công",
      "8 báo cáo định kỳ đã gửi tới Bộ Công an, Bộ Tài chính, BHXH VN. Tất cả đã acknowledge.",
      "",
      "1 ngày trước",
      "report",
    ],
  ] as const;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
        return { icon: Users, tone: "bg-[#d97706] text-white" };
      case "security":
        return { icon: ShieldAlert, tone: "bg-[#e11d48] text-white" };
      case "warning":
        return { icon: CircleAlert, tone: "bg-[#ff7a00] text-white" };
      case "review":
        return { icon: CheckCircle2, tone: "bg-[#d4a017] text-white" };
      case "auction":
        return { icon: HandCoins, tone: "bg-[#2554ea] text-white" };
      case "ops":
        return { icon: Activity, tone: "bg-[#e68600] text-white" };
      case "dataset":
        return { icon: Database, tone: "bg-[#059669] text-white" };
      case "money":
        return { icon: Wallet, tone: "bg-[#d4a017] text-white" };
      default:
        return { icon: BellRing, tone: "bg-[#0b2e5c] text-white" };
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[1.35rem] bg-[#edf3fa] px-3 py-4 sm:px-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-[2.2rem] font-semibold tracking-tight text-[#0b2e5c]">
              Trung tâm thông báo CB-SDL
            </h1>
            <p className="mt-1 text-[0.98rem] text-[#607694]">
              Chờ phê duyệt · Chuyển cấp xử lý · Cảnh báo hệ thống · Cảnh báo
              tuân thủ
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="h-10 rounded-[1rem] border-[#d9e0e7] bg-white px-4 text-[#0b2e5c]"
            >
              <Check className="mr-2 size-4" />
              Đánh dấu tất cả đã đọc
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-[1rem] border-[#d9e0e7] bg-white px-4 text-[#0b2e5c]"
            >
              <Settings className="mr-2 size-4" />
              Cấu hình
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(([label, value, Icon, tone]) => (
            <Card
              key={label}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[0.95rem] text-[#607694]">{label}</p>
                  <div
                    className={`flex size-14 items-center justify-center rounded-[1rem] ${tone}`}
                  >
                    <Icon className="size-6" />
                  </div>
                </div>
                <p className="mt-3 text-[2.1rem] font-semibold tracking-tight text-[#0b2e5c]">
                  {value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.23fr_0.77fr]">
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardContent className="grid gap-4 p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#607694]" />
              <Input
                className="h-12 rounded-[1rem] border-[#d9e0e7] bg-white pl-11 text-[#0b2e5c]"
                placeholder="Tìm thông báo..."
              />
            </div>
            <div className="grid gap-2">
              {categories.map(([label, count, active]) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center justify-between rounded-[1rem] px-4 py-3 text-[0.98rem]",
                    active ? "bg-[#0b2e5c] text-white" : "text-[#0b2e5c]"
                  )}
                >
                  <span className={active ? "font-semibold" : ""}>{label}</span>
                  <Badge
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-sm",
                      active
                        ? "border-[#f1cf72]/40 bg-[#143564] text-[#f1cf72]"
                        : "border-[#d9e0e7] bg-[#f7f9fb] text-[#0b2e5c] hover:bg-[#f7f9fb]"
                    )}
                  >
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3">
          {notifications.map(([title, detail, tag, time, type]) => {
            const { icon: Icon, tone } = getNotificationIcon(type);

            return (
              <Card
                key={title}
                className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
              >
                <CardContent className="flex gap-4 p-4">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-[1rem] ${tone}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[1rem] font-semibold text-[#0b2e5c]">
                            {title}
                          </h3>
                          <span className="size-2 rounded-full bg-[#ff375f]" />
                          {tag ? (
                            <Badge className="rounded-full bg-[#ffe5ea] px-2.5 py-0.5 text-xs text-[#d61f45] hover:bg-[#ffe5ea]">
                              {tag}
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-8 text-[#607694]">
                          {detail}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-[#607694]">
                        {time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function AdminServiceGroupsPage() {
  const stats = [
    ["Tổng nhóm lĩnh vực", "18", "bg-[#edf4ff] text-[#2554ea]", Factory],
    ["Tổng dịch vụ", "662", "bg-[#edf4ff] text-[#2554ea]", Database],
    ["Tổng bộ dữ liệu", "77", "bg-[#e6f8f0] text-[#059669]", Layers3],
    ["CQNN cung cấp", "47", "bg-[#fff7e8] text-[#d4a017]", Building2],
  ] as const;

  const groups = [
    [
      "DC",
      "124 DV",
      "Dân cư",
      "18 datasets",
      "3 CQNN",
      "124",
      "124",
      "18",
      "Cập nhật 03/04/2026",
      Landmark,
      "bg-[#2554ea] text-white",
    ],
    [
      "DN",
      "98 DV",
      "Doanh nghiệp & Thuế",
      "12 datasets",
      "4 CQNN",
      "98",
      "98",
      "12",
      "Cập nhật 02/04/2026",
      Building2,
      "bg-[#10b981] text-white",
    ],
    [
      "TC",
      "76 DV",
      "Tài chính & Ngân hàng",
      "8 datasets",
      "5 CQNN",
      "76",
      "76",
      "8",
      "Cập nhật 01/04/2026",
      Activity,
      "bg-[#f59e0b] text-white",
    ],
    [
      "YT",
      "64 DV",
      "Y tế & BHXH",
      "6 datasets",
      "3 CQNN",
      "64",
      "64",
      "6",
      "Cập nhật 28/03/2026",
      HeartPulse,
      "bg-[#f43f5e] text-white",
    ],
    [
      "GT",
      "52 DV",
      "Giao thông & Du lịch",
      "5 datasets",
      "4 CQNN",
      "52",
      "52",
      "5",
      "Cập nhật 26/03/2026",
      Globe2,
      "bg-[#06b6d4] text-white",
    ],
    [
      "GD",
      "48 DV",
      "Giáo dục & Đào tạo",
      "4 datasets",
      "2 CQNN",
      "48",
      "48",
      "4",
      "Cập nhật 24/03/2026",
      ShieldCheck,
      "bg-[#7c3aed] text-white",
    ],
    [
      "XD",
      "41 DV",
      "Xây dựng & Đất đai",
      "4 datasets",
      "3 CQNN",
      "41",
      "41",
      "4",
      "Cập nhật 25/03/2026",
      Pencil,
      "bg-[#f97316] text-white",
    ],
    [
      "NL",
      "38 DV",
      "Công nghiệp & Năng lượng",
      "3 datasets",
      "3 CQNN",
      "38",
      "38",
      "3",
      "Cập nhật 20/03/2026",
      Factory,
      "bg-[#0d9488] text-white",
    ],
    [
      "NN",
      "32 DV",
      "Nông nghiệp & Môi trường",
      "3 datasets",
      "2 CQNN",
      "32",
      "32",
      "3",
      "Cập nhật 22/03/2026",
      Shield,
      "bg-[#84cc16] text-white",
    ],
    [
      "VH",
      "28 DV",
      "Văn hóa & Thể thao",
      "3 datasets",
      "2 CQNN",
      "28",
      "28",
      "3",
      "Cập nhật 18/03/2026",
      Users,
      "bg-[#db2777] text-white",
    ],
    [
      "TT",
      "24 DV",
      "Thông tin & Truyền thông",
      "2 datasets",
      "2 CQNN",
      "24",
      "24",
      "2",
      "Cập nhật 15/03/2026",
      Layers3,
      "bg-[#0ea5e9] text-white",
    ],
    [
      "LD",
      "22 DV",
      "Lao động & Xã hội",
      "2 datasets",
      "2 CQNN",
      "22",
      "22",
      "2",
      "Cập nhật 12/03/2026",
      Wallet,
      "bg-[#4f46e5] text-white",
    ],
    [
      "KT",
      "18 DV",
      "Kế hoạch & Đầu tư",
      "2 datasets",
      "1 CQNN",
      "18",
      "18",
      "2",
      "Cập nhật 10/03/2026",
      Activity,
      "bg-[#c026d3] text-white",
    ],
    [
      "NV",
      "16 DV",
      "Nội vụ & Tư pháp",
      "1 datasets",
      "2 CQNN",
      "16",
      "16",
      "1",
      "Cập nhật 08/03/2026",
      Globe2,
      "bg-[#64748b] text-white",
    ],
    [
      "NG",
      "10 DV",
      "Ngoại giao & Hợp tác QT",
      "1 datasets",
      "1 CQNN",
      "10",
      "10",
      "1",
      "Cập nhật 05/03/2026",
      ArrowRight,
      "bg-[#9333ea] text-white",
    ],
    [
      "QP",
      "8 DV",
      "Quốc phòng & An ninh",
      "1 datasets",
      "2 CQNN",
      "8",
      "8",
      "1",
      "Cập nhật 01/03/2026",
      Layers3,
      "bg-[#334155] text-white",
    ],
    [
      "KH",
      "12 DV",
      "Khoa học & Công nghệ",
      "1 datasets",
      "2 CQNN",
      "12",
      "12",
      "1",
      "Cập nhật 28/02/2026",
      Database,
      "bg-[#2b6cb0] text-white",
    ],
    [
      "MT",
      "11 DV",
      "Tài nguyên & Môi trường",
      "1 datasets",
      "2 CQNN",
      "11",
      "11",
      "1",
      "Cập nhật 25/02/2026",
      ShieldCheck,
      "bg-[#d18b00] text-white",
    ],
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[1.35rem] bg-[#edf3fa] px-3 py-4 sm:px-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-[2.2rem] font-semibold tracking-tight text-[#0b2e5c]">
              Quản lý nhóm dịch vụ
            </h1>
            <p className="mt-1 text-[0.98rem] text-[#607694]">
              18 lĩnh vực · Phân loại 662 chỉ tiêu thống kê quốc gia theo ngành
              nghề/lĩnh vực
            </p>
          </div>
          <Button className="h-10 rounded-[1rem] bg-[#0b2e5c] px-4 text-white hover:bg-[#0b2e5c]">
            <Plus className="mr-2 size-4" />
            Tạo nhóm mới
          </Button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(([label, value, tone, Icon]) => (
            <Card
              key={label}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[0.95rem] text-[#607694]">{label}</p>
                  <div
                    className={`flex size-14 items-center justify-center rounded-[1rem] ${tone}`}
                  >
                    <Icon className="size-6" />
                  </div>
                </div>
                <p className="mt-3 text-[2.1rem] font-semibold tracking-tight text-[#0b2e5c]">
                  {value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {groups.map(
          ([
            code,
            badge,
            title,
            datasetText,
            agencyText,
            services,
            indicators,
            datasets,
            updated,
            Icon,
            tone,
          ]) => (
            <Card
              key={title}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-18 shrink-0 items-center justify-center rounded-[1rem] ${tone}`}
                  >
                    <Icon className="size-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#607694]">{code}</span>
                      <Badge className="rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs text-[#1d4ed8] hover:bg-[#dbeafe]">
                        {badge}
                      </Badge>
                    </div>
                    <h3 className="mt-2 text-[1rem] font-semibold text-[#0b2e5c]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-[#607694]">
                      {datasetText} · {agencyText}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 rounded-[1rem] bg-[#eef4fa] px-4 py-3 text-center">
                  <div>
                    <p className="text-xs text-[#607694]">Dịch vụ</p>
                    <p className="mt-1 text-[1rem] font-semibold text-[#0b2e5c]">
                      {services}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#607694]">Chỉ tiêu</p>
                    <p className="mt-1 text-[1rem] font-semibold text-[#0b2e5c]">
                      {indicators}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#607694]">Datasets</p>
                    <p className="mt-1 text-[1rem] font-semibold text-[#0b2e5c]">
                      {datasets}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 text-sm text-[#607694]">
                  <span>{updated}</span>
                  <div className="flex items-center gap-4">
                    <Eye className="size-4 text-[#0b2e5c]" />
                    <Pencil className="size-4 text-[#0b2e5c]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </section>

      <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-[#eef4ff] shadow-sm ring-0">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Layers3 className="mt-0.5 size-5 shrink-0 text-[#2554ea]" />
            <div>
              <p className="text-[1rem] font-semibold text-[#2554ea]">
                Về quản lý nhóm dịch vụ:
              </p>
              <p className="mt-2 text-[0.98rem] leading-8 text-[#2554ea]">
                Cán bộ sàn quản lý danh mục nhóm dịch vụ dữ liệu · Phân loại
                theo lĩnh vực để bên mua tìm kiếm dễ dàng trên danh mục · Mỗi
                nhóm được đồng bộ với hệ thống DMDC và tham chiếu bởi danh mục
                dịch vụ và quy trình tạo dịch vụ. Mỗi nhóm có thể kích hoạt/vô
                hiệu hóa độc lập.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
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
            <Badge
              className={`rounded-full px-4 py-1 text-xs ${toneClassName}`}
            >
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
              Dữ liệu hiển thị được tách riêng theo từng route admin thay vì
              dùng một placeholder lặp lại cho tất cả các trang con.
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
                  <p className="text-sm leading-6 text-slate-300">
                    {item.detail}
                  </p>
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
                  <Badge
                    variant="outline"
                    className="w-fit rounded-full border-slate-200 bg-white"
                  >
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
                <div
                  key={item.title}
                  className="rounded-2xl bg-[#f4f7fa] px-4 py-4"
                >
                  <p className="font-medium text-[#0f172a]">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
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
                  <strong className="text-sm text-[#0f172a]">
                    {item.value}
                  </strong>
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
                <div
                  key={item}
                  className="rounded-2xl bg-[#f4f7fa] px-4 py-4 text-sm text-slate-600"
                >
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
