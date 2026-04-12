import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type MemberParentContextModel = {
  organizationId: string;
  organizationName: string;
  departmentId: string;
  departmentName: string;
  manageOrganizationPath: string;
  manageDepartmentsPath: string;
  manageMembersPath: string;
};

export type MemberModel = {
  id: string;
  organizationId: string;
  departmentId: string;
  memberCode: string;
  fullName: string;
  status: DirectoryStatus;
};
