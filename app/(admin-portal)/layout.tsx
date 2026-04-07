import type { ReactNode } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import { AdminAppSidebar } from "@/shared/components/layout/admin-app-sidebar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

export default function AdminPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider defaultOpen>
      <AdminAppSidebar />
      <SidebarInset className="min-h-svh bg-[linear-gradient(180deg,#f8fafc_0%,#f4f7fb_100%)]">
        <header className="border-b border-zinc-200/80 bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                  Khu vực quản trị
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                  Bảng điều khiển hệ thống
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Input
                className="min-w-64 border-zinc-200 bg-white"
                placeholder="Tìm dữ liệu, người dùng, logs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Thông báo"
                className="bg-white"
              >
                <Bell />
              </Button>
              <Button asChild variant="outline" className="bg-white">
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
