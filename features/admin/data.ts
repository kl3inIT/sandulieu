import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BellRing,
  BookOpen,
  Building2,
  ChartNoAxesCombined,
  ClipboardCheck,
  Database,
  FileCheck,
  FileSpreadsheet,
  FileSearch,
  FolderTree,
  Gavel,
  Landmark,
  Layers,
  LayoutDashboard,
  Newspaper,
  Receipt,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const adminUser = {
  initials: "LK",
  name: "Lê Minh Khoa",
  unit: "Trung tâm Dữ liệu Quốc gia",
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Tổng quan vận hành",
    items: [
      { href: "/admin", label: "Trung tâm điều hành", icon: LayoutDashboard },
      { href: "/admin/monitoring", label: "Giám sát hệ thống", icon: Activity },
      { href: "/admin/notifications", label: "Thông báo", icon: BellRing, badge: "6" },
    ],
  },
  {
    label: "Dịch vụ dữ liệu CQNN",
    items: [
      { href: "/admin/service-groups", label: "Nhóm dịch vụ", icon: FolderTree, badge: "18" },
      { href: "/admin/services", label: "Catalog dịch vụ", icon: Database, badge: "662" },
      { href: "/admin/services/create", label: "Tạo dịch vụ mới", icon: FolderTree },
      { href: "/admin/datasets", label: "Bộ dữ liệu", icon: Layers, badge: "77" },
      { href: "/admin/reports", label: "Báo cáo CQNN", icon: Receipt },
    ],
  },
  {
    label: "Quản trị người dùng",
    items: [
      { href: "/admin/accounts", label: "Duyệt tài khoản", icon: Users, badge: "24" },
      { href: "/admin/organizations", label: "Tổ chức & CQNN", icon: Building2 },
    ],
  },
  {
    label: "Giao dịch & Thẩm định",
    items: [
      { href: "/admin/auctions", label: "Đấu giá", icon: Gavel },
      { href: "/admin/transactions", label: "Đơn hàng toàn sàn", icon: Wallet, badge: "12" },
      { href: "/admin/moderation", label: "Duyệt sản phẩm seller", icon: ClipboardCheck, badge: "24" },
      { href: "/admin/quality", label: "Hội đồng thẩm định", icon: FileCheck, badge: "12" },
      { href: "/admin/disputes", label: "Khiếu nại & Tranh chấp", icon: ShieldAlert, badge: "3" },
    ],
  },
  {
    label: "Tuân thủ & Bảo mật",
    items: [
      { href: "/admin/consent", label: "Quản lý đồng ý (Consent)", icon: ShieldCheck },
      { href: "/admin/pii", label: "PII Detection Monitor", icon: Shield, badge: "2" },
      { href: "/admin/audit", label: "Nhật ký kiểm toán", icon: FileSearch },
    ],
  },
  {
    label: "Hệ thống",
    items: [
      { href: "/admin/catalogs", label: "Danh mục hệ thống", icon: BookOpen },
      { href: "/admin/news", label: "Tin tức & Thông báo", icon: Newspaper },
      { href: "/admin/pricing", label: "Biểu phí dịch vụ", icon: Landmark },
      { href: "/admin/settings", label: "Cấu hình", icon: Settings },
    ],
  },
];

export const adminMetrics = [
  {
    label: "Giao dịch hôm nay",
    value: "4.812",
    delta: "+18.2%",
    detail: "so với hôm qua",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Tổng tài khoản",
    value: "12.847",
    delta: "+3.4%",
    detail: "+424 tuần này",
    icon: Users,
  },
  {
    label: "Dịch vụ dữ liệu",
    value: "662 + 247",
    delta: "+8.1%",
    detail: "CQNN + thương mại",
    icon: Database,
  },
  {
    label: "GMV tháng 4/2026",
    value: "48.420.000.000 ₫",
    delta: "+28.4%",
    detail: "so với tháng trước",
    icon: FileSpreadsheet,
  },
];

export const adminTransactionStats = [
  { label: "B2B", value: "62%" },
  { label: "G2B", value: "28%" },
  { label: "G2G", value: "10%" },
];

export const adminVolumeStats = [
  { label: "Tổng giao dịch", value: "142.847", detail: "+23% MoM" },
  { label: "API calls", value: "18,4M", detail: "+32% MoM" },
  { label: "Tài khoản hoạt động", value: "8.412", detail: "+12% MoM" },
  { label: "GMV", value: "48,4B₫", detail: "+28% MoM" },
];

export const adminFieldDistribution = [
  ["Dân cư", "124"],
  ["Doanh nghiệp", "98"],
  ["Tài chính", "76"],
  ["Y tế & BHXH", "64"],
  ["Giao thông", "52"],
  ["Giáo dục", "48"],
] as const;

