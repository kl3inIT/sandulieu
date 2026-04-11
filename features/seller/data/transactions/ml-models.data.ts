import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  MessageSquare,
  Package,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MlModelTone = "emerald" | "amber";

export type MlModel = {
  id: string;
  task: string;
  status: string;
  tone: MlModelTone;
  name: string;
  accuracy: number | null;
  downloads: number;
  revenue: string;
  framework: string;
  dataFrom: string;
};

export type MlTool = {
  name: string;
  description: string;
  icon: LucideIcon;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const mlModels: MlModel[] = [
  {
    id: "ML-CRD-001",
    task: "Classification",
    status: "Đã xuất bản",
    tone: "emerald",
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
    tone: "emerald",
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
    tone: "emerald",
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
    tone: "emerald",
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
    tone: "amber",
    name: "Customer Segmentation Engine",
    accuracy: null,
    downloads: 0,
    revenue: "—",
    framework: "K-Means + DBSCAN",
    dataFrom: "—",
  },
];

export const mlTools: MlTool[] = [
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
