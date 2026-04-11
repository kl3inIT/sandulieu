// ─── Types ────────────────────────────────────────────────────────────────────

export type DisputeTone = "rose" | "amber" | "emerald";

export type Dispute = {
  id: string;
  labels: string[];
  status: string;
  tone: DisputeTone;
  product: string;
  context: string;
  description: string;
  deadline?: string;
  actions: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const disputes: Dispute[] = [
  {
    id: "KN-2026-04-0148",
    labels: ["Chất lượng dữ liệu", "Cao"],
    status: "Chờ phản hồi của bạn",
    tone: "rose",
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
    tone: "amber",
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
    tone: "amber",
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
    tone: "emerald",
    product: "SP-TC-005 · Dự báo kinh tế vĩ mô",
    context: "Từ: Vingroup · Mở 1 tuần trước · Giá trị liên quan: 25.000.000 đ",
    description:
      "Đã giải quyết bằng việc cung cấp thêm 2 trường dữ liệu bổ sung miễn phí.",
    actions: ["Xem đầy đủ", "Xem kết quả"],
  },
];
