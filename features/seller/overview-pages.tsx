import Link from "next/link";
import {
  ArrowRight,
  CheckCheck,
  FileText,
  Gavel,
  Search,
  Settings2,
  Store,
  Trophy,
} from "lucide-react";

import {
  ANALYTICS_CUSTOMERS,
  ANALYTICS_PRODUCT_ROWS,
  ANALYTICS_STATS,
  HOME_AUCTIONS,
  HOME_PRODUCT_ROWS,
  HOME_RECENT_ORDERS,
  HOME_STATS,
  HOME_TASKS,
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_STATS,
  NOTIFICATIONS,
  TAX_ITEMS,
  TREND_POINTS,
} from "@/features/seller/data/overview.data";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
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
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";

export function SellerHomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Chào mừng trở lại, Trần Thị Mai ✨
            </CardTitle>
            <CardDescription>
              Tổng quan hoạt động kinh doanh dữ liệu của CTCP Dữ liệu Tài chính
              Việt.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            <Button asChild size="sm" variant="outline">
              <Link href="/seller/products">
                <Store data-icon="inline-start" />
                Xem cửa hàng
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/seller/create">
                <FileText data-icon="inline-start" />
                Đăng sản phẩm mới
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {HOME_STATS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>Doanh thu 12 tháng gần nhất</CardTitle>
              <CardDescription>
                Doanh thu thuần sau phí nền tảng và nghĩa vụ tài chính.
              </CardDescription>
            </div>
            <CardAction>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                +32,8% MoM
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_1fr] lg:items-end">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                    9.842.000.000 đ
                  </p>
                  <span className="pb-1 text-xs text-muted-foreground">
                    12 tháng
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mức tăng trưởng ổn định nhờ danh mục dữ liệu doanh nghiệp, tín
                  dụng và tỷ giá được mua lại đều theo chu kỳ.
                </p>
              </div>
              <TrendChart
                compact
                gradientId="seller-home-trend"
                points={TREND_POINTS}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStatTile label="Tổng giao dịch" value="2.847" />
              <MiniStatTile
                label="Giá trị TB / giao dịch"
                value="3.458.000 đ"
              />
              <MiniStatTile label="Khách hàng quay lại" value="68%" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
            <CardDescription>Theo doanh thu thực tế tháng này</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {HOME_PRODUCT_ROWS.map((item) => (
              <ProgressMetricRow key={item.label} {...item} />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_360px]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>Phiên đấu giá đang diễn ra</CardTitle>
              <CardDescription>
                2 sản phẩm dữ liệu đang được đấu giá trực tiếp
              </CardDescription>
            </div>
            <CardAction>
              <Button asChild size="sm" variant="ghost">
                <Link href="/seller/auctions">
                  Xem tất cả
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {HOME_AUCTIONS.map((item) => (
              <AuctionRow key={item.code} {...item} />
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Việc cần làm</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {HOME_TASKS.map((item) => (
                <TaskStrip key={item.title} {...item} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hạng seller</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-3 rounded-xl bg-muted/30 px-4 py-5 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Trophy />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-foreground">
                    Platinum Seller
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Top 5% nhà cung cấp dữ liệu
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <RankMetric label="Đánh giá" value="4,82/5" />
                <RankMetric label="Tỉ lệ hoàn thành" value="98,6%" />
                <RankMetric label="Thời gian phản hồi" value="< 2 giờ" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Giao dịch mua bán sản phẩm dữ liệu trong 7 ngày qua
            </CardDescription>
          </div>
          <CardAction>
            <Button asChild size="sm" variant="ghost">
              <Link href="/seller/orders">
                Xem tất cả
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {HOME_RECENT_ORDERS.map((item, index) => (
            <div key={item.code} className="flex flex-col gap-3">
              <RecentOrderRow {...item} />
              {index < HOME_RECENT_ORDERS.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Doanh thu & Báo cáo tài chính
            </CardTitle>
            <CardDescription>
              Phân tích doanh thu chi tiết, thuế và dự báo dựa trên AI.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            <Select defaultValue="2026">
              <SelectTrigger aria-label="Chọn năm báo cáo" className="min-w-28">
                <SelectValue placeholder="Năm 2026" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="2026">Năm 2026</SelectItem>
                  <SelectItem value="2025">Năm 2025</SelectItem>
                  <SelectItem value="2024">Năm 2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <FileText data-icon="inline-start" />
              Xuất báo cáo
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ANALYTICS_STATS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Biểu đồ doanh thu theo tháng</CardTitle>
            <CardDescription>12 tháng gần nhất · Triệu VND</CardDescription>
          </div>
          <CardAction>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              +32,8% MoM
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TrendChart
            gradientId="seller-analytics-trend"
            points={TREND_POINTS}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo sản phẩm</CardTitle>
            <CardDescription>Top 6 sản phẩm bán chạy nhất</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {ANALYTICS_PRODUCT_ROWS.map((item) => (
              <ProgressMetricRow key={item.label} {...item} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top khách hàng</CardTitle>
            <CardDescription>Theo giá trị giao dịch 2026</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {ANALYTICS_CUSTOMERS.map((item, index) => (
              <div key={item.name} className="flex flex-col gap-3">
                <CustomerRankRow {...item} />
                {index < ANALYTICS_CUSTOMERS.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thuế & Nghĩa vụ tài chính 2026</CardTitle>
          <CardDescription>
            Tự động tính toán dựa trên quy định hiện hành
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TAX_ITEMS.map((item) => (
            <TaxMetricTile key={item.label} {...item} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SellerNotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Trung tâm thông báo
            </CardTitle>
            <CardDescription>
              Tất cả cập nhật về đơn hàng, đấu giá, RFQ, thẩm định và khiếu nại.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2 self-center">
            <Button size="sm" variant="outline">
              <CheckCheck data-icon="inline-start" />
              Đánh dấu tất cả đã đọc
            </Button>
            <Button size="sm" variant="outline">
              <Settings2 data-icon="inline-start" />
              Cấu hình
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {NOTIFICATION_STATS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
        <Card>
          <CardContent className="flex flex-col gap-3 pt-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Tìm thông báo..." />
            </div>
            <div className="flex flex-col gap-1">
              {NOTIFICATION_CATEGORIES.map((item) => (
                <NotificationCategoryButton key={item.label} {...item} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3 pt-4">
            {NOTIFICATIONS.map((item) => (
              <NotificationListItem
                key={`${item.title}-${item.time}`}
                {...item}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SellerCatalogPage() {
  return <PlaceholderPage title="Catalog dịch vụ" />;
}

export function SellerSubscriptionsPage() {
  return <PlaceholderPage title="Dịch vụ đã đăng ký" />;
}

export function SellerApiKeysPage() {
  return <PlaceholderPage title="API Keys & Token" />;
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Phần này vẫn giữ ở dạng placeholder cho tới khi bạn gửi thêm ảnh hoặc
          yêu cầu chi tiết.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline">
          <Link href="/seller">Quay về Trang chủ</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  note,
  detail,
  noteClassName,
}: MetricCardItem) {
  return (
    <Card className="justify-between">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardAction>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl ring-1",
              iconClassName
            )}
          >
            <Icon />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
          {value}
        </p>
        {note ? (
          <p className="text-xs text-muted-foreground">
            <span className={cn("font-semibold", noteClassName)}>{note}</span>
            {detail ? ` ${detail}` : null}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function MiniStatTile({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-muted/20">
      <CardContent className="flex flex-col gap-1 py-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

function ProgressMetricRow({
  label,
  amount,
  value,
  progressClassName,
}: ProgressItem) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{amount}</span>
      </div>
      <Progress
        value={value}
        className={cn(
          "h-2 rounded-full bg-muted/80 [&_[data-slot=progress-indicator]]:rounded-full",
          progressClassName
        )}
      />
    </div>
  );
}

function AuctionRow({
  code,
  status,
  title,
  startingBid,
  currentBid,
  timeLeft,
  iconClassName,
  statusClassName,
}: AuctionItem) {
  return (
    <Card className="bg-muted/20">
      <CardContent className="flex flex-col gap-4 py-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              iconClassName
            )}
          >
            <Gavel />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{code}</Badge>
              <Badge className={statusClassName}>{status}</Badge>
            </div>
            <p className="font-medium text-foreground">{title}</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <MiniStatTile label="Giá khởi điểm" value={startingBid} />
          <MiniStatTile label="Giá hiện tại" value={currentBid} />
          <MiniStatTile label="Kết thúc sau" value={timeLeft} />
        </div>
      </CardContent>
    </Card>
  );
}

function TaskStrip({ title, description, className }: TaskItem) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-1 py-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function RankMetric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-3 py-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </CardContent>
    </Card>
  );
}

function RecentOrderRow({
  code,
  status,
  statusClassName,
  title,
  customer,
  amount,
}: RecentOrderItem) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <FileText />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{code}</Badge>
            <Badge className={statusClassName}>{status}</Badge>
          </div>
          <p className="truncate font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{customer}</p>
        </div>
      </div>
      <p className="shrink-0 text-sm font-semibold text-emerald-700">
        {amount}
      </p>
    </div>
  );
}

function CustomerRankRow({ index, name, orders, value }: CustomerItem) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted font-semibold text-muted-foreground">
        {index}
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{orders}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-emerald-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function TaxMetricTile({
  label,
  value,
  detail,
  className,
  valueClassName,
}: TaxItem) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-2 py-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={cn(
            "text-2xl font-semibold tracking-tight text-foreground",
            valueClassName
          )}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function NotificationCategoryButton({
  label,
  count,
  active,
}: NotificationCategory) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className="w-full justify-between rounded-xl"
    >
      <span>{label}</span>
      <Badge
        variant={active ? "secondary" : "outline"}
        className={
          active ? "bg-background/15 text-primary-foreground" : undefined
        }
      >
        {count}
      </Badge>
    </Button>
  );
}

function NotificationListItem({
  title,
  description,
  time,
  tag,
  tagClassName,
  icon: Icon,
  iconClassName,
  rowClassName,
}: NotificationItem) {
  return (
    <Card className={cn(rowClassName)}>
      <CardContent className="py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl ring-1",
                iconClassName
              )}
            >
              <Icon />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-foreground">{title}</p>
                {tag ? <Badge className={tagClassName}>{tag}</Badge> : null}
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <p className="shrink-0 pt-1 text-xs text-muted-foreground">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendChart({
  points,
  gradientId,
  compact = false,
}: {
  points: ChartPoint[];
  gradientId: string;
  compact?: boolean;
}) {
  const width = 640;
  const height = compact ? 124 : 216;
  const paddingX = compact ? 8 : 18;
  const paddingY = compact ? 12 : 22;
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const usableHeight = height - paddingY * 2;
  const step =
    points.length > 1 ? (width - paddingX * 2) / (points.length - 1) : 0;

  const coordinates = points.map((point, index) => {
    const x = paddingX + step * index;
    const y =
      height - paddingY - Math.max(point.value / maxValue, 0.02) * usableHeight;

    return { x, y };
  });

  const firstPoint = coordinates[0];
  const lastPoint = coordinates[coordinates.length - 1];
  const linePoints = coordinates
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const areaPoints = [
    `${firstPoint?.x ?? paddingX},${height - paddingY}`,
    linePoints,
    `${lastPoint?.x ?? width - paddingX},${height - paddingY}`,
  ].join(" ");

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn("rounded-2xl bg-muted/25 p-3", compact ? "h-24" : "h-44")}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full w-full text-emerald-600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {!compact
            ? [0.25, 0.5, 0.75].map((fraction) => {
                const y = height - paddingY - usableHeight * fraction;

                return (
                  <line
                    key={fraction}
                    x1={paddingX}
                    x2={width - paddingX}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.08"
                    strokeWidth="1"
                  />
                );
              })
            : null}
          <polygon points={areaPoints} fill={`url(#${gradientId})`} />
          <polyline
            fill="none"
            points={linePoints}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={compact ? 4 : 5}
          />
          {lastPoint ? (
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              fill="white"
              r={compact ? 5 : 6}
              stroke="currentColor"
              strokeWidth="3"
            />
          ) : null}
        </svg>
      </div>
      {!compact ? (
        <div className="grid grid-cols-12 text-[11px] text-muted-foreground">
          {points.map((point) => (
            <span key={point.label} className="text-center">
              {point.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
