"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
} from "lucide-react";

import { adminUser } from "@/features/admin/data";
import { AdminAppSidebar } from "@/shared/components/layout/admin-app-sidebar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useIsMobile } from "@/shared/hooks/use-mobile";

const RAIL_WIDTH = 80;
const SIDEBAR_WIDTH = 256;
const DRAWER_EASING = "cubic-bezier(0.05,0.74,0.2,0.99)";
const DRAWER_DURATION = 400;

export function AdminPortalShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  const isMobile = useIsMobile();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSlimDesktop, setIsSlimDesktop] = useState(true);
  const [isDesktopDrawerOpen, setIsDesktopDrawerOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobile && isMobileSidebarOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobile, isMobileSidebarOpen]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleDrawerClose = () => {
    if (isMobile || !isSlimDesktop) {
      return;
    }

    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsDesktopDrawerOpen(false);
      closeTimerRef.current = null;
    }, 120);
  };

  const openDesktopDrawer = () => {
    if (isMobile || !isSlimDesktop) {
      return;
    }

    clearCloseTimer();
    setIsDesktopDrawerOpen(true);
  };

  const closeAllMenus = () => {
    clearCloseTimer();
    setIsDesktopDrawerOpen(false);
    setIsMobileSidebarOpen(false);
  };

  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsMobileSidebarOpen((prev) => !prev);
      return;
    }

    clearCloseTimer();
    setIsDesktopDrawerOpen(false);
    setIsSlimDesktop((prev) => !prev);
  };

  const showOverlay =
    (isMobile && isMobileSidebarOpen) || (!isMobile && isSlimDesktop && isDesktopDrawerOpen);
  const desktopOffset = isSlimDesktop ? RAIL_WIDTH : SIDEBAR_WIDTH;

  return (
    <div className="min-h-svh bg-[#eef3f8] text-[#0b2e5c]">
      <AdminAppSidebar
        mode={isMobile ? "mobile" : isSlimDesktop ? "slim" : "full"}
        drawerOpen={isDesktopDrawerOpen}
        mobileOpen={isMobileSidebarOpen}
        onRailMouseEnter={openDesktopDrawer}
        onRailMouseLeave={scheduleDrawerClose}
        onPanelMouseEnter={clearCloseTimer}
        onPanelMouseLeave={scheduleDrawerClose}
        onClose={closeAllMenus}
        onNavigate={closeAllMenus}
      />

      <div
        className="min-h-svh transition-[margin] ease-[cubic-bezier(0.05,0.74,0.2,0.99)]"
        style={{
          marginLeft: isMobile ? 0 : desktopOffset,
          transitionDuration: `${DRAWER_DURATION}ms`,
          transitionTimingFunction: DRAWER_EASING,
        }}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[hsl(var(--border))] bg-white/90 px-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSidebarToggle}
              className="flex h-10 w-10 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[#f5f8fc] hover:text-[#0b2e5c]"
              aria-label={isMobile ? "Mở điều hướng" : isSlimDesktop ? "Mở sidebar đầy đủ" : "Thu gọn sidebar"}
            >
              {isMobile ? (
                isMobileSidebarOpen ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )
              ) : isSlimDesktop ? (
                <PanelLeftOpen className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </Button>
            <div className="inline-flex items-center gap-1 rounded-full border border-transparent bg-[#dbe8f7] px-2.5 py-0.5 text-xs font-medium text-[#1f4b82]">
              CB-SDL
            </div>
            <span className="hidden text-xs text-[hsl(var(--muted-foreground))] md:inline">
              Sàn Dữ liệu Quốc gia
            </span>
          </div>

          <div className="relative ml-auto hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input
              className="h-10 rounded-md border-[hsl(var(--input))] bg-[hsl(var(--background))] pl-10"
              placeholder="Tìm dịch vụ, bộ dữ liệu, giao dịch…"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[#f5f8fc] hover:text-[#0b2e5c]"
            >
              <CircleHelp className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[#f5f8fc] hover:text-[#0b2e5c]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[hsl(var(--destructive))]" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[#f5f8fc] hover:text-[#0b2e5c]"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="ml-2 flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-white px-2 py-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a72c] to-[#b8891f] text-xs font-semibold text-white">
                {adminUser.initials}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-[#0b2e5c]">{adminUser.name}</div>
                <div className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  {adminUser.unit}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>

      <button
        type="button"
        aria-label="Đóng overlay điều hướng"
        onClick={closeAllMenus}
        className={
          "fixed inset-0 z-40 bg-[#0b1f3a]/24 transition-opacity ease-[cubic-bezier(0.05,0.74,0.2,0.99)] " +
          (showOverlay ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
        style={{
          transitionDuration: `${Math.max(DRAWER_DURATION - 80, 220)}ms`,
          transitionTimingFunction: DRAWER_EASING,
        }}
      />
    </div>
  );
}
