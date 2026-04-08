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
        <article className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.2),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_90px_-55px_rgba(8,15,30,0.9)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[#d9c48d]">
            Seller overview
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Không gian seller được chuẩn bị cho catalog, doanh thu và vận hành
            gian hàng.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Đây là điểm vào phù hợp để nối tiếp onboarding seller, quản lý sản
            phẩm, tồn kho và các truy vấn phân tích hiệu suất theo gian hàng.
          </p>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          {sellerStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{stat.note}</p>
            </article>
          ))}
        </div>
      </section>

      <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <h3 className="text-lg font-semibold text-white">Ưu tiên hôm nay</h3>
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
