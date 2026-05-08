import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getEquitySnapshot } from "@/lib/equity/csv-adapter";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const equitySnapshot = await getEquitySnapshot();

  return <DashboardShell equitySnapshot={equitySnapshot} />;
}
