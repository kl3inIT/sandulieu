"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { LoaderCircle, Save, SquarePen } from "lucide-react";
import { z } from "zod";

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
import type { PostFormValues } from "../post.types";

const postFormSchema = z.object({
  title: z.string().trim().min(3, "Tiêu đề cần ít nhất 3 ký tự."),
  body: z.string().trim().min(10, "Nội dung cần ít nhất 10 ký tự."),
  userId: z
    .number()
    .int("Mã người dùng phải là số nguyên.")
    .positive("Mã người dùng phải lớn hơn 0."),
});

const defaultValues: PostFormValues = {
  title: "",
  body: "",
  userId: 1,
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

type PostFormProps = {
  mode: "create" | "update";
  initialValues?: PostFormValues;
  submitLabel?: string;
  isPending?: boolean;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
  onReset?: () => void;
};

export function PostForm({
  mode,
  initialValues,
  submitLabel,
  isPending = false,
  onSubmit,
  onReset,
}: PostFormProps) {
  const form = useForm({
    defaultValues: initialValues ?? defaultValues,
    validators: {
      onChange: postFormSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = postFormSchema.parse(value);
      await onSubmit(payload);
    },
  });

  useEffect(() => {
    if (!initialValues) return;
    form.reset(initialValues);
  }, [form, initialValues]);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="rounded-[1.5rem] border border-[#e3d8c4] bg-[#fbf8f2] p-4 sm:p-5">
        <FieldGroup>
          <form.Field name="title">
            {(field) => (
              <Field data-invalid={!field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Tiêu đề</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Ví dụ: Chia sẻ mới dành cho cộng đồng seller"
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldDescription>
                    Một tiêu đề ngắn gọn sẽ giúp bài viết dễ nhận biết hơn.
                  </FieldDescription>
                  <FieldError
                    errors={getFieldErrors(field.state.meta.errors)}
                  />
                </FieldContent>
              </Field>
            )}
          </form.Field>

          <form.Field name="body">
            {(field) => (
              <Field data-invalid={!field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Nội dung</FieldLabel>
                <FieldContent>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Nhập nội dung bài viết bạn muốn lưu."
                    aria-invalid={!field.state.meta.isValid}
                    className="min-h-36 w-full rounded-2xl border border-[#d6c8ac] bg-white/90 px-4 py-3 text-sm leading-7 text-zinc-800 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#b89f69] focus-visible:ring-3 focus-visible:ring-[#d9c48d]/25 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                  />
                  <FieldDescription>
                    Nội dung rõ ràng sẽ tiện cho việc kiểm tra và cập nhật sau
                    này.
                  </FieldDescription>
                  <FieldError
                    errors={getFieldErrors(field.state.meta.errors)}
                  />
                </FieldContent>
              </Field>
            )}
          </form.Field>

          <form.Field name="userId">
            {(field) => (
              <Field data-invalid={!field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Mã người dùng</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={String(field.state.value)}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value || 0))
                    }
                    placeholder="1"
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldDescription>
                    Dùng mã người dùng dương để gắn bài viết với đúng tác giả.
                  </FieldDescription>
                  <FieldError
                    errors={getFieldErrors(field.state.meta.errors)}
                  />
                </FieldContent>
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </div>

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
                  <LoaderCircle className="animate-spin" />
                  Đang lưu bài viết
                </>
              ) : (
                <>
                  {mode === "create" ? <Save /> : <SquarePen />}
                  {submitLabel ??
                    (mode === "create" ? "Lưu bài viết" : "Cập nhật bài viết")}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-5"
              onClick={() => {
                form.reset(initialValues ?? defaultValues);
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
