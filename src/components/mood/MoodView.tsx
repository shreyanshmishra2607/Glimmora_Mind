"use client";

import { useState } from "react";
import { useMood, useMoodEntry } from "@/shared/hooks";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { MoodValue } from "@/shared/types";
import { formatDateTime } from "@/shared/utils";
import { cn } from "@/lib/utils";

/* ─── Config ─────────────────────────────────────────────────────────── */
const MOOD_OPTIONS: {
  value: MoodValue;
  label: string;
  emoji: string;
  active: string;
  inactive: string;
  pill: string;
}[] = [
  {
    value: "great",
    label: "Great",
    emoji: "😄",
    active: "bg-emerald-500 border-emerald-500 text-white",
    inactive: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700",
    pill: "bg-emerald-100 text-emerald-700",
  },
  {
    value: "good",
    label: "Good",
    emoji: "🙂",
    active: "bg-green-500 border-green-500 text-white",
    inactive: "bg-green-50 border-green-200 hover:bg-green-100 text-green-700",
    pill: "bg-green-100 text-green-700",
  },
  {
    value: "neutral",
    label: "Neutral",
    emoji: "😐",
    active: "bg-amber-500 border-amber-500 text-white",
    inactive: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700",
    pill: "bg-amber-100 text-amber-700",
  },
  {
    value: "low",
    label: "Low",
    emoji: "😔",
    active: "bg-orange-500 border-orange-500 text-white",
    inactive: "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700",
    pill: "bg-orange-100 text-orange-700",
  },
  {
    value: "anxious",
    label: "Anxious",
    emoji: "😰",
    active: "bg-red-500 border-red-500 text-white",
    inactive: "bg-red-50 border-red-200 hover:bg-red-100 text-red-600",
    pill: "bg-red-100 text-red-600",
  },
  {
    value: "sad",
    label: "Sad",
    emoji: "😢",
    active: "bg-blue-500 border-blue-500 text-white",
    inactive: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700",
    pill: "bg-blue-100 text-blue-700",
  },
  {
    value: "angry",
    label: "Angry",
    emoji: "😠",
    active: "bg-rose-600 border-rose-600 text-white",
    inactive: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-700",
    pill: "bg-rose-100 text-rose-700",
  },
];

const MOOD_MAP = Object.fromEntries(MOOD_OPTIONS.map((m) => [m.value, m])) as Record<MoodValue, typeof MOOD_OPTIONS[number]>;

/* ─── Component ──────────────────────────────────────────────────────── */
export function MoodView() {
  const { entries, isLoading, isError, error } = useMood();
  const { addEntry, isPending }                = useMoodEntry();
  const [selectedMood, setSelectedMood]        = useState<MoodValue | null>(null);
  const [note, setNote]                        = useState("");
  const [submitted, setSubmitted]              = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMood) return;
    try {
      await addEntry({ mood: selectedMood, note: note.trim() || undefined });
      setSelectedMood(null);
      setNote("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      // shown via toast
    }
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive text-sm">
        {error?.message ?? "Failed to load mood entries"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Log mood card ──────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg">
            How are you feeling right now?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mood grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {MOOD_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedMood(opt.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-150 select-none",
                    selectedMood === opt.value ? opt.active : opt.inactive
                  )}
                >
                  <span className="text-2xl sm:text-3xl leading-none">{opt.emoji}</span>
                  <span className="text-[11px] sm:text-xs font-medium leading-tight">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Optional note */}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Add a note{" "}
                <span className="font-normal text-muted-foreground/60">(optional)</span>
              </label>
              <textarea
                className="w-full min-h-[80px] rounded-xl border border-input bg-background/50 px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none transition-colors placeholder:text-muted-foreground/60"
                placeholder="What's on your mind?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Button
                type="submit"
                disabled={!selectedMood || isPending}
                loading={isPending}
                className="flex-1 sm:flex-none"
              >
                {isPending ? "Logging…" : "Log mood"}
              </Button>
              {submitted && (
                <p className="text-sm text-emerald-600 font-medium animate-fade-in">
                  ✓ Mood logged!
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ── Recent entries card ───────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Recent entries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
              <span className="h-3 w-3 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin" />
              Loading entries…
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-3">📋</p>
              <p className="text-sm text-muted-foreground">
                No entries yet. Log your first mood above!
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {entries.slice(0, 10).map((e) => {
                const opt = MOOD_MAP[e.mood];
                return (
                  <li
                    key={e.id}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg shrink-0">{opt?.emoji ?? "🙂"}</span>
                      <span
                        className={cn(
                          "text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0",
                          opt?.pill ?? "bg-muted text-muted-foreground"
                        )}
                      >
                        {e.mood}
                      </span>
                      {e.note && (
                        <span className="text-xs text-muted-foreground truncate hidden sm:block">
                          {e.note}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {formatDateTime(e.recordedAt)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
