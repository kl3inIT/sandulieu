import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquareText,
  OctagonAlert,
  Scale,
  ShieldAlert,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

export default function AdminDisputesPage() {
  const statCards = [
    {
      label: "Khiếu nại đang mở",
      value: "14",
      icon: Clock,
      tone: "bg-[#ffedd5] text-[#d97706]",
    },
    {
      label: "Nghiêm trọng",
      value: "2",
      icon: AlertTriangle,
      tone: "bg-[#fee2e2] text-[#ef4444]",
    },
    {
      label: "Đã giải quyết 2026",
      value: "142",
      icon: CheckCircle2,
      tone: "bg-[#dcfce7] text-[#059669]",
    },
    {
      label: "Thời gian xử lý TB",
      value: "3,2 ngày",
      icon: Scale,
      tone: "bg-[#e0f2fe] text-[#0369a1]",
    },
  ];

  const disputes = [
    {
      id: "KN-2026-04-0148",
      type: "Chất lượng dữ liệu",
      typeTone: "bg-[#e0f2fe] text-[#0284c7]",
      priority: "Cao",
      priorityTone: "bg-[#fef3c7] text-[#d97706]",
      status: "Đang hòa giải",
      statusTone: "bg-[#dbf4ff] text-[#0369a1]",
      title: "Báo cáo tín dụng DN Q1",
      buyer: "Ngân hàng TMCP Việt Nam",
      seller: "CTCP DL Tài chính",
      opened: "Mở 2 giờ trước",
      value: "48.000.000 ₫",
      icon: ShieldAlert,
      iconTone: "bg-[#fef3c7] text-[#d97706]",
    },
    {
      id: "KN-2026-04-0147",
      type: "Vi phạm SLA",
      typeTone: "bg-[#e0f2fe] text-[#0284c7]",
      priority: "Cao",
      priorityTone: "bg-[#fef3c7] text-[#d97706]",
      status: "Điều tra",
      statusTone: "bg-[#ffedd5] text-[#ea580c]",
      title: "Dữ liệu giao hàng realtime",
      buyer: "Vingroup",
      seller: "GLN Logistics",
      opened: "Mở 1 ngày trước",
      value: "120.000.000 ₫",
      icon: ShieldAlert,
      iconTone: "bg-[#fef3c7] text-[#d97706]",
    },
    {
      id: "KN-2026-04-0138",
      type: "Sai lệch giá",
      typeTone: "bg-[#f1f5f9] text-[#475569]",
      priority: "Trung bình",
      priorityTone: "bg-[#dcfce7] text-[#059669]",
      status: "Đang hòa giải",
      statusTone: "bg-[#dbf4ff] text-[#0369a1]",
      title: "Chỉ số TT chứng khoán",
      buyer: "SSI Securities",
      seller: "CTCP DL Tài chính",
      opened: "Mở 2 ngày trước",
      value: "15.000.000 ₫",
      icon: ShieldAlert,
      iconTone: "bg-[#e0f2fe] text-[#3b82f6]",
    },
    {
      id: "KN-2026-04-0124",
      type: "Dữ liệu cá nhân bị lộ",
      typeTone: "bg-[#e0f2fe] text-[#0284c7]",
      priority: "⚠ Nghiêm trọng",
      priorityTone: "bg-[#fee2e2] text-[#ef4444]",
      status: "Chuyển CQNN",
      statusTone: "bg-[#ffe4e6] text-[#e11d48]",
      title: "DV Y tế cộng đồng",
      buyer: "Công dân (VNeID)",
      seller: "Medatek",
      opened: "Mở 3 ngày trước",
      value: null,
      icon: OctagonAlert,
      iconTone: "bg-[#fee2e2] text-[#ef4444]",
    },
    {
      id: "KN-2026-04-0112",
      type: "Chất lượng dữ liệu",
      typeTone: "bg-[#e0f2fe] text-[#0284c7]",
      priority: "Trung bình",
      priorityTone: "bg-[#f1f5f9] text-[#475569]",
      status: "Đã giải quyết",
      statusTone: "bg-[#dcfce7] text-[#059669]",
      title: "Báo cáo SME",
      buyer: "Techcombank",
      seller: "CTCP DL Tài chính",
      opened: "Mở 5 ngày trước",
      value: "32.000.000 ₫",
      icon: ShieldAlert,
      iconTone: "bg-[#f1f5f9] text-[#64748b]",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight text-[#0b2e5c] sm:text-[2rem]">
            Khiếu nại & Tranh chấp
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#607694]">
            Xử lý khiếu nại từ bên mua, bên bán và công dân · Hòa giải và phán
            quyết
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
              <CardContent className="flex flex-row items-center justify-between p-5 md:pb-6 md:pt-5 lg:flex-row lg:items-center">
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-[0.9rem] font-medium text-[#64748b]">
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

      {/* Main Layout - List of Disputes */}
      <div className="flex flex-col gap-4">
        {disputes.map((dispute, i) => {
          const Icon = dispute.icon;
          return (
            <Card
              key={i}
              className="rounded-[1.2rem] border-[#d9e0e7] bg-white shadow-sm ring-0 overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-start justify-between p-5 md:p-6">
                {/* Left Info Area */}
                <div className="flex items-start gap-4 md:gap-5 flex-1">
                  {/* Status Icon */}
                  <div
                    className={`flex size-12 font-bold shrink-0 items-center justify-center rounded-[0.8rem] mt-1 ${dispute.iconTone}`}
                  >
                    <Icon className="size-6" />
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col gap-2">
                    {/* Metadata Flags row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[0.8rem] font-medium text-[#64748b] pr-2">
                        {dispute.id}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-2.5 py-0.5 text-xs hover:bg-current/0 shadow-none border-0 ${dispute.typeTone}`}
                      >
                        {dispute.type}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-2.5 py-0.5 text-xs hover:bg-current/0 shadow-none border-0 font-semibold ${dispute.priorityTone}`}
                      >
                        {dispute.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-2.5 py-0.5 text-xs hover:bg-current/0 shadow-none border-0 font-semibold ${dispute.statusTone}`}
                      >
                        {dispute.status}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-[1.1rem] font-bold text-[#0b2e5c]">
                      {dispute.title}
                    </h3>

                    {/* Details */}
                    <p className="text-[0.85rem] text-[#64748b]">
                      Bên mua:{" "}
                      <span className="text-[#0b2e5c]">{dispute.buyer}</span> ·
                      Bên bán:{" "}
                      <span className="text-[#0b2e5c]">{dispute.seller}</span> ·{" "}
                      {dispute.opened}
                    </p>

                    {/* Value */}
                    {dispute.value && (
                      <p className="text-[0.85rem] text-[#475569] mt-1">
                        Giá trị tranh chấp:{" "}
                        <span className="font-bold text-[#0b2e5c]">
                          {dispute.value}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action Area */}
                <div className="flex flex-col gap-2 shrink-0 ml-4 hidden sm:flex">
                  <Button
                    variant="outline"
                    className="w-[110px] rounded-[0.6rem] border-[#d9e0e7] text-[#0b2e5c] font-semibold h-9 shadow-sm hover:bg-slate-50 justify-start px-3"
                  >
                    <Eye className="mr-2 size-4 text-[#64748b]" />
                    Xem
                  </Button>
                  <Button className="w-[110px] rounded-[0.6rem] bg-[#0b2e5c] text-white font-semibold h-9 shadow-sm hover:bg-[#163b6d] justify-start px-3">
                    <MessageSquareText className="mr-2 size-4" />
                    Hòa giải
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
