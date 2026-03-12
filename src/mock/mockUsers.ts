import type { User } from "@/shared/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "jane.doe@example.com",
    name: "Jane Doe",
    avatarUrl: null,
    bio: "Working on being my best self, one day at a time. I believe in the power of small steps.",
    phone: "+1 (555) 012-3456",
    plan: "mind_plus",
    authProvider: "email",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    email: "john.smith@example.com",
    name: "John Smith",
    avatarUrl: null,
    bio: "Exploring mindfulness and emotional wellness daily.",
    phone: "+1 (555) 987-6543",
    plan: "free",
    authProvider: "email",
    createdAt: "2024-02-20T14:30:00Z",
  },
];

/** The dedicated mock user returned by the Google OAuth flow. */
export const MOCK_GOOGLE_USER: User = {
  id: "user-google-1",
  email: "alex.morgan@gmail.com",
  name: "Alex Morgan",
  avatarUrl: null,
  bio: "Signed in with Google. Here to find balance and clarity.",
  phone: null,
  plan: "free",
  authProvider: "google",
  createdAt: new Date().toISOString(),
};
