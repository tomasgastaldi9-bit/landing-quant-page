const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export function telemetryJson<T>(body: T) {
  return Response.json(
    {
      ...body,
      fetchedAt: new Date().toISOString(),
    },
    { headers: NO_STORE_HEADERS },
  );
}
