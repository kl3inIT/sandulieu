"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";

import {
  buildDirectoryTableState,
  createDepartmentScope,
  getDefaultDirectoryListState,
  parseDirectoryListState,
  toDirectoryListQuery,
} from "@/features/directory/shared";
import { useMemberListQuery } from "@/features/members/member.query-hooks";
import type { MemberListSortField } from "@/features/members/member.types";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

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
  const searchParams = useSearchParams();
  const departmentScope = createDepartmentScope(
    params.organizationId,
    params.departmentId
  );
  const normalizedState = parseDirectoryListState(searchParams, {
    allowedSortFields: MEMBER_SORT_FIELDS,
    defaultSort: defaultMemberListState.sort,
    defaultPageSize: defaultMemberListState.pageSize,
  });
  const memberQuery = useMemberListQuery(
    departmentScope.organizationId,
    departmentScope.departmentId,
    toDirectoryListQuery(normalizedState, {
      organizationId: departmentScope.organizationId,
      departmentId: departmentScope.departmentId,
    })
  );
  const tableState = buildDirectoryTableState(normalizedState);

  if (memberQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Chưa tải được danh sách thành viên</AlertTitle>
        <AlertDescription>
          {(memberQuery.error as Error).message ||
            "Đã có lỗi xảy ra khi lấy dữ liệu thành viên."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Badge variant="outline">Department scope proof</Badge>
              <CardTitle>
                Thành viên của phòng ban {departmentScope.departmentId}
              </CardTitle>
              <CardDescription>
                Cả organizationId và departmentId đã được chuẩn hóa qua createDepartmentScope trước khi query.
              </CardDescription>
            </div>
            <Badge variant="secondary">
              Trang {tableState.pagination.pageIndex + 1} / kích thước{" "}
              {tableState.pagination.pageSize}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>Tổ chức: {departmentScope.organizationId}</span>
            <span>Phòng ban: {departmentScope.departmentId}</span>
            <span>Tìm kiếm: {normalizedState.search || "Không có"}</span>
            <span>
              Trạng thái: {normalizedState.statuses.join(", ") || "Tất cả"}
            </span>
          </div>

          {memberQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              Đang tải dữ liệu thành viên...
            </p>
          ) : null}

          <div className="flex flex-col gap-3">
            {(memberQuery.data?.items ?? []).map((member) => (
              <Card key={member.id} size="sm">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle>{member.fullName}</CardTitle>
                      <CardDescription>
                        {member.memberCode} · {member.id}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{member.status}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDepartmentMembersPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-muted-foreground">Đang chuẩn hóa phạm vi phòng ban...</p>}
    >
      <MembersPageContent />
    </Suspense>
  );
}
