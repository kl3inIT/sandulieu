import { Settings, Upload } from "lucide-react";

import {
  profileTags,
  settingsTabs,
} from "@/features/seller/data/account/settings.data";

import { Badge } from "@/shared/components/ui/badge";
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
import { SellerPageHeader } from "@/features/seller/shared";

export function SellerSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SellerPageHeader
        title="Cài đặt tài khoản nhà cung cấp"
        description="Quản lý hồ sơ doanh nghiệp, storefront, team, thanh toán và bảo mật"
      />

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-1.5">
          {settingsTabs.map((tab) => (
            <Button
              key={tab.label}
              variant={tab.active ? "default" : "ghost"}
              className="h-10 justify-start rounded-xl px-3 text-sm"
            >
              <tab.icon data-icon="inline-start" />
              {tab.label}
            </Button>
          ))}
        </div>

        <Card className="rounded-xl border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              Hồ sơ nhà cung cấp dữ liệu
            </CardTitle>
            <CardDescription className="text-xs">
              Hiển thị công khai trên storefront của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-semibold text-white">
                DTC
              </div>
              <Button variant="outline" className="h-8 rounded-lg text-xs">
                <Upload data-icon="inline-start" />
                Đổi logo
              </Button>
            </div>

            <FieldGroup className="grid gap-4 lg:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="seller-name">
                  Tên nhà cung cấp *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="seller-name"
                    className="h-10 rounded-md"
                    defaultValue="CTCP Dữ liệu Tài chính Việt"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="seller-tax-id">MST</FieldLabel>
                <FieldContent>
                  <div className="flex items-center gap-2">
                    <Input
                      id="seller-tax-id"
                      className="h-10 rounded-md"
                      defaultValue="0316789012"
                    />
                    <Badge className="bg-emerald-100 text-emerald-700">
                      DMDC
                    </Badge>
                  </div>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="seller-website">Website</FieldLabel>
                <FieldContent>
                  <Input
                    id="seller-website"
                    className="h-10 rounded-md"
                    defaultValue="https://dltc.vn"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="seller-sector">Lĩnh vực chính</FieldLabel>
                <FieldContent>
                  <Select defaultValue="finance">
                    <SelectTrigger
                      id="seller-sector"
                      className="h-10 rounded-md"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="finance">
                          Tài chính - Ngân hàng
                        </SelectItem>
                        <SelectItem value="health">Y tế</SelectItem>
                        <SelectItem value="tech">Công nghệ</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field className="lg:col-span-2">
                <FieldLabel htmlFor="seller-summary">
                  Giới thiệu ngắn
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="seller-summary"
                    rows={5}
                    className="rounded-md"
                    defaultValue="CTCP Dữ liệu Tài chính Việt là nhà cung cấp dữ liệu hàng đầu về tài chính - ngân hàng - chứng khoán tại Việt Nam với hơn 18 sản phẩm dữ liệu được chứng nhận Gold bởi Hội đồng thẩm định SDL."
                  />
                </FieldContent>
              </Field>

              <Field className="lg:col-span-2">
                <FieldLabel>Phân loại tự đánh giá</FieldLabel>
                <FieldContent>
                  <div className="flex flex-wrap gap-2">
                    {profileTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                    <Button
                      variant="outline"
                      className="h-7 rounded-full px-3 text-xs"
                    >
                      + Thêm tag
                    </Button>
                  </div>
                </FieldContent>
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-2">
              <Button variant="outline" className="h-9 rounded-xl px-4 text-sm">
                Hủy
              </Button>
              <Button className="h-9 rounded-xl px-4 text-sm">
                <Settings data-icon="inline-start" />
                Lưu thay đổi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
