import {
  Building2,
  CheckCircle2,
  Eye,
  Filter,
  Landmark,
  Search,
  Users,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

export default function AdminOrganizationsPage() {
  const statCards = [
    {
      label: "CQNN kết nối",
      value: "47",
      icon: Landmark,
      tone: "bg-[#fef3c7] text-[#d97706]",
    },
    {
      label: "Doanh nghiệp đã duyệt",
      value: "312",
      icon: Building2,
      tone: "bg-[#eff6ff] text-[#2563eb]",
    },
    {
      label: "Tổ chức Enterprise",
      value: "48",
      icon: Users,
      tone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      label: "Đang đồng bộ DMDC",
      value: "100%",
      icon: CheckCircle2,
      tone: "bg-[#f1f5f9] text-[#334155]",
    },
  ];

  const govAgencies = [
    {
      name: "Cục Cảnh sát QLHC về TTXH",
      sub: "Bộ Công an · Kết nối từ 01/2024",
      svs: "24 DV",
      datasets: "8 dataset",
    },
    {
      name: "Tổng cục Thống kê",
      sub: "Bộ Kế hoạch & ĐT · Kết nối từ 03/2024",
      svs: "86 DV",
      datasets: "42 dataset",
    },
    {
      name: "Tổng cục Thuế",
      sub: "Bộ Tài chính · Kết nối từ 06/2024",
      svs: "32 DV",
      datasets: "12 dataset",
    },
    {
      name: "Bảo hiểm Xã hội VN",
      sub: "Chính phủ · Kết nối từ 08/2024",
      svs: "18 DV",
      datasets: "6 dataset",
    },
  ];

  const enterprises = [
    {
      name: "CTCP Dữ liệu Tài chính Việt",
      badge: "Platinum",
      badgeTone: "bg-[#fef3c7] text-[#d97706]",
      sub: "MST: 0316788012 · Bên bán",
      revenue: "9,8Bđ",
      products: "18 SP",
    },
    {
      name: "Ngân hàng TMCP Việt Nam",
      badge: "Gold",
      badgeTone: "bg-[#fef3c7] text-[#d97706]",
      sub: "MST: 0100723054 · Bên mua + bán",
      revenue: "4,2Bđ",
      products: "12 SP",
    },
    {
      name: "CTCP Chứng khoán SSI",
      badge: "Enterprise",
      badgeTone: "bg-[#e0f2fe] text-[#0369a1]",
      sub: "MST: 0101234567 · Bên mua",
      revenue: "",
      products: "",
    },
    {
      name: "Vingroup JSC",
      badge: "Enterprise",
      badgeTone: "bg-[#e0f2fe] text-[#0369a1]",
      sub: "MST: 0100109106 · Bên mua",
      revenue: "",
      products: "",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]">
            Tổ chức & Cơ quan Nhà nước
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#607694]">
            Quản lý 47 CQNN cung cấp dữ liệu và 312 tổ chức doanh nghiệp đã
            duyệt
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
            >
              <CardContent className="flex flex-row-reverse items-start justify-between p-5 md:pb-6 md:pt-5 lg:flex-row lg:items-center">
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-[0.85rem] font-medium text-[#607694]">
                    {item.label}
                  </p>
                  <p className="font-semibold leading-none tracking-tight text-[#0b2e5c] text-[2rem]">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-[1rem] ${item.tone}`}
                >
                  <Icon className="size-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* Left Column - Gov Agencies */}
        <Card className="flex h-full flex-col rounded-[1.2rem] border-[#d9e0e7] bg-[#f9fafb] shadow-sm ring-0 overflow-hidden">
          <CardHeader className="border-b border-[#f1f5f9] px-6 py-5 flex flex-row items-center justify-between gap-4 bg-white">
            <div>
              <CardTitle className="text-[1.2rem] font-semibold text-[#0b2e5c] flex items-center gap-2">
                <Landmark className="size-5 text-[#d97706]" />
                Cơ quan Nhà nước cung cấp DL
              </CardTitle>
              <p className="mt-1 text-[0.9rem] text-[#607694]">
                47 đơn vị · 662 dịch vụ · 77 bộ dữ liệu
              </p>
            </div>
            <button className="flex items-center justify-center size-9 rounded-[0.8rem] border border-[#d9e0e7] text-[#64748b] bg-white hover:bg-slate-50 transition-colors">
              <Filter className="size-4" />
            </button>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 p-6 bg-white overflow-y-auto">
            {govAgencies.map((agency, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-[1rem] border border-[#d9e0e7] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[0.8rem] bg-[#fcd34d] text-[#92400e]">
                    <Landmark className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-[1.05rem] font-bold text-[#0b2e5c]">
                      {agency.name}
                    </h3>
                    <p className="mt-0.5 text-[0.8rem] text-[#64748b]">
                      {agency.sub}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[0.95rem] font-bold text-[#0b2e5c] leading-tight">
                      {agency.svs}
                    </span>
                    <span className="text-[0.75rem] text-[#64748b]">
                      {agency.datasets}
                    </span>
                  </div>
                  <button className="text-[#94a3b8] hover:text-[#0b2e5c] transition-colors p-1">
                    <Eye className="size-[1.12rem]" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Column - Enterprises */}
        <Card className="flex h-full flex-col rounded-[1.2rem] border-[#d9e0e7] bg-[#f9fafb] shadow-sm ring-0 overflow-hidden">
          <CardHeader className="border-b border-[#f1f5f9] px-6 py-5 flex flex-row items-center justify-between gap-4 bg-white">
            <div>
              <CardTitle className="text-[1.2rem] font-semibold text-[#0369a1] flex items-center gap-2">
                <Building2 className="size-5 text-[#3b82f6]" />
                Doanh nghiệp & Tổ chức
              </CardTitle>
              <p className="mt-1 text-[0.9rem] text-[#607694]">
                312 đơn vị đã duyệt và đang hoạt động
              </p>
            </div>
            <div className="relative w-full max-w-[140px] md:max-w-[180px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]" />
              <Input
                className="h-9 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white pl-9 text-[0.85rem] text-[#0b2e5c] placeholder:text-[#94a3b8] focus-visible:ring-1 focus-visible:ring-[#0b2e5c]"
                placeholder="Tìm..."
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 p-6 bg-white overflow-y-auto">
            {enterprises.map((ent, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-[1rem] border border-[#d9e0e7] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[0.8rem] bg-[#f1f5f9] text-[#1e293b]">
                    <Building2 className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[1.05rem] font-bold text-[#0b2e5c]">
                        {ent.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-2 py-0 text-[0.65rem] font-bold uppercase tracking-wider hover:bg-current/0 ${ent.badgeTone}`}
                      >
                        {ent.badge}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-[0.8rem] text-[#64748b]">
                      {ent.sub}
                    </p>
                  </div>
                </div>
                {ent.revenue && (
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-[0.95rem] font-bold text-[#10b981] leading-tight">
                        {ent.revenue}
                      </span>
                      <span className="text-[0.75rem] text-[#64748b]">
                        {ent.products}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
