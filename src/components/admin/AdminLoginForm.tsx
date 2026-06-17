"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/context/AuthProvider";
import { ApiError } from "@/lib/api/apiError";

export function AdminLoginForm() {
  const router = useRouter();
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const profile = await login(email.trim(), password);

      if (profile.role !== "admin") {
        await logout();
        setError("Invalid email or password.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Invalid email or password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-muted/40">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <section className="surface-card w-full max-w-md p-8">
          <header className="mb-8 text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted"
            >
              <Shield className="size-5 text-foreground" />
            </span>
            <h1 className="text-headline text-2xl">Admin sign in</h1>
            <p className="text-body mt-2 text-sm text-muted-foreground">
              Blog Admin Panel
            </p>
          </header>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
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
              error={error ?? undefined}
              required
            />

            <Button
              type="submit"
              variant="inverted"
              size="lg"
              className="mt-2 h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </section>

        <p className="text-body mt-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Back to member sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
