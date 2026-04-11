// ─── Types ────────────────────────────────────────────────────────────────────

export type AuditEventTone = "blue" | "amber" | "rose";

export type AuditEvent = {
  code: string;
  role: string;
  actor: string;
  action: string;
  target: string;
  tone: AuditEventTone;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const auditEvents: AuditEvent[] = [
  {
    code: "product_price_update",
    role: "Owner",
    actor: "Trần Thị Mai",
    action: "Cập nhật giá từ 45M → 48M VND",
    target: "Target: SP-TC-001 · IP: 14.237.83.14 · 05/04/2026 14:32:18",
    tone: "blue",
  },
  {
    code: "rfq_offer_sent",
    role: "Sales Manager",
    actor: "Nguyễn Quang Huy",
    action: "Gửi chào giá 2,28B tới VIB",
    target: "Target: RFQ-2026-04-0482 · IP: 14.237.83.15 · 05/04/2026 14:08:42",
    tone: "blue",
  },
  {
    code: "schema_update",
    role: "Data Engineer",
    actor: "Phạm Văn Minh",
    action: "Thêm field 'source_timestamp' vào schema v2.4",
    target: "Target: SP-TC-003 · IP: 14.237.83.18 · 05/04/2026 14:15:06",
    tone: "amber",
  },
  {
    code: "payout_withdraw",
    role: "Finance",
    actor: "Lê Thị Hà",
    action: "Rút 185M VND về ngân hàng",
    target:
      "Target: Vietcombank ••••3847 · IP: 14.237.83.22 · 05/04/2026 13:24:15",
    tone: "blue",
  },
  {
    code: "team_invite",
    role: "Owner",
    actor: "Trần Thị Mai",
    action: "Mời thành viên mới với role Support Agent",
    target: "Target: user-ngoc · IP: 14.237.83.24 · 05/04/2026 12:08:30",
    tone: "blue",
  },
  {
    code: "storefront_seo_update",
    role: "Content Manager",
    actor: "Hoàng Thị Lan",
    action: "Cập nhật meta description và keywords",
    target: "Target: storefront · IP: 14.237.83.22 · 05/04/2026 11:32:45",
    tone: "blue",
  },
  {
    code: "policy_create",
    role: "Owner",
    actor: "Trần Thị Mai",
    action: "Tạo policy mới cho Enterprise tier",
    target:
      "Target: enterprise-policy · IP: 14.237.83.24 · 05/04/2026 10:45:20",
    tone: "blue",
  },
  {
    code: "auth_failed",
    role: "Critical",
    actor: "System",
    action: "5 lần đăng nhập thất bại, đã khóa IP",
    target: "Target: unknown@attacker.ru · IP: 203.x.x.x · 05/04/2026 09:18:08",
    tone: "rose",
  },
  {
    code: "customer_view",
    role: "Sales Manager",
    actor: "Nguyễn Quang Huy",
    action: "Xem hồ sơ khách hàng",
    target: "Target: CUST-001 · IP: 14.237.83.15 · 05/04/2026 08:52:12",
    tone: "blue",
  },
  {
    code: "payout_scheduled",
    role: "System",
    actor: "System",
    action: "Chạy lịch rút tiền tự động (Thứ 2)",
    target: "Target: auto-payout · IP: internal · 05/04/2026 08:16:30",
    tone: "blue",
  },
];
