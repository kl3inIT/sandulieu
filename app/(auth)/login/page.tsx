import Link from "next/link";
import {
  ArrowRight,
  Building2,
  IdCard,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

const highlights = [
  "Đăng nhập một lần (SSO) qua VNeID cho công dân.",
  "Xác thực 2 yếu tố cho tài khoản tổ chức và vận hành nội bộ.",
  "Tuân thủ định hướng bảo vệ dữ liệu cá nhân và nhật ký truy cập tập trung.",
];

const quickAccess = [
  {
    title: "Bên mua",
    subtitle: "Khai thác, sử dụng dữ liệu",
    href: "/buyer",
    icon: IdCard,
  },
  {
    title: "Bên bán",
    subtitle: "Chào bán sản phẩm dữ liệu",
    href: "/seller",
    icon: Building2,
  },
  {
    title: "CB-SDL",
    subtitle: "Cán bộ vận hành Sàn",
    href: "/admin",
    icon: ShieldCheck,
  },
];

export default function LoginPage() {
  return (
    <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm lg:min-h-[44rem] lg:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-[#d8c79a]">
            Nền tảng dữ liệu quốc gia
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Đăng nhập vào Sàn Dữ liệu Quốc gia
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            Một tài khoản duy nhất để truy cập toàn bộ dịch vụ dữ liệu, sản phẩm
            dữ liệu thương mại và các tiện ích nghiệp vụ theo đúng vai trò sử
            dụng của bạn.
          </p>
        </div>

        <div className="mt-10 grid gap-3">
          {highlights.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-slate-300"
            >
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#e7d7af]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-400">
          © 2026 Trung tâm Dữ liệu Quốc gia
        </p>
      </section>

      <section className="rounded-[2rem] border border-[#d9d9d9] bg-white p-8 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.45)] lg:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a]">
          Đăng nhập
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/login"
            className="font-medium text-[#0f172a] underline underline-offset-4"
          >
            Đăng ký ngay
          </Link>
        </p>

        <div className="mt-8">
          <Button type="button" size="lg" className="h-12 w-full rounded-2xl">
            <ShieldCheck className="size-4" />
            Đăng nhập bằng VNeID
          </Button>
        </div>

        <div className="my-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          <div className="h-px flex-1 bg-slate-200" />
          <span>Hoặc tiếp tục với tài khoản</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form className="space-y-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">
              Tên đăng nhập / Email / Số ĐKKD
            </span>
            <input
              type="text"
              placeholder="vd: nguyenvana@company.vn"
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f172a] focus:bg-white"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Mật khẩu</span>
            <input
              type="password"
              placeholder="••••••••"
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f172a] focus:bg-white"
            />
          </label>

          <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-4 rounded border-slate-300"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link
              href="/login"
              className="font-medium text-[#0f172a] underline underline-offset-4"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
            <LockKeyhole className="size-4" />
            Đăng nhập
          </Button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-slate-600">
            Truy cập nhanh theo vai trò (demo)
          </p>
          <div className="mt-4 grid gap-3">
            {quickAccess.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[#0f172a] text-[#f4dfab]">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f172a]">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
