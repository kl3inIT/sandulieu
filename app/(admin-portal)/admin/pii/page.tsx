import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Eye,
  RefreshCw,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { AdminPageHeader } from "@/shared/components/admin/admin-page-header";
import { AdminStatCard } from "@/shared/components/admin/admin-stat-card";
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

export default function AdminPiiPage() {
  const statCards = [
    {
      label: "Cảnh báo Critical",
      value: "2",
      icon: AlertTriangle,
      tone: "bg-[#fee2e2] text-[#ef4444]",
    },
    {
      label: "Cảnh báo Warning",
      value: "6",
      icon: AlertTriangle,
      tone: "bg-[#ffedd5] text-[#d97706]",
    },
    {
      label: "SP đã scan",
      value: "440/447",
      sub: "↑+98.4%",
      subTone: "text-[#10b981]",
      icon: CheckCircle2,
      tone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      label: "Dữ liệu cá nhân đã che đúng chuẩn",
      value: "99,2%",
      icon: ShieldCheck,
      tone: "bg-[#fef3c7] text-[#d97706]",
    },
  ];

  const alerts = [
    {
      id: "SP-TC-042",
      severity: "CRITICAL",
      fields: "2 fields",
      title: "Chỉ số phái sinh CK Q1/2026",
      meta: "CTCP DL Tài chính · 15 phút trước",
      message: "Phát hiện PII: CCCD chưa hash",
      bgTone: "bg-[#fef2f2] border-[#fca5a5]",
      iconBoxTone: "bg-[#ef4444] text-white",
      badgeTone: "bg-[#fee2e2] text-[#ef4444]",
      actionBtnTone: "bg-[#ef4444] hover:bg-[#dc2626] text-white",
    },
    {
      id: "SP-GD-032",
      severity: "CRITICAL",
      fields: "3 fields",
      title: "Dữ liệu tuyển sinh ĐH 2025",
      meta: "EduData Vietnam · 1 giờ trước",
      message: "Phát hiện PII: Số điện thoại, Email thô",
      bgTone: "bg-[#fef2f2] border-[#fca5a5]",
      iconBoxTone: "bg-[#ef4444] text-white",
      badgeTone: "bg-[#fee2e2] text-[#ef4444]",
      actionBtnTone: "bg-[#ef4444] hover:bg-[#dc2626] text-white",
    },
    {
      id: "SP-YT-018",
      severity: "WARNING",
      fields: "2 fields",
      title: "Dữ liệu dịch tễ học COVID-25",
      meta: "Medatek Vietnam · 2 giờ trước",
      message: "Phát hiện PII: Ngày sinh chi tiết",
      bgTone: "bg-[#fffbeb] border-[#fde68a]",
      iconBoxTone: "bg-[#f59e0b] text-white",
      badgeTone: "bg-[#fef3c7] text-[#d97706]",
      actionBtnTone: "bg-[#0b2e5c] hover:bg-[#163b6d] text-white",
    },
    {
      id: "SP-BHXH-008",
      severity: "WARNING",
      fields: "1 fields",
      title: "Tra cứu BHXH nhanh",
      meta: "GovData Vietnam · 4 giờ trước",
      message: "Phát hiện PII: Mã BHXH chưa mask",
      bgTone: "bg-[#fffbeb] border-[#fde68a]",
      iconBoxTone: "bg-[#f59e0b] text-white",
      badgeTone: "bg-[#fef3c7] text-[#d97706]",
      actionBtnTone: "bg-[#0b2e5c] hover:bg-[#163b6d] text-white",
    },
  ];

  const piiTypes = [
    {
      label: "CCCD / Mã định danh",
      value: "842",
      width: "95%",
      color: "bg-[#ef4444]",
    },
    {
      label: "Số điện thoại",
      value: "620",
      width: "70%",
      color: "bg-[#f59e0b]",
    },
    { label: "Email", value: "480", width: "55%", color: "bg-[#f97316]" },
    {
      label: "Địa chỉ chi tiết",
      value: "380",
      width: "40%",
      color: "bg-[#eab308]",
    },
    {
      label: "Ngày sinh đầy đủ",
      value: "280",
      width: "30%",
      color: "bg-[#84cc16]",
    },
    {
      label: "Số tài khoản NH",
      value: "142",
      width: "15%",
      color: "bg-[#ef4444]",
    },
  ];

  const techniques = [
    {
      label: "Hàm băm SHA-256",
      value: "248 SP · 55%",
      width: "55%",
      color: "bg-[#10b981]",
    },
    {
      label: "Mã hoá (Tokenization)",
      value: "124 SP · 28%",
      width: "28%",
      color: "bg-[#3b82f6]",
    },
    {
      label: "Ẩn danh hoàn toàn",
      value: "48 SP · 11%",
      width: "11%",
      color: "bg-[#f59e0b]",
    },
    {
      label: "k-ẩn danh (k>100)",
      value: "18 SP · 4%",
      width: "4%",
      color: "bg-[#8b5cf6]",
    },
    {
      label: "Bảo mật vi phân (Differential Privacy)",
      value: "8 SP · 2%",
      width: "2%",
      color: "bg-[#ef4444]",
    },
  ];

  const monitoredProducts = [
    {
      id: "SP-TC-001",
      name: "Báo cáo tín dụng DN toàn diện",
      fields: "No PII",
      fieldsTone: "bg-[#dcfce7] text-[#059669]",
      method: "Hàm băm SHA-256",
      lastScan: "1 giờ trước",
      status: "✓ Clean",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      id: "SP-TC-006",
      name: "Bộ DL lịch sử CK 2020-2025",
      fields: "No PII",
      fieldsTone: "bg-[#dcfce7] text-[#059669]",
      method: "Mã hóa",
      lastScan: "2 giờ trước",
      status: "✓ Clean",
      statusTone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      id: "SP-YT-002",
      name: "Hồ sơ y tế điện tử",
      fields: "8 fields",
      fieldsTone: "bg-[#f1f5f9] text-[#475569]",
      method: "Ẩn danh hoàn toàn",
      lastScan: "30 phút trước",
      status: "• Đã che",
      statusTone: "bg-[#e0f2fe] text-[#0369a1] font-semibold",
    },
    {
      id: "SP-BHXH-007",
      name: "Dữ liệu quyết toán BHXH",
      fields: "4 fields",
      fieldsTone: "bg-[#f1f5f9] text-[#475569]",
      method: "SHA-256 + k-ẩn danh",
      lastScan: "1 giờ trước",
      status: "• Đã che",
      statusTone: "bg-[#e0f2fe] text-[#0369a1] font-semibold",
    },
  ];

  const policies = [
    {
      name: "CCCD Vietnam (12 digits)",
      rule: "^[0-9]{12}$",
      level: "Critical",
      levelTone: "bg-[#fee2e2] text-[#ef4444]",
    },
    {
      name: "Số điện thoại VN (+84/0)",
      rule: "^(\\+84|0)[0-9]{9,10}$",
      level: "High",
      levelTone: "bg-[#fef3c7] text-[#d97706]",
    },
    {
      name: "Email address",
      rule: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
      level: "High",
      levelTone: "bg-[#fef3c7] text-[#d97706]",
    },
    {
      name: "Mã số thuế (10-13 digits)",
      rule: "^[0-9]{10,13}$",
      level: "Medium",
      levelTone: "bg-[#e0f2fe] text-[#0369a1]",
    },
    {
      name: "Số tài khoản ngân hàng",
      rule: "Pattern-based",
      level: "Critical",
      levelTone: "bg-[#fee2e2] text-[#ef4444]",
    },
    {
      name: "Địa chỉ nhà chi tiết",
      rule: "ML classifier",
      level: "High",
      levelTone: "bg-[#fef3c7] text-[#d97706]",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      <AdminPageHeader
        title="Giám sát dữ liệu cá nhân (PII)"
        description="Phát hiện và giám sát dữ liệu cá nhân trên toàn sàn · Tuân thủ Nghị định 13/2023"
        actions={
          <>
            <Button
              variant="ghost"
              className="h-10 rounded-[0.8rem] px-4 font-semibold text-[#0b2e5c] hover:bg-slate-100"
            >
              <Settings className="mr-2 size-4 text-[#64748b]" />
              Cấu hình quy tắc
            </Button>
            <Button className="h-10 rounded-[0.8rem] bg-[#0b2e5c] px-4 font-semibold text-white hover:bg-[#163b6d]">
              <RefreshCw className="mr-2 size-4" />
              Quét toàn sàn ngay
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <AdminStatCard
            key={item.label}
            title={item.label}
            value={item.value}
            icon={item.icon}
            contentClassName="flex flex-col justify-between p-5 md:py-6"
            titleClassName="mr-2 flex-1 whitespace-pre-wrap"
            valueClassName="text-[2rem] font-bold tracking-tight text-[#0b2e5c]"
            iconClassName={`size-10 shrink-0 ${item.tone}`}
            meta={
              item.sub ? (
                <p className={`mt-2 text-[0.8rem] font-bold ${item.subTone}`}>
                  {item.sub}
                </p>
              ) : null
            }
          />
        ))}
      </div>

      {/* Cảnh báo PII đang mở Series */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[1.2rem] font-semibold text-[#ef4444] flex items-center gap-2 mt-2">
          <AlertTriangle className="size-6" />
          Cảnh báo PII đang mở
        </h2>
        <p className="text-[0.9rem] text-[#607694] mb-1 -mt-2">
          Cần xử lý ngay để tuân thủ NĐ 13/2023
        </p>

        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row items-start justify-between p-5 md:p-6 rounded-[1.2rem] border ${alert.bgTone} shadow-[0_2px_10px_rgba(0,0,0,0.02)]`}
          >
            <div className="flex items-start gap-4 md:gap-5 flex-1">
              {/* Status Icon big square */}
              <div
                className={`flex size-14 shrink-0 items-center justify-center rounded-[1rem] ${alert.iconBoxTone}`}
              >
                <AlertTriangle className="size-7" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                {/* Meta flags */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.85rem] font-medium text-[#64748b]">
                    {alert.id}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`rounded-full px-2.5 py-0 text-xs hover:bg-current/0 font-bold tracking-wider ${alert.badgeTone}`}
                  >
                    {alert.severity}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2.5 py-0 text-xs hover:bg-current/0 shadow-none border-0 font-semibold bg-[#e2e8f0] text-[#475569]"
                  >
                    {alert.fields}
                  </Badge>
                  {/* Action Link -> Detailed Check */}
                  <Button
                    variant="ghost"
                    className="h-6 px-1 lg:hidden text-[#64748b]"
                  >
                    <Eye className="size-4" />
                  </Button>
                </div>

                {/* Title */}
                <h3 className="text-[1.2rem] font-bold text-[#0b2e5c]">
                  {alert.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[0.85rem] text-[#64748b]">{alert.meta}</p>

                {/* Red warning line */}
                <p className="flex items-center text-[0.9rem] font-bold text-[#dc2626] mt-2">
                  <AlertTriangle className="size-4 mr-1.5" />
                  {alert.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0 mt-4 sm:mt-0 sm:ml-4">
              <Button
                variant="ghost"
                className="hidden sm:flex h-10 rounded-[0.6rem] text-[#64748b] hover:bg-black/5 hover:text-[#0b2e5c] font-semibold"
              >
                <Eye className="mr-2 size-4" />
                Chi tiết
              </Button>
              <Button
                className={`h-10 rounded-[0.6rem] font-semibold shadow-sm px-5 ${alert.actionBtnTone}`}
              >
                Chặn SP
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-2">
        {/* PII phát hiện theo loại */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="px-6 py-5 pb-2 border-b border-transparent">
            <CardTitle className="text-[1.1rem] font-semibold text-[#0b2e5c]">
              PII phát hiện theo loại
            </CardTitle>
            <p className="text-[0.85rem] text-[#607694] mt-1">
              30 ngày qua · Top 6 loại PII phổ biến
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <div className="space-y-4">
              {piiTypes.map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[0.85rem]">
                    <span className="font-semibold text-[#0b2e5c]">
                      {item.label}
                    </span>
                    <span className="font-bold text-[#0b2e5c]">
                      {item.value}
                    </span>
                  </div>
                  <div className="w-full bg-[#f1f5f9] h-[6px] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: item.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kỹ thuật che dữ liệu */}
        <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="px-6 py-5 pb-2 border-b border-transparent">
            <CardTitle className="text-[1.1rem] font-semibold text-[#0b2e5c]">
              Kỹ thuật che dữ liệu
            </CardTitle>
            <p className="text-[0.85rem] text-[#607694] mt-1">
              Phân bổ các kỹ thuật che dữ liệu đang áp dụng
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <div className="space-y-4">
              {techniques.map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[0.85rem]">
                    <span className="font-semibold text-[#0b2e5c]">
                      {item.label}
                    </span>
                    <span className="font-bold text-[#0b2e5c]">
                      {item.value}
                    </span>
                  </div>
                  <div className="w-full bg-[#f1f5f9] h-[6px] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: item.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sản phẩm được giám sát PII Table */}
      <Card className="flex flex-col rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0 overflow-hidden">
        <CardHeader className="border-b border-[#f1f5f9] px-6 py-5">
          <CardTitle className="text-[1.3rem] font-semibold text-[#0b2e5c]">
            Sản phẩm được giám sát PII
          </CardTitle>
          <p className="mt-1 text-[0.9rem] text-[#607694]">
            440 sản phẩm đã scan · Cập nhật mỗi 6 giờ · Tự động cảnh báo khi
            phát hiện PII mới
          </p>
        </CardHeader>
        <div className="overflow-x-auto p-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-[#f1f5f9] hover:bg-transparent">
                <TableHead className="h-12 border-b-0 px-6 align-middle text-[0.75rem] font-bold text-[#64748b]">
                  SẢN PHẨM
                </TableHead>
                <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                  PII FIELDS
                </TableHead>
                <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                  PHƯƠNG PHÁP CHE DỮ LIỆU
                </TableHead>
                <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                  LAST SCAN
                </TableHead>
                <TableHead className="h-12 border-b-0 px-4 align-middle text-[0.75rem] font-bold text-[#64748b]">
                  TRẠNG THÁI
                </TableHead>
                <TableHead className="h-12 w-[80px] border-b-0 px-6 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoredProducts.map((prod, i) => (
                <TableRow
                  key={i}
                  className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]"
                >
                  <TableCell className="px-6 py-4 align-middle">
                    <div className="font-mono text-[0.75rem] font-medium text-[#64748b] mb-0.5">
                      {prod.id}
                    </div>
                    <div className="text-[0.95rem] font-bold text-[#0b2e5c]">
                      {prod.name}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-middle">
                    <Badge
                      variant="secondary"
                      className={`rounded-full px-3 py-1 font-semibold whitespace-nowrap text-xs shadow-none border-0 hover:bg-current/0 ${prod.fieldsTone}`}
                    >
                      {prod.fields}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-middle">
                    <span className="text-[0.9rem] text-[#0b2e5c] font-medium">
                      {prod.method}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-middle">
                    <span className="text-[0.85rem] text-[#64748b]">
                      {prod.lastScan}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-middle">
                    <Badge
                      variant="secondary"
                      className={`rounded-full px-3 py-1 whitespace-nowrap text-xs shadow-none border-0 hover:bg-current/0 ${prod.statusTone}`}
                    >
                      {prod.status}
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

      {/* Policies phát hiện PII */}
      <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-[#f8fafc] shadow-sm ring-0 overflow-hidden">
        <CardHeader className="px-6 py-5 flex flex-col items-start gap-1 bg-[#f1f5f9]">
          <CardTitle className="text-[1.2rem] font-semibold text-[#0b2e5c] flex items-center gap-2">
            <Settings className="size-5" />
            Policies phát hiện PII
          </CardTitle>
          <p className="text-[0.9rem] text-[#607694]">
            Quy tắc tự động của PII Detector · Dựa trên regex + ML classifier
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col bg-white">
            {policies.map((policy, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] hover:bg-[#f8fafc] last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-6 rounded-full bg-[#dcfce7] text-[#059669]">
                    <Check className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[0.95rem] font-bold text-[#0b2e5c] leading-snug">
                      {policy.name}
                    </h4>
                    <span className="font-mono text-[0.8rem] text-[#94a3b8]">
                      {policy.rule}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="secondary"
                    className={`rounded-full px-2.5 py-0 text-xs font-semibold hover:bg-current/0 shadow-none border-0 ${policy.levelTone}`}
                  >
                    {policy.level}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-[#94a3b8] hover:bg-[#e2e8f0] hover:text-[#0b2e5c]"
                  >
                    <Settings className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
