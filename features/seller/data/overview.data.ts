import type { LucideIcon } from "lucide-react";
import {
  Bell,
  ChartNoAxesColumn,
  CircleAlert,
  CircleDollarSign,
  Clock3,
  Package,
  Search,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChartPoint = {
  label: string;
  value: number;
};

export type MetricCardItem = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
  note?: string;
  detail?: string;
  noteClassName?: string;
};

export type ProgressItem = {
  label: string;
  amount: string;
  value: number;
  progressClassName: string;
};

export type AuctionItem = {
  code: string;
  status: string;
  title: string;
  startingBid: string;
  currentBid: string;
  timeLeft: string;
  iconClassName: string;
  statusClassName: string;
};

export type TaskItem = {
  title: string;
  description: string;
  className: string;
};

export type RecentOrderItem = {
  code: string;
  status: string;
  statusClassName: string;
  title: string;
  customer: string;
  amount: string;
};

export type CustomerItem = {
  index: number;
  name: string;
  orders: string;
  value: string;
};

export type TaxItem = {
  label: string;
  value: string;
  detail: string;
  className?: string;
  valueClassName?: string;
};

export type NotificationCategory = {
  label: string;
  count: number;
  active?: boolean;
};

export type NotificationItem = {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconClassName: string;
  rowClassName: string;
  tag?: string;
  tagClassName?: string;
};

// ─── Dữ liệu trang chủ ───────────────────────────────────────────────────────

export const TREND_POINTS: ChartPoint[] = [
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

export const HOME_STATS: MetricCardItem[] = [
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

export const HOME_PRODUCT_ROWS: ProgressItem[] = [
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

export const HOME_AUCTIONS: AuctionItem[] = [
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

export const HOME_TASKS: TaskItem[] = [
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

export const HOME_RECENT_ORDERS: RecentOrderItem[] = [
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

// ─── Dữ liệu trang phân tích ─────────────────────────────────────────────────

export const ANALYTICS_STATS: MetricCardItem[] = [
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

export const ANALYTICS_PRODUCT_ROWS: ProgressItem[] = [
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

export const ANALYTICS_CUSTOMERS: CustomerItem[] = [
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
  { index: 4, name: "Vingroup", orders: "42 đơn hàng", value: "680.000.000 đ" },
  {
    index: 5,
    name: "VNG Corporation",
    orders: "36 đơn hàng",
    value: "520.000.000 đ",
  },
];

export const TAX_ITEMS: TaxItem[] = [
  {
    label: "VAT phải nộp",
    value: "787.360.000 đ",
    detail: "8% trên doanh thu",
  },
  { label: "Thuế TNDN", value: "1.722.600.000 đ", detail: "20% lợi nhuận" },
  { label: "Phí nền tảng SDL", value: "492.100.000 đ", detail: "5% giao dịch" },
  {
    label: "Thực nhận",
    value: "6.839.940.000 đ",
    detail: "Sau mọi khoản phí",
    className: "ring-emerald-200/60 bg-emerald-50/90",
    valueClassName: "text-emerald-700",
  },
];

// ─── Dữ liệu trang thông báo ──────────────────────────────────────────────────

export const NOTIFICATION_STATS: MetricCardItem[] = [
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

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
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

export const NOTIFICATIONS: NotificationItem[] = [
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
    icon: Bell,
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
    icon: Users,
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
