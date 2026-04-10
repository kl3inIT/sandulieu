import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  ChartNoAxesColumn,
  CheckCheck,
  CircleAlert,
  CircleDollarSign,
  Clock3,
  FileText,
  Gavel,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  Star,
  Store,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";

type MetricCardItem = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
  note?: string;
  detail?: string;
  noteClassName?: string;
};

type ProgressItem = {
  label: string;
  amount: string;
  value: number;
  progressClassName: string;
};

type AuctionItem = {
  code: string;
  status: string;
  title: string;
  startingBid: string;
  currentBid: string;
  timeLeft: string;
  iconClassName: string;
  statusClassName: string;
};

type TaskItem = {
  title: string;
  description: string;
  className: string;
};

type RecentOrderItem = {
  code: string;
  status: string;
  statusClassName: string;
  title: string;
  customer: string;
  amount: string;
};

type CustomerItem = {
  index: number;
  name: string;
  orders: string;
  value: string;
};

type TaxItem = {
  label: string;
  value: string;
  detail: string;
  className?: string;
  valueClassName?: string;
};

type NotificationCategory = {
  label: string;
  count: number;
  active?: boolean;
};

type NotificationItem = {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconClassName: string;
  rowClassName: string;
  tag?: string;
  tagClassName?: string;
};

type ChartPoint = {
  label: string;
  value: number;
};

const TREND_POINTS: ChartPoint[] = [
  { label: "T5", value: 12 },
  { label: "T6", value: 15 },
  { label: "T7", value: 18 },
  { label: "T8", value: 17 },
  { label: "T9", value: 24 },
  { label: "T10", value: 33 },
  { label: "T11", value: 40 },
  { label: "T12", value: 46 },
  { label: "T1", value: 52 },
  { label: "T2", value: 64 },
  { label: "T3", value: 72 },
  { label: "T4", value: 94 },
];

const HOME_STATS: MetricCardItem[] = [
  {
    title: "Doanh thu tháng này",
    value: "1.284.500.000 đ",
    note: "+32,8%",
    detail: "so với tháng trước",
    icon: CircleDollarSign,
    iconClassName: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    noteClassName: "text-emerald-700",
  },
  {
    title: "Sản phẩm đang bán",
    value: "18",
    note: "+12,5%",
    detail: "2 mới tuần này",
    icon: Package,
    iconClassName: "bg-blue-50 text-blue-700 ring-blue-100",
    noteClassName: "text-blue-700",
  },
  {
    title: "Khách hàng hoạt động",
    value: "142",
    note: "+18,4%",
    detail: "tăng trưởng tốt",
    icon: Users,
    iconClassName: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    noteClassName: "text-cyan-700",
  },
  {
    title: "Đánh giá trung bình",
    value: "4,82",
    note: "+2,1%",
    detail: "238 đánh giá",
    icon: Star,
    iconClassName: "bg-amber-50 text-amber-700 ring-amber-100",
    noteClassName: "text-amber-700",
  },
];

const HOME_PRODUCT_ROWS: ProgressItem[] = [
  {
    label: "Báo cáo tín dụng DN",
    amount: "420",
    value: 100,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
  },
  {
    label: "Chỉ số thị trường CK",
    amount: "310",
    value: 74,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-blue-500",
  },
  {
    label: "Dữ liệu tỷ giá realtime",
    amount: "245",
    value: 58,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-orange-500",
  },
  {
    label: "DS DN niêm yết",
    amount: "180",
    value: 43,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-violet-500",
  },
  {
    label: "Dự báo kinh tế vĩ mô",
    amount: "129",
    value: 31,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-pink-500",
  },
];

