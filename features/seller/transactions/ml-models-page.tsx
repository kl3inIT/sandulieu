import {
  BrainCircuit,
  CheckCircle2,
  Download,
  Eye,
  MessageSquare,
  Package,
  Sparkles,
  TrendingUp,
  Zap,
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
import { Progress } from "@/shared/components/ui/progress";
import {
  SellerKpiCard,
  SellerPageHeader,
  StatusPill,
} from "@/features/seller/shared";

const mlModels = [
  {
    id: "ML-CRD-001",
    task: "Classification",
    status: "Đã xuất bản",
    tone: "emerald" as const,
    name: "SME Credit Scoring Model",
    accuracy: 96.2,
    downloads: 248,
    revenue: "48.000.000 đ",
    framework: "XGBoost",
    dataFrom: "18 sản phẩm seller",
  },
  {
    id: "ML-FRD-002",
    task: "Binary Classification",
    status: "Đã xuất bản",
    tone: "emerald" as const,
    name: "Transaction Fraud Detector",
    accuracy: 98.5,
    downloads: 142,
    revenue: "64.000.000 đ",
    framework: "LightGBM",
    dataFrom: "7 nguồn giao dịch",
  },
  {
    id: "ML-TRD-003",
    task: "Time Series",
    status: "Đã xuất bản",
    tone: "emerald" as const,
    name: "Market Trend Forecaster",
    accuracy: 89.4,
    downloads: 82,
    revenue: "42.000.000 đ",
    framework: "LSTM + ARIMA",
    dataFrom: "12 dòng dữ liệu tài chính",
  },
  {
    id: "ML-NLP-004",
    task: "NLP",
    status: "Đã xuất bản",
    tone: "emerald" as const,
    name: "Financial News Sentiment",
    accuracy: 92.8,
    downloads: 48,
    revenue: "24.000.000 đ",
    framework: "BERT + Sentiment",
    dataFrom: "News feed + social",
  },
  {
    id: "ML-SEG-005",
    task: "Clustering",
    status: "Bản nháp",
    tone: "amber" as const,
    name: "Customer Segmentation Engine",
    accuracy: null,
    downloads: 0,
    revenue: "—",
    framework: "K-Means + DBSCAN",
    dataFrom: "—",
  },
];

const mlTools = [
  {
    name: "AutoML Builder",
    description: "Huấn luyện tự động với hơn 20 models, chọn best performance",
    icon: Sparkles,
  },
  {
    name: "Model Registry",
    description: "Quản lý version, staging/production deployment, rollback",
    icon: Package,
  },
  {
    name: "Performance Monitoring",
    description: "Drift detection, auto-retrain khi accuracy giảm",
    icon: TrendingUp,
  },
  {
    name: "Model Governance",
    description: "Bias testing, explainability (SHAP/LIME), compliance",
    icon: CheckCircle2,
  },
  {
    name: "Fine-tuning Service",
    description:
      "Buyer thuê fine-tune model trên dữ liệu của họ qua Clean Room",
    icon: Zap,
  },
  {
    name: "Model Consulting",
    description: "Tư vấn mô hình phù hợp cho buyer enterprise và ngành dọc",
    icon: MessageSquare,
  },
];

export function SellerMlModelsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="AI/ML Model Marketplace"
        description="Đóng gói pre-trained models, AutoML as a service và mô hình fine-tune theo demand"
        actions={
          <div className="flex items-center gap-2">
            <Badge>AutoML</Badge>
            <Button className="h-9 rounded-xl px-4 text-sm">
              <BrainCircuit data-icon="inline-start" />
              Đăng model mới
            </Button>
          </div>
        }
      />

      <div className="rounded-2xl bg-[linear-gradient(135deg,#11284e_0%,#0f2544_100%)] px-5 py-4 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
              <BrainCircuit className="size-6" />
            </div>
            <div>
              <Badge className="mb-2 bg-amber-400 text-slate-950">
                Chức năng mở rộng
              </Badge>
              <h2 className="text-xl font-semibold">Chợ mô hình AI/ML</h2>
              <p className="text-sm text-slate-200">
                Biến dữ liệu của bạn thành mô hình AI cao cấp, tận dụng 18 sản
                phẩm dữ liệu để huấn luyện mô hình chuyên ngành.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-300">Models đang bán</p>
              <p className="text-2xl font-semibold">5</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right">
              <p className="text-xs text-slate-300">Revenue 2026</p>
              <p className="text-2xl font-semibold text-amber-300">
                2.260.000.000 đ
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Models published"
          value="4"
          tone="blue"
          icon={BrainCircuit}
        />
        <SellerKpiCard
          label="Tổng downloads"
          value="520"
          tone="emerald"
          icon={Download}
          delta="+42.5%"
        />
        <SellerKpiCard
          label="Revenue 2026"
          value="2.260.000.000 đ"
          tone="emerald"
          icon={TrendingUp}
          delta="+68.4%"
        />
        <SellerKpiCard
          label="Accuracy TB"
          value="94,3%"
          tone="amber"
          icon={Zap}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mlModels.map((model) => (
          <Card
            key={model.id}
            className="rounded-xl border-border/70 shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                    <BrainCircuit className="size-5" />
                  </div>
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {model.id}
                      </span>
                      <Badge
                        variant="outline"
                        className="rounded-full px-2 py-0 text-[10px]"
                      >
                        {model.task}
                      </Badge>
                      <StatusPill tone={model.tone}>{model.status}</StatusPill>
                    </div>
                    <CardTitle className="text-sm">{model.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {model.framework} · Data từ {model.dataFrom}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg"
                >
                  <Eye />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid grid-cols-4 gap-3 text-xs">
                <MetricCell
                  label="Accuracy"
                  value={model.accuracy ? `${model.accuracy}%` : "—"}
                  tone="emerald"
                />
                <MetricCell label="Downloads" value={`${model.downloads}`} />
                <MetricCell
                  label="Revenue"
                  value={model.revenue}
                  tone="amber"
                />
                <MetricCell
                  label="QL"
                  value={model.revenue === "—" ? "—" : "Đủ"}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-8 flex-1 rounded-lg text-xs"
                >
                  Xem
                </Button>
                <Button
                  variant="outline"
                  className="h-8 flex-1 rounded-lg text-xs"
                >
                  Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mlTools.map((tool) => (
          <Card
            key={tool.name}
            className="rounded-xl border-border/70 shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <tool.icon className="size-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-2 text-sm">{tool.name}</CardTitle>
              <CardDescription className="text-xs">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                className="h-8 w-full rounded-lg text-xs"
              >
                Chạy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Hiệu suất models</CardTitle>
          <CardDescription className="text-xs">
            Metrics production của 4 models đang deploy
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {mlModels
            .filter((model) => model.accuracy !== null)
            .map((model) => (
              <div
                key={model.id}
                className="flex flex-col gap-2 lg:flex-row lg:items-center"
              >
                <div className="w-full lg:w-64">
                  <p className="text-sm font-medium">{model.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {model.id} · {model.framework}
                  </p>
                </div>
                <Progress
                  value={model.accuracy ?? 0}
                  className="h-2 flex-1 rounded-full"
                />
                <p className="w-28 text-right text-xs font-medium text-amber-600">
                  {model.accuracy}% accuracy
                </p>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "amber";
}) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p
        className={`font-semibold ${
          tone === "emerald"
            ? "text-emerald-600"
            : tone === "amber"
              ? "text-amber-600"
              : "text-primary"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
