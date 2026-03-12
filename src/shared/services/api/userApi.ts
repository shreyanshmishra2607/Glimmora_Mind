import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockUsers } from "@/mock";
import type { User } from "@/shared/types";

export interface UpdateProfilePayload {
  name?: string;
  bio?: string | null;
  phone?: string | null;
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return mockUsers.find((u) => u.id === userId) ?? null;
  });
}

/**
 * Updates the user profile in-memory.
 * When the real API is ready, replace the mock mutation with a PATCH /users/:id call.
 */
export async function updateProfile(
  userId: string,
  payload: UpdateProfilePayload
): Promise<User> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    const idx = mockUsers.findIndex((u) => u.id === userId);
    if (idx === -1) throw new ApiError("User not found", 404);
    const updated: User = { ...mockUsers[idx], ...payload };
    mockUsers[idx] = updated;
    return updated;
  });
}

/**
 * Simulates a password change.
 * Always succeeds in mock mode (no real validation needed).
 * Replace with POST /auth/change-password when backend is ready.
 */
export async function updatePassword(
  _userId: string,
  _currentPassword: string,
  _newPassword: string
): Promise<void> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    // Mock: always succeeds
  });
}
