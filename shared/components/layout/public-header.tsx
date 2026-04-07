import Link from "next/link";

import { SiteMark } from "@/shared/components/layout/site-mark";
import { Button } from "@/shared/components/ui/button";

const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/buyer", label: "Buyer" },
  { href: "/seller", label: "Seller" },
  { href: "/login", label: "Đăng nhập" },
  { href: "/admin", label: "Quản trị" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <SiteMark />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full bg-white sm:inline-flex"
          >
            <Link href="/admin">Vào quản trị</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
