"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { DirectorySort } from "@/shared/api/directory.contracts";
import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import {
  buildDirectoryTableState,
  createDepartmentScope,
  getDefaultDirectoryListState,
  parseDirectoryListState,
  serializeDirectoryListState,
  toDirectoryListQuery,
  type DirectoryListState,
} from "@/features/directory/shared";
import {
  useBulkUpdateMemberStatusMutation,
  useDeleteMemberMutation,
  useMemberListQuery,
} from "@/features/members/member.query-hooks";
import type {
  BulkUpdateMemberStatusResult,
  Member,
  MemberListSortField,
} from "@/features/members/member.types";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

import { MemberBulkActionBar } from "./_components/MemberBulkActionBar";
import { MemberDeleteDialog } from "./_components/MemberDeleteDialog";
import { MemberListFilters } from "./_components/MemberListFilters";
import { MemberListTable } from "./_components/MemberListTable";
import type { MemberTableSortField } from "./_components/MemberListTable";
import { MemberRowActions } from "./_components/MemberRowActions";

const MEMBER_SORT_FIELDS = [
  "memberCode",
  "fullName",
  "status",
] as const satisfies readonly MemberListSortField[];

const defaultMemberListState = getDefaultDirectoryListState({
  allowedSortFields: MEMBER_SORT_FIELDS,
  defaultSort: [{ field: "fullName", direction: "asc" }],
});

function MembersPageContent() {
  const params = useParams<{ organizationId: string; departmentId: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkFeedback, setBulkFeedback] =
    useState<BulkUpdateMemberStatusResult | null>(null);

  const departmentScope = createDepartmentScope(
    params.organizationId,
    params.departmentId
  );

  const normalizedState = parseDirectoryListState(searchParams, {
    allowedSortFields: MEMBER_SORT_FIELDS,
    defaultSort: defaultMemberListState.sort,
    defaultPageSize: defaultMemberListState.pageSize,
  });

  const tableState = buildDirectoryTableState(normalizedState);

  const memberQuery = useMemberListQuery(
    departmentScope.organizationId,
    departmentScope.departmentId,
    toDirectoryListQuery(normalizedState, {
      organizationId: departmentScope.organizationId,
      departmentId: departmentScope.departmentId,
    })
  );

  const deleteMemberMutation = useDeleteMemberMutation(
    params.organizationId,
    params.departmentId
  );

  const bulkMutation = useBulkUpdateMemberStatusMutation(
    params.organizationId,
    params.departmentId
  );

  const updateListState = (
    nextState: DirectoryListState<MemberListSortField>
  ) => {
    const nextSearchParams = serializeDirectoryListState(nextState);
    const nextQuery = nextSearchParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  const updatePartialState = (
    partialState: Partial<DirectoryListState<MemberListSortField>>
  ) => {
    updateListState({
      ...normalizedState,
      ...partialState,
    });
  };

  const handleSearchChange = (value: string) => {
    updatePartialState({ search: value.trim(), pageIndex: 0 });
  };

  const handleStatusChange = (statuses: DirectoryStatus[]) => {
    updatePartialState({ statuses, pageIndex: 0 });
  };

  const handleSortChange = (field: MemberTableSortField) => {
    const currentSort = normalizedState.sort[0];
    let nextSort: DirectorySort<MemberListSortField>[];

    if (!currentSort || currentSort.field !== field) {
      nextSort = [{ field, direction: "asc" }];
    } else if (currentSort.direction === "asc") {
      nextSort = [{ field, direction: "desc" }];
    } else {
      nextSort = [...defaultMemberListState.sort];
    }

    updatePartialState({ sort: nextSort, pageIndex: 0 });
  };

  const handlePageChange = (pageIndex: number) => {
    updatePartialState({ pageIndex });
  };

  const handleDeleteConfirm = () => {
    if (deletingMember) {
      deleteMemberMutation.mutate(deletingMember.id, {
        onSuccess: () => setDeletingMember(null),
      });
    }
  };

  function handleSelectionChange(ids: string[]) {
    setSelectedIds(ids);
    if (ids.length === 0) setBulkFeedback(null);
  }

  async function handleBulkApply(targetStatus: DirectoryStatus) {
    setBulkFeedback(null);
    const result = await bulkMutation.mutateAsync({
      memberIds: selectedIds,
      targetStatus,
    });
    setBulkFeedback(result);
  }

  function handleDeselectAll() {
    setSelectedIds([]);
    setBulkFeedback(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Danh sách thành viên</h1>
        <Button asChild>
          <Link
            href={`/admin/organizations/${params.organizationId}/departments/${params.departmentId}/members/new`}
          >
            Thêm thành viên
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 pt-4">
          <MemberListFilters
            search={normalizedState.search}
            statuses={normalizedState.statuses}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
          />
          <MemberBulkActionBar
            selectedCount={selectedIds.length}
            isApplying={bulkMutation.isPending}
            feedback={bulkFeedback}
            onApply={handleBulkApply}
            onDeselectAll={handleDeselectAll}
          />
          <MemberListTable
            organizationId={params.organizationId}
            departmentId={params.departmentId}
            members={memberQuery.data?.items ?? []}
            isLoading={memberQuery.isLoading}
            isError={memberQuery.isError}
            errorMessage={(memberQuery.error as Error)?.message}
            sort={normalizedState.sort}
            pageIndex={tableState.pagination.pageIndex}
            pageSize={tableState.pagination.pageSize}
            pageCount={memberQuery.data?.pageCount ?? 1}
            rowCount={memberQuery.data?.rowCount ?? 0}
            selectedIds={selectedIds}
            renderRowActions={(member) => (
              <MemberRowActions
                organizationId={params.organizationId}
                departmentId={params.departmentId}
                member={member}
                onDeleteClick={setDeletingMember}
              />
            )}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
            onSelectionChange={handleSelectionChange}
          />
        </CardContent>
      </Card>

      <MemberDeleteDialog
        member={deletingMember}
        isOpen={deletingMember !== null}
        isDeleting={deleteMemberMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingMember(null)}
      />
    </div>
  );
}

export default function AdminDepartmentMembersPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground">
          Đang chuẩn hóa phạm vi phòng ban...
        </p>
      }
    >
      <MembersPageContent />
    </Suspense>
  );
}
