import { getOrdersTelemetry } from "@/lib/telemetry/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getOrdersTelemetry());
}
