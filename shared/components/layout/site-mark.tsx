import { Database, Orbit } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type SiteMarkProps = {
  className?: string;
  inverted?: boolean;
};

export function SiteMark({ className, inverted = false }: SiteMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex size-12 items-center justify-center overflow-hidden rounded-2xl border shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]",
          inverted
            ? "border-[#d8c79a]/30 bg-white/8 text-[#f6e8bf]"
            : "border-[#d8c79a] bg-[linear-gradient(180deg,#fffdfa_0%,#f3ead6_100%)] text-[#0f172a]"
        )}
      >
        <Orbit className="absolute size-7 opacity-30" />
        <Database className="relative size-4.5" />
      </div>
      <div className="space-y-0.5">
        <p
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.3em]",
            inverted ? "text-[#d8c79a]" : "text-[#8c7550]"
          )}
        >
          Trung tâm Dữ liệu Quốc gia
        </p>
        <div className="space-y-0.5">
          <p
            className={cn(
              "text-sm font-semibold tracking-[0.01em]",
              inverted ? "text-white" : "text-[#0f172a]"
            )}
          >
            Sàn Dữ liệu Quốc gia
          </p>
          <p
            className={cn(
              "text-xs",
              inverted ? "text-slate-400" : "text-slate-500"
            )}
          >
            Nền tảng dữ liệu chính thống
          </p>
        </div>
      </div>
    </div>
  );
}
