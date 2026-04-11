import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  Building2,
  CheckCircle2,
  Database,
  FileCheck2,
  Gavel,
  Globe2,
  Landmark,
  LockKeyhole,
  Search,
  ShieldCheck,
  SquareChartGantt,
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

const assuranceItems = [
  "Tuân thủ Nghị định 13/2023",
  "Kết nối VNeID 68M+",
  "Chuẩn DCAT-VN & ISO 27001",
] as const;

const platformStats = [
  {
    value: "662",
    label: "Chỉ tiêu thống kê",
    description: "18 lĩnh vực",
  },
  {
    value: "439",
    label: "Chức năng nghiệp vụ",
    description: "Use case tinh gọn",
  },
  {
    value: "77",
    label: "Bộ dữ liệu quốc gia",
    description: "CQNN cung cấp",
  },
  {
    value: "68M+",
    label: "Công dân VNeID",
    description: "Kết nối minh bạch",
  },
] as const;

const catalogItems = [
  {
    title: "Dân cư & VNeID",
    count: "124 chỉ tiêu",
    icon: Users,
    iconClassName: "bg-[linear-gradient(135deg,#3b82f6_0%,#1d4ed8_100%)]",
  },
  {
    title: "Doanh nghiệp & Thuế",
    count: "98 chỉ tiêu",
    icon: Building2,
    iconClassName: "bg-[linear-gradient(135deg,#10b981_0%,#059669_100%)]",
  },
  {
    title: "Tài chính & Ngân hàng",
    count: "76 chỉ tiêu",
    icon: Landmark,
    iconClassName: "bg-[linear-gradient(135deg,#f59e0b_0%,#d97706_100%)]",
  },
  {
    title: "Y tế & BHXH",
    count: "64 chỉ tiêu",
    icon: ShieldCheck,
    iconClassName: "bg-[linear-gradient(135deg,#ff1f67_0%,#e11d48_100%)]",
  },
  {
    title: "Giao thông & Du lịch",
    count: "52 chỉ tiêu",
    icon: Globe2,
    iconClassName: "bg-[linear-gradient(135deg,#0ea5e9_0%,#0891b2_100%)]",
  },
  {
    title: "Giáo dục & Đào tạo",
    count: "48 chỉ tiêu",
    icon: BookOpenText,
    iconClassName: "bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)]",
  },
  {
    title: "Xây dựng & Đất đai",
    count: "41 chỉ tiêu",
    icon: SquareChartGantt,
    iconClassName: "bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]",
  },
  {
    title: "Công nghiệp & Năng lượng",
    count: "38 chỉ tiêu",
    icon: BarChart3,
    iconClassName: "bg-[linear-gradient(135deg,#14b8a6_0%,#0f766e_100%)]",
  },
] as const;

const features = [
  {
    title: "Catalog dịch vụ dữ liệu",
    description:
      "Tra cứu và khai thác 662 chỉ tiêu thống kê từ các Cơ quan Nhà nước theo chuẩn DCAT-VN.",
    icon: Database,
  },
  {
    title: "Đấu giá dữ liệu minh bạch",
    description:
      "Tổ chức phiên đấu giá sản phẩm dữ liệu nhiều vòng, cấu hình bước giá và xác nhận thắng thầu.",
    icon: Gavel,
  },
  {
    title: "Thẩm định chất lượng & giá",
    description:
      "Hội đồng thẩm định độc lập đánh giá chất lượng, tính hợp pháp và định giá tài sản dữ liệu.",
    icon: FileCheck2,
  },
  {
    title: "Quản lý đồng ý (Consent)",
    description:
      "Thu hồi đồng ý real-time, consent receipt chuẩn hóa, purpose binding theo Nghị định 13/2023.",
    icon: ShieldCheck,
    highlighted: true,
  },
  {
    title: "Data Clean Room",
    description:
      "Phân tích dữ liệu nhạy cảm không sao chép với differential privacy và aggregation threshold.",
    icon: LockKeyhole,
  },
  {
    title: "Usage Control (IDSA ODRL)",
    description:
      "Kiểm soát sử dụng dữ liệu sau chia sẻ: giới hạn thời gian, cấm chuyển tiếp, tự động xóa.",
    icon: LockKeyhole,
  },
  {
    title: "Báo cáo thống kê & BI",
    description:
      "Biểu đồ, dashboard và công cụ phân tích trực quan theo thời gian thực.",
    icon: BarChart3,
  },
  {
    title: "API Gateway quốc gia",
    description:
      "Cổng API chuẩn OpenAPI 3.0, xác thực FAPI 2.0, giới hạn tốc độ và nhật ký kiểm toán đầy đủ.",
    icon: Globe2,
  },
] as const;

