import {
  BookOpen,
  Boxes,
  Database,
  FilePenLine,
  Layers3,
  Plus,
  Tag,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const overviewCards = [
  {
    title: "Tổng danh mục",
    value: "12",
    icon: BookOpen,
    iconClassName: "bg-[#dfeaf7] text-[#214f80]",
  },
  {
    title: "Tổng bản ghi",
    value: "447",
    icon: Database,
    iconClassName: "bg-[#eaf1fb] text-[#315fda]",
  },
  {
    title: "Đồng bộ DMDC",
    value: "4",
    icon: Layers3,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Cập nhật 7 ngày",
    value: "8",
    icon: FilePenLine,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
] as const;

const catalogItems = [
  {
    title: "Mục đích sử dụng DL",
    tag: "DMDC",
    icon: Tag,
    count: "28 bản ghi",
    updated: "Cập nhật 02/04/2026",
    tone: "gold" as const,
  },
  {
    title: "Loại xác thực",
    tag: "Internal",
    icon: ShieldIcon,
    count: "8 bản ghi",
    updated: "Cập nhật 15/03/2026",
    tone: "navy" as const,
  },
  {
    title: "Phương thức xác thực",
    tag: "Internal",
    icon: ShieldIcon,
    count: "12 bản ghi",
    updated: "Cập nhật 15/03/2026",
    tone: "navy" as const,
  },
  {
    title: "Đối tác cung cấp",
    tag: "DMDC",
    icon: BuildingIcon,
    count: "16 bản ghi",
    updated: "Cập nhật 28/03/2026",
    tone: "gold" as const,
  },
  {
    title: "Mã lỗi hệ thống",
    tag: "Internal",
    icon: FileIcon,
    count: "24 bản ghi",
    updated: "Cập nhật 30/03/2026",
    tone: "navy" as const,
  },
  {
    title: "Phương thức thanh toán",
    tag: "Internal",
    icon: CreditCardIcon,
    count: "10 bản ghi",
    updated: "Cập nhật 30/03/2026",
    tone: "navy" as const,
  },
] as const;

function toneIconClassName(tone: "gold" | "navy") {
  return tone === "gold"
    ? "bg-[#0d2d59] text-[#f1b62c]"
    : "bg-[#0d2d59] text-[#f1b62c]";
}

export default function AdminCatalogsPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
              Danh mục hệ thống
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Mô-đun quản lý danh mục dùng chung · 12 loại danh mục áp dụng toàn
              Sàn
            </p>
          </div>

          <Button className="h-10 rounded-[0.95rem] bg-[#10386d] px-4 text-white hover:bg-[#0f335f]">
            <Plus className="mr-2 size-4" />
            Tạo danh mục mới
          </Button>
        </div>

        <section className="grid gap-3 xl:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className="rounded-[1.15rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_8px_18px_rgba(11,46,92,0.05)] ring-0"
              >
                <CardContent className="flex items-start justify-between gap-3 px-4 py-5">
                  <div className="space-y-2">
                    <p className="text-[0.92rem] text-[#7187a2]">
                      {card.title}
                    </p>
                    <p className="text-[2rem] leading-none font-semibold tracking-tight text-[#091f40] sm:text-[2.15rem]">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`flex size-11 items-center justify-center rounded-[0.95rem] ${card.iconClassName}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {catalogItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="rounded-[1.25rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0"
            >
              <CardHeader className="px-4 py-4 pb-0 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-12 items-center justify-center rounded-[0.95rem] ${toneIconClassName(item.tone)}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <Badge
                    className={
                      item.tag === "DMDC"
                        ? "rounded-full bg-[#fff1cf] px-2.5 py-0.5 text-[#d97706] hover:bg-[#fff1cf]"
                        : "rounded-full bg-[#eef3fb] px-2.5 py-0.5 text-[#315fda] hover:bg-[#eef3fb]"
                    }
                  >
                    {item.tag}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-4 sm:px-5">
                <CardTitle className="text-[1.05rem] font-semibold tracking-tight text-[#0a2e5c]">
                  {item.title}
                </CardTitle>
                <p className="mt-2 text-[0.92rem] text-[#0c2853]">
                  {item.count}
                </p>
                <p className="text-[0.8rem] text-[#7b8da5]">{item.updated}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-9 flex-1 rounded-[0.85rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] hover:bg-[#f8fbff]"
                  >
                    Xem
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-full text-[#0a2e5c] hover:bg-[#edf3fb]"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-full text-[#ef4444] hover:bg-[#fff5f5]"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2 20 5v6c0 5-3.5 9.7-8 11-4.5-1.3-8-6-8-11V5l8-3Z" />
    </svg>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M7 10V4h10v6" />
      <path d="M8 14h2M12 14h2M8 18h2M12 18h2" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  );
}
