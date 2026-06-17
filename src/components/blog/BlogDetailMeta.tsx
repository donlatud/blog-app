import { Calendar, Eye } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { formatBlogDate } from "@/lib/format-date";
import { formatViewCount } from "@/lib/format-view-count";

type BlogDetailMetaProps = {
  publishedAt: string;
  viewCount: number;
};

export function BlogDetailMeta({
  publishedAt,
  viewCount,
}: BlogDetailMetaProps) {
  return (
    <PageContainer>
      <ul className="mt-4 flex list-none flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Calendar className="size-4" aria-hidden />
          <time dateTime={publishedAt}>{formatBlogDate(publishedAt)}</time>
        </li>
        <li className="flex items-center gap-1.5">
          <Eye className="size-4" aria-hidden />
          <span>{formatViewCount(viewCount)} views</span>
        </li>
      </ul>
    </PageContainer>
  );
}
