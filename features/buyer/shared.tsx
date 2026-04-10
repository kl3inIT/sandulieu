import type { ReactNode } from "react";
import Link from "next/link";
import { Search, type LucideIcon } from "lucide-react";

import type { BuyerEndpoint, BuyerMetric } from "@/features/buyer/data";
import { buyerHeatmapRows, buyerTrendBars } from "@/features/buyer/data";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";

export function BuyerPageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
      <div className="space-y-1">
        <h1 className="text-[1.55rem] font-semibold tracking-tight text-primary sm:text-[1.75rem]">
          {title}
        </h1>
        <p className="max-w-4xl text-[14px] text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function HeaderButton({
  children,
  variant = "default",
  icon: Icon,
}: {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  icon?: LucideIcon;
}) {
  return (
    <Button variant={variant} className="h-9 rounded-xl px-4 text-sm">
      {Icon ? <Icon className="mr-2 size-4" /> : null}
      {children}
    </Button>
  );
}

export function HeaderLinkButton({
  href,
  children,
  variant = "default",
  icon: Icon,
}: {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  icon?: LucideIcon;
}) {
  return (
    <Button asChild variant={variant} className="h-9 rounded-xl px-4 text-sm">
      <Link href={href}>
        {Icon ? <Icon className="mr-2 size-4" /> : null}
        {children}
      </Link>
    </Button>
  );
}

export function SearchInput({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder={placeholder} className={cn("h-9 rounded-xl pl-10 text-sm", className)} />
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: BuyerMetric[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}

export function MetricCard({ label, value, delta, detail, tone, icon: Icon }: BuyerMetric) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <div className="space-y-1">
          <CardDescription className="text-[14px]">{label}</CardDescription>
          <CardTitle className="text-[1.6rem] leading-none text-primary">{value}</CardTitle>
        </div>
        <IconSurface tone={tone}>
          <Icon className="size-5" />
        </IconSurface>
      </CardHeader>
      {delta ? (
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone={delta.startsWith("-") ? "rose" : tone === "amber" ? "emerald" : tone}>
              {delta}
            </StatusPill>
            {detail ? <span className="text-sm text-muted-foreground">{detail}</span> : null}
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}

export function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
}) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-4">
        <div className="space-y-2">
          <CardDescription className="text-[14px]">{label}</CardDescription>
          <CardTitle className="text-[1.6rem] leading-none text-primary">{value}</CardTitle>
        </div>
        <IconSurface tone={tone}>
          <Icon className="size-5" />
        </IconSurface>
      </CardHeader>
    </Card>
  );
}

export function UsageOverviewCard({
  title,
  eyebrow,
  total,
  unit,
  badge,
  stats,
}: {
  title: string;
  eyebrow: string;
  total: string;
  unit: string;
  badge: string;
  stats: Array<{ label: string; value: string }>;
}) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-[1.35rem] text-primary">{title}</CardTitle>
          <CardDescription className="text-[14px]">{eyebrow}</CardDescription>
        </div>
        <StatusPill tone="emerald">{badge}</StatusPill>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <p className="text-[2.35rem] font-semibold tracking-tight text-primary">{total}</p>
          <p className="pb-1 text-sm text-muted-foreground">{unit}</p>
        </div>
        <TrendGraphic />
        <div className="grid gap-3 border-t border-border/70 pt-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={cn("text-lg font-semibold text-primary", index === 2 && "text-emerald-700")}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function EndpointListCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: BuyerEndpoint[];
}) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[1.35rem] text-primary">{title}</CardTitle>
        <CardDescription className="text-[14px]">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-primary">{item.label}</p>
              <p className="text-sm font-medium text-primary">{item.value}</p>
            </div>
            <Progress
              value={item.percent}
              className={cn("h-2.5 rounded-full", endpointTrackClasses[item.tone])}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AnalyticsHeatmapCard({
  title = "Lưu lượng API theo giờ",
  description = "Biểu đồ 30 ngày gần nhất · Peak: 15.600 calls/ngày",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-[1.35rem] text-primary">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <StatusPill tone="blue">Heatmap</StatusPill>
      </CardHeader>
      <CardContent className="space-y-3">
        <TrendGraphic compact />
        <div className="grid gap-1">
          {buyerHeatmapRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-12 gap-1 md:grid-cols-24">
              {row.map((value, columnIndex) => (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className={cn(
                    "h-5 rounded-md",
                    value >= 70
                      ? "bg-primary"
                      : value >= 55
                        ? "bg-primary/80"
                        : value >= 40
                          ? "bg-primary/60"
                          : value >= 25
                            ? "bg-primary/35"
                            : "bg-secondary"
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatusPill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium", toneBadgeClasses[tone])}>
      {children}
    </span>
  );
}

export function IconSurface({
  tone,
  children,
}: {
  tone: "emerald" | "rose" | "amber" | "blue" | "violet";
  children: ReactNode;
}) {
  return (
    <div className={cn("flex size-10 items-center justify-center rounded-2xl", toneSurfaceClasses[tone])}>
      {children}
    </div>
  );
}

export function GhostIconButton({
  icon: Icon,
  label,
  danger,
}: {
  icon: LucideIcon;
  label: string;
  danger?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn("size-8 rounded-lg", danger && "text-destructive hover:text-destructive")}
    >
      <Icon className="size-4" />
    </Button>
  );
}

export function StatBlock({
  label,
  value,
  detail,
  detailTone,
}: {
  label: string;
  value: string;
  detail?: string;
  detailTone?: "emerald" | "rose" | "amber" | "blue" | "violet";
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
      {detail ? <p className={cn("text-sm text-muted-foreground", detailTone && toneTextClasses[detailTone])}>{detail}</p> : null}
    </div>
  );
}

export function StatMini({
  label,
  value,
  detail,
  detailTone,
}: {
  label: string;
  value: string;
  detail?: string;
  detailTone?: "emerald" | "rose" | "amber" | "blue" | "violet";
}) {
  return (
    <div className="rounded-2xl border border-border/70 p-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-semibold text-primary">{value}</p>
      {detail ? <p className={cn("mt-1 text-sm text-muted-foreground", detailTone && toneTextClasses[detailTone])}>{detail}</p> : null}
    </div>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

export function BillingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-primary">{value}</p>
    </div>
  );
}

function TrendGraphic({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-end gap-1 overflow-hidden rounded-3xl bg-gradient-to-b from-secondary/40 to-background px-4 pb-3 pt-3",
        compact ? "h-14" : "h-16"
      )}
    >
      {buyerTrendBars.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="flex-1 rounded-t-xl bg-primary/85"
          style={{ height: `${value * (compact ? 1.8 : 2.2)}px` }}
        />
      ))}
    </div>
  );
}

const toneBadgeClasses = {
  emerald: "bg-emerald-100 text-emerald-700",
  rose: "bg-rose-100 text-rose-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  violet: "bg-violet-100 text-violet-700",
} as const;

const toneSurfaceClasses = {
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
} as const;

const toneTextClasses = {
  emerald: "text-emerald-700",
  rose: "text-rose-700",
  amber: "text-amber-700",
  blue: "text-blue-700",
  violet: "text-violet-700",
} as const;

const endpointTrackClasses = {
  blue: "[&_[data-slot=progress-indicator]]:bg-blue-500",
  emerald: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
  amber: "[&_[data-slot=progress-indicator]]:bg-amber-500",
  rose: "[&_[data-slot=progress-indicator]]:bg-rose-500",
  violet: "[&_[data-slot=progress-indicator]]:bg-violet-500",
} as const;
