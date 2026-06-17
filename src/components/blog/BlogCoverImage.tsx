import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";

type BlogCoverImageProps = {
  title: string;
  coverImageUrl: string;
};

export function BlogCoverImage({ title, coverImageUrl }: BlogCoverImageProps) {
  if (!coverImageUrl) {
    return null;
  }

  return (
    <PageContainer className="mt-8">
      <figure className="relative aspect-21/9 overflow-hidden rounded-xl bg-muted">
        <Image
          src={coverImageUrl}
          alt={`Cover image for ${title}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover"
        />
      </figure>
    </PageContainer>
  );
}
