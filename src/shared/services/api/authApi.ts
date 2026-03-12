import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockUsers, MOCK_GOOGLE_USER } from "@/mock";
import type { User } from "@/shared/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );
    if (!user) throw new ApiError("Invalid email or password", 401);
    return { user, token: `mock-token-${user.id}` };
  });
}

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    const exists = mockUsers.some(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );
    if (exists) throw new ApiError("Email already registered", 409);
    const user: User = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      name: credentials.name,
      avatarUrl: null,
      bio: null,
      phone: null,
      plan: "free",
      authProvider: "email",
      createdAt: new Date().toISOString(),
    };
    return { user, token: `mock-token-${user.id}` };
  });
}

/**
 * Simulates the Google OAuth redirect + callback flow.
 * In production this would be replaced by your OAuth provider's SDK
 * (e.g. NextAuth, Supabase, Firebase Auth). The function signature stays the same.
 */
export async function loginWithGoogle(): Promise<AuthResponse> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return {
      user: MOCK_GOOGLE_USER,
      token: `mock-google-token-${MOCK_GOOGLE_USER.id}`,
    };
  });
}

export async function logout(): Promise<void> {
  return withDelay(async () => {});
}
