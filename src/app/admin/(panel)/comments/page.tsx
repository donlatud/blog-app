import { Suspense } from "react";

import { AdminCommentsLoader } from "@/components/admin/AdminCommentsLoader";

export default function AdminCommentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        </div>
      }
    >
      <AdminCommentsLoader />
    </Suspense>
  );
}
