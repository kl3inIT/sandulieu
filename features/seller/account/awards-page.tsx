import { Trophy } from "lucide-react";

import {
  achievements,
  certifications,
} from "@/features/seller/data/account/awards.data";

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

export function SellerAwardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Chứng nhận & Giải thưởng"
        description="Hạng seller Platinum, 6 chứng nhận quốc tế và 18 huy hiệu thành tích"
      />

      <Card className="bg-[linear-gradient(135deg,#0d223f_0%,#153766_100%)] ring-0 shadow-sm">
        <CardContent className="px-6 py-5">
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
                Cần thêm: 200 đơn hàng thành công, duy trì 4,85+ sao trong 3
                tháng nữa
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Huy hiệu & Thành tích</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.title}
              className="rounded-xl border-border/70 shadow-sm"
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

      <Card className="rounded-xl border-border/70 shadow-sm">
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
