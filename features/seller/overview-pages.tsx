import Link from "next/link";
import {
  Bell,
  ChartNoAxesColumn,
  CircleDollarSign,
  FileText,
  Save,
  ShieldCheck,
  Sparkles,
  TrendingUp,
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
import { Separator } from "@/shared/components/ui/separator";

export function SellerHomePage() {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">
            Chào mừng trở lại, Trần Thị Mai
          </h1>
          <p className="text-sm text-muted-foreground">
            Trang chủ seller theo cấu trúc mới, tối giản và chỉ dùng shadcn UI.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/seller/analytics">Mở báo cáo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/seller/notifications">Mở thông báo</Link>
          </Button>
          <Button>
            <Save className="mr-2 size-4" />
            Lưu
          </Button>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Doanh thu tháng"
          value="1.284.500.000 đ"
          note="+32,8%"
          icon={CircleDollarSign}
        />
        <StatCard
          title="Sản phẩm đang bán"
          value="18"
          note="+12,5%"
          icon={ChartNoAxesColumn}
        />
        <StatCard
          title="Khách hàng hoạt động"
          value="142"
          note="+18,4%"
          icon={TrendingUp}
        />
        <StatCard
          title="Đánh giá trung bình"
          value="4,82"
          note="+2,1%"
          icon={Sparkles}
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.55fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu 12 tháng gần nhất</CardTitle>
            <CardDescription>
              Giữ cấu trúc khối chính theo markdown mẫu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-4xl font-semibold text-primary">
              9.842.000.000 đ
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniStat label="Tổng giao dịch" value="2.847" />
              <MiniStat label="Giá trị TB" value="3.458.000 đ" />
              <MiniStat label="Khách hàng quay lại" value="68%" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ProgressRow label="Báo cáo tín dụng DN" value={100} amount="420" />
            <ProgressRow label="Chỉ số thị trường CK" value={78} amount="310" />
            <ProgressRow
              label="Dữ liệu tỷ giá realtime"
              value={56}
              amount="245"
            />
            <ProgressRow label="DS DN niêm yết" value={42} amount="186" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SellerAnalyticsPage() {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">
            Doanh thu & Báo cáo tài chính
          </h1>
          <p className="text-sm text-muted-foreground">
            Khung trang báo cáo mới, tối giản theo đúng 3 trang yêu cầu.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Năm 2026</Button>
          <Button>
            <FileText className="mr-2 size-4" />
            Xuất báo cáo
          </Button>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Doanh thu 2026"
          value="9.842.000.000 đ"
          note="+128,4%"
          icon={CircleDollarSign}
        />
        <StatCard
          title="Doanh thu thuần"
          value="8.613.000.000 đ"
          note="+31,2%"
          icon={TrendingUp}
        />
        <StatCard
          title="Số giao dịch"
          value="2.847"
          note="+42,1%"
          icon={ChartNoAxesColumn}
        />
        <StatCard
          title="Khách hàng quay lại"
          value="68%"
          note="+12,4%"
          icon={ShieldCheck}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ doanh thu theo tháng</CardTitle>
          <CardDescription>
            Giữ cấu trúc section chính, chỉ để placeholder dữ liệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-20 rounded-md bg-muted" />
                <p className="text-center text-[11px] text-muted-foreground">
                  T{i + 1}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo sản phẩm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ProgressRow
              label="Báo cáo tín dụng DN"
              value={96}
              amount="2.840"
            />
            <ProgressRow
              label="Chỉ số thị trường CK"
              value={72}
              amount="1.920"
            />
            <ProgressRow
              label="Dữ liệu tỷ giá realtime"
              value={58}
              amount="1.480"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top khách hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CustomerRow
              index={1}
              name="Ngân hàng TMCP Việt Nam"
              value="1.240.000.000 đ"
            />
            <CustomerRow
              index={2}
              name="CTCP Chứng khoán SSI"
              value="980.000.000 đ"
            />
            <CustomerRow index={3} name="VietinBank" value="820.000.000 đ" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SellerNotificationsPage() {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">
            Trung tâm thông báo
          </h1>
          <p className="text-sm text-muted-foreground">
            Tất cả cập nhật đơn hàng, đấu giá, RFQ và cảnh báo hệ thống.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Đánh dấu đã đọc</Button>
          <Button>
            <Save className="mr-2 size-4" />
            Lưu
          </Button>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Chưa đọc" value="6" note="Mới" icon={Bell} />
        <StatCard
          title="Quan trọng"
          value="4"
          note="Ưu tiên"
          icon={ShieldCheck}
        />
        <StatCard title="Hôm nay" value="6" note="Cập nhật" icon={TrendingUp} />
        <StatCard
          title="Tháng này"
          value="284"
          note="Tổng"
          icon={ChartNoAxesColumn}
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[260px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bộ lọc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Tìm thông báo..." />
            <Button className="w-full justify-start">Tất cả</Button>
            <Button variant="ghost" className="w-full justify-start">
              Chưa đọc
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Quan trọng
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Đấu giá
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Danh sách thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <NotificationRow
              title="Đơn hàng mới #ORD-2026-04-12847"
              tag="Quan trọng"
              time="2 phút trước"
            />
            <NotificationRow
              title="Bid mới trên phiên AUC-2026-0412"
              tag="Đấu giá"
              time="15 phút trước"
            />
            <NotificationRow
              title="RFQ mới phù hợp (AI Match 95%)"
              tag="RFQ"
              time="1 giờ trước"
            />
            <NotificationRow
              title="Đăng nhập mới từ thiết bị khác"
              tag="Bảo mật"
              time="Hôm qua"
            />
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
          Phần nội dung cũ đã bỏ, chỉ giữ cấu trúc chung theo yêu cầu.
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

function StatCard({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: typeof Bell;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardDescription>{title}</CardDescription>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-primary">{value}</p>
        <p className="text-xs text-emerald-600">{note}</p>
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  amount,
}: {
  label: string;
  value: number;
  amount: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{amount}</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

function CustomerRow({
  index,
  name,
  value,
}: {
  index: number;
  name: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          {index}. {name}
        </p>
        <p className="text-sm font-semibold text-emerald-700">{value}</p>
      </div>
      <Separator className="mt-2" />
    </div>
  );
}

function NotificationRow({
  title,
  tag,
  time,
}: {
  title: string;
  tag: string;
  time: string;
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-primary">{title}</p>
          <Badge variant="outline">{tag}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
