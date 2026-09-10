import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.OPENAI_API_KEY;
  const hasKey = Boolean(key && key.startsWith("sk-"));

  return NextResponse.json({
    status: hasKey ? "configured" : "missing",
    hasKey,
    keyPrefix: key ? key.slice(0, 8) + "..." : null,
    note: "This is a test endpoint. Remove after verifying the API key is loaded.",
  });
}
