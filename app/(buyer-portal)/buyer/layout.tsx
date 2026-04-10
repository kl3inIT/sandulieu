import type { ReactNode } from "react";

import { BuyerShell } from "@/features/buyer/components/buyer-shell";

export default function BuyerPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <BuyerShell>{children}</BuyerShell>;
}
