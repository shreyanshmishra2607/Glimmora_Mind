import { TherapistMarketplace } from "@/components/therapists/TherapistMarketplace";

export default function TherapistsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Therapist Marketplace</h1>
      <TherapistMarketplace />
    </div>
  );
}
