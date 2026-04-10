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
  TrendingUp,
} from "lucide-react";

import {
  sellerComplianceItems,
  sellerHomeAlerts,
  sellerHomeMetrics,
  sellerNotificationFilters,
  sellerNotifications,
  sellerQuickActions,
  sellerTopEndpoints,
  sellerUsageStats,
} from "@/features/seller/data";
import {
  AnalyticsHeatmapCard,
  EndpointListCard,
  HeaderButton,
  HeaderLinkButton,
  MetricGrid,
  SellerPageHeader,
  SearchInput,
  StatusPill,
  SummaryCard,
  UsageOverviewCard,
} from "@/features/seller/shared";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";

export function SellerHomePage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title={
          <>
            Xin chào, Nguyễn Văn Bán <span className="inline-block">👋</span>
          </>
        }
        description="Tổng quan hoạt động bán dữ liệu, catalog và giao dịch trong 30 ngày qua."
        actions={
          <>
            <HeaderButton variant="outline" icon={FileSpreadsheet}>
              Xuất báo cáo
            </HeaderButton>
            <HeaderButton icon={Database}>Quản lý catalog</HeaderButton>
          </>
        }
      />

      <MetricGrid metrics={sellerHomeMetrics} />

      <div className="grid gap-3 xl:grid-cols-[1.75fr_0.9fr]">
        <UsageOverviewCard
          eyebrow="30 ngày gần nhất · Tất cả catalog"
          title="Lưu lượng tương tác"
          total="168.420"
          unit="interactions · 30 ngày"
          badge="99,6% uptime"
          stats={sellerUsageStats}
        />
        <EndpointListCard
          title="Danh mục nổi bật"
          description="Theo số lượt tương tác"
          items={sellerTopEndpoints}
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr_0.75fr]">
        <RecentCatalogCard />
        <HomeAlertsCard />
        <div className="flex flex-col gap-3">
          <ComplianceCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}

export function SellerAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Phân tích doanh số"
        description="Theo dõi lưu lượng, hiệu suất catalog và biến động doanh thu theo dịch vụ"
        actions={
          <>
            <HeaderButton variant="outline" icon={Filter}>
              Bộ lọc
            </HeaderButton>
            <HeaderButton icon={Download}>Xuất CSV</HeaderButton>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Doanh thu tháng"
          value="48.900.000 ₫"
          icon={Database}
          tone="blue"
        />
        <SummaryCard
          label="Lượt tương tác"
          value="168.420"
          icon={TrendingUp}
          tone="emerald"
        />
        <SummaryCard
          label="Tỷ lệ chuyển đổi"
          value="3,8%"
          icon={CheckCheck}
          tone="amber"
        />
        <SummaryCard label="Cảnh báo mở" value="5" icon={Bell} tone="violet" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.65fr_0.9fr]">
        <AnalyticsHeatmapCard
          title="Lưu lượng theo giờ"
          description="Biểu đồ 30 ngày gần nhất · Peak: 9.840 interactions/ngày"
        />
        <EndpointListCard
          title="Phân bố theo catalog"
          description="Top 5 dịch vụ được xem nhiều nhất"
          items={sellerTopEndpoints}
        />
      </div>
    </div>
  );
}

