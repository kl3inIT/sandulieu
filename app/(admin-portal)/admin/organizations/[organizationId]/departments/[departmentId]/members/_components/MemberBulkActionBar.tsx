"use client";

import { useState } from "react";

import { LoaderCircle } from "lucide-react";

import type { DirectoryStatus } from "@/shared/model/directory-status.model";
import type { BulkUpdateMemberStatusResult } from "@/features/members/member.types";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type BulkFeedback = BulkUpdateMemberStatusResult | null;

type MemberBulkActionBarProps = {
  selectedCount: number;
  isApplying: boolean;
  feedback: BulkFeedback;
  onApply: (targetStatus: DirectoryStatus) => void;
  onDeselectAll: () => void;
};

function BulkFeedbackAlert({
  feedback,
}: {
  feedback: BulkUpdateMemberStatusResult;
}) {
  if (feedback.failureCount === 0) {
    return (
      <Alert>
        <AlertTitle>Thành công</AlertTitle>
        <AlertDescription>
          Đã cập nhật trạng thái cho {feedback.successCount} thành viên thành
          công.
        </AlertDescription>
      </Alert>
    );
  }

  if (feedback.successCount === 0) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Thất bại</AlertTitle>
        <AlertDescription>
          Không thể cập nhật trạng thái cho {feedback.failureCount} thành viên.
          Vui lòng thử lại.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert>
      <AlertTitle>Hoàn thành một phần</AlertTitle>
      <AlertDescription>
        Cập nhật thành công: {feedback.successCount} thành viên. Thất bại:{" "}
        {feedback.failureCount} thành viên.
      </AlertDescription>
    </Alert>
  );
}

export function MemberBulkActionBar({
  selectedCount,
  isApplying,
  feedback,
  onApply,
  onDeselectAll,
}: MemberBulkActionBarProps) {
  const [targetStatus, setTargetStatus] = useState<DirectoryStatus>("active");

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Action bar row */}
      <div className="flex items-center justify-between gap-4 rounded-md border bg-muted px-4 py-3">
        {/* Left */}
        <span className="text-sm font-semibold">
          {selectedCount} thành viên được chọn
        </span>
        {/* Right */}
        <div className="flex items-center gap-2">
          <Select
            value={targetStatus}
            onValueChange={(v) => setTargetStatus(v as DirectoryStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
              <SelectItem value="archived">Đã lưu trữ</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => onApply(targetStatus)}
            disabled={isApplying}
            size="sm"
          >
            {isApplying ? (
              <LoaderCircle className="animate-spin" size={14} />
            ) : null}
            Áp dụng
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectAll}
            disabled={isApplying}
          >
            Bỏ chọn tất cả
          </Button>
        </div>
      </div>

      {/* Feedback Alert — shown after bulk action completes */}
      {feedback && <BulkFeedbackAlert feedback={feedback} />}
    </div>
  );
}