const HOME_AUCTIONS: AuctionItem[] = [
  {
    code: "AUC-2026-0412",
    status: "LIVE • 24 lượt bid",
    title: "Bộ dữ liệu lịch sử giao dịch CK 2020-2025",
    startingBid: "500.000.000 đ",
    currentBid: "1.240.000.000 đ",
    timeLeft: "2 ngày 14 giờ",
    iconClassName: "bg-amber-100 text-amber-700",
    statusClassName: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  {
    code: "AUC-2026-0418",
    status: "LIVE • 18 lượt bid",
    title: "Báo cáo tín dụng SME toàn quốc Q1/2026",
    startingBid: "300.000.000 đ",
    currentBid: "680.000.000 đ",
    timeLeft: "5 ngày 2 giờ",
    iconClassName: "bg-orange-100 text-orange-700",
    statusClassName: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
];

const HOME_TASKS: TaskItem[] = [
  {
    title: "3 sản phẩm chờ thẩm định",
    description: "Hội đồng thẩm định sẽ đánh giá trong 3 - 5 ngày",
    className: "ring-amber-200/60 bg-amber-50/80",
  },
  {
    title: "5 đơn hàng chờ bàn giao",
    description: "Xác minh bàn giao để nhận thanh toán",
    className: "ring-blue-200/60 bg-blue-50/80",
  },
  {
    title: "12 yêu cầu mua mới",
    description: "Doanh nghiệp đang tìm dữ liệu phù hợp",
    className: "ring-emerald-200/60 bg-emerald-50/80",
  },
];

const HOME_RECENT_ORDERS: RecentOrderItem[] = [
  {
    code: "ORD-2026-12847",
    status: "Mới",
    statusClassName: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    title: "Báo cáo tín dụng DN Q1/2026",
    customer: "Ngân hàng TMCP Việt Nam",
    amount: "48.000.000 đ",
  },
  {
    code: "ORD-2026-12846",
    status: "Bàn giao",
    statusClassName: "bg-sky-100 text-sky-700 hover:bg-sky-100",
    title: "Dữ liệu tỷ giá realtime 1 năm",
    customer: "CTCP Chứng khoán HCM",
    amount: "120.000.000 đ",
  },
  {
    code: "ORD-2026-12845",
    status: "Mới",
    statusClassName: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    title: "Dự báo kinh tế vĩ mô 2026-2027",
    customer: "Vietnam Airlines",
    amount: "25.000.000 đ",
  },
  {
    code: "ORD-2026-12844",
    status: "Đang xử lý",
    statusClassName: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    title: "DS DN niêm yết HOSE/HNX",
    customer: "VIB Securities",
    amount: "18.000.000 đ",
  },
];

const ANALYTICS_STATS: MetricCardItem[] = [
  {
    title: "Doanh thu 2026",
    value: "9.842.000.000 đ",
    note: "+128,4%",
    detail: "so với 2025",
    icon: CircleDollarSign,
    iconClassName: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    noteClassName: "text-emerald-700",
  },
  {
    title: "Doanh thu thuần",
    value: "8.613.000.000 đ",
    note: "+31,2%",
    detail: "sau phí & thuế",
    icon: Wallet,
    iconClassName: "bg-amber-50 text-amber-700 ring-amber-100",
    noteClassName: "text-emerald-700",
  },
  {
    title: "Số giao dịch",
    value: "2.847",
    note: "+42,1%",
    detail: "tăng trưởng mạnh",
    icon: ChartNoAxesColumn,
    iconClassName: "bg-blue-50 text-blue-700 ring-blue-100",
    noteClassName: "text-emerald-700",
  },
  {
    title: "Khách hàng quay lại",
    value: "68%",
    note: "+12,4%",
    detail: "trung thành",
    icon: ShieldCheck,
    iconClassName: "bg-slate-100 text-slate-700 ring-slate-200",
    noteClassName: "text-emerald-700",
  },
];

const ANALYTICS_PRODUCT_ROWS: ProgressItem[] = [
  {
    label: "Báo cáo tín dụng DN",
    amount: "2.840",
    value: 100,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
  },
  {
    label: "Chỉ số thị trường CK",
    amount: "1.920",
    value: 68,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-blue-500",
  },
  {
    label: "Dữ liệu tỷ giá realtime",
    amount: "1.480",
    value: 52,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-orange-500",
  },
  {
    label: "DS DN niêm yết",
    amount: "1.240",
    value: 44,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-violet-500",
  },
  {
    label: "Dự báo kinh tế vĩ mô",
    amount: "980",
    value: 35,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-pink-500",
  },
  {
    label: "Phân tích ngành NH",
    amount: "820",
    value: 29,
    progressClassName: "[&_[data-slot=progress-indicator]]:bg-cyan-500",
  },
];

const ANALYTICS_CUSTOMERS: CustomerItem[] = [
  {
    index: 1,
    name: "Ngân hàng TMCP Việt Nam",
    orders: "84 đơn hàng",
    value: "1.240.000.000 đ",
  },
  {
    index: 2,
    name: "CTCP Chứng khoán SSI",
    orders: "62 đơn hàng",
    value: "980.000.000 đ",
  },
  {
    index: 3,
    name: "VietinBank",
    orders: "48 đơn hàng",
    value: "820.000.000 đ",
  },
  {
    index: 4,
    name: "Vingroup",
    orders: "42 đơn hàng",
    value: "680.000.000 đ",
  },
  {
    index: 5,
    name: "VNG Corporation",
    orders: "36 đơn hàng",
    value: "520.000.000 đ",
  },
];

const TAX_ITEMS: TaxItem[] = [
  {
    label: "VAT phải nộp",
    value: "787.360.000 đ",
    detail: "8% trên doanh thu",
  },
  {
    label: "Thuế TNDN",
    value: "1.722.600.000 đ",
    detail: "20% lợi nhuận",
  },
  {
    label: "Phí nền tảng SDL",
    value: "492.100.000 đ",
    detail: "5% giao dịch",
  },
  {
    label: "Thực nhận",
    value: "6.839.940.000 đ",
    detail: "Sau mọi khoản phí",
    className: "ring-emerald-200/60 bg-emerald-50/90",
    valueClassName: "text-emerald-700",
  },
];

const NOTIFICATION_STATS: MetricCardItem[] = [
  {
    title: "Chưa đọc",
    value: "6",
    icon: Bell,
    iconClassName: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  {
    title: "Quan trọng",
    value: "4",
    icon: CircleAlert,
    iconClassName: "bg-rose-50 text-rose-700 ring-rose-100",
  },
  {
    title: "Hôm nay",
    value: "6",
    icon: Clock3,
    iconClassName: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  {
    title: "Tháng này",
    value: "284",
    icon: ChartNoAxesColumn,
    iconClassName: "bg-blue-50 text-blue-700 ring-blue-100",
  },
];

const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  { label: "Tất cả", count: 10, active: true },
  { label: "Chưa đọc", count: 6 },
  { label: "Quan trọng", count: 4 },
  { label: "Đơn hàng & RFQ", count: 2 },
  { label: "Đấu giá", count: 1 },
  { label: "Chất lượng", count: 1 },
  { label: "Khiếu nại", count: 1 },
  { label: "Tài chính", count: 2 },
  { label: "Hệ thống", count: 2 },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    title: "Đơn hàng mới #ORD-2026-04-12847",
    description:
      'Ngân hàng TMCP VIB đã đặt mua "Báo cáo tín dụng DN Q1/2026". Giá trị 48M VND. Bàn giao trong 3 ngày.',
    time: "2 phút trước",
    tag: "Quan trọng",
    icon: Package,
    iconClassName: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    rowClassName: "ring-emerald-200/60 bg-emerald-50/70",
    tagClassName: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  {
    title: "Bid mới trên phiên AUC-2026-0412: 1,24 tỷ",
    description:
      "Bidder #3 vừa đặt 1,24 tỷ (+50M so với bid trước). Phiên đã vượt reserve 800M và sẽ thành công.",
    time: "18 phút trước",
    tag: "Quan trọng",
    icon: Gavel,
    iconClassName: "bg-orange-100 text-orange-700 ring-orange-200",
    rowClassName: "ring-orange-200/60 bg-orange-50/70",
    tagClassName: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  {
    title: "RFQ mới phù hợp (AI Match 95%)",
    description:
      'Ngân hàng VIB đang yêu cầu "Dữ liệu giao dịch thẻ tín dụng 2023-2025". Ngân sách 2,5B VND.',
    time: "1 giờ trước",
    icon: Search,
    iconClassName: "bg-blue-100 text-blue-700 ring-blue-200",
    rowClassName: "ring-sky-200/60 bg-sky-50/70",
  },
  {
    title: "Hội đồng đã thẩm định SP-TC-005",
    description:
      "Sản phẩm 'Dữ liệu kinh tế vĩ mô 2026-2027' đạt điểm 92,8/100. Đủ điều kiện Gold.",
    time: "2 giờ trước",
    icon: ShieldCheck,
    iconClassName: "bg-amber-100 text-amber-700 ring-amber-200",
    rowClassName: "ring-amber-200/60 bg-amber-50/70",
  },
  {
    title: "Đánh giá mới 5★ từ SSI Securities",
    description:
      "Khách hàng đánh giá 5 sao cho SP-TC-006: dữ liệu chất lượng xuất sắc, tích hợp nhanh, hỗ trợ tận tình.",
    time: "3 giờ trước",
    icon: Star,
    iconClassName: "bg-yellow-100 text-yellow-700 ring-yellow-200",
    rowClassName: "ring-cyan-200/60 bg-cyan-50/70",
  },
  {
    title: "Khiếu nại mới từ Techcombank",
    description:
      "Khách hàng phản ánh chất lượng dữ liệu SP-TC-003 có 3% bản ghi lỗi schema. Cần phản hồi trong 48h.",
    time: "4 giờ trước",
    tag: "Quan trọng",
    icon: CircleAlert,
    iconClassName: "bg-rose-100 text-rose-700 ring-rose-200",
    rowClassName: "ring-rose-200/60 bg-rose-50/70",
    tagClassName: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  {
    title: "Thanh toán tự động 185M về Vietcombank",
    description:
      "Đã rút 185.000.000 VND cho 8 đơn hàng hoàn tất (ORD-12798 đến ORD-12806).",
    time: "Hôm qua",
    icon: Wallet,
    iconClassName: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    rowClassName: "ring-emerald-200/60",
  },
  {
    title: "Doanh thu tháng 4/2026 +32% MoM",
    description:
      "Tăng trưởng mạnh nhờ 3 phiên đấu giá thành công và 8 đơn hàng enterprise mới.",
    time: "Hôm qua",
    icon: ChartNoAxesColumn,
    iconClassName: "bg-blue-100 text-blue-700 ring-blue-200",
    rowClassName: "ring-blue-200/60 bg-blue-50/70",
  },
  {
    title: "Đăng nhập mới từ thiết bị khác",
    description:
      "Windows 11 · Edge · Hà Nội (Nguyễn Quang Huy). Nếu không phải thành viên, thay đổi mật khẩu ngay.",
    time: "Hôm qua",
    tag: "Quan trọng",
    icon: CircleAlert,
    iconClassName: "bg-rose-100 text-rose-700 ring-rose-200",
    rowClassName: "ring-rose-200/60 bg-rose-50/60",
    tagClassName: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  {
    title: "Account Manager Hoàng Thị Ngọc đã phản hồi ticket",
    description:
      "Ticket #TKT-0842 về tăng quota API đã được xử lý xong. Bạn đã được nâng lên gói 500K calls/tháng.",
    time: "2 ngày trước",
    icon: Bell,
    iconClassName: "bg-slate-100 text-slate-700 ring-slate-200",
    rowClassName: "ring-slate-200/60",
  },
];

export function SellerHomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Chào mừng trở lại, Trần Thị Mai ✨
            </CardTitle>
            <CardDescription>
              Tổng quan hoạt động kinh doanh dữ liệu của CTCP Dữ liệu Tài chính
              Việt.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            <Button asChild size="sm" variant="outline">
              <Link href="/seller/products">
                <Store data-icon="inline-start" />
                Xem cửa hàng
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/seller/create">
                <FileText data-icon="inline-start" />
                Đăng sản phẩm mới
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {HOME_STATS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>Doanh thu 12 tháng gần nhất</CardTitle>
              <CardDescription>
                Doanh thu thuần sau phí nền tảng và nghĩa vụ tài chính.
              </CardDescription>
            </div>
            <CardAction>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                +32,8% MoM
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_1fr] lg:items-end">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                    9.842.000.000 đ
                  </p>
                  <span className="pb-1 text-xs text-muted-foreground">
                    12 tháng
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mức tăng trưởng ổn định nhờ danh mục dữ liệu doanh nghiệp, tín
                  dụng và tỷ giá được mua lại đều theo chu kỳ.
                </p>
              </div>
              <TrendChart
                compact
                gradientId="seller-home-trend"
                points={TREND_POINTS}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStatTile label="Tổng giao dịch" value="2.847" />
              <MiniStatTile
                label="Giá trị TB / giao dịch"
                value="3.458.000 đ"
              />
              <MiniStatTile label="Khách hàng quay lại" value="68%" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
            <CardDescription>Theo doanh thu thực tế tháng này</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {HOME_PRODUCT_ROWS.map((item) => (
              <ProgressMetricRow key={item.label} {...item} />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>Phiên đấu giá đang diễn ra</CardTitle>
              <CardDescription>
                2 sản phẩm dữ liệu đang được đấu giá trực tiếp
              </CardDescription>
            </div>
            <CardAction>
              <Button asChild size="sm" variant="ghost">
                <Link href="/seller/auctions">
                  Xem tất cả
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {HOME_AUCTIONS.map((item) => (
              <AuctionRow key={item.code} {...item} />
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Việc cần làm</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {HOME_TASKS.map((item) => (
                <TaskStrip key={item.title} {...item} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hạng seller</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-muted/30 px-4 py-5 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Trophy />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-foreground">
                    Platinum Seller
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Top 5% nhà cung cấp dữ liệu
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <RankMetric label="Đánh giá" value="4,82/5" />
                <RankMetric label="Tỉ lệ hoàn thành" value="98,6%" />
                <RankMetric label="Thời gian phản hồi" value="< 2 giờ" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Giao dịch mua bán sản phẩm dữ liệu trong 7 ngày qua
            </CardDescription>
          </div>
          <CardAction>
            <Button asChild size="sm" variant="ghost">
              <Link href="/seller/orders">
                Xem tất cả
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {HOME_RECENT_ORDERS.map((item, index) => (
            <div key={item.code} className="flex flex-col gap-3">
              <RecentOrderRow {...item} />
              {index < HOME_RECENT_ORDERS.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Doanh thu & Báo cáo tài chính
            </CardTitle>
            <CardDescription>
              Phân tích doanh thu chi tiết, thuế và dự báo dựa trên AI.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            <Select defaultValue="2026">
              <SelectTrigger aria-label="Chọn năm báo cáo" className="min-w-28">
                <SelectValue placeholder="Năm 2026" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="2026">Năm 2026</SelectItem>
                  <SelectItem value="2025">Năm 2025</SelectItem>
                  <SelectItem value="2024">Năm 2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <FileText data-icon="inline-start" />
              Xuất báo cáo
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ANALYTICS_STATS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Biểu đồ doanh thu theo tháng</CardTitle>
            <CardDescription>12 tháng gần nhất · Triệu VND</CardDescription>
          </div>
          <CardAction>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              +32,8% MoM
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TrendChart
            gradientId="seller-analytics-trend"
            points={TREND_POINTS}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo sản phẩm</CardTitle>
            <CardDescription>Top 6 sản phẩm bán chạy nhất</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {ANALYTICS_PRODUCT_ROWS.map((item) => (
              <ProgressMetricRow key={item.label} {...item} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top khách hàng</CardTitle>
            <CardDescription>Theo giá trị giao dịch 2026</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {ANALYTICS_CUSTOMERS.map((item, index) => (
              <div key={item.name} className="flex flex-col gap-3">
                <CustomerRankRow {...item} />
                {index < ANALYTICS_CUSTOMERS.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thuế & Nghĩa vụ tài chính 2026</CardTitle>
          <CardDescription>
            Tự động tính toán dựa trên quy định hiện hành
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TAX_ITEMS.map((item) => (
            <TaxMetricTile key={item.label} {...item} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerNotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Trung tâm thông báo
            </CardTitle>
            <CardDescription>
              Tất cả cập nhật về đơn hàng, đấu giá, RFQ, thẩm định và khiếu nại.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            <Button size="sm" variant="outline">
              <CheckCheck data-icon="inline-start" />
              Đánh dấu tất cả đã đọc
            </Button>
            <Button size="sm" variant="outline">
              <Settings2 data-icon="inline-start" />
              Cấu hình
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {NOTIFICATION_STATS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
        <Card>
          <CardContent className="flex flex-col gap-3 pt-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Tìm thông báo..." />
            </div>
            <div className="flex flex-col gap-1">
              {NOTIFICATION_CATEGORIES.map((item) => (
                <NotificationCategoryButton key={item.label} {...item} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3 pt-4">
            {NOTIFICATIONS.map((item) => (
              <NotificationListItem
                key={`${item.title}-${item.time}`}
                {...item}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SellerCatalogPage() {
  return <PlaceholderPage title="Catalog dịch vụ" />;
}

export function SellerSubscriptionsPage() {
  return <PlaceholderPage title="Dịch vụ đã đăng ký" />;
}

export function SellerApiKeysPage() {
  return <PlaceholderPage title="API Keys & Token" />;
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Phần này vẫn giữ ở dạng placeholder cho tới khi bạn gửi thêm ảnh hoặc
          yêu cầu chi tiết.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline">
          <Link href="/seller">Quay về Trang chủ</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  note,
  detail,
  noteClassName,
}: MetricCardItem) {
  return (
    <Card className="justify-between">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardAction>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl ring-1",
              iconClassName
            )}
          >
            <Icon />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
          {value}
        </p>
        {note ? (
          <p className="text-xs text-muted-foreground">
            <span className={cn("font-semibold", noteClassName)}>{note}</span>
            {detail ? ` ${detail}` : null}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function MiniStatTile({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-muted/20">
      <CardContent className="flex flex-col gap-1 py-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

function ProgressMetricRow({
  label,
  amount,
  value,
  progressClassName,
}: ProgressItem) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{amount}</span>
      </div>
      <Progress
        value={value}
        className={cn(
          "h-2 rounded-full bg-muted/80 [&_[data-slot=progress-indicator]]:rounded-full",
          progressClassName
        )}
      />
    </div>
  );
}

function AuctionRow({
  code,
  status,
  title,
  startingBid,
  currentBid,
  timeLeft,
  iconClassName,
  statusClassName,
}: AuctionItem) {
  return (
    <Card className="bg-muted/20">
      <CardContent className="flex flex-col gap-4 py-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              iconClassName
            )}
          >
            <Gavel />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{code}</Badge>
              <Badge className={statusClassName}>{status}</Badge>
            </div>
            <p className="font-medium text-foreground">{title}</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <MiniStatTile label="Giá khởi điểm" value={startingBid} />
          <MiniStatTile label="Giá hiện tại" value={currentBid} />
          <MiniStatTile label="Kết thúc sau" value={timeLeft} />
        </div>
      </CardContent>
    </Card>
  );
}

function TaskStrip({ title, description, className }: TaskItem) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-1 py-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function RankMetric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-3 py-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </CardContent>
    </Card>
  );
}

function RecentOrderRow({
  code,
  status,
  statusClassName,
  title,
  customer,
  amount,
}: RecentOrderItem) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <FileText />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{code}</Badge>
            <Badge className={statusClassName}>{status}</Badge>
          </div>
          <p className="truncate font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{customer}</p>
        </div>
      </div>
      <p className="shrink-0 text-sm font-semibold text-emerald-700">
        {amount}
      </p>
    </div>
  );
}

function CustomerRankRow({ index, name, orders, value }: CustomerItem) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted font-semibold text-muted-foreground">
        {index}
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{orders}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-emerald-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function TaxMetricTile({
  label,
  value,
  detail,
  className,
  valueClassName,
}: TaxItem) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-2 py-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={cn(
            "text-2xl font-semibold tracking-tight text-foreground",
            valueClassName
          )}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function NotificationCategoryButton({
  label,
  count,
  active,
}: NotificationCategory) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className="w-full justify-between rounded-xl"
    >
      <span>{label}</span>
      <Badge
        variant={active ? "secondary" : "outline"}
        className={
          active ? "bg-background/15 text-primary-foreground" : undefined
        }
      >
        {count}
      </Badge>
    </Button>
  );
}

function NotificationListItem({
  title,
  description,
  time,
  tag,
  tagClassName,
  icon: Icon,
  iconClassName,
  rowClassName,
}: NotificationItem) {
  return (
    <Card className={cn(rowClassName)}>
      <CardContent className="py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl ring-1",
                iconClassName
              )}
            >
              <Icon />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-foreground">{title}</p>
                {tag ? <Badge className={tagClassName}>{tag}</Badge> : null}
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <p className="shrink-0 pt-1 text-xs text-muted-foreground">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendChart({
  points,
  gradientId,
  compact = false,
}: {
  points: ChartPoint[];
  gradientId: string;
  compact?: boolean;
}) {
  const width = 640;
  const height = compact ? 124 : 216;
  const paddingX = compact ? 8 : 18;
  const paddingY = compact ? 12 : 22;
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const usableHeight = height - paddingY * 2;
  const step =
    points.length > 1 ? (width - paddingX * 2) / (points.length - 1) : 0;

  const coordinates = points.map((point, index) => {
    const x = paddingX + step * index;
    const y =
      height - paddingY - Math.max(point.value / maxValue, 0.02) * usableHeight;

    return { x, y };
  });

  const firstPoint = coordinates[0];
  const lastPoint = coordinates[coordinates.length - 1];
  const linePoints = coordinates
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const areaPoints = [
    `${firstPoint?.x ?? paddingX},${height - paddingY}`,
    linePoints,
    `${lastPoint?.x ?? width - paddingX},${height - paddingY}`,
  ].join(" ");

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn("rounded-2xl bg-muted/25 p-3", compact ? "h-24" : "h-44")}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full w-full text-emerald-600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {!compact
            ? [0.25, 0.5, 0.75].map((fraction) => {
                const y = height - paddingY - usableHeight * fraction;

                return (
                  <line
                    key={fraction}
                    x1={paddingX}
                    x2={width - paddingX}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.08"
                    strokeWidth="1"
                  />
                );
              })
            : null}
          <polygon points={areaPoints} fill={`url(#${gradientId})`} />
          <polyline
            fill="none"
            points={linePoints}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={compact ? 4 : 5}
          />
          {lastPoint ? (
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              fill="white"
              r={compact ? 5 : 6}
              stroke="currentColor"
              strokeWidth="3"
            />
          ) : null}
        </svg>
      </div>
      {!compact ? (
        <div className="grid grid-cols-12 text-[11px] text-muted-foreground">
          {points.map((point) => (
            <span key={point.label} className="text-center">
              {point.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
