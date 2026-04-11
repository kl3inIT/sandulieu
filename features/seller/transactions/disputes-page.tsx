import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";

import { disputes } from "@/features/seller/data/transactions/disputes.data";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  SellerKpiCard,
  SellerPageHeader,
  StatusPill,
} from "@/features/seller/shared";

export function SellerDisputesPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Khiếu nại & Tranh chấp"
        description="Xử lý khiếu nại từ khách hàng về chất lượng, SLA, hoàn tiền và phản hồi nhanh để giữ hạng Platinum"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Đang chờ phản hồi"
          value="2"
          tone="rose"
          icon={AlertTriangle}
        />
        <SellerKpiCard
          label="Đang hòa giải"
          value="1"
          tone="amber"
          icon={Clock}
        />
        <SellerKpiCard
          label="Đã giải quyết 2026"
          value="18"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Thời gian xử lý TB"
          value="28 giờ"
          tone="blue"
          icon={Zap}
        />
      </div>

      <div className="flex flex-col gap-4">
        {disputes.map((dispute) => (
          <Card
            key={dispute.id}
            className="rounded-xl border-border/70 shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                      dispute.tone === "rose"
                        ? "bg-rose-500/10 text-rose-600"
                        : dispute.tone === "amber"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-emerald-500/10 text-emerald-600"
                    }`}
                  >
                    <AlertTriangle className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {dispute.id}
                      </span>
                      {dispute.labels.map((label) => (
                        <Badge
                          key={label}
                          variant="outline"
                          className="rounded-full px-2 py-0 text-[10px]"
                        >
                          {label}
                        </Badge>
                      ))}
                      <StatusPill tone={dispute.tone}>
                        {dispute.status}
                      </StatusPill>
                    </div>
                    <CardTitle className="text-sm">{dispute.product}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {dispute.context}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  {dispute.actions.map((action) => (
                    <Button
                      key={action}
                      variant={action === "Phản hồi" ? "default" : "outline"}
                      className="h-8 rounded-lg px-3 text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                {dispute.description}
              </p>
              {dispute.deadline ? (
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-rose-600">
                  <Clock className="size-3.5" />
                  {dispute.deadline}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border-border/70 bg-muted/30 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            Chính sách xử lý khiếu nại SDL
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            Bên bán phải phản hồi trong 48 giờ từ khi khiếu nại được mở. Quá hạn
            sẽ ảnh hưởng tới điểm xếp hạng bên bán.
          </p>
          <p>
            Nếu không giải quyết được trong 7 ngày, khiếu nại sẽ được chuyển
            sang Hội đồng hòa giải SDL.
          </p>
          <p>
            Khiếu nại nghiêm trọng về PII, gian lận hoặc bảo mật sẽ được chuyển
            thẳng CB-SDL để thẩm định sản phẩm.
          </p>
          <p>
            Bên bán có quyền kháng cáo phán quyết của Hội đồng trong 14 ngày.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
