import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMoodEntries, addMoodEntry } from "@/shared/services/api/moodApi";
import { useAuthStore } from "@/shared/store";
import type { MoodValue } from "@/shared/types";

export function useMood() {
  const userId = useAuthStore((s) => s.user?.id);
  const query = useQuery({
    queryKey: ["mood", userId],
    queryFn: () => getMoodEntries(userId!),
    enabled: !!userId,
  });
  return {
    entries: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useMoodEntry() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);
  const mutation = useMutation({
    mutationFn: ({ mood, note }: { mood: MoodValue; note?: string }) =>
      addMoodEntry(userId!, mood, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mood"] });
    },
  });
  return {
    addEntry: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
