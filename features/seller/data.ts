import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Boxes,
  ClipboardList,
  Database,
  FlaskConical,
  Gavel,
  KeyRound,
  LayoutDashboard,
  LineChart,
  Search,
} from "lucide-react";

export type SellerNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export type SellerNavGroup = {
  label: string;
  items: SellerNavItem[];
};

export type SellerMetric = {
  label: string;
  value: string;
  delta?: string;
  detail?: string;
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
  icon: LucideIcon;
};

export type SellerEndpoint = {
  label: string;
  value: string;
  percent: number;
  tone: "blue" | "emerald" | "amber" | "rose" | "violet";
};

export const sellerUser = {
  initials: "SB",
  name: "Nguyễn Văn Bán",
  company: "Công ty TNHH Data Seller Việt",
  companyShort: "Công ty TNHH Data S...",
};

export const sellerNavGroups: SellerNavGroup[] = [
  {
    label: "Tổng quan",
    items: [
      { href: "/seller", label: "Trang chủ", icon: LayoutDashboard },
      {
        href: "/seller/analytics",
        label: "Phân tích doanh số",
        icon: LineChart,
      },
      {
        href: "/seller/notifications",
        label: "Thông báo",
        icon: Bell,
        badge: "5",
      },
    ],
  },
  {
    label: "Khai thác dữ liệu",
    items: [
      {
        href: "/seller/catalog",
        label: "Catalog dịch vụ",
        icon: Search,
        badge: "662",
      },
      {
        href: "/seller/subscriptions",
        label: "Dịch vụ đã đăng ký",
        icon: Boxes,
        badge: "12",
      },
      { href: "/seller/api-keys", label: "API Keys & Token", icon: KeyRound },
      {
        href: "/seller/sandbox",
        label: "Sandbox & Clean Room",
        icon: FlaskConical,
      },
      {
        href: "/seller/auctions",
        label: "Đấu giá dữ liệu",
        icon: Gavel,
        badge: "3",
      },
    ],
  },
];

export const sellerHomeMetrics: SellerMetric[] = [
  {
    label: "Dịch vụ đang bán",
    value: "24",
    delta: "+6.2%",
    detail: "so với tháng trước",
    tone: "blue",
    icon: Database,
  },
  {
    label: "Lượt tương tác (30 ngày)",
    value: "168.420",
    delta: "+18.5%",
    detail: "tăng trưởng",
    tone: "emerald",
    icon: LineChart,
  },
  {
    label: "Bộ hồ sơ đã xuất",
    value: "1.248",
    delta: "+4.1%",
    detail: "so với tháng trước",
    tone: "amber",
    icon: Boxes,
  },
  {
    label: "Doanh thu tháng này",
    value: "48.900.000 ₫",
    delta: "+12.3%",
    detail: "so với tháng trước",
    tone: "violet",
    icon: ClipboardList,
  },
];

export const sellerUsageStats = [
  { label: "Đỉnh / ngày", value: "9.840" },
  { label: "Trung bình / ngày", value: "4.860" },
  { label: "Tỷ lệ chuyển đổi", value: "3,8%" },
  { label: "Thời gian phản hồi", value: "132ms" },
];

export const sellerTopEndpoints: SellerEndpoint[] = [
  { label: "DS bán chạy nhất", value: "42.300", percent: 100, tone: "blue" },
  {
    label: "Xác thực doanh nghiệp",
    value: "31.250",
    percent: 74,
    tone: "emerald",
  },
  {
    label: "Bộ dữ liệu tài chính",
    value: "21.600",
    percent: 51,
    tone: "amber",
  },
  {
    label: "Dịch vụ kiểm tra hồ sơ",
    value: "16.820",
    percent: 40,
    tone: "rose",
  },
  { label: "Lịch sử giao dịch", value: "12.140", percent: 29, tone: "violet" },
];

