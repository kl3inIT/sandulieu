import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export {
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

/**
 * Page-level header card — matches the Card/CardHeader pattern used on the
 * Home, Analytics and Notifications pages (CardTitle text-3xl, description,
 * optional action buttons in CardAction).
 */
export function SellerPageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        {actions ? (
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            {actions}
          </CardAction>
        ) : null}
      </CardHeader>
    </Card>
  );
}

const toneSurface: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-700",
  rose: "bg-rose-500/15    text-rose-700",
  amber: "bg-amber-500/15   text-amber-700",
  blue: "bg-blue-500/15    text-blue-700",
  violet: "bg-violet-500/15  text-violet-700",
};

/**
 * KPI card — label + large value + toned icon, matches MetricCard on the home
 * page (text-3xl/4xl font-semibold tracking-tight in CardContent).
 */
export function SellerKpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone,
  iconClassName,
  iconStrokeWidth,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
  iconClassName?: string;
  iconStrokeWidth?: number;
}) {
  return (
    <Card className="justify-between rounded-xl border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardAction>
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              toneSurface[tone]
            )}
          >
            <Icon
              className={cn("size-5", iconClassName)}
              strokeWidth={iconStrokeWidth}
            />
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
