import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/shared/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sandulieu.vercel.app"),
  title: {
    default: "Sandulieu",
    template: "%s | Sandulieu",
  },
  description:
    "Khởi tạo public site, admin console và luồng đăng nhập cho hệ thống Sandulieu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
