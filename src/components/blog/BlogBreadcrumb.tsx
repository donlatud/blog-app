import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";

type BlogBreadcrumbProps = {
  title: string;
};

export function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <PageContainer className="pt-8">
      <nav aria-label="breadcrumb">
        <ol className="flex list-none flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              หน้าแรก
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              บทความ
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="line-clamp-1 text-foreground" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
    </PageContainer>
  );
}
