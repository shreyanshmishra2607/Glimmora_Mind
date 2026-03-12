"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { Button, Input, Label } from "@/components/ui";
import { isApiError } from "@/shared/utils";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/dashboard");
      router.refresh();
    } catch {
      // Error shown via loginError
    }
  }

  const errorMessage = loginError
    ? isApiError(loginError)
      ? loginError.message
      : "Something went wrong"
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
      <Button type="submit" className="w-full" loading={isLoggingIn}>
        Log in
      </Button>
    </form>
  );
}
