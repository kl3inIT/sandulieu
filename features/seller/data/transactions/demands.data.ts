// ─── Types ────────────────────────────────────────────────────────────────────

export type Demand = {
  id: string;
  category: string;
  type: string;
  matchLabel: string;
  name: string;
  organization: string;
  budget: string;
  deadline: string;
  score: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const demands: Demand[] = [
  {
    id: "RFQ-2026-04-0482",
    category: "Tài chính",
    type: "Enterprise",
    matchLabel: "Phù hợp 95%",
    name: "Cần dữ liệu giao dịch thẻ tín dụng 2023-2025",
    organization:
      "Ngân hàng TMCP Quốc tế (VIB) · Đăng 2 giờ trước · 4 seller đã chào",
    budget: "2.500.000.000 đ",
    deadline: "15/04/2026",
    score: "95/100",
  },
  {
    id: "RFQ-2026-04-0481",
    category: "Y tế",
    type: "Enterprise",
    matchLabel: "Phù hợp 72%",
    name: "Dữ liệu sức khỏe cộng đồng theo vùng",
    organization:
      "CTCP Bảo hiểm Bảo Việt · Đăng 5 giờ trước · 2 seller đã chào",
    budget: "800.000.000 đ",
    deadline: "20/04/2026",
    score: "72/100",
  },
  {
    id: "RFQ-2026-04-0480",
    category: "Xây dựng",
    type: "Enterprise",
    matchLabel: "Phù hợp 45%",
    name: "Dữ liệu quy hoạch đô thị 5 TP lớn",
    organization: "Vingroup Real Estate · Đăng 1 ngày trước · 6 seller đã chào",
    budget: "1.200.000.000 đ",
    deadline: "30/04/2026",
    score: "45/100",
  },
  {
    id: "RFQ-2026-04-0479",
    category: "Tài chính",
    type: "Standard",
    matchLabel: "Phù hợp 98%",
    name: "Dữ liệu tín dụng SME cho định giá rủi ro",
    organization: "PVI Insurance · Đăng 1 ngày trước · 4 seller đã chào",
    budget: "600.000.000 đ",
    deadline: "10/04/2026",
    score: "98/100",
  },
  {
    id: "RFQ-2026-04-0478",
    category: "Giao thông",
    type: "Standard",
    matchLabel: "Phù hợp 58%",
    name: "Dữ liệu giao thông và mật độ dân cư TP.HCM",
    organization: "Grab Vietnam · Đăng 2 ngày trước · 5 seller đã chào",
    budget: "450.000.000 đ",
    deadline: "25/04/2026",
    score: "58/100",
  },
];
