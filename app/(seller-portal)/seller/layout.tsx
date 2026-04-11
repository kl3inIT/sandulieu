import type { ReactNode } from "react";

import { SellerShell } from "@/features/seller/components/seller-shell";

export default function SellerPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SellerShell>{children}</SellerShell>;
}
