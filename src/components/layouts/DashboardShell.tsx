"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "AI Chat" },
  { href: "/mood", label: "Mood" },
  { href: "/therapists", label: "Therapists" },
  { href: "/booking", label: "Booking" },
  { href: "/insights", label: "Insights" },
];

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
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Link href="/dashboard" className="font-semibold">
            Glimmora Mind
          </Link>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-md text-sm",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <span className="block px-3 py-2 text-sm text-muted-foreground truncate">
            {user?.email}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
