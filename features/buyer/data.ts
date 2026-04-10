import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  Database,
  FileText,
  FlaskConical,
  Gavel,
  GraduationCap,
  HeartPulse,
  KeyRound,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Map,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Wallet,
} from "lucide-react";

export type BuyerNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export type BuyerNavGroup = {
  label: string;
  items: BuyerNavItem[];
};

export type BuyerMetric = {
  label: string;
  value: string;
  delta?: string;
  detail?: string;
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
  icon: LucideIcon;
};

export type BuyerEndpoint = {
  label: string;
  value: string;
  percent: number;
  tone: "blue" | "emerald" | "amber" | "rose" | "violet";
};

export const buyerUser = {
  initials: "NA",
  name: "Nguyễn Văn An",
  company: "Công ty TNHH FinTech Việt",
  companyShort: "Công ty TNHH FinTec...",
};

export const buyerNavGroups: BuyerNavGroup[] = [
  {
    label: "Tổng quan",
    items: [
      { href: "/buyer", label: "Trang chủ", icon: LayoutDashboard },
      { href: "/buyer/analytics", label: "Phân tích khai thác", icon: LineChart },
      { href: "/buyer/notifications", label: "Thông báo", icon: Bell, badge: "5" },
    ],
  },
  {
    label: "Khai thác dữ liệu",
    items: [
      { href: "/buyer/catalog", label: "Catalog dịch vụ", icon: Search, badge: "662" },
      { href: "/buyer/subscriptions", label: "Dịch vụ đã đăng ký", icon: Boxes, badge: "12" },
      { href: "/buyer/api-keys", label: "API Keys & Token", icon: KeyRound },
      { href: "/buyer/sandbox", label: "Sandbox & Clean Room", icon: FlaskConical },
      { href: "/buyer/auctions", label: "Đấu giá dữ liệu", icon: Gavel, badge: "3" },
    ],
  },
  {
    label: "Giao dịch",
    items: [
      { href: "/buyer/cart", label: "Giỏ hàng", icon: ShoppingCart, badge: "3" },
      { href: "/buyer/demands", label: "Nhu cầu mua của tôi", icon: ClipboardList, badge: "5" },
      { href: "/buyer/orders", label: "Đơn hàng & Hợp đồng", icon: FileText },
      { href: "/buyer/wallet", label: "Ví & Thanh toán", icon: Wallet },
    ],
  },
  {
    label: "Quản lý cá nhân",
    items: [
      { href: "/buyer/consent", label: "Đồng ý & Quyền riêng tư", icon: ShieldCheck },
      { href: "/buyer/support", label: "Hỗ trợ & Khiếu nại", icon: LifeBuoy },
      { href: "/buyer/docs", label: "Tài liệu & API Docs", icon: FileText },
      { href: "/buyer/settings", label: "Cài đặt tài khoản", icon: Settings2 },
    ],
  },
];

export const buyerHomeMetrics: BuyerMetric[] = [
  {
    label: "Dịch vụ đang sử dụng",
    value: "12",
    delta: "+8.2%",
    detail: "so với tháng trước",
    tone: "blue",
    icon: Database,
  },
  {
    label: "Lượt gọi API (30 ngày)",
    value: "248.512",
    delta: "+23.5%",
    detail: "tăng trưởng",
    tone: "emerald",
    icon: LineChart,
  },
  {
    label: "Dữ liệu tải về",
    value: "47,2 GB",
    delta: "-4.1%",
    detail: "so với tháng trước",
    tone: "amber",
    icon: Boxes,
  },
  {
    label: "Chi phí tháng này",
    value: "28.450.000 ₫",
    delta: "+12.3%",
    detail: "so với tháng trước",
    tone: "amber",
    icon: ClipboardList,
  },
];

export const buyerAnalyticsMetrics: BuyerMetric[] = [
  {
    label: "Tổng lượt gọi API",
    value: "248.512",
    delta: "+23.5%",
    detail: "tăng trưởng",
    tone: "blue",
    icon: LineChart,
  },
  {
    label: "Thời gian phản hồi TB",
    value: "124ms",
    delta: "-8.2%",
    detail: "nhanh hơn",
    tone: "emerald",
    icon: Bell,
  },
  {
    label: "Tỷ lệ lỗi",
    value: "0,12%",
    delta: "-45.1%",
    detail: "giảm mạnh",
    tone: "rose",
    icon: ShieldCheck,
  },
  {
    label: "Uptime",
    value: "99,98%",
    delta: "+0.1%",
    detail: "ổn định",
    tone: "amber",
    icon: KeyRound,
  },
];

export const buyerUsageStats = [
  { label: "Đỉnh / ngày", value: "15.600" },
  { label: "Trung bình / ngày", value: "8.284" },
  { label: "Lỗi 4xx/5xx", value: "0,12%" },
  { label: "Thời gian trả lời", value: "124ms" },
];

