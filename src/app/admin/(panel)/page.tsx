import { Suspense } from "react";

import { AdminDashboardLoader } from "@/components/admin/AdminDashboardLoader";

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      }
    >
      <AdminDashboardLoader />
    </Suspense>
  );
}
