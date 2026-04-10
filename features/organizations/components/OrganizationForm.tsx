"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { LoaderCircle, Save, SquarePen } from "lucide-react";

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
import {
  createOrganizationFormOptions,
  getOrganizationFormDefaults,
  type OrganizationFormPayload,
  type OrganizationFormValues,
} from "../organization.form";

type OrganizationFormProps = {
  mode: "create" | "update";
  initialValues?: Partial<OrganizationFormValues>;
  submitLabel?: string;
  isPending?: boolean;
  onSubmit: (values: OrganizationFormPayload) => Promise<void> | void;
  onReset?: () => void;
};

function getFieldErrors(errors: unknown[]) {
  return errors.flatMap((error) => {
    if (!error) return [];
    if (typeof error === "string") return [{ message: error }];
    if (typeof error === "object" && "message" in error) {
      return [{ message: String(error.message) }];
    }

    return [{ message: "Giá trị chưa hợp lệ." }];
  });
}

export function OrganizationForm({
  mode,
  initialValues,
  submitLabel,
  isPending = false,
  onSubmit,
  onReset,
}: OrganizationFormProps) {
  const defaults = getOrganizationFormDefaults(initialValues);
  const form = useForm(
    createOrganizationFormOptions({
      initialValues,
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
        <form.Field name="id">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>ID tổ chức</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="org-acme"
                  aria-invalid={!field.state.meta.isValid}
                  disabled={mode === "update"}
                />
                <FieldDescription>
                  {mode === "create"
                    ? "Dùng id ổn định cho route và liên kết dữ liệu cha - con."
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
              <FieldLabel htmlFor={field.name}>Mã tổ chức</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="ORG-ACME"
                  aria-invalid={!field.state.meta.isValid}
                />
                <FieldDescription>
                  Mã nghiệp vụ được giữ riêng, không dùng thay cho route id.
                </FieldDescription>
                <FieldError errors={getFieldErrors(field.state.meta.errors)} />
              </FieldContent>
            </Field>
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor={field.name}>Tên tổ chức</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Tập đoàn ACME Việt Nam"
                  aria-invalid={!field.state.meta.isValid}
                />
                <FieldDescription>
                  Tên hiển thị có thể thay đổi, nhưng id phải luôn ổn định.
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
                      event.target.value as OrganizationFormValues["status"]
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
                  Form này dùng chung contract kiểm tra dữ liệu cho cả màn tạo
                  mới và cập nhật.
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
                  Đang lưu tổ chức
                </>
              ) : (
                <>
                  {mode === "create" ? (
                    <Save data-icon="inline-start" />
                  ) : (
                    <SquarePen data-icon="inline-start" />
                  )}
                  {submitLabel ??
                    (mode === "create" ? "Lưu tổ chức" : "Cập nhật tổ chức")}
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
              Làm lại
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
