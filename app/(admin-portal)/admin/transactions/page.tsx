import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
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

export default function AdminTransactionsPage() {
  const transactions = [
    {
      orderId: "ORD-2026-04-12847",
      date: "05/04",
      time: "14:32",
      buyer: "Ngân hàng TMCP Việt Nam",
      seller: "CTCP DL Tài chính Việt",
      value: "48.000.000 ₫",
      status: "Hoàn tất",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      alertIcon: false,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12846",
      date: "05/04",
      time: "11:18",
      buyer: "CTCP Chứng khoán HCM",
      seller: "CTCP DL Tài chính Việt",
      value: "120.000.000 ₫",
      status: "Bàn giao",
      statusTone: "bg-[#e0f2fe] text-[#0284c7]",
      alertIcon: false,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12845",
      date: "05/04",
      time: "09:42",
      buyer: "Vietnam Airlines",
      seller: "Bộ Kế hoạch & ĐT",
      value: "25.000.000 ₫",
      status: "Hoàn tất",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      alertIcon: false,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12844",
      date: "04/04",
      time: "16:20",
      buyer: "VNG Corporation",
      seller: "Cục QLĐKKD",
      value: "18.000.000 ₫",
      status: "Tranh chấp",
      statusTone: "bg-[#fee2e2] text-[#ef4444]",
      alertIcon: true,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12843",
      date: "04/04",
      time: "14:08",
      buyer: "Techcombank",
      seller: "CTCP DL Tài chính Việt",
      value: "32.000.000 ₫",
      status: "Xử lý",
      statusTone: "bg-[#fef3c7] text-[#d97706]",
      alertIcon: false,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12842",
      date: "04/04",
      time: "10:45",
      buyer: "PVComBank",
      seller: "CTCP DL Tài chính Việt",
      value: "48.000.000 ₫",
      status: "Ký HĐ",
      statusTone: "bg-[#f1f5f9] text-[#64748b]",
      alertIcon: false,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12841",
      date: "04/04",
      time: "08:30",
      buyer: "SSI Securities",
      seller: "CTCP DL Tài chính Việt",
      value: "850.000.000 ₫",
      status: "Hoàn tất",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      alertIcon: false,
      flaggedRow: false,
    },
    {
      orderId: "ORD-2026-04-12840",
      date: "03/04",
      time: "22:15",
      buyer: "Unknown Client",
      seller: "Unknown Seller",
      value: "2.400.000.000 ₫",
      status: "Flagged",
      statusTone: "bg-[#fee2e2] text-[#ef4444]",
      alertIcon: true,
      flaggedRow: true,
    },
  ];

  const gmvGroups = [
    {
      label: "Tài chính",
      value: "18.400",
      color: "bg-[#f59e0b]",
      width: "95%",
    },
    { label: "Dân cư", value: "12.800", color: "bg-[#3b82f6]", width: "70%" },
    {
      label: "Doanh nghiệp",
      value: "8.400",
      color: "bg-[#10b981]",
      width: "45%",
    },
    { label: "Y tế", value: "4.200", color: "bg-[#0ea5e9]", width: "25%" },
    {
      label: "Giao thông",
      value: "2.400",
      color: "bg-[#a855f7]",
      width: "15%",
    },
    { label: "Khác", value: "1.800", color: "bg-[#fcd34d]", width: "10%" },
  ];

  const topBuyers = [
    { rank: "#1", name: "NH TMCP Việt Nam", amount: "2.840.000.000 ₫" },
    { rank: "#2", name: "CTCP Chứng khoán SSI", amount: "2.480.000.000 ₫" },
    { rank: "#3", name: "VietinBank", amount: "1.820.000.000 ₫" },
    { rank: "#4", name: "Techcombank", amount: "1.680.000.000 ₫" },
    { rank: "#5", name: "Vingroup JSC", amount: "1.240.000.000 ₫" },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]">
            Giám sát đơn hàng toàn sàn
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#607694]">
            Oversight mọi giao dịch mua bán trên sàn · Phát hiện bất thường ·
            Can thiệp khi cần
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-[0.8rem] border-[#d9e0e7] bg-white px-4 text-[#0b2e5c] hover:bg-slate-50"
          >
            <Filter className="mr-2 size-4" />
            Bộ lọc nâng cao
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-[0.8rem] border-[#d9e0e7] bg-white px-4 text-[#0b2e5c] hover:bg-slate-50"
          >
            <Download className="mr-2 size-4" />
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Giao dịch hôm nay */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardContent className="p-5 md:py-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[0.9rem] font-medium text-[#64748b]">
                Giao dịch hôm nay
              </p>
              <div className="p-2 bg-[#eff6ff] rounded-[0.6rem] text-[#3b82f6]">
                <Activity className="size-5" />
              </div>
            </div>
            <p className="text-[2rem] font-bold text-[#0b2e5c] leading-none mb-3">
              4.812
            </p>
            <div className="flex items-center text-[0.8rem] font-medium text-[#64748b]">
              <span className="text-[#10b981] flex items-center mr-1">
                <TrendingUp className="mr-1 size-3.5" /> +18.2%
              </span>
              <span>so với hôm qua</span>
            </div>
          </CardContent>
        </Card>

        {/* GMV hôm nay */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardContent className="p-5 md:py-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[0.9rem] font-medium text-[#64748b]">
                GMV hôm nay
              </p>
            </div>
            <p className="text-[2rem] font-bold text-[#0b2e5c] leading-none mb-3">
              842.000.000.000 <span className="text-[1.8rem]">₫</span>
            </p>
            <div className="flex items-center text-[0.8rem] font-medium text-[#64748b]">
              <span className="text-[#10b981] flex items-center mr-1">
                <TrendingUp className="mr-1 size-3.5" /> +24.5%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Flagged */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardContent className="p-5 md:py-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[0.9rem] font-medium text-[#64748b]">
                Flagged cần review
              </p>
              <div className="p-2 border border-[#fca5a5] bg-[#fef2f2] rounded-[0.6rem] text-[#ef4444]">
                <AlertTriangle className="size-5" />
              </div>
            </div>
            <p className="text-[2rem] font-bold text-[#0b2e5c] leading-none mb-3">
              12
            </p>
          </CardContent>
        </Card>

        {/* Tỷ lệ hoàn tất */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardContent className="p-5 md:py-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[0.9rem] font-medium text-[#64748b]">
                Tỷ lệ hoàn tất
              </p>
              <div className="p-2 border border-[#fde68a] bg-[#fffbeb] rounded-[0.6rem] text-[#d97706]">
                <CheckCircle2 className="size-5" />
              </div>
            </div>
            <p className="text-[2rem] font-bold text-[#0b2e5c] leading-none mb-3">
              98,4%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left Column - Giao dịch gần đây */}
        <Card className="flex h-full flex-col rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0 overflow-hidden">
          <CardHeader className="border-b border-[#f1f5f9] px-6 py-5 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <CardTitle className="text-[1.3rem] font-semibold text-[#0b2e5c]">
                Giao dịch gần đây
              </CardTitle>
              <p className="mt-1.5 text-[0.9rem] text-[#607694]">
                142.847 giao dịch tháng 4/2026 · Hiển thị 8 giao dịch mới nhất +
                flagged
              </p>
            </div>
            <div className="relative w-full lg:w-[240px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]" />
              <Input
                className="h-10 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white pl-9 text-[0.85rem] text-[#0b2e5c] placeholder:text-[#94a3b8] focus-visible:ring-1 focus-visible:ring-[#0b2e5c]"
                placeholder="Tìm mã đơn..."
              />
            </div>
          </CardHeader>
          <div className="flex-1 overflow-x-auto p-0">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-[#f1f5f9] hover:bg-transparent">
                  <TableHead className="h-12 w-[160px] border-b-0 px-6 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    MÃ ĐƠN
                  </TableHead>
                  <TableHead className="h-12 w-[100px] border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    THỜI GIAN
                  </TableHead>
                  <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    BUYER → SELLER
                  </TableHead>
                  <TableHead className="h-12 w-[140px] border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                    GIÁ TRỊ
                  </TableHead>
                  <TableHead className="h-12 w-[120px] border-b-0 px-4 text-center align-middle text-[0.75rem] font-bold text-[#64748b]">
                    TRẠNG THÁI
                  </TableHead>
                  <TableHead className="h-12 w-[80px] border-b-0 px-6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx, i) => (
                  <TableRow
                    key={i}
                    className={`border-b border-[#f1f5f9] hover:bg-[#f8fafc] ${tx.flaggedRow ? "bg-[#fef2f2] hover:bg-[#fef2f2]" : ""}`}
                  >
                    <TableCell className="px-6 py-4 align-middle">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[0.8rem] font-medium text-[#64748b] break-all max-w-[120px] whitespace-pre-wrap leading-tight">
                          {tx.orderId.replace(/-/g, "-\n")}
                        </span>
                        {tx.alertIcon && (
                          <AlertTriangle className="size-4 text-[#ef4444] shrink-0" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle">
                      <div className="text-[0.85rem] font-medium text-[#0b2e5c]">
                        {tx.date}
                      </div>
                      <div className="text-[0.8rem] text-[#64748b]">
                        {tx.time}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[0.95rem] font-bold text-[#0b2e5c]">
                          {tx.buyer}
                        </span>
                        <div className="flex items-center text-[0.85rem] text-[#64748b]">
                          <ArrowRight className="size-3.5 mr-1" />
                          {tx.seller}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle">
                      <span
                        className={`text-[0.95rem] font-bold ${tx.flaggedRow ? "text-[#ef4444]" : "text-[#0b2e5c]"}`}
                      >
                        {tx.value}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle text-center">
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-3 py-1 font-semibold whitespace-nowrap text-xs ${tx.statusTone} hover:bg-current/0`}
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0b2e5c]"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* GMV theo nhóm */}
          <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
            <CardHeader className="border-b border-[#f1f5f9] px-6 py-5">
              <CardTitle className="text-[1.1rem] font-semibold text-[#0b2e5c]">
                GMV theo nhóm
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {gmvGroups.map((group, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[0.85rem]">
                      <span className="font-semibold text-[#0b2e5c]">
                        {group.label}
                      </span>
                      <span className="font-medium text-[#0b2e5c]">
                        {group.value}
                      </span>
                    </div>
                    <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${group.color} rounded-full`}
                        style={{ width: group.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-[0.75rem] text-[#94a3b8]">
                Đơn vị: triệu VNĐ · 30 ngày
              </div>
            </CardContent>
          </Card>

          {/* Cần can thiệp */}
          <Card className="rounded-[1.2rem] border-[#fca5a5] bg-white shadow-sm ring-0">
            <CardHeader className="border-b border-[#fca5a5]/30 px-6 py-4 pb-4">
              <CardTitle className="text-[1.1rem] font-semibold text-[#ef4444] flex items-center gap-2">
                <AlertTriangle className="size-5" />
                Cần can thiệp
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="rounded-[0.8rem] bg-[#fef2f2] p-4">
                <h4 className="text-[0.95rem] font-bold text-[#b91c1c] mb-1">
                  Giao dịch bất thường
                </h4>
                <p className="text-[0.85rem] text-[#991b1b] leading-snug">
                  1 đơn giá trị 2,4B không khớp pattern lịch sử của buyer
                </p>
              </div>
              <div className="rounded-[0.8rem] bg-[#fffbeb] p-4">
                <h4 className="text-[0.95rem] font-bold text-[#b45309] mb-1">
                  Disputed tăng cao
                </h4>
                <p className="text-[0.85rem] text-[#92400e] leading-snug">
                  5 khiếu nại về SP TC-003 trong 24h qua
                </p>
              </div>
              <div className="rounded-[0.8rem] bg-[#eff6ff] p-4">
                <h4 className="text-[0.95rem] font-bold text-[#1d4ed8] mb-1">
                  Stuck in processing
                </h4>
                <p className="text-[0.85rem] text-[#1e40af] leading-snug">
                  3 đơn ở trạng thái processing &gt; 48h
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bên mua hàng đầu */}
          <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
            <CardHeader className="border-b border-[#f1f5f9] px-6 py-5">
              <CardTitle className="text-[1.1rem] font-semibold text-[#0b2e5c] flex items-center gap-2">
                <TrendingUp className="size-5 text-[#64748b]" />
                Bên mua hàng đầu{" "}
                <span className="text-[#64748b] font-normal text-[0.95rem]">
                  (tháng)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col p-2">
                {topBuyers.map((buyer, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 px-4 hover:bg-[#f8fafc] rounded-[0.5rem] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[0.85rem] font-bold text-[#94a3b8] w-4">
                        {buyer.rank}
                      </span>
                      <span className="text-[0.9rem] font-semibold text-[#0b2e5c] truncate max-w-[150px]">
                        {buyer.name}
                      </span>
                    </div>
                    <span className="text-[0.9rem] font-bold text-[#10b981]">
                      {buyer.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
