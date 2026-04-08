import Link from "next/link";

import { SiteMark } from "@/shared/components/layout/site-mark";

const sections = [
  {
    title: "Nền tảng",
    links: [
      { href: "/#features", label: "Chức năng" },
      { href: "/#catalog", label: "Danh mục dữ liệu" },
      { href: "/#roles", label: "Đối tượng sử dụng" },
    ],
  },
  {
    title: "Truy cập nhanh",
    links: [
      { href: "/login", label: "Đăng nhập" },
      { href: "/admin", label: "Khu vực CB-SDL" },
      { href: "/buyer", label: "Khu vực Bên mua" },
    ],
  },
  {
    title: "Liên hệ",
    links: [
      { href: "/#about", label: "Giới thiệu" },
      { href: "/#news", label: "Tin tức" },
      { href: "/", label: "Điều khoản sử dụng" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#09111d] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,0.55fr)] lg:px-8 lg:py-16">
        <div className="space-y-5">
          <SiteMark inverted />
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Sàn Dữ liệu Quốc gia là lớp điều phối giữa Cơ quan Nhà nước, doanh
            nghiệp và công dân trên cùng một hạ tầng khai thác, giao dịch và sử
            dụng dữ liệu minh bạch.
          </p>
          <div className="grid gap-2 text-sm text-slate-400">
            <p>Địa chỉ: Trung tâm Dữ liệu Quốc gia</p>
            <p>Email: support@sandulieu.gov.vn</p>
            <p>Đường dây hỗ trợ: 1900 6868</p>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-sm font-semibold text-white">{section.title}</p>
            <div className="mt-4 grid gap-3">
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 px-4 py-4 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        © 2026 Trung tâm Dữ liệu Quốc gia · Sàn Dữ liệu Quốc gia
      </div>
    </footer>
  );
}
