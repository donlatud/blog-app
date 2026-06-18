import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <SiteHeader activeNav={null} />
      <main className="w-full flex-1 py-24">
        <PageContainer className="text-center">
          <h1 className="text-headline text-3xl">Page not found</h1>
          <p className="text-body mt-4 text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex h-10 px-5")}
          >
            Back to home
          </Link>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
