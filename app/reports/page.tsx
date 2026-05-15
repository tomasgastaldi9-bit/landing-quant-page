import { ClientPlaceholderPage } from "@/components/client-facing/client-placeholder-page";

export default function ReportsPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="Client Report Workspace"
      title="Reports"
      description="A future client report index for model state, signal history, risk summary, and telemetry-backed performance snapshots."
      emptyTitle="No reports generated"
      emptyBody="Report generation is not connected yet. This page intentionally avoids mock documents or fabricated performance packets."
    />
  );
}
