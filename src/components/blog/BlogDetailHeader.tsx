import { PageContainer } from "@/components/layout/PageContainer";

type BlogDetailHeaderProps = {
  title: string;
};

export function BlogDetailHeader({ title }: BlogDetailHeaderProps) {
  return (
    <PageContainer className="mt-6">
      <h1 className="text-headline max-w-4xl text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h1>
    </PageContainer>
  );
}
