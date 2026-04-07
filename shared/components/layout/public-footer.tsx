import Link from "next/link";

import { SiteMark } from "@/shared/components/layout/site-mark";

const footerLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/buyer", label: "Buyer" },
  { href: "/seller", label: "Seller" },
  { href: "/login", label: "Đăng nhập" },
  { href: "/admin", label: "Quản trị" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white/90">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <SiteMark />
          <p className="max-w-xl text-sm leading-6 text-zinc-600">
            Nền tảng dữ liệu tập trung cho buyer, seller và khối vận hành, ưu
            tiên giao diện rõ ràng, tải nhanh và dễ mở rộng theo từng portal.
          </p>
        </div>
        <div className="grid gap-2 sm:justify-items-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            >
              {link.label}
            </Link>
          ))}
          <p className="pt-4 text-xs uppercase tracking-[0.24em] text-zinc-400">
            Xây dựng cho sandulieu.vercel.app
          </p>
        </div>
      </div>
    </footer>
  );
}
