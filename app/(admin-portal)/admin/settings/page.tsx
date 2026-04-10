import {
  Building2,
  KeyRound,
  Shield,
  ShieldCheck,
  UserCog,
  Users,
  Globe2,
  Link2,
  Pencil,
  Plus,
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
    title: "Quản trị viên",
    value: "60",
    icon: Users,
    iconClassName: "bg-[#dfeaf7] text-[#214f80]",
  },
  {
    title: "Nhóm quyền",
    value: "6",
    icon: Shield,
    iconClassName: "bg-[#fff4de] text-[#d97706]",
  },
  {
    title: "Quyền hệ thống",
    value: "142",
    icon: KeyRound,
    iconClassName: "bg-[#eef3ff] text-[#315fda]",
  },
  {
    title: "Audit log hôm nay",
    value: "2.480",
    icon: ShieldCheck,
    iconClassName: "bg-[#e7fbf2] text-[#0f9f6e]",
  },
] as const;

const admins = [
  {
    name: "Lê Minh Khoa",
    email: "khoa.lm@sdl.gov.vn",
    role: "Super Admin",
    status: "Đang online",
    initials: "MK",
  },
  {
    name: "Nguyễn Thị Lan",
    email: "lan.nt@sdl.gov.vn",
    role: "Admin CQNN",
    status: "15 phút trước",
    initials: "TL",
  },
  {
    name: "Trần Văn Hùng",
    email: "hung.tv@sdl.gov.vn",
    role: "Thẩm định viên",
    status: "2 giờ trước",
    initials: "VH",
  },
  {
    name: "Phạm Đức Anh",
    email: "anh.pd@sdl.gov.vn",
    role: "Kỹ thuật viên",
    status: "1 ngày trước",
    initials: "ĐA",
  },
] as const;

const roles = [
  {
    name: "Super Admin",
    users: "2 user",
    detail: "Toàn quyền hệ thống",
    rights: "142 quyền",
  },
  {
    name: "Admin CQNN",
    users: "8 user",
    detail: "Quản lý nghiệp vụ sàn",
    rights: "86 quyền",
  },
  {
    name: "Thẩm định viên",
    users: "28 user",
    detail: "Thẩm định chất lượng dữ liệu",
    rights: "24 quyền",
  },
  {
    name: "Kỹ thuật viên",
    users: "12 user",
    detail: "Vận hành hạ tầng",
    rights: "64 quyền",
  },
  {
    name: "Account Manager",
    users: "6 user",
    detail: "Hỗ trợ Platinum Seller",
    rights: "38 quyền",
  },
  {
    name: "Biên tập viên",
    users: "4 user",
    detail: "Quản lý tin tức & FAQ",
    rights: "18 quyền",
  },
] as const;

const ssoItems = [
  ["VNeID SSO", "Bật"],
  ["OAuth 2.0 / OIDC", "Bật"],
  ["SAML 2.0", "Bật"],
  ["LDAP / AD", "Bật"],
  ["2FA bắt buộc (admin)", "Bật"],
  ["Passwordless WebAuthn", "Tắt"],
] as const;

const securityItems = [
  ["TLS 1.3", "Bắt buộc"],
  ["AES-256 encryption at rest", "Bật"],
  ["HSM (Hardware Security Module)", "Bật"],
  ["IP whitelist (admin)", "Cấu hình"],
  ["Rate limiting", "Bật"],
  ["WAF (CloudFlare)", "Bật"],
  ["DDoS protection", "Bật"],
] as const;

const integrations = [
  ["DMDC - Danh mục dùng chung", "Đồng bộ 2 chiều"],
  ["NDC - Trung tâm Dữ liệu QG", "Kết nối"],
  ["NDAChain", "Blockchain"],
  ["NGSP/LGSP", "API Gateway"],
  ["VNeID", "Real-time"],
  ["VNPay (Thanh toán)", "Kết nối"],
] as const;

