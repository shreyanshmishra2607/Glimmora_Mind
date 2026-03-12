import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockUsers } from "@/mock";
import type { User } from "@/shared/types";

export async function getCurrentUser(userId: string): Promise<User | null> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return mockUsers.find((u) => u.id === userId) ?? null;
  });
}
