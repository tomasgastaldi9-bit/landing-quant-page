import { getEquitySnapshot } from "@/lib/equity/csv-adapter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getEquitySnapshot();

  return Response.json({
    status: snapshot.sourceStatus ?? "MOCK_FALLBACK",
    data: snapshot,
  });
}
