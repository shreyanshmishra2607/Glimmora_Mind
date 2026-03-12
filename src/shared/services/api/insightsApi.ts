import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockMoodEntries } from "@/mock";
import { mockSessions } from "@/mock";
import type { EmotionalInsight, MoodSummary } from "@/shared/types";

const moodToNumber: Record<string, number> = {
  great: 7,
  good: 6,
  neutral: 5,
  low: 4,
  anxious: 3,
  sad: 2,
  angry: 1,
};

function buildMoodData(userId: string, days: number): MoodSummary[] {
  const byDate = new Map<string, { sum: number; count: number }>();
  const start = new Date();
  start.setDate(start.getDate() - days);
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    byDate.set(key, { sum: 0, count: 0 });
  }
  for (const e of mockMoodEntries.filter((m) => m.userId === userId)) {
    const key = e.recordedAt.slice(0, 10);
    const cur = byDate.get(key);
    if (cur) {
      cur.sum += moodToNumber[e.mood] ?? 5;
      cur.count += 1;
    }
  }
  return Array.from(byDate.entries())
    .map(([date, { sum, count }]) => ({
      date,
      averageMood: count > 0 ? sum / count : 0,
      entryCount: count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getInsights(
  userId: string,
  periodDays: number = 14
): Promise<EmotionalInsight> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    const moodData = buildMoodData(userId, periodDays);
    const withData = moodData.filter((m) => m.entryCount > 0);
    const totalSessions = mockSessions.filter(
      (s) => s.userId === userId && s.status === "completed"
    ).length;
    const first = withData[0]?.averageMood ?? 0;
    const last = withData[withData.length - 1]?.averageMood ?? 0;
    let moodTrend: "improving" | "stable" | "declining" = "stable";
    if (last > first + 0.3) moodTrend = "improving";
    else if (last < first - 0.3) moodTrend = "declining";
    const topMood =
      Object.entries(moodToNumber).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "neutral";
    return {
      period: `Last ${periodDays} days`,
      moodTrend,
      topMood,
      totalSessions,
      moodData,
    };
  });
}
