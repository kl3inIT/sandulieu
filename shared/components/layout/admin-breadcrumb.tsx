"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";

const SEGMENT_LABELS: Record<string, string> = {
  // Actions
  new: "Tạo mới",
  edit: "Chỉnh sửa",
  // Resources
  organizations: "Tổ chức",
  departments: "Phòng ban",
  members: "Thành viên",
  posts: "Bài đăng",
  accounts: "Tài khoản",
  services: "Dịch vụ",
  "service-groups": "Nhóm dịch vụ",
  auctions: "Đấu giá",
  datasets: "Bộ dữ liệu",
  catalogs: "Danh mục",
  transactions: "Giao dịch",
  disputes: "Khiếu nại",
  notifications: "Thông báo",
  reports: "Báo cáo",
  settings: "Cài đặt",
  monitoring: "Giám sát",
  moderation: "Kiểm duyệt",
  audit: "Nhật ký kiểm toán",
  pii: "Dữ liệu cá nhân",
  pricing: "Định giá",
  quality: "Chất lượng",
  consent: "Đồng ý",
};

type CrumbItem = { label: string; href: string };

function buildCrumbs(pathname: string): CrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] is always "admin"

  const crumbs: CrumbItem[] = [{ label: "Tổng quan", href: "/admin" }];

  let currentPath = "/admin";
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    currentPath = `${currentPath}/${segment}`;
    const label = SEGMENT_LABELS[segment] ?? segment;
    crumbs.push({ label, href: currentPath });
  }

  return crumbs;
}

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  // Don't render on dashboard root
  if (crumbs.length <= 1) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