export function SellerNotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Trung tâm thông báo"
        description="Tất cả sự kiện, cảnh báo và cập nhật từ buyer, hệ thống và đấu giá"
        actions={
          <>
            <HeaderButton variant="outline" icon={CheckCheck}>
              Đánh dấu tất cả đã đọc
            </HeaderButton>
            <HeaderLinkButton
              href="/seller/settings"
              variant="outline"
              icon={Settings}
            >
              Cấu hình
            </HeaderLinkButton>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Chưa đọc" value="5" icon={Bell} tone="amber" />
        <SummaryCard
          label="Quan trọng"
          value="3"
          icon={CircleAlert}
          tone="rose"
        />
        <SummaryCard label="Hôm nay" value="8" icon={TrendingUp} tone="blue" />
        <SummaryCard
          label="Tổng tháng này"
          value="142"
          icon={CheckCheck}
          tone="violet"
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[220px_1fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardContent className="space-y-3 p-4">
            <SearchInput placeholder="Tìm thông báo…" />
            <div className="space-y-1.5">
              {sellerNotificationFilters.map((filter, index) => (
                <button
                  key={filter.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
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
          {sellerNotifications.map((item) => (
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

export function SellerCatalogPage() {
  return (
    <SimpleSectionPage
      title="Catalog dịch vụ"
      description="Quản lý danh mục đang bán, giá niêm yết và trạng thái xuất bản."
    />
  );
}

export function SellerSubscriptionsPage() {
  return (
    <SimpleSectionPage
      title="Dịch vụ đã đăng ký"
      description="Theo dõi buyer, hợp đồng và các gói dịch vụ đang hoạt động."
    />
  );
}

export function SellerApiKeysPage() {
  return (
    <SimpleSectionPage
      title="API Keys & Token"
      description="Quản lý khóa truy cập, token tích hợp và phạm vi quyền."
    />
  );
}

export function SellerSandboxPage() {
  return (
    <SimpleSectionPage
      title="Sandbox & Clean Room"
      description="Môi trường kiểm thử tích hợp và phân tích không sao chép dữ liệu gốc."
    />
  );
}

export function SellerAuctionsPage() {
  return (
    <SimpleSectionPage
      title="Đấu giá dữ liệu"
      description="Theo dõi các phiên đấu giá, bid mới và lịch sử phản hồi."
    />
  );
}

export function SellerSettingsPage() {
  return (
    <SimpleSectionPage
      title="Cài đặt tài khoản"
      description="Quản lý hồ sơ seller, workspace và các tuỳ chọn vận hành."
    />
  );
}

function SimpleSectionPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader title={title} description={description} />
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="rounded-3xl border-border/70 shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">
              Không gian đang được chuẩn hóa
            </CardTitle>
            <CardDescription>
              Seller portal hiện đã chuyển sang cùng cấu trúc với buyer portal,
              nên các trang con sẽ được mở rộng dần theo cùng pattern.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sellerQuickActions.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/70 p-3"
              >
                <p className="text-sm font-medium text-primary">{item.label}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Gợi ý nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sellerComplianceItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/70 p-3"
              >
                <p className="text-sm font-medium text-primary">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RecentCatalogCard() {
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-[1.2rem] text-primary">
            Catalog đã bán gần đây
          </CardTitle>
          <CardDescription>
            Quản lý danh mục và các dịch vụ đang hoạt động
          </CardDescription>
        </div>
        <Link
          href="/seller/catalog"
          className="inline-flex items-center text-sm font-medium text-primary"
        >
          Xem tất cả
          <ChevronRight className="ml-1 size-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {sellerHomeMetrics.slice(0, 3).map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-border/70 p-3"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-chart-1">
                  <Database className="size-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {metric.label}
                    </span>
                    <StatusPill tone="emerald">Đang hoạt động</StatusPill>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {metric.detail}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mức sử dụng</span>
                <span className="font-medium text-primary">78%</span>
              </div>
              <Progress
                value={78}
                className="h-2.5 rounded-full bg-secondary"
              />
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
        <CardTitle className="text-[1.2rem] text-primary">
          Cảnh báo & Thông báo
        </CardTitle>
        <CardDescription>
          Các sự kiện cần ưu tiên xử lý trong hôm nay
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sellerHomeAlerts.map((item) => (
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
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
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
        <CardTitle className="text-[1.1rem] text-primary">
          Trạng thái chuẩn hóa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sellerComplianceItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border/70 p-3"
          >
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
  return (
    <Card className="rounded-3xl border-border/70 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[1.1rem] text-primary">
          Thao tác nhanh
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sellerQuickActions.map((item) => (
          <Button
            key={item.label}
            asChild
            variant="outline"
            className="h-auto w-full justify-between rounded-2xl px-3 py-3 text-left"
          >
            <Link href={item.href}>
              <div>
                <p className="text-sm font-medium text-primary">{item.label}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
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
  } satisfies Record<string, typeof Clock3>;
  const Icon = iconMap[tone];

  return (
    <Link href={href} className="block">
      <Card className="rounded-3xl border-border/70 shadow-sm transition hover:border-primary/20">
        <CardContent className="flex gap-3 p-4">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl",
              tone === "amber"
                ? "bg-amber-50 text-amber-600"
                : tone === "blue"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-rose-50 text-rose-600"
            )}
          >
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-primary">{title}</h3>
                {unread ? (
                  <span className="size-2 rounded-full bg-blue-500" />
                ) : null}
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
