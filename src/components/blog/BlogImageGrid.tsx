import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import type { BlogImage } from "@/types/blog";

type BlogImageGridProps = {
  title: string;
  images: BlogImage[];
};

export function BlogImageGrid({ title, images }: BlogImageGridProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <PageContainer className="mt-8">
      <ul className="grid list-none grid-cols-2 gap-4 lg:grid-cols-4">
        {images.map((image) => (
          <li key={image.id}>
            <figure className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={image.imageUrl}
                alt={`Supporting image ${image.position} for ${title}`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </figure>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
