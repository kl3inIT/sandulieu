"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellRing,
  Blocks,
  FileText,
  LayoutDashboard,
  MonitorCog,
  ShieldCheck,
  Users,
} from "lucide-react";

import { SiteMark } from "@/shared/components/layout/site-mark";
import { Badge } from "@/shared/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";

const groups = [
  {
    label: "Tổng quan vận hành",
    items: [
      {
        href: "/admin",
        label: "Trung tâm điều hành",
        icon: LayoutDashboard,
        live: true,
      },
      { href: "/admin/posts", label: "Bài viết", icon: FileText, live: true },
      { href: "#", label: "Giám sát hệ thống", icon: MonitorCog },
      { href: "#", label: "Thông báo", icon: BellRing, count: "6" },
    ],
  },
  {
    label: "Dịch vụ dữ liệu CQNN",
    items: [
      { href: "#", label: "Nhóm dịch vụ", icon: Blocks, count: "18" },
      { href: "#", label: "Catalog dịch vụ", icon: ShieldCheck, count: "662" },
    ],
  },
  {
    label: "Quản trị người dùng",
    items: [{ href: "#", label: "Duyệt tài khoản", icon: Users, count: "24" }],
  },
];

export function AdminAppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <Link href="/" className="px-2 py-1">
          <SiteMark />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.live &&
                    (item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`));

                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <Link href={item.href} aria-disabled={!item.live}>
                          <Icon />
                          <span>{item.label}</span>
                          {item.count ? (
                            <span className="ml-auto text-xs opacity-70">
                              {item.count}
                            </span>
                          ) : null}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-3 text-sm text-sidebar-foreground">
          <Badge className="mb-2 rounded-full bg-[#d8c79a]/14 text-[#f5e1ae] hover:bg-[#d8c79a]/14">
            Nội bộ
          </Badge>
          <p className="font-medium">Không gian làm việc CB-SDL</p>
          <p className="mt-2 text-xs leading-5 text-sidebar-foreground/70">
            Giữ live cho dashboard và bài viết. Các mục còn lại là cấu trúc định
            hướng theo giao diện mới.
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
