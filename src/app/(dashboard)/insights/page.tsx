import { InsightsView } from "@/components/insights/InsightsView";

export default function InsightsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Emotional Insights</h1>
      <InsightsView />
    </div>
  );
}
