import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import type { BlogImage } from "@/types/blog";

type BlogGalleryProps = {
  title: string;
  coverImageUrl: string;
  images: BlogImage[];
};

export function BlogGallery({ title, coverImageUrl, images }: BlogGalleryProps) {
  return (
    <PageContainer className="mt-8 flex flex-col gap-6">
      {coverImageUrl ? (
        <figure className="relative aspect-21/9 overflow-hidden rounded-xl bg-muted">
          <Image
            src={coverImageUrl}
            alt={`ภาพปกบทความ ${title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover"
          />
        </figure>
      ) : null}

      {images.length > 0 ? (
        <ul className="grid list-none grid-cols-2 gap-4 lg:grid-cols-4">
          {images.map((image) => (
            <li key={image.id}>
              <figure className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={image.imageUrl}
                  alt={`ภาพประกอบบทความ ${title} ลำดับที่ ${image.position}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
    </PageContainer>
  );
}
