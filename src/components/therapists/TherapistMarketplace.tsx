"use client";

import { useTherapists } from "@/shared/hooks";
import { TherapistCard } from "./TherapistCard";

export function TherapistMarketplace() {
  const { therapists, isLoading, isError, error } = useTherapists();

  if (isError) {
    return (
      <div className="rounded-lg border border-border p-4 text-destructive">
        {error?.message ?? "Failed to load therapists"}
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading therapists...</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {therapists.map((t) => (
        <TherapistCard key={t.id} therapist={t} />
      ))}
    </div>
  );
}
