import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Clock,
  Code2,
  GitBranch,
  ShieldCheck,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductTone = "emerald" | "amber" | "blue" | "rose";

export type Product = {
  id: string;
  category: string;
  type: string;
  status: string;
  tone: ProductTone;
  name: string;
  desc: string;
  price: string;
  downloads: string;
  rating: string;
};

export type CreateStep = {
  n: number;
  label: string;
};

export type BaseProduct = {
  name: string;
  desc: string;
  price: string;
  unit: string;
  orders: number;
  status: string;
};

export type Bundle = {
  name: string;
  items: string;
  basePrice: string;
  price: string;
  sales: number;
  discount: string;
  tone: "amber" | "blue" | "violet";
};

export type Voucher = {
  code: string;
  type: string;
  status: string;
  desc: string;
  used: string;
  exp: string;
};

export type SandboxTool = {
  name: string;
  desc: string;
  icon: LucideIcon;
};

export type ActiveSandbox = {
  id: string;
  name: string;
  status: string;
  tone: ProductTone;
  product: string;
  requests: string;
  started: string;
};

export type Auction = {
  id: string;
  name: string;
  status: string;
  tone: ProductTone;
  sources: number;
  bids: number;
  startPrice: string;
  currentPrice: string;
  topBuyer: string;
  progress: number;
  endsIn: string;
};

// ─── Sản phẩm ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "SP-TC-001",
    category: "Tài chính",
    type: "Tín dụng",
    status: "Đang bán",
    tone: "emerald",
    name: "Báo cáo tín dụng doanh nghiệp toàn diện",
    desc: "Dữ liệu tín dụng DN từ 3 nguồn: CIC, Thuế, BHXH - cập nhật hằng ngày",
    price: "48.500.000 đ",
    downloads: "142 lượt",
    rating: "4.9",
  },
  {
    id: "SP-TC-002",
    category: "Tài chính",
    type: "Chứng khoán",
    status: "Đang bán",
    tone: "emerald",
    name: "Chỉ số thị trường chứng khoán realtime",
    desc: "Dữ liệu giá, khối lượng, chỉ số kỹ thuật realtime HOSE+HNX+UPCOM",
    price: "15.000.000 đ",
    downloads: "89 lượt",
    rating: "4.8",
  },
  {
    id: "SP-TC-003",
    category: "Tài chính",
    type: "Tỷ giá",
    status: "Đang bán",
    tone: "emerald",
    name: "Dữ liệu tỷ giá 28 cặp tiền tệ",
    desc: "Tỷ giá liên ngân hàng và tự do 28 cặp tiền - lịch sử 5 năm",
    price: "5.000.000 đ",
    downloads: "124 lượt",
    rating: "4.7",
  },
  {
    id: "SP-TC-004",
    category: "Tài chính",
    type: "Ngành",
    status: "Đang bán",
    tone: "emerald",
    name: "Báo cáo ngành ngân hàng Q1/2026",
    desc: "Phân tích xu hướng ngành ngân hàng - tổng hợp từ báo cáo tài chính",
    price: "25.000.000 đ",
    downloads: "48 lượt",
    rating: "4.6",
  },
  {
    id: "SP-VT-005",
    category: "Vĩ mô",
    type: "Dự báo kinh tế",
    status: "Chờ kiểm duyệt",
    tone: "amber",
    name: "Dự báo kinh tế vĩ mô 2026-2027",
    desc: "Dự báo GDP, lạm phát, tỷ giá từ 12 mô hình kinh tế lượng",
    price: "30.000.000 đ",
    downloads: "24 lượt",
    rating: "4.8",
  },
  {
    id: "SP-TC-006",
    category: "Tài chính",
    type: "Rủi ro",
    status: "Bản nháp",
    tone: "blue",
    name: "Bộ đầu tư liệu giao dịch 2020-2025",
    desc: "65 triệu giao dịch cổ phiếu với 45 biến đặc trưng cho ML/AI",
    price: "85.000.000 đ",
    downloads: "12 lượt",
    rating: "4.5",
  },
  {
    id: "SP-TC-007",
    category: "Tài chính",
    type: "SME",
    status: "Đang bán",
    tone: "emerald",
    name: "Chỉ số rủi ro tín dụng SME",
    desc: "Score rủi ro cho 2M+ doanh nghiệp vừa và nhỏ - model XGBoost",
    price: "22.000.000 đ",
    downloads: "0 lượt",
    rating: "—",
  },
  {
    id: "SP-TC-008",
    category: "Tài chính",
    type: "Niêm yết",
    status: "Đang bán",
    tone: "emerald",
    name: "DS doanh nghiệp niêm yết HOSE+HNX",
    desc: "Danh sách đầy đủ DN niêm yết với thông tin tài chính cơ bản",
    price: "18.000.000 đ",
    downloads: "154 lượt",
    rating: "4.9",
  },
];

// ─── Quy trình đăng sản phẩm ─────────────────────────────────────────────────

export const createSteps: CreateStep[] = [
  { n: 1, label: "Thông tin cơ bản" },
  { n: 2, label: "Schema & Dữ liệu" },
  { n: 3, label: "Định giá & Gói cước" },
  { n: 4, label: "Cam kết chất lượng" },
  { n: 5, label: "Xuất bản" },
];

// ─── Định giá ─────────────────────────────────────────────────────────────────

