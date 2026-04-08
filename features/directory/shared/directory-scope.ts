import type {
  DepartmentScope,
  OrganizationScope,
} from "@/shared/api/directory.contracts";

export function createOrganizationScope(organizationId: string): OrganizationScope {
  return {
    organizationId: normalizeStableIdentifier(organizationId, "organizationId"),
  };
}

export function createDepartmentScope(
  organizationId: string,
  departmentId: string,
): DepartmentScope {
  return {
    organizationId: normalizeStableIdentifier(organizationId, "organizationId"),
    departmentId: normalizeStableIdentifier(departmentId, "departmentId"),
  };
}

function normalizeStableIdentifier(value: string, fieldName: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new Error(`${fieldName} is required.`);
  }

  if (trimmedValue !== value) {
    throw new Error(`${fieldName} must not contain leading or trailing whitespace.`);
  }

  if (trimmedValue.includes(" ")) {
    throw new Error(`${fieldName} must use a stable identifier instead of a display name.`);
  }

  return trimmedValue;
}
