// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderTone = "emerald" | "amber" | "blue" | "rose";

export type Order = {
  id: string;
  date: string;
  customer: string;
  product: string;
  delivery: string;
  value: string;
  contract: string;
  status: string;
  tone: OrderTone;
  actionLabel?: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const orders: Order[] = [
  {
    id: "ORD-2026-04-12847",
    date: "05/04/2026",
    customer: "Ngân hàng TMCP Việt Nam",
    product: "Báo cáo tín dụng DN Q1/2026",
    delivery: "API",
    value: "48.000.000 đ",
    contract: "HĐ-2026-0412",
    status: "Hoàn tất",
    tone: "emerald",
  },
  {
    id: "ORD-2026-04-12846",
    date: "05/04/2026",
    customer: "CTCP Chứng khoán HCM",
    product: "Dữ liệu tỷ giá realtime",
    delivery: "WebSocket",
    value: "120.000.000 đ",
    contract: "HĐ-2026-0411",
    status: "Đang bàn giao",
    tone: "blue",
  },
  {
    id: "ORD-2026-04-12845",
    date: "04/04/2026",
    customer: "Vietnam Airlines",
    product: "Dự báo kinh tế vĩ mô 2026",
    delivery: "CSV",
    value: "25.000.000 đ",
    contract: "HĐ-2026-0410",
    status: "Hoàn tất",
    tone: "emerald",
  },
  {
    id: "ORD-2026-04-12844",
    date: "04/04/2026",
    customer: "VNG Corporation",
    product: "DS DN niêm yết HOSE/HNX",
    delivery: "API",
    value: "18.000.000 đ",
    contract: "HĐ-2026-0409",
    status: "Đang xử lý",
    tone: "amber",
    actionLabel: "Bàn giao",
  },
  {
    id: "ORD-2026-04-12843",
    date: "03/04/2026",
    customer: "Techcombank",
    product: "Chỉ số rủi ro tín dụng SME",
    delivery: "API",
    value: "32.000.000 đ",
    contract: "HĐ-2026-0408",
    status: "Đang bàn giao",
    tone: "blue",
  },
  {
    id: "ORD-2026-04-12842",
    date: "03/04/2026",
    customer: "PVComBank",
    product: "Báo cáo tín dụng DN Q1/2026",
    delivery: "API + CSV",
    value: "48.000.000 đ",
    contract: "HĐ-2026-0407",
    status: "Ký HĐ",
    tone: "amber",
    actionLabel: "Ký số",
  },
  {
    id: "ORD-2026-04-12841",
    date: "02/04/2026",
    customer: "SSI Securities",
    product: "Dữ liệu lịch sử CK 2020-2025",
    delivery: "Parquet",
    value: "85.000.000 đ",
    contract: "HĐ-2026-0406",
    status: "Hoàn tất",
    tone: "emerald",
  },
];
