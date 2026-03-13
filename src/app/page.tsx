import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  Sparkles,
  Brain,
  Users,
  BarChart3,
  Shield,
  Heart,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Brain,
    title: "AI Emotional Companion",
    description:
      "Talk to your AI companion anytime, 24/7. It understands your emotions and provides personalised, empathetic support.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Users,
    title: "Expert Therapist Network",
    description:
      "Connect with licensed therapists via video, voice, or chat. Browse reviews and book a session in seconds.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Emotional Insights",
    description:
      "Track your mood patterns over time and gain deep, actionable insights into your emotional wellbeing.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Heart,
    title: "Guided Wellbeing Programs",
    description:
      "Structured programs designed by clinical experts to guide you through specific life challenges step by step.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "Your data is protected with end-to-end encryption. Fully HIPAA and GDPR compliant — your privacy is our priority.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Zap,
    title: "Mind Twin Technology",
    description:
      "Our longitudinal emotional memory engine learns your patterns to deliver increasingly personalised care over time.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const stats = [
  { value: "50K+",  label: "Active users"       },
  { value: "200+",  label: "Licensed therapists" },
  { value: "4.9★",  label: "Average rating"      },
  { value: "99.9%", label: "Platform uptime"     },
];

const testimonials = [
  {
    quote:
      "Glimmora helped me understand my anxiety in a completely new way. The AI companion is incredibly empathetic.",
    name: "Sarah K.",
    role: "Mind Plus member",
    initials: "SK",
  },
  {
    quote:
      "Booking a therapist used to be daunting. Now it takes two taps. I've had three sessions this month already.",
    name: "Marcus T.",
    role: "Therapy Access member",
    initials: "MT",
  },
  {
    quote:
      "The emotional insights dashboard showed me patterns I never noticed. It changed how I approach stress completely.",
    name: "Priya M.",
    role: "Mind Plus member",
    initials: "PM",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with essential wellbeing tools",
    features: [
      "AI emotional companion",
      "Mood tracking",
      "Journaling",
      "Basic insights",
    ],
    cta: "Get started free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Mind Plus",
    price: "$25",
    period: "per month",
    description: "Deeper support for your wellness journey",
    features: [
      "Everything in Free",
      "Unlimited AI support",
      "Guided programs",
      "Emotional insights",
      "Priority support",
    ],
    cta: "Start Mind Plus",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Therapy Access",
    price: "$100",
    period: "per week",
    description: "Human + AI care combined for full support",
    features: [
      "Everything in Mind Plus",
      "Licensed therapist sessions",
      "Video & chat therapy",
      "Session recordings",
      "Crisis support line",
    ],
    cta: "Book a therapist",
    href: "/signup",
    highlight: false,
  },
];

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            <span className="font-semibold text-base">Glimmora Mind</span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-3">
            <Link
              href="#features"
              className="hidden sm:inline-block text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hidden sm:inline-block text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
          {/* Background glows */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-indigo-500/8 blur-[80px] pointer-events-none" />

          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm text-primary font-medium mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered emotional wellbeing
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-[1.15]">
              Your emotional wellbeing,{" "}
              <span className="text-primary">enhanced by AI</span>
              {" "}and human care
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with AI emotional support, book licensed therapists, and
              track your mood — all in one beautiful platform designed for your
              mental wellness.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 px-8 h-12 text-base shadow-lg shadow-primary/20"
                >
                  Start free today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8 h-12 text-base"
                >
                  Sign in
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Trusted by{" "}
              <span className="font-semibold text-foreground">50,000+</span>{" "}
              people worldwide. No credit card required.
            </p>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-foreground">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <section id="features" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Everything you need to thrive
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Comprehensive emotional intelligence tools designed with clinical
                expertise and cutting-edge AI.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-xl border border-border p-6 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div
                    className={cn(
                      "h-11 w-11 rounded-xl flex items-center justify-center mb-5",
                      f.bg
                    )}
                  >
                    <f.icon className={cn("h-5 w-5", f.color)} />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Loved by thousands
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Real stories from people who&apos;ve transformed their emotional
                wellbeing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border border-border bg-card p-6 flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80 flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────── */}
        <section id="pricing" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Start free. Upgrade when you&apos;re ready.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "rounded-xl border p-8 flex flex-col relative",
                    plan.highlight
                      ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                      : "border-border bg-card"
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 text-amber-900 text-xs font-semibold px-4 py-1 whitespace-nowrap">
                      Most popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span
                        className={cn(
                          "text-sm mb-1",
                          plan.highlight
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        /{plan.period}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-sm",
                        plan.highlight
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <CheckCircle
                          className={cn(
                            "h-4 w-4 shrink-0",
                            plan.highlight
                              ? "text-primary-foreground/80"
                              : "text-primary"
                          )}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href} className="block">
                    <Button
                      className={cn(
                        "w-full",
                        plan.highlight
                          ? "bg-white text-primary hover:bg-white/90 border-0"
                          : ""
                      )}
                      variant={plan.highlight ? "outline" : "default"}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
              Ready to start your journey?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/70 max-w-xl mx-auto">
              Join thousands of people who&apos;ve discovered a better way to
              care for their emotional health.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-8 h-12 text-base shadow-lg"
                >
                  Start free today
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 h-12 text-base"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-3 w-3 text-primary-foreground" />
            </span>
            <span className="text-sm font-semibold">Glimmora Mind</span>
          </div>
          <p className="text-sm text-muted-foreground order-last sm:order-none">
            © 2026 Glimmora Mind. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
