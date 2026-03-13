"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { useUIStore } from "@/shared/store";
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
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard",    icon: LayoutDashboard },
  { href: "/chat",      label: "AI Companion",  icon: MessageCircle   },
  { href: "/mood",      label: "Mood",          icon: Heart           },
  { href: "/therapists",label: "Therapists",    icon: Users           },
  { href: "/booking",   label: "Booking",       icon: CalendarCheck   },
  { href: "/insights",  label: "Insights",      icon: BarChart2       },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout }              = useAuth();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();

  /* Close mobile sidebar whenever the route changes */
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  /* Redirect when not authenticated */
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span className="h-4 w-4 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin" />
          Redirecting…
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Mobile backdrop ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={cn(
          /* base */
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-card border-r border-border",
          "w-[270px] transition-transform duration-300 ease-in-out",
          /* desktop — always visible, becomes part of the flex row */
          "lg:relative lg:w-[240px] lg:translate-x-0 lg:shrink-0",
          /* mobile toggle */
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo row */}
        <div className="px-5 py-5 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            <span className="font-semibold text-sm">Glimmora Mind</span>
          </div>
          {/* Close button — mobile only */}
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={toggleSidebar}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                  active
                    ? "bg-primary/10 text-primary font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: settings + user card */}
        <div className="px-3 pb-4 pt-2 border-t border-border space-y-0.5 shrink-0">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
              pathname === "/settings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </Link>

          <div className="flex items-center gap-2.5 px-3 py-2 mt-1 rounded-lg bg-muted/50">
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
              className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1 rounded"
              onClick={() => { logout(); router.push("/"); }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden h-14 border-b border-border flex items-center gap-3 px-4 bg-card/95 backdrop-blur-sm sticky top-0 z-10 shrink-0">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-3 w-3 text-primary-foreground" />
            </span>
            <span className="font-semibold text-sm">Glimmora Mind</span>
          </div>

          <div className="ml-auto">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold select-none">
              {getInitials(user.name)}
            </div>
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
