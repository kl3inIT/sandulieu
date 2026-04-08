import type { ReactNode } from "react";

import { PublicFooter } from "@/shared/components/layout/public-footer";
import { PublicHeader } from "@/shared/components/layout/public-header";

export default function PublicPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#07101d_0%,#0b1524_10%,#eef2f6_10.1%,#f7f8fa_100%)]">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
