import { Suspense } from "react";

import { AdminEditBlogLoader } from "@/components/admin/AdminEditBlogLoader";

type AdminEditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function AdminEditBlogContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminEditBlogLoader id={id} />;
}

export default function AdminEditBlogPage({ params }: AdminEditBlogPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">Loading article...</p>
        </div>
      }
    >
      <AdminEditBlogContent params={params} />
    </Suspense>
  );
}
