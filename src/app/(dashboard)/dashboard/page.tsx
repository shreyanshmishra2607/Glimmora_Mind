"use client";

import Link from "next/link";
import { useAuth } from "@/shared/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">
        Welcome back, {user?.name ?? "there"}
      </h1>
      <p className="text-muted-foreground mt-1">
        Here’s a quick overview of your wellbeing.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        <Link href="/chat">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>AI Companion</CardTitle>
              <CardDescription>
                Talk to your emotional support companion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="sm">
                Open chat
              </Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/mood">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Mood</CardTitle>
              <CardDescription>
                Log how you feel and view your history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="sm">
                Log mood
              </Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/therapists">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Therapists</CardTitle>
              <CardDescription>
                Discover and book sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="sm">
                Browse
              </Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/insights">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>
                Mood trends and emotional patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="sm">
                View insights
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
