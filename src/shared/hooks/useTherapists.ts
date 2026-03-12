import { useQuery } from "@tanstack/react-query";
import { getTherapists, getTherapistById } from "@/shared/services/api/therapistApi";
import type { TherapistFilters } from "@/shared/types";

export function useTherapists(filters?: TherapistFilters) {
  const query = useQuery({
    queryKey: ["therapists", filters],
    queryFn: () => getTherapists(filters),
  });
  return {
    therapists: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useTherapist(id: string | null) {
  const query = useQuery({
    queryKey: ["therapist", id],
    queryFn: () => getTherapistById(id!),
    enabled: !!id,
  });
  return {
    therapist: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
