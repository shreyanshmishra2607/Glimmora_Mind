"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { Button, Input, Label } from "@/components/ui";
import { isApiError } from "@/shared/utils";

export function SignupForm() {
  const router = useRouter();
  const { signup, isSigningUp, signupError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signup({ email, password, name });
      router.push("/dashboard");
      router.refresh();
    } catch {
      // Error shown via signupError
    }
  }

  const errorMessage = signupError
    ? isApiError(signupError)
      ? signupError.message
      : "Something went wrong"
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Name</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
      <Button type="submit" className="w-full" loading={isSigningUp}>
        Sign up
      </Button>
    </form>
  );
}
