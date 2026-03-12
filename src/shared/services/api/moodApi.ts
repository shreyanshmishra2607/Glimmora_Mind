import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockMoodEntries } from "@/mock";
import type { MoodEntry, MoodValue } from "@/shared/types";

// In-memory copy for mock so we can add entries (services are the only place that mutate)
const entries: MoodEntry[] = [...mockMoodEntries];

export async function getMoodEntries(userId: string): Promise<MoodEntry[]> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return entries.filter((e) => e.userId === userId).sort(
      (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
    );
  });
}

export async function addMoodEntry(
  userId: string,
  mood: MoodValue,
  note?: string
): Promise<MoodEntry> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    const entry: MoodEntry = {
      id: `mood-${Date.now()}`,
      userId,
      mood,
      note,
      recordedAt: new Date().toISOString(),
    };
    entries.push(entry);
    return entry;
  });
}
