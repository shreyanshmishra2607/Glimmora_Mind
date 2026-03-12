"use client";

import { useInsights } from "@/shared/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function InsightsView() {
  const { insights, isLoading, isError, error } = useInsights(14);

  if (isError) {
    return (
      <div className="rounded-lg border border-border p-4 text-destructive">
        {error?.message ?? "Failed to load insights"}
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading insights...</p>;
  }

  if (!insights) {
    return <p className="text-muted-foreground">No insights data.</p>;
  }

  const chartData = insights.moodData
    .filter((d) => d.entryCount > 0)
    .map((d) => ({
      date: d.date.slice(5),
      mood: Math.round(d.averageMood * 10) / 10,
      entries: d.entryCount,
    }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Card className="flex-1 min-w-[140px]">
          <CardHeader className="pb-2">
            <CardDescription>Mood trend</CardDescription>
            <CardTitle className="text-lg capitalize">{insights.moodTrend}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1 min-w-[140px]">
          <CardHeader className="pb-2">
            <CardDescription>Top mood</CardDescription>
            <CardTitle className="text-lg capitalize">{insights.topMood}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1 min-w-[140px]">
          <CardHeader className="pb-2">
            <CardDescription>Sessions completed</CardDescription>
            <CardTitle className="text-lg">{insights.totalSessions}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood over time</CardTitle>
          <CardDescription>{insights.period} (1–7 scale)</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              No mood entries in this period. Log your mood to see trends.
            </p>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis domain={[1, 7]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
