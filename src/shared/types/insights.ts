export interface MoodSummary {
  date: string; // YYYY-MM-DD
  averageMood: number; // 1-7 scale derived from MoodValue
  entryCount: number;
}

export interface EmotionalInsight {
  period: string;
  moodTrend: "improving" | "stable" | "declining";
  topMood: string;
  totalSessions: number;
  moodData: MoodSummary[];
}
