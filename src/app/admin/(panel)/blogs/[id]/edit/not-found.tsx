import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminEditBlogNotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-8 py-24 text-center">
      <h1 className="text-headline text-2xl">Article not found</h1>
      <p className="text-body mt-3 max-w-md text-sm text-muted-foreground">
        This article may have been deleted or the link is incorrect.
      </p>
      <Link
        href="/admin"
        className={cn(buttonVariants({ variant: "inverted", size: "lg" }), "mt-8 h-10 px-5")}
      >
        Back to dashboard
      </Link>
    </section>
  );
}
