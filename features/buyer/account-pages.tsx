import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CreditCard,
  Download,
  Eye,
  HelpCircle,
  Plus,
} from "lucide-react";

import {
  buyerBillingProfile,
  buyerCompanyProfile,
  buyerConsentMetrics,
  buyerConsentRows,
  buyerDocCategories,
  buyerQuickstartSteps,
  buyerSdkItems,
  buyerSettingsTabs,
  buyerSupportChannels,
  buyerSupportMetrics,
  buyerSupportTickets,
  buyerWalletMethods,
  buyerWalletMetrics,
  buyerWalletTransactions,
} from "@/features/buyer/data";
import {
  BillingRow,
  BuyerPageHeader,
  Field,
  GhostIconButton,
  HeaderButton,
  MetricGrid,
  SearchInput,
  StatusPill,
} from "@/features/buyer/shared";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
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

export function BuyerWalletPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Ví & Thanh toán"
        description="Quản lý số dư ví điện tử SDL, nạp rút và lịch sử giao dịch tài chính"
        actions={
          <>
            <HeaderButton variant="outline" icon={ArrowRight}>
              Rút tiền
            </HeaderButton>
            <HeaderButton icon={Plus}>Nạp tiền</HeaderButton>
          </>
        }
      />

      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary">
              <CreditCard className="size-4" />
              Số dư khả dụng — Ví SDL
            </div>
            <p className="text-3xl font-semibold tracking-tight text-primary">52.420.000 ₫</p>
            <p className="text-sm text-muted-foreground">
              Chủ ví: Công ty TNHH FinTech Việt · MST: 0108234567 · Chi phí tháng: 28.450.000 ₫
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <HeaderButton icon={Plus}>Nạp tiền</HeaderButton>
            <HeaderButton variant="outline" icon={ArrowRight}>
              Rút về NH
            </HeaderButton>
          </div>
        </CardContent>
      </Card>

      <MetricGrid metrics={buyerWalletMetrics} />

      <div className="grid gap-3 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Lịch sử giao dịch</CardTitle>
            <CardDescription>30 ngày gần nhất · Tất cả phương thức</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {buyerWalletTransactions.map((item) => (
              <div
                key={`${item.title}-${item.meta}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <CreditCard className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.meta}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${item.value.startsWith("+") ? "text-emerald-700" : "text-primary"}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {buyerWalletMethods.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-border/70 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <CreditCard className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                  {item.tag ? <StatusPill tone="blue">{item.tag}</StatusPill> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Thông tin xuất hóa đơn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <BillingRow label="Tên công ty" value={buyerBillingProfile.company} />
              <BillingRow label="Mã số thuế" value={buyerBillingProfile.taxCode} />
              <BillingRow label="Địa chỉ" value={buyerBillingProfile.address} />
              <BillingRow label="Email" value={buyerBillingProfile.email} />
              <Button variant="outline" className="mt-3 h-9 rounded-xl px-4 text-sm">
                Chỉnh sửa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function BuyerConsentPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Quản lý đồng ý & Quyền riêng tư"
        description="Theo dõi, thu hồi và xuất consent receipts theo Nghị định 13/2023 và Luật BVDLCN 2025"
        actions={
          <>
            <HeaderButton variant="outline" icon={Download}>
              Xuất Consent Log
            </HeaderButton>
            <HeaderButton icon={Plus}>Tạo đồng ý mới</HeaderButton>
          </>
        }
      />

      <MetricGrid metrics={buyerConsentMetrics} />

      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Dashboard minh bạch truy cập</CardTitle>
          <CardDescription>
            Mô hình Estonia Personal Data Usage Monitor — hiển thị đầy đủ: ai truy cập, mục đích, thời gian, dữ liệu nào, cơ sở pháp lý
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đồng ý</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Mục đích sử dụng</TableHead>
                <TableHead>Phạm vi dữ liệu</TableHead>
                <TableHead>Cấp ngày</TableHead>
                <TableHead>Hết hạn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyerConsentRows.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.purpose}</TableCell>
                  <TableCell>{item.scope}</TableCell>
                  <TableCell>{item.issuedAt}</TableCell>
                  <TableCell>{item.expiresAt}</TableCell>
                  <TableCell>
                    <StatusPill
                      tone={
                        item.status === "Hiệu lực"
                          ? "emerald"
                          : item.status === "Hết hạn"
                            ? "amber"
                            : "rose"
                      }
                    >
                      {item.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <GhostIconButton icon={Eye} label="Xem" />
                      {item.status === "Hiệu lực" ? (
                        <Button variant="ghost" className="h-8 rounded-lg px-2 text-sm text-destructive hover:text-destructive">
                          Thu hồi
                        </Button>
                      ) : (
                        <GhostIconButton icon={Download} label="Tải xuống" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function BuyerSupportPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Hỗ trợ & Khiếu nại"
        description="Tạo yêu cầu hỗ trợ kỹ thuật, khiếu nại chất lượng dữ liệu và trò chuyện trực tiếp với Cán bộ sàn"
        actions={<HeaderButton icon={Plus}>Tạo ticket mới</HeaderButton>}
      />

      <MetricGrid metrics={buyerSupportMetrics} />

      <div className="grid gap-3 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-xl">Danh sách ticket</CardTitle>
              <SearchInput placeholder="Tìm ticket…" className="h-9 min-w-56 rounded-xl" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {buyerSupportTickets.map((item) => (
              <div key={item.code} className="rounded-2xl border border-border/70 p-3">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-medium text-muted-foreground">{item.code}</span>
                  <StatusPill tone={item.priority === "Ưu tiên cao" ? "rose" : "amber"}>
                    {item.priority}
                  </StatusPill>
                  <StatusPill tone={item.status === "Đã giải quyết" ? "emerald" : "blue"}>
                    {item.status}
                  </StatusPill>
                </div>
                <p className="text-sm font-semibold text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Liên hệ nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {buyerSupportChannels.map((item) => (
                <Link
                  key={item.label}
                  href="#"
                  className="flex items-center justify-between rounded-2xl border border-border/70 p-3 text-sm hover:border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Bell className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">{item.label}</p>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Tạo ticket nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select defaultValue="placeholder">
                <SelectTrigger className="h-9 rounded-xl bg-card px-3 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="placeholder">Loại vấn đề...</SelectItem>
                    <SelectItem value="api">Lỗi kỹ thuật API</SelectItem>
                    <SelectItem value="quality">Khiếu nại chất lượng</SelectItem>
                    <SelectItem value="quota">Yêu cầu tăng hạn mức</SelectItem>
                    <SelectItem value="integration">Hỗ trợ tích hợp</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input className="h-9 rounded-xl" placeholder="Tiêu đề ticket" />
              <textarea
                className="min-h-28 w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Mô tả ngắn vấn đề..."
              />
              <Button className="h-9 w-full rounded-xl text-sm">Gửi yêu cầu</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function BuyerDocsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Tài liệu & API Documentation"
        description="Hướng dẫn tích hợp, API reference (OpenAPI 3.0), SDK và code samples đầy đủ"
        actions={
          <>
            <HeaderButton variant="outline" icon={Download}>
              Swagger UI
            </HeaderButton>
            <HeaderButton icon={ArrowRight}>Interactive API</HeaderButton>
          </>
        }
      />

      <SearchInput
        placeholder="Tìm trong 760+ trang tài liệu, endpoints, SDK…"
        className="h-11 rounded-2xl pl-12 text-[15px]"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {buyerDocCategories.map((item, index) => (
          <Card
            key={item.label}
            className={`rounded-3xl border-border/70 shadow-sm ${index === 0 ? "border-primary/20 bg-secondary/40" : ""}`}
          >
            <CardContent className="space-y-2 p-4">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                <HelpCircle className="size-5" />
              </div>
              <p className="text-base font-semibold text-primary">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Bắt đầu trong 5 phút</CardTitle>
            <CardDescription>3 bước đơn giản để gọi API đầu tiên</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyerQuickstartSteps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-border/70 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {item.step}
                  </span>
                  <p className="text-sm font-semibold text-primary">{item.title}</p>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-950/95 p-3 text-xs text-slate-100">
                  {item.snippet}
                </pre>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">SDK chính thức</CardTitle>
            <CardDescription>Được bảo trì bởi Trung tâm Dữ liệu Quốc gia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {buyerSdkItems.map((item) => (
              <div
                key={item.packageName}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-primary">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.packageName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill tone="blue">{item.version}</StatusPill>
                  <GhostIconButton icon={Download} label="Tải SDK" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function BuyerSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Cài đặt tài khoản"
        description="Quản lý thông tin tổ chức, thành viên, bảo mật và tùy chọn cá nhân"
      />

      <div className="flex flex-wrap gap-2">
        {buyerSettingsTabs.map((tab, index) => (
          <Button
            key={tab}
            variant={index === 0 ? "default" : "outline"}
            className="h-9 rounded-xl px-4 text-sm"
          >
            {tab}
          </Button>
        ))}
      </div>

      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <CardTitle className="text-xl">Thông tin doanh nghiệp</CardTitle>
              <CardDescription>
                Các thông tin này được xác thực qua DMDC và hiển thị cho sellers
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 p-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                {buyerCompanyProfile.initials}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 rounded-xl px-3 text-sm">
                  Tải logo mới
                </Button>
                <Button variant="ghost" className="h-8 rounded-xl px-2 text-sm">
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Tên tổ chức *">
              <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.name} />
            </Field>
            <Field label="Tên tiếng Anh">
              <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.englishName} />
            </Field>
            <Field label="Mã số thuế *">
              <div className="flex items-center gap-2">
                <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.taxCode} disabled />
                <StatusPill tone="emerald">DMDC ✓</StatusPill>
              </div>
            </Field>
            <Field label="Loại hình">
              <Select defaultValue="llc">
                <SelectTrigger className="h-9 rounded-xl bg-card px-3 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="llc">Công ty TNHH</SelectItem>
                    <SelectItem value="joint-stock">Công ty cổ phần</SelectItem>
                    <SelectItem value="private">Doanh nghiệp tư nhân</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Địa chỉ trụ sở *" className="md:col-span-2">
              <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.address} />
            </Field>
            <Field label="Website">
              <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.website} />
            </Field>
            <Field label="Lĩnh vực">
              <Select defaultValue="fintech">
                <SelectTrigger className="h-9 rounded-xl bg-card px-3 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fintech">Tài chính công nghệ (FinTech)</SelectItem>
                    <SelectItem value="banking">Ngân hàng</SelectItem>
                    <SelectItem value="insurance">Bảo hiểm</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Số nhân viên">
              <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.employees} />
            </Field>
            <Field label="Năm thành lập">
              <Input className="h-9 rounded-xl" defaultValue={buyerCompanyProfile.foundedYear} />
            </Field>
            <Field label="Mô tả ngắn" className="md:col-span-2">
              <textarea
                className="min-h-24 w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue={buyerCompanyProfile.description}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              Hủy
            </Button>
            <Button className="h-9 rounded-xl px-4 text-sm">Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
