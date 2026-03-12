import type { MoodEntry } from "@/shared/types";

export const mockMoodEntries: MoodEntry[] = [
  {
    id: "mood-1",
    userId: "user-1",
    mood: "good",
    note: "Morning walk helped.",
    recordedAt: "2025-03-12T08:00:00Z",
  },
  {
    id: "mood-2",
    userId: "user-1",
    mood: "neutral",
    recordedAt: "2025-03-11T19:00:00Z",
  },
  {
    id: "mood-3",
    userId: "user-1",
    mood: "anxious",
    note: "Work deadline.",
    recordedAt: "2025-03-11T09:00:00Z",
  },
  {
    id: "mood-4",
    userId: "user-1",
    mood: "good",
    recordedAt: "2025-03-10T20:00:00Z",
  },
];
