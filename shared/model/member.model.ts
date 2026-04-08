import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type MemberModel = {
  id: string;
  organizationId: string;
  departmentId: string;
  memberCode: string;
  fullName: string;
  status: DirectoryStatus;
};
