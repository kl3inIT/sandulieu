"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
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

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fafd_0%,#eef4fa_100%)] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[254px_1fr]">
        <aside className="hidden border-r border-border/70 bg-card lg:flex">
          <SellerSidebar pathname={pathname} />
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur-sm">
            <div className="flex min-h-13 items-center gap-2 px-3 sm:px-4 lg:px-5">
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Mở menu seller"
                    >
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] p-0">
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

              <div className="hidden min-w-0 items-center gap-3 lg:flex">
                <Badge className="h-6 rounded-full bg-secondary px-3 text-[11px] text-primary">
                  BÊN BÁN
                </Badge>
                <span className="truncate text-sm text-muted-foreground">
                  Sàn Dữ liệu Quốc gia
                </span>
              </div>

              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-8 rounded-xl bg-card pl-10 text-[13px] shadow-none"
                  placeholder="Tìm dịch vụ, bộ dữ liệu, giao dịch..."
                />
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <IconButton icon={CircleHelp} label="Hỗ trợ" />
                <div className="relative">
                  <IconButton icon={Bell} label="Thông báo" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
                </div>
                <IconButton icon={Settings} label="Cài đặt" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 rounded-xl px-3 sm:min-w-52 sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-primary text-primary-foreground">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {sellerUser.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden text-left sm:block">
                        <p className="text-sm font-semibold text-foreground">
                          {sellerUser.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sellerUser.company}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="hidden text-muted-foreground sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
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
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border/70 px-4 py-4">
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
              <nav className="flex flex-col gap-1.5">
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
                        "flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium transition",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={cn(
                            isActive ? "text-chart-1" : "text-muted-foreground"
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

      <div className="border-t border-border/70 p-3">
        <div className="flex items-center gap-3 rounded-3xl border border-border/70 bg-muted/40 p-3">
          <Avatar className="bg-primary text-primary-foreground">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {sellerUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{sellerUser.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {sellerUser.companyShort}
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg"
            aria-label="Đăng xuất"
          >
            <Link href="/login">
              <LogOut />
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
    <Button variant="ghost" size="icon" aria-label={label}>
      <Icon className="text-muted-foreground" />
    </Button>
  );
}
