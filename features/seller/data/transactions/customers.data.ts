// ─── Types ────────────────────────────────────────────────────────────────────

export type CustomerTone = "amber" | "emerald" | "blue" | "rose";

export type Customer = {
  name: string;
  code: string;
  segment: string;
  tier: string;
  orders: number;
  ltv: string;
  lastOrder: string;
  rating: string;
  status: string;
  tone: CustomerTone;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const customers: Customer[] = [
  {
    name: "Ngân hàng TMCP Việt Nam (VCB)",
    code: "CUST-001",
    segment: "Ngân hàng",
    tier: "Enterprise",
    orders: 84,
    ltv: "2.840.000.000 đ",
    lastOrder: "05/04/2026",
    rating: "5",
    status: "VIP",
    tone: "amber",
  },
  {
    name: "CTCP Chứng khoán SSI",
    code: "CUST-002",
    segment: "Chứng khoán",
    tier: "Enterprise",
    orders: 62,
    ltv: "2.480.000.000 đ",
    lastOrder: "04/04/2026",
    rating: "5",
    status: "VIP",
    tone: "amber",
  },
  {
    name: "VietinBank",
    code: "CUST-003",
    segment: "Ngân hàng",
    tier: "Enterprise",
    orders: 48,
    ltv: "1.820.000.000 đ",
    lastOrder: "02/04/2026",
    rating: "4.8",
    status: "Hoạt động",
    tone: "emerald",
  },
  {
    name: "Techcombank",
    code: "CUST-004",
    segment: "Ngân hàng",
    tier: "Enterprise",
    orders: 42,
    ltv: "1.680.000.000 đ",
    lastOrder: "28/03/2026",
    rating: "4.7",
    status: "Hoạt động",
    tone: "emerald",
  },
  {
    name: "Vingroup JSC",
    code: "CUST-005",
    segment: "Bất động sản",
    tier: "Enterprise",
    orders: 36,
    ltv: "1.240.000.000 đ",
    lastOrder: "25/03/2026",
    rating: "4.9",
    status: "Hoạt động",
    tone: "emerald",
  },
  {
    name: "VNG Corporation",
    code: "CUST-006",
    segment: "Công nghệ",
    tier: "Gold",
    orders: 28,
    ltv: "820.000.000 đ",
    lastOrder: "20/03/2026",
    rating: "4.6",
    status: "Hoạt động",
    tone: "emerald",
  },
  {
    name: "Ngân hàng TMCP Quốc tế (VIB)",
    code: "CUST-007",
    segment: "Ngân hàng",
    tier: "Enterprise",
    orders: 22,
    ltv: "940.000.000 đ",
    lastOrder: "05/04/2026",
    rating: "4.8",
    status: "Mới",
    tone: "blue",
  },
  {
    name: "PVI Insurance",
    code: "CUST-008",
    segment: "Bảo hiểm",
    tier: "Gold",
    orders: 18,
    ltv: "540.000.000 đ",
    lastOrder: "18/03/2026",
    rating: "4.5",
    status: "Hoạt động",
    tone: "emerald",
  },
  {
    name: "CTCP FinTech Việt",
    code: "CUST-009",
    segment: "FinTech",
    tier: "Standard",
    orders: 12,
    ltv: "280.000.000 đ",
    lastOrder: "15/03/2026",
    rating: "4.4",
    status: "At risk",
    tone: "rose",
  },
  {
    name: "PVComBank",
    code: "CUST-010",
    segment: "Ngân hàng",
    tier: "Gold",
    orders: 8,
    ltv: "180.000.000 đ",
    lastOrder: "02/03/2026",
    rating: "4.3",
    status: "At risk",
    tone: "rose",
  },
];
