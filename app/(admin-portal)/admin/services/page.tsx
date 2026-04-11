import {
  Database,
  Edit3,
  Eye,
  FileEdit,
  Filter,
  Pause,
  Play,
  Plus,
  Search,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

export default function AdminServicesPage() {
  const statCards = [
    {
      label: "Đang hoạt động",
      value: "612",
      tone: "bg-[#dcfce7] text-[#059669]",
      icon: Database,
    },
    {
      label: "Đang bảo trì",
      value: "14",
      tone: "bg-[#fef3c7] text-[#d97706]",
      icon: Pause,
    },
    {
      label: "Bản nháp",
      value: "28",
      tone: "bg-[#e0f2fe] text-[#0284c7]",
      icon: FileEdit,
    },
    {
      label: "Đã vô hiệu hóa",
      value: "8",
      tone: "bg-[#ffe4e6] text-[#e11d48]",
      icon: Filter,
    },
  ] as const;

  const services = [
    {
      id: "DV - DC - 001",
      category: "Dân cư",
      categoryTone: "bg-[#eff6ff] text-[#1d4ed8]",
      status: "Hoạt động",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      title: "Xác thực định danh công dân qua VNeID",
      subtitle: "Chỉ tiêu: Mã định danh cá nhân · Cục Cảnh sát QLHC",
      traffic: "248K/ngày",
      date: "Cập nhật 03/04/2026",
      action: "pause",
    },
    {
      id: "DV - DC - 002",
      category: "Dân cư",
      categoryTone: "bg-[#eff6ff] text-[#1d4ed8]",
      status: "Hoạt động",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      title: "Tra cứu thông tin cư trú",
      subtitle: "Chỉ tiêu: Thông tin hộ khẩu · Bộ Công an",
      traffic: "124K/ngày",
      date: "Cập nhật 02/04/2026",
      action: "pause",
    },
    {
      id: "DV - DN - 042",
      category: "Doanh nghiệp",
      categoryTone: "bg-[#eff6ff] text-[#1d4ed8]",
      status: "Hoạt động",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      title: "Thông tin doanh nghiệp & ngành nghề",
      subtitle: "Chỉ tiêu: Mã DN · Cục QLĐKKD",
      traffic: "82K/ngày",
      date: "Cập nhật 01/04/2026",
      action: "pause",
    },
    {
      id: "TC - 118",
      category: "Tài chính",
      categoryTone: "bg-[#eff6ff] text-[#1d4ed8]",
      status: "Hoạt động",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      title: "Mã số thuế cá nhân & tình trạng",
      subtitle: "Chỉ tiêu: MST cá nhân · Tổng cục Thuế",
      traffic: "64K/ngày",
      date: "Cập nhật 28/03/2026",
      action: "pause",
    },
    {
      id: "DV - BHXH - 007",
      category: "Y tế & BHXH",
      categoryTone: "bg-[#eff6ff] text-[#1d4ed8]",
      status: "Hoạt động",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      title: "Quá trình tham gia BHXH",
      subtitle: "Chỉ tiêu: Mã số BHXH · BHXH VN",
      traffic: "38K/ngày",
      date: "Cập nhật 25/03/2026",
      action: "pause",
    },
    {
      id: "DV - YT - 012",
      category: "Y tế",
      categoryTone: "bg-[#eff6ff] text-[#1d4ed8]",
      status: "Bảo trì",
      statusTone: "bg-[#fef3c7] text-[#d97706]",
      title: "Dữ liệu tiêm chủng quốc gia",
      subtitle: "Chỉ tiêu: Lịch sử tiêm · Bộ Y tế",
      traffic: "—",
      date: "Cập nhật 04/04/2026",
      action: "play",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header Overview */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]">
            Danh mục dịch vụ dữ liệu CQNN
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#607694]">
            Quản lý 662 chỉ tiêu thống kê · 77 bộ dữ liệu · 18 lĩnh vực — tạo
            lập và vận hành
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-[0.8rem] border-[#d9e0e7] bg-white px-4 text-[#0b2e5c] hover:bg-slate-50"
          >
            <Filter className="mr-2 size-4" />
            Bộ lọc
          </Button>
          <Button className="h-10 rounded-[0.8rem] bg-[#0b2e5c] px-4 hover:bg-[#163b6d] text-white">
            <Plus className="mr-2 size-4" />
            Tạo dịch vụ mới
          </Button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0"
            >
              <CardContent className="flex flex-row-reverse items-start justify-between p-5 md:flex-row md:items-center md:pb-6 md:pt-5">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[0.95rem] text-[#607694]">{item.label}</p>
                  <p className="text-[2.1rem] font-semibold tracking-tight text-[#0b2e5c] leading-none">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`flex size-14 items-center justify-center rounded-[1rem] ${item.tone}`}
                >
                  <Icon className="size-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main List Card */}
      <Card className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0">
        <CardHeader className="flex flex-col gap-4 border-b border-[#f1f5f9] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-[1.3rem] text-[#0b2e5c] font-semibold">
              Danh sách dịch vụ dữ liệu
            </CardTitle>
            <p className="mt-1.5 text-[0.95rem] text-[#607694]">
              Mỗi dịch vụ sử dụng mô hình data-driven với tham số {"{"}CHỈ_TIÊU
              {"}"} từ danh mục 662 chỉ tiêu
            </p>
          </div>
          <div className="relative w-full md:w-[360px] shrink-0">
            <Search className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-[#94a3b8]" />
            <Input
              className="h-11 w-full rounded-[0.8rem] border-[#d9e0e7] bg-white pl-10 text-[#0b2e5c] placeholder:text-[#94a3b8] focus-visible:ring-1 focus-visible:ring-[#0b2e5c]"
              placeholder="Tìm theo mã, tên, chỉ tiêu, cơ quan..."
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col divide-y divide-[#f1f5f9]">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col justify-between gap-5 p-6 hover:bg-[#f8fafc] md:flex-row md:items-center"
              >
                <div className="flex items-start gap-4 lg:gap-5 min-w-0">
                  <div className="flex size-[3.25rem] shrink-0 items-center justify-center rounded-[1rem] bg-[#0b2e5c] text-[#fcd34d]">
                    <Database className="size-[1.6rem]" />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-[0.81rem] font-medium uppercase tracking-tight text-[#64748b]">
                        {service.id}
                      </span>
                      <Badge
                        className={`rounded-full px-2.5 py-0.5 text-[0.76rem] font-medium hover:bg-current/0 ${service.categoryTone}`}
                      >
                        {service.category}
                      </Badge>
                      <Badge
                        className={`rounded-full px-2.5 py-0.5 text-[0.76rem] font-medium hover:bg-current/0 ${service.statusTone}`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="truncate text-[1.12rem] font-semibold text-[#0b2e5c]">
                        {service.title}
                      </h3>
                      <p className="mt-0.5 truncate text-[0.92rem] text-[#64748b]">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-6 md:justify-end md:gap-8">
                  <div className="flex flex-col text-right">
                    <span className="mb-0.5 text-[0.82rem] text-[#64748b]">
                      Lưu lượng
                    </span>
                    <span className="text-[1.1rem] font-bold tracking-tight text-[#0b2e5c]">
                      {service.traffic}
                    </span>
                    <span className="mt-0.5 text-[0.76rem] text-[#94a3b8]">
                      {service.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0b2e5c]"
                    >
                      <Eye className="size-[1.15rem]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0b2e5c]"
                    >
                      <Edit3 className="size-[1.15rem]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`size-9 rounded-full hover:bg-[#f1f5f9] ${
                        service.action === "play"
                          ? "text-[#10b981]"
                          : "text-[#f59e0b]"
                      }`}
                    >
                      {service.action === "play" ? (
                        <Play className="size-[1.15rem]" />
                      ) : (
                        <Pause className="size-[1.15rem]" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
