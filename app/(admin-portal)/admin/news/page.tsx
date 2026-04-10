import {
  Bell,
  CalendarDays,
  ChartColumn,
  Eye,
  Image,
  Megaphone,
  PenLine,
  Plus,
  TrendingUp,
  Tv,
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
    title: "Bài viết 2026",
    value: "124",
    icon: Image,
    iconClassName: "bg-[#dfeaf7] text-[#214f80]",
  },
  {
    title: "Lượt xem tháng này",
    value: "284.120",
    icon: TrendingUp,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
    delta: "+24.5%",
  },
  {
    title: "Bản nháp",
    value: "8",
    icon: PenLine,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
  {
    title: "FAQ được quản lý",
    value: "142",
    icon: Tv,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
] as const;

const posts = [
  {
    tag: "Thông báo",
    accent: "bg-[#dbeafe] text-[#2f67d2]",
    title: "Ra mắt Consent Management theo Luật BVDLCN 2025",
    meta: "05/04/2026 · 12.480 lượt xem",
    published: true,
  },
  {
    tag: "Cập nhật",
    accent: "bg-[#dbeafe] text-[#2f67d2]",
    title: "Cập nhật: 124 chỉ tiêu dân cư mới từ VNeID",
    meta: "03/04/2026 · 8.240 lượt xem",
    published: true,
  },
  {
    tag: "Hướng dẫn",
    accent: "bg-[#dbeafe] text-[#2f67d2]",
    title: "Hướng dẫn tích hợp API v2.4 cho doanh nghiệp",
    meta: "01/04/2026 · 4.820 lượt xem",
    published: true,
  },
  {
    tag: "Bảo trì",
    accent: "bg-[#dbeafe] text-[#2f67d2]",
    title: "Lịch bảo trì hệ thống 15/04/2026 (2:00-4:00)",
    meta: "15/04/2026 · Chưa xuất bản",
    published: false,
  },
  {
    tag: "Sự kiện",
    accent: "bg-[#dbeafe] text-[#2f67d2]",
    title: "Hội thảo Data Clean Room với AWS & Snowflake",
    meta: "28/03/2026 · 3.240 lượt xem",
    published: true,
  },
  {
    tag: "Chính sách",
    accent: "bg-[#dbeafe] text-[#2f67d2]",
    title: "Bản nháp: Chính sách mới về dữ liệu xuyên biên giới",
    meta: "— · Chưa xuất bản",
    published: false,
  },
] as const;

const notifications = [
  {
    title: "Bảo trì 15/04 02:00-04:00",
    meta: "Gửi cho: Tất cả người dùng · Trạng thái: Đã lên lịch",
  },
  {
    title: "124 chỉ tiêu dân cư mới",
    meta: "Gửi cho: Bên mua lĩnh vực TC + NH · Đã gửi",
  },
] as const;

const topics = [
  ["API & Tích hợp", "42"],
  ["Consent & Privacy", "28"],
  ["Đấu giá dữ liệu", "18"],
  ["VNeID Integration", "14"],
  ["Xuyên biên giới", "8"],
] as const;

export default function AdminNewsPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
              Tin tức & Thông báo
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Quản trị nội dung trên Cổng công khai và thông báo đẩy tới người
              dùng
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] hover:bg-[#f8fbff]"
            >
              <Bell className="mr-2 size-4" />
              Gửi thông báo
            </Button>
            <Button className="h-10 rounded-[0.95rem] bg-[#10386d] px-4 text-white hover:bg-[#0f335f]">
              <Plus className="mr-2 size-4" />
              Tạo bài viết
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
                    {"delta" in card ? (
                      <Badge className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[#0f9f6e] hover:bg-[#dcfce7]">
                        {card.delta} tăng trưởng
                      </Badge>
                    ) : null}
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

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              Bài viết gần đây
            </CardTitle>
            <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
              Tin tức, cập nhật và thông báo cho toàn bộ người dùng
            </p>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {posts.map((post) => (
              <article
                key={post.title}
                className="flex items-start gap-3 rounded-[1.1rem] border border-[#e8edf3] bg-[#fffaf2] px-4 py-4"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#dbe7f4] text-[#244d7b]">
                  <Image className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[0.76rem]">
                    <Badge
                      className={
                        post.accent +
                        " rounded-full px-2.5 py-0.5 hover:bg-current/0"
                      }
                    >
                      {post.tag}
                    </Badge>
                    {post.published ? (
                      <Badge className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[#16a34a] hover:bg-[#dcfce7]">
                        Đã xuất bản
                      </Badge>
                    ) : (
                      <Badge className="rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-[#315fda] hover:bg-[#eef2ff]">
                        Bản nháp
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-[1.02rem] font-semibold text-[#0a2e5c]">
                    {post.title}
                  </p>
                  <p className="mt-1 text-[0.84rem] text-[#7a8da4]">
                    {post.meta}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#0a2e5c]">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-full hover:bg-[#edf3fb]"
                  >
                    <Eye className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-full hover:bg-[#edf3fb]"
                  >
                    <PenLine className="size-4" />
                  </Button>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
            <CardHeader className="px-4 py-4 pb-0 sm:px-5">
              <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                <Bell className="size-5" />
                Thông báo đẩy
              </CardTitle>
              <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                Gửi thông báo push tới người dùng
              </p>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
              {notifications.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.1rem] border border-[#e8edf3] px-4 py-3"
                >
                  <p className="font-semibold text-[#0a2e5c]">{item.title}</p>
                  <p className="mt-1 text-[0.84rem] text-[#7a8da4]">
                    {item.meta}
                  </p>
                </div>
              ))}
              <Button
                variant="outline"
                className="h-9 w-full rounded-[0.85rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] hover:bg-[#f8fbff]"
              >
                <Plus className="mr-2 size-4" />
                Tạo thông báo
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
            <CardHeader className="px-4 py-4 pb-0 sm:px-5">
              <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                Chủ đề phổ biến
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
              {topics.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-[0.95rem] text-[#0a2e5c]"
                >
                  <span>{label}</span>
                  <Badge className="rounded-full bg-[#f3f6fb] px-2.5 py-0.5 text-[#64748b] hover:bg-[#f3f6fb]">
                    {value}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
