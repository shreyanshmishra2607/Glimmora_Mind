export type MoodValue =
  | "great"
  | "good"
  | "neutral"
  | "low"
  | "anxious"
  | "sad"
  | "angry";

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodValue;
  note?: string;
  recordedAt: string; // ISO
}
