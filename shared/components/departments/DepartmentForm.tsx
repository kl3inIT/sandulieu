"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { Building2, LoaderCircle, Save, SquarePen } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { getFieldErrors } from "@/shared/lib/form-errors";
import {
  createDepartmentFormOptions,
  getDepartmentFormDefaults,
  type DepartmentFormPayload,
  type DepartmentFormValues,
} from "@/features/departments/department.form";

type DepartmentFormProps = {
  mode: "create" | "update";
  initialValues?: Partial<DepartmentFormValues>;
  organizationId: string;
  submitLabel?: string;
  isPending?: boolean;
  onSubmit: (values: DepartmentFormPayload) => Promise<void> | void;
  onReset?: () => void;
};

export function DepartmentForm({
  mode,
  initialValues,
  organizationId,
  submitLabel,
  isPending = false,
  onSubmit,
  onReset,
}: DepartmentFormProps) {
  const defaults = getDepartmentFormDefaults({
    ...initialValues,
    organizationId,
  });
  const form = useForm(
    createDepartmentFormOptions({
      initialValues: defaults,
      onSubmit: async ({ value }) => {
        await onSubmit(value);
      },
    })
  );

  useEffect(() => {
    form.reset(defaults);
  }, [defaults, form]);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="organizationId">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>ID tổ chức cha</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="org-acme"
                  aria-invalid={!field.state.meta.isValid}
                  disabled
                />
                <FieldDescription>
                  Phạm vi tổ chức được khóa theo route hiện tại để không mất ngữ
                  cảnh cha khi tạo hoặc cập nhật phòng ban.
                </FieldDescription>
                <FieldError errors={getFieldErrors(field.state.meta.errors)} />
              </FieldContent>
            </Field>
          )}
        </form.Field>

        <form.Field name="id">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>ID phòng ban</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="dept-acme-sales"
                  aria-invalid={!field.state.meta.isValid}
                  disabled={mode === "update"}
                />
                <FieldDescription>
                  {mode === "create"
                    ? "Dùng id ổn định cho route chi tiết của phòng ban sau khi tạo mới."
                    : "ID ổn định được giữ theo route hiện tại và không thể sửa ở màn cập nhật."}
                </FieldDescription>
                <FieldError errors={getFieldErrors(field.state.meta.errors)} />
              </FieldContent>
            </Field>
          )}
        </form.Field>

        <form.Field name="code">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>Mã phòng ban</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="SALE"
                  aria-invalid={!field.state.meta.isValid}
                />
                <FieldDescription>
                  Mã nghiệp vụ hiển thị riêng với ID ổn định để không ảnh hưởng
                  định danh route.
                </FieldDescription>
                <FieldError errors={getFieldErrors(field.state.meta.errors)} />
              </FieldContent>
            </Field>
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>Tên phòng ban</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Kinh doanh doanh nghiệp"
                  aria-invalid={!field.state.meta.isValid}
                />
                <FieldDescription>
                  Tên hiển thị có thể thay đổi, nhưng tổ chức cha và ID ổn định
                  luôn phải rõ ràng trong cùng contract kiểm tra dữ liệu.
                </FieldDescription>
                <FieldError errors={getFieldErrors(field.state.meta.errors)} />
              </FieldContent>
            </Field>
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>Trạng thái</FieldLabel>
              <FieldContent>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(
                      event.target.value as DepartmentFormValues["status"]
                    )
                  }
                  aria-invalid={!field.state.meta.isValid}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Tạm ngưng</option>
                  <option value="archived">Lưu trữ</option>
                </select>
                <FieldDescription>
                  Form này dùng chung contract kiểm tra dữ liệu cho cả luồng tạo
                  mới và cập nhật phòng ban.
                </FieldDescription>
                <FieldError errors={getFieldErrors(field.state.meta.errors)} />
              </FieldContent>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              className="rounded-full px-5"
              disabled={!canSubmit || isSubmitting || isPending}
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    className="animate-spin"
                    data-icon="inline-start"
                  />
                  {mode === "create"
                    ? "Đang tạo phòng ban"
                    : "Đang cập nhật phòng ban"}
                </>
              ) : (
                <>
                  {mode === "create" ? (
                    <Save data-icon="inline-start" />
                  ) : (
                    <SquarePen data-icon="inline-start" />
                  )}
                  {submitLabel ??
                    (mode === "create" ? "Tạo phòng ban" : "Lưu thay đổi")}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-5"
              onClick={() => {
                form.reset(defaults);
                onReset?.();
              }}
            >
              <Building2 data-icon="inline-start" />
              Khôi phục dữ liệu form
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
