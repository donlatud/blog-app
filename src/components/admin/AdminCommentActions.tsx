"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { patchAdminCommentStatus } from "@/lib/api/admin/comments";
import { ApiError } from "@/lib/api/apiError";
import { cn } from "@/lib/utils";
import type { AdminCommentListItem } from "@/types/admin";

type AdminCommentActionsProps = {
  comment: AdminCommentListItem;
};

export function AdminCommentActions({ comment }: AdminCommentActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const showApprove = comment.status !== "approved";
  const showReject = comment.status !== "rejected";

  const handleApprove = async () => {
    setIsUpdating(true);

    try {
      await patchAdminCommentStatus(comment.id, "approved");
      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof ApiError
          ? error.message
          : "Unable to approve this comment."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    setIsUpdating(true);

    try {
      await patchAdminCommentStatus(comment.id, "rejected");
      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof ApiError
          ? error.message
          : "Unable to reject this comment."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (!showApprove && !showReject) {
    return null;
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      {showApprove ? (
        <Button
          type="button"
          variant="inverted"
          size="sm"
          disabled={isUpdating}
          onClick={handleApprove}
        >
          Approve
        </Button>
      ) : null}

      {showReject ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUpdating}
          onClick={handleReject}
          className={cn(
            "border-destructive text-destructive hover:bg-destructive/5 hover:text-destructive"
          )}
        >
          Reject
        </Button>
      ) : null}
    </div>
  );
}
