import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  ChartNoAxesCombined,
  Database,
  ShieldCheck,
  Users,
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

const metrics = [
  {
    label: "Giao dịch hôm nay",
    value: "4.812",
    detail: "+18,2% so với hôm qua",
    icon: Activity,
  },
  {
    label: "Tổng tài khoản",
    value: "12.847",
    detail: "+424 tuần này",
    icon: Users,
  },
  {
    label: "Dịch vụ dữ liệu",
    value: "662 + 247",
    detail: "CQNN + thương mại",
    icon: Database,
  },
  {
    label: "GMV tháng 4/2026",
    value: "48,42 tỷ ₫",
    detail: "+28,4% so với tháng trước",
    icon: ChartNoAxesCombined,
  },
];

const systemHealth = [
  ["API Gateway", "99,98%", "18,4M / ngày"],
  ["Liên thông DMDC", "99,82%", "Sync 2.4K/h"],
  ["VNeID Integration", "99,99%", "68M user KYC"],
  ["Cổng thanh toán", "98,45%", "142 giao dịch/phút"],
];

const summaries = [
  "Theo dõi tín hiệu hệ thống và chất lượng vận hành theo thời gian thực.",
  "Giữ bài viết là khu vực thao tác thật trong phase rebuild đầu tiên.",
  "Các nhóm chức năng khác được dựng lại theo cấu trúc mới để mở rộng dần.",
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-[#d9e0e7] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_100%)] ring-0">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Trung tâm điều hành
                </p>
                <CardTitle className="mt-2 text-3xl tracking-tight text-[#0f172a] sm:text-4xl">
                  Tổng quan vận hành Sàn Dữ liệu Quốc gia
                </CardTitle>
              </div>
              <Badge className="w-fit rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                Hệ thống ổn định · 99,98%
              </Badge>
            </div>
            <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
              Màn hình này tái cấu trúc khu vực quản trị theo hướng nhiều lớp rõ
              ràng hơn: điều hành, dữ liệu, cảnh báo và các lối vào nghiệp vụ.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="rounded-full px-5">
              <Link href="/admin/posts">Quản lý bài viết</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href="/">Xem trang public</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#d9e0e7] bg-[#0b1524] text-white ring-0">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-[#d8c79a]/14 text-[#f4dfab] hover:bg-[#d8c79a]/14">
              Tóm tắt điều phối
            </Badge>
            <CardTitle className="text-2xl text-white">
              Giữ nhịp vận hành, vẫn bảo toàn luồng Post CRUD hiện có
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {summaries.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#0f172a]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card
              key={metric.label}
              className="border-[#d9e0e7] bg-white ring-0"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardDescription>{metric.label}</CardDescription>
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#0f172a]">
                    <Icon className="size-4" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-[#0f172a]">
                  {metric.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">{metric.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-[#d9e0e7] bg-white ring-0">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-[#0f172a]">
                  Lưu lượng và tín hiệu chính
                </CardTitle>
                <CardDescription>
                  Giao diện tổng quan được tổ chức lại theo kiểu command center.
                </CardDescription>
              </div>
              <ArrowUpRight className="size-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.75rem] bg-[#f4f7fa] p-5">
              <p className="text-sm text-slate-500">Tổng giao dịch</p>
              <p className="mt-2 text-4xl font-semibold text-[#0f172a]">
                142.847
              </p>
              <p className="mt-2 text-sm text-emerald-700">+23% MoM</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                  <span>API calls</span>
                  <strong className="text-[#0f172a]">18,4M</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                  <span>Tài khoản hoạt động</span>
                  <strong className="text-[#0f172a]">8.412</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                  <span>GMV</span>
                  <strong className="text-[#0f172a]">48,4B₫</strong>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-dashed border-[#d9e0e7] bg-[#fbfcfd] p-5">
              <p className="text-sm text-slate-500">Phân bố theo lĩnh vực</p>
              <div className="mt-5 grid gap-3 text-sm">
                {[
                  ["Dân cư", "124"],
                  ["Doanh nghiệp", "98"],
                  ["Tài chính", "76"],
                  ["Y tế & BHXH", "64"],
                  ["Giao thông", "52"],
                  ["Giáo dục", "48"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-slate-600"
                  >
                    <span>{label}</span>
                    <strong className="text-[#0f172a]">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#d9e0e7] bg-white ring-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-[#0f172a]">
              <ShieldCheck className="size-4" />
              Tình trạng hệ thống
            </CardTitle>
            <CardDescription>
              Giám sát các thành phần tích hợp và dịch vụ cốt lõi.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {systemHealth.map(([label, score, detail]) => (
              <div key={label} className="rounded-2xl bg-[#f4f7fa] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-[#0f172a]">{label}</p>
                  <Badge
                    variant="outline"
                    className="rounded-full border-emerald-200 bg-white text-emerald-700"
                  >
                    {score}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500">{detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-[#d9e0e7] bg-white ring-0">
          <CardHeader>
            <CardTitle className="text-xl text-[#0f172a]">
              Tác vụ nhanh
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button
              asChild
              variant="outline"
              className="justify-between rounded-2xl"
            >
              <Link href="/admin/posts">
                Mở khu vực bài viết
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="justify-between rounded-2xl"
            >
              Xem báo cáo CQNN
              <ArrowUpRight className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="justify-between rounded-2xl"
            >
              Kiểm tra cảnh báo
              <ArrowUpRight className="size-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#d9e0e7] bg-white ring-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-[#0f172a]">
              <BadgeCheck className="size-4" />
              Ghi chú triển khai phase đầu
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm leading-7 text-slate-600">
            <p>
              Đã dựng lại trang chủ, đăng nhập và dashboard quản trị theo cấu
              trúc mới.
            </p>
            <p>
              Khu vực bài viết được giữ nguyên logic CRUD để tránh ảnh hưởng
              luồng dữ liệu hiện có.
            </p>
            <p>
              Các nhóm chức năng admin khác hiện mới đóng vai trò khung định
              hướng cho các phase tiếp theo.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
