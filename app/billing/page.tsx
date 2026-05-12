import { AccountPreviewShell } from "@/components/account-preview/account-preview-shell";

export default function BillingPage() {
  return (
    <AccountPreviewShell
      eyebrow="Billing Preview"
      title="Billing"
      description="A mock billing placeholder for future SaaS packaging. No payment provider is connected and no billing action is available."
      cards={[
        {
          label: "Plan",
          value: "Private Beta",
          detail: "Visual-only plan state for product demonstration.",
        },
        {
          label: "Payment",
          value: "Not Connected",
          detail: "No Stripe, checkout, invoices, or cards are configured.",
        },
        {
          label: "Seats",
          value: "1 Demo",
          detail: "Placeholder seat count for future workspace management.",
        },
        {
          label: "Status",
          value: "Preview Only",
          detail: "No subscription is created, changed, or cancelled.",
        },
      ]}
    />
  );
}
