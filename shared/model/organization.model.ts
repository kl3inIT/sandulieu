import type { DirectoryStatus } from "@/shared/model/directory-status.model";

export type OrganizationModel = {
  id: string;
  code: string;
  name: string;
  status: DirectoryStatus;
};
