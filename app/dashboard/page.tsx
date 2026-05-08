import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getEquitySnapshot } from "@/lib/equity/csv-adapter";
import { getPositionsSnapshot } from "@/lib/positions/csv-adapter";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [equitySnapshot, positionsSnapshot] = await Promise.all([
    getEquitySnapshot(),
    getPositionsSnapshot(),
  ]);

  return (
    <DashboardShell
      equitySnapshot={equitySnapshot}
      positionsSnapshot={positionsSnapshot}
    />
  );
}