export const buyerTopEndpoints: BuyerEndpoint[] = [
  { label: "DS tra cứu doanh nghiệp", value: "82.400", percent: 100, tone: "blue" },
  { label: "Xác thực CCCD/VNeID", value: "64.200", percent: 78, tone: "emerald" },
  { label: "Mã số thuế cá nhân", value: "48.100", percent: 58, tone: "amber" },
  { label: "BHXH tra cứu", value: "32.600", percent: 40, tone: "rose" },
  { label: "Hộ tịch trực tuyến", value: "21.200", percent: 28, tone: "violet" },
];

export const buyerApiDistribution: BuyerEndpoint[] = [
  { label: "/v1/vneid/verify", value: "82.400", percent: 100, tone: "blue" },
  { label: "/v1/company/search", value: "64.200", percent: 79, tone: "emerald" },
  { label: "/v1/tax/lookup", value: "48.100", percent: 58, tone: "amber" },
  { label: "/v1/bhxh/history", value: "32.600", percent: 39, tone: "rose" },
  { label: "/v1/resident/info", value: "21.200", percent: 26, tone: "violet" },
];

export const buyerRecentServices = [
  {
    code: "DV-TCKT-001",
    title: "Tra cứu thông tin doanh nghiệp",
    provider: "Tổng cục Thống kê",
    expiry: "15/08/2026",
    usage: 78,
    status: "Đang hoạt động",
  },
  {
    code: "DV-DC-042",
    title: "Xác thực CCCD/VNeID",
    provider: "Cục Cảnh sát QLHC",
    expiry: "22/08/2026",
    usage: 62,
    status: "Đang hoạt động",
  },
  {
    code: "DV-TC-118",
    title: "Mã số thuế cá nhân",
    provider: "Tổng cục Thuế",
    expiry: "10/06/2026",
    usage: 86,
    status: "Sắp hết hạn",
  },
];

export const buyerHomeAlerts = [
  {
    title: "Quota DV-TCKT-001 đã dùng 82%",
    description: "Cân nhắc nâng gói để tránh gián đoạn trong tuần tới.",
    time: "5 phút trước",
    tone: "amber" as const,
    href: "/buyer/subscriptions",
  },
  {
    title: "3 offers mới cho RFQ-2026-04-0148",
    description: "2 bên bán mới vừa chào giá cho nhu cầu tài chính của bạn.",
    time: "1 giờ trước",
    tone: "blue" as const,
    href: "/buyer/demands",
  },
  {
    title: "Consent CR-2026-03-0892 sắp hết hạn",
    description: "Gia hạn hoặc cấp lại consent để không gián đoạn luồng chấm điểm.",
    time: "Hôm nay",
    tone: "rose" as const,
    href: "/buyer/consent",
  },
];

export const buyerComplianceItems = [
  { label: "Consent còn hiệu lực", value: "24", detail: "3 consent cần gia hạn trong 30 ngày" },
  { label: "Audit log đồng bộ", value: "100%", detail: "Mọi request đều có trace ID và lý do truy cập" },
  { label: "Chính sách dữ liệu", value: "Đạt chuẩn", detail: "Tuân thủ NĐ13/2023 và BVDLCN 2025" },
];

export const buyerQuickActions = [
  { label: "Mở catalog", description: "Tìm thêm dịch vụ dữ liệu mới", href: "/buyer/catalog" },
  { label: "Tạo API key", description: "Cấp key cho môi trường tích hợp", href: "/buyer/api-keys" },
  { label: "Đăng nhu cầu mua", description: "Nhận chào giá từ sellers", href: "/buyer/demands" },
  { label: "Nạp ví SDL", description: "Bổ sung số dư để thanh toán", href: "/buyer/wallet" },
];

export const buyerNotifications = [
  {
    id: "quota",
    title: "Quota DV-TCKT-001 đã dùng 82%",
    description:
      "Bạn đã gọi 82.400/100.000 API calls trong tháng 4. Cân nhắc nâng gói để tránh gián đoạn.",
    category: "Quan trọng",
    time: "5 phút trước",
    tone: "amber" as const,
    unread: true,
    href: "/buyer/subscriptions",
  },
  {
    id: "auction",
    title: "Bạn đã bị vượt giá trong phiên AUC-2026-0412",
    description:
      "Một bidder khác vừa đặt 1,29 tỷ VNĐ. Giá của bạn là 1,15 tỷ. Đặt giá mới để tiếp tục tham gia.",
    category: "Quan trọng",
    time: "18 phút trước",
    tone: "amber" as const,
    unread: true,
    href: "/buyer/auctions/AUC-2026-0412",
  },
  {
    id: "rfq",
    title: "3 offers mới cho RFQ-2026-04-0148",
    description:
      "CTCP Dữ liệu Tài chính Việt (Platinum · AI Match 96%) và 2 bên bán khác vừa gửi chào giá.",
    category: "RFQ & Offers",
    time: "1 giờ trước",
    tone: "blue" as const,
    unread: true,
    href: "/buyer/demands/RFQ-2026-04-0148",
  },
  {
    id: "expiry",
    title: "Dịch vụ DV-TC-118 sắp hết hạn",
    description:
      "Dịch vụ 'Mã số thuế cá nhân' sẽ hết hạn sau 14 ngày (10/06/2026). Gia hạn ngay để tránh gián đoạn.",
    category: "Quota & Hết hạn",
    time: "2 giờ trước",
    tone: "amber" as const,
    href: "/buyer/subscriptions",
  },
  {
    id: "security",
    title: "Phát hiện đăng nhập mới từ thiết bị chưa xác minh",
    description:
      "Tài khoản vừa đăng nhập từ Chrome trên Windows tại Hà Nội. Nếu không phải bạn, hãy đổi khóa ngay.",
    category: "Bảo mật",
    time: "Hôm qua",
    tone: "rose" as const,
    href: "/buyer/settings",
  },
];

