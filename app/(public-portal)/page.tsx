import Link from "next/link";
import {
  ArrowRight,
  ChartColumnIncreasing,
  Database,
  Shield,
  Sparkles,
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

const highlights = [
  {
    title: "Giao diện public rõ ràng",
    description:
      "Trang chủ đóng vai trò landing page gọn gàng, điều hướng nhanh tới buyer, seller, đăng nhập và quản trị.",
    icon: Sparkles,
  },
  {
    title: "Tách khu vực theo portal",
    description:
      "Cấu trúc route hiện tại đã sẵn cho public, buyer, seller và admin nên rất dễ nối tiếp nghiệp vụ.",
    icon: Shield,
  },
  {
    title: "Sẵn cho dữ liệu và vận hành",
    description:
      "Bạn có thể gắn auth, data layer và dashboard theo từng domain mà không phải tổ chức lại toàn bộ app.",
    icon: ChartColumnIncreasing,
  },
];

const stats = [
  { label: "Portal", value: "04", detail: "Public, buyer, seller, admin" },
  {
    label: "Shell chính",
    value: "02",
    detail: "Public site và admin dashboard",
  },
  {
    label: "Sẵn để mở rộng",
    value: "100%",
    detail: "Theo từng khu vực độc lập",
  },
];

const workflow = [
  "Đưa người dùng vào đúng khu vực theo vai trò và mục tiêu sử dụng.",
  "Tách phần public và phần quản trị để dễ phát triển tính năng riêng.",
  "Tiếp tục nối auth, dữ liệu và dashboard mà không phải làm lại cấu trúc nền.",
];

export default function PublicHomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:gap-16 lg:px-8 lg:py-14">
      <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.35)] backdrop-blur xl:grid-cols-[1.08fr_0.92fr] xl:p-8">
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="h-7 rounded-full px-3 text-[11px] uppercase tracking-[0.22em]"
            >
              Nền tảng Sandulieu
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                Hệ thống dữ liệu cho buyer, seller và khối vận hành trong một
                cấu trúc portal gọn, rõ và dễ mở rộng.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                Public site được làm lại theo hướng sáng, sạch và hiện đại hơn
                để trở thành điểm vào rõ ràng cho toàn bộ hệ thống Sandulieu.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="h-11 rounded-full px-5">
              <Link href="/login">
                Đăng nhập ngay
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-full px-5"
            >
              <Link href="/admin">Vào quản trị</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-full px-5"
            >
              <Link href="/buyer">Buyer portal</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-1">
          <Card className="rounded-[1.75rem] border-white/70 bg-zinc-950 text-white ring-0">
            <CardHeader>
              <CardDescription className="text-zinc-400">
                Tổng quan nền tảng
              </CardDescription>
              <CardTitle className="text-3xl text-white sm:text-4xl">
                4 portal độc lập
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {item.detail}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <Card className="rounded-[1.75rem] border-zinc-200/80 bg-white/90 ring-0">
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-900">
                  <Database className="size-5" />
                </div>
                <CardTitle className="text-xl">
                  Luồng vào hệ thống rõ ràng
                </CardTitle>
                <CardDescription className="leading-7">
                  Người dùng đi từ trang chủ tới đúng khu vực theo nhu cầu sử
                  dụng.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-[1.75rem] border-zinc-200/80 bg-white/90 ring-0">
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Users className="size-5" />
                </div>
                <CardTitle className="text-xl">Mở rộng theo vai trò</CardTitle>
                <CardDescription className="leading-7">
                  Buyer, seller và admin có thể phát triển riêng nhưng vẫn giữ
                  cùng trải nghiệm tổng thể.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="rounded-[1.75rem] border-zinc-200/70 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.35)] ring-0"
            >
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="leading-7">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[1.75rem] border-zinc-200/80 bg-white/85 ring-0">
          <CardHeader>
            <Badge variant="outline" className="w-fit rounded-full">
              Quy trình
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl">
              Cấu trúc hiện tại đã sẵn sàng để nối tính năng vào đúng tầng.
            </CardTitle>
            <CardDescription className="max-w-2xl leading-7">
              Public site giữ vai trò điều hướng, còn admin là nơi vận hành nội
              bộ, giúp việc phát triển sau này rõ ràng và ít chồng chéo hơn.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-4">
          {workflow.map((item, index) => (
            <Card
              key={item}
              className="rounded-[1.5rem] border-zinc-200/80 bg-white/80 ring-0"
            >
              <CardContent className="flex items-start gap-4 pt-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-zinc-700 sm:text-base">
                  {item}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200/80 bg-zinc-950 px-6 py-8 text-white shadow-[0_30px_90px_-55px_rgba(15,23,42,0.55)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">
              Sẵn sàng tiếp tục
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Trước mắt tập trung làm đẹp 2 entry page, sau đó nối tiếp nghiệp
              vụ cho từng portal.
            </h2>
            <p className="text-sm leading-7 text-zinc-300 sm:text-base">
              Trang chủ là điểm vào rõ ràng cho hệ thống, còn trang quản trị là
              nơi theo dõi hoạt động và vận hành nội bộ.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-white px-5 text-zinc-950 hover:bg-zinc-100"
            >
              <Link href="/admin">Mở dashboard quản trị</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-full border-white/20 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/login">Đi tới đăng nhập</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
