import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Award,
  Bell,
  BrainCircuit,
  ClipboardCheck,
  FileSearch,
  FlaskConical,
  Gavel,
  GitBranch,
  Headphones,
  Home,
  Inbox,
  LineChart,
  Lock,
  Package,
  PackagePlus,
  Percent,
  ScrollText,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
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

export const sellerUser = {
  initials: "TM",
  name: "Trần Thị Mai",
  company: "CTCP Dữ liệu Tài chính Việt",
  companyShort: "CTCP Dữ liệu Tài chính Việt",
};

export const sellerNavGroups: SellerNavGroup[] = [
  {
    label: "Tổng quan",
    items: [
      { href: "/seller", label: "Trang chủ", icon: Home },
      {
        href: "/seller/analytics",
        label: "Doanh thu & Báo cáo",
        icon: LineChart,
      },
      {
        href: "/seller/notifications",
        label: "Thông báo",
        icon: Bell,
        badge: "6",
      },
    ],
  },
  {
    label: "Sản phẩm dữ liệu",
    items: [
      {
        href: "/seller/products",
        label: "Sản phẩm của tôi",
        icon: Package,
        badge: "18",
      },
      { href: "/seller/create", label: "Tạo sản phẩm mới", icon: PackagePlus },
      { href: "/seller/pricing", label: "Giá & Khuyến mãi", icon: Percent },
      {
        href: "/seller/data-quality",
        label: "Chất lượng dữ liệu",
        icon: ShieldCheck,
      },
      { href: "/seller/policies", label: "Usage Control Policies", icon: Lock },
      { href: "/seller/lineage", label: "Data Lineage", icon: GitBranch },
      {
        href: "/seller/quality",
        label: "Thẩm định chất lượng",
        icon: ClipboardCheck,
        badge: "3",
      },
      { href: "/seller/sandbox", label: "Sandbox", icon: FlaskConical },
    ],
  },
  {
    label: "Giao dịch & Khách hàng",
    items: [
      { href: "/seller/auctions", label: "Đấu giá", icon: Gavel, badge: "2" },
      { href: "/seller/orders", label: "Đơn hàng nhận được", icon: Inbox },
      {
        href: "/seller/demands",
        label: "Nhu cầu mua (RFQ)",
        icon: FileSearch,
        badge: "3",
      },
      {
        href: "/seller/customers",
        label: "Khách hàng (CRM)",
        icon: Users,
        badge: "142",
      },
      {
        href: "/seller/disputes",
        label: "Khiếu nại",
        icon: AlertTriangle,
        badge: "3",
      },
    ],
  },
  {
    label: "AI/ML & Mở rộng",
    items: [
      {
        href: "/seller/ml-models",
        label: "Chợ mô hình AI/ML",
        icon: BrainCircuit,
        badge: "Mới",
      },
    ],
  },
  {
    label: "Tài chính & Hệ thống",
    items: [
      { href: "/seller/wallet", label: "Ví & Rút tiền", icon: Wallet },
      {
        href: "/seller/awards",
        label: "Chứng nhận & Giải thưởng",
        icon: Award,
      },
      { href: "/seller/support", label: "Hỗ trợ Premium", icon: Headphones },
      { href: "/seller/audit", label: "Audit log", icon: ScrollText },
      { href: "/seller/settings", label: "Cài đặt tài khoản", icon: Settings },
    ],
  },
];