export const buyerNotificationFilters = [
  { label: "Tất cả", value: "10" },
  { label: "Chưa đọc", value: "5" },
  { label: "Quan trọng", value: "3" },
  { label: "Đấu giá", value: "1" },
  { label: "Quota & Hết hạn", value: "2" },
  { label: "RFQ & Offers", value: "1" },
  { label: "Bảo mật", value: "1" },
  { label: "Hệ thống", value: "5" },
];

export const buyerCatalogCategories = [
  { label: "Dân cư", count: "124 DV", icon: Database },
  { label: "Doanh nghiệp", count: "98 DV", icon: Building2 },
  { label: "Tài chính", count: "76 DV", icon: LineChart },
  { label: "Y tế", count: "64 DV", icon: HeartPulse },
  { label: "Giao thông", count: "52 DV", icon: Map },
  { label: "Giáo dục", count: "48 DV", icon: GraduationCap },
  { label: "Đất đai", count: "41 DV", icon: Landmark },
  { label: "Năng lượng", count: "38 DV", icon: Bell },
];

export const buyerPopularSearches = [
  "VNeID",
  "CCCD",
  "Mã số thuế",
  "Hộ khẩu",
  "BHXH",
  "Đăng ký xe",
];

export const buyerCatalogServices = [
  {
    id: "vneid",
    code: "DV-DC-001",
    title: "Xác thực định danh công dân qua VNeID",
    provider: "Cục Cảnh sát QLHC về TTXH",
    domain: "Dân cư",
    delivery: "API",
    tags: ["Chính thống", "FAPI 2.0", "Real-time", "Yêu cầu consent"],
    rating: "4.9",
    traffic: "12.4K/ngày",
    price: "200 ₫",
    unit: "/call",
  },
  {
    id: "business",
    code: "DV-DN-042",
    title: "Tra cứu thông tin doanh nghiệp & ngành nghề",
    provider: "Cục Quản lý Đăng ký Kinh doanh",
    domain: "Doanh nghiệp",
    delivery: "API + CSV",
    tags: ["Chính thống", "Cập nhật hàng ngày"],
    rating: "4.8",
    traffic: "8.2K/ngày",
    price: "500 ₫",
    unit: "/call",
  },
  {
    id: "tax",
    code: "DV-TC-118",
    title: "Mã số thuế cá nhân & tình trạng hoạt động",
    provider: "Tổng cục Thuế",
    domain: "Tài chính",
    delivery: "API",
    tags: ["Consent", "SLA 99.9%", "Audit log"],
    rating: "4.7",
    traffic: "5.4K/ngày",
    price: "250 ₫",
    unit: "/call",
  },
  {
    id: "bhxh",
    code: "DV-YT-087",
    title: "Tra cứu lịch sử BHXH và tình trạng tham gia",
    provider: "Bảo hiểm Xã hội Việt Nam",
    domain: "Y tế",
    delivery: "API",
    tags: ["Theo hồ sơ", "Làm tươi 24h"],
    rating: "4.6",
    traffic: "3.1K/ngày",
    price: "320 ₫",
    unit: "/call",
  },
  {
    id: "household",
    code: "DV-DC-015",
    title: "Hộ tịch điện tử & thông tin hộ gia đình",
    provider: "Bộ Tư pháp",
    domain: "Dân cư",
    delivery: "API",
    tags: ["Real-time", "Yêu cầu consent"],
    rating: "4.6",
    traffic: "2.7K/ngày",
    price: "280 ₫",
    unit: "/call",
  },
  {
    id: "registry",
    code: "DV-GT-021",
    title: "Đăng ký xe và lịch sử phương tiện",
    provider: "Cục CSGT",
    domain: "Giao thông",
    delivery: "API",
    tags: ["Chính thống", "FAPI 2.0"],
    rating: "4.5",
    traffic: "1.9K/ngày",
    price: "340 ₫",
    unit: "/call",
  },
];

