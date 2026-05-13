import { getHealthTelemetry } from "@/lib/telemetry/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getHealthTelemetry());
}