export const baseProducts: BaseProduct[] = [
  {
    name: "Báo cáo tín dụng DN toàn diện",
    desc: "SP-TC-001 · Cập nhật hằng ngày",
    price: "48.000.000 đ",
    unit: "/bộ/quý",
    orders: 3,
    status: "Hoạt động",
  },
  {
    name: "Chỉ số thị trường CK realtime",
    desc: "SP-TC-002 · Tức thời",
    price: "15.000.000 đ",
    unit: "/tháng",
    orders: 3,
    status: "Hoạt động",
  },
  {
    name: "Dữ liệu tỷ giá 28 cặp",
    desc: "SP-TC-003 · Cập nhật hằng ngày",
    price: "8.000.000 đ",
    unit: "/tháng",
    orders: 2,
    status: "Hoạt động",
  },
  {
    name: "Bộ DL lịch sử CK 2020-2025",
    desc: "SP-TC-006 · Tĩnh",
    price: "85.000.000 đ",
    unit: "/bộ",
    orders: 1,
    status: "Hoạt động",
  },
];

export const bundles: Bundle[] = [
  {
    name: "Combo Tài chính toàn diện",
    items: "4 sản phẩm",
    basePrice: "156.000.000 đ",
    price: "125.000.000 đ",
    sales: 18,
    discount: "-20% OFF",
    tone: "amber",
  },
  {
    name: "Gói Khởi nghiệp FinTech",
    items: "2 sản phẩm",
    basePrice: "23.000.000 đ",
    price: "18.000.000 đ",
    sales: 42,
    discount: "-22% OFF",
    tone: "blue",
  },
  {
    name: "Enterprise Finance Pack",
    items: "6 sản phẩm",
    basePrice: "320.000.000 đ",
    price: "240.000.000 đ",
    sales: 8,
    discount: "-25% OFF",
    tone: "violet",
  },
];

export const vouchers: Voucher[] = [
  {
    code: "NEWYEAR2026",
    type: "Phần trăm",
    status: "Hết hạn",
    desc: "Giảm 15% cho đơn hàng tháng đầu tiên",
    used: "84/200",
    exp: "28/02/2026",
  },
  {
    code: "PLATINUM10",
    type: "Phần trăm",
    status: "Đang hoạt động",
    desc: "Giảm 10% cho khách hàng Doanh nghiệp",
    used: "24/100",
    exp: "31/12/2026",
  },
  {
    code: "FIRSTORDER",
    type: "Cố định",
    status: "Đang hoạt động",
    desc: "Miễn phí thiết lập cho đơn đầu tiên",
    used: "5/50",
    exp: "31/12/2026",
  },
  {
    code: "SUMMER2026",
    type: "Phần trăm",
    status: "Lên kế hoạch",
    desc: "Khuyến mãi mùa hè - 25% Gói Tiêu chuẩn",
    used: "0/200",
    exp: "31/08/2026",
  },
];

// ─── Sandbox ──────────────────────────────────────────────────────────────────

export const activeSandboxes: ActiveSandbox[] = [
  {
    id: "SBX-007",
    name: "Test SP-TC-007 Schema",
    status: "Hoạt động",
    tone: "emerald",
    product: "SP-TC-007 · 0 lỗi",
    requests: "34 req/phút",
    started: "3 giờ trước",
  },
  {
    id: "SBX-009",
    name: "Load test API credit report",
    status: "Hoạt động",
    tone: "emerald",
    product: "SP-TC-001 · 0 lỗi",
    requests: "120 req/phút",
    started: "1 giờ trước",
  },
  {
    id: "SBX-010",
    name: "Validate breaking changes v2.4",
    status: "Chờ",
    tone: "amber",
    product: "SP-TC-003 · schema check",
    requests: "—",
    started: "—",
  },
];

export const sandboxTools: SandboxTool[] = [
  {
    name: "API Request Tester",
    desc: "Test từng endpoint với custom payload, xem response thực tế",
    icon: Code2,
  },
  {
    name: "Load Testing",
    desc: "Simulate 100-500 concurrent users để test limit & performance",
    icon: Zap,
  },
  {
    name: "Schema Migration Checker",
    desc: "So sánh 2 version schema để phát hiện breaking changes",
    icon: GitBranch,
  },
  {
    name: "Data Validation",
    desc: "Validate file CSV theo DCAT schema, PII detection, quality check",
    icon: ShieldCheck,
  },
  {
    name: "Latency Profiler",
    desc: "Đo latency từng API endpoint real-time trong 60 giây",
    icon: Clock,
  },
  {
    name: "Error Injection",
    desc: "Mô phỏng lỗi mạng, timeout, payload sai để test fallback",
    icon: AlertCircle,
  },
];

// ─── Đấu giá ──────────────────────────────────────────────────────────────────

export const auctions: Auction[] = [
  {
    id: "AUC-2026-003",
    name: "Bộ dữ liệu lịch sử giao dịch CK 2020-2025",
    status: "Đang đấu giá",
    tone: "blue",
    sources: 9,
    bids: 28,
    startPrice: "500.000.000 đ",
    currentPrice: "1.240.000.000 đ",
    topBuyer: "CTCP Chứng khoán SSI",
    progress: 82,
    endsIn: "2 ngày 14 giờ",
  },
  {
    id: "AUC-2026-004",
    name: "Báo cáo tín dụng SME ngành Q1/2026",
    status: "Đang đấu giá",
    tone: "blue",
    sources: 6,
    bids: 16,
    startPrice: "300.000.000 đ",
    currentPrice: "600.000.000 đ",
    topBuyer: "Ngân hàng TMCP BIDV",
    progress: 65,
    endsIn: "4 ngày 8 giờ",
  },
  {
    id: "AUC-2026-002",
    name: "Dữ liệu giao dịch thẻ tín dụng 2024-2025",
    status: "Đang đấu giá",
    tone: "blue",
    sources: 10,
    bids: 35,
    startPrice: "800.000.000 đ",
    currentPrice: "2.150.000.000 đ",
    topBuyer: "VietinBank",
    progress: 88,
    endsIn: "1 ngày 2 giờ",
  },
];
