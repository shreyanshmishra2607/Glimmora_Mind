"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/shared/hooks";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
} from "@/components/ui";
import { isApiError } from "@/shared/utils";
import { User, Lock, CreditCard, CheckCircle2, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserPlan } from "@/shared/types";

/* ─── Types / config ─────────────────────────────────────────────────── */
type Tab = "profile" | "account" | "security";

const PLAN_LABELS: Record<UserPlan, string> = {
  free: "Free",
  mind_plus: "Mind Plus",
  therapy_access: "Therapy Access",
};

const PLAN_BADGE: Record<UserPlan, "outline" | "secondary" | "default"> = {
  free: "outline",
  mind_plus: "secondary",
  therapy_access: "default",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/* ─── Profile tab ────────────────────────────────────────────────────── */
function ProfileTab() {
  const { user, updateProfile, isSavingProfile, profileSaved, profileError } =
    useProfile();

  const [name,  setName]  = useState(user?.name  ?? "");
  const [bio,   setBio]   = useState(user?.bio   ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  useEffect(() => {
    if (user) { setName(user.name); setBio(user.bio ?? ""); setPhone(user.phone ?? ""); }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateProfile({ name: name.trim(), bio: bio.trim() || null, phone: phone.trim() || null });
    } catch { /* shown below */ }
  }

  const errorMessage = profileError
    ? isApiError(profileError) ? profileError.message : "Could not save changes."
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold select-none">
            {user ? getInitials(user.name) : "?"}
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm"
            onClick={() => alert("Photo upload available after backend integration.")}
          >
            <Camera className="h-3 w-3" />
          </button>
        </div>
        <div>
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="settings-name">Full name</Label>
          <Input
            id="settings-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="settings-phone">Phone number</Label>
          <Input
            id="settings-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="settings-bio">Bio</Label>
          <textarea
            id="settings-bio"
            className="w-full min-h-[96px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none transition-colors"
            placeholder="A few words about yourself…"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground text-right">{bio.length}/200</p>
        </div>
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive border border-destructive/20">
          {errorMessage}
        </p>
      )}

      {profileSaved && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-600 animate-fade-in">
          <CheckCircle2 className="h-4 w-4" /> Profile saved successfully.
        </p>
      )}

      <Button type="submit" loading={isSavingProfile} disabled={isSavingProfile}>
        {isSavingProfile ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}

/* ─── Account tab ────────────────────────────────────────────────────── */
function AccountTab() {
  const { user } = useProfile();
  if (!user) return null;

  const plan = (user.plan ?? "free") as UserPlan;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Email address</CardTitle>
          <CardDescription className="text-xs">Your login email. Contact support to change it.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted text-sm gap-3">
            <span className="font-mono text-sm truncate">{user.email}</span>
            <Badge variant="success" className="shrink-0">Verified</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Current plan</CardTitle>
          <CardDescription className="text-xs">Your active Glimmora Mind subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-sm">{PLAN_LABELS[plan]}</p>
              {plan === "free" && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  AI companion, mood tracking, journaling
                </p>
              )}
              {plan === "mind_plus" && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unlimited AI support, guided programs, emotional insights
                </p>
              )}
              {plan === "therapy_access" && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unlimited AI + licensed therapist sessions
                </p>
              )}
            </div>
            <Badge variant={PLAN_BADGE[plan]} className="shrink-0">{PLAN_LABELS[plan]}</Badge>
          </div>
          {plan !== "therapy_access" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Plan upgrade available after backend integration.")}
            >
              Upgrade plan
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Account info</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Member since</dt>
              <dd className="font-medium text-right">
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Sign-in method</dt>
              <dd className="font-medium capitalize">{user.authProvider ?? "email"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="pt-1">
        <button
          type="button"
          className="text-sm text-destructive hover:underline transition-colors"
          onClick={() => alert("Account deletion is not available in mock mode.")}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

/* ─── Security tab ───────────────────────────────────────────────────── */
function SecurityTab() {
  const { user, updatePassword, isSavingPassword, passwordSaved, passwordError } =
    useProfile();

  const [currentPw, setCurrentPw] = useState("");
  const [newPw,     setNewPw]     = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const isGoogle = user?.authProvider === "google";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);
    if (newPw.length < 8) { setLocalError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setLocalError("Passwords do not match."); return; }
    try {
      await updatePassword({ currentPassword: currentPw, newPassword: newPw });
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } catch { /* shown below */ }
  }

  const errorMessage =
    localError ??
    (passwordError ? (isApiError(passwordError) ? passwordError.message : "Could not update password.") : null);

  if (isGoogle) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            You signed in with Google. Password management is handled through your Google account.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="sec-current">Current password</Label>
        <Input
          id="sec-current"
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sec-new">New password</Label>
        <Input
          id="sec-new"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          placeholder="Min. 8 characters"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sec-confirm">Confirm new password</Label>
        <Input
          id="sec-confirm"
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="Repeat new password"
          required
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive border border-destructive/20">
          {errorMessage}
        </p>
      )}
      {passwordSaved && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-600 animate-fade-in">
          <CheckCircle2 className="h-4 w-4" /> Password changed successfully.
        </p>
      )}

      <Button type="submit" loading={isSavingPassword} disabled={isSavingPassword}>
        {isSavingPassword ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}

/* ─── Main settings view ─────────────────────────────────────────────── */
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile",  label: "Profile",       icon: <User       className="h-4 w-4" /> },
  { id: "account",  label: "Account & Plan", icon: <CreditCard className="h-4 w-4" /> },
  { id: "security", label: "Security",       icon: <Lock       className="h-4 w-4" /> },
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="space-y-6">
      {/* Tab bar — horizontally scrollable on small screens */}
      <div className="flex gap-1 border-b border-border overflow-x-auto scrollbar-none -mx-0.5 px-0.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors shrink-0",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.id === "profile" ? "Profile" : tab.id === "account" ? "Account" : "Security"}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in">
        {activeTab === "profile"  && <ProfileTab  />}
        {activeTab === "account"  && <AccountTab  />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}
