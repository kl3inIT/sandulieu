import { z } from "zod";

import type { DepartmentModel } from "@/shared/model/department.model";

export const departmentFormSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Mã định danh phòng ban là bắt buộc.")
    .regex(/^[^\s]+$/, "Mã định danh phòng ban phải là id ổn định, không chứa khoảng trắng."),
  organizationId: z
    .string()
    .trim()
    .min(1, "Mã tổ chức cha là bắt buộc.")
    .regex(/^[^\s]+$/, "Mã tổ chức cha phải là id ổn định, không chứa khoảng trắng."),
  code: z.string().trim().min(2, "Mã phòng ban cần ít nhất 2 ký tự."),
  name: z.string().trim().min(3, "Tên phòng ban cần ít nhất 3 ký tự."),
  status: z.enum(["active", "inactive", "archived"]),
});

export type DepartmentFormValues = z.input<typeof departmentFormSchema>;
export type DepartmentFormPayload = z.output<typeof departmentFormSchema>;

export function getDepartmentFormDefaults(
  initialValues?: Partial<DepartmentModel>
): DepartmentFormValues {
  return {
    id: initialValues?.id ?? "",
    organizationId: initialValues?.organizationId ?? "",
    code: initialValues?.code ?? "",
    name: initialValues?.name ?? "",
    status: initialValues?.status ?? "active",
  };
}

export function createDepartmentFormOptions(options: {
  initialValues?: Partial<DepartmentModel>;
  onSubmit: (payload: { value: DepartmentFormPayload }) => Promise<void> | void;
}) {
  return {
    defaultValues: getDepartmentFormDefaults(options.initialValues),
    validators: {
      onChange: departmentFormSchema,
    },
    onSubmit: async ({
      value,
    }: {
      value: DepartmentFormValues;
    }) => {
      const payload = departmentFormSchema.parse(value);
      await options.onSubmit({ value: payload });
    },
  };
}
