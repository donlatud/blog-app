"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AdminBlogForm } from "@/components/admin/AdminBlogForm";
import { ApiError } from "@/lib/api/apiError";
import { fetchAdminBlogById } from "@/lib/api/admin/blogs";
import type { AdminBlogDetail } from "@/types/admin";

type AdminEditBlogLoaderProps = {
  id: string;
};

export function AdminEditBlogLoader({ id }: AdminEditBlogLoaderProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<AdminBlogDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchAdminBlogById(id)
      .then((result) => {
        if (!cancelled) {
          setBlog(result);
        }
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }

        if (err instanceof ApiError && err.status === 404) {
          router.replace("/admin");
          return;
        }

        setBlog(null);
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-sm text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center px-8 py-24 text-center">
        <h1 className="text-headline text-2xl">Unable to load article</h1>
        <p className="text-body mt-3 text-sm text-muted-foreground">
          Please try again from the dashboard.
        </p>
      </section>
    );
  }

  return <AdminBlogForm mode="edit" initialBlog={blog} />;
}
