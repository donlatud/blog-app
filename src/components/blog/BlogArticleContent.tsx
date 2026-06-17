import { PageContainer } from "@/components/layout/PageContainer";

type BlogArticleContentProps = {
  content: string;
};

export function BlogArticleContent({ content }: BlogArticleContentProps) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <PageContainer className="mt-8">
      <div className="mx-auto max-w-3xl">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={index} className="text-body mb-6 text-base leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-body text-muted-foreground">ไม่มีเนื้อหาบทความ</p>
        )}
      </div>
    </PageContainer>
  );
}
