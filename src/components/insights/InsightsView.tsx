"use client";

import { useInsights } from "@/shared/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Heart, CalendarCheck } from "lucide-react";

const TREND_META = {
  improving: {
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    label: "Improving",
  },
  declining: {
    icon: TrendingDown,
    color: "text-rose-600",
    bg: "bg-rose-50",
    label: "Declining",
  },
  stable: {
    icon: Minus,
    color: "text-amber-600",
    bg: "bg-amber-50",
    label: "Stable",
  },
};

export function InsightsView() {
  const { insights, isLoading, isError, error } = useInsights(14);

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive text-sm">
        {error?.message ?? "Failed to load insights"}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 h-24" />
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card h-80" />
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        No insights data available.
      </div>
    );
  }

  const chartData = insights.moodData
    .filter((d) => d.entryCount > 0)
    .map((d) => ({
      date: d.date.slice(5),
      mood: Math.round(d.averageMood * 10) / 10,
      entries: d.entryCount,
    }));

  const trendKey = (insights.moodTrend ?? "stable") as keyof typeof TREND_META;
  const trend = TREND_META[trendKey] ?? TREND_META.stable;
  const TrendIcon = trend.icon;

  return (
    <div className="space-y-6">
      {/* ── Stat cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Mood trend */}
        <Card>
          <CardContent className="pt-5 pb-5 px-5">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl ${trend.bg} flex items-center justify-center shrink-0`}>
                <TrendIcon className={`h-5 w-5 ${trend.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mood trend</p>
                <p className={`text-xl font-bold mt-0.5 capitalize ${trend.color}`}>
                  {trend.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top mood */}
        <Card>
          <CardContent className="pt-5 pb-5 px-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                <Heart className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Top mood</p>
                <p className="text-xl font-bold mt-0.5 capitalize text-violet-600">
                  {insights.topMood}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card>
          <CardContent className="pt-5 pb-5 px-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <CalendarCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sessions completed</p>
                <p className="text-xl font-bold mt-0.5 text-blue-600">
                  {insights.totalSessions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Mood chart ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Mood over time</CardTitle>
          <CardDescription>{insights.period} · scored 1–7</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-3xl">📊</p>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                No mood entries in this period. Start logging your mood to see trends here.
              </p>
            </div>
          ) : (
            <div className="h-[260px] sm:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[1, 7]}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.625rem",
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    dot={{
                      fill: "hsl(var(--primary))",
                      strokeWidth: 0,
                      r: 4,
                    }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
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
