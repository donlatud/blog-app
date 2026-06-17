import Link from "next/link";

import { AuthPageLayout } from "@/components/auth/AuthPageLayout";

export default function AdminLoginPage() {
  return (
    <AuthPageLayout
      title="Admin sign in"
      subtitle="Admin authentication will be available in a later release."
    >
      <p className="text-body text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Back to member sign in
        </Link>
      </p>
    </AuthPageLayout>
  );
}
