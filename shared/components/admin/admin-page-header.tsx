import { type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type AdminPageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  contentClassName?: string;
};

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  contentClassName,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 md:flex-row md:items-end",
        className
      )}
    >
      <div className={contentClassName}>
        <h1
          className={cn(
            "text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]",
            titleClassName
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-1 text-[0.95rem] text-[#607694]",
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className={cn("flex items-center gap-3", actionsClassName)}>
          {actions}
        </div>
      ) : null}
    </div>
  );
}
