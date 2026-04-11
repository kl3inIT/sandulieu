import type { LucideIcon } from "lucide-react";
import { Bell, CreditCard, Globe2, Languages, Lock, Users } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SettingsTab = {
  label: string;
  icon: LucideIcon;
  active: boolean;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const settingsTabs: SettingsTab[] = [
  { label: "Hồ sơ nhà cung cấp", icon: Users, active: true },
  { label: "Storefront & SEO", icon: Globe2, active: false },
  { label: "Thành viên & Phân quyền", icon: Users, active: false },
  { label: "Thanh toán & Thuế", icon: CreditCard, active: false },
  { label: "Bảo mật", icon: Lock, active: false },
  { label: "Thông báo", icon: Bell, active: false },
  { label: "Hiển thị & Ngôn ngữ", icon: Languages, active: false },
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
