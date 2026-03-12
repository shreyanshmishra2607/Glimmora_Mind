export type UserPlan = "free" | "mind_plus" | "therapy_access";
export type AuthProvider = "email" | "google";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  bio?: string | null;
  phone?: string | null;
  plan: UserPlan;
  authProvider: AuthProvider;
  createdAt: string;
}
