import {
  CheckCircle2,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { SellerPageHeader } from "@/features/seller/shared";

const achievements = [
  {
    title: "Platinum Seller 2026",
    description: "Top 5% nhà cung cấp dữ liệu theo doanh thu và đánh giá",
    date: "Đạt 04/2026",
    tone: "amber",
    icon: Trophy,
  },
  {
    title: "Best Data Provider 2025",
    description: "Giải thưởng nhà cung cấp dữ liệu tốt nhất năm 2025",
    date: "Đạt 12/2025",
    tone: "amber",
    icon: Trophy,
  },
  {
    title: "5★ Seller 12 tháng liên tiếp",
    description: "Duy trì đánh giá 5 sao liên tục trong 12 tháng",
    date: "Đạt 03/2026",
    tone: "amber",
    icon: Star,
  },
  {
    title: "Zero Incident 2025",
    description: "Không có sự cố bảo mật nào trong năm 2025",
    date: "Đạt 01/2026",
    tone: "emerald",
    icon: ShieldCheck,
  },
  {
    title: "Fastest Growing Seller Q1/2026",
    description: "Tăng trưởng doanh thu nhanh nhất quý",
    date: "Đạt 04/2026",
    tone: "blue",
    icon: TrendingUp,
  },
  {
    title: "Top Customer Service 2025",
    description: "Phản hồi < 2 giờ để hài lòng 4.9/5",
    date: "Đạt 01/2026",
    tone: "rose",
    icon: CheckCircle2,
  },
];

const certifications = [
  {
    title: "ISO 27001",
    description:
      "Tổ chức Tiêu chuẩn Quốc tế · Cấp: 15/10/2026 · Hết hạn: 15/10/2029",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "SOC 2 Type II",
    description:
      "AICPA (American Institute of CPAs) · Cấp: 10/03/2026 · Hết hạn: 10/03/2027",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "DCAT-VN Certified",
    description:
      "Trung tâm Dữ liệu Quốc gia · Cấp: 05/02/2026 · Hết hạn: 05/02/2028",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "GDPR Compliance",
    description:
      "EU Data Protection Board · Cấp: 20/12/2025 · Hết hạn: 20/12/2026",
    status: "Sắp hết hạn",
    tone: "amber",
  },
  {
    title: "Nghị định 13/2023",
    description: "Bộ Công an Việt Nam · Cấp: 01/01/2026 · Hết hạn: 01/01/2028",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
  {
    title: "ISO 9001 QMS",
    description: "BSI Vietnam · Cấp: 15/11/2025 · Hết hạn: 15/11/2028",
    status: "Còn hiệu lực",
    tone: "emerald",
  },
];

export function SellerAwardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Chứng nhận & Giải thưởng"
        description="Hạng seller Platinum, 6 chứng nhận quốc tế và 18 huy hiệu thành tích"
      />

      <div className="rounded-2xl bg-[linear-gradient(135deg,#0d223f_0%,#153766_100%)] px-6 py-5 text-white shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex size-20 items-center justify-center rounded-full bg-amber-400 text-slate-950">
              <Trophy className="size-9" />
            </div>
            <div>
              <p className="text-sm text-slate-300">Hạng seller hiện tại</p>
              <h2 className="text-5xl font-semibold text-amber-300">
                Platinum
              </h2>
              <p className="mt-2 text-sm text-slate-200">
                Top 5% · 4,82/5 sao · Từ 03/2025
              </p>
            </div>
          </div>
          <div className="min-w-64 space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-200">
              <span>Tiến trình lên Diamond</span>
              <span>84/100</span>
            </div>
            <Progress value={84} className="h-2 rounded-full" />
            <p className="text-xs text-slate-300">
              Cần thêm: 200 đơn hàng thành công, duy trì 4,85+ sao trong 3 tháng
              nữa
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Huy hiệu & Thành tích</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.title}
              className="rounded-2xl border-border/70 shadow-sm"
            >
              <CardHeader className="pb-3">
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl ${
                    achievement.tone === "amber"
                      ? "bg-amber-500/10 text-amber-600"
                      : achievement.tone === "emerald"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : achievement.tone === "blue"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-rose-500/10 text-rose-600"
                  }`}
                >
                  <achievement.icon className="size-5" />
                </div>
                <CardTitle className="mt-3 text-sm">
                  {achievement.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {achievement.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge
                  variant="outline"
                  className="rounded-full px-2 py-0 text-[10px]"
                >
                  {achievement.date}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            Chứng nhận quốc tế & tuân thủ
          </CardTitle>
          <CardDescription className="text-xs">
            Các chứng nhận độc lập xác nhận chất lượng và tuân thủ của CTCP Dữ
            liệu Tài chính Việt
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {certifications.map((certification) => (
            <div
              key={certification.title}
              className="rounded-xl border border-border/70 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{certification.title}</p>
                <Badge
                  className={
                    certification.tone === "amber"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  }
                >
                  {certification.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {certification.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
