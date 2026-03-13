import { InsightsView } from "@/components/insights/InsightsView";

export default function InsightsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Emotional Insights</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Track your mood patterns and understand your emotional wellbeing over time.
        </p>
      </div>
      <InsightsView />
    </div>
  );
}