export const buyerCatalogPagination = ["1", "2", "3", "4", "5", "6"];

export const buyerSubscriptions = [
  {
    id: "sub-vneid",
    code: "DV-DC-001",
    title: "Xác thực định danh VNeID",
    provider: "Cục Cảnh sát QLHC",
    plan: "Doanh nghiệp",
    status: "Hoạt động",
    autoRenew: true,
    limitUsed: 82,
    limitLabel: "82.400",
    limitMax: "100.000",
    calls30d: "248.512",
    callDelta: "↑ 12% so với tháng trước",
    price: "18.000.000 ₫",
    cycle: "12 tháng",
    renewal: "15/08/2026",
  },
  {
    id: "sub-business",
    code: "DV-DN-042",
    title: "Tra cứu thông tin doanh nghiệp",
    provider: "Cục QLĐKKD",
    plan: "Tiêu chuẩn",
    status: "Hoạt động",
    autoRenew: true,
    limitUsed: 46,
    limitLabel: "23.100",
    limitMax: "50.000",
    calls30d: "82.400",
    callDelta: "↑ 12% so với tháng trước",
    price: "9.500.000 ₫",
    cycle: "12 tháng",
    renewal: "30/12/2026",
  },
  {
    id: "sub-tax",
    code: "DV-TC-118",
    title: "Mã số thuế cá nhân & tình trạng",
    provider: "Tổng cục Thuế",
    plan: "Doanh nghiệp",
    status: "Sắp hết hạn",
    autoRenew: false,
    limitUsed: 91,
    limitLabel: "91.200",
    limitMax: "100.000",
    calls30d: "91.220",
    callDelta: "↑ 4% so với tháng trước",
    price: "12.000.000 ₫",
    cycle: "12 tháng",
    renewal: "10/06/2026",
  },
];

export const buyerApiKeys = [
  {
    id: "key-prod",
    name: "Production KYC",
    prefix: "sdl_live_7f4a...",
    scope: "VNeID, Thuế, DN",
    calls30d: "124.580",
    createdAt: "02/02/2026",
    status: "Hoạt động",
  },
  {
    id: "key-staging",
    name: "Staging Integration",
    prefix: "sdl_test_9b2e...",
    scope: "VNeID only",
    calls30d: "12.340",
    createdAt: "15/02/2026",
    status: "Hoạt động",
  },
  {
    id: "key-analytics",
    name: "Analytics Batch",
    prefix: "sdl_live_4c8d...",
    scope: "Tất cả (read-only)",
    calls30d: "89.120",
    createdAt: "20/03/2026",
    status: "Hoạt động",
  },
  {
    id: "key-legacy",
    name: "Legacy Backup",
    prefix: "sdl_live_1a3f...",
    scope: "VNeID, Thuế",
    calls30d: "0",
    createdAt: "10/11/2025",
    status: "Đã thu hồi",
  },
];

export const buyerHeatmapRows = [
  [24, 36, 18, 42, 16, 38, 34, 8, 62, 78, 70, 75, 48, 76, 28, 34, 32, 58, 41, 26, 22, 20, 18, 12],
  [40, 18, 42, 12, 46, 44, 30, 14, 68, 56, 74, 52, 70, 36, 44, 69, 55, 66, 37, 28, 30, 26, 22, 34],
  [10, 42, 24, 8, 18, 26, 44, 10, 72, 60, 58, 54, 66, 22, 30, 24, 44, 28, 40, 36, 12, 20, 9, 22],
  [34, 26, 32, 38, 20, 14, 22, 11, 48, 52, 46, 68, 20, 14, 12, 30, 62, 54, 36, 18, 16, 6, 8, 10],
  [28, 18, 20, 14, 25, 28, 18, 15, 36, 44, 58, 40, 18, 14, 76, 30, 28, 24, 62, 18, 22, 10, 4, 14],
  [18, 20, 14, 18, 24, 30, 26, 17, 40, 38, 46, 34, 16, 12, 68, 24, 20, 18, 44, 16, 18, 10, 6, 8],
];

export const buyerTrendBars = [14, 16, 15, 18, 17, 19, 22, 20, 24, 23, 26, 29];

export const buyerSandboxFeatures = [
  {
    eyebrow: "Sandbox Environment",
    title: "Thử nghiệm an toàn",
    description: "Dữ liệu mẫu ẩn danh + API endpoint giống production · Miễn phí 1.000 calls · Không tính quota",
  },
  {
    eyebrow: "Clean Room",
    title: "Phân tích không sao chép",
    description: "Truy vấn trực tiếp trên dữ liệu gốc mà không cần sao chép",
  },
  {
    eyebrow: "Tuân thủ BVDLCN 2025",
    title: "Zero data leakage",
    description: "Chỉ kết quả tổng hợp rời Clean Room · Không export raw · Audit đầy đủ · NDAChain",
  },
];

