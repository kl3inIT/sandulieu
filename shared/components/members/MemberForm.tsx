"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { LoaderCircle, Save, SquarePen } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { getFieldErrors } from "@/shared/lib/form-errors";
import {
  createMemberFormOptions,
  getMemberFormDefaults,
  type MemberFormPayload,
  type MemberFormValues,
} from "@/features/members/member.form";

type MemberFormProps = {
  mode: "create" | "update";
  initialValues?: Partial<MemberFormValues>;
  organizationId: string;
  departmentId: string;
  organizationName?: string;
  departmentName?: string;
  submitLabel?: string;
  isPending?: boolean;
  onSubmit: (values: MemberFormPayload) => Promise<void> | void;
  onReset?: () => void;
};

export function MemberForm({
  mode,
  initialValues,
  organizationId,
  departmentId,
  organizationName,
  departmentName,
  submitLabel,
  isPending = false,
  onSubmit,
  onReset,
}: MemberFormProps) {
  const defaults = getMemberFormDefaults({
    ...initialValues,
    organizationId,
    departmentId,
  });

  const form = useForm(
    createMemberFormOptions({
      initialValues: defaults,
      onSubmit: async ({ value }) => {
        await onSubmit(value);
      },
    })
  );

  useEffect(() => {
    form.reset(defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, organizationId, departmentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {mode === "create"
            ? "Thông tin thành viên mới"
            : "Cập nhật thông tin thành viên"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <FieldGroup className="flex flex-col gap-4">
            {/* Tổ chức — read-only display */}
            <Field>
              <FieldLabel>Tổ chức</FieldLabel>
              <FieldContent>
                <p className="text-sm font-medium">
                  {organizationName ?? organizationId}
                </p>
                <p className="text-xs text-muted-foreground">
                  {organizationId}
                </p>
              </FieldContent>
            </Field>

            {/* Phòng ban — read-only display */}
            <Field>
              <FieldLabel>Phòng ban</FieldLabel>
              <FieldContent>
                <p className="text-sm font-medium">
                  {departmentName ?? departmentId}
                </p>
                <p className="text-xs text-muted-foreground">{departmentId}</p>
              </FieldContent>
            </Field>

            {/* Mã thành viên */}
            <form.Field name="memberCode">
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Mã thành viên</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="MEM-001"
                      aria-invalid={!field.state.meta.isValid}
                      required
                    />
                    <FieldError
                      errors={getFieldErrors(field.state.meta.errors)}
                    />
                  </FieldContent>
                </Field>
              )}
            </form.Field>

            {/* Họ và tên */}
            <form.Field name="fullName">
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nguyễn Văn A"
                      aria-invalid={!field.state.meta.isValid}
                      required
                    />
                    <FieldError
                      errors={getFieldErrors(field.state.meta.errors)}
                    />
                  </FieldContent>
                </Field>
              )}
            </form.Field>

            {/* Trạng thái */}
            <form.Field name="status">
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Trạng thái</FieldLabel>
                  <FieldContent>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as MemberFormValues["status"])
                      }
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={!field.state.meta.isValid}
                      >
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">
                          Không hoạt động
                        </SelectItem>
                        <SelectItem value="archived">Đã lưu trữ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError
                      errors={getFieldErrors(field.state.meta.errors)}
                    />
                  </FieldContent>
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending ? (
                    <>
                      <LoaderCircle className="animate-spin" size={16} />
                      {mode === "create" ? "Đang lưu..." : "Đang cập nhật..."}
                    </>
                  ) : (
                    <>
                      {mode === "create" ? (
                        <Save size={16} />
                      ) : (
                        <SquarePen size={16} />
                      )}
                      {submitLabel ??
                        (mode === "create" ? "Lưu thành viên" : "Lưu thay đổi")}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset(defaults);
                    onReset?.();
                  }}
                >
                  Quay lại
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