export const adminSystemHealth = [
  ["API Gateway", "99.98%", "18,4M / ngày"],
  ["Hạ tầng NDC + NDAChain", "99.95%", "Uptime 30d"],
  ["Liên thông DMDC", "99.82%", "Sync 2.4K/h"],
  ["Cổng thanh toán", "98.45%", "142 giao dịch/phút"],
  ["VNeID Integration", "99.99%", "68M user KYC"],
  ["CSDL Quốc gia", "99.97%", "Replicated 5 vùng"],
  ["Phòng sạch dữ liệu", "100%", "12 phiên"],
  ["Tiếp nhận CQNN", "99.88%", "Báo cáo định kỳ"],
] as const;

export const adminPendingAccounts = [
  {
    name: "Công ty CP FinTech Việt Nam",
    priority: "Ưu tiên cao",
    detail: "Doanh nghiệp · MST: 0108234567 · Vai trò: Bên mua",
    time: "2 giờ trước",
  },
  {
    name: "Ngân hàng TMCP Quốc tế VN",
    priority: "Ưu tiên cao",
    detail: "Tổ chức tài chính · MST: 0100723054 · Vai trò: Bên mua + bán",
    time: "4 giờ trước",
  },
  {
    name: "Viện Nghiên cứu Kinh tế TW",
    priority: "",
    detail: "Đơn vị nghiên cứu · MST: — · Vai trò: Bên mua",
    time: "6 giờ trước",
  },
  {
    name: "CTCP Dữ liệu Y tế Medatek",
    priority: "",
    detail: "Doanh nghiệp · MST: 0316789012 · Vai trò: Bên bán",
    time: "8 giờ trước",
  },
];

export const adminSecurityAlerts = [
  {
    title: "Rate limit bất thường",
    detail: "IP 14.237.xxx vượt 3x quota trên DV-DC-001",
  },
  {
    title: "Phát hiện PII không hợp lệ",
    detail: "Sản phẩm SP-TC-042 chứa CCCD chưa hash",
  },
  {
    title: "Sync DMDC chậm",
    detail: "Độ trễ 4,2 phút · bình thường <1'",
  },
];

export const adminComplianceStats = [
  ["Consent Log (NĐ 13/2023)", "100%"],
  ["PII Detection", "Bật"],
  ["Nhật ký kiểm toán", "Đầy đủ"],
  ["Data Classification", "3/5 cấp"],
  ["DCAT-VN", "Đang triển khai"],
] as const;

export const adminFootprintStats = [
  ["47", "CQNN cung cấp DL", "Bộ/Sở/Ngành"],
  ["312", "Tổ chức bán DL", "Doanh nghiệp đã duyệt"],
  ["68M+", "Công dân VNeID", "Kết nối consent"],
  ["4", "Liên thông quốc tế", "Nhật, Singapore, EU, Hàn"],
] as const;

export const adminSectionMeta = {
  monitoring: {
    title: "Giám sát hệ thống",
    description: "Theo dõi uptime, liên thông và chất lượng hạ tầng theo thời gian thực.",
  },
  notifications: {
    title: "Thông báo",
    description: "Trung tâm cảnh báo nghiệp vụ, bảo mật và vận hành toàn sàn.",
  },
  "service-groups": {
    title: "Nhóm dịch vụ",
    description: "Quản lý cấu trúc nhóm dịch vụ dữ liệu CQNN theo 18 lĩnh vực.",
  },
  services: {
    title: "Catalog dịch vụ",
    description: "Điều phối danh mục 662 dịch vụ và trạng thái công bố toàn sàn.",
  },
  "services-create": {
    title: "Tạo dịch vụ mới",
    description: "Khởi tạo dịch vụ dữ liệu CQNN mới với metadata và quy trình phê duyệt.",
  },
  datasets: {
    title: "Bộ dữ liệu",
    description: "Quản lý 77 bộ dữ liệu nguồn, tần suất cập nhật và tiêu chuẩn mô tả.",
  },
  reports: {
    title: "Báo cáo CQNN",
    description: "Tổng hợp báo cáo định kỳ, đối soát và xuất bản cho các cơ quan cung cấp dữ liệu.",
  },
  accounts: {
    title: "Duyệt tài khoản",
    description: "Xác minh hồ sơ doanh nghiệp và tổ chức trước khi cấp quyền khai thác.",
  },
  auctions: {
    title: "Đấu giá",
    description: "Theo dõi các phiên đấu giá dữ liệu và can thiệp các trường hợp ngoại lệ.",
  },
  transactions: {
    title: "Đơn hàng toàn sàn",
    description: "Giám sát toàn bộ giao dịch, GMV và trạng thái thanh toán trên sàn.",
  },
  moderation: {
    title: "Duyệt sản phẩm seller",
    description: "Kiểm tra mô tả sản phẩm, metadata và chính sách công bố dữ liệu từ sellers.",
  },
  quality: {
    title: "Hội đồng thẩm định",
    description: "Điều phối quy trình thẩm định chất lượng dữ liệu, pháp lý và SLA.",
  },
  disputes: {
    title: "Khiếu nại & Tranh chấp",
    description: "Xử lý tranh chấp, khiếu nại chất lượng và vi phạm cam kết dữ liệu.",
  },
  consent: {
    title: "Quản lý đồng ý (Consent)",
    description: "Theo dõi consent receipt, hạn hiệu lực và chính sách truy cập dữ liệu cá nhân.",
  },
  pii: {
    title: "PII Detection Monitor",
    description: "Giám sát phát hiện dữ liệu nhạy cảm chưa được chuẩn hóa hoặc ẩn danh.",
  },
  audit: {
    title: "Nhật ký kiểm toán",
    description: "Tra cứu audit trail toàn sàn theo actor, dịch vụ và giao dịch liên quan.",
  },
  catalogs: {
    title: "Danh mục hệ thống",
    description: "Quản trị danh mục dùng chung: lĩnh vực, loại hình tổ chức, taxonomy và chuẩn metadata.",
  },
  news: {
    title: "Tin tức & Thông báo",
    description: "Điều phối các bản tin nội bộ và thông báo hiển thị tới các portal.",
  },
  pricing: {
    title: "Biểu phí dịch vụ",
    description: "Cấu hình biểu phí nền tảng, phí thanh toán và chính sách khuyến mại.",
  },
  settings: {
    title: "Cấu hình",
    description: "Thiết lập vận hành hệ thống, quyền nội bộ và tham số tích hợp nền tảng.",
  },
} as const;

