// ─── Types ────────────────────────────────────────────────────────────────────

export type QualityDimension = {
  label: string;
  v: number;
};

export type QualityProduct = {
  id: string;
  name: string;
  score: number;
  grade: string;
  status: string;
  tone: "emerald" | "amber" | "rose";
  dims: QualityDimension[];
};

export type Anomaly = {
  severity: "rose" | "amber" | "blue";
  msg: string;
  time: string;
  product: string;
};

export type ReviewScoreDim = {
  label: string;
  done: boolean;
};

export type ReviewItem = {
  id: string;
  name: string;
  status: string;
  tone: "emerald" | "amber";
  submitted: string;
  reviewers: number;
  progress: number;
  scoreDims: ReviewScoreDim[];
};

export type ScorecardRow = {
  label: string;
  score: number;
  right: string;
  rscore: number;
};

export type License = {
  name: string;
  subscribers: number;
  color: string;
  features: string[];
  description: string;
};

export type PolicyAuditEntry = {
  time: string;
  type: string;
  msg: string;
  severity: string;
};

export type UpstreamSource = {
  name: string;
  desc: string;
  products: number;
};

// ─── Data Quality Dashboard ───────────────────────────────────────────────────

export const qualityProducts: QualityProduct[] = [
  {
    id: "SP-TC-001",
    name: "Báo cáo tín dụng DN toàn diện",
    score: 94,
    grade: "A",
    status: "Score 94/100",
    tone: "emerald",
    dims: [
      { label: "Accuracy", v: 96 },
      { label: "Completeness", v: 98 },
      { label: "Timeliness", v: 92 },
      { label: "Consistency", v: 90 },
    ],
  },
  {
    id: "SP-TC-007",
    name: "Bộ DL lịch sử CK 2020-2023",
    score: 99,
    grade: "A+",
    status: "Score 99/100",
    tone: "emerald",
    dims: [
      { label: "Accuracy", v: 99 },
      { label: "Completeness", v: 100 },
      { label: "Timeliness", v: 98 },
      { label: "Consistency", v: 99 },
    ],
  },
  {
    id: "SP-TC-003",
    name: "Dữ liệu tỷ giá 28 cặp",
    score: 88,
    grade: "B+",
    status: "1 anomalies",
    tone: "amber",
    dims: [
      { label: "Accuracy", v: 90 },
      { label: "Completeness", v: 88 },
      { label: "Timeliness", v: 85 },
      { label: "Consistency", v: 89 },
    ],
  },
  {
    id: "SP-TC-002",
    name: "Chỉ số thị trường CK realtime",
    score: 91,
    grade: "A",
    status: "Score 91/100",
    tone: "emerald",
    dims: [
      { label: "Accuracy", v: 94 },
      { label: "Completeness", v: 92 },
      { label: "Timeliness", v: 99 },
      { label: "Consistency", v: 85 },
    ],
  },
];

export const anomalies: Anomaly[] = [
  {
    severity: "rose",
    msg: "completeness giảm 8.7% — 5% có thể bị trì hoãn thiếu lúc",
    time: "3 phút trước",
    product: "SP-TC-003",
  },
  {
    severity: "amber",
    msg: "Phát hiện 3% records có accuracy đất bất thường (Timeliness 3.5 s)",
    time: "12 phút trước",
    product: "SP-TC-003",
  },
  {
    severity: "amber",
    msg: "Completeness giảm: 4 field 'sources_timestamp' vào schema 2.4",
    time: "25/04/2026 10:05",
    product: "SP-TC-001",
  },
  {
    severity: "blue",
    msg: "Lele delivery: batch (4/26) chậm 6 phút",
    time: "25/04/2026 10:05",
    product: "SP-TC-003",
  },
];

// ─── Thẩm định chất lượng & giá ──────────────────────────────────────────────

