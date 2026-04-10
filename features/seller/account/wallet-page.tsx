import {
  CreditCard,
  FileText,
  TrendingUp,
  Upload,
  Wallet,
  Zap,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  SellerKpiCard,
  SellerPageHeader,
  StatusPill,
} from "@/features/seller/shared";

const transactions = [
  {
    date: "05/04/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+48.000.000 đ",
    ref: "PO-2026-04-0824 · ORD-12847",
  },
  {
    date: "02/04/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+120.000.000 đ",
    ref: "PO-2026-04-0818 · ORD-12824",
  },
  {
    date: "01/04/2026",
    bank: "Techcombank ••••9821",
    status: "Hoàn tất",
    amount: "+185.000.000 đ",
    ref: "PO-2026-04-0812 · ORD-12815",
  },
  {
    date: "28/03/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+82.000.000 đ",
    ref: "PO-2026-03-0798 · ORD-12798",
  },
  {
    date: "25/03/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+245.000.000 đ",
    ref: "PO-2026-03-0791 · ORD-12745",
  },
];

const taxRows = [
  { label: "VAT đầu ra", value: "787.360.000 đ" },
  { label: "Thuế TNDN", value: "1.722.800.000 đ" },
  { label: "Đã nộp", value: "1.850.000.000 đ" },
];

export function SellerWalletPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Ví & Rút tiền"
        description="Quản lý số dư, rút tiền tự động về ngân hàng và báo cáo thuế"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
              <Upload data-icon="inline-start" />
              Xuất sao kê
            </Button>
            <Button className="h-9 rounded-xl px-4 text-sm">
              <Wallet data-icon="inline-start" />
              Rút tiền
            </Button>
          </div>
        }
      />

      <Card className="bg-[linear-gradient(135deg,#0d223f_0%,#153766_100%)] ring-0 shadow-sm">
        <CardContent className="px-6 py-5">
          <div className="grid gap-6 md:grid-cols-3">
            <WalletHeroStat
              label="Số dư khả dụng"
              value="284.500.000 đ"
              note="Có thể rút ngay"
              highlight
            />
            <WalletHeroStat
              label="Đang chờ về ví"
              value="148.200.000 đ"
              note="T+3 sau bàn giao"
            />
            <WalletHeroStat
              label="Tổng thu 2026"
              value="9.842.000.000 đ"
              note="+28,4% YoY"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Đã rút tháng này"
          value="680.000.000 đ"
          tone="emerald"
          icon={CreditCard}
        />
        <SellerKpiCard
          label="Phí nền tảng SDL"
          value="49.210.000 đ"
          tone="amber"
          icon={Zap}
        />
        <SellerKpiCard
          label="Thuế VAT giữ lại"
          value="787.360.000 đ"
          tone="rose"
          icon={FileText}
        />
        <SellerKpiCard
          label="Lãi tiền gửi"
          value="4.280.000 đ"
          tone="blue"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
        <Card className="rounded-xl border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lịch sử rút tiền</CardTitle>
            <CardDescription className="text-xs">
              Tự động theo lịch hằng tuần: Thứ 2 và Thứ 5
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-0">
            {transactions.map((transaction) => (
              <div
                key={transaction.ref}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <CreditCard className="size-4" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {transaction.bank}
                      </span>
                      <StatusPill tone="emerald">
                        {transaction.status}
                      </StatusPill>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.ref}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-emerald-600">
                  {transaction.amount}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="rounded-xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Cấu hình rút tự động</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
              <div className="rounded-xl border border-border/70 p-3">
                <p className="text-sm font-medium">Vietcombank</p>
                <p className="text-xs text-muted-foreground">
                  Tài khoản mặc định ••••3847
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                <InfoLine label="Lịch rút tự động" value="Thứ 2 & Thứ 5" />
                <InfoLine label="Ngưỡng tối thiểu" value="10.000.000 đ" />
              </div>
              <Button variant="outline" className="h-8 rounded-lg text-xs">
                Chỉnh sửa cấu hình
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Báo cáo thuế 2026</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-0">
              {taxRows.map((row) => (
                <InfoLine
                  key={row.label}
                  label={row.label}
                  value={row.value}
                  highlight={row.label === "Đã nộp"}
                />
              ))}
              <Separator className="my-1" />
              <Button className="h-8 rounded-lg text-xs">
                <FileText data-icon="inline-start" />
                Tải bảng kê thuế
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function WalletHeroStat({
  label,
  value,
  note,
  highlight,
}: {
  label: string;
  value: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-slate-300">{label}</p>
      <p
        className={`mt-1 text-4xl font-semibold ${highlight ? "text-amber-300" : "text-white"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-300">{note}</p>
    </div>
  );
}

function InfoLine({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={highlight ? "font-semibold text-emerald-600" : "font-medium"}
      >
        {value}
      </span>
    </div>
  );
}
