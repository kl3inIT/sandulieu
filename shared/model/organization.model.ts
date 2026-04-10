import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type OrganizationDepartmentSummary = {
  count: number;
  previewNames: string[];
  managePath: string;
};

export type OrganizationModel = {
  id: string;
  code: string;
  name: string;
  status: DirectoryStatus;
  createdAt: string;
  updatedAt: string;
  departmentSummary: OrganizationDepartmentSummary;
};