const roles = [
  {
    title: "Bên mua",
    subtitle: "Khai thác & sử dụng dữ liệu",
    description:
      "Tra cứu catalog, đăng ký dịch vụ, thanh toán và khai thác dữ liệu qua API hoặc tải về.",
    bullets: [
      "Tra cứu 662 chỉ tiêu thống kê",
      "Giỏ hàng & thanh toán điện tử",
      "API token & OAuth 2.0",
      "Dashboard khai thác",
    ],
    href: "/buyer",
    cardClassName: "bg-[linear-gradient(180deg,#13284d_0%,#112546_100%)]",
    icon: Search,
  },
  {
    title: "Bên bán",
    subtitle: "Chào bán sản phẩm dữ liệu",
    description:
      "Đăng sản phẩm, tham gia đấu giá, quản lý hợp đồng và nhận thanh toán từ các giao dịch.",
    bullets: [
      "Đăng sản phẩm & bộ dữ liệu",
      "Tổ chức & tham gia đấu giá",
      "Thẩm định chất lượng & giá",
      "Báo cáo doanh thu",
    ],
    href: "/seller",
    cardClassName: "bg-[linear-gradient(180deg,#07363a_0%,#062f33_100%)]",
    icon: ArrowRight,
  },
  {
    title: "CB-SDL / CQNN",
    subtitle: "Cán bộ Sàn & Cơ quan Nhà nước",
    description:
      "Quản trị catalog, tạo lập dịch vụ dữ liệu CQNN, duyệt tài khoản và giám sát toàn hệ thống.",
    bullets: [
      "Tạo dịch vụ dữ liệu",
      "Duyệt tài khoản & hồ sơ",
      "Quản trị danh mục",
      "Gửi báo cáo CQNN",
    ],
    href: "/admin",
    cardClassName: "bg-[linear-gradient(180deg,#2b2d26_0%,#252822_100%)]",
    icon: Building2,
  },
] as const;

const news = [
  "Hướng dẫn tích hợp khai thác dữ liệu qua API chuẩn hóa cho đơn vị nghiệp vụ.",
  "Cập nhật cấu trúc danh mục dữ liệu quốc gia theo nhóm lĩnh vực ưu tiên năm 2026.",
  "Tăng cường giám sát giao dịch và nhật ký khai thác cho khối vận hành nội bộ.",
] as const;

