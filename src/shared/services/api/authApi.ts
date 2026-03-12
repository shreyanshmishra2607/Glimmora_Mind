import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockUsers } from "@/mock";
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
    const user = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      name: credentials.name,
      avatarUrl: null,
      createdAt: new Date().toISOString(),
    };
    return { user, token: `mock-token-${user.id}` };
  });
}

export async function logout(): Promise<void> {
  return withDelay(async () => {});
}
