import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Database,
  FolderKanban,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

const metrics = [
  {
    label: "Người dùng đang hoạt động",
    value: "12.480",
    change: "+8,2%",
    tone: "text-emerald-600",
  },
  {
    label: "Bản ghi vừa đồng bộ",
    value: "2,4M",
    change: "+14,1%",
    tone: "text-cyan-700",
  },
  {
    label: "Tỷ lệ xử lý thành công",
    value: "99,2%",
    change: "+0,6%",
    tone: "text-violet-700",
  },
];

const tasks = [
  "Kiểm tra luồng duyệt seller mới.",
  "Đối soát dữ liệu buyer với báo cáo trong ngày.",
  "Rà soát quyền truy cập dashboard theo vai trò.",
];

const activities = [
  {
    title: "Batch import seller mới",
    detail: "1.284 bản ghi đã được đưa vào staging trong 15 phút gần nhất.",
    icon: Database,
  },
  {
    title: "Cập nhật quyền quản trị",
    detail: "3 tài khoản nội bộ vừa được cấp thêm quyền xem dashboard.",
    icon: ShieldCheck,
  },
  {
    title: "Buyer mới tham gia",
    detail: "27 tài khoản buyer đã hoàn tất onboarding trong hôm nay.",
    icon: Users,
  },
];

const quickActions = [
  {
    title: "Xem bài viết",
    description:
      "Mở nhanh danh sách bài viết để kiểm tra và cập nhật nội dung.",
    icon: FolderKanban,
  },
  {
    title: "Theo dõi dữ liệu",
    description: "Kiểm tra tiến độ đồng bộ và các bản ghi cần chú ý.",
    icon: Database,
  },
  {
    title: "Kiểm tra bảo mật",
    description: "Rà soát hoạt động truy cập và những thay đổi quan trọng.",
    icon: BadgeCheck,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden rounded-[1.75rem] border-zinc-200/70 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] ring-0">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Badge variant="secondary" className="w-fit rounded-full">
                Dashboard quản trị
              </Badge>
              <Badge
                variant="outline"
                className="w-fit rounded-full border-emerald-200 bg-emerald-50 text-emerald-700"
              >
                Hệ thống đang ổn định
              </Badge>
            </div>
            <div className="space-y-3">
              <CardTitle className="max-w-3xl text-3xl tracking-tight sm:text-4xl">
                Nắm nhanh tình hình vận hành để ưu tiên đúng việc cần xử lý.
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-7 sm:text-base">
                Đây là màn hình tổng quan giúp bạn theo dõi số liệu chính, việc
                cần làm và những cập nhật mới nhất trong khu vực quản trị.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="rounded-full px-5">
              <Link href="/admin/posts">Quản lý bài viết</Link>
            </Button>
            <Button variant="outline" className="rounded-full px-5">
              Xem người dùng
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              className="rounded-[1.5rem] border-zinc-200/70 bg-white/90 ring-0"
            >
              <CardHeader>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className={`rounded-full ${metric.tone}`}
                >
                  {metric.change}
                </Badge>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-4">
          <Card className="rounded-[1.5rem] border-zinc-200/70 bg-white/90 ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock3 className="size-4" />
                Việc nên ưu tiên hôm nay
              </CardTitle>
              <CardDescription>
                Những đầu việc cần theo dõi sớm để vận hành trơn tru hơn.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <Card
                  key={task}
                  size="sm"
                  className="rounded-2xl border border-zinc-200/80 bg-zinc-50 ring-0"
                >
                  <CardContent className="flex items-start gap-3 pt-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-zinc-700">{task}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[1.5rem] border-zinc-200/70 bg-zinc-950 text-white ring-0">
            <CardHeader>
              <Badge className="w-fit rounded-full bg-white/10 text-white hover:bg-white/10">
                Tác vụ nhanh
              </Badge>
              <CardTitle className="text-2xl text-white">
                Một vài lối tắt để bạn thao tác thuận tiện hơn.
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="size-4" />
                    </div>
                    <p className="mt-4 font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[1.5rem] border-zinc-200/70 bg-white/90 ring-0">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl">Hoạt động gần đây</CardTitle>
                <CardDescription>
                  Những thay đổi mới nhất để bạn nắm tình hình nhanh hơn.
                </CardDescription>
              </div>
              <Badge variant="outline" className="rounded-full">
                Cập nhật liên tục
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={activity.title} className="flex flex-col gap-4">
                  <div className="flex items-start gap-4 rounded-3xl border border-zinc-200/70 bg-zinc-50/80 p-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/80">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-zinc-950">
                          {activity.title}
                        </p>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                  {index < activities.length - 1 ? <Separator /> : null}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
