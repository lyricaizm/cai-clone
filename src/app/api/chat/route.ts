import { ai } from "@/lib/model";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json();

  if (!systemPrompt) {
    return NextResponse.json(
      {
        error: "No system prompt",
      },
      {
        status: 400,
      }
    );
  }

  const result = streamText({
    model: ai("cognitivecomputations/dolphin3.0-mistral-24b:free"),
    messages: [
      {
        role: "system",
        content: systemPrompt || "You are a helpful AI assistant.",
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
