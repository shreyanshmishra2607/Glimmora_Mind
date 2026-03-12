import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockTherapists } from "@/mock";
import type { Therapist, TherapistFilters } from "@/shared/types";

export async function getTherapists(filters?: TherapistFilters): Promise<Therapist[]> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    let list = [...mockTherapists];
    if (filters?.specialization)
      list = list.filter((t) =>
        t.specialization.some(
          (s) => s.toLowerCase() === filters.specialization!.toLowerCase()
        )
      );
    if (filters?.language)
      list = list.filter((t) =>
        t.languages.some(
          (l) => l.toLowerCase() === filters.language!.toLowerCase()
        )
      );
    if (filters?.minRating != null)
      list = list.filter((t) => t.rating >= filters.minRating!);
    return list;
  });
}

export async function getTherapistById(id: string): Promise<Therapist | null> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return mockTherapists.find((t) => t.id === id) ?? null;
  });
}
