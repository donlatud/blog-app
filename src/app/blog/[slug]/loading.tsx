import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

function DetailSkeleton() {
  return (
    <PageContainer className="py-8">
      <div className="flex flex-col gap-6">
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="aspect-21/9 animate-pulse rounded-xl bg-muted" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 w-full animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default function BlogDetailLoading() {
  return (
    <>
      <SiteHeader activeNav={null} />
      <main className="w-full flex-1 pb-16" aria-busy="true">
        <DetailSkeleton />
      </main>
      <SiteFooter />
    </>
  );
}