export const buyerSandboxMetrics: BuyerMetric[] = [
  { label: "Sessions đang hoạt động", value: "5", tone: "blue", icon: FlaskConical },
  { label: "Queries hôm nay", value: "128", tone: "emerald", icon: Search },
  { label: "Privacy budget còn", value: "62%", tone: "amber", icon: ShieldCheck },
  { label: "Datasets khả dụng", value: "42", tone: "violet", icon: Database },
];

export const buyerSandboxSessions = [
  {
    code: "SBX-2026-04-0142",
    status: "Hoạt động",
    title: "Test KYC workflow với VNeID",
    dataset: "DV-DC-001 (10K bản ghi mẫu)",
    meta: "248 queries · Hết hạn 15/04/2026",
    href: "/buyer/sandbox/SBX-2026-04-0142",
  },
  {
    code: "SBX-2026-04-0138",
    status: "Hoạt động",
    title: "Validate schema Tax Lookup",
    dataset: "DV-TC-118",
    meta: "82 queries · Hết hạn 20/04/2026",
    href: "/buyer/sandbox/SBX-2026-04-0138",
  },
  {
    code: "SBX-2026-04-0128",
    status: "Kết thúc",
    title: "Integration test BHXH",
    dataset: "DV-BHXH-007",
    meta: "0 queries · Hết hạn Đã kết thúc",
    href: "/buyer/sandbox/SBX-2026-04-0128",
  },
];

export const buyerCleanRooms = [
  {
    code: "CR-2026-04-0082",
    status: "Hoạt động",
    mode: "SMPC + DP",
    title: "Phân tích rủi ro tín dụng SME",
    datasets: ["DV-TCKT-001", "DV-DN-042"],
    epsilon: "1",
    delta: "1e-5",
    budget: "62%",
  },
  {
    code: "CR-2026-04-0074",
    status: "Hoạt động",
    mode: "Federated Query",
    title: "Đối soát nợ xấu theo vùng",
    datasets: ["DV-TC-118", "DV-DC-001"],
    epsilon: "1.4",
    delta: "1e-6",
    budget: "74%",
  },
];

export const buyerPrivacyNotes = [
  {
    title: "Hạn mức riêng tư (Privacy Budget)",
    description:
      "Tổng lượng ε được phép tiêu thụ trong một session. Mỗi query tiêu một phần hạn mức. Khi dùng hết, session đóng để ngăn rò rỉ tích lũy khi chạy quá nhiều query.",
  },
  {
    title: "Ví dụ",
    description: "budget = 5.0 ε · query 1 tiêu 0.08 · query 2 tiêu 0.12 · ... khi cạn phải mở session mới.",
  },
];

export const buyerAuctionMetrics: BuyerMetric[] = [
  { label: "Đang tham gia", value: "3", tone: "blue", icon: Gavel },
  { label: "Đang thắng", value: "1", tone: "emerald", icon: ShieldCheck },
  { label: "Đã thắng tháng này", value: "2", tone: "amber", icon: Database },
  { label: "Đã chi đấu giá 2026", value: "2.830.000.000 ₫", tone: "violet", icon: Wallet },
];

export const buyerAuctionFilters = [
  { label: "Đang diễn ra", value: "3" },
  { label: "Đã theo dõi", value: "8" },
  { label: "Đã thắng", value: "2" },
  { label: "Đã thua", value: "5" },
];

export const buyerAuctionItems = [
  {
    code: "AUC-2026-0412",
    badge: "🔴 LIVE",
    domain: "Tài chính",
    status: "Bạn xếp #3",
    title: "Bộ dữ liệu lịch sử giao dịch CK 2020-2025",
    seller: "CTCP Dữ liệu Tài chính Việt",
    bidders: "8 người đấu",
    remaining: "Còn 2d 14h 32m",
    opening: "500.000.000 ₫",
    current: "1.240.000.000 ₫",
    currentDelta: "+148% khởi điểm",
    mine: "1.150.000.000 ₫",
    ranking: "#3 / 8",
  },
  {
    code: "AUC-2026-0418",
    badge: "🔴 LIVE",
    domain: "Tài chính",
    status: "👑 Bạn đang dẫn đầu",
    title: "Báo cáo tín dụng SME toàn quốc Q1/2026",
    seller: "CTCP Dữ liệu Tài chính Việt",
    bidders: "5 người đấu",
    remaining: "Còn 5d 2h 11m",
    opening: "300.000.000 ₫",
    current: "680.000.000 ₫",
    currentDelta: "+126% khởi điểm",
    mine: "680.000.000 ₫",
    ranking: "#1 / 5",
  },
];

