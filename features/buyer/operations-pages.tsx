import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCheck,
  Clock3,
  Copy,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  TrendingUp,
} from "lucide-react";

import {
  buyerApiKeys,
  buyerAuctionFilters,
  buyerAuctionItems,
  buyerAuctionMetrics,
  buyerCartConsentChecks,
  buyerCartItems,
  buyerCartSummary,
  buyerCleanRooms,
  buyerDemandFilters,
  buyerDemandItems,
  buyerDemandMetrics,
  buyerOrderMetrics,
  buyerOrderRows,
  buyerPaymentMethods,
  buyerPrivacyNotes,
  buyerSandboxFeatures,
  buyerSandboxMetrics,
  buyerSandboxSessions,
  buyerSubscriptions,
} from "@/features/buyer/data";
import {
  BuyerPageHeader,
  GhostIconButton,
  HeaderButton,
  HeaderLinkButton,
  MetricGrid,
  SearchInput,
  StatBlock,
  StatMini,
  StatusPill,
  SummaryCard,
} from "@/features/buyer/shared";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
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
import { cn } from "@/shared/lib/utils";

export function BuyerSubscriptionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Dịch vụ đã đăng ký"
        description="Quản lý 12 dịch vụ dữ liệu đang sử dụng · Cấu hình hạn mức, gia hạn và nhật ký kiểm toán"
        actions={
          <>
            <HeaderButton variant="outline" icon={Filter}>
              Bộ lọc
            </HeaderButton>
            <HeaderButton icon={Database}>Đăng ký thêm</HeaderButton>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Đang hoạt động" value="10" icon={CheckCheck} tone="emerald" />
        <SummaryCard label="Sắp hết hạn (30 ngày)" value="2" icon={Clock3} tone="amber" />
        <SummaryCard label="Tổng hạn mức/tháng" value="260K lượt gọi" icon={TrendingUp} tone="blue" />
        <SummaryCard label="Chi phí/tháng" value="28.450.000 ₫" icon={Database} tone="violet" />
      </div>

      <div className="space-y-3">
        {buyerSubscriptions.map((subscription) => (
          <Card key={subscription.id} className="rounded-3xl border-border/70 shadow-sm">
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-chart-1">
                    <Database className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{subscription.code}</span>
                      <StatusPill tone="blue">{subscription.plan}</StatusPill>
                      <StatusPill tone={subscription.status === "Hoạt động" ? "emerald" : "amber"}>
                        {subscription.status}
                      </StatusPill>
                      {subscription.autoRenew ? <StatusPill tone="violet">Tự động gia hạn</StatusPill> : null}
                    </div>
                    <div>
                      <h3 className="text-[1.1rem] font-semibold text-primary">{subscription.title}</h3>
                      <p className="text-sm text-muted-foreground">{subscription.provider}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <GhostIconButton icon={Eye} label="Xem" />
                  <GhostIconButton icon={Settings} label="Cấu hình" />
                  <GhostIconButton icon={ExternalLink} label="Mở" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Hạn mức tháng</p>
                  <p className="text-lg font-semibold text-primary">
                    {subscription.limitLabel}{" "}
                    <span className="text-sm font-normal text-muted-foreground">/ {subscription.limitMax}</span>
                  </p>
                  <Progress value={subscription.limitUsed} className="h-2.5 rounded-full bg-secondary" />
                </div>
                <StatBlock label="Lượt gọi 30 ngày" value={subscription.calls30d} detail={subscription.callDelta} detailTone="emerald" />
                <StatBlock label="Giá gói · Chu kỳ" value={subscription.price} detail={subscription.cycle} />
                <StatBlock label="Hết hạn" value={subscription.renewal} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function BuyerApiKeysPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="API Keys & Token"
        description="Quản lý khóa truy cập, OAuth token và phạm vi quyền cho các dịch vụ"
        actions={<HeaderButton icon={Plus}>Tạo API Key mới</HeaderButton>}
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="API keys đang hoạt động" value="3" icon={Database} tone="blue" />
        <SummaryCard label="Lượt gọi hôm nay" value="14.823" icon={TrendingUp} tone="emerald" />
        <SummaryCard label="Rate limit" value="10K/phút" icon={ShieldCheck} tone="amber" />
        <SummaryCard label="FAPI 2.0 enabled" value="Có" icon={CheckCheck} tone="violet" />
      </div>

      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Danh sách API Keys</CardTitle>
          <CardDescription>Tất cả keys được mã hóa AES-256 và tự động rotate mỗi 90 ngày</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Phạm vi</TableHead>
                <TableHead>Lượt gọi (30 ngày)</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyerApiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell className="font-mono text-xs">{key.prefix}</TableCell>
                  <TableCell className="text-muted-foreground">{key.scope}</TableCell>
                  <TableCell>{key.calls30d}</TableCell>
                  <TableCell>{key.createdAt}</TableCell>
                  <TableCell>
                    <StatusPill tone={key.status === "Hoạt động" ? "emerald" : "rose"}>
                      {key.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <GhostIconButton icon={Eye} label="Xem" />
                      <GhostIconButton icon={Copy} label="Sao chép" />
                      <GhostIconButton icon={TrendingUp} label="Rotate" />
                      <GhostIconButton icon={Trash2} label="Xóa" danger />
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

export function BuyerSandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Sandbox & Phòng sạch dữ liệu"
        description="Thử nghiệm tích hợp + phân tích privacy-preserving trên dữ liệu nhạy cảm mà không sao chép gốc"
        actions={
          <>
            <HeaderButton variant="outline" icon={Plus}>
              Sandbox mới
            </HeaderButton>
            <HeaderButton icon={ShieldCheck}>Clean Room mới</HeaderButton>
          </>
        }
      />

      <div className="grid gap-3 xl:grid-cols-3">
        {buyerSandboxFeatures.map((feature) => (
          <Card key={feature.title} className="rounded-3xl border-border/70 shadow-sm">
            <CardContent className="space-y-2 p-4">
              <StatusPill tone="blue">{feature.eyebrow}</StatusPill>
              <h3 className="text-base font-semibold text-primary">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <MetricGrid metrics={buyerSandboxMetrics} />

      <div className="grid gap-3 xl:grid-cols-[1fr_1fr_0.95fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-xl">Sandbox Sessions</CardTitle>
              <CardDescription>3 sessions</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyerSandboxSessions.map((item) => (
              <div key={item.code} className="rounded-2xl border border-border/70 p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-medium text-muted-foreground">{item.code}</span>
                    <StatusPill tone={item.status === "Hoạt động" ? "emerald" : "amber"}>
                      {item.status}
                    </StatusPill>
                  </div>
                  <Link href={item.href} className="inline-flex items-center text-sm font-medium text-primary">
                    Mở
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </div>
                <p className="text-sm font-semibold text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.dataset}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.meta}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Clean Room Sessions</CardTitle>
            <CardDescription>2 sessions · Privacy-preserving</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyerCleanRooms.map((item) => (
              <div key={item.code} className="rounded-2xl border border-border/70 p-3">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-medium text-muted-foreground">{item.code}</span>
                  <StatusPill tone="emerald">{item.status}</StatusPill>
                  <StatusPill tone="violet">{item.mode}</StatusPill>
                </div>
                <p className="text-sm font-semibold text-primary">{item.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.datasets.map((dataset) => (
                    <StatusPill key={dataset} tone="blue">
                      {dataset}
                    </StatusPill>
                  ))}
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <StatMini label="Cường độ bảo mật (ε)" value={item.epsilon} />
                  <StatMini label="Xác suất rò rỉ (δ)" value={item.delta} />
                  <StatMini label="Budget còn" value={item.budget} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Privacy Budget</CardTitle>
            <CardDescription>Giải thích cơ chế giới hạn riêng tư</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyerPrivacyNotes.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/70 p-3">
                <p className="text-sm font-semibold text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <Alert className="rounded-2xl border-border/70">
              <AlertTitle className="text-sm text-primary">Lưu ý</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                Khi privacy budget cạn, session phải đóng để tránh rò rỉ tích lũy qua nhiều truy vấn.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function BuyerAuctionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Đấu giá dữ liệu"
        description="Tham gia các phiên đấu giá minh bạch trên Sàn"
        actions={
          <>
            <HeaderButton variant="outline" icon={Bell}>
              Đã theo dõi
            </HeaderButton>
            <HeaderButton icon={Search}>Tìm phiên đấu giá</HeaderButton>
          </>
        }
      />

      <MetricGrid metrics={buyerAuctionMetrics} />

      <div className="flex flex-wrap gap-2">
        {buyerAuctionFilters.map((item, index) => (
          <Badge
            key={item.label}
            variant={index === 0 ? "default" : "outline"}
            className="rounded-full px-3 py-1.5 text-sm"
          >
            {item.label} {item.value}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {buyerAuctionItems.map((auction) => (
          <Card key={auction.code} className="rounded-3xl border-border/70 shadow-sm">
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-medium text-muted-foreground">{auction.code}</span>
                    <StatusPill tone="rose">{auction.badge}</StatusPill>
                    <StatusPill tone="blue">{auction.domain}</StatusPill>
                    <StatusPill tone={auction.status.includes("dẫn đầu") ? "emerald" : "amber"}>
                      {auction.status}
                    </StatusPill>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{auction.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Người bán: {auction.seller} · {auction.bidders} · {auction.remaining}
                  </p>
                </div>
                <HeaderLinkButton href={`/buyer/auctions/${auction.code}`} icon={ArrowRight}>
                  Đặt giá tiếp
                </HeaderLinkButton>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatMini label="Giá khởi điểm" value={auction.opening} />
                <StatMini label="Giá hiện tại" value={auction.current} detail={auction.currentDelta} detailTone="emerald" />
                <StatMini label="Giá bạn đặt" value={auction.mine} />
                <StatMini label="Xếp hạng" value={auction.ranking} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function BuyerCartPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Giỏ hàng"
        description="Xem xét và thanh toán các dịch vụ dữ liệu bạn đã chọn"
      />

      <div className="grid gap-3 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-xl">3 dịch vụ trong giỏ</CardTitle>
              <Button variant="ghost" className="h-8 rounded-xl px-2 text-sm">
                Xóa tất cả
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyerCartItems.map((item) => (
              <div
                key={item.code}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-chart-1">
                    <Database className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{item.code}</span>
                      {"badge" in item && item.badge ? (
                        <StatusPill tone="amber">{item.badge}</StatusPill>
                      ) : null}
                    </div>
                    <h3 className="text-base font-semibold text-primary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.provider}</p>
                    <p className="text-sm text-muted-foreground">{item.plan}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <p className="text-sm font-semibold text-primary">{item.price}</p>
                  <Button variant="ghost" className="h-8 rounded-xl px-2 text-sm text-destructive hover:text-destructive">
                    <Trash2 className="mr-1 size-4" />
                    Xóa
                  </Button>
                </div>
              </div>
            ))}

            <Card className="rounded-2xl border-border/70 bg-muted/30 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Xác nhận đồng ý dữ liệu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {buyerCartConsentChecks.map((item, index) => (
                  <label key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      defaultChecked={index < 2}
                      className="mt-0.5 size-4 rounded border-border"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {buyerCartSummary.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center justify-between text-sm",
                    item.emphasized && "border-t border-border/70 pt-3 text-base font-semibold text-primary"
                  )}
                >
                  <span className={item.emphasized ? "text-primary" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                  <span className={item.emphasized ? "text-primary" : "text-foreground"}>
                    {item.value}
                  </span>
                </div>
              ))}
              <p className="text-sm text-muted-foreground">
                <strong>Xuất hóa đơn VAT:</strong> Công ty TNHH FinTech Việt · MST: 0108234567
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {buyerPaymentMethods.map((method) => (
                <label
                  key={method.label}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 px-3 py-3 text-sm"
                >
                  <input
                    type="radio"
                    name="buyer-payment"
                    defaultChecked={method.selected}
                    className="size-4"
                  />
                  <CreditCard className="size-4 text-muted-foreground" />
                  <span>{method.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          <Button className="h-10 w-full rounded-xl text-sm">Tiến hành thanh toán</Button>
        </div>
      </div>
    </div>
  );
}

export function BuyerDemandsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Nhu cầu mua của tôi"
        description="Đăng yêu cầu dữ liệu để bên bán chủ động chào giá · Tự động ghép cặp với bên bán phù hợp"
        actions={
          <>
            <HeaderButton variant="outline">Bản nháp (1)</HeaderButton>
            <HeaderLinkButton href="/buyer/demands/new" icon={Plus}>
              Đăng nhu cầu mới
            </HeaderLinkButton>
          </>
        }
      />

      <MetricGrid metrics={buyerDemandMetrics} />

      <div className="flex flex-wrap gap-2">
        {buyerDemandFilters.map((item, index) => (
          <Badge
            key={item.label}
            variant={index === 0 ? "default" : "outline"}
            className="rounded-full px-3 py-1.5 text-sm"
          >
            {item.label} {item.value}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {buyerDemandItems.map((item, index) => (
          <Card key={item.code} className="rounded-3xl border-border/70 shadow-sm">
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-medium text-muted-foreground">{item.code}</span>
                    <StatusPill tone="blue">{item.domain}</StatusPill>
                    <StatusPill tone={item.visibility.includes("Riêng") ? "violet" : "amber"}>
                      {item.visibility}
                    </StatusPill>
                    <StatusPill tone={item.status === "Đang đàm phán" ? "amber" : "emerald"}>
                      {item.status}
                    </StatusPill>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.timeline}</p>
                </div>
                <GhostIconButton icon={MoreHorizontal} label="Thêm" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatMini label="Ngân sách" value={item.budget} />
                <StatMini label="Offers nhận" value={item.offers} />
                <StatMini label="Top match AI" value={item.match} />
                <StatMini label="Hạn chót" value={item.deadline} />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" className="h-9 rounded-xl px-4 text-sm">
                  <Link href={`/buyer/demands/${item.code}`}>Xem chi tiết & offers</Link>
                </Button>
                {index === 0 ? <Button className="h-9 rounded-xl px-4 text-sm">Xem 8 offers</Button> : null}
                {index === 2 ? <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">Tiếp tục chỉnh sửa</Button> : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function BuyerRfqsPage() {
  return <BuyerDemandsPage />;
}

export function BuyerOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Đơn hàng & Hợp đồng"
        description="Lịch sử giao dịch, hợp đồng điện tử và chứng từ tài chính"
        actions={<HeaderButton icon={Download}>Xuất báo cáo</HeaderButton>}
      />

      <MetricGrid metrics={buyerOrderMetrics} />

      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle className="text-xl">Lịch sử đơn hàng</CardTitle>
              <CardDescription>Tất cả giao dịch mua dịch vụ dữ liệu</CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SearchInput placeholder="Mã đơn, hợp đồng, hóa đơn…" className="h-9 min-w-64 rounded-xl" />
              <Select defaultValue="all">
                <SelectTrigger className="h-9 min-w-40 rounded-xl bg-card px-3 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="done">Hoàn tất</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>SL dịch vụ</TableHead>
                <TableHead>Bàn giao</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Hợp đồng</TableHead>
                <TableHead>Hóa đơn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyerOrderRows.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className="font-medium text-primary">
                    <Link href={`/buyer/orders/${item.code}`}>{item.code}</Link>
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <StatusPill tone="blue">{item.delivery}</StatusPill>
                  </TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>{item.contract}</TableCell>
                  <TableCell>{item.invoice}</TableCell>
                  <TableCell>
                    <StatusPill tone={item.status === "Hoàn tất" ? "emerald" : "amber"}>
                      {item.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <GhostIconButton icon={Eye} label="Xem" />
                      <GhostIconButton icon={Download} label="Tải xuống" />
                      <GhostIconButton icon={MoreHorizontal} label="Thêm" />
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
