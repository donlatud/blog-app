import { notFound, redirect } from "next/navigation";

import { AdminBlogForm } from "@/components/admin/AdminBlogForm";
import { ApiError } from "@/lib/api/apiError";
import { fetchAdminBlogById } from "@/lib/api/admin/blogs";

type AdminEditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditBlogPage({
  params,
}: AdminEditBlogPageProps) {
  const { id } = await params;

  try {
    const blog = await fetchAdminBlogById(id);
    return <AdminBlogForm mode="edit" initialBlog={blog} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    if (error instanceof ApiError && error.status === 401) {
      redirect("/admin/login");
    }

    if (error instanceof ApiError && error.status === 403) {
      redirect("/");
    }

    throw error;
  }
}