function pill(label: string) {
  if (label === "Bật" || label === "Bắt buộc")
    return "bg-[#dcfce7] text-[#15803d]";
  if (label === "Tắt") return "bg-[#eef2ff] text-[#4f46e5]";
  if (label === "Cấu hình") return "bg-[#dcfce7] text-[#0f9f6e]";
  if (label === "Đồng bộ 2 chiều") return "bg-[#dbeafe] text-[#1d4ed8]";
  if (label === "Kết nối") return "bg-[#eef2ff] text-[#4f46e5]";
  if (label === "Blockchain") return "bg-[#eef2ff] text-[#4f46e5]";
  if (label === "API Gateway") return "bg-[#dbeafe] text-[#1d4ed8]";
  if (label === "Real-time") return "bg-[#e7fbf2] text-[#0f9f6e]";
  return "bg-[#f3f6fb] text-[#64748b]";
}

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] bg-[#f2f6fb] px-4 py-4 text-[#0c2853] sm:px-5 lg:px-6">
      <section className="flex flex-col gap-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-4 py-4 shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_28px_rgba(11,46,92,0.06)] ring-1 ring-[#d8e0ea] sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[2.5rem] sm:leading-[1.02]">
              Cấu hình hệ thống
            </h1>
            <p className="max-w-3xl text-[0.95rem] leading-6 text-[#6a7f99] sm:text-[1rem]">
              Quản lý tài khoản quản trị, phân quyền RBAC và an ninh hệ thống
            </p>
          </div>

          <Button className="h-10 rounded-[0.95rem] bg-[#10386d] px-4 text-white hover:bg-[#0f335f]">
            <Plus className="mr-2 size-4" />
            Thêm quản trị viên
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

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.7fr]">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <UserCog className="size-5" />
              Quản trị viên
            </CardTitle>
            <p className="mt-1 text-[0.92rem] text-[#6a7f99]">
              Tài khoản nội bộ của Trung tâm Dữ liệu Quốc gia
            </p>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {admins.map((admin) => (
              <div
                key={admin.name}
                className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-[#e8edf3] px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d6a520] font-semibold text-[#0b2348]">
                    {admin.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0a2e5c]">{admin.name}</p>
                    <p className="text-[0.84rem] text-[#7b8da5]">
                      {admin.email} · Phòng CNTT
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-[#315fda] hover:bg-[#dbeafe]">
                    {admin.role}
                  </Badge>
                  <Badge className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[#0f9f6e] hover:bg-[#dcfce7]">
                    • {admin.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-full hover:bg-[#edf3fb]"
                  >
                    <Pencil className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <Shield className="size-5" />
              Nhóm quyền (RBAC)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {roles.map((role) => (
              <div
                key={role.name}
                className="rounded-[1.1rem] border border-[#e8edf3] px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#0a2e5c]">{role.name}</p>
                    <p className="text-[0.84rem] text-[#7b8da5]">
                      {role.detail}
                    </p>
                    <p className="mt-1 text-[0.84rem] text-[#7b8da5]">
                      {role.rights}
                    </p>
                  </div>
                  <Badge className="rounded-full bg-[#f3f6fb] px-2.5 py-0.5 text-[#64748b] hover:bg-[#f3f6fb]">
                    {role.users}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <ShieldCheck className="size-5" />
              Cấu hình SSO & Auth
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {ssoItems.map(([label, state]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[0.94rem] text-[#0a2e5c]">{label}</span>
                <Badge
                  className={`rounded-full px-2.5 py-0.5 hover:bg-current/0 ${pill(state)}`}
                >
                  {state}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <Shield className="size-5" />
              Bảo mật hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {securityItems.map(([label, state]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[0.94rem] text-[#0a2e5c]">{label}</span>
                <Badge
                  className={`rounded-full px-2.5 py-0.5 hover:bg-current/0 ${pill(state)}`}
                >
                  {state}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border-[#d8e0ea] bg-white shadow-[0_1px_0_rgba(13,43,88,0.04),0_12px_24px_rgba(11,46,92,0.05)] ring-0">
          <CardHeader className="px-4 py-4 pb-0 sm:px-5">
            <CardTitle className="flex items-center gap-2 text-[1.18rem] font-semibold tracking-tight text-[#0a2e5c] sm:text-[1.3rem]">
              <Globe2 className="size-5" />
              Liên thông hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
            {integrations.map(([label, state]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[0.94rem] text-[#0a2e5c]">{label}</span>
                <Badge
                  className={`rounded-full px-2.5 py-0.5 hover:bg-current/0 ${pill(state)}`}
                >
                  {state}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
