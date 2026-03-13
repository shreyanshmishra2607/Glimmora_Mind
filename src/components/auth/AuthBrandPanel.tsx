import { Sparkles, Brain, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Emotional Companion",
    body: "Talk through your feelings with an empathetic AI available 24/7.",
  },
  {
    icon: Users,
    title: "Therapist Marketplace",
    body: "Discover verified therapists, read reviews, and book in seconds.",
  },
  {
    icon: BarChart3,
    title: "Emotional Insights",
    body: "Track mood patterns and see your growth with beautiful charts.",
  },
];

const testimonial = {
  quote: "Glimmora helped me understand my anxiety in a completely new way.",
  name: "Sarah K.",
  role: "Mind Plus member",
};

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[460px] xl:w-[500px] flex-col justify-between bg-primary px-11 py-14 text-primary-foreground relative overflow-hidden shrink-0">
      {/* Decorative blobs */}
      <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-10 h-44 w-44 rounded-full bg-white/5 pointer-events-none" />

      {/* Top content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-12">
          <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold text-lg">Glimmora Mind</span>
        </div>

        <h2 className="text-3xl font-bold leading-snug mb-3">
          Your mind deserves<br />the best care.
        </h2>
        <p className="text-primary-foreground/70 text-sm leading-relaxed mb-10">
          AI-guided support, human therapists, and emotional intelligence tools —
          all in one place.
        </p>

        {/* Feature list */}
        <div className="space-y-5">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                <f.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{f.title}</p>
                <p className="text-primary-foreground/60 text-xs mt-0.5 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 mt-10">
        <div className="rounded-xl bg-white/12 backdrop-blur-sm p-5 border border-white/10">
          <p className="text-sm leading-relaxed text-primary-foreground/90 italic">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold shrink-0">
              {testimonial.name[0]}
            </div>
            <div>
              <p className="text-xs font-semibold">{testimonial.name}</p>
              <p className="text-xs text-primary-foreground/60">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
