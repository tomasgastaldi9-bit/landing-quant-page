import { getPositionsSnapshot } from "@/lib/positions/csv-adapter";
import { telemetryJson } from "@/lib/telemetry/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getPositionsSnapshot();

  return telemetryJson({
    status: snapshot.sourceStatus ?? "MOCK_FALLBACK",
    data: snapshot,
  });
}
