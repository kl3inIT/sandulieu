import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Database,
  Edit,
  Eye,
  FlaskConical,
  Gavel,
  GitBranch,
  Info,
  Lock,
  MoreVertical,
  Network,
  Package,
  Percent,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  XCircle,
  Zap,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";
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
import {
  HeaderButton,
  HeaderLinkButton,
  SellerKpiCard,
  SellerPageHeader,
  StatusPill,
} from "@/features/seller/shared";

import {
  activeSandboxes,
  auctions,
  baseProducts,
  bundles,
  createSteps,
  products,
  sandboxTools,
  vouchers,
} from "@/features/seller/data/products.data";
import {
  anomalies,
  licenses,
  policyAudit,
  qualityProducts,
  reviewItems,
  upstreamSources,
} from "@/features/seller/data/quality.data";

// ─── Helper ───────────────────────────────────────────────────────────────────

function FField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

export function SellerProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Sản phẩm của tôi"
        description="Quản lý 18 sản phẩm dữ liệu đang chào bán trên Sàn Dữ liệu Quốc gia"
        actions={
          <HeaderLinkButton href="/seller/create" variant="default">
            Đăng sản phẩm mới
          </HeaderLinkButton>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Đang bán"
          value="14"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Chờ kiểm duyệt"
          value="3"
          tone="amber"
          icon={Clock}
        />
        <SellerKpiCard label="Bản nháp" value="1" tone="blue" icon={Edit} />
        <SellerKpiCard label="Đã ngừng" value="2" tone="rose" icon={XCircle} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 rounded-xl pl-9 text-sm"
            placeholder="Tìm theo tên sản phẩm, mã sản phẩm..."
          />
        </div>
        <Select defaultValue="all-cat">
          <SelectTrigger className="h-9 w-44 rounded-xl bg-card px-3 text-sm">
            <SelectValue placeholder="Tất cả danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-cat">Tất cả danh mục</SelectItem>
              <SelectItem value="finance">Tài chính</SelectItem>
              <SelectItem value="macro">Vĩ mô</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select defaultValue="all-status">
          <SelectTrigger className="h-9 w-44 rounded-xl bg-card px-3 text-sm">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-status">Tất cả trạng thái</SelectItem>
              <SelectItem value="selling">Đang bán</SelectItem>
              <SelectItem value="pending">Chờ kiểm duyệt</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="stopped">Đã ngừng</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-xl gap-1.5 text-sm"
        >
          Lọc nâng cao
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <Card key={p.id} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Package className="size-4" />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">
                      {p.id}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[11px] px-1.5 py-0"
                    >
                      {p.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[11px] px-1.5 py-0"
                    >
                      {p.type}
                    </Badge>
                    <span>
                      <StatusPill tone={p.tone}>{p.status}</StatusPill>
                    </span>
                  </div>
                </div>
                <button className="shrink-0 text-muted-foreground hover:text-foreground">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <CardTitle className="mt-2 text-sm leading-snug">
                {p.name}
              </CardTitle>
              <CardDescription className="text-xs">{p.desc}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span>
                  Giá: <strong className="text-foreground">{p.price}</strong>
                </span>
                <span>
                  Tải xuống:{" "}
                  <strong className="text-foreground">{p.downloads}</strong>
                </span>
                <span>
                  Đánh giá:{" "}
                  <strong className="text-foreground">{p.rating} ★</strong>
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 flex-1 rounded-xl text-xs gap-1"
                >
                  <Eye className="size-3" /> Xem
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 flex-1 rounded-xl text-xs gap-1"
                >
                  <Edit className="size-3" /> Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SellerCreatePage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Đăng sản phẩm dữ liệu mới"
        description="Quy trình 5 bước theo chuẩn DCAT-VN · Sau khi hoàn tất sẽ gửi tới Hội đồng thẩm định (3-5 ngày)"
      />

      {/* Stepper */}
      <div className="flex items-center gap-0 overflow-x-auto">
        {createSteps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${s.n === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${s.n === 1 ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {s.n}
              </span>
              {s.label}
            </div>
            {i < createSteps.length - 1 && (
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main form */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* AI tip */}
          <div className="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50 p-3 dark:border-violet-900 dark:bg-violet-950/30">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-violet-600" />
            <p className="text-xs text-violet-700 dark:text-violet-400">
              <strong>DCAT-VN:</strong> Mô tả sản phẩm tốt hơn giúp tăng khả
              năng tìm thấy 40%. Điền đầy đủ metadata để tự động điền vào
              catalog quốc gia và tăng điểm trust với người mua.
            </p>
          </div>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Bước 1: Thông tin cơ bản
              </CardTitle>
              <CardDescription className="text-xs">
                Tiêu đề, danh mục & mô tả — áp dụng cho tất cả phiên bản
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FField label="Mã sản phẩm (auto-generated)">
                <div className="flex h-9 items-center rounded-xl border bg-muted/50 px-3 text-sm text-muted-foreground">
                  SP-TC-&#x2026;
                </div>
              </FField>
              <FField label="Tên sản phẩm *">
                <Input
                  className="h-9 rounded-xl"
                  defaultValue="Báo cáo tín dụng SME theo ngành Q1/2026"
                />
              </FField>
              <FField label="Tên tiếng Anh (cho danh mục quốc tế)">
                <Input
                  className="h-9 rounded-xl"
                  defaultValue="SME Credit Report by Industry Q1/2026"
                />
              </FField>
              <div className="grid grid-cols-2 gap-3">
                <FField label="Lĩnh vực chính *">
                  <Select defaultValue="finance">
                    <SelectTrigger className="h-9 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="finance">
                          Tài chính - Ngân hàng
                        </SelectItem>
                        <SelectItem value="macro">Vĩ mô</SelectItem>
                        <SelectItem value="health">Y tế</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FField>
                <FField label="Danh mục con">
                  <Select defaultValue="sme">
                    <SelectTrigger className="h-9 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="sme">Dữ liệu SME</SelectItem>
                        <SelectItem value="credit">Tín dụng</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FField>
              </div>
              <FField label="Mô tả ngắn (hiển thị trên trang care catalog) *">
                <textarea
                  className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="Phân tích tín dụng cho hơn 286.000 doanh nghiệp SME theo từng ngành. Phân loại AAA đến CCC theo chuẩn 21 ngành kinh tế."
                />
              </FField>
              <FField label="Mô tả chi tiết (markdown) *">
                <textarea
                  className="min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={
                    "## Dữ liệu bao gồm\n- Chỉ số tín dụng cho trên 286.000 doanh nghiệp SME có từ hiệu quả hoạt động\n- Nợ dưới vốn (AAA → CCC theo chuẩn 21 ngành kinh tế)\n- Lịch sử thanh toán 36 tháng\n  - Tỷ lệ nợ xấu theo từng phân ngành"
                  }
                />
              </FField>
              <FField label="Tags & từ khóa">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Báo cáo tín dụng",
                    "SME Analytics",
                    "Credit Scoring",
                    "Ngân hàng",
                  ].map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="cursor-pointer text-xs"
                    >
                      {t} ×
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 rounded-lg px-2 text-xs"
                  >
                    + Thêm tag
                  </Button>
                </div>
              </FField>
              <FField label="Ảnh đại diện sản phẩm">
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/70 bg-muted/30 py-8">
                  <Upload className="size-6 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG – tối đa 2MB. Tỷ lệ 16:9
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-lg text-xs"
                  >
                    Chọn ảnh
                  </Button>
                </div>
              </FField>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="outline" className="h-9 rounded-xl text-sm">
              ← Bước trước
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="h-9 rounded-xl text-sm">
                Lưu bản nháp
              </Button>
              <Button className="h-9 rounded-xl text-sm gap-1">
                Tiếp theo: Schema & Dữ liệu <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Tiến trình</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Hoàn thành</span>
                <span className="font-medium text-primary">Đặt lịch</span>
              </div>
              <Progress value={35} className="h-2 rounded-full" />
              {[
                "Thông tin cơ bản",
                "Schema & Dữ liệu",
                "Cam kết chất lượng",
                "Định giá",
                "Xuất bản",
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-xs">
                  <div
                    className={`size-4 rounded-full flex items-center justify-center ${i === 0 ? "bg-primary text-primary-foreground" : "border-2 border-border"}`}
                  >
                    {i === 0 && <CheckCircle2 className="size-3" />}
                  </div>
                  <span
                    className={
                      i === 0
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {item}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Checklist DCAT-VN</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {[
                { text: "Tên & mô tả đầy đủ", done: true },
                { text: "Lĩnh vực & thể loại", done: true },
                { text: "Sample Schema", done: false },
                { text: "License & điều khoản", done: false },
                { text: "Giá tham khảo", done: false },
                { text: "Sample data file", done: false },
                { text: "Kiểm tra chất lượng", done: false },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2 text-xs">
                  <div
                    className={`size-4 rounded flex items-center justify-center shrink-0 ${c.done ? "bg-emerald-500 text-white" : "border border-border bg-muted"}`}
                  >
                    {c.done && <CheckCircle2 className="size-3" />}
                  </div>
                  <span
                    className={
                      c.done ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {c.text}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-700 dark:text-blue-400">
                Mẹo
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-blue-700 dark:text-blue-400 flex flex-col gap-1.5">
              <p>• Tên rõ ràng, cụ thể tăng tỷ lệ chuyển đổi lên 40%</p>
              <p>• Tóm tắt API lên Catalog tăng CTR lên 60%</p>
              <p>• Thêm thẻ tag theo SFA tăng tỷ lệ click 3x</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function SellerPricingPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Quản lý giá & Khuyến mãi"
        description="Cấu hình giá sản phẩm, gói kết hợp và giảm giá"
        actions={
          <HeaderButton variant="default">+ Tạo chương trình mới</HeaderButton>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Sản phẩm đang bán"
          value="18"
          tone="blue"
          icon={Package}
        />
        <SellerKpiCard
          label="Gói kết hợp"
          value="3"
          tone="emerald"
          icon={Zap}
        />
        <SellerKpiCard
          label="Mã khuyến mãi active"
          value="2"
          tone="amber"
          icon={Percent}
        />
        <SellerKpiCard
          label="Doanh thu Q1"
          value="840.000.000 đ"
          tone="violet"
          icon={TrendingUp}
        />
      </div>

      {/* Base price table */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
          <div>
            <CardTitle className="text-sm">Giá cơ bản sản phẩm</CardTitle>
            <CardDescription className="text-xs">
              Thiết lập giá cơ sở — Bộ sản phẩm có thể đặt giá thoả thuận riêng
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-xl text-xs"
          >
            Cập nhật hàng loạt
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Giá base</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead className="text-right">Số đơn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {baseProducts.map((p) => (
                <TableRow key={p.name}>
                  <TableCell>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.desc}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{p.price}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {p.unit}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {p.orders} gói
                  </TableCell>
                  <TableCell>
                    <span>
                      <StatusPill tone="emerald">{p.status}</StatusPill>
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="size-7">
                      <Edit className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bundles */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Gói kết hợp</h2>
            <p className="text-xs text-muted-foreground">
              Đóng gói nhiều sản phẩm để bán với giá ưu đãi
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-xl text-xs gap-1"
          >
            <Plus className="size-3.5" /> Tạo gói kết hợp
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {bundles.map((b) => (
            <Card
              key={b.name}
              className="rounded-2xl border-border/70 shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {b.discount}
                  </Badge>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
                <CardTitle className="text-sm mt-2">{b.name}</CardTitle>
                <CardDescription className="text-xs">
                  {b.items} sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-lg font-bold text-primary mb-1">
                  {b.price}
                </div>
                <div className="text-xs text-muted-foreground">
                  Đã bán: {b.sales} lần
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 flex-1 rounded-xl text-xs"
                  >
                    <Eye className="size-3 mr-1" />
                    Xem
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 flex-1 rounded-xl text-xs"
                  >
                    <Edit className="size-3 mr-1" />
                    Sửa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vouchers */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
          <div>
            <CardTitle className="text-sm">Mã khuyến mãi & Voucher</CardTitle>
            <CardDescription className="text-xs">
              Tạo mã giảm giá cho các campaigns marketing
            </CardDescription>
          </div>
          <Button size="sm" className="h-8 rounded-xl text-xs gap-1">
            <Plus className="size-3.5" /> Tạo mã mới
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-0">
          {vouchers.map((v) => (
            <div
              key={v.code}
              className="flex items-start justify-between gap-3 rounded-xl border border-border/70 p-3"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold">{v.code}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {v.type}
                  </Badge>
                  <span>
                    <StatusPill
                      tone={v.status === "Đang hoạt động" ? "emerald" : "blue"}
                    >
                      {v.status}
                    </StatusPill>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
                <p className="text-xs text-muted-foreground">
                  Đã dùng: {v.used} · Hết hạn: {v.exp}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" className="size-7">
                  <Edit className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-rose-500"
                >
                  <XCircle className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerDataQualityPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Data Quality Framework Dashboard"
        description="Tự động đo chất lượng dữ liệu theo 6 tiêu chí · Fit detection · Schema validation · Anomaly alerts"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-xl text-xs gap-1"
            >
              <RefreshCw className="size-3.5" /> Quét lại ngay
            </Button>
            <Button size="sm" className="h-9 rounded-xl text-xs">
              Cấu hình quality rules
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Quality Score trung bình"
          value="92,5/100"
          tone="emerald"
          icon={ShieldCheck}
          delta="+1.2%"
        />
        <SellerKpiCard
          label="Sản phẩm đạt Grade"
          value="3/4"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Anomalies cần xử lý"
          value="4"
          tone="amber"
          icon={AlertCircle}
        />
        <SellerKpiCard label="Rủi phát hiện" value="0" tone="blue" icon={Zap} />
      </div>

      {/* Score chart */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quality Score theo sản phẩm</CardTitle>
          <CardDescription className="text-xs">
            Quét tự động mỗi 6 giờ · Kết quả gần nhất
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {qualityProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <div className="w-48 shrink-0 truncate text-xs text-muted-foreground">
                {p.name}
              </div>
              <Progress value={p.score} className="h-2 flex-1 rounded-full" />
              <span className="w-8 shrink-0 text-right text-xs font-medium">
                {p.score}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Product detail cards */}
      <div className="flex flex-col gap-3">
        {qualityProducts.map((p) => (
          <Card key={p.id} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {p.id}
                      </span>
                      <span>
                        <StatusPill tone={p.tone}>{p.status}</StatusPill>
                      </span>
                      {p.dims.find((d) => d.v < 90) && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 border-amber-400 text-amber-600"
                        >
                          1 anomalies
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium">{p.name}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-xl text-xs"
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-xl text-xs"
                  >
                    Quét lại
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-4 gap-3">
                {p.dims.map((d) => (
                  <div key={d.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {d.label}
                      </span>
                      <span className="text-xs font-medium">{d.v}</span>
                    </div>
                    <Progress
                      value={d.v}
                      className={`h-1.5 rounded-full ${d.v >= 95 ? "[&>div]:bg-emerald-500" : d.v >= 88 ? "[&>div]:bg-amber-500" : "[&>div]:bg-rose-500"}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Anomalies */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-500" /> Anomalies cần xử
            lý
          </CardTitle>
          <CardDescription className="text-xs">
            Phát hiện tự động từ pipeline giám sát
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-0">
          {anomalies.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl p-3 ${a.severity === "rose" ? "bg-rose-50 dark:bg-rose-950/30" : a.severity === "amber" ? "bg-amber-50 dark:bg-amber-950/30" : "bg-blue-50 dark:bg-blue-950/30"}`}
            >
              <AlertCircle
                className={`mt-0.5 size-4 shrink-0 ${a.severity === "rose" ? "text-rose-500" : a.severity === "amber" ? "text-amber-500" : "text-blue-500"}`}
              />
              <div className="flex-1">
                <p className="text-xs font-medium">
                  [{a.product}] {a.msg}
                </p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-6 shrink-0 rounded-lg text-xs"
              >
                Xử lý
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerPoliciesPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Usage Control Policies (IDSA ODRL)"
        description="Bảo vệ tài sản dữ liệu khi bán dụng dịch vụ SDL với sức mạnh của quy chuẩn quốc tế"
        actions={
          <Button size="sm" className="h-9 rounded-xl text-xs gap-1">
            <Plus className="size-3.5" /> Tạo policy mới
          </Button>
        }
      />

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <Info className="mt-0.5 size-4 shrink-0 text-blue-600" />
        <div className="text-xs text-blue-700 dark:text-blue-400">
          <strong>Usage Control thay thế Access Control:</strong> Chính sách cho
          phép định nghĩa ĐIỀU KIỆN SỬ DỤNG sau khi dữ liệu đã được bàn giao.
          Usage Control định lý từng dụng (DUNG KHO THỂ) — Bao gồm: giới hạn
          thời gian, giới hạn lần phân phối, tự động xóa dữ liệu sau hạn hợp
          đồng, và điều kiện yêu cầu kiểm toán.
          <br />
          Mọi policy đều tuân thủ chuẩn ODRL của International Data Spaces
          Association.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Policies đang áp dụng"
          value="4"
          tone="blue"
          icon={Lock}
        />
        <SellerKpiCard
          label="Sản phẩm có policy"
          value="18/18"
          tone="emerald"
          icon={ShieldCheck}
        />
        <SellerKpiCard
          label="Vi phạm phát hiện"
          value="0"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Auto-delete đã chạy"
          value="42"
          tone="rose"
          icon={Zap}
        />
      </div>

      {/* License cards */}
      <div>
        <h2 className="mb-3 text-sm font-semibold">4 mẫu Policy của bạn</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {licenses.map((l) => (
            <Card
              key={l.name}
              className="rounded-2xl border-border/70 shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{l.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {l.subscribers} sản phẩm
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {l.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="flex flex-col gap-1 mb-3">
                  {l.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-full rounded-xl text-xs"
                >
                  Chỉnh sửa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Policy Builder */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-sm">
              Policy Builder (ODRL, DSL)
            </CardTitle>
            <CardDescription className="text-xs">
              Tự soạn policy theo chuẩn ODRL cho từng sản phẩm
            </CardDescription>
          </div>
          <Button size="sm" className="h-7 rounded-xl text-xs">
            Lưu policy
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-gray-950 p-4 font-mono text-xs text-green-400 overflow-x-auto">
            <pre>{`{
  "@context": "http://www.w3.org/ns/odrl.jsonld",
  "@type": "Policy",
  "@id": "https://sdl.gov.vn/policies/SP-001-enterprise",
  "permission": [{
    "target": "https://sdl.gov.vn/datasets/SP-TC-001",
    "action": "use",
    "constraint": [{
      "leftOperand": "dateTime", "operator": "lt",
      "rightOperand": { "@value": "2027-01-01" }
    }, {
      "leftOperand": "count", "operator": "lteq",
      "rightOperand": { "@value": 25 }
    }],
    "duty": [{
      "action": "report",
      "target": "https://sdl.gov.vn/audit/SP-TC-001"
    }]
  }]
}`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Audit trail */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-500" /> Audit thứ Policy
          </CardTitle>
          <CardDescription className="text-xs">
            Mọi vi phạm hoặc thực thi policy đều được ghi nhận tự động
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-0">
          {policyAudit.map((a, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <span className="shrink-0 text-muted-foreground w-32">
                {a.time}
              </span>
              <Badge variant="outline" className="shrink-0 text-[10px] px-1.5">
                {a.type}
              </Badge>
              <span className="text-muted-foreground">{a.msg}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerLineagePage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Data Lineage & Provenance"
        description="Minh bạch nguồn gốc dữ liệu · Tự upstream sources đến sản phẩm cuối cùng · Transparent cho buyers"
        actions={
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-xl text-xs"
          >
            Xuất báo cáo Lineage
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Sản phẩm có lineage"
          value="18/18"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Upstream sources"
          value="42"
          tone="blue"
          icon={Database}
        />
        <SellerKpiCard
          label="Transformations"
          value="128"
          tone="amber"
          icon={GitBranch}
        />
        <SellerKpiCard
          label="Lineage verified"
          value="100%"
          tone="emerald"
          icon={ShieldCheck}
        />
      </div>

      {/* DAG Visualization */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            Lineage cho SP-TC-001 (Báo cáo tín dụng DN)
          </CardTitle>
          <CardDescription className="text-xs">
            Visual DAG từ tất cả upstream → transformations → final product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4 overflow-x-auto">
            <div className="flex items-start gap-6 min-w-[600px]">
              {/* Sources column */}
              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "CRD_DL Doanh nghiệp",
                    sub: "Cục đăng ký KD",
                    tag: "API",
                  },
                  {
                    label: "Bộ Tài chính & Thuế",
                    sub: "Tổng cục thuế",
                    tag: "API",
                  },
                  { label: "BH Xã hội Việt Nam", sub: "BHXH", tag: "CSV" },
                  {
                    label: "Credit Bureau CIC",
                    sub: "NHNN partner",
                    tag: "API",
                  },
                  {
                    label: "Banking Signals",
                    sub: "14 ngân hàng ĐT",
                    tag: "Fed",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3 py-2"
                  >
                    <Database className="size-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {s.sub}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] px-1">
                      {s.tag}
                    </Badge>
                  </div>
                ))}
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center justify-center pt-16">
                <div className="text-muted-foreground">→</div>
              </div>
              {/* Transformations */}
              <div className="flex flex-col gap-2">
                {[
                  { label: "ETL Pipeline", sub: "Airflow 3 · hằng ngày" },
                  {
                    label: "Data Cleansing",
                    sub: "1 mutation · 2 validations",
                  },
                  { label: "Chỉ số tín dụng", sub: "Credit Scoring Model" },
                  { label: "Aggregation", sub: "By industry, region" },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-2"
                  >
                    <Network className="size-3.5 text-amber-600" />
                    <div>
                      <p className="text-xs font-medium">{t.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {t.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Arrow */}
              <div className="flex flex-col items-center justify-center pt-10">
                <div className="text-muted-foreground">→</div>
              </div>
              {/* Final product */}
              <div className="flex flex-col gap-2">
                <div className="rounded-lg border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Badge className="bg-emerald-600 text-[10px] px-1.5">
                      Final Product
                    </Badge>
                  </div>
                  <p className="text-xs font-bold">SP-TC-001</p>
                  <p className="text-[10px] text-muted-foreground">
                    Báo cáo tín dụng DN toàn diện
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    400k doanh nghiệp · Cập nhật T+1
                  </p>
                  <p className="text-[10px] text-emerald-600 font-medium">
                    Quality Score: 94/100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upstream Sources */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Upstream Sources - Chi tiết</CardTitle>
          <CardDescription className="text-xs">
            42 nguồn dữ liệu đang sử dụng trong 18 sản phẩm
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-0">
          {upstreamSources.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/70 p-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <Database className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {s.products} sản phẩm
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Downstream Impact */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Downstream Impact</CardTitle>
          <CardDescription className="text-xs">
            Các sản phẩm và khách hàng phụ thuộc theo lineage này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">
                Sản phẩm phụ thuộc
              </span>
              <span className="text-2xl font-bold text-primary">18</span>
              <span className="text-xs text-muted-foreground">sản phẩm</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">
                Khách hàng bị ảnh hưởng
              </span>
              <span className="text-2xl font-bold text-primary">142</span>
              <span className="text-xs text-muted-foreground">khách hàng</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">
                Mức độ ảnh hưởng
              </span>
              <span className="text-2xl font-bold text-rose-600">High</span>
              <span className="text-xs text-muted-foreground">
                nếu nguồn thay đổi
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerQualityPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Thẩm định chất lượng & giá"
        description="Theo dõi tiến trình thẩm định của Hội đồng chất lượng độc lập"
        actions={
          <Button size="sm" className="h-9 rounded-xl text-xs gap-1">
            <Plus className="size-3.5" /> Gửi đề tài mới
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Đang thẩm định"
          value="2"
          tone="amber"
          icon={Clock}
        />
        <SellerKpiCard
          label="Đã phê duyệt"
          value="14"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Điểm Q trung bình"
          value="92,8/100"
          tone="emerald"
          icon={ShieldCheck}
        />
        <SellerKpiCard
          label="Tỷ lệ duyệt 2026"
          value="92,4%"
          tone="blue"
          icon={TrendingUp}
        />
      </div>

      <div className="flex flex-col gap-4">
        {reviewItems.map((r) => (
          <Card key={r.id} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{r.id}</span>
                  <span>
                    <StatusPill tone={r.tone}>{r.status}</StatusPill>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Nộp: {r.submitted} · {r.reviewers} thẩm định viên · Ngày{" "}
                    {r.submitted}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 shrink-0 rounded-xl text-xs"
                >
                  Xem chi tiết
                </Button>
              </div>
              <CardTitle className="text-sm">{r.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="mb-2 flex items-center gap-2">
                <Progress
                  value={r.progress}
                  className="h-2 flex-1 rounded-full"
                />
                <span className="text-xs text-muted-foreground">
                  {r.progress}%
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {r.scoreDims.map((d) => (
                  <div
                    key={d.label}
                    className={`flex items-center gap-1 text-xs ${d.done ? "text-emerald-600" : "text-muted-foreground"}`}
                  >
                    <CheckCircle2
                      className={`size-3.5 ${d.done ? "text-emerald-500" : "text-muted-foreground/30"}`}
                    />
                    {d.label}
                  </div>
                ))}
              </div>
              {r.status === "Đang thẩm định" && (
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-xl text-xs flex-1"
                  >
                    Xem xét hồ sơ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-xl text-xs flex-1"
                  >
                    Thẩm định Q
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-xl text-xs flex-1"
                  >
                    Thẩm tra giá
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-xl text-xs flex-1"
                  >
                    Kết quả cuối
                  </Button>
                </div>
              )}
              {r.status === "Đã phê duyệt" && (
                <Button size="sm" className="mt-3 h-7 rounded-xl text-xs">
                  Chứng nhận
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scorecard */}
      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Star className="size-4 text-amber-500" /> Scorecard chất lượng —
            Hội đồng thẩm giá
          </CardTitle>
          <CardDescription className="text-xs">
            Sản phẩm &ldquo;Dự báo kinh tế vĩ mô 2026-2027&rdquo; — Điểm tổng
            hợp 82.9/100
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-0">
          {[
            {
              label: "Tính chính xác (Accuracy)",
              score: 92,
              right: "Độ đầy đủ (Completeness)",
              rscore: 88,
            },
            {
              label: "Tính nhất quán (Consistency)",
              score: 87,
              right: "Tính kịp thời (Timeliness)",
              rscore: 85,
            },
            {
              label: "Hợp lệ (Validity)",
              score: 90,
              right: "Tính duy nhất (Uniqueness)",
              rscore: 94,
            },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.score}/100</span>
                </div>
                <Progress value={row.score} className="h-2 rounded-full" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{row.right}</span>
                  <span className="font-medium">{row.rscore}/100</span>
                </div>
                <Progress value={row.rscore} className="h-2 rounded-full" />
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
            <p className="text-xs text-amber-700 dark:text-amber-400">
              <strong>Nhận xét từ Hội đồng:</strong> Dữ liệu có chất lượng ổn.
              Các điểm cần cải thiện: tăng lên thu (90/100) — giảm độ trễ cập
              nhật lên xuống dưới 080/100 — đặt và chứng đề trình Gold
              Certification.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerSandboxPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Sandbox kiểm thử sản phẩm"
        description="Môi trường isolated để test API, schema, rate-limit trước khi publish sản phẩm tới production"
        actions={
          <Button size="sm" className="h-9 rounded-xl text-xs gap-1">
            <Plus className="size-3.5" /> Tạo phiên sandbox
          </Button>
        }
      />

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Tại sao dùng Sandbox:</strong> Mọi API endpoint của sản phẩm
          đều có thể test miễn phí — Load test tới 500 SLA đảm bảo không bị
          chặn. Validate schema đã không gây ra breaking change cho khách hàng
          hiện tại. Dùng miễn phí, không tính vào quota.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Phiên đang hoạt động"
          value="2"
          tone="emerald"
          icon={FlaskConical}
        />
        <SellerKpiCard
          label="Queries hôm nay"
          value="2.656"
          tone="blue"
          icon={Zap}
        />
        <SellerKpiCard
          label="Schema validations pass"
          value="142/148"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Breaking changes phát hiện"
          value="3"
          tone="rose"
          icon={AlertCircle}
        />
      </div>

      {/* Active sandboxes */}
      <div className="flex flex-col gap-3">
        {activeSandboxes.map((s) => (
          <Card key={s.id} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                    <FlaskConical className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {s.id}
                      </span>
                      <span>
                        <StatusPill tone={s.tone}>{s.status}</StatusPill>
                      </span>
                    </div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.product} · {s.requests} · Bắt đầu: {s.started}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 shrink-0 rounded-xl text-xs"
                >
                  Mở
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Tools */}
      <div>
        <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
          <Code2 className="size-4" /> Test tools sẵn có
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sandboxTools.map((t) => (
            <Card
              key={t.name}
              className="rounded-2xl border-border/70 shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                  <t.icon className="size-4 text-muted-foreground" />
                </div>
                <CardTitle className="mt-2 text-sm">{t.name}</CardTitle>
                <CardDescription className="text-xs">{t.desc}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-full rounded-xl text-xs"
                >
                  Chạy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SellerAuctionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Đấu giá dữ liệu"
        description="Tổ chức phiên đấu giá minh bạch với nhiều vòng và cấu hình giá"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-xl text-xs"
            >
              Lịch sử đấu giá
            </Button>
            <Button size="sm" className="h-9 rounded-xl text-xs gap-1">
              <Plus className="size-3.5" /> Tạo phiên đấu giá
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Đang đấu giá"
          value="2"
          tone="blue"
          icon={Gavel}
        />
        <SellerKpiCard
          label="Tổng doanh thu đấu giá"
          value="8.420.000.000 đ"
          tone="emerald"
          icon={TrendingUp}
        />
        <SellerKpiCard
          label="Phiên đã hoàn thành"
          value="14"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Tỷ lệ thắng câu"
          value="92,8%"
          tone="amber"
          icon={Zap}
        />
      </div>

      <div className="flex flex-col gap-4">
        {auctions.map((a) => (
          <Card key={a.id} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs text-muted-foreground">
                      {a.id}
                    </span>
                    <span>
                      <StatusPill tone={a.tone}>{a.status}</StatusPill>
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {a.sources} người đặt giá
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {a.bids} lượt bid
                    </span>
                  </div>
                  <CardTitle className="text-sm">{a.name}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 shrink-0 rounded-xl text-xs"
                >
                  Theo dõi trực tiếp ↗
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Giá khởi điểm</p>
                  <p className="text-sm font-medium">{a.startPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Giá hiện tại (cao nhất)
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {a.currentPrice}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Người giá cao nhất
                  </p>
                  <p className="text-sm font-medium">{a.topBuyer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress
                  value={a.progress}
                  className="h-2 flex-1 rounded-full"
                />
                <span className="text-xs text-muted-foreground shrink-0">
                  Kết thúc: {a.endsIn}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
