import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  Clock3,
  Database,
  Download,
  FileSpreadsheet,
  Filter,
  Settings,
  Star,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import {
  buyerAnalyticsMetrics,
  buyerApiDistribution,
  buyerCatalogCategories,
  buyerCatalogPagination,
  buyerCatalogServices,
  buyerComplianceItems,
  buyerHomeAlerts,
  buyerHomeMetrics,
  buyerNotificationFilters,
  buyerNotifications,
  buyerPopularSearches,
  buyerRecentServices,
  buyerTopEndpoints,
  buyerUsageStats,
} from "@/features/buyer/data";
import {
  AnalyticsHeatmapCard,
  BuyerPageHeader,
  EndpointListCard,
  HeaderButton,
  HeaderLinkButton,
  IconSurface,
  MetricGrid,
  SearchInput,
  StatusPill,
  SummaryCard,
  UsageOverviewCard,
} from "@/features/buyer/shared";
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
import { cn } from "@/shared/lib/utils";

export function BuyerHomePage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title={
          <>
            Xin chào, Nguyễn Văn An <span className="inline-block">👋</span>
          </>
        }
        description="Tổng quan hoạt động khai thác dữ liệu của bạn trong 30 ngày qua."
        actions={
          <>
            <HeaderButton variant="outline" icon={FileSpreadsheet}>
              Xuất báo cáo
            </HeaderButton>
            <HeaderButton icon={Database}>Tìm dịch vụ mới</HeaderButton>
          </>
        }
      />

      <MetricGrid metrics={buyerHomeMetrics} />

      <div className="grid gap-3 xl:grid-cols-[1.75fr_0.9fr]">
        <UsageOverviewCard
          eyebrow="30 ngày gần nhất · Tất cả dịch vụ"
          title="Lưu lượng khai thác API"
          total="248.512"
          unit="calls · 30 ngày"
          badge="99,8% uptime"
          stats={buyerUsageStats}
        />
        <EndpointListCard
          title="Dịch vụ sử dụng nhiều nhất"
          description="Theo số lượt gọi API"
          items={buyerTopEndpoints}
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr_0.75fr]">
        <RecentServicesCard />
        <HomeAlertsCard />
        <div className="flex flex-col gap-3">
          <ComplianceCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}

export function BuyerAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Phân tích khai thác dữ liệu"
        description="Insights sâu về lưu lượng API, hiệu suất và chi phí theo dịch vụ"
        actions={
          <>
            <Select defaultValue="30">
              <SelectTrigger className="h-9 min-w-36 rounded-xl bg-card px-3 text-sm">
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="30">30 ngày qua</SelectItem>
                  <SelectItem value="7">7 ngày qua</SelectItem>
                  <SelectItem value="90">90 ngày qua</SelectItem>
                  <SelectItem value="365">1 năm qua</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <HeaderButton variant="outline" icon={Download}>
              Xuất CSV
            </HeaderButton>
          </>
        }
      />

      <MetricGrid metrics={buyerAnalyticsMetrics} />

      <div className="grid gap-3 xl:grid-cols-[1.65fr_0.9fr]">
        <AnalyticsHeatmapCard />
        <EndpointListCard
          title="Phân bố theo endpoint"
          description="Top 5 API được gọi nhiều nhất"
          items={buyerApiDistribution}
        />
      </div>
    </div>
  );
}

