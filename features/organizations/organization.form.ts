import { z } from "zod";

import type { OrganizationModel } from "@/shared/model/organization.model";

export const organizationFormSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Mã định danh tổ chức là bắt buộc.")
    .regex(/^[^\s]+$/, "Mã định danh tổ chức phải là id ổn định, không chứa khoảng trắng."),
  code: z.string().trim().min(2, "Mã tổ chức cần ít nhất 2 ký tự."),
  name: z.string().trim().min(3, "Tên tổ chức cần ít nhất 3 ký tự."),
  status: z.enum(["active", "inactive", "archived"]),
});

export type OrganizationFormValues = z.input<typeof organizationFormSchema>;
export type OrganizationFormPayload = z.output<typeof organizationFormSchema>;

export function getOrganizationFormDefaults(
  initialValues?: Partial<OrganizationModel>
): OrganizationFormValues {
  return {
    id: initialValues?.id ?? "",
    code: initialValues?.code ?? "",
    name: initialValues?.name ?? "",
    status: initialValues?.status ?? "active",
  };
}

export function createOrganizationFormOptions(options: {
  initialValues?: Partial<OrganizationModel>;
  onSubmit: (payload: { value: OrganizationFormPayload }) => Promise<void> | void;
}) {
  return {
    defaultValues: getOrganizationFormDefaults(options.initialValues),
    validators: {
      onChange: organizationFormSchema,
    },
    onSubmit: async ({
      value,
    }: {
      value: OrganizationFormValues;
    }) => {
      const payload = organizationFormSchema.parse(value);
      await options.onSubmit({ value: payload });
    },
  };
}
