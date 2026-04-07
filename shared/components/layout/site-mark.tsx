import { Database } from "lucide-react";

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
          "flex size-11 items-center justify-center rounded-2xl border shadow-sm",
          inverted
            ? "border-white/15 bg-white/10 text-white"
            : "border-zinc-200 bg-white text-zinc-900"
        )}
      >
        <Database className="size-5" />
      </div>
      <div className="space-y-0.5">
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-[0.24em]",
            inverted ? "text-zinc-400" : "text-zinc-500"
          )}
        >
          Sandulieu
        </p>
        <p
          className={cn(
            "text-sm font-semibold",
            inverted ? "text-white" : "text-zinc-950"
          )}
        >
          Data Platform
        </p>
      </div>
    </div>
  );
}
