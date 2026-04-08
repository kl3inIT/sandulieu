import { z } from "zod";

import type { MemberModel } from "@/shared/model/member.model";

export const memberFormSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Mã định danh thành viên là bắt buộc.")
    .regex(/^[^\s]+$/, "Mã định danh thành viên phải là id ổn định, không chứa khoảng trắng."),
  organizationId: z
    .string()
    .trim()
    .min(1, "Mã tổ chức cha là bắt buộc.")
    .regex(/^[^\s]+$/, "Mã tổ chức cha phải là id ổn định, không chứa khoảng trắng."),
  departmentId: z
    .string()
    .trim()
    .min(1, "Mã phòng ban cha là bắt buộc.")
    .regex(/^[^\s]+$/, "Mã phòng ban cha phải là id ổn định, không chứa khoảng trắng."),
  memberCode: z.string().trim().min(2, "Mã thành viên cần ít nhất 2 ký tự."),
  fullName: z.string().trim().min(3, "Họ tên cần ít nhất 3 ký tự."),
  status: z.enum(["active", "inactive", "archived"]),
});

export type MemberFormValues = z.input<typeof memberFormSchema>;
export type MemberFormPayload = z.output<typeof memberFormSchema>;

export function getMemberFormDefaults(
  initialValues?: Partial<MemberModel>
): MemberFormValues {
  return {
    id: initialValues?.id ?? "",
    organizationId: initialValues?.organizationId ?? "",
    departmentId: initialValues?.departmentId ?? "",
    memberCode: initialValues?.memberCode ?? "",
    fullName: initialValues?.fullName ?? "",
    status: initialValues?.status ?? "active",
  };
}

export function createMemberFormOptions(options: {
  initialValues?: Partial<MemberModel>;
  onSubmit: (payload: { value: MemberFormPayload }) => Promise<void> | void;
}) {
  return {
    defaultValues: getMemberFormDefaults(options.initialValues),
    validators: {
      onChange: memberFormSchema,
    },
    onSubmit: async ({
      value,
    }: {
      value: MemberFormValues;
    }) => {
      const payload = memberFormSchema.parse(value);
      await options.onSubmit({ value: payload });
    },
  };
}
