// ─── Types ────────────────────────────────────────────────────────────────────

export type BookingSlot = {
  title: string;
  detail: string;
};

export type AccountManager = {
  name: string;
  initials: string;
  title: string;
  availability: string;
  phone: string;
  email: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const bookingSlots: BookingSlot[] = [
  {
    title: "Tư vấn định giá sản phẩm",
    detail: "Chuyên gia Kinh tế SDL · 30 phút",
  },
  { title: "Hỗ trợ tích hợp API & SDK", detail: "Senior Engineer · 45 phút" },
  { title: "Review chiến lược tháng", detail: "Account Manager · 60 phút" },
  {
    title: "Đào tạo Clean Room & Privacy",
    detail: "Data Privacy Specialist · 90 phút",
  },
];

export const supportDocs: string[] = [
  "Hướng dẫn định giá sản phẩm dữ liệu",
  "Chiến lược marketing cho Platinum Seller",
  "Tích hợp API cho seller",
  "Quy trình thẩm định & SLA",
  "Best practices bảo mật dữ liệu",
  "Chính sách phí & thanh toán",
];

export const accountManager: AccountManager = {
  name: "Hoàng Thị Ngọc",
  initials: "HN",
  title: "Senior Account Manager",
  availability: "Online · Phản hồi ngay",
  phone: "0912 345 678",
  email: "ngoc.ht.ngl@sdl.gov.vn",
};
