import { SignupForm } from "@/components/auth/SignupForm";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel — hidden below lg */}
      <AuthBrandPanel />

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            {/* Mobile-only logo */}
            <div className="flex items-center gap-2 mb-7 lg:hidden">
              <span className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                G
              </span>
              <span className="font-semibold text-base">Glimmora Mind</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Start your wellbeing journey — it&apos;s free.
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
