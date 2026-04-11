import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Database,
  Info,
  Key,
  Lock,
  Send,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Progress } from "@/shared/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const inputSchemaExample = `{
  "type": "object",
  "required": ["cccd"],
  "properties": {
    "cccd": { "type": "string", "pattern": "^[0-9]{12}$" },
    "purpose": { "type": "string", "enum": ["KYC", "VERIFY", "LOOKUP"] },
    "consent_receipt": { "type": "string" }
  }
}`;

const outputSchemaExample = `{
  "ho_ten": "string",
  "dia_chi_thuong_tru": "string",
  "ngay_dang_ky": "date",
  "chu_ho": "string",
  "thanh_vien_ho": "array",
  "metadata": {
    "consent_id": "string",
    "processed_at": "datetime"
  }
}`;

const previewApiExample = `POST /api/v1/DV-DC-003
Authorization: Bearer {token}
X-Consent-Receipt: {cr_id}

{
  "cccd": "079123456789",
  "purpose": "KYC"
}`;

export default function AdminCreateServicePage() {
  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header Overview */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]">
            Tạo lập dịch vụ dữ liệu mới
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#607694]">
            Quy trình 5 bước theo mô hình data-driven — áp dụng cho mọi chỉ tiêu
            thống kê
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
        {/* Step 1 */}
        <div className="flex w-full min-w-[200px] flex-1 items-center gap-3 rounded-[1rem] border border-[#10b981]/20 bg-[#f0fdf4] p-3 pr-4 shadow-sm lg:w-auto">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
            <CheckCircle className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-wider text-[#10b981] uppercase">
              Bước 1
            </p>
            <p className="truncate font-semibold text-[#065f46]">
              Chọn chỉ tiêu
            </p>
          </div>
        </div>
        <ChevronRight className="hidden size-4 shrink-0 text-[#94a3b8] lg:block" />

        {/* Step 2 */}
        <div className="flex w-full min-w-[220px] flex-1 items-center gap-3 rounded-[1rem] border border-[#f59e0b]/20 bg-[#fffbeb] p-3 pr-4 shadow-sm lg:w-auto">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-white">
            <Database className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-wider text-[#d97706] uppercase">
              Bước 2
            </p>
            <p className="truncate font-semibold text-[#92400e]">
              ĐẦU VÀO / ĐẦU RA
            </p>
          </div>
        </div>
        <ChevronRight className="hidden size-4 shrink-0 text-[#94a3b8] lg:block" />

        {/* Step 3 */}
        <div className="flex w-full min-w-[180px] flex-1 items-center gap-3 rounded-[1rem] border border-[#d9e0e7] bg-white p-3 pr-4 shadow-sm opacity-60 lg:w-auto">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b]">
            <Key className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-wider text-[#94a3b8] uppercase">
              Bước 3
            </p>
            <p className="truncate font-semibold text-[#64748b]">Xác thực</p>
          </div>
        </div>
        <ChevronRight className="hidden size-4 shrink-0 text-[#94a3b8] lg:block" />

        {/* Step 4 */}
        <div className="flex w-full min-w-[200px] flex-1 items-center gap-3 rounded-[1rem] border border-[#d9e0e7] bg-white p-3 pr-4 shadow-sm opacity-60 lg:w-auto">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b]">
            <Lock className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-wider text-[#94a3b8] uppercase">
              Bước 4
            </p>
            <p className="truncate font-semibold text-[#64748b]">
              Mã hóa & Ký số
            </p>
          </div>
        </div>
        <ChevronRight className="hidden size-4 shrink-0 text-[#94a3b8] lg:block" />

        {/* Step 5 */}
        <div className="flex w-full min-w-[220px] flex-1 items-center gap-3 rounded-[1rem] border border-[#d9e0e7] bg-white p-3 pr-4 shadow-sm opacity-60 lg:w-auto">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b]">
            <Send className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-wider text-[#94a3b8] uppercase">
              Bước 5
            </p>
            <p className="truncate font-semibold text-[#0b2e5c]">
              Chuyển tiếp & Xuất bản
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Column - Main Content */}
        <Card className="flex h-full flex-col rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
          <CardHeader className="border-b border-[#f1f5f9] px-6 py-5">
            <CardTitle className="text-[1.3rem] font-semibold text-[#0b2e5c]">
              Bước 2: ĐẦU VÀO / ĐẦU RA
            </CardTitle>
            <p className="mt-1.5 text-[0.95rem] text-[#607694]">
              Schema & nguồn dữ liệu
            </p>
          </CardHeader>
          <CardContent className="flex-1 space-y-6 p-6">
            {/* Inputs */}
            <div className="space-y-2">
              <Label className="font-medium text-[#0b2e5c]">Mã dịch vụ</Label>
              <Input
                className="h-11 rounded-[0.8rem] border-[#d9e0e7] bg-white text-[#0b2e5c] font-medium"
                defaultValue="DV-DC-003"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium text-[#0b2e5c]">Tên dịch vụ</Label>
              <Input
                className="h-11 rounded-[0.8rem] border-[#d9e0e7] bg-white text-[#0b2e5c] font-medium"
                defaultValue="Tra cứu thông tin cư trú theo CCCD"
              />
            </div>

            {/* Selects Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-[#0b2e5c]">
                  Nhóm dịch vụ
                </Label>
                <Select defaultValue="dan-cu">
                  <SelectTrigger className="h-11 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white">
                    <SelectValue placeholder="Chọn nhóm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dan-cu">Dân cư</SelectItem>
                    <SelectItem value="doanh-nghiep">Doanh nghiệp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-[#0b2e5c]">Chỉ tiêu</Label>
                <Select defaultValue="dc-002">
                  <SelectTrigger className="h-11 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white">
                    <SelectValue placeholder="Chọn chỉ tiêu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dc-002">
                      DC-002 · Thông tin cư trú theo CCCD
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schemas */}
            <div className="space-y-2">
              <Label className="font-medium text-[#0b2e5c]">
                Schema đầu vào (JSON Schema)
              </Label>
              <div className="max-h-[220px] overflow-auto rounded-[0.8rem] bg-[#0b1b36] p-4 text-[0.85rem] font-mono leading-relaxed text-[#fde047]">
                <pre>
                  <code>{inputSchemaExample}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium text-[#0b2e5c]">
                Schema đầu ra
              </Label>
              <div className="max-h-[220px] overflow-auto rounded-[0.8rem] bg-[#0b1b36] p-4 text-[0.85rem] font-mono leading-relaxed text-[#e2e8f0]">
                <pre>
                  <code>{outputSchemaExample}</code>
                </pre>
              </div>
            </div>

            {/* Bottom Selects Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium text-[#0b2e5c]">
                  Nguồn dữ liệu
                </Label>
                <Select defaultValue="csdl">
                  <SelectTrigger className="h-11 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white">
                    <SelectValue placeholder="Chọn nguồn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csdl">
                      CSDL Quốc gia về dân cư
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-[#0b2e5c]">
                  Tần suất cập nhật
                </Label>
                <Select defaultValue="real-time">
                  <SelectTrigger className="h-11 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white">
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-[#f1f5f9] px-6 py-5">
            <Button
              variant="outline"
              className="h-11 rounded-[0.8rem] border-[#d9e0e7] bg-white px-5 text-[#0b2e5c] hover:bg-slate-50 hover:text-[#0b2e5c]"
              asChild
            >
              <Link href="/admin/services">
                <ArrowLeft className="mr-2 size-4" />
                Quay lại
              </Link>
            </Button>
            <Button className="h-11 rounded-[0.8rem] bg-[#0b2e5c] px-5 text-white hover:bg-[#163b6d]">
              Tiếp theo: Xác thực
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column - Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Progress Summary Card */}
          <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
            <CardHeader className="border-b border-[#f1f5f9] px-5 py-4">
              <CardTitle className="text-[1.1rem] font-semibold text-[#0b2e5c]">
                Tiến trình
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.8rem] font-medium text-[#64748b]">
                  Hoàn thành
                </span>
                <span className="rounded-full bg-[#fffbeb] px-2.5 py-0.5 text-[0.75rem] font-bold text-[#d97706]">
                  2/5 bước
                </span>
              </div>
              <Progress
                value={40}
                className="mb-8 h-2 bg-[#f1f5f9] [&>div]:bg-[#f59e0b]"
              />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-5 shrink-0 text-[#10b981]" />
                  <span className="text-[0.95rem] font-medium text-[#10b981]">
                    Chọn chỉ tiêu
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-[#f59e0b] bg-[#f59e0b]">
                    <div className="size-1.5 rounded-full bg-white"></div>
                  </div>
                  <span className="text-[0.95rem] font-bold text-[#0b2e5c]">
                    ĐẦU VÀO / ĐẦU RA
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="size-5 shrink-0 rounded-full border-2 border-[#cbd5e1]"></div>
                  <span className="text-[0.95rem] font-medium text-[#64748b]">
                    Xác thực
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="size-5 shrink-0 rounded-full border-2 border-[#cbd5e1]"></div>
                  <span className="text-[0.95rem] font-medium text-[#64748b]">
                    Mã hóa & Ký số
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="size-5 shrink-0 rounded-full border-2 border-[#cbd5e1]"></div>
                  <span className="text-[0.95rem] font-medium text-[#64748b]">
                    Chuyển tiếp & Xuất bản
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Card */}
          <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-[#f0fdf4] shadow-sm ring-0">
            <CardHeader className="px-5 pb-0 py-4">
              <CardTitle className="text-[1.1rem] font-semibold text-[#065f46]">
                Pháp lý & Tuân thủ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 p-5 pt-3">
              {[
                "Nghị định 13/2023/NĐ-CP",
                "Luật BVDLCN 2025",
                "ISO/IEC 27001",
                "FAPI 2.0 Baseline",
                "PII Detection active",
                "DCAT-VN compliant",
                "Nhật ký kiểm toán NDAchain",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="size-4 shrink-0 text-[#10b981]" />
                  <span className="text-[0.85rem] font-medium text-[#065f46]">
                    {item}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preview API Card */}
          <Card className="overflow-hidden rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
            <CardHeader className="border-b border-[#f1f5f9] px-5 py-4">
              <CardTitle className="text-[1.1rem] font-semibold text-[#0b2e5c]">
                Preview API
              </CardTitle>
            </CardHeader>
            <div className="bg-white p-5">
              <div className="overflow-x-auto rounded-[0.8rem] bg-[#0b1b36] p-4 text-[0.8rem] font-mono leading-relaxed text-[#e2e8f0]">
                <pre>
                  <code>{previewApiExample}</code>
                </pre>
              </div>
            </div>
          </Card>

          {/* Notice Card */}
          <Card className="rounded-[1.2rem] border-[#fcd34d] bg-[#fffbeb] shadow-sm ring-0">
            <CardHeader className="flex flex-row items-center gap-2 px-5 py-4 pb-0">
              <Info className="size-5 shrink-0 text-[#d97706]" />
              <CardTitle className="m-0 text-[1.1rem] font-semibold text-[#d97706]">
                Lưu ý
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-3">
              <ul className="list-disc space-y-2 pl-4 text-[0.85rem] leading-relaxed text-[#92400e]">
                <li>
                  Dữ liệu cá nhân cần consent bắt buộc trước mỗi giao dịch.
                </li>
                <li>Mỗi bước có thể quay lại chỉnh sửa trước khi xuất bản.</li>
                <li>Sau khi xuất bản, mọi thay đổi sẽ tạo version mới.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
