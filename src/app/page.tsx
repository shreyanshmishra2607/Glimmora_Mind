import Link from "next/link";
import { Button } from "@/components/ui";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-semibold">Glimmora Mind</span>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-center max-w-2xl">
          Your emotional wellbeing, supported by AI and human care
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-xl">
          Connect with AI emotional support, discover therapists, and track your mood—all in one place.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <Button size="lg">Start free</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