export const buyerCartItems = [
  {
    code: "DV-DC-001",
    badge: "Consent",
    title: "Xác thực định danh công dân qua VNeID",
    provider: "Cục Cảnh sát QLHC về TTXH",
    plan: "Gói Doanh nghiệp · 100.000 calls/tháng · 12 tháng",
    price: "18.000.000 ₫",
  },
  {
    code: "DV-DN-042",
    title: "Tra cứu thông tin doanh nghiệp",
    provider: "Cục QLĐKKD",
    plan: "Gói Tiêu chuẩn · 50.000 calls/tháng · 12 tháng",
    price: "9.500.000 ₫",
  },
  {
    code: "DV-GD-089",
    title: "Danh mục trường học toàn quốc",
    provider: "Bộ Giáo dục & Đào tạo",
    plan: "Open Data · Tải về định kỳ · Không thời hạn",
    price: "Miễn phí",
  },
];

export const buyerCartConsentChecks = [
  "Tôi cam kết sử dụng dữ liệu đúng mục đích đã đăng ký, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và Luật Bảo vệ Dữ liệu Cá nhân 2025.",
  "Tôi đồng ý với Thỏa thuận cấp phép dữ liệu và các điều khoản Usage Control: không chuyển tiếp cho bên thứ ba, tự động xóa khi hết hạn hợp đồng.",
  "Đăng ký nhận báo cáo tháng về lưu lượng khai thác và hóa đơn điện tử qua email.",
];

export const buyerCartSummary = [
  { label: "Tạm tính", value: "27.500.000 ₫" },
  { label: "VAT (8%)", value: "2.200.000 ₫" },
  { label: "Phí nền tảng", value: "Miễn phí" },
  { label: "Tổng cộng", value: "29.700.000 ₫", emphasized: true },
];

export const buyerPaymentMethods = [
  { label: "Ví điện tử SDL (52.4M VNĐ)", selected: true },
  { label: "Chuyển khoản ngân hàng" },
  { label: "Thẻ tín dụng / Visa / MC" },
];

export const buyerDemandMetrics: BuyerMetric[] = [
  { label: "Đang mở", value: "3", tone: "blue", icon: ClipboardList },
  { label: "Tổng offers nhận", value: "27", tone: "emerald", icon: Bell },
  { label: "Đã ký kết deal", value: "8", tone: "amber", icon: ShieldCheck },
  { label: "Tổng budget 2026", value: "8.450.000.000 ₫", tone: "violet", icon: Wallet },
];

export const buyerDemandFilters = [
  { label: "Tất cả", value: "5" },
  { label: "Đang mở", value: "2" },
  { label: "Đang đàm phán", value: "1" },
  { label: "Đã ký kết", value: "1" },
  { label: "Bản nháp", value: "1" },
];

export const buyerDemandItems = [
  {
    code: "RFQ-2026-04-0148",
    domain: "Tài chính",
    visibility: "Công khai",
    status: "Đang mở",
    title: "Cần dữ liệu giao dịch thẻ tín dụng 2023-2025",
    timeline: "Đăng 2 giờ trước · Còn 10 ngày",
    budget: "2.500.000.000 ₫",
    offers: "8 chào giá",
    match: "95%",
    deadline: "15/04/2026",
  },
  {
    code: "RFQ-2026-04-0142",
    domain: "Y tế",
    visibility: "Công khai",
    status: "Đang đàm phán",
    title: "Bộ dữ liệu y tế cộng đồng 63 tỉnh thành",
    timeline: "Đăng 1 ngày trước · Còn 15 ngày",
    budget: "800.000.000 ₫",
    offers: "4 chào giá",
    match: "82%",
    deadline: "20/04/2026",
  },
  {
    code: "RFQ-2026-04-0138",
    domain: "Giao thông",
    visibility: "Riêng tư (mời)",
    status: "Đang mở",
    title: "Dữ liệu giao thông & mật độ dân cư Hà Nội",
    timeline: "Đăng 2 ngày trước · Còn 20 ngày",
    budget: "1.200.000.000 ₫",
    offers: "5 chào giá",
    match: "88%",
    deadline: "25/04/2026",
  },
];

export const buyerOrderMetrics: BuyerMetric[] = [
  { label: "Tổng đơn hàng", value: "248", tone: "blue", icon: FileText },
  { label: "Hoàn tất tháng này", value: "42", tone: "emerald", icon: ShieldCheck },
  { label: "Đang xử lý", value: "5", tone: "amber", icon: ClipboardList },
  { label: "Tổng chi 2026", value: "284.500.000 ₫", tone: "violet", icon: Wallet },
];