export function BuyerNotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Trung tâm thông báo"
        description="Tất cả sự kiện, cảnh báo và cập nhật từ Sàn Dữ liệu Quốc gia"
        actions={
          <>
            <HeaderButton variant="outline" icon={CheckCheck}>
              Đánh dấu tất cả đã đọc
            </HeaderButton>
            <HeaderLinkButton href="/buyer/settings" variant="outline" icon={Settings}>
              Cấu hình
            </HeaderLinkButton>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Chưa đọc" value="5" icon={Bell} tone="amber" />
        <SummaryCard label="Quan trọng" value="3" icon={CircleAlert} tone="rose" />
        <SummaryCard label="Hôm nay" value="8" icon={TrendingUp} tone="blue" />
        <SummaryCard label="Tổng tháng này" value="142" icon={CheckCheck} tone="violet" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[220px_1fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardContent className="space-y-3 p-4">
            <SearchInput placeholder="Tìm thông báo…" />
            <div className="space-y-1.5">
              {buyerNotificationFilters.map((filter, index) => (
                <button
                  key={filter.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                    index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                >
                  <span>{filter.label}</span>
                  <Badge
                    variant={index === 0 ? "secondary" : "outline"}
                    className={cn(
                      "rounded-full px-2 py-0 text-[11px]",
                      index === 0 &&
                        "border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground"
                    )}
                  >
                    {filter.value}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {buyerNotifications.map((item) => (
            <NotificationCard key={item.id} {...item} />
          ))}
          <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
            Tải thêm thông báo cũ hơn
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BuyerCatalogPage() {
  return (
    <div className="flex flex-col gap-4">
      <BuyerPageHeader
        title="Catalog dịch vụ dữ liệu"
        description="662 chỉ tiêu thống kê · 77 bộ dữ liệu · 18 lĩnh vực — cập nhật thời gian thực"
        actions={
          <>
            <HeaderButton variant="outline" icon={Filter}>
              Bộ lọc nâng cao
            </HeaderButton>
            <HeaderButton icon={Download}>Xuất danh sách</HeaderButton>
          </>
        }
      />

      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-col gap-3 xl:flex-row">
            <SearchInput
              placeholder="Tìm theo mã dịch vụ, tên, chỉ tiêu, cơ quan cung cấp…"
              className="h-12 flex-1 rounded-2xl pl-12 text-[15px]"
            />
            <Button className="h-10 rounded-xl px-5 text-sm">Tìm kiếm</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Phổ biến:</span>
            {buyerPopularSearches.map((item) => (
              <Badge key={item} variant="outline" className="rounded-full px-3 py-1 text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
        {buyerCatalogCategories.map((category, index) => {
          const Icon = category.icon;
          const active = index === 0;
          return (
            <button
              key={category.label}
              type="button"
              className={cn(
                "rounded-3xl border border-border/70 bg-card px-3 py-4 text-left shadow-sm transition hover:border-primary/20",
                active && "bg-primary text-primary-foreground"
              )}
            >
              <div
                className={cn(
                  "mb-4 flex size-10 items-center justify-center rounded-2xl",
                  active ? "bg-primary-foreground/10 text-chart-1" : "bg-secondary text-primary"
                )}
              >
                <Icon className="size-5" />
              </div>
              <p className="text-sm font-semibold">{category.label}</p>
              <p className={cn("mt-1 text-sm", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {category.count}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị <span className="font-semibold text-foreground">1-6</span> trên{" "}
          <span className="font-semibold text-foreground">124 dịch vụ</span> trong lĩnh vực
          &quot;Dân cư&quot;
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sắp xếp:</span>
          <Select defaultValue="popular">
            <SelectTrigger className="h-9 min-w-44 rounded-xl bg-card px-3 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
                <SelectItem value="top-rated">Đánh giá cao nhất</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="lowest-price">Giá thấp nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {buyerCatalogServices.map((service) => (
          <CatalogServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
          Trước
        </Button>
        {buyerCatalogPagination.map((item, index) => (
          <Button
            key={item}
            variant={index === 0 ? "default" : "outline"}
            className="h-9 min-w-9 rounded-xl px-3 text-sm"
          >
            {item}
          </Button>
        ))}
        <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
          Sau
        </Button>
      </div>
    </div>
  );
}

function RecentServicesCard() {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-[1.2rem] text-primary">Dịch vụ đã đăng ký gần đây</CardTitle>
          <CardDescription>Quản lý và khai thác các dịch vụ đang hoạt động</CardDescription>
        </div>
        <Link href="/buyer/subscriptions" className="inline-flex items-center text-sm font-medium text-primary">
          Xem tất cả
          <ChevronRight className="ml-1 size-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {buyerRecentServices.map((item) => (
          <div key={item.code} className="rounded-2xl border border-border/70 p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-chart-1">
                  <Database className="size-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{item.code}</span>
                    <StatusPill tone={item.status === "Sắp hết hạn" ? "amber" : "emerald"}>
                      {item.status}
                    </StatusPill>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.provider}</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="text-muted-foreground">Hiệu lực đến</p>
                <p className="font-medium text-primary">{item.expiry}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mức sử dụng</span>
                <span className="font-medium text-primary">{item.usage}%</span>
              </div>
              <Progress value={item.usage} className="h-2.5 rounded-full bg-secondary" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function HomeAlertsCard() {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[1.2rem] text-primary">Cảnh báo & Thông báo</CardTitle>
        <CardDescription>Các sự kiện cần ưu tiên xử lý trong hôm nay</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {buyerHomeAlerts.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block rounded-2xl border border-border/70 p-3 hover:border-primary/20"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <StatusPill tone={item.tone}>{item.time}</StatusPill>
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-primary">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

function ComplianceCard() {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[1.1rem] text-primary">Trạng thái tuân thủ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {buyerComplianceItems.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border/70 p-3">
            <div className="mb-1 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-primary">{item.label}</p>
              <p className="text-sm font-semibold text-primary">{item.value}</p>
            </div>
            <p className="text-sm text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
  const actions = [
    { label: "Mở catalog", description: "Tìm thêm dịch vụ dữ liệu mới", href: "/buyer/catalog" },
    { label: "Tạo API key", description: "Cấp key cho môi trường tích hợp", href: "/buyer/api-keys" },
    { label: "Đăng nhu cầu mua", description: "Nhận chào giá từ sellers", href: "/buyer/demands" },
    { label: "Nạp ví SDL", description: "Bổ sung số dư để thanh toán", href: "/buyer/wallet" },
  ];

  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[1.1rem] text-primary">Thao tác nhanh</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((item) => (
          <Button
            key={item.label}
            asChild
            variant="outline"
            className="h-auto w-full justify-between rounded-2xl px-3 py-3 text-left"
          >
            <Link href={item.href}>
              <div>
                <p className="text-sm font-medium text-primary">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function NotificationCard({
  title,
  description,
  category,
  time,
  tone,
  unread,
  href,
}: {
  title: string;
  description: string;
  category: string;
  time: string;
  tone: "amber" | "blue" | "rose";
  unread?: boolean;
  href: string;
}) {
  const iconMap = {
    amber: Clock3,
    blue: TrendingUp,
    rose: CircleAlert,
  } satisfies Record<string, LucideIcon>;
  const Icon = iconMap[tone];

  return (
    <Link href={href} className="block">
      <Card className="rounded-3xl border-border/70 shadow-sm transition hover:border-primary/20">
        <CardContent className="flex gap-3 p-4">
          <IconSurface tone={tone}>
            <Icon className="size-5" />
          </IconSurface>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-primary">{title}</h3>
                {unread ? <span className="size-2 rounded-full bg-blue-500" /> : null}
                <StatusPill tone={tone}>{category}</StatusPill>
              </div>
              <p className="text-sm text-muted-foreground">{time}</p>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function CatalogServiceCard({
  service,
}: {
  service: (typeof buyerCatalogServices)[number];
}) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardContent className="space-y-4 p-4">
        <div className="flex gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-chart-1">
            <Database className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">{service.code}</span>
              <StatusPill tone="blue">{service.domain}</StatusPill>
              <StatusPill tone="violet">{service.delivery}</StatusPill>
            </div>
            <h3 className="text-base font-semibold text-primary">{service.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{service.provider}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <StatusPill
              key={tag}
              tone={tag === "Yêu cầu consent" || tag === "Consent" ? "amber" : "blue"}
            >
              {tag}
            </StatusPill>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-primary">
              <Star className="size-4 fill-current text-amber-500" />
              {service.rating}
            </span>
            <span className="text-muted-foreground">{service.traffic}</span>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Giá</p>
            <p className="font-semibold text-primary">
              {service.price} <span className="font-normal text-muted-foreground">{service.unit}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="h-9 flex-1 rounded-xl text-sm">
            <Link href={`/buyer/catalog/${service.code}`}>Xem chi tiết</Link>
          </Button>
          <Button asChild className="h-9 flex-1 rounded-xl text-sm">
            <Link href={`/buyer/catalog/${service.code}`}>
              Đăng ký sử dụng
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
