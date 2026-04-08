import Link from "next/link";
import { ShieldCheck, type LucideIcon } from "lucide-react";

import { SiteMark } from "@/shared/components/layout/site-mark";
import { cn } from "@/shared/lib/utils";

export type PortalSidebarItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type PortalSidebarProps = {
  portalLabel: string;
  portalHint: string;
  items: PortalSidebarItem[];
};

export function PortalSidebar({
  portalLabel,
  portalHint,
  items,
}: PortalSidebarProps) {
  return (
    <aside className="flex h-full flex-col border-r border-white/8 bg-[linear-gradient(180deg,#08111d_0%,#0d1625_100%)] px-5 py-6 text-white">
      <Link href="/">
        <SiteMark inverted />
      </Link>
      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)]">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#d9c48d]">
          {portalLabel}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-400">{portalHint}</p>
      </div>
      <div className="mt-6 space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={`${item.label}-${index}`}
              href={item.href}
              className={cn(
                "flex items-start gap-3 rounded-[1.3rem] border px-4 py-3 transition",
                index === 0
                  ? "border-[#d9c48d]/30 bg-[#d9c48d]/10"
                  : "border-transparent bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06]"
              )}
            >
              <div className="mt-0.5 flex size-9 items-center justify-center rounded-xl bg-white/10 text-[#f3dfab]">
                <Icon className="size-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs leading-5 text-slate-400">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#d9c48d]/15 text-[#f6e8bf]">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">{portalLabel}</p>
            <p className="text-xs text-slate-400">Portal shell</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