export default function PublicHomePage() {
  return (
    <div className="pb-16">
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_70%_30%,rgba(46,102,199,0.22),transparent_24%),linear-gradient(180deg,#08111f_0%,#0a1f3e_100%)] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-4 sm:px-6 lg:px-8 lg:pb-18">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/8 px-5 py-2.5 text-sm font-medium text-[#f1cb63] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]">
                <span>Phiên bản 1.0</span>
                <span>·</span>
                <span>Tháng 4/2026</span>
                <span>·</span>
                <span>Theo Luật BVDLCN 2025</span>
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-[3.4rem] leading-[0.95] font-semibold tracking-tight sm:text-[4.5rem] lg:text-[5.2rem]">
                  <span className="text-white">Nền tảng dữ liệu</span>
                  <br />
                  <span className="text-[#f1c84f]">chính thống quốc gia</span>
                </h1>
                <p className="max-w-4xl text-[1.05rem] leading-8 text-slate-300 sm:text-[1.15rem]">
                  Sàn Dữ liệu Quốc gia kết nối{" "}
                  <span className="font-semibold text-white">
                    Cơ quan Nhà nước, doanh nghiệp
                  </span>{" "}
                  và <span className="font-semibold text-white">công dân</span>{" "}
                  trên một hạ tầng trao đổi, giao dịch và khai thác dữ liệu an
                  toàn, tuân thủ Nghị định 13/2023 và Luật Bảo vệ Dữ liệu Cá
                  nhân 2025.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-xl px-10 text-lg"
                >
                  <Link href="/login">
                    Bắt đầu sử dụng
                    <ArrowRight className="size-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-xl border-white/60 bg-white/8 px-10 text-lg text-white hover:bg-white/12 hover:text-white"
                >
                  <Link href="#roles">Khám phá theo vai trò</Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[0.95rem] text-slate-300">
                {assuranceItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#f1c84f]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[480px] items-center justify-center">
              <div className="absolute size-[460px] rounded-full border border-white/40" />
              <div className="absolute size-[340px] rounded-full border border-white/40" />
              <div className="absolute size-[230px] rounded-full border border-white/40" />
              <Card className="relative z-10 w-full max-w-[292px] rounded-[1.4rem] border-white/50 bg-[linear-gradient(180deg,rgba(36,57,91,0.96)_0%,rgba(31,52,86,0.98)_100%)] text-white shadow-[0_25px_80px_rgba(2,12,27,0.32)] backdrop-blur-sm">
                <CardHeader className="space-y-4 pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#d6a520] text-[#0a2043]">
                      <Database className="size-7" />
                    </div>
                    <div>
                      <CardDescription className="text-[1rem] text-slate-400">
                        Giao dịch tháng 4/2026
                      </CardDescription>
                      <CardTitle className="text-[3rem] tracking-tight text-white">
                        142.847
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {[
                    {
                      label: "Dân cư",
                      value: "72%",
                      width: "72%",
                      tone: "bg-[#5aa0ff]",
                    },
                    {
                      label: "Doanh nghiệp",
                      value: "58%",
                      width: "58%",
                      tone: "bg-[#11d1a1]",
                    },
                    {
                      label: "Tài chính",
                      value: "45%",
                      width: "45%",
                      tone: "bg-[#f6b81a]",
                    },
                    {
                      label: "Y tế",
                      value: "38%",
                      width: "38%",
                      tone: "bg-[#ff5f87]",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-semibold text-slate-200">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/15">
                        <div
                          className={`h-2 rounded-full ${item.tone}`}
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-10 rounded-[1.7rem] border border-white/60 bg-[rgba(30,49,79,0.9)] px-10 py-8 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {platformStats.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-[4rem] leading-none font-semibold tracking-tight text-[#f1c84f]">
                    {item.value}
                  </p>
                  <p className="text-[1.15rem] font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="text-[0.95rem] text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="catalog"
        className="bg-[#fbfbfc] px-4 py-18 sm:px-6 lg:px-8 lg:py-22"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <Badge
              variant="outline"
              className="rounded-full border-[#e3d9bb] bg-[#f8f1e1] px-4 py-1 text-[#c28a12]"
            >
              Danh mục dữ liệu
            </Badge>
            <h2 className="mt-6 text-[3.2rem] leading-[1.02] font-semibold tracking-tight text-[#0d2a55] sm:text-[4.3rem]">
              18 lĩnh vực · 662 chỉ tiêu thống kê
            </h2>
            <p className="mt-6 text-[1.1rem] leading-9 text-slate-600">
              Dữ liệu chính thống từ Cơ quan Nhà nước được phân loại theo chuẩn
              DCAT-VN, sẵn sàng khai thác qua API hoặc tải về định dạng CSV,
              JSON, Parquet.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {catalogItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="rounded-[1.6rem] border-[#d8e1eb] bg-white shadow-none transition-transform hover:-translate-y-0.5"
                >
                  <CardHeader className="space-y-5 px-7 py-7">
                    <div
                      className={`flex size-15 items-center justify-center rounded-2xl text-white shadow-[0_12px_28px_rgba(15,23,42,0.15)] ${item.iconClassName}`}
                    >
                      <Icon className="size-7" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-[1.1rem] leading-7 text-[#0d2a55]">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-[0.95rem] text-slate-500">
                        {item.count}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="h-14 rounded-xl px-10 text-lg"
            >
              <Link href="/login">
                Xem toàn bộ danh mục
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-[linear-gradient(180deg,#eef4fb_0%,#edf3fa_100%)] px-4 py-18 sm:px-6 lg:px-8 lg:py-22"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <Badge className="rounded-full bg-[#dbe8f7] px-4 py-1 text-[#1f4b82] hover:bg-[#dbe8f7]">
              Chức năng nền tảng
            </Badge>
            <h2 className="mt-6 text-[3rem] leading-[1.04] font-semibold tracking-tight text-[#0d2a55] sm:text-[4.1rem]">
              Nền tảng toàn diện,{" "}
              <span className="text-[#f1c84f]">tuân thủ quốc tế</span>
            </h2>
            <p className="mt-6 text-[1.1rem] leading-9 text-slate-600">
              Tham chiếu từ 10 mô hình chính phủ (Estonia, EU, Singapore, Hàn
              Quốc, Ấn Độ...) và 8 nền tảng thương mại (AWS, Snowflake,
              Databricks, Dawex...).
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className={`rounded-[1.6rem] border-[#d8e1eb] ring-0 ${
                    item.highlighted
                      ? "border-white bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                      : "bg-white shadow-none"
                  }`}
                >
                  <CardHeader className="space-y-5 px-7 py-7">
                    <div className="flex size-15 items-center justify-center rounded-2xl bg-[#0f274d] text-[#f1c84f]">
                      <Icon className="size-7" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-[1rem] leading-7 text-[#0d2a55] sm:text-[1.05rem]">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-[0.95rem] leading-8 text-slate-600">
                        {item.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="roles"
        className="bg-[radial-gradient(circle_at_top,rgba(37,84,172,0.14),transparent_20%),#08111f] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-22"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <Badge className="rounded-full border border-white/45 bg-white/6 px-4 py-1 text-[#f1c84f] hover:bg-white/6">
              Đối tượng sử dụng
            </Badge>
            <h2 className="mt-6 text-[3rem] leading-[1.04] font-semibold tracking-tight sm:text-[4.1rem]">
              Ba vai trò, <span className="text-[#f1c84f]">một nền tảng</span>
            </h2>
            <p className="mt-6 text-[1.1rem] leading-9 text-slate-300">
              Mỗi vai trò có bộ chức năng riêng được thiết kế tinh gọn, trực
              quan và phù hợp nghiệp vụ.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <Card
                  key={role.title}
                  className={`rounded-[1.9rem] border-white/65 text-white shadow-none ${role.cardClassName}`}
                >
                  <CardHeader className="space-y-6 px-10 py-10">
                    <div className="flex items-start justify-between">
                      <div className="flex size-18 items-center justify-center rounded-3xl bg-[#d6a520] text-[#0a2043]">
                        <Icon className="size-9" />
                      </div>
                      <ArrowRight className="mt-1 size-7 text-[#f1c84f]" />
                    </div>

                    <div className="space-y-2">
                      <CardTitle className="text-[2.2rem] tracking-tight text-white">
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-[1rem] font-medium text-[#f1c84f]">
                        {role.subtitle}
                      </CardDescription>
                    </div>

                    <p className="text-[1.02rem] leading-9 text-slate-300">
                      {role.description}
                    </p>

                    <div className="grid gap-3 pt-2">
                      {role.bullets.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-[1rem] text-slate-200"
                        >
                          <CheckCircle2 className="size-5 text-[#f1c84f]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="px-10 pb-10 pt-0">
                    <Button asChild className="h-14 w-full rounded-xl text-lg">
                      <Link href={role.href}>
                        Vào khu vực {role.title}
                        <ArrowRight className="size-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="news"
        className="mx-auto w-full max-w-7xl px-4 py-18 sm:px-6 lg:px-8 lg:py-22"
      >
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="rounded-full border-[#d8c79a]/60 text-[#8c7550]"
            >
              Tin tức
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
              Cập nhật mới từ nền tảng dữ liệu quốc gia
            </h2>
          </div>
          <Button asChild variant="outline" className="w-fit rounded-full">
            <Link href="/login">Đăng nhập để theo dõi thêm</Link>
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {news.map((item, index) => (
            <Card key={item} className="border-[#d8dfe6] bg-white ring-0">
              <CardHeader>
                <CardDescription>Tin cập nhật 0{index + 1}</CardDescription>
                <CardTitle className="text-xl leading-8">{item}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#163b6d] px-6 py-10 text-white sm:px-8 lg:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[3rem] leading-[1.06] font-semibold tracking-tight sm:text-[4.2rem]">
              <span className="text-white">Sẵn sàng </span>
              <span className="text-[#f1c84f]">
                khai thác dữ liệu quốc gia?
              </span>
            </h2>
            <p className="mt-6 text-[1.1rem] leading-9 text-slate-300">
              Đăng ký tài khoản miễn phí với VNeID hoặc số đăng ký kinh doanh để
              bắt đầu giao dịch trên Sàn Dữ liệu Quốc gia.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-xl px-10 text-lg"
              >
                <Link href="/login">Đăng ký miễn phí</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-xl border-white/65 bg-white/8 px-10 text-lg text-white hover:bg-white/12 hover:text-white"
              >
                <Link href="#catalog">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
