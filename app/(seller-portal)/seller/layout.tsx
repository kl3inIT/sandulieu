import type { ReactNode } from "react";
import { BarChart3, Boxes, LayoutDashboard, Store } from "lucide-react";

import { PortalHeader } from "@/shared/components/layout/portal-header";
import {
  PortalSidebar,
  type PortalSidebarItem,
} from "@/shared/components/layout/portal-sidebar";

const sidebarItems: PortalSidebarItem[] = [
  {
    href: "/seller",
    label: "Tổng quan",
    description: "Hiệu suất gian hàng",
    icon: LayoutDashboard,
  },
  {
    href: "/seller",
    label: "Sản phẩm",
    description: "Quản lý catalog",
    icon: Boxes,
  },
  {
    href: "/seller",
    label: "Cửa hàng",
    description: "Thiết lập vận hành",
    icon: Store,
  },
  {
    href: "/seller",
    label: "Phân tích",
    description: "Doanh thu và chuyển đổi",
    icon: BarChart3,
  },
];

export default function SellerPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#06101a] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1680px] lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <PortalSidebar
            portalLabel="Seller portal"
            portalHint="Khu vực cho seller theo dõi catalog, đơn bán và hiệu suất gian hàng."
            items={sidebarItems}
          />
        </div>
        <div className="flex min-h-screen flex-col">
          <PortalHeader eyebrow="Seller portal" title="Không gian seller" />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