export const buyerOrderRows = [
  {
    code: "ORD-2026-04-12847",
    createdAt: "05/04/2026",
    provider: "Tổng cục Thống kê",
    count: "3",
    delivery: "API",
    total: "30.780.000 ₫",
    contract: "HĐ-2026-0412",
    invoice: "HD-04-00842",
    status: "Hoàn tất",
  },
  {
    code: "ORD-2026-04-12825",
    createdAt: "03/04/2026",
    provider: "CTCP Dữ liệu Tài chính",
    count: "1",
    delivery: "CSV",
    total: "48.000.000 ₫",
    contract: "HĐ-2026-0403",
    invoice: "HD-04-00819",
    status: "Hoàn tất",
  },
  {
    code: "ORD-2026-04-12801",
    createdAt: "01/04/2026",
    provider: "Cục QLĐKKD",
    count: "2",
    delivery: "API",
    total: "15.400.000 ₫",
    contract: "HĐ-2026-0401",
    invoice: "HD-04-00791",
    status: "Đang bàn giao",
  },
  {
    code: "ORD-2026-03-12780",
    createdAt: "28/03/2026",
    provider: "Tổng cục Thuế",
    count: "1",
    delivery: "API",
    total: "12.000.000 ₫",
    contract: "HĐ-2026-0328",
    invoice: "—",
    status: "Đang xử lý",
  },
];

export const buyerWalletMetrics: BuyerMetric[] = [
  { label: "Tổng nạp 2026", value: "520.000.000 ₫", tone: "emerald", icon: Wallet },
  { label: "Tổng chi 2026", value: "284.500.000 ₫", tone: "blue", icon: CreditCard },
  { label: "Hoàn tiền", value: "6.500.000 ₫", tone: "amber", icon: Database },
  { label: "Điểm thưởng SDL", value: "12.480", tone: "violet", icon: ShieldCheck },
];

export const buyerWalletTransactions = [
  { title: "Thanh toán ORD-2026-04-12847", meta: "TX-2026-04-04821 · 05/04 14:32 · Ví SDL", value: "-30.780.000 ₫" },
  { title: "Nạp tiền từ Vietcombank", meta: "TX-2026-04-04802 · 04/04 09:15 · Chuyển khoản", value: "+50.000.000 ₫" },
  { title: "Thanh toán ORD-2026-04-12825", meta: "TX-2026-04-04798 · 03/04 16:44 · Ví SDL", value: "-48.000.000 ₫" },
  { title: "Hoàn tiền ORD-2026-03-12698", meta: "TX-2026-04-04784 · 02/04 11:20 · Ví SDL", value: "+6.500.000 ₫" },
  { title: "Nạp tiền từ MB Bank", meta: "TX-2026-04-04771 · 01/04 08:50 · QR Code", value: "+30.000.000 ₫" },
  { title: "Thanh toán ORD-2026-03-12780", meta: "TX-2026-03-04752 · 28/03 15:10 · Ví SDL", value: "-12.000.000 ₫" },
];

export const buyerWalletMethods = [
  { label: "Vietcombank", detail: "••••3847", tag: "Mặc định" },
  { label: "MB Bank", detail: "••••9120" },
  { label: "Visa Corporate", detail: "••••2048" },
];

export const buyerBillingProfile = {
  company: "Công ty TNHH FinTech Việt",
  taxCode: "0108234567",
  address: "Số 88 Láng Hạ, Ba Đình, Hà Nội",
  email: "finance@fintech.vn",
};

export const buyerConsentMetrics: BuyerMetric[] = [
  { label: "Đồng ý đang hiệu lực", value: "24", tone: "blue", icon: ShieldCheck },
  { label: "Sắp hết hạn (30 ngày)", value: "3", tone: "amber", icon: Bell },
  { label: "Đã thu hồi", value: "12", tone: "rose", icon: ClipboardList },
  { label: "Consent Receipts", value: "248", tone: "violet", icon: FileText },
];

export const buyerConsentRows = [
  {
    code: "CR-2026-04-0124",
    service: "Xác thực VNeID",
    purpose: "KYC khách hàng",
    scope: "CCCD, họ tên, DOB",
    issuedAt: "02/04/2026",
    expiresAt: "02/04/2027",
    status: "Hiệu lực",
  },
  {
    code: "CR-2026-04-0118",
    service: "Mã số thuế cá nhân",
    purpose: "Xác minh khách hàng",
    scope: "MST, tình trạng",
    issuedAt: "28/03/2026",
    expiresAt: "28/03/2027",
    status: "Hiệu lực",
  },
  {
    code: "CR-2026-03-0892",
    service: "Tra cứu BHXH",
    purpose: "Cho vay tiêu dùng",
    scope: "Quá trình đóng BHXH",
    issuedAt: "15/03/2026",
    expiresAt: "15/09/2026",
    status: "Hiệu lực",
  },
  {
    code: "CR-2026-03-0721",
    service: "Hộ tịch điện tử",
    purpose: "Xác minh gia đình",
    scope: "Thông tin hộ khẩu",
    issuedAt: "10/03/2026",
    expiresAt: "10/03/2026",
    status: "Hết hạn",
  },
  {
    code: "CR-2026-02-0412",
    service: "Dữ liệu tín dụng CIC",
    purpose: "Đánh giá rủi ro",
    scope: "Điểm tín dụng",
    issuedAt: "05/02/2026",
    expiresAt: "—",
    status: "Đã thu hồi",
  },
];

