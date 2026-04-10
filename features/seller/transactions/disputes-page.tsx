import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";

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

const disputes = [
  {
    id: "KN-2026-04-0148",
    labels: ["Chất lượng dữ liệu", "Cao"],
    status: "Chờ phản hồi của bạn",
    tone: "rose" as const,
    product: "SP-TC-003 · Chỉ số rủi ro SME",
    context:
      "Từ: Techcombank · Mở 4 giờ trước · Giá trị liên quan: 32.000.000 đ",
    description:
      "Phản ánh 3% bản ghi có schema không khớp spec, thiếu trường credit_grade trong 842 record.",
    deadline: "Hạn phản hồi còn: 44 giờ",
    actions: ["Xem đầy đủ", "Phản hồi", "Chat với buyer"],
  },
  {
    id: "KN-2026-04-0142",
    labels: ["Vi phạm SLA", "Cao"],
    status: "Đang hòa giải",
    tone: "amber" as const,
    product: "SP-TC-006 · Bộ DL lịch sử CK",
    context:
      "Từ: VietinBank · Mở 1 ngày trước · Giá trị liên quan: 85.000.000 đ",
    description:
      "Thời gian hoạt động API trong tuần qua chỉ đạt 99,2% (SLA cam kết 99,95%). Yêu cầu bồi thường.",
    deadline: "Hạn phản hồi còn: 24 giờ",
    actions: ["Xem đầy đủ", "Phản hồi", "Chat với buyer"],
  },
  {
    id: "KN-2026-04-0118",
    labels: ["Yêu cầu hoàn tiền", "Trung bình"],
    status: "Đang xem xét",
    tone: "amber" as const,
    product: "SP-TC-001 · Báo cáo tín dụng DN",
    context:
      "Từ: CTCP FinTech Việt · Mở 3 ngày trước · Giá trị liên quan: 18.000.000 đ",
    description:
      "Khách hàng yêu cầu hoàn 50% do dataset không bao phủ đủ ngành nghề như quảng cáo.",
    actions: ["Xem đầy đủ", "Phản hồi", "Chat với buyer"],
  },
  {
    id: "KN-2026-04-0098",
    labels: ["Chất lượng dữ liệu", "Trung bình"],
    status: "Đã giải quyết",
    tone: "emerald" as const,
    product: "SP-TC-005 · Dự báo kinh tế vĩ mô",
    context: "Từ: Vingroup · Mở 1 tuần trước · Giá trị liên quan: 25.000.000 đ",
    description:
      "Đã giải quyết bằng việc cung cấp thêm 2 trường dữ liệu bổ sung miễn phí.",
    actions: ["Xem đầy đủ", "Xem kết quả"],
  },
];

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
            className="rounded-2xl border-border/70 shadow-sm"
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

      <Card className="rounded-2xl border-border/70 bg-muted/30 shadow-sm">
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
