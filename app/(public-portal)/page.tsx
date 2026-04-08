import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpenText,
  Building2,
  Check,
  Database,
  FileBarChart2,
  Gavel,
  Landmark,
  LockKeyhole,
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

const catalogItems = [
  { title: "Dân cư & VNeID", count: "124 chỉ tiêu", icon: Users },
  { title: "Doanh nghiệp & Thuế", count: "98 chỉ tiêu", icon: Building2 },
  { title: "Tài chính & Ngân hàng", count: "76 chỉ tiêu", icon: Landmark },
  { title: "Y tế & BHXH", count: "64 chỉ tiêu", icon: ShieldCheck },
  { title: "Giao thông & Du lịch", count: "52 chỉ tiêu", icon: Blocks },
  { title: "Giáo dục & Đào tạo", count: "48 chỉ tiêu", icon: BookOpenText },
];

const features = [
  {
    title: "Catalog dịch vụ dữ liệu",
    description:
      "Tra cứu và khai thác dữ liệu chính thống theo cấu trúc rõ ràng, sẵn sàng cho API hoặc tải về.",
    icon: Database,
  },
  {
    title: "Đấu giá dữ liệu minh bạch",
    description:
      "Hỗ trợ quy trình giao dịch, thẩm định và điều phối sản phẩm dữ liệu giữa nhiều bên tham gia.",
    icon: Gavel,
  },
  {
    title: "Quản lý đồng ý & bảo mật",
    description:
      "Theo dõi mục đích sử dụng, nhật ký khai thác và các yêu cầu tuân thủ theo từng vai trò.",
    icon: LockKeyhole,
  },
  {
    title: "Báo cáo điều hành",
    description:
      "Tổng hợp tín hiệu vận hành, giao dịch và chỉ số hoạt động trên cùng một bề mặt theo dõi.",
    icon: FileBarChart2,
  },
];

const roles = [
  {
    title: "Bên mua",
    subtitle: "Khai thác & sử dụng dữ liệu",
    description:
      "Tra cứu catalog, đăng ký dịch vụ, thanh toán và theo dõi tiến độ khai thác dữ liệu.",
    href: "/buyer",
  },
  {
    title: "Bên bán",
    subtitle: "Chào bán sản phẩm dữ liệu",
    description:
      "Quản lý danh mục chào bán, tham gia quy trình thẩm định và theo dõi doanh thu giao dịch.",
    href: "/seller",
  },
  {
    title: "CB-SDL / CQNN",
    subtitle: "Vận hành & quản trị toàn sàn",
    description:
      "Điều phối dịch vụ dữ liệu, giám sát hoạt động hệ thống và duy trì chất lượng vận hành.",
    href: "/admin",
  },
];

const news = [
  "Hướng dẫn tích hợp khai thác dữ liệu qua API chuẩn hóa cho đơn vị nghiệp vụ.",
  "Cập nhật cấu trúc danh mục dữ liệu quốc gia theo nhóm lĩnh vực ưu tiên năm 2026.",
  "Tăng cường giám sát giao dịch và nhật ký khai thác cho khối vận hành nội bộ.",
];

