import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteMark } from "@/shared/components/layout/site-mark";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#07101d] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Quay lại trang chủ
          </Link>
          <SiteMark inverted />
        </div>

        <div className="flex flex-1 items-center py-10">{children}</div>
      </div>
    </div>
  );
}