export type AdminSectionKey = keyof typeof adminSectionMeta;

export type AdminSectionSnapshot = {
  accent: string;
  status: string;
  statusTone: "emerald" | "amber" | "blue";
  metrics: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  workQueue: Array<{
    title: string;
    meta: string;
    status: string;
  }>;
  highlights: Array<{
    title: string;
    detail: string;
  }>;
  checklist: Array<{
    label: string;
    value: string;
  }>;
};

export const adminSectionSnapshots: Record<AdminSectionKey, AdminSectionSnapshot> = {
  monitoring: {
    accent: "Realtime hạ tầng",
    status: "14 dịch vụ healthy, 2 degraded",
    statusTone: "amber",
    metrics: [
      { label: "Throughput", value: "8.420 req/s", detail: "peak 12.450 req/s" },
      { label: "Ingress", value: "4,2 Gbps", detail: "30 phút gần nhất" },
      { label: "Kết nối hoạt động", value: "24.840", detail: "api-gateway + partner" },
    ],
    workQueue: [
      { title: "payment-gw timeout tới VNPay", meta: "14:32 · retry 2/3", status: "degraded" },
      { title: "pii-detector cảnh báo SP-TC-042", meta: "14:31 · sample chưa hash", status: "warning" },
      { title: "dmdc-sync đồng bộ chậm 4,2 phút", meta: "SLA < 1 phút", status: "warning" },
    ],
    highlights: [
      { title: "API Gateway", detail: "99,98% uptime · 18,4M request/ngày" },
      { title: "Clean room", detail: "12 phiên đang hoạt động · không lỗi" },
      { title: "Webhook service", detail: "99,12% · hàng đợi ổn định" },
    ],
    checklist: [
      { label: "Alerting", value: "Bật" },
      { label: "SLA nghiệp vụ", value: "Theo dõi" },
      { label: "Log retention", value: "180 ngày" },
      { label: "Escalation", value: "On-call L2" },
    ],
  },
  notifications: {
    accent: "Điều phối cảnh báo",
    status: "6 thông báo chờ xác nhận",
    statusTone: "blue",
    metrics: [
      { label: "Thông báo mới", value: "126", detail: "24 giờ qua" },
      { label: "Cảnh báo ưu tiên", value: "08", detail: "cần phản hồi ngay" },
      { label: "Tỷ lệ gửi thành công", value: "99,4%", detail: "email + in-app" },
    ],
    workQueue: [
      { title: "Cảnh báo quota DV-DC-001", meta: "broadcast tới nhóm vận hành", status: "critical" },
      { title: "Thông báo thay đổi biểu phí tháng 4", meta: "scheduled 16:00", status: "scheduled" },
      { title: "Nhắc phê duyệt 24 hồ sơ account", meta: "segment admin CQNN", status: "draft" },
    ],
    highlights: [
      { title: "Kênh gửi", detail: "In-app, email, webhook nội bộ" },
      { title: "Template hoạt động", detail: "18 template đang dùng" },
      { title: "Retry policy", detail: "3 lần trong 15 phút" },
    ],
    checklist: [
      { label: "Push nội bộ", value: "Ổn định" },
      { label: "SMS backup", value: "Chỉ cảnh báo P1" },
      { label: "Approver", value: "Biên tập viên" },
      { label: "Audit trail", value: "Đầy đủ" },
    ],
  },
  "service-groups": {
    accent: "Taxonomy dịch vụ",
    status: "18 nhóm đang công bố",
    statusTone: "emerald",
    metrics: [
      { label: "Nhóm chính", value: "18", detail: "dân cư, tài chính, y tế..." },
      { label: "Nhóm cần rà soát", value: "03", detail: "trùng mapping metadata" },
      { label: "Chuẩn DCAT-VN", value: "92%", detail: "đã gán taxonomy" },
    ],
    workQueue: [
      { title: "Nhóm Y tế & BHXH cần chuẩn hóa tags", meta: "14 dịch vụ chưa map đủ", status: "in-review" },
      { title: "Thêm nhóm Dữ liệu môi trường", meta: "đề xuất từ Bộ TNMT", status: "proposal" },
      { title: "Rà soát nhóm Giáo dục", meta: "duplicate indicator", status: "warning" },
    ],
    highlights: [
      { title: "Cấu trúc phân cấp", detail: "group > service > dataset > indicator" },
      { title: "Quy trình thay đổi", detail: "2 bước duyệt taxonomy nội bộ" },
      { title: "Ảnh hưởng", detail: "search, filter, pricing, report" },
    ],
    checklist: [
      { label: "Versioning", value: "v2.3" },
      { label: "Owner", value: "Ban vận hành data" },
      { label: "Cross-map", value: "DCAT-VN" },
      { label: "Review cycle", value: "Hàng tháng" },
    ],
  },
  services: {
    accent: "Catalog dữ liệu",
    status: "662 dịch vụ, 4 dịch vụ bảo trì",
    statusTone: "blue",
    metrics: [
      { label: "Dịch vụ hoạt động", value: "658", detail: "4 bảo trì / bản nháp" },
      { label: "Lưu lượng cao nhất", value: "64K/ngày", detail: "MST cá nhân & tình trạng" },
      { label: "Nguồn dữ liệu", value: "47 CQNN", detail: "đã publish metadata" },
    ],
    workQueue: [
      { title: "DV-YT-012 chuyển trạng thái bảo trì", meta: "Bộ Y tế · 04/04/2026", status: "maintenance" },
      { title: "DV-XD-034 đang là bản nháp", meta: "chờ metadata pháp lý", status: "draft" },
      { title: "DV-TC-118 vượt 120% quota", meta: "đề xuất tăng rate-limit", status: "warning" },
    ],
    highlights: [
      { title: "Top service", detail: "MST cá nhân · 64K/ngày · Tổng cục Thuế" },
      { title: "Mức sẵn sàng", detail: "99,7% toàn catalog tháng này" },
      { title: "Danh mục nổi bật", detail: "Tài chính, BHXH, Giáo dục, Xây dựng" },
    ],
    checklist: [
      { label: "Approval flow", value: "2 tầng" },
      { label: "Drafts", value: "11" },
      { label: "Paused", value: "3" },
      { label: "Auto sync", value: "Hàng giờ" },
    ],
  },
  "services-create": {
    accent: "Onboarding dịch vụ",
    status: "5 hồ sơ tạo mới chờ hoàn thiện",
    statusTone: "amber",
    metrics: [
      { label: "Biểu mẫu mở", value: "05", detail: "đang nhập metadata" },
      { label: "Thiếu pháp lý", value: "02", detail: "chưa đính kèm quyết định" },
      { label: "Chờ duyệt kỹ thuật", value: "03", detail: "mapping schema + SLA" },
    ],
    workQueue: [
      { title: "Dữ liệu đăng kiểm phương tiện", meta: "thiếu điều khoản khai thác", status: "blocked" },
      { title: "API đăng ký doanh nghiệp", meta: "đã xong schema", status: "ready" },
      { title: "Dữ liệu quy hoạch đô thị", meta: "cần bổ sung pricing", status: "in-review" },
    ],
    highlights: [
      { title: "Bước 1", detail: "Metadata + owner + taxonomy" },
      { title: "Bước 2", detail: "SLA + quota + pricing" },
      { title: "Bước 3", detail: "Kiểm duyệt pháp lý và publish" },
    ],
    checklist: [
      { label: "Mẫu trường", value: "Đầy đủ" },
      { label: "Schema lint", value: "Tự động" },
      { label: "PII scan", value: "Bắt buộc" },
      { label: "Publish gate", value: "Manual approve" },
    ],
  },
  datasets: {
    accent: "Nguồn dữ liệu gốc",
    status: "77 bộ dữ liệu đang quản lý",
    statusTone: "emerald",
    metrics: [
      { label: "Dataset active", value: "72", detail: "5 tạm ngưng ingest" },
      { label: "Freshness tốt", value: "89%", detail: "đúng SLA cập nhật" },
      { label: "Schema drift", value: "04", detail: "cần review mapping" },
    ],
    workQueue: [
      { title: "DS-BHXH-001 lệch schema cột 17", meta: "phát hiện sáng nay", status: "warning" },
      { title: "DS-GT-008 pending ingest", meta: "nguồn FTP gián đoạn", status: "blocked" },
      { title: "DS-DN-023 đã đồng bộ đủ 12 kỳ", meta: "sẵn sàng publish", status: "ready" },
    ],
    highlights: [
      { title: "Nguồn ingest", detail: "API, SFTP, webhook, batch upload" },
      { title: "Data quality", detail: "checksum + schema validation" },
      { title: "Lịch cập nhật", detail: "realtime, hourly, daily, monthly" },
    ],
    checklist: [
      { label: "Snapshot", value: "30 ngày" },
      { label: "Backup", value: "Hằng đêm" },
      { label: "Lineage", value: "Đã bật" },
      { label: "Owner review", value: "Hàng tuần" },
    ],
  },
  reports: {
    accent: "Điều phối báo cáo",
    status: "12 báo cáo định kỳ sắp đến hạn",
    statusTone: "blue",
    metrics: [
      { label: "Báo cáo tháng", value: "38", detail: "CQNN + đối soát nội bộ" },
      { label: "Đang chờ ký số", value: "04", detail: "xuất bản tuần này" },
      { label: "Tự động hóa", value: "76%", detail: "template có sẵn" },
    ],
    workQueue: [
      { title: "Báo cáo doanh thu tháng 4", meta: "chờ đối soát payment-gw", status: "in-review" },
      { title: "Báo cáo hoạt động CQNN", meta: "xuất PDF 16:30", status: "scheduled" },
      { title: "Báo cáo SLA dịch vụ", meta: "thiếu data từ monitoring", status: "warning" },
    ],
    highlights: [
      { title: "Đầu ra", detail: "PDF, XLSX, dashboard snapshot" },
      { title: "Nguồn số liệu", detail: "transactions, services, monitoring" },
      { title: "Phê duyệt", detail: "Ký số nội bộ trước khi công bố" },
    ],
    checklist: [
      { label: "Template", value: "14 mẫu" },
      { label: "Ký số", value: "USB Token" },
      { label: "Lưu trữ", value: "5 năm" },
      { label: "Lịch chạy", value: "Cron nội bộ" },
    ],
  },
  accounts: {
    accent: "KYC & phê duyệt",
    status: "24 hồ sơ cần xử lý",
    statusTone: "amber",
    metrics: [
      { label: "Chờ duyệt", value: "24", detail: "doanh nghiệp + CQNN" },
      { label: "Đang xem", value: "06", detail: "đã có người nhận xử lý" },
      { label: "Đã xác minh DMDC", value: "11", detail: "sẵn sàng phê duyệt" },
    ],
    workQueue: [
      { title: "Công ty CP FinTech Việt Nam", meta: "MST 0108234567 · Bên mua", status: "priority" },
      { title: "Ngân hàng TMCP Quốc tế VN", meta: "Bên mua + bán · hồ sơ đầy đủ", status: "ready" },
      { title: "Cục Thống kê TP.HCM", meta: "CQNN cung cấp · đã verify DMDC", status: "verified" },
    ],
    highlights: [
      { title: "Bộ lọc chính", detail: "Loại hình, vai trò, trạng thái DMDC, ngày nộp" },
      { title: "Tác vụ nhanh", detail: "Xem hồ sơ, duyệt, từ chối, ghi chú" },
      { title: "Luồng xác minh", detail: "Email, MST, người đại diện, đối soát DMDC" },
    ],
    checklist: [
      { label: "2 lớp duyệt", value: "Bật" },
      { label: "DMDC lookup", value: "Realtime" },
      { label: "KYC retention", value: "180 ngày" },
      { label: "Audit", value: "Đầy đủ" },
    ],
  },
  auctions: {
    accent: "Phiên đấu giá dữ liệu",
    status: "3 phiên đang mở giá",
    statusTone: "blue",
    metrics: [
      { label: "Phiên hoạt động", value: "03", detail: "2 B2B, 1 G2B" },
      { label: "Giá cao nhất", value: "1,24B ₫", detail: "AUC-2026-0412" },
      { label: "Bid hợp lệ", value: "128", detail: "24 giờ qua" },
    ],
    workQueue: [
      { title: "AUC-2026-0412", meta: "dataset logistics · closing 18:00", status: "live" },
      { title: "AUC-2026-0409", meta: "cần xác minh bidder", status: "in-review" },
      { title: "AUC-2026-0405", meta: "biên bản bàn giao chờ ký", status: "pending" },
    ],
    highlights: [
      { title: "Guardrail", detail: "anti-sniping, min increment, blacklist" },
      { title: "Thanh toán", detail: "escrow + invoice sau chốt giá" },
      { title: "Giám sát", detail: "bid bất thường, bidder liên quan" },
    ],
    checklist: [
      { label: "Ký quỹ", value: "Bắt buộc" },
      { label: "Audit bids", value: "Bật" },
      { label: "Fraud check", value: "Theo phiên" },
      { label: "Settlement", value: "T+1" },
    ],
  },
  transactions: {
    accent: "Đơn hàng & thanh toán",
    status: "12 đơn cần đối soát",
    statusTone: "amber",
    metrics: [
      { label: "GMV tháng", value: "48,4B ₫", detail: "+28% so với tháng trước" },
      { label: "Đơn hàng mở", value: "12", detail: "chờ thanh toán / bàn giao" },
      { label: "Tỷ lệ thành công", value: "98,45%", detail: "payment + provisioning" },
    ],
    workQueue: [
      { title: "ORD-2026-1982 pending VNPay", meta: "timeout retry 2/3", status: "warning" },
      { title: "ORD-2026-1974 chờ invoice", meta: "seller chưa phát hành", status: "pending" },
      { title: "ORD-2026-1968 đã cấp access key", meta: "bàn giao hoàn tất", status: "done" },
    ],
    highlights: [
      { title: "Nguồn số liệu", detail: "checkout, payment-gw, provisioning" },
      { title: "Rủi ro chính", detail: "timeout gateway, invoice chậm, refund" },
      { title: "Theo dõi", detail: "SLA từng bước của đơn hàng" },
    ],
    checklist: [
      { label: "Reconcile", value: "Cuối ngày" },
      { label: "Refund flow", value: "Manual approve" },
      { label: "Invoice sync", value: "ERP nội bộ" },
      { label: "Payment alerts", value: "P1/P2" },
    ],
  },
  moderation: {
    accent: "Duyệt sản phẩm seller",
    status: "24 sản phẩm chờ duyệt",
    statusTone: "amber",
    metrics: [
      { label: "Chờ duyệt", value: "24", detail: "seller marketplace" },
      { label: "Bị gắn cờ", value: "07", detail: "metadata / PII / claim" },
      { label: "Tỷ lệ pass", value: "82%", detail: "7 ngày gần nhất" },
    ],
    workQueue: [
      { title: "SP-TC-042 chứa CCCD chưa hash", meta: "cần seller nộp lại sample", status: "blocked" },
      { title: "SP-LOG-118 đủ hồ sơ pháp lý", meta: "sẵn sàng publish", status: "ready" },
      { title: "SP-YT-090 claim sai nguồn", meta: "chờ xác minh owner", status: "warning" },
    ],
    highlights: [
      { title: "Checklist duyệt", detail: "owner, legal, sample, pricing, SLA" },
      { title: "PII gate", detail: "scan tự động trước khi publish" },
      { title: "Escalation", detail: "chuyển quality council nếu cần" },
    ],
    checklist: [
      { label: "PII scan", value: "Bắt buộc" },
      { label: "Legal docs", value: "Đính kèm" },
      { label: "Seller score", value: "Hiển thị" },
      { label: "Publish", value: "Manual" },
    ],
  },
  quality: {
    accent: "Hội đồng thẩm định",
    status: "12 hồ sơ đang ở vòng thẩm định",
    statusTone: "blue",
    metrics: [
      { label: "Phiên đang mở", value: "04", detail: "theo lĩnh vực" },
      { label: "Thẩm định viên", value: "28", detail: "active tuần này" },
      { label: "SLA trung bình", value: "2,4 ngày", detail: "từ assign tới kết luận" },
    ],
    workQueue: [
      { title: "Hồ sơ BHXH-07 cần đánh giá lại SLA", meta: "thiếu phụ lục cập nhật", status: "in-review" },
      { title: "Tổ dữ liệu tài chính họp 15:00", meta: "3 hồ sơ cần biểu quyết", status: "scheduled" },
      { title: "Biên bản phiên Y tế chưa ký đủ", meta: "1 thành viên pending", status: "pending" },
    ],
    highlights: [
      { title: "Vai trò", detail: "Super Admin, Admin CQNN, Thẩm định viên, Kỹ thuật viên" },
      { title: "Dấu vết quyết định", detail: "ghi nhận vote và biên bản điện tử" },
      { title: "Kết quả", detail: "approve, approve with conditions, reject" },
    ],
    checklist: [
      { label: "RBAC", value: "Đủ vai trò" },
      { label: "Biên bản", value: "Lưu trữ" },
      { label: "Quorum", value: "Bắt buộc" },
      { label: "Re-open case", value: "Cho phép" },
    ],
  },
  disputes: {
    accent: "Khiếu nại & tranh chấp",
    status: "3 case ưu tiên cao",
    statusTone: "amber",
    metrics: [
      { label: "Case mở", value: "09", detail: "3 P1, 6 P2" },
      { label: "Hoàn tiền treo", value: "1,8B ₫", detail: "chờ kết luận" },
      { label: "SLA phản hồi", value: "4 giờ", detail: "cam kết nội bộ" },
    ],
    workQueue: [
      { title: "DSP-2026-014 chất lượng dữ liệu thấp hơn cam kết", meta: "buyer khiếu nại seller", status: "priority" },
      { title: "DSP-2026-009 tranh chấp quyền khai thác", meta: "pháp lý đang review", status: "legal" },
      { title: "DSP-2026-006 refund pending", meta: "chờ đối soát payment", status: "pending" },
    ],
    highlights: [
      { title: "Nguồn case", detail: "orders, moderation, legal, support" },
      { title: "Artefacts", detail: "hợp đồng, SLA, sample, audit log" },
      { title: "Kết quả", detail: "refund, partial refund, reject complaint" },
    ],
    checklist: [
      { label: "Escalation legal", value: "Có" },
      { label: "Evidence pack", value: "Bắt buộc" },
      { label: "Freeze payout", value: "P1/P2" },
      { label: "Timeline", value: "7 ngày" },
    ],
  },
  consent: {
    accent: "Điều phối truy cập dữ liệu cá nhân",
    status: "100% consent receipt hợp lệ",
    statusTone: "emerald",
    metrics: [
      { label: "Consent active", value: "68M+", detail: "qua VNeID + cổng nội bộ" },
      { label: "Sắp hết hạn", value: "1.284", detail: "7 ngày tới" },
      { label: "Thu hồi", value: "92", detail: "24 giờ qua" },
    ],
    workQueue: [
      { title: "Receipt CR-2026-883 cần gia hạn", meta: "buyer enterprise", status: "expiring" },
      { title: "Đối soát consent VNeID lệch 12 record", meta: "sync job 13:00", status: "warning" },
      { title: "Policy mới NĐ13 đang rollout", meta: "phase 2", status: "scheduled" },
    ],
    highlights: [
      { title: "Nguồn consent", detail: "VNeID, OTP, enterprise agreement" },
      { title: "Chính sách", detail: "purpose, duration, scope, revocation" },
      { title: "Audit", detail: "trace theo actor và dataset" },
    ],
    checklist: [
      { label: "Receipt store", value: "Immutable" },
      { label: "Revocation", value: "Realtime" },
      { label: "Retention", value: "Theo luật" },
      { label: "Cross-border", value: "Kiểm soát" },
    ],
  },
  pii: {
    accent: "Giám sát dữ liệu nhạy cảm",
    status: "2 cảnh báo hoạt động",
    statusTone: "amber",
    metrics: [
      { label: "PII alerts", value: "02", detail: "active" },
      { label: "Mẫu đã quét", value: "18.402", detail: "24 giờ qua" },
      { label: "False positive", value: "3,1%", detail: "đã giảm so với tuần trước" },
    ],
    workQueue: [
      { title: "SP-TC-042 chứa CCCD chưa hash", meta: "seller catalog", status: "critical" },
      { title: "Dataset sample DS-YT-022 có email plaintext", meta: "masking pending", status: "warning" },
      { title: "Rule mới cho số định danh cá nhân", meta: "đang A/B", status: "experiment" },
    ],
    highlights: [
      { title: "Detection", detail: "rule-based + heuristic + sampling" },
      { title: "Action", detail: "block publish, notify owner, create case" },
      { title: "Coverage", detail: "seller product, CQNN dataset, attachment" },
    ],
    checklist: [
      { label: "Hashing", value: "Bắt buộc" },
      { label: "Tokenization", value: "Có" },
      { label: "Manual review", value: "P1/P2" },
      { label: "Suppression list", value: "Có" },
    ],
  },
  audit: {
    accent: "Audit trail toàn sàn",
    status: "log retention 180 ngày",
    statusTone: "blue",
    metrics: [
      { label: "Sự kiện/ngày", value: "18,4M", detail: "admin + buyer + seller" },
      { label: "Tra cứu nóng", value: "< 3 giây", detail: "index nội bộ" },
      { label: "Case forensic", value: "04", detail: "đang điều tra" },
    ],
    workQueue: [
      { title: "Audit cho dispute DSP-2026-014", meta: "lọc theo order + actors", status: "active" },
      { title: "Kiểm tra thay đổi pricing ngày 08/04", meta: "RBAC anomaly", status: "review" },
      { title: "Xuất log cho đoàn kiểm tra", meta: "PDF + CSV", status: "scheduled" },
    ],
    highlights: [
      { title: "Actor scope", detail: "user, system, integration, cron" },
      { title: "Filter", detail: "service, order, dataset, action, IP" },
      { title: "Integrity", detail: "append-only + checksum" },
    ],
    checklist: [
      { label: "Retention", value: "180 ngày" },
      { label: "Export", value: "CSV/PDF" },
      { label: "Masking", value: "Theo quyền" },
      { label: "Tamper check", value: "Bật" },
    ],
  },
  catalogs: {
    accent: "Danh mục hệ thống",
    status: "taxonomy và mã dùng chung ổn định",
    statusTone: "emerald",
    metrics: [
      { label: "Danh mục lõi", value: "42", detail: "lĩnh vực, loại hình, SLA..." },
      { label: "Biến thể cần rà", value: "05", detail: "mapping chưa thống nhất" },
      { label: "Đồng bộ ngoài", value: "09", detail: "DMDC + NGSP/LGSP" },
    ],
    workQueue: [
      { title: "Cập nhật taxonomy loại hình seller", meta: "phase 2 marketplace", status: "proposal" },
      { title: "Mã địa phương đồng bộ DMDC", meta: "chờ release mới", status: "pending" },
      { title: "Danh mục SLA chuẩn hóa", meta: "ảnh hưởng pricing", status: "review" },
    ],
    highlights: [
      { title: "Vai trò", detail: "nguồn sự thật cho filter và form" },
      { title: "Ảnh hưởng", detail: "service create, reporting, search" },
      { title: "Quy tắc", detail: "không sửa trực tiếp key đang dùng" },
    ],
    checklist: [
      { label: "Versioned", value: "Có" },
      { label: "Sync DMDC", value: "Hàng ngày" },
      { label: "Fallback labels", value: "Có" },
      { label: "Audit", value: "Bật" },
    ],
  },
  news: {
    accent: "Biên tập nội dung nội bộ",
    status: "9 bản tin chờ lịch phát",
    statusTone: "blue",
    metrics: [
      { label: "Draft", value: "09", detail: "tin tức + thông báo" },
      { label: "Published", value: "128", detail: "30 ngày gần nhất" },
      { label: "Biên tập viên", value: "04", detail: "đang hoạt động" },
    ],
    workQueue: [
      { title: "Thông báo bảo trì VNPay", meta: "publish 17:00", status: "scheduled" },
      { title: "Bản tin tháng 4 cho CQNN", meta: "đang chờ duyệt", status: "review" },
      { title: "FAQ consent mới", meta: "thiếu asset minh họa", status: "draft" },
    ],
    highlights: [
      { title: "Kênh hiển thị", detail: "portal admin, buyer, seller, email digest" },
      { title: "Luồng duyệt", detail: "editor > approver > publish" },
      { title: "Liên kết", detail: "gắn banner hoặc notification campaign" },
    ],
    checklist: [
      { label: "Scheduling", value: "Có" },
      { label: "SEO nội bộ", value: "Cơ bản" },
      { label: "Version history", value: "Bật" },
      { label: "Rollback", value: "1-click" },
    ],
  },
  pricing: {
    accent: "Biểu phí & chính sách thu",
    status: "4 thay đổi biểu phí chờ áp dụng",
    statusTone: "amber",
    metrics: [
      { label: "Phí active", value: "18 biểu phí", detail: "platform + payment + premium" },
      { label: "Khuyến mại mở", value: "03", detail: "seller / buyer / CQNN" },
      { label: "Tác động GMV", value: "+2,8%", detail: "ước tính tháng tới" },
    ],
    workQueue: [
      { title: "Tăng fee buyer premium 0,2%", meta: "go-live 15/04", status: "scheduled" },
      { title: "Miễn phí CQNN cho 3 bộ dữ liệu", meta: "cần phê duyệt cuối", status: "review" },
      { title: "Đối soát commission seller platinum", meta: "formula mismatch", status: "warning" },
    ],
    highlights: [
      { title: "Nguồn áp dụng", detail: "orders, auctions, subscriptions" },
      { title: "Kiểm thử", detail: "sandbox pricing trước go-live" },
      { title: "Ràng buộc", detail: "không hồi tố hóa đơn đã phát hành" },
    ],
    checklist: [
      { label: "Version", value: "2026.04" },
      { label: "Approval", value: "Finance + Ops" },
      { label: "Rollback", value: "Có" },
      { label: "Simulation", value: "Bắt buộc" },
    ],
  },
  settings: {
    accent: "RBAC & tích hợp hệ thống",
    status: "hệ cấu hình ổn định",
    statusTone: "emerald",
    metrics: [
      { label: "Nhóm quyền", value: "06", detail: "RBAC nội bộ" },
      { label: "Tích hợp lõi", value: "06", detail: "DMDC, NDC, VNeID..." },
      { label: "Chính sách bảo mật", value: "07", detail: "đang bật" },
    ],
    workQueue: [
      { title: "2FA bắt buộc cho admin", meta: "TOTP + SMS", status: "enabled" },
      { title: "Passwordless WebAuthn", meta: "beta · chưa rollout rộng", status: "beta" },
      { title: "IP whitelist nhóm admin", meta: "cần cập nhật subnet mới", status: "review" },
    ],
    highlights: [
      { title: "RBAC", detail: "Super Admin, Admin CQNN, Thẩm định viên, Kỹ thuật viên..." },
      { title: "Liên thông", detail: "DMDC, NDC, NDAChain, NGSP/LGSP, VNeID, VNPay" },
      { title: "Bảo mật", detail: "TLS 1.3, AES-256, HSM, WAF, DDoS protection" },
    ],
    checklist: [
      { label: "SAML 2.0", value: "Bật" },
      { label: "LDAP / AD", value: "Bật" },
      { label: "WAF", value: "Cloudflare" },
      { label: "Rate limiting", value: "Bật" },
    ],
  },
};
