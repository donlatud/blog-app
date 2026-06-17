import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthPageLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="font-heading mb-8 text-3xl font-bold tracking-tight text-foreground"
        >
          Blog
        </Link>

        <section className="surface-card w-full max-w-md p-8">
          <header className="mb-8 text-center">
            <h1 className="text-headline text-2xl">{title}</h1>
            <p className="text-body mt-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
          </header>

          {children}
        </section>

        {footer ? <div className="mt-8 text-center">{footer}</div> : null}
      </div>
    </div>
  );
}
