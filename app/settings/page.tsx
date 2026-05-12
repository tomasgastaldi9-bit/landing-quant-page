import { AccountPreviewShell } from "@/components/account-preview/account-preview-shell";

export default function SettingsPage() {
  return (
    <AccountPreviewShell
      eyebrow="Workspace Preview"
      title="Settings"
      description="A mock settings surface for future workspace preferences. Controls shown here are non-functional placeholders."
      cards={[
        {
          label: "Theme",
          value: "Terminal Dark",
          detail: "Preview of a future interface preference.",
        },
        {
          label: "Notifications",
          value: "Demo Alerts",
          detail: "Visual placeholder for future alert configuration.",
        },
        {
          label: "Data Mode",
          value: "Testnet",
          detail: "Read-only product demonstration context.",
        },
        {
          label: "Security",
          value: "Not Connected",
          detail: "No auth provider, session, or password changes are active.",
        },
      ]}
    />
  );
}
