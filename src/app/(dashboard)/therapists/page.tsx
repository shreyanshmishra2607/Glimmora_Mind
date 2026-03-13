import { TherapistMarketplace } from "@/components/therapists/TherapistMarketplace";

export default function TherapistsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Therapist Marketplace</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Discover licensed therapists and book a session that fits your schedule.
        </p>
      </div>
      <TherapistMarketplace />
    </div>
  );
}
