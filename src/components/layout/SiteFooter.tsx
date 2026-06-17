import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full bg-background">
      <PageContainer className="flex flex-col items-center gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="font-heading text-base font-bold text-foreground"
        >
          Blog
        </Link>

        <nav aria-label="ลิงก์ท้ายหน้า" className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </PageContainer>
    </footer>
  );
}
