import path from "node:path";

export function getQuantbotOutputDir() {
  const configuredPath = process.env.QUANTBOT_OUTPUT_DIR?.trim();

  if (configuredPath) {
    return path.resolve(configuredPath);
  }

  return path.resolve("..", "crypto_bot", "output");
}

export function resolveTelemetryFile(fileName: string) {
  return path.join(/*turbopackIgnore: true*/ getQuantbotOutputDir(), fileName);
}
