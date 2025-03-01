import { ai } from "@/lib/model";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, systemPrompt, model } = await req.json();

  if (!systemPrompt) {
    return NextResponse.json({ error: "No system prompt" }, { status: 400 });
  }

  const result = streamText({
    model: ai(model),
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
