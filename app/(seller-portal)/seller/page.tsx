const sellerStats = [
  { label: "Sản phẩm đang bán", value: "2.184", note: "Catalog khả dụng" },
  { label: "Đơn chờ xác nhận", value: "72", note: "Cập nhật mỗi 5 phút" },
  { label: "Doanh thu tuần", value: "980M", note: "Tăng 12.7%" },
];

const sellerTasks = [
  "Rà soát sản phẩm thiếu thuộc tính dữ liệu.",
  "Đẩy batch đồng bộ giá mới cho buyer.",
  "Kiểm tra hiệu suất gian hàng theo ngành hàng.",
];

export default function SellerPortalPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.18),rgba(255,255,255,0.03))] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-emerald-200">
            Seller overview
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Seller portal đã có layout riêng cho catalog và dữ liệu bán hàng.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Đây là điểm vào phù hợp để tách features cho catalog, onboarding
            seller, tồn kho và các truy vấn báo cáo theo gian hàng.
          </p>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          {sellerStats.map((stat) => (
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
        <h3 className="text-lg font-semibold">Ưu tiên hôm nay</h3>
        <div className="mt-5 space-y-3">
          {sellerTasks.map((task) => (
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
