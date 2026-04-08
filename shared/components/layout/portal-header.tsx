import Link from "next/link";
import { Bell, Search } from "lucide-react";

type PortalHeaderProps = {
  eyebrow: string;
  title: string;
};

export function PortalHeader({ eyebrow, title }: PortalHeaderProps) {
  return (
    <header className="border-b border-white/8 bg-[#0b1321]/82 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#d9c48d]">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-11 min-w-64 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-slate-400">
            <Search className="size-4" />
            <span className="text-sm">Tìm dữ liệu, người dùng, logs</span>
          </div>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08]"
            aria-label="Thông báo"
          >
            <Bell className="size-4" />
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-2xl border border-white/10 px-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
          >
            Về public
          </Link>
        </div>
      </div>
    </header>
  );
}
