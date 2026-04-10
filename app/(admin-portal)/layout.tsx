import type { ReactNode } from "react";

import { AdminPortalShell } from "@/shared/components/layout/admin-portal-shell";

export default function AdminPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AdminPortalShell>{children}</AdminPortalShell>;
}
