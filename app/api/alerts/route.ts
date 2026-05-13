import { getAlertsTelemetry } from "@/lib/telemetry/events";
import { telemetryJson } from "@/lib/telemetry/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return telemetryJson(await getAlertsTelemetry());
}
