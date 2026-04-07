"use client";

import type { PropsWithChildren } from "react";

import { QueryProvider } from "@/shared/providers/QueryProvider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

export function AppProviders({ children }: Readonly<PropsWithChildren>) {
  return (
    <TooltipProvider>
      <QueryProvider>{children}</QueryProvider>
    </TooltipProvider>
  );
}
