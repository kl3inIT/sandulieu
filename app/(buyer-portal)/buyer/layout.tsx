import type { ReactNode } from "react";
import {
  Boxes,
  ChartColumnIncreasing,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

import { PortalHeader } from "@/shared/components/layout/portal-header";
import {
  PortalSidebar,
  type PortalSidebarItem,
} from "@/shared/components/layout/portal-sidebar";

const sidebarItems: PortalSidebarItem[] = [
  {
    href: "/buyer",
    label: "Tổng quan",
    description: "Hiệu suất mua hàng",
    icon: LayoutDashboard,
  },
  {
    href: "/buyer",
    label: "Đơn hàng",
    description: "Theo dõi trạng thái",
    icon: ClipboardList,
  },
  {
    href: "/buyer",
    label: "Danh mục",
    description: "Sản phẩm và tồn kho",
    icon: Boxes,
  },
  {
    href: "/buyer",
    label: "Báo cáo",
    description: "Phân tích chi tiêu",
    icon: ChartColumnIncreasing,
  },
];

export default function BuyerPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#06101a] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1680px] lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <PortalSidebar
            portalLabel="Buyer portal"
            portalHint="Khu vực cho buyer theo dõi đơn mua, danh mục và hiệu suất mua hàng."
            items={sidebarItems}
          />
        </div>
        <div className="flex min-h-screen flex-col">
          <PortalHeader eyebrow="Buyer portal" title="Không gian buyer" />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
