import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Search } from "lucide-react";

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
      <SidebarInset className="min-h-svh bg-[#f3f5f8]">
        <header className="border-b border-[#d9e0e7] bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  CB-SDL
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#0f172a]">
                  Sàn Dữ liệu Quốc gia
                </h1>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 xl:max-w-3xl xl:flex-row xl:items-center xl:justify-end">
              <div className="relative w-full xl:max-w-xl">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className="h-11 border-slate-200 bg-slate-50 pl-10"
                  placeholder="Tìm dịch vụ, bộ dữ liệu, giao dịch…"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 border-slate-200"
                >
                  <Bell className="size-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 border-slate-200"
                >
                  <Link href="/">Trang chủ</Link>
                </Button>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#0f172a] text-sm font-semibold text-[#f4dfab]">
                    LK
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-[#0f172a]">
                      Lê Minh Khoa
                    </p>
                    <p className="text-xs text-slate-500">
                      Trung tâm Dữ liệu Quốc gia
                    </p>
                  </div>
                  <ChevronDown className="size-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
