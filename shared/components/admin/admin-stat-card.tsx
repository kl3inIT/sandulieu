import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

type AdminStatCardProps = {
  title: ReactNode;
  value: ReactNode;
  icon?: LucideIcon;
  meta?: ReactNode;
  cardClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
  iconClassName?: string;
  iconSizeClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
};

export function AdminStatCard({
  title,
  value,
  icon: Icon,
  meta,
  cardClassName,
  contentClassName,
  titleClassName,
  valueClassName,
  iconClassName,
  iconSizeClassName,
  headerClassName,
  bodyClassName,
}: AdminStatCardProps) {
  return (
    <Card
      className={cn(
        "rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0",
        cardClassName
      )}
    >
      <CardContent className={cn("p-5 md:py-6", contentClassName)}>
        <div
          className={cn(
            "mb-4 flex items-center justify-between",
            headerClassName
          )}
        >
          <p
            className={cn(
              "text-[0.9rem] font-medium text-[#64748b]",
              titleClassName
            )}
          >
            {title}
          </p>
          {Icon ? (
            <div
              className={cn(
                "flex items-center justify-center rounded-[0.8rem]",
                iconClassName
              )}
            >
              <Icon className={cn("size-5", iconSizeClassName)} />
            </div>
          ) : null}
        </div>
        <div className={bodyClassName}>
          <p
            className={cn(
              "text-[2rem] leading-none font-bold text-[#0b2e5c]",
              valueClassName
            )}
          >
            {value}
          </p>
          {meta ? meta : null}
        </div>
      </CardContent>
    </Card>
  );
}
