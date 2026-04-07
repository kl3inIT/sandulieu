import type { ReactNode } from "react";

import { PublicFooter } from "@/shared/components/layout/public-footer";
import { PublicHeader } from "@/shared/components/layout/public-header";

export default function PublicPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_28%),linear-gradient(180deg,#f8fbfc_0%,#eef4f7_36%,#ffffff_100%)]">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
