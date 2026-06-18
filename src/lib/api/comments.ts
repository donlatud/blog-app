import type { BlogComment } from "@/types/blog";

import { apiClient, toApiError } from "./client";

type CommentResponse = {
  data: BlogComment & {
    status: string;
  };
};

export async function postBlogComment(
  slug: string,
  body: string
): Promise<CommentResponse["data"]> {
  try {
    const { data } = await apiClient.post<CommentResponse>(
      `/api/blogs/${slug}/comments`,
      { body }
    );

    return data.data;
  } catch (error) {
    throw toApiError(error);
  }
}
