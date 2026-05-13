import { getEquitySnapshot } from "@/lib/equity/csv-adapter";
import { telemetryJson } from "@/lib/telemetry/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getEquitySnapshot();

  return telemetryJson({
    status: snapshot.sourceStatus ?? "MOCK_FALLBACK",
    data: snapshot,
  });
}