export const buyerSupportMetrics: BuyerMetric[] = [
  { label: "Ticket đang mở", value: "2", tone: "blue", icon: LifeBuoy },
  { label: "Đã giải quyết", value: "48", tone: "emerald", icon: ShieldCheck },
  { label: "Thời gian phản hồi TB", value: "1h 24m", tone: "amber", icon: Bell },
  { label: "Mức độ hài lòng", value: "4,8 ★", tone: "violet", icon: ClipboardList },
];

export const buyerSupportTickets = [
  {
    code: "TKT-2026-04-1284",
    priority: "Ưu tiên cao",
    status: "Đang xử lý",
    title: "Lỗi timeout khi gọi /v1/vneid/verify",
    meta: "Dịch vụ: DV-DC-001 · Tạo 2 giờ trước · 3 phản hồi",
  },
  {
    code: "TKT-2026-04-1278",
    priority: "Trung bình",
    status: "Chờ phản hồi",
    title: "Yêu cầu tăng hạn mức lên 200K calls/tháng",
    meta: "Dịch vụ: DV-TC-118 · Tạo 8 giờ trước · 1 phản hồi",
  },
  {
    code: "TKT-2026-04-1265",
    priority: "Ưu tiên cao",
    status: "Đã giải quyết",
    title: "Khiếu nại chất lượng dữ liệu doanh nghiệp",
    meta: "Dịch vụ: DV-DN-042 · Tạo 2 ngày trước · 8 phản hồi",
  },
];

export const buyerSupportChannels = [
  { label: "Hotline 24/7", value: "1900 0368" },
  { label: "Email hỗ trợ", value: "support@sdl.gov.vn" },
  { label: "Chat trực tuyến", value: "● Đang hoạt động" },
];

export const buyerDocCategories = [
  { label: "Bắt đầu nhanh", count: "12 bài viết" },
  { label: "Xác thực & Token", count: "8 bài viết" },
  { label: "API Reference", count: "662 bài viết" },
  { label: "Bảo mật & Compliance", count: "18 bài viết" },
  { label: "SDK & Libraries", count: "6 bài viết" },
  { label: "Webhooks & Events", count: "14 bài viết" },
];

export const buyerQuickstartSteps = [
  {
    step: "1",
    title: "Tạo API Key",
    snippet:
      'Vào trang /buyer/api-keys và nhấn "Tạo API Key mới". Lưu key an toàn vì chỉ hiển thị 1 lần.\nSDL_API_KEY=sdl_live_7f4a8b2c9d3e1f5a6b8c9d0e1f2a3b4c',
  },
  {
    step: "2",
    title: "Gọi API đầu tiên (cURL)",
    snippet:
      "curl -X POST https://api.sdl.gov.vn/v1/vneid/verify \\\n  -H \"Authorization: Bearer $SDL_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{ \"cccd\": \"079123456789\", \"purpose\": \"KYC\" }'",
  },
  {
    step: "3",
    title: "Nhận response",
    snippet:
      '{ "verified": true, "data": { "ho_ten": "NGUYEN VAN AN", "ngay_sinh": "1990-05-15", "quoc_tich": "Việt Nam" }, "consent_receipt": "CR-2026-04-0124", "rate_limit_remaining": 982 }',
  },
];

export const buyerSdkItems = [
  { name: "Node.js / TypeScript", packageName: "@sdl/node-sdk", version: "v2.4.1" },
  { name: "Python", packageName: "sdl-python", version: "v2.3.8" },
  { name: "Java", packageName: "vn.sdl:sdl-java", version: "v2.4.0" },
  { name: ".NET / C#", packageName: "SDL.VietNam", version: "v2.3.5" },
  { name: "Go", packageName: "github.com/sdl/go-sdk", version: "v2.4.2" },
  { name: "PHP", packageName: "sdl/php-sdk", version: "v2.2.9" },
];

export const buyerSettingsTabs = [
  "Tổ chức",
  "Thành viên & Phân quyền",
  "Bảo mật",
  "Thông báo",
  "Hiển thị & Ngôn ngữ",
];

export const buyerCompanyProfile = {
  initials: "FT",
  name: "Công ty TNHH FinTech Việt",
  englishName: "FinTech Vietnam Co., Ltd",
  taxCode: "0108234567",
  entityType: "Công ty TNHH",
  address: "Tầng 15, Tòa nhà Việt Tower, Số 88 Láng Hạ, Phường Láng Hạ, Quận Đống Đa, Hà Nội",
  website: "https://fintech.vn",
  domain: "Tài chính công nghệ (FinTech)",
  employees: "120",
  foundedYear: "2019",
  description:
    "FinTech Việt là nền tảng cung cấp dịch vụ cho vay tiêu dùng online và xác thực danh tính cho các doanh nghiệp tài chính.",
};
