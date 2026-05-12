import { AccountPreviewShell } from "@/components/account-preview/account-preview-shell";

export default function ProfilePage() {
  return (
    <AccountPreviewShell
      eyebrow="Account Preview"
      title="Profile"
      description="A mock operator profile for the private beta workspace. This page is visual only and does not edit or store account information."
      cards={[
        {
          label: "Operator",
          value: "Demo Operator",
          detail: "Placeholder identity used to preview authenticated SaaS UX.",
        },
        {
          label: "Email",
          value: "demo@quantterminal.local",
          detail: "Local demo address. No email verification is connected.",
        },
        {
          label: "Workspace",
          value: "Testnet",
          detail: "Demo workspace for product monitoring and research review.",
        },
        {
          label: "Access",
          value: "Private Beta",
          detail: "Visual plan badge only. No entitlements are enforced.",
        },
      ]}
    />
  );
}
