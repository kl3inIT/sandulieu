"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  CreditCard,
  Globe,
  KeyRound,
  Mail,
  Monitor,
  Moon,
  Palette,
  Pencil,
  Plus,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  Upload,
} from "lucide-react";

import {
  activeSessions,
  apiWhitelists,
  memberRows,
  notificationRows,
  profileTags,
  sellerRoles,
  settingsTabs,
  twoFactorMethods,
} from "@/features/seller/data/account/settings.data";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Textarea } from "@/shared/components/ui/textarea";
import { SellerPageHeader } from "@/features/seller/shared";

export function SellerSettingsPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof settingsTabs)[number]["id"]>("profile");

  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Cài đặt tài khoản nhà cung cấp"
        description="Quản lý hồ sơ doanh nghiệp, storefront, team, thanh toán và bảo mật"
      />

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-1.5">
          {settingsTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className="h-10 justify-start rounded-xl px-3 text-sm"
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon data-icon="inline-start" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === "profile" ? <ProfilePanel /> : null}
        {activeTab === "storefront" ? <StorefrontPanel /> : null}
        {activeTab === "members" ? <MembersPanel /> : null}
        {activeTab === "payment" ? <PaymentPanel /> : null}
        {activeTab === "security" ? <SecurityPanel /> : null}
        {activeTab === "notification" ? <NotificationPanel /> : null}
        {activeTab === "display" ? <DisplayPanel /> : null}
      </div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Hồ sơ nhà cung cấp dữ liệu</CardTitle>
        <CardDescription className="text-xs">
          Hiển thị công khai trên storefront của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-24 items-center justify-center rounded-2xl bg-emerald-600 text-4xl font-semibold text-white">
            DTC
          </div>
          <Button variant="outline" className="h-8 rounded-lg text-xs">
            <Upload data-icon="inline-start" />
            Đổi logo
          </Button>
        </div>

        <FieldGroup className="grid gap-4 lg:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="seller-name">Tên nhà cung cấp *</FieldLabel>
            <FieldContent>
              <Input
                id="seller-name"
                className="h-10 rounded-md"
                defaultValue="CTCP Dữ liệu Tài chính Việt"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="seller-tax-id">MST</FieldLabel>
            <FieldContent>
              <div className="flex items-center gap-2">
                <Input
                  id="seller-tax-id"
                  className="h-10 rounded-md"
                  defaultValue="0316789012"
                />
                <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                  DMDC
                </Badge>
              </div>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="seller-website">Website</FieldLabel>
            <FieldContent>
              <Input
                id="seller-website"
                className="h-10 rounded-md"
                defaultValue="https://dltc.vn"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="seller-sector">Lĩnh vực chính</FieldLabel>
            <FieldContent>
              <Select defaultValue="finance">
                <SelectTrigger id="seller-sector" className="h-10 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="finance">
                      Tài chính - Ngân hàng
                    </SelectItem>
                    <SelectItem value="health">Y tế</SelectItem>
                    <SelectItem value="tech">Công nghệ</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field className="lg:col-span-2">
            <FieldLabel htmlFor="seller-summary">Giới thiệu ngắn</FieldLabel>
            <FieldContent>
              <Textarea
                id="seller-summary"
                rows={5}
                className="rounded-md"
                defaultValue="CTCP Dữ liệu Tài chính Việt là nhà cung cấp dữ liệu hàng đầu về tài chính - ngân hàng - chứng khoán tại Việt Nam với hơn 18 sản phẩm dữ liệu được chứng nhận Gold bởi Hội đồng thẩm định SDL."
              />
            </FieldContent>
          </Field>

          <Field className="lg:col-span-2">
            <FieldLabel>Phân loại tự đánh giá</FieldLabel>
            <FieldContent>
              <div className="flex flex-wrap gap-2">
                {profileTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                <Button
                  variant="outline"
                  className="h-7 rounded-full px-3 text-xs"
                >
                  + Thêm tag
                </Button>
              </div>
            </FieldContent>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

function StorefrontPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            <Building2 data-icon="inline-start" />
            Storefront URL
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input
            className="h-11 rounded-md bg-muted"
            readOnly
            value="https://sdl.gov.vn/s/dltc-vietnam"
          />
          <Button variant="outline" className="h-9 w-fit rounded-lg text-sm">
            Đổi URL (1 lần/năm)
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            SEO & Metadata
          </CardTitle>
          <CardDescription>
            Giúp bên mua tìm thấy bạn nhanh hơn trên catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-4">
            <Field>
              <FieldLabel htmlFor="seller-meta-title">Meta title</FieldLabel>
              <FieldContent>
                <Input
                  id="seller-meta-title"
                  className="h-11 rounded-md"
                  defaultValue="CTCP Dữ liệu Tài chính Việt - Platinum Seller · Báo cáo tín dụng doanh nghiệp & SME"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="seller-meta-desc">
                Meta description (155 ký tự)
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="seller-meta-desc"
                  rows={3}
                  className="rounded-md"
                  defaultValue="Nhà cung cấp dữ liệu tài chính hàng đầu VN. 18 sản phẩm Gold Certified. KYC, credit scoring, thị trường chứng khoán, SME analytics."
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="seller-meta-keywords">
                Keywords (phân cách bằng dấu phẩy)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="seller-meta-keywords"
                  className="h-11 rounded-md"
                  defaultValue="báo cáo tín dụng, credit report, SME analytics, chứng khoán, fintech, KYC data"
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Cover image (banner storefront)</FieldLabel>
              <FieldContent>
                <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background">
                  <Upload className="size-7 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Khuyến nghị 1920×480px · JPG/PNG
                  </p>
                </div>
              </FieldContent>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}

function MembersPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm">Thành viên (6/15)</CardTitle>
              <CardDescription className="text-xs">
                Gói Platinum cho phép tối đa 15 thành viên với 7 roles
              </CardDescription>
            </div>
            <Button className="h-8 rounded-lg px-3 text-xs">
              <Plus data-icon="inline-start" />
              Mời thành viên
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>THÀNH VIÊN</TableHead>
                <TableHead>VAI TRÒ</TableHead>
                <TableHead>HOẠT ĐỘNG</TableHead>
                <TableHead>TRẠNG THÁI</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberRows.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleBadgeTone(member.roleTone)}>
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.activity}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusBadgeTone(member.statusTone)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2 text-muted-foreground">
                      <Pencil className="size-3.5" />
                      <Trash2 className="size-3.5 text-rose-400" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">7 vai trò Seller</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {sellerRoles.map((role) => (
              <div
                key={role.name}
                className="rounded-lg border border-border/70 p-3"
              >
                <Badge className={roleBadgeTone(role.tone)}>{role.name}</Badge>
                <p className="mt-2 text-xs text-muted-foreground">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            <CreditCard data-icon="inline-start" />
            Tài khoản rút tiền
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg border border-border/70 p-3">
            <div>
              <p className="text-xl font-semibold">Vietcombank ••3847</p>
              <p className="text-sm text-muted-foreground">
                CTCP Dữ liệu Tài chính Việt
              </p>
            </div>
            <Badge className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
              Mặc định
            </Badge>
          </div>
          <Button variant="outline" className="h-9 w-fit rounded-lg text-sm">
            <Plus data-icon="inline-start" />
            Thêm tài khoản
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            Chính sách rút tiền tự động
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <label className="flex items-center justify-between text-sm font-medium">
            Bật rút tiền tự động
            <input
              type="checkbox"
              defaultChecked
              className="size-5 accent-blue-600"
            />
          </label>
          <div className="grid gap-3 lg:grid-cols-2">
            <Field>
              <FieldLabel>Lịch rút</FieldLabel>
              <FieldContent>
                <Select defaultValue="t2-t5">
                  <SelectTrigger className="h-10 rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="t2-t5">Thứ 2 & Thứ 5</SelectItem>
                      <SelectItem value="daily">Mỗi ngày</SelectItem>
                      <SelectItem value="weekly">Mỗi tuần</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Ngưỡng tối thiểu</FieldLabel>
              <FieldContent>
                <Input
                  className="h-10 rounded-md"
                  defaultValue="10.000.000 VNĐ"
                />
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            Thuế & Hóa đơn
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            Mã số thuế: <span className="font-semibold">0316789012</span>
          </p>
          <p>
            Phương pháp kê khai: <span className="font-semibold">Khấu trừ</span>
          </p>
          <p>
            Kỳ khai thuế: <span className="font-semibold">Hàng quý</span>
          </p>
          <p>
            Email nhận hóa đơn:{" "}
            <span className="font-semibold">billing@dltc.vn</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurityPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            <Shield data-icon="inline-start" />
            Xác thực 2 yếu tố
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {twoFactorMethods.map((method) => (
            <div
              key={method.label}
              className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                {method.label.includes("TOTP") ? (
                  <Smartphone className="size-4 text-muted-foreground" />
                ) : method.label.includes("SMS") ? (
                  <Mail className="size-4 text-muted-foreground" />
                ) : method.label.includes("Hardware") ? (
                  <KeyRound className="size-4 text-muted-foreground" />
                ) : (
                  <Shield className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">{method.label}</span>
                {method.badge ? (
                  <Badge className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                    {method.badge}
                  </Badge>
                ) : null}
              </div>
              {method.enabled ? (
                <Badge className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                  Đã bật
                </Badge>
              ) : (
                <Button
                  variant="outline"
                  className="h-7 rounded-lg px-3 text-xs"
                >
                  Kích hoạt
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            Phiên đang hoạt động (4)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {activeSessions.map((session) => (
            <div
              key={session.name}
              className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium">{session.name}</p>
                <p className="text-xs text-muted-foreground">{session.ip}</p>
              </div>
              {session.current ? (
                <Badge className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                  Hiện tại
                </Badge>
              ) : (
                <Button
                  variant="ghost"
                  className="h-7 px-0 text-xs text-rose-500"
                >
                  Đăng xuất
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            IP Whitelist cho Data API
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {apiWhitelists.map((ip) => (
            <div
              key={ip}
              className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
            >
              <span className="text-sm">{ip}</span>
              <Trash2 className="size-3.5 text-rose-400" />
            </div>
          ))}
          <Button
            variant="outline"
            className="h-8 w-fit rounded-lg px-3 text-xs"
          >
            <Plus data-icon="inline-start" />
            Thêm IP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationPanel() {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold">
          <Bell data-icon="inline-start" />
          Tùy chỉnh thông báo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SỰ KIỆN</TableHead>
              <TableHead className="w-24">EMAIL</TableHead>
              <TableHead className="w-24">PUSH</TableHead>
              <TableHead className="w-24">SLACK</TableHead>
              <TableHead className="w-40">TẦN SUẤT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationRows.map((event) => (
              <TableRow key={event}>
                <TableCell className="font-medium">{event}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 accent-blue-600"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 accent-blue-600"
                  />
                </TableCell>
                <TableCell>
                  <input type="checkbox" className="size-4 accent-blue-600" />
                </TableCell>
                <TableCell>
                  <Select defaultValue="realtime">
                    <SelectTrigger className="h-8 w-[92px] rounded-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="realtime">Realtime</SelectItem>
                        <SelectItem value="daily">Hằng ngày</SelectItem>
                        <SelectItem value="weekly">Hằng tuần</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function DisplayPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            <Palette data-icon="inline-start" />
            Giao diện
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 lg:grid-cols-3">
            <ThemeOption icon={Sun} label="Light" active />
            <ThemeOption icon={Moon} label="Dark" />
            <ThemeOption icon={Monitor} label="Theo hệ thống" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            <Globe data-icon="inline-start" />
            Ngôn ngữ & Khu vực
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 lg:grid-cols-2">
            <Field>
              <FieldLabel>Ngôn ngữ</FieldLabel>
              <FieldContent>
                <Select defaultValue="vi">
                  <SelectTrigger className="h-10 rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="vi">vn Tiếng Việt</SelectItem>
                      <SelectItem value="en">en English</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Timezone</FieldLabel>
              <FieldContent>
                <Select defaultValue="vn-time">
                  <SelectTrigger className="h-10 rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="vn-time">
                        (UTC+7) Hà Nội/TP.HCM
                      </SelectItem>
                      <SelectItem value="sg-time">(UTC+8) Singapore</SelectItem>
                      <SelectItem value="jp-time">(UTC+9) Tokyo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ThemeOption({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Sun;
  label: string;
  active?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border p-6 ${
        active ? "bg-muted" : "bg-background"
      }`}
    >
      <Icon className="size-8 text-primary" />
      <span className="text-xl font-semibold">{label}</span>
      <input
        type="radio"
        name="theme"
        defaultChecked={active}
        className="size-4 accent-blue-600"
      />
    </label>
  );
}

function roleBadgeTone(tone: "amber" | "blue" | "slate") {
  if (tone === "amber") {
    return "rounded-full bg-amber-100 px-2 py-0.5 text-amber-700";
  }

  if (tone === "blue") {
    return "rounded-full bg-blue-100 px-2 py-0.5 text-blue-700";
  }

  return "rounded-full bg-slate-100 px-2 py-0.5 text-slate-700";
}

function statusBadgeTone(tone: "emerald" | "amber") {
  if (tone === "emerald") {
    return "rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700";
  }

  return "rounded-full bg-amber-100 px-2 py-0.5 text-amber-700";
}
