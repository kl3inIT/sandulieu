"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

import { sellerNavGroups, sellerUser } from "@/features/seller/data";
import { SiteMark } from "@/shared/components/layout/site-mark";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn } from "@/shared/lib/utils";

type SellerShellProps = {
  children: ReactNode;
};

export function SellerShell({ children }: SellerShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fafd_0%,#eef4fa_100%)] text-foreground">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "hidden border-r border-border/70 bg-card lg:sticky lg:top-0 lg:flex lg:h-screen lg:shrink-0 lg:overflow-hidden",
            "transition-[width] duration-200 ease-in-out",
            sidebarOpen ? "lg:w-[254px]" : "lg:w-0 lg:border-r-0"
          )}
        >
          <SellerSidebar pathname={pathname} />
        </aside>

        <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
          {/* ── Header ── */}
          <header className="sticky top-0 z-30 h-14 border-b border-border/70 bg-background/95 backdrop-blur-sm">
            <div className="flex h-full items-center gap-1 px-3 sm:px-4">
              {/* Mobile: sheet trigger */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Mở menu">
                      <Menu className="text-muted-foreground" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] p-0">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Điều hướng seller</SheetTitle>
                      <SheetDescription>
                        Điều hướng các khu vực vận hành của bên bán.
                      </SheetDescription>
                    </SheetHeader>
                    <SellerSidebar pathname={pathname} />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop: sidebar toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label={sidebarOpen ? "Đóng menu" : "Mở menu"}
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="text-muted-foreground" />
                ) : (
                  <PanelLeftOpen className="text-muted-foreground" />
                )}
              </Button>

              <Separator
                orientation="vertical"
                className="mx-1 hidden h-5 lg:block"
              />

              {/* Branding pill */}
              <div className="hidden items-center gap-2 lg:flex">
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full px-3 text-[11px] font-semibold tracking-wide"
                >
                  BÊN BÁN
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Sàn Dữ liệu Quốc gia
                </span>
              </div>

              {/* Search — flex-1 */}
              <div className="relative mx-2 flex-1 sm:mx-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-8 rounded-lg bg-muted/60 pl-9 text-[13px] shadow-none focus-visible:bg-card"
                  placeholder="Tìm dịch vụ, bộ dữ liệu, giao dịch..."
                />
              </div>

              {/* Icon actions */}
              <div className="hidden items-center gap-0.5 md:flex">
                <IconButton icon={CircleHelp} label="Hỗ trợ" />
                <div className="relative">
                  <IconButton icon={Bell} label="Thông báo" />
                  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
                </div>
                <IconButton icon={Settings} label="Cài đặt" />
              </div>

              <Separator
                orientation="vertical"
                className="mx-1 hidden h-5 md:block"
              />

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-9 gap-2 rounded-xl px-2 hover:bg-muted"
                  >
                    <Avatar className="size-7 bg-primary text-primary-foreground">
                      <AvatarFallback className="size-7 bg-primary text-xs font-semibold text-primary-foreground">
                        {sellerUser.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col items-start text-left sm:flex">
                      <span className="text-[13px] font-semibold leading-tight text-foreground">
                        {sellerUser.name}
                      </span>
                      <span className="text-[11px] leading-tight text-muted-foreground">
                        {sellerUser.companyShort}
                      </span>
                    </div>
                    <ChevronDown className="hidden size-3.5 shrink-0 text-muted-foreground sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <Avatar className="size-9 bg-primary text-primary-foreground">
                        <AvatarFallback className="size-9 bg-primary text-sm font-semibold text-primary-foreground">
                          {sellerUser.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-sm font-semibold text-foreground">
                          {sellerUser.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {sellerUser.company}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserRound />
                      Thông tin tài khoản
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings />
                      Cài đặt workspace
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 px-3 py-5 sm:px-4 lg:px-8 lg:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function SellerSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full w-[254px] shrink-0 flex-col">
      <div className="shrink-0 border-b border-border/70 px-4 py-3">
        <Link href="/" className="block">
          <SiteMark />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="flex flex-col gap-4">
          {sellerNavGroups.map((group) => (
            <section key={group.label} className="flex flex-col gap-1.5">
              <h2 className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {group.label}
              </h2>
              <nav className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/seller" &&
                      pathname.startsWith(`${item.href}/`));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={cn(
                            "size-4 shrink-0",
                            isActive
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </span>
                      {item.badge ? (
                        <Badge
                          variant={isActive ? "secondary" : "outline"}
                          className={cn(
                            "rounded-full px-2 py-0 text-[11px]",
                            isActive &&
                              "border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </section>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-border/70 p-3">
        <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/40 p-3">
          <Avatar className="size-8 shrink-0 bg-primary text-primary-foreground">
            <AvatarFallback className="size-8 bg-primary text-xs font-semibold text-primary-foreground">
              {sellerUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{sellerUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {sellerUser.companyShort}
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 rounded-lg"
            aria-label="Đăng xuất"
          >
            <Link href="/login">
              <LogOut className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  icon: Icon,
  label,
}: {
  icon: typeof CircleHelp;
  label: string;
}) {
  return (
    <Button variant="ghost" size="icon" className="size-8" aria-label={label}>
      <Icon className="size-4 text-muted-foreground" />
    </Button>
  );
}
