import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type DepartmentParentContextModel = {
  organizationId: string;
  organizationName: string;
  manageOrganizationPath: string;
  manageDepartmentsPath: string;
};

export type DepartmentMemberSummaryModel = {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  archivedMembers: number;
  previewNames: string[];
  manageMembersPath: string;
};

export type DepartmentModel = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: DirectoryStatus;
  createdAt: string;
  updatedAt: string;
  parentContext: DepartmentParentContextModel;
  memberSummary: DepartmentMemberSummaryModel;
};
