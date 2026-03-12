import { SettingsView } from "@/components/settings/SettingsView";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your profile, account, and security.
        </p>
      </div>
      <SettingsView />
    </div>
  );
}