export const reviewItems: ReviewItem[] = [
  {
    id: "SP-TC-009",
    name: "Báo cáo tín dụng SME Q1/2026",
    status: "Đang thẩm định",
    tone: "amber",
    submitted: "03/04/2026",
    reviewers: 3,
    progress: 75,
    scoreDims: [
      { label: "Tiếp nhận", done: true },
      { label: "Xem xét hồ sơ", done: true },
      { label: "Chấm điểm Q", done: false },
      { label: "Thẩm tra giá", done: false },
      { label: "Kết quả cuối", done: false },
    ],
  },
  {
    id: "SP-TC-010",
    name: "Chỉ số rủi ro tín dụng SME",
    status: "Đang thẩm định",
    tone: "amber",
    submitted: "01/04/2026",
    reviewers: 3,
    progress: 48,
    scoreDims: [
      { label: "Tiếp nhận", done: true },
      { label: "Xem xét hồ sơ", done: true },
      { label: "Chấm điểm Q", done: false },
      { label: "Thẩm tra giá", done: false },
      { label: "Kết quả cuối", done: false },
    ],
  },
  {
    id: "SP-TC-007",
    name: "Dự báo kinh tế vĩ mô 2026-2027",
    status: "Đã phê duyệt",
    tone: "emerald",
    submitted: "18/03/2026",
    reviewers: 3,
    progress: 100,
    scoreDims: [
      { label: "Tiếp nhận", done: true },
      { label: "Xem xét hồ sơ", done: true },
      { label: "Chấm điểm Q", done: true },
      { label: "Thẩm tra giá", done: true },
      { label: "Kết quả cuối", done: true },
    ],
  },
];

export const scorecardRows: ScorecardRow[] = [
  {
    label: "Tính chính xác (Accuracy)",
    score: 92,
    right: "Độ đầy đủ (Completeness)",
    rscore: 88,
  },
  {
    label: "Tính nhất quán (Consistency)",
    score: 87,
    right: "Tính kịp thời (Timeliness)",
    rscore: 85,
  },
  {
    label: "Hợp lệ (Validity)",
    score: 90,
    right: "Tính duy nhất (Uniqueness)",
    rscore: 94,
  },
];

// ─── Policies (IDSA ODRL) ─────────────────────────────────────────────────────

export const licenses: License[] = [
  {
    name: "Standard License",
    subscribers: 3,
    color: "blue",
    features: [
      "Giới hạn 15 thành",
      "Tối đa 3 thành viên",
      "Chỉ nội bộ tổ chức",
    ],
    description: "Dành cho khách hàng tổ chức vừa nhỏ — Phù hợp thị trường",
  },
  {
    name: "Enterprise License",
    subscribers: 5,
    color: "violet",
    features: [
      "Giới hạn 25 thành",
      "Tối đa 25 thành viên",
      "Chi phép nhà phân phối",
      "Cập nhật SLA",
    ],
    description: "Dành cho khách hàng Enterprise — nhiều quyền hơn",
  },
  {
    name: "Research License",
    subscribers: 1,
    color: "emerald",
    features: ["Phi thương mại", "Công bố kết quả", "Chỉ nghiên cứu"],
    description: "Dành cho viện nghiên cứu học thuật",
  },
  {
    name: "Open Data License",
    subscribers: 2,
    color: "amber",
    features: ["Không giới hạn", "Cho phép tái phân phối", "Không đăng ký CL"],
    description: "Dữ liệu mở — không phí, không hạn chế",
  },
];

export const policyAudit: PolicyAuditEntry[] = [
  {
    time: "25/04 10:44",
    type: "auto-delete",
    msg: "Auto-delete chạy lúc 07:44 xóa cải bị 57/11 văn bản 45 → 45VNĐ",
    severity: "blue",
  },
  {
    time: "25/04 09:10",
    type: "warning",
    msg: "Warning: 2018-34 không nhận được dữ liệu cập nhật trong 10h",
    severity: "amber",
  },
  {
    time: "24/04 16:20",
    type: "policy",
    msg: "Policy đã chặt: 1/6 dụng cụ SP-TK-01 97 yêu cầu tải website lần thứ chưa giờ",
    severity: "rose",
  },
  {
    time: "24/04 14:37",
    type: "log",
    msg: "Log key: 8/30 được renew to schema v3.4",
    severity: "emerald",
  },
];

// ─── Lineage & Provenance ─────────────────────────────────────────────────────

export const upstreamSources: UpstreamSource[] = [
  {
    name: "Cục Quản lý Đăng ký Kinh doanh ICQNN",
    desc: "Bộ Kế hoạch và Đầu tư",
    products: 6,
  },
  {
    name: "Tổng cục Thuế",
    desc: "Bộ Tài chính - cập nhật hằng ngày",
    products: 6,
  },
  { name: "Bảo hiểm Xã hội Việt Nam", desc: "BHXH - hằng tháng", products: 4 },
  {
    name: "CIC Vietnam - Credit Bureau",
    desc: "NHNN - T+1 business day",
    products: 6,
  },
  {
    name: "14 ngân hàng đối tác (Federated)",
    desc: "Hợp đồng độc quyền 3 năm",
    products: 4,
  },
  {
    name: "VineID Identity Verification",
    desc: "VNPT - realtime webhook",
    products: 11,
  },
];
