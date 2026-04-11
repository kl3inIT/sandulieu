// ─── Types ────────────────────────────────────────────────────────────────────

export type WalletTransaction = {
  date: string;
  bank: string;
  status: string;
  amount: string;
  ref: string;
};

export type TaxRow = {
  label: string;
  value: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const walletTransactions: WalletTransaction[] = [
  {
    date: "05/04/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+48.000.000 đ",
    ref: "PO-2026-04-0824 · ORD-12847",
  },
  {
    date: "02/04/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+120.000.000 đ",
    ref: "PO-2026-04-0818 · ORD-12824",
  },
  {
    date: "01/04/2026",
    bank: "Techcombank ••••9821",
    status: "Hoàn tất",
    amount: "+185.000.000 đ",
    ref: "PO-2026-04-0812 · ORD-12815",
  },
  {
    date: "28/03/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+82.000.000 đ",
    ref: "PO-2026-03-0798 · ORD-12798",
  },
  {
    date: "25/03/2026",
    bank: "Vietcombank ••••3847",
    status: "Hoàn tất",
    amount: "+245.000.000 đ",
    ref: "PO-2026-03-0791 · ORD-12745",
  },
];

export const taxRows: TaxRow[] = [
  { label: "VAT đầu ra", value: "787.360.000 đ" },
  { label: "Thuế TNDN", value: "1.722.800.000 đ" },
  { label: "Đã nộp", value: "1.850.000.000 đ" },
];
