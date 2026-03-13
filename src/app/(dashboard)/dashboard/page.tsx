"use client";

import Link from "next/link";
import { useAuth } from "@/shared/hooks";
import { Button } from "@/components/ui";
import {
  MessageCircle,
  Heart,
  Users,
  BarChart2,
  CalendarCheck,
  ArrowRight,
  TrendingUp,
  Smile,
  Clock,
} from "lucide-react";

const quickActions = [
  {
    href: "/chat",
    icon: MessageCircle,
    title: "AI Companion",
    description: "Talk to your emotional support companion",
    action: "Open chat",
    gradient: "from-violet-500/8 to-purple-500/8",
    border: "hover:border-violet-300",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    href: "/mood",
    icon: Heart,
    title: "Mood Tracker",
    description: "Log how you feel and view your history",
    action: "Log mood",
    gradient: "from-rose-500/8 to-pink-500/8",
    border: "hover:border-rose-300",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    href: "/therapists",
    icon: Users,
    title: "Therapists",
    description: "Discover and book qualified therapists",
    action: "Browse",
    gradient: "from-blue-500/8 to-cyan-500/8",
    border: "hover:border-blue-300",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    href: "/insights",
    icon: BarChart2,
    title: "Insights",
    description: "Your mood trends and emotional patterns",
    action: "View insights",
    gradient: "from-emerald-500/8 to-teal-500/8",
    border: "hover:border-emerald-300",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Here&apos;s a quick overview of your wellbeing.
        </p>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Mood streak</p>
          <p className="text-xl font-bold mt-0.5">3 days</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Smile className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Last mood</p>
          <p className="text-xl font-bold mt-0.5 capitalize">Good</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Sessions</p>
          <p className="text-xl font-bold mt-0.5">2</p>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Quick actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickActions.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`group rounded-xl border border-border bg-gradient-to-br ${item.gradient} ${item.border} hover:shadow-md transition-all duration-200 cursor-pointer p-5 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`h-11 w-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="mt-4">
                <Button variant="secondary" size="sm" className="text-xs sm:text-sm pointer-events-none">
                  {item.action}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Booking CTA */}
      <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Book a therapy session</p>
              <p className="text-xs text-muted-foreground">
                Connect with a licensed therapist today
              </p>
            </div>
          </div>
          <Link href="/therapists">
            <Button size="sm" variant="outline" className="shrink-0">
              Browse therapists
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
