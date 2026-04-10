import {
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Landmark,
  Plus,
  Send,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export default function AdminReportsPage() {
  const statCards = [
    {
      label: "Báo cáo 2026",
      value: "248",
      icon: FileText,
      tone: "bg-[#e0f2fe] text-[#0284c7]",
    },
    {
      label: "Đã gửi tháng này",
      value: "42",
      icon: Send,
      tone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      label: "Đang xử lý",
      value: "3",
      icon: Clock,
      tone: "bg-[#ffedd5] text-[#ea580c]",
    },
    {
      label: "Tỷ lệ đúng hạn",
      value: "100%",
      icon: CheckCircle2,
      tone: "bg-[#fef3c7] text-[#d97706]",
    },
  ];

  const reports = [
    {
      id: "BC-\n2026-\n04-\n0842",
      title: "Báo cáo dữ liệu dân cư Q1/2026",
      dataset: "Bộ-DC-01",
      receiver: "Bộ Công an",
      records: "68.420.000",
      date: "05/04/2026",
      response: "2 giờ\nsau",
      status: "Đã nhận",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      id: "BC-\n2026-\n04-\n0841",
      title: "Báo cáo tình hình doanh nghiệp",
      dataset: "Bộ-DN-02",
      receiver: "Bộ Kế hoạch & ĐT",
      records: "842.300",
      date: "04/04/2026",
      response: "4 giờ\nsau",
      status: "Đã nhận",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      id: "BC-\n2026-\n04-\n0840",
      title: "Báo cáo thu thuế cá nhân Q1",
      dataset: "Bộ-TC-12",
      receiver: "Tổng cục Thuế",
      records: "12.420.000",
      date: "03/04/2026",
      response: "1 giờ\nsau",
      status: "Đã nhận",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      id: "BC-\n2026-\n04-\n0839",
      title: "Báo cáo BHXH, BHYT, BHTN T3",
      dataset: "Bộ-BHXH-03",
      receiver: "BHXH Việt Nam",
      records: "18.420.000",
      date: "02/04/2026",
      response: "—",
      status: "Đang gửi",
      statusTone: "bg-[#fef3c7] text-[#d97706]",
    },
    {
      id: "BC-\n2026-\n04-\n0838",
      title: "Báo cáo giáo dục phổ thông",
      dataset: "Bộ-GD-04",
      receiver: "Bộ GD&ĐT",
      records: "248.000",
      date: "01/04/2026",
      response: "30 phút\nsau",
      status: "Đã nhận",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      id: "BC-\n2026-\n04-\n0837",
      title: "Báo cáo tiêm chủng toàn quốc",
      dataset: "Bộ-YT-08",
      receiver: "Bộ Y tế",
      records: "842.000",
      date: "01/04/2026",
      response: "2 giờ\nsau",
      status: "Đã nhận",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
  ] as const;

  const schedules = [
    {
      title: "Báo cáo dân cư",
      agency: "Bộ Công an",
      interval: "Hàng quý",
      nextDate: "01/07/2026",
    },
    {
      title: "Báo cáo doanh nghiệp",
      agency: "Bộ KH&ĐT",
      interval: "Hàng tháng",
      nextDate: "01/05/2026",
    },
    {
      title: "Báo cáo thuế cá nhân",
      agency: "Tổng cục Thuế",
      interval: "Hàng quý",
      nextDate: "01/07/2026",
    },
    {
      title: "Báo cáo giáo dục",
      agency: "Bộ GD&ĐT",
      interval: "6 tháng",
      nextDate: "01/10/2026",
    },
    {
      title: "Báo cáo y tế",
      agency: "Bộ Y tế",
      interval: "Hàng quý",
      nextDate: "01/07/2026",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center pr-2">
        <div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]">
            Báo cáo cơ quan nhà nước
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#607694]">
            Tổng hợp và gửi báo cáo định kỳ từ các bộ dữ liệu tới cơ quan nhà
            nước
          </p>
        </div>
        <Button className="h-10 rounded-[0.8rem] bg-[#0b2e5c] px-4 text-white hover:bg-[#163b6d]">
          <Plus className="mr-2 size-4" />
          Tạo báo cáo mới
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
            >
              <CardContent className="flex flex-row-reverse items-start justify-between p-5 md:pb-6 md:pt-5 lg:flex-row lg:items-center">
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-[0.95rem] text-[#607694]">{item.label}</p>
                  <p className="font-semibold leading-none tracking-tight text-[#0b2e5c] text-[2rem]">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-[1rem] ${item.tone}`}
                >
                  <Icon className="size-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Column - Reports Table */}
        <Card className="flex h-full flex-col rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0 overflow-hidden">
          <CardHeader className="border-b border-[#f1f5f9] px-6 py-5">
            <CardTitle className="text-[1.3rem] font-semibold text-[#0b2e5c]">
              Báo cáo đã gửi CQNN
            </CardTitle>
            <p className="mt-1.5 text-[0.95rem] text-[#607694]">
              Nhật ký đầy đủ cho mọi báo cáo · Ghi chuỗi NDAChain
            </p>
          </CardHeader>
          <div className="flex-1 overflow-x-auto p-0">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-[#f1f5f9] hover:bg-transparent">
                  <TableHead className="h-12 w-[100px] border-b-0 px-6 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    MÃ BC
                  </TableHead>
                  <TableHead className="h-12 min-w-[200px] border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    TIÊU ĐỀ
                  </TableHead>
                  <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    CQNN NHẬN
                  </TableHead>
                  <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    SỐ BẢN GHI
                  </TableHead>
                  <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    GỬI NGÀY
                  </TableHead>
                  <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    PHẢN HỒI
                  </TableHead>
                  <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    TRẠNG THÁI
                  </TableHead>
                  <TableHead className="h-12 w-[80px] border-b-0 px-6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, i) => (
                  <TableRow
                    key={i}
                    className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]"
                  >
                    <TableCell className="px-6 py-4 align-top">
                      <div className="font-mono text-[0.8rem] font-medium leading-relaxed tracking-tight text-[#64748b] whitespace-pre-line">
                        {report.id}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="max-w-[180px] md:max-w-none">
                        <div className="text-[0.95rem] font-bold leading-snug text-[#0b2e5c]">
                          {report.title}
                        </div>
                        <div className="mt-1 text-[0.8rem] text-[#64748b]">
                          Dataset: {report.dataset}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="max-w-[100px] text-[0.9rem] font-semibold text-[#0b2e5c] whitespace-normal leading-snug">
                        {report.receiver}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="text-[0.9rem] font-bold text-[#0b2e5c]">
                        {report.records}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="text-[0.9rem] font-semibold text-[#0b2e5c]">
                        {report.date}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="text-[0.9rem] text-[#0b2e5c] whitespace-pre-line leading-tight">
                        {report.response}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-3 py-1 font-semibold whitespace-nowrap text-xs ${report.statusTone} hover:bg-current/0`}
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0b2e5c]"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0b2e5c]"
                        >
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Right Column - Schedule List */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="border-b border-[#f1f5f9] px-6 py-5">
            <CardTitle className="flex items-center gap-2 text-[1.1rem] font-semibold text-[#0b2e5c]">
              <Landmark className="size-5" />
              Lịch báo cáo định kỳ
            </CardTitle>
            <p className="mt-1 text-[0.85rem] text-[#607694]">
              Mẫu báo cáo & tần suất
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {schedules.map((schedule, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between border-b border-[#f1f5f9] p-5 last:border-0 hover:bg-[#f8fafc]"
                >
                  <div className="space-y-1">
                    <h4 className="text-[1.05rem] font-bold text-[#0b2e5c]">
                      {schedule.title}
                    </h4>
                    <p className="text-[0.85rem] text-[#64748b]">
                      {schedule.agency}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1 text-[0.75rem] font-medium text-[#d97706]">
                      <Clock className="size-3.5" />
                      Báo cáo tiếp theo: {schedule.nextDate}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-[0.75rem] font-semibold text-[#64748b] hover:bg-[#e2e8f0]"
                  >
                    {schedule.interval}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
