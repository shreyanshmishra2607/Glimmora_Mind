import { useQuery } from "@tanstack/react-query";
import { getInsights } from "@/shared/services/api/insightsApi";
import { useAuthStore } from "@/shared/store";

export function useInsights(periodDays: number = 14) {
  const userId = useAuthStore((s) => s.user?.id);
  const query = useQuery({
    queryKey: ["insights", userId, periodDays],
    queryFn: () => getInsights(userId!, periodDays),
    enabled: !!userId,
  });
  return {
    insights: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
