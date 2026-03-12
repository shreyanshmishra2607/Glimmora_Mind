const features = [
  {
    icon: "🧠",
    title: "AI Emotional Companion",
    body: "Talk through your feelings with an empathetic AI available 24/7.",
  },
  {
    icon: "🩺",
    title: "Therapist Marketplace",
    body: "Discover verified therapists, read reviews, and book in seconds.",
  },
  {
    icon: "📊",
    title: "Emotional Insights",
    body: "Track mood patterns and see your growth with beautiful charts.",
  },
];

const testimonials = [
  {
    quote: "Glimmora helped me understand my anxiety in a completely new way.",
    name: "Sarah K.",
    role: "Mind Plus member",
  },
  {
    quote: "Booking a therapist used to be daunting. Now it takes two taps.",
    name: "Marcus T.",
    role: "Therapy Access member",
  },
];

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between bg-primary px-12 py-14 text-primary-foreground relative overflow-hidden shrink-0">
      {/* Background decorative circles */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/5" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-8 h-40 w-40 rounded-full bg-white/5" />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-12">
          <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
            G
          </span>
          <span className="font-semibold text-lg">Glimmora Mind</span>
        </div>

        <h2 className="text-3xl font-bold leading-snug mb-3">
          Your mind deserves<br />the best care.
        </h2>
        <p className="text-primary-foreground/70 text-sm leading-relaxed mb-10">
          AI-guided support, human therapists, and emotional intelligence tools — all in one place.
        </p>

        {/* Feature list */}
        <div className="space-y-5">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div>
                <p className="font-medium text-sm">{f.title}</p>
                <p className="text-primary-foreground/60 text-xs mt-0.5">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 mt-10">
        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-5">
          <p className="text-sm leading-relaxed text-primary-foreground/90 italic">
            &ldquo;{testimonials[0].quote}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
              {testimonials[0].name[0]}
            </div>
            <div>
              <p className="text-xs font-medium">{testimonials[0].name}</p>
              <p className="text-xs text-primary-foreground/60">{testimonials[0].role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
