"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/shared/hooks";
import { Button, Input, Label } from "@/components/ui";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { isApiError } from "@/shared/utils";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const { signup, isSigningUp, signupError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signup({ email, password, name });
      router.push("/dashboard");
    } catch {
      // Error shown via signupError
    }
  }

  const errorMessage = signupError
    ? isApiError(signupError)
      ? signupError.message
      : "Something went wrong. Please try again."
    : null;

  return (
    <div className="space-y-5">
      {/* Google Auth */}
      <GoogleAuthButton label="Sign up with Google" />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or sign up with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="signup-name">Full name</Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-email">Email address</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

        <Button type="submit" className="w-full" loading={isSigningUp} size="lg">
          {isSigningUp ? "Creating account..." : "Create free account"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By signing up you agree to our{" "}
          <span className="underline cursor-pointer hover:text-foreground">Terms</span> and{" "}
          <span className="underline cursor-pointer hover:text-foreground">Privacy Policy</span>.
        </p>
      </form>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
