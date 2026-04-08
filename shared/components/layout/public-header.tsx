import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { SiteMark } from "@/shared/components/layout/site-mark";
import { Button } from "@/shared/components/ui/button";

const navigation = [
  { href: "/#features", label: "Chức năng" },
  { href: "/#catalog", label: "Danh mục dữ liệu" },
  { href: "/#roles", label: "Đối tượng sử dụng" },
  { href: "/#about", label: "Giới thiệu" },
  { href: "/#news", label: "Tin tức" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08111f]/88 text-white backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <SiteMark inverted />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:inline-flex"
            aria-label="Tìm kiếm"
          >
            <Search className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Điều hướng"
          >
            <Menu className="size-4" />
          </Button>
          <Button
            asChild
            variant="ghost"
            className="hidden rounded-full px-4 text-white hover:bg-white/8 hover:text-white sm:inline-flex"
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/login">Đăng ký tài khoản</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
