import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSessionsForUser,
  getAvailability,
  bookSession,
} from "@/shared/services/api/sessionApi";
import { useAuthStore } from "@/shared/store";

export function useSessions() {
  const userId = useAuthStore((s) => s.user?.id);
  const query = useQuery({
    queryKey: ["sessions", userId],
    queryFn: () => getSessionsForUser(userId!),
    enabled: !!userId,
  });
  return {
    sessions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useAvailability(therapistId: string | null) {
  const query = useQuery({
    queryKey: ["availability", therapistId],
    queryFn: () => getAvailability(therapistId!),
    enabled: !!therapistId,
  });
  return {
    slots: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useSessionBooking() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);
  const mutation = useMutation({
    mutationFn: ({
      slotId,
      therapistId,
    }: {
      slotId: string;
      therapistId: string;
    }) => bookSession(userId!, slotId, therapistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
  return {
    book: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
