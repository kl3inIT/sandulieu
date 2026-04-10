import {
  ArrowDownToLine,
  CircleCheck,
  CircleX,
  Eye,
  FileText,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

import { AdminStatCard } from "@/shared/components/admin/admin-stat-card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const topActions = [
  {
    label: "Xuất báo cáo NĐ 13/2023",
    variant: "outline" as const,
    icon: ArrowDownToLine,
  },
  {
    label: "Audit policies",
    variant: "default" as const,
    icon: FileText,
  },
] as const;

const bannerStats = [
  {
    label: "Consent receipts phát hành",
    value: "8,42M",
    detail: "Tháng 4/2026",
    tone: "gold",
  },
  {
    label: "Tuân thủ ND 13/2023",
    value: "100%",
    detail: "Không vi phạm",
    tone: "green",
  },
] as const;

const overviewCards = [
  {
    title: "Consent đang hiệu lực",
    value: "12,8M",
    delta: "+18,4%",
    icon: CircleCheck,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
    deltaClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
  {
    title: "Đã thu hồi",
    value: "842K",
    delta: "-5,2%",
    icon: CircleX,
    iconClassName: "bg-[#ffe9ed] text-[#f43f5e]",
    deltaClassName: "bg-[#ffe9ed] text-[#f43f5e]",
  },
  {
    title: "Sắp hết hạn (30d)",
    value: "248K",
    delta: "",
    icon: ShieldAlert,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
    deltaClassName: "bg-[#fff4de] text-[#d97706]",
  },
  {
    title: "Vi phạm phát hiện",
    value: "0",
    delta: "",
    icon: ShieldCheck,
    iconClassName: "bg-[#fff4de] text-[#c58b00]",
    deltaClassName: "bg-[#fff4de] text-[#c58b00]",
  },
] as const;

const complianceItems = [
  { label: "Consent rõ ràng, cụ thể (Art. 17)", value: 100 },
  { label: "Mục đích sử dụng ràng buộc (Purpose binding)", value: 100 },
  { label: "Thu hồi đồng ý real-time", value: 100 },
  { label: "Consent receipt chuẩn hóa", value: 100 },
  { label: "Audit trail đầy đủ", value: 100 },
  { label: "Minor consent (dưới 16 tuổi) có phụ huynh đồng ý", value: 98 },
  { label: "Quyền xóa dữ liệu (right to erasure)", value: 100 },
  { label: "Thông báo chuyển dữ liệu xuyên biên giới", value: 100 },
] as const;

const serviceRows = [
  {
    code: "DV-DC-001",
    name: "Xác thực VNeID",
    owner: "Cục C06",
    consent30d: "1.820.000",
    revoke30d: "12.400",
    revokeRate: "0.68%",
    status: "Bình thường",
  },
  {
    code: "DV-TC-118",
    name: "Mã số thuế cá nhân",
    owner: "Tổng cục Thuế",
    consent30d: "842.000",
    revoke30d: "18.200",
    revokeRate: "2.16%",
    status: "Bình thường",
  },
  {
    code: "DV-BHXH-007",
    name: "Quá trình BHXH",
    owner: "BHXH VN",
    consent30d: "482.000",
    revoke30d: "8.400",
    revokeRate: "1.74%",
    status: "Bình thường",
  },
  {
    code: "DV-DN-042",
    name: "Thông tin doanh nghiệp",
    owner: "Cục QLĐKKD",
    consent30d: "248.000",
    revoke30d: "2.840",
    revokeRate: "1.15%",
    status: "Bình thường",
  },
  {
    code: "SP-TC-001",
    name: "Báo cáo tín dụng DN",
    owner: "CTCP DL Tài chính",
    consent30d: "142.000",
    revoke30d: "18.600",
    revokeRate: "13.1%",
    status: "Bất thường",
  },
] as const;

const transparencyCards = [
  {
    title: "Công dân đã truy cập dashboard",
    value: "14,8M",
    detail: "21,6% dân số · +3,2M tháng này",
  },
  {
    title: "Lượt truy vấn 'ai xem dữ liệu tôi'",
    value: "48,2M",
    detail: "+18% tháng này",
  },
  {
    title: "Thu hồi từ dashboard",
    value: "82K",
    detail: "0,6% tổng consent",
  },
] as const;

export default function AdminConsentPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
              Quản lý đồng ý dữ liệu toàn sàn
            </h1>
            <p className="max-w-4xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Dashboard Consent Management theo Nghị định 13/2023 · Luật BVDLCN
              2025 · Mô hình Estonia Personal Data Usage Monitor
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {topActions.map((action) => {
              const Icon = action.icon;

              return (
                <Button
                  key={action.label}
                  variant={action.variant === "default" ? "default" : "outline"}
                  className={
                    action.variant === "default"
                      ? "h-10 rounded-[0.95rem] bg-[#10386d] px-4 text-white hover:bg-[#0f335f]"
                      : "h-10 rounded-[0.95rem] border-[#d8e0ea] bg-white px-4 text-[#0a2e5c] shadow-none hover:bg-[#f8fbff]"
                  }
                >
                  <Icon className="mr-2 size-4" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>

        <Card className="rounded-[1.25rem] border-0 bg-[linear-gradient(135deg,#0b1c32_0%,#08224b_40%,#0a2e5c_100%)] text-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.18)] ring-0">
          <CardContent className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
            <Badge className="rounded-full border border-[#c58b00]/40 bg-[#1d3557] px-3 py-1 text-[0.76rem] font-medium text-[#f1b62c] hover:bg-[#1d3557]">
              Tuân thủ Nghị định 13/2023
            </Badge>

            <div className="space-y-3">
              <p className="text-[1.7rem] font-semibold tracking-tight sm:text-[2.2rem]">
                68,4 triệu công dân · 24,8 triệu tổ chức đã cấp đồng ý
              </p>
              <p className="max-w-4xl text-[0.95rem] leading-6 text-white/75 sm:text-[1rem]">
                Tuân thủ 100% · Mô hình minh bạch kiểu Estonia · Kiểu trung gian
                &quot;không nhìn thấy dữ liệu&quot; của Ấn Độ · Thu hồi đồng ý
                tức thời
              </p>
            </div>

            <div className="grid gap-3 sm:max-w-2xl sm:grid-cols-2">
              {bannerStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[0.95rem] border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-[0.82rem] text-white/55">{item.label}</p>
                  <p
                    className={`mt-1 text-[1.8rem] font-semibold ${item.tone === "green" ? "text-[#1dd1a1]" : "text-[#f1b62c]"}`}
                  >
                    {item.value}
                  </p>
                  <p className="text-[0.82rem] text-white/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <AdminStatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            cardClassName="rounded-[1.15rem] border-[#d8e0ea] shadow-[0_1px_0_rgba(13,43,88,0.04),0_8px_18px_rgba(11,46,92,0.05)]"
            contentClassName="px-4 py-5"
            headerClassName="items-start gap-3"
            titleClassName="text-[0.92rem] text-[#7187a2]"
            valueClassName="text-[2rem] font-semibold tracking-tight text-[#091f40] sm:text-[2.15rem]"
            iconClassName={`size-11 rounded-[0.95rem] ${card.iconClassName}`}
            meta={
              card.delta ? (
                <Badge
                  className={`mt-2 rounded-full px-2.5 py-0.5 text-[0.76rem] font-medium hover:bg-current/0 ${card.deltaClassName}`}
                >
                  {card.delta}
                </Badge>
              ) : null
            }
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <Shield className="size-5" />
              Kiểm tra tuân thủ NĐ 13/2023
            </CardTitle>
            <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
              8 yêu cầu bắt buộc của Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu
              cá nhân
            </p>
          </CardHeader>

          <CardContent className="space-y-4 px-4 pb-4 pt-4 sm:px-5">
            {complianceItems.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-[0.9rem] text-[#0a2e5c]">
                  <span>{item.label}</span>
                  <Badge
                    className={
                      item.value === 100
                        ? "rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[#15803d] hover:bg-[#dcfce7]"
                        : "rounded-full bg-[#ffe8c7] px-2.5 py-0.5 text-[#d97706] hover:bg-[#ffe8c7]"
                    }
                  >
                    {item.value}%
                  </Badge>
                </div>
                <div className="h-2 rounded-full bg-[#edf2f7]">
                  <div
                    className={
                      item.value === 100
                        ? "h-2 rounded-full bg-[#10b981]"
                        : "h-2 rounded-full bg-[#f59e0b]"
                    }
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
            <CardHeader className="px-4 py-4 pb-0 sm:px-5">
              <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                <Users className="size-5" />
                Top dịch vụ có consent
              </CardTitle>
              <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                Dịch vụ tạo nhiều consent receipts nhất · Cần giám sát sao
              </p>
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-4 sm:px-5">
              <div className="overflow-hidden rounded-[1rem] border border-[#e8edf3]">
                <div className="grid grid-cols-[1.3fr_1fr_0.8fr_0.8fr_0.8fr_0.75fr_0.2fr] bg-[#f8faff] px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#7b8da5]">
                  <span>Dịch vụ</span>
                  <span>Cơ quan/Seller</span>
                  <span>Consent cấp 30d</span>
                  <span>Thu hồi 30d</span>
                  <span>Tỷ lệ thu hồi</span>
                  <span>Trạng thái</span>
                  <span />
                </div>

                <div className="divide-y divide-[#edf2f7]">
                  {serviceRows.map((row) => (
                    <div
                      key={row.code}
                      className="grid grid-cols-[1.3fr_1fr_0.8fr_0.8fr_0.8fr_0.75fr_0.2fr] items-center px-4 py-4 text-[0.92rem]"
                    >
                      <div className="space-y-0.5">
                        <p className="text-[0.75rem] text-[#7b8da5]">
                          {row.code}
                        </p>
                        <p className="font-semibold text-[#0a2e5c]">
                          {row.name}
                        </p>
                      </div>
                      <span className="text-[#0c2853]">{row.owner}</span>
                      <span className="font-semibold text-[#10b981]">
                        {row.consent30d}
                      </span>
                      <span className="font-semibold text-[#ef4444]">
                        {row.revoke30d}
                      </span>
                      <span className="font-semibold text-[#0c2853]">
                        {row.revokeRate}
                      </span>
                      <Badge
                        className={
                          row.status === "Bất thường"
                            ? "rounded-full bg-[#ffe0e0] px-2.5 py-0.5 text-[#ef4444] hover:bg-[#ffe0e0]"
                            : "rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[#15803d] hover:bg-[#dcfce7]"
                        }
                      >
                        {row.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="rounded-full text-[#0a2e5c] hover:bg-[#edf3fb]"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 rounded-[0.95rem] border border-[#ffd7dd] bg-[#fff0f3] px-4 py-3 text-[0.9rem] text-[#e11d48]">
                <strong>Cảnh báo:</strong> SP-TC-001 có tỷ lệ thu hồi 13,1%
                (tăng 8% so với tháng trước). Cần điều tra chất lượng dịch vụ và
                mức độ hài lòng buyer.
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
            <CardHeader className="px-4 py-4 pb-0 sm:px-5">
              <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
                <UserCheck className="size-5" />
                Dashboard minh bạch cho công dân (Estonia Monitor)
              </CardTitle>
              <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
                68,4M công dân có thể xem: ai truy cập dữ liệu của mình, mục
                đích, thời gian, cơ sở pháp lý
              </p>
            </CardHeader>

            <CardContent className="grid gap-3 px-4 pb-4 pt-4 sm:px-5 sm:grid-cols-3">
              {transparencyCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1rem] border border-[#e8edf3] px-4 py-4"
                >
                  <p className="text-[0.8rem] text-[#7b8da5]">{card.title}</p>
                  <p className="mt-1 text-[1.65rem] font-semibold tracking-tight text-[#0a2e5c]">
                    {card.value}
                  </p>
                  <p className="mt-1 text-[0.85rem] text-[#0f9f6e]">
                    {card.detail}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
