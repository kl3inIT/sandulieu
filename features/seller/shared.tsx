import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export {
  BuyerPageHeader as SellerPageHeader,
  HeaderButton,
  HeaderLinkButton,
  SearchInput,
  MetricGrid,
  SummaryCard,
  UsageOverviewCard,
  EndpointListCard,
  AnalyticsHeatmapCard,
  StatusPill,
  IconSurface,
  GhostIconButton,
  StatBlock,
  StatMini,
  Field,
  BillingRow,
} from "@/features/buyer/shared";

const toneSurface: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-600",
  rose: "bg-rose-500/10    text-rose-600",
  amber: "bg-amber-500/10   text-amber-600",
  blue: "bg-blue-500/10    text-blue-600",
  violet: "bg-violet-500/10  text-violet-600",
};

/**
 * KPI card dùng cho seller — tiêu đề + giá trị lớn + icon góc phải + delta tuỳ chọn.
 * Khớp với pattern MetricCard của buyer portal.
 */
export function SellerKpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
}) {
  return (
    <Card className="justify-between rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardAction>
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-2xl",
              toneSurface[tone]
            )}
          >
            <Icon className="size-5" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 pb-4 pt-0">
        <p className="text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
          {value}
        </p>
        {delta ? (
          <span
            className={cn(
              "text-xs font-medium",
              delta.startsWith("-") ? "text-rose-600" : "text-emerald-600"
            )}
          >
            {delta}
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
