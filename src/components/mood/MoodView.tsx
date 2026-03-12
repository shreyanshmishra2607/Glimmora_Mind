"use client";

import { useState } from "react";
import { useMood, useMoodEntry } from "@/shared/hooks";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { MoodValue } from "@/shared/types";
import { formatDateTime } from "@/shared/utils";

const MOOD_OPTIONS: { value: MoodValue; label: string }[] = [
  { value: "great", label: "Great" },
  { value: "good", label: "Good" },
  { value: "neutral", label: "Neutral" },
  { value: "low", label: "Low" },
  { value: "anxious", label: "Anxious" },
  { value: "sad", label: "Sad" },
  { value: "angry", label: "Angry" },
];

export function MoodView() {
  const { entries, isLoading, isError, error } = useMood();
  const { addEntry, isPending } = useMoodEntry();
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMood) return;
    try {
      await addEntry({ mood: selectedMood, note: note.trim() || undefined });
      setSelectedMood(null);
      setNote("");
    } catch {
      // Error could be shown via toast
    }
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border p-4 text-destructive">
        {error?.message ?? "Failed to load mood entries"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant={selectedMood === opt.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMood(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-muted-foreground block mb-1">
                Optional note
              </label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="mt-2"
              disabled={!selectedMood || isPending}
              loading={isPending}
            >
              Log mood
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent entries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="text-muted-foreground text-sm">No entries yet.</p>
          ) : (
            <ul className="space-y-2">
              {entries.slice(0, 10).map((e) => (
                <li
                  key={e.id}
                  className="flex justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <span className="capitalize">{e.mood}</span>
                  <span className="text-muted-foreground">
                    {formatDateTime(e.recordedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
