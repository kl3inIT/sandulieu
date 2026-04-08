import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type DepartmentModel = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: DirectoryStatus;
};
