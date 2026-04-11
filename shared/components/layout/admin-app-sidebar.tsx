"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";

import { adminNavGroups, adminUser } from "@/features/admin/data";
import { cn } from "@/shared/lib/utils";

type AdminSidebarMode = "static" | "slim" | "drawer" | "overlay" | "mobile";

type AdminAppSidebarProps = {
  mode: AdminSidebarMode;
  drawerOpen: boolean;
  mobileOpen: boolean;
  onRailMouseEnter: () => void;
  onRailMouseLeave: () => void;
  onPanelMouseEnter: () => void;
  onPanelMouseLeave: () => void;
  onClose: () => void;
  onItemNavigate: () => void;
};

const DRAWER_EASING = "cubic-bezier(0.22,1,0.36,1)";
const DRAWER_DURATION = 460;
const CONTENT_DURATION = 420;

function SidebarBrand({ compact }: { compact: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", compact && "justify-center")}>
      <div className="relative h-11 w-11 shrink-0">
        <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f1cf72" />
              <stop offset="1" stopColor="#b8891f" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#logoGrad)" />
          <circle cx="24" cy="24" r="20" fill="#0b2e5c" />
          <path
            d="M14 18 L24 13 L34 18 L34 30 L24 35 L14 30 Z"
            stroke="url(#logoGrad)"
            strokeWidth="1.8"
            fill="none"
          />
          <circle cx="24" cy="18" r="2" fill="url(#logoGrad)" />
          <circle cx="14" cy="24" r="2" fill="url(#logoGrad)" />
          <circle cx="34" cy="24" r="2" fill="url(#logoGrad)" />
          <circle cx="24" cy="30" r="2" fill="url(#logoGrad)" />
          <line
            x1="24"
            y1="18"
            x2="14"
            y2="24"
            stroke="url(#logoGrad)"
            strokeWidth="1"
          />
          <line
            x1="24"
            y1="18"
            x2="34"
            y2="24"
            stroke="url(#logoGrad)"
            strokeWidth="1"
          />
          <line
            x1="14"
            y1="24"
            x2="24"
            y2="30"
            stroke="url(#logoGrad)"
            strokeWidth="1"
          />
          <line
            x1="34"
            y1="24"
            x2="24"
            y2="30"
            stroke="url(#logoGrad)"
            strokeWidth="1"
          />
        </svg>
      </div>
      {!compact ? (
        <div className="flex flex-col leading-tight">
          <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-wider text-[#b8891f]">
            Trung tâm Dữ liệu Quốc gia
          </span>
          <span className="whitespace-nowrap text-base font-bold tracking-tight text-[#0b2e5c]">
            Sàn Dữ liệu Quốc gia
          </span>
        </div>
      ) : null}
    </div>
  );
}

function SidebarSection({
  compact,
  expanded,
  onItemNavigate,
}: {
  compact: boolean;
  expanded: boolean;
  onItemNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {adminNavGroups.map((group) => (
        <div key={group.label} className="mb-6 last:mb-0">
          {expanded ? (
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              {group.label}
            </div>
          ) : null}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onNavigate={onItemNavigate}
                  prefetch={true}
                  className={cn(
                    "group flex items-center rounded-md text-sm font-medium transition-all",
                    expanded
                      ? "gap-3 px-3 py-2"
                      : "mx-auto h-12 w-12 justify-center rounded-2xl",
                    isActive
                      ? "bg-[#0b2e5c] text-white shadow-sm"
                      : "text-[#1f3b63] hover:bg-[#f5f8fc] hover:text-[#0b2e5c]"
                  )}
                  title={compact ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive
                        ? "text-[#f1cf72]"
                        : "text-[hsl(var(--muted-foreground))]"
                    )}
                  />
                  {expanded ? (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-medium",
                            isActive
                              ? "bg-[#f1cf72]/15 text-[#f1cf72]"
                              : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

function SidebarFooterCard({ compact }: { compact: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center rounded-lg border border-[hsl(var(--border))] bg-[#f5f8fc] text-[#0b2e5c]",
        compact ? "justify-center rounded-[22px] p-2" : "gap-3 p-3"
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a72c] to-[#b8891f] font-semibold text-white",
          compact ? "h-12 w-12 text-base" : "h-10 w-10 text-sm"
        )}
      >
        {adminUser.initials}
      </div>
      {!compact ? (
        <>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-[#0b2e5c]">
              {adminUser.name}
            </div>
            <div className="truncate text-[11px] text-[hsl(var(--muted-foreground))]">
              {adminUser.unit}
            </div>
          </div>
          <Link
            href="/login"
            className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[#0b2e5c]"
            aria-label="Đăng xuất"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </>
      ) : null}
    </div>
  );
}

export function AdminAppSidebar({
  mode,
  drawerOpen,
  mobileOpen,
  onRailMouseEnter,
  onRailMouseLeave,
  onPanelMouseEnter,
  onPanelMouseLeave,
  onClose,
  onItemNavigate,
}: AdminAppSidebarProps) {
  const showRail = mode === "slim";
  const showDesktopPanel = mode !== "mobile";
  const showMobilePanel = mode === "mobile";
  const desktopPanelVisible =
    mode === "static" ||
    (mode === "slim" && drawerOpen) ||
    ((mode === "drawer" || mode === "overlay") && drawerOpen);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-20 flex-col border-r border-[hsl(var(--border))] bg-white transition-[transform,opacity] ease-[cubic-bezier(0.05,0.74,0.2,0.99)] lg:flex",
          showRail
            ? "translate-x-0 opacity-100"
            : "-translate-x-1 opacity-0 pointer-events-none"
        )}
        style={{
          transitionDuration: `${DRAWER_DURATION}ms`,
          transitionTimingFunction: DRAWER_EASING,
        }}
        onMouseEnter={onRailMouseEnter}
        onMouseLeave={onRailMouseLeave}
      >
        <div className="flex h-16 items-center justify-center border-b border-[hsl(var(--border))] px-3">
          <Link
            href="/"
            aria-label="Sàn Dữ liệu Quốc gia"
            onNavigate={onItemNavigate}
            prefetch={true}
          >
            <SidebarBrand compact />
          </Link>
        </div>
        <div className="flex-1 overflow-hidden px-2 py-4">
          <nav
            data-admin-sidebar-scroll
            className="h-full w-[calc(100%+32px)] overflow-y-auto pr-8"
          >
            <div className="w-12">
              <SidebarSection
                compact
                expanded={false}
                onItemNavigate={onItemNavigate}
              />
            </div>
          </nav>
        </div>
        <div className="border-t border-[hsl(var(--border))] p-2">
          <SidebarFooterCard compact />
        </div>
      </aside>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[hsl(var(--border))] bg-white transition-[transform,opacity,box-shadow] ease-[cubic-bezier(0.05,0.74,0.2,0.99)]",
          showDesktopPanel && "hidden lg:flex",
          showMobilePanel && "lg:hidden",
          mode === "static" && "translate-x-0 opacity-100 shadow-none",
          mode === "slim" &&
            (desktopPanelVisible
              ? "translate-x-0 opacity-100 shadow-[0_18px_45px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)]"
              : "-translate-x-2 opacity-0 pointer-events-none shadow-none"),
          (mode === "drawer" || mode === "overlay") &&
            (desktopPanelVisible
              ? mode === "overlay"
                ? "translate-x-0 opacity-100 shadow-[0_24px_60px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.08)]"
                : "translate-x-0 opacity-100 shadow-[0_18px_45px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)]"
              : "-translate-x-full opacity-0 pointer-events-none shadow-none"),
          mode === "mobile" &&
            (mobileOpen
              ? "translate-x-0 opacity-100 shadow-[0_18px_45px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)]"
              : "-translate-x-full opacity-100 pointer-events-none shadow-none")
        )}
        style={{
          transitionDuration: `${DRAWER_DURATION}ms`,
          transitionTimingFunction: DRAWER_EASING,
        }}
        onMouseEnter={showDesktopPanel ? onPanelMouseEnter : undefined}
        onMouseLeave={showDesktopPanel ? onPanelMouseLeave : undefined}
      >
        <div className="flex h-16 items-center border-b border-[hsl(var(--border))] px-5">
          <Link
            href="/"
            aria-label="Sàn Dữ liệu Quốc gia"
            onNavigate={onItemNavigate}
            prefetch={true}
          >
            <SidebarBrand compact={false} />
          </Link>
        </div>
        <div className="flex-1 overflow-hidden px-3 py-4">
          <nav
            data-admin-sidebar-scroll
            className={cn(
              "h-full w-[calc(100%+32px)] overflow-y-auto pr-8 transition-[opacity,transform] ease-[cubic-bezier(0.05,0.74,0.2,0.99)]",
              mode === "slim" && !desktopPanelVisible
                ? "-translate-x-1.5 opacity-0"
                : "translate-x-0 opacity-100",
              (mode === "drawer" || mode === "overlay") && !desktopPanelVisible
                ? "-translate-x-1.5 opacity-0"
                : ""
            )}
            style={{
              transitionDuration: `${CONTENT_DURATION}ms`,
              transitionTimingFunction: DRAWER_EASING,
            }}
          >
            <SidebarSection
              compact={false}
              expanded
              onItemNavigate={onItemNavigate}
            />
          </nav>
        </div>
        <div
          className={cn(
            "border-t border-[hsl(var(--border))] p-3 transition-[opacity,transform] ease-[cubic-bezier(0.05,0.74,0.2,0.99)]",
            mode === "slim" && !desktopPanelVisible
              ? "-translate-x-1.5 opacity-0"
              : "translate-x-0 opacity-100",
            (mode === "drawer" || mode === "overlay") && !desktopPanelVisible
              ? "-translate-x-1.5 opacity-0"
              : ""
          )}
          style={{
            transitionDuration: `${CONTENT_DURATION}ms`,
            transitionTimingFunction: DRAWER_EASING,
          }}
        >
          <SidebarFooterCard compact={false} />
        </div>
        {showMobilePanel ? (
          <button
            type="button"
            aria-label="Đóng sidebar"
            onClick={onClose}
            className={cn(
              "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2e5c] text-white transition-all ease-[cubic-bezier(0.05,0.74,0.2,0.99)] lg:hidden",
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0 pointer-events-none"
            )}
            style={{
              transitionDuration: `${CONTENT_DURATION}ms`,
              transitionTimingFunction: DRAWER_EASING,
            }}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </aside>
    </>
  );
}
