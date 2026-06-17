"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/context/AuthProvider";
import { ApiError } from "@/lib/api/apiError";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      title="Sign in"
      subtitle="Welcome back"
      footer={
        <Link
          href="/admin/login"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Admin sign in
        </Link>
      }
    >
      <>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <Button
          type="submit"
          size="lg"
          className="mt-2 h-11 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
        </form>

        <p className="text-body mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-foreground hover:underline">
            Sign up
          </Link>
        </p>
      </>
    </AuthPageLayout>
  );
}
