export const DIRECTORY_STATUSES = ["active", "inactive", "archived"] as const;

export type DirectoryStatus = (typeof DIRECTORY_STATUSES)[number];
