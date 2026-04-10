import {
  CheckCircle2,
  Clock,
  Headphones,
  MessageSquare,
  Phone,
  Send,
  Star,
  Upload,
  Users,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { SellerKpiCard, SellerPageHeader } from "@/features/seller/shared";

const bookingSlots = [
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

const docs = [
  "Hướng dẫn định giá sản phẩm dữ liệu",
  "Chiến lược marketing cho Platinum Seller",
  "Tích hợp API cho seller",
  "Quy trình thẩm định & SLA",
  "Best practices bảo mật dữ liệu",
  "Chính sách phí & thanh toán",
];

export function SellerSupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Hỗ trợ nhà cung cấp Premium"
        description="Đội ngũ CB-SDL chuyên trách hỗ trợ Platinum Seller, phản hồi trong 1 giờ"
        actions={
          <Button className="h-9 rounded-xl px-4 text-sm">
            <Headphones data-icon="inline-start" />
            Tạo ticket mới
          </Button>
        }
      />

      <Card className="bg-[linear-gradient(135deg,#0d223f_0%,#153766_100%)] ring-0 shadow-sm">
        <CardContent className="px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <Zap className="size-6" />
            </div>
            <div>
              <p className="text-sm text-slate-300">Dịch vụ Platinum</p>
              <h2 className="text-2xl font-semibold text-white">
                Priority Support 24/7
              </h2>
              <p className="text-sm text-slate-200">
                Chuyên gia tư vấn định giá, hỗ trợ kỹ thuật cao cấp, SLA phản
                hồi dưới 1 giờ
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SellerKpiCard
          label="Ticket đang mở"
          value="1"
          tone="amber"
          icon={Headphones}
        />
        <SellerKpiCard
          label="Đã giải quyết 2026"
          value="84"
          tone="emerald"
          icon={CheckCircle2}
        />
        <SellerKpiCard
          label="Thời gian phản hồi TB"
          value="38 phút"
          tone="blue"
          icon={Clock}
        />
        <SellerKpiCard
          label="Mức hài lòng"
          value="4,9★"
          tone="amber"
          icon={Star}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              Account Manager chuyên trách
            </CardTitle>
            <CardDescription className="text-xs">
              Người phụ trách CTCP Dữ liệu Tài chính Việt
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-xl border border-border/70 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-amber-400 text-sm font-semibold text-slate-950">
                    HN
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Hoàng Thị Ngọc</p>
                  <p className="text-xs text-muted-foreground">
                    Senior Account Manager
                  </p>
                  <p className="text-xs text-emerald-600">
                    Online · Phản hồi ngay
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5" />
                  0912 345 678
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-3.5" />
                  ngoc.ht.ngl@sdl.gov.vn
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="h-9 flex-1 rounded-xl text-sm">
                <MessageSquare data-icon="inline-start" />
                Chat ngay
              </Button>
              <Button
                variant="outline"
                className="h-9 flex-1 rounded-xl text-sm"
              >
                <Phone data-icon="inline-start" />
                Gọi điện
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Đặt lịch tư vấn 1:1</CardTitle>
            <CardDescription className="text-xs">
              Tư vấn định giá, chiến lược, tích hợp kỹ thuật
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {bookingSlots.map((slot) => (
              <div
                key={slot.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                    <Users className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{slot.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {slot.detail}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="h-8 rounded-lg px-3 text-xs"
                >
                  Đặt lịch
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tạo ticket mới</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <FieldGroup className="grid gap-4 lg:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="seller-support-type">
                  Loại vấn đề
                </FieldLabel>
                <FieldContent>
                  <Select defaultValue="pricing">
                    <SelectTrigger
                      id="seller-support-type"
                      className="h-9 rounded-xl text-sm"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="pricing">Tư vấn định giá</SelectItem>
                        <SelectItem value="technical">Kỹ thuật</SelectItem>
                        <SelectItem value="billing">Thanh toán</SelectItem>
                        <SelectItem value="compliance">Tuân thủ</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="seller-support-priority">
                  Mức độ ưu tiên
                </FieldLabel>
                <FieldContent>
                  <Select defaultValue="high">
                    <SelectTrigger
                      id="seller-support-priority"
                      className="h-9 rounded-xl text-sm"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">Cao</SelectItem>
                        <SelectItem value="normal">Bình thường</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field className="lg:col-span-2">
                <FieldLabel htmlFor="seller-support-subject">
                  Tiêu đề ngắn gọn
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="seller-support-subject"
                    className="h-10 rounded-xl"
                    placeholder="Ví dụ: Cần review lại pricing cho sản phẩm SME"
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <FieldGroup className="mt-4 gap-4">
              <Field>
                <FieldLabel htmlFor="seller-support-message">
                  Mô tả chi tiết vấn đề
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="seller-support-message"
                    rows={5}
                    className="rounded-xl"
                    placeholder="Mô tả chi tiết bối cảnh, link giao dịch, mã sản phẩm hoặc lỗi kỹ thuật..."
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Button variant="outline" className="h-8 rounded-lg text-xs">
                <Upload data-icon="inline-start" />
                Đính kèm file
              </Button>
              <Button className="h-8 rounded-lg text-xs">
                <Send data-icon="inline-start" />
                Gửi ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tài liệu seller</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-0">
            {docs.map((doc) => (
              <Button
                key={doc}
                variant="ghost"
                className="h-auto justify-start rounded-lg px-3 py-2 text-left text-xs font-normal"
              >
                {doc}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
