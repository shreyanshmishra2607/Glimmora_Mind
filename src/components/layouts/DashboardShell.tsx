"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageCircle,
  Heart,
  Users,
  CalendarCheck,
  BarChart2,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "AI Companion", icon: MessageCircle },
  { href: "/mood", label: "Mood", icon: Heart },
  { href: "/therapists", label: "Therapists", icon: Users },
  { href: "/booking", label: "Booking", icon: CalendarCheck },
  { href: "/insights", label: "Insights", icon: BarChart2 },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span className="h-4 w-4 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin" />
          Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border flex flex-col bg-card">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          <span className="font-semibold text-sm">Glimmora Mind</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "")} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user block */}
        <div className="px-3 pb-4 pt-2 border-t border-border space-y-0.5">
          {/* Settings link */}
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === "/settings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </Link>

          {/* User info + logout */}
          <div className="flex items-center gap-2.5 px-3 py-2 mt-1 rounded-lg bg-muted/50">
            {/* Avatar initials */}
            <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary text-xs font-semibold select-none">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              type="button"
              aria-label="Log out"
              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
