import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

const accessNotes = [
  "Buyer, seller và admin sẽ cùng dùng chung auth flow.",
  "Trang này mới là UI shell, chưa nối API hoặc session thật.",
  "Có thể gắn React Query, Server Actions hoặc provider auth ở bước sau.",
];

export default function LoginPage() {
  return (
    <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white backdrop-blur-xl">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
          <ShieldCheck className="size-6" />
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            Login shell
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Đăng nhập vào hệ thống điều hành dữ liệu.
          </h1>
          <p className="max-w-xl text-base leading-8 text-slate-300">
            Luồng này tách riêng khỏi public layout để sau này bạn thêm
            middleware, role-based redirect và session handling mà không ảnh
            hưởng giao diện public.
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {accessNotes.map((note) => (
            <div
              key={note}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-8 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.6)]">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
            <LockKeyhole className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-400">
              Access
            </p>
            <h2 className="text-2xl font-semibold text-zinc-950">Đăng nhập</h2>
          </div>
        </div>

        <form className="mt-8 space-y-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-700">Email</span>
            <input
              type="email"
              placeholder="admin@sandulieu.vn"
              className="h-12 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-zinc-400 focus:bg-white"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-700">Mật khẩu</span>
            <input
              type="password"
              placeholder="••••••••"
              className="h-12 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-zinc-400 focus:bg-white"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-950">Admin</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Quyền cấu hình và vận hành toàn hệ thống.
              </p>
            </label>
            <label className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-950">
                Buyer / Seller
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Có thể tách sang flow riêng khi bạn thêm multi-role auth.
              </p>
            </label>
          </div>

          <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
            Tiếp tục
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-zinc-500">
          <span>Chưa có tích hợp backend auth.</span>
          <Link href="/admin" className="font-medium text-zinc-950">
            Xem admin demo
          </Link>
        </div>
      </section>
    </div>
  );
}
