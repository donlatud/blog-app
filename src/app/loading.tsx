import { LandingHero } from "@/components/landing/LandingHero";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-16/10 animate-pulse rounded-xl bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="w-full flex-1 pb-8">
        <LandingHero />
        <section aria-label="Loading articles" aria-busy="true">
          <PageContainer className="py-8">
            <ul className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index}>
                  <BlogCardSkeleton />
                </li>
              ))}
            </ul>
          </PageContainer>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
