"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/shared/hooks";
import { Button, Input, Label } from "@/components/ui";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { isApiError } from "@/shared/utils";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch {
      // Error shown via loginError
    }
  }

  const errorMessage = loginError
    ? isApiError(loginError)
      ? loginError.message
      : "Something went wrong. Please try again."
    : null;

  return (
    <div className="space-y-5">
      {/* Google Auth */}
      <GoogleAuthButton label="Continue with Google" />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email address</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <button
              type="button"
              className="text-xs text-primary hover:underline focus:outline-none"
              onClick={() => {
                /* Forgot password – mock no-op; replace with real handler later */
                alert("Password reset emails are not enabled in mock mode.");
              }}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive border border-destructive/20">
            {errorMessage}
          </p>
        )}

        <Button type="submit" className="w-full" loading={isLoggingIn} size="lg">
          {isLoggingIn ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Demo hint */}
      <p className="text-xs text-center text-muted-foreground">
        Demo: <span className="font-mono">jane.doe@example.com</span> / any password
      </p>

      <p className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-medium hover:underline">
          Create one free
        </Link>
      </p>
    </div>
  );
}
