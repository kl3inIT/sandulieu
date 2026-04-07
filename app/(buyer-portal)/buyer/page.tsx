const buyerStats = [
  { label: "Đơn đang xử lý", value: "184", note: "Trong 24 giờ qua" },
  { label: "Nhà cung cấp hoạt động", value: "36", note: "Đã đồng bộ dữ liệu" },
  { label: "Chi tiêu tháng này", value: "4.8B", note: "Tăng 9.4%" },
];

const buyerQueue = [
  "Phê duyệt đơn mua vượt ngân sách.",
  "Đồng bộ danh mục sản phẩm mới từ seller.",
  "Kiểm tra chênh lệch dữ liệu báo giá.",
];

export default function BuyerPortalPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(255,255,255,0.03))] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">
            Buyer overview
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Buyer portal đã được tách riêng để bạn thêm features theo domain.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Từ đây bạn có thể đưa React Query, bảng đơn hàng, pricing workflow
            và các module tìm kiếm sản phẩm vào đúng scope buyer.
          </p>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          {buyerStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-400">{stat.note}</p>
            </article>
          ))}
        </div>
      </section>

      <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <h3 className="text-lg font-semibold">Danh sách cần xử lý</h3>
        <div className="mt-5 space-y-3">
          {buyerQueue.map((task) => (
            <div
              key={task}
              className="rounded-2xl border border-white/8 bg-[#0b1624] px-4 py-4 text-sm text-slate-300"
            >
              {task}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
