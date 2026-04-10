"use client";

import { useMemo, useState } from "react";

import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Filter,
  Search,
  ShieldCheck,
  UserRoundCheck,
  UserRoundX,
  Users,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

type AccountRow = {
  organization: string;
  email: string;
  type: string;
  mst: string;
  role: string;
  representative: string;
  submittedAt: string;
  status: "Chờ duyệt" | "Đang xem" | "Đã xác minh DMDC";
};

const overviewCards = [
  {
    title: "Chờ duyệt",
    value: "24",
    icon: UserRoundCheck,
    iconClassName: "bg-[#fff4de] text-[#dd8a00]",
  },
  {
    title: "Đang xác minh DMDC",
    value: "8",
    icon: Building2,
    iconClassName: "bg-[#eef2ff] text-[#2f5be3]",
  },
  {
    title: "Duyệt tuần này",
    value: "142",
    icon: ShieldCheck,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Từ chối tuần này",
    value: "7",
    icon: UserRoundX,
    iconClassName: "bg-[#fff1f3] text-[#f04469]",
  },
] as const;

const accountRows: AccountRow[] = [
  {
    organization: "Công ty CP FinTech Việt Nam",
    email: "an.nv@fintech.vn",
    type: "Doanh nghiệp",
    mst: "0108234567",
    role: "Bên mua",
    representative: "Nguyễn Văn An",
    submittedAt: "05/04/2026",
    status: "Chờ duyệt",
  },
  {
    organization: "Ngân hàng TMCP Quốc tế VN (VIB)",
    email: "huong.lt@vib.com.vn",
    type: "Tổ chức tài chính",
    mst: "0100723054",
    role: "Bên mua + bán",
    representative: "Lê Thị Hương",
    submittedAt: "05/04/2026",
    status: "Chờ duyệt",
  },
  {
    organization: "Viện Nghiên cứu Kinh tế TW",
    email: "duc.pm@vienktw.gov.vn",
    type: "Đơn vị nghiên cứu",
    mst: "-",
    role: "Bên mua",
    representative: "TS. Phạm Minh Đức",
    submittedAt: "05/04/2026",
    status: "Đang xem",
  },
  {
    organization: "CTCP Dữ liệu Y tế Medatek",
    email: "long.th@medatek.vn",
    type: "Doanh nghiệp",
    mst: "0316789012",
    role: "Bên bán",
    representative: "Trần Hữu Long",
    submittedAt: "04/04/2026",
    status: "Đang xem",
  },
  {
    organization: "Cục Thống kê TP.HCM",
    email: "hong.vt@pso.hochiminhcity.gov.vn",
    type: "Cơ quan nhà nước",
    mst: "0302345678",
    role: "CQNN cung cấp",
    representative: "Võ Thị Hồng",
    submittedAt: "04/04/2026",
    status: "Đã xác minh DMDC",
  },
  {
    organization: "CTCP Logistics Gemadept",
    email: "thanh@gemadept.com",
    type: "Doanh nghiệp",
    mst: "0300548234",
    role: "Bên mua",
    representative: "Nguyễn Thành",
    submittedAt: "03/04/2026",
    status: "Chờ duyệt",
  },
  {
    organization: "Sở Y tế Hà Nội",
    email: "minh.nt@yte.hanoi.gov.vn",
    type: "Cơ quan nhà nước",
    mst: "0101122334",
    role: "CQNN cung cấp",
    representative: "Ngô Minh Hằng",
    submittedAt: "03/04/2026",
    status: "Chờ duyệt",
  },
  {
    organization: "CTCP Bảo hiểm An Tâm",
    email: "quang.nv@antamins.com",
    type: "Doanh nghiệp",
    mst: "0312456789",
    role: "Bên mua",
    representative: "Nguyễn Văn Quang",
    submittedAt: "02/04/2026",
    status: "Đang xem",
  },
  {
    organization: "Đại học Công nghệ Quốc gia",
    email: "linh.pt@ut.edu.vn",
    type: "Tổ chức giáo dục",
    mst: "0109988776",
    role: "Bên mua",
    representative: "Phạm Thu Linh",
    submittedAt: "02/04/2026",
    status: "Đã xác minh DMDC",
  },
  {
    organization: "CTCP Thương mại Dữ liệu Xanh",
    email: "hieu.lv@xanhdata.vn",
    type: "Doanh nghiệp",
    mst: "0317772201",
    role: "Bên bán",
    representative: "Lê Văn Hiếu",
    submittedAt: "01/04/2026",
    status: "Chờ duyệt",
  },
  {
    organization: "Sở Tài chính Đà Nẵng",
    email: "phuong.hd@danang.gov.vn",
    type: "Cơ quan nhà nước",
    mst: "0105566778",
    role: "CQNN cung cấp",
    representative: "Hoàng Duy Phương",
    submittedAt: "01/04/2026",
    status: "Chờ duyệt",
  },
  {
    organization: "Viện Hạ tầng số Việt Nam",
    email: "tuan.kl@vidi.vn",
    type: "Đơn vị nghiên cứu",
    mst: "-",
    role: "Bên mua",
    representative: "Khuất Lâm Tuấn",
    submittedAt: "31/03/2026",
    status: "Đang xem",
  },
];

const rowsPerPage = 6;

function statusTone(status: AccountRow["status"]) {
  switch (status) {
    case "Chờ duyệt":
      return "bg-[#fff1da] text-[#ca8612]";
    case "Đang xem":
      return "bg-[#e6efff] text-[#3068db]";
    default:
      return "bg-[#dcfce7] text-[#15803d]";
  }
}

