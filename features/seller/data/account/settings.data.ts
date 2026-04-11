import type { LucideIcon } from "lucide-react";
import { Bell, CreditCard, Globe2, Languages, Lock, Users } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SettingsTab = {
  id: string;
  label: string;
  icon: LucideIcon;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const settingsTabs: SettingsTab[] = [
  { id: "profile", label: "Hồ sơ nhà cung cấp", icon: Users },
  { id: "storefront", label: "Storefront & SEO", icon: Globe2 },
  { id: "members", label: "Thành viên & Phân quyền", icon: Users },
  { id: "payment", label: "Thanh toán & Thuế", icon: CreditCard },
  { id: "security", label: "Bảo mật", icon: Lock },
  { id: "notification", label: "Thông báo", icon: Bell },
  { id: "display", label: "Hiển thị & Ngôn ngữ", icon: Languages },
];

export const profileTags: string[] = [
  "Báo cáo tín dụng",
  "Chỉ số thị trường",
  "Phân tích rủi ro",
  "Chứng khoán",
  "Ngân hàng",
  "Fintech",
  "SME Analytics",
];

export const memberRows = [
  {
    initials: "TM",
    name: "Trần Thị Mai",
    email: "mai.dltc.io",
    role: "Owner",
    roleTone: "amber",
    activity: "Đang online",
    status: "Hoạt động",
    statusTone: "emerald",
  },
  {
    initials: "NH",
    name: "Nguyễn Quang Huy",
    email: "huy.nq@dltc.vn",
    role: "Sales Manager",
    roleTone: "blue",
    activity: "30 phút trước",
    status: "Hoạt động",
    statusTone: "emerald",
  },
  {
    initials: "LH",
    name: "Lê Thị Hà",
    email: "ha.lh@dltc.vn",
    role: "Billing",
    roleTone: "slate",
    activity: "2 giờ trước",
    status: "Hoạt động",
    statusTone: "emerald",
  },
  {
    initials: "PM",
    name: "Phạm Văn Minh",
    email: "minh.pv@gov.vn",
    role: "Data Engineer",
    roleTone: "blue",
    activity: "Hôm qua",
    status: "Hoạt động",
    statusTone: "emerald",
  },
  {
    initials: "HL",
    name: "Hoàng Thị Lan",
    email: "lan.hl@dltc.vn",
    role: "Content Manager",
    roleTone: "slate",
    activity: "Hôm qua",
    status: "Hoạt động",
    statusTone: "emerald",
  },
  {
    initials: "VA",
    name: "Vũ Đức Anh",
    email: "anh.va@gov.vn",
    role: "Hỗ trợ",
    roleTone: "slate",
    activity: "Chờ duyệt",
    status: "Chờ duyệt",
    statusTone: "amber",
  },
] as const;

export const sellerRoles = [
  {
    name: "Owner",
    description: "Toàn quyền - Quản lý team & thanh toán",
    tone: "amber",
  },
  {
    name: "Admin",
    description: "Quản lý sản phẩm & đơn hàng - Không tài chính",
    tone: "slate",
  },
  {
    name: "Sales Manager",
    description: "Quản lý RFQ, offers, đàm phán với bên mua",
    tone: "blue",
  },
  {
    name: "Billing",
    description: "Xem doanh thu, xuất hóa đơn, rút tiền",
    tone: "slate",
  },
  {
    name: "Data Engineer",
    description: "Tạo/cập nhật sản phẩm, quản lý API",
    tone: "blue",
  },
  {
    name: "Content Manager",
    description: "Chỉnh storefront, tin tức, mô tả sản phẩm",
    tone: "slate",
  },
  {
    name: "Support Agent",
    description: "Trả lời ticket, xử lý khiếu nại nhỏ",
    tone: "slate",
  },
] as const;

export const twoFactorMethods = [
  { label: "TOTP App", badge: "Chính", enabled: true },
  { label: "SMS OTP", enabled: true },
  { label: "Hardware Key (FIDO2)", enabled: true },
  { label: "Passkey / WebAuthn", enabled: false },
] as const;

export const activeSessions = [
  {
    name: "MacBook · Chrome · HCM (Trần Thị Mai)",
    ip: "14.237.xxx",
    current: true,
  },
  {
    name: "iPhone · Safari · HCM (Trần Thị Mai)",
    ip: "14.237.xxx",
    current: false,
  },
  {
    name: "Windows · Edge · HN (Nguyễn Quang Huy)",
    ip: "115.75.xxx",
    current: false,
  },
  {
    name: "MacBook · Firefox · HN (Lê Thị Hà)",
    ip: "115.75.xxx",
    current: false,
  },
] as const;

export const apiWhitelists = [
  "14.237.0.0/16 - Office HCM",
  "115.75.0.0/16 - Office HN",
] as const;

export const notificationRows = [
  "Đơn hàng mới nhận được",
  "Bid mới trên phiên đấu giá",
  "RFQ mới phù hợp (AI Match ≥80%)",
  "Feedback thẩm định chất lượng",
  "Khiếu nại từ khách hàng",
  "Thanh toán về ví",
  "Cảnh báo bảo mật",
  "Đánh giá/review sản phẩm mới",
  "Khách hàng hủy đơn",
] as const;
