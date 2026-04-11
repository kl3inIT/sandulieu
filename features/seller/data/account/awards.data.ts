import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AchievementTone = "amber" | "emerald" | "blue" | "rose";

export type Achievement = {
  title: string;
  description: string;
  date: string;
  tone: AchievementTone;
  icon: LucideIcon;
};

export type CertificationTone = "emerald" | "amber";

export type Certification = {
  title: string;
  description: string;
  status: string;
  tone: CertificationTone;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    title: "Platinum Seller 2026",
    description: "Top 5% nhà cung cấp dữ liệu theo doanh thu và đánh giá",
    date: "Đạt 04/2026",
    tone: "amber",
    icon: Trophy,
  },
  {
    title: "Best Data Provider 2025",
    description: "Giải thưởng nhà cung cấp dữ liệu tốt nhất năm 2025",
    date: "Đạt 12/2025",
    tone: "amber",
    icon: Trophy,
  },
  {
    title: "5★ Seller 12 tháng liên tiếp",
    description: "Duy trì đánh giá 5 sao liên tục trong 12 tháng",
    date: "Đạt 03/2026",
    tone: "amber",
    icon: Star,
  },
  {
    title: "Zero Incident 2025",
    description: "Không có sự cố bảo mật nào trong năm 2025",
    date: "Đạt 01/2026",
    tone: "emerald",
    icon: ShieldCheck,
  },
  {
    title: "Fastest Growing Seller Q1/2026",
    description: "Tăng trưởng doanh thu nhanh nhất quý",
    date: "Đạt 04/2026",
    tone: "blue",
    icon: TrendingUp,
  },
  {
    title: "Top Customer Service 2025",
    description: "Phản hồi < 2 giờ để hài lòng 4.9/5",
    date: "Đạt 01/2026",
    tone: "rose",
    icon: CheckCircle2,
  },
];

export const certifications: Certification[] = [
  {
    title: "ISO 27001",
    description:
      "Tổ chức Tiêu chuẩn Quốc tế · Cấp: 15/10/2026 · Hết hạn: 15/10/2029",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "SOC 2 Type II",
    description:
      "AICPA (American Institute of CPAs) · Cấp: 10/03/2026 · Hết hạn: 10/03/2027",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "DCAT-VN Certified",
    description:
      "Trung tâm Dữ liệu Quốc gia · Cấp: 05/02/2026 · Hết hạn: 05/02/2028",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "GDPR Compliance",
    description:
      "EU Data Protection Board · Cấp: 20/12/2025 · Hết hạn: 20/12/2026",
    status: "Sắp hết hạn",
    tone: "amber",
  },
  {
    title: "Nghị định 13/2023",
    description: "Bộ Công an Việt Nam · Cấp: 01/01/2026 · Hết hạn: 01/01/2028",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "ISO 9001 QMS",
    description: "BSI Vietnam · Cấp: 15/11/2025 · Hết hạn: 15/11/2028",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
];