export const sellerHomeAlerts = [
  {
    title: "3 buyer mới đã xem catalog hôm nay",
    description: "Có thể gửi đề xuất nhanh cho các tài khoản tiềm năng.",
    time: "5 phút trước",
    tone: "blue" as const,
    href: "/seller/catalog",
  },
  {
    title: "2 gói dịch vụ sắp hết hạn",
    description: "Kiểm tra gia hạn để tránh gián đoạn hợp đồng đang mở.",
    time: "1 giờ trước",
    tone: "amber" as const,
    href: "/seller/subscriptions",
  },
  {
    title: "Phiên đấu giá AUC-2026-0412 đang tăng nhiệt",
    description: "Theo dõi bid mới và điều chỉnh giá nếu cần.",
    time: "Hôm nay",
    tone: "rose" as const,
    href: "/seller/auctions",
  },
];

export const sellerComplianceItems = [
  {
    label: "Catalog đã chuẩn hóa",
    value: "100%",
    detail: "Tất cả mô tả và metadata đã đồng bộ",
  },
  {
    label: "Hợp đồng đang hiệu lực",
    value: "18",
    detail: "5 hợp đồng cần gia hạn trong 30 ngày",
  },
  {
    label: "Chính sách dữ liệu",
    value: "Đạt chuẩn",
    detail: "Tuân thủ NĐ13/2023 và quy trình kiểm soát nội bộ",
  },
];

export const sellerQuickActions = [
  {
    label: "Mở catalog",
    description: "Xem danh mục đang bán",
    href: "/seller/catalog",
  },
  {
    label: "Kiểm tra doanh số",
    description: "Xem hoạt động giao dịch gần nhất",
    href: "/seller/analytics",
  },
  {
    label: "Theo dõi thông báo",
    description: "Nhận cảnh báo từ buyer và hệ thống",
    href: "/seller/notifications",
  },
  {
    label: "Quản lý sandbox",
    description: "Kiểm thử tích hợp với khách hàng",
    href: "/seller/sandbox",
  },
];

export const sellerNotifications = [
  {
    id: "buyer-interest",
    title: "Có 3 buyer đang quan tâm catalog DV-DC-001",
    description:
      "Hệ thống ghi nhận lượt xem và yêu cầu báo giá mới trong 24 giờ qua.",
    category: "Bán hàng",
    time: "5 phút trước",
    tone: "blue" as const,
    unread: true,
    href: "/seller/catalog",
  },
  {
    id: "auction-update",
    title: "Bid mới cho phiên AUC-2026-0412",
    description:
      "Một buyer vừa nâng giá đặt mua, bạn có thể phản hồi ngay trong màn hình đấu giá.",
    category: "Đấu giá",
    time: "18 phút trước",
    tone: "amber" as const,
    unread: true,
    href: "/seller/auctions",
  },
  {
    id: "contract-expiry",
    title: "2 gói dịch vụ sắp hết hạn hợp đồng",
    description: "Cần gia hạn trước khi kỳ thanh toán tiếp theo bắt đầu.",
    category: "Hợp đồng",
    time: "1 giờ trước",
    tone: "amber" as const,
    unread: true,
    href: "/seller/subscriptions",
  },
  {
    id: "security",
    title: "Phát hiện đăng nhập mới từ thiết bị chưa xác minh",
    description: "Tài khoản vừa đăng nhập từ Chrome trên Windows tại Hà Nội.",
    category: "Bảo mật",
    time: "Hôm qua",
    tone: "rose" as const,
    href: "/seller/settings",
  },
];

export const sellerNotificationFilters = [
  { label: "Tất cả", value: "10" },
  { label: "Chưa đọc", value: "5" },
  { label: "Bán hàng", value: "3" },
  { label: "Đấu giá", value: "1" },
  { label: "Hợp đồng", value: "2" },
  { label: "Bảo mật", value: "1" },
  { label: "Hệ thống", value: "5" },
];

export const sellerHeatmapRows = [
  [12, 18, 26, 34, 48, 58, 66, 72, 64, 52, 38, 24],
  [10, 16, 22, 30, 42, 54, 62, 70, 68, 56, 40, 28],
  [8, 12, 20, 28, 38, 50, 60, 74, 70, 58, 44, 30],
  [6, 10, 18, 24, 34, 46, 58, 66, 62, 50, 36, 26],
];

export const sellerTrendBars = [
  18, 22, 28, 32, 30, 36, 44, 40, 52, 56, 62, 68, 66, 72, 80, 76, 84, 88,
];