function roleTone(role: string) {
  if (role.includes("CQNN")) {
    return "bg-[#dbeafe] text-[#1d4ed8]";
  }

  if (role.includes("bán")) {
    return "bg-[#eef2ff] text-[#4f46e5]";
  }

  return "bg-[#dbeafe] text-[#2f67d2]";
}

export default function AdminAccountsPage() {
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = Math.ceil(accountRows.length / rowsPerPage);
  const pagedRows = useMemo(() => {
    const startIndex = pageIndex * rowsPerPage;
    return accountRows.slice(startIndex, startIndex + rowsPerPage);
  }, [pageIndex]);

  const startItem = pageIndex * rowsPerPage + 1;
  const endItem = Math.min(accountRows.length, startItem + rowsPerPage - 1);

  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[0.86rem] font-medium text-[#7d8ea6]">
              <Badge className="rounded-full bg-[#dfe9f7] px-3 py-1 text-[0.74rem] font-semibold text-[#4b6382] hover:bg-[#dfe9f7]">
                CB-SDL
              </Badge>
              <span>Sàn Dữ liệu Quốc gia</span>
            </div>
            <h1 className="text-[1.85rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.45rem] sm:leading-[1.02]">
              Duyệt tài khoản &amp; Hồ sơ
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Xác minh và phê duyệt tài khoản tổ chức, doanh nghiệp, cơ quan nhà
              nước
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
            >
              <Filter className="mr-2 size-4" />
              Bộ lọc
            </Button>
          </div>
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

      <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
        <CardHeader className="gap-4 px-4 py-4 pb-0 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                Hàng đợi duyệt tài khoản
              </CardTitle>
              <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                Xếp theo thời gian nộp hồ sơ · Ưu tiên hồ sơ đã xác minh DMDC
              </p>
            </div>

            <div className="w-full max-w-[28rem]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8ca0b8]" />
                <Input
                  placeholder="Tìm theo tên, MST, email..."
                  className="h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white pl-10 text-[0.95rem] text-[#0a2e5c] placeholder:text-[#8ca0b8]"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-4 pb-4 pt-4 sm:px-5">
          <div className="overflow-hidden rounded-[1rem] border border-[#e7edf3]">
            <Table>
              <TableHeader className="bg-[#f7f9fc]">
                <TableRow className="border-b-[#e7edf3] hover:bg-transparent">
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Tổ chức
                  </TableHead>
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Loại
                  </TableHead>
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    MST
                  </TableHead>
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Vai trò
                  </TableHead>
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Người đại diện
                  </TableHead>
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Nộp ngày
                  </TableHead>
                  <TableHead className="px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Trạng thái
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7d8ea6]">
                    Hành động
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {pagedRows.map((row) => (
                  <TableRow
                    key={`${row.organization}-${row.email}`}
                    className="border-b-[#e7edf3] hover:bg-[#fbfcfe]"
                  >
                    <TableCell className="px-4 py-4 align-top">
                      <div className="min-w-[14rem] space-y-0.5">
                        <p className="font-semibold text-[#0a2e5c]">
                          {row.organization}
                        </p>
                        <p className="text-[0.84rem] text-[#7187a2]">
                          {row.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top text-[#0c2853]">
                      {row.type}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top text-[#0c2853]">
                      {row.mst}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <Badge
                        className={`rounded-full px-2.5 py-0.5 text-[0.74rem] font-medium hover:bg-current/0 ${roleTone(row.role)}`}
                      >
                        {row.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top text-[#0c2853]">
                      {row.representative}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top text-[#0c2853]">
                      {row.submittedAt}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <Badge
                        className={`rounded-full px-2.5 py-0.5 text-[0.74rem] font-medium hover:bg-current/0 ${statusTone(row.status)}`}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="rounded-full text-[#3a4d66] hover:bg-[#edf3fb] hover:text-[#0a2e5c]"
                        >
                          <Eye className="size-4" />
                          <span className="sr-only">Xem</span>
                        </Button>
                        <Button className="h-8 rounded-[0.75rem] bg-[#0ea66b] px-3 text-white hover:bg-[#0c8a59]">
                          Duyệt
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 rounded-[0.75rem] border-[#d7dee8] px-3 text-[#ef4444] hover:bg-[#fff5f5] hover:text-[#dc2626]"
                        >
                          Từ chối
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#e7edf3] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#7187a2]">
              Hiển thị {startItem}-{endItem} trên {accountRows.length} tài khoản
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-[0.8rem] border-[#d7dee8] bg-white text-[#0a2e5c] hover:bg-[#f7f9fc]"
                onClick={() =>
                  setPageIndex((current) => Math.max(0, current - 1))
                }
                disabled={pageIndex === 0}
              >
                <ChevronLeft className="size-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={
                      pageIndex === pageNumber - 1 ? "default" : "outline"
                    }
                    className={
                      pageIndex === pageNumber - 1
                        ? "h-9 rounded-[0.8rem] bg-[#0c366b] px-4 text-white hover:bg-[#0c366b]"
                        : "h-9 rounded-[0.8rem] border-[#d7dee8] bg-white px-4 text-[#0a2e5c] hover:bg-[#f7f9fc]"
                    }
                    onClick={() => setPageIndex(pageNumber - 1)}
                  >
                    {pageNumber}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-[0.8rem] border-[#d7dee8] bg-white text-[#0a2e5c] hover:bg-[#f7f9fc]"
                onClick={() =>
                  setPageIndex((current) =>
                    Math.min(totalPages - 1, current + 1)
                  )
                }
                disabled={pageIndex === totalPages - 1}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
