import { getAlphaLabSnapshot } from "@/lib/alpha-lab/live-adapter";
import { telemetryJson } from "@/lib/telemetry/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return telemetryJson(await getAlphaLabSnapshot());
}