export default function PublicHomePage() {
  return (
    <div className="pb-16">
      <section className="border-b border-white/8 bg-[#08111f] text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c79a]/25 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#e7d7af]">
              <span>Phiên bản 1.0</span>
              <span>·</span>
              <span>Tháng 4/2026</span>
              <span>·</span>
              <span>Theo Luật BVDLCN 2025</span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Nền tảng dữ liệu chính thống quốc gia
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Sàn Dữ liệu Quốc gia kết nối Cơ quan Nhà nước, doanh nghiệp và
                công dân trên một hạ tầng trao đổi, giao dịch và khai thác dữ
                liệu an toàn, minh bạch và dễ tiếp cận theo từng vai trò.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-11 rounded-full px-5">
                <Link href="/login">
                  Bắt đầu sử dụng
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#roles">Khám phá theo vai trò</Link>
              </Button>
            </div>

            <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Check className="size-4 text-[#e7d7af]" />
                Tuân thủ Nghị định 13/2023
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Check className="size-4 text-[#e7d7af]" />
                Kết nối VNeID 68M+
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Check className="size-4 text-[#e7d7af]" />
                Chuẩn DCAT-VN & ISO 27001
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:pl-6">
            <Card className="border-white/10 bg-white/5 text-white ring-0 backdrop-blur-sm">
              <CardHeader>
                <CardDescription className="text-slate-400">
                  Giao dịch tháng 4/2026
                </CardDescription>
                <CardTitle className="text-4xl text-white">142.847</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Dân cư</p>
                  <p className="mt-2 text-2xl font-semibold">72%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Doanh nghiệp</p>
                  <p className="mt-2 text-2xl font-semibold">58%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Tài chính</p>
                  <p className="mt-2 text-2xl font-semibold">45%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-slate-400">Y tế</p>
                  <p className="mt-2 text-2xl font-semibold">38%</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-white/10 bg-[#0d1728] text-white ring-0">
                <CardHeader>
                  <CardTitle className="text-3xl text-white">662</CardTitle>
                  <CardDescription className="text-slate-300">
                    Chỉ tiêu thống kê · 18 lĩnh vực
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/10 bg-[#0d1728] text-white ring-0">
                <CardHeader>
                  <CardTitle className="text-3xl text-white">77</CardTitle>
                  <CardDescription className="text-slate-300">
                    Bộ dữ liệu quốc gia đang cung cấp
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section
        id="catalog"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18"
      >
        <div className="mb-8 space-y-3">
          <Badge
            variant="outline"
            className="rounded-full border-[#d8c79a]/60 text-[#8c7550]"
          >
            Danh mục dữ liệu
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
            18 lĩnh vực · 662 chỉ tiêu thống kê
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            Dữ liệu chính thống được phân loại theo nhóm lĩnh vực rõ ràng, sẵn
            sàng cho nhu cầu khai thác, tra cứu và tích hợp trong các bối cảnh
            nghiệp vụ khác nhau.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {catalogItems.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="border-[#d8dfe6] bg-white ring-0"
              >
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#0f172a]">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="pt-2 text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.count}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="features" className="bg-white/70 py-14 lg:py-18">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <Badge
              variant="outline"
              className="rounded-full border-[#d8c79a]/60 text-[#8c7550]"
            >
              Chức năng nền tảng
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
              Nền tảng toàn diện, sẵn sàng cho điều hành và khai thác dữ liệu
            </h2>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Kiến trúc trải nghiệm được tổ chức theo các lớp chức năng rõ ràng,
              giúp người dùng đi từ khám phá tới giao dịch và quản trị mà không
              bị đứt mạch.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="border-[#d8dfe6] bg-[#fbfcfd] ring-0"
                >
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0f172a] text-[#f4dfab]">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="pt-2 text-xl">{item.title}</CardTitle>
                    <CardDescription className="leading-7">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="roles"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18"
      >
        <div className="mb-8 space-y-3">
          <Badge
            variant="outline"
            className="rounded-full border-[#d8c79a]/60 text-[#8c7550]"
          >
            Đối tượng sử dụng
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
            Ba vai trò, một nền tảng
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            Mỗi khu vực được tổ chức theo ngữ cảnh riêng nhưng vẫn nằm trong
            cùng một hệ điều hướng và chuẩn nhận diện thống nhất.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.title} className="border-[#d8dfe6] bg-white ring-0">
              <CardHeader>
                <CardDescription>{role.subtitle}</CardDescription>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
                <CardDescription className="leading-7 text-slate-600">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={role.href}>
                    Vào khu vực {role.title}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#08111f] py-14 text-white lg:py-18">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-4">
            <Badge className="rounded-full bg-[#d8c79a]/14 text-[#e7d7af] hover:bg-[#d8c79a]/14">
              Giới thiệu
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Lớp điều phối đáng tin cậy trước khi đi vào từng luồng nghiệp vụ
            </h2>
            <p className="text-base leading-8 text-slate-300">
              Trang chủ đóng vai trò điểm vào chính thức của toàn bộ hệ thống,
              giúp người dùng hiểu nhanh mục đích nền tảng, phân loại dữ liệu và
              lựa chọn đúng khu vực làm việc ngay từ bước đầu tiên.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Độ phủ chức năng</p>
              <p className="mt-2 text-3xl font-semibold">439</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Chức năng nghiệp vụ được tổ chức lại theo ngữ cảnh sử dụng và
                lớp điều hướng rõ ràng.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Công dân kết nối</p>
              <p className="mt-2 text-3xl font-semibold">68M+</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Trải nghiệm được định hướng cho bối cảnh dữ liệu chính thống và
                nhu cầu vận hành quy mô lớn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="news"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18"
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
        <div className="rounded-[2rem] bg-[#0b1524] px-6 py-8 text-white sm:px-8 lg:flex lg:items-center lg:justify-between lg:py-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Sẵn sàng khai thác dữ liệu quốc gia?
            </h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              Đăng nhập để đi vào khu vực phù hợp với vai trò sử dụng của bạn,
              hoặc mở ngay dashboard quản trị để tiếp tục phần vận hành hệ
              thống.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Button asChild size="lg" className="rounded-full px-5">
              <Link href="/login">Đăng nhập hệ thống</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/admin">Vào khu vực CB-SDL</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
