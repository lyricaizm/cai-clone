"use client";

import { useChatStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ChatbotGrid() {
  const { presets } = useChatStore();

  return (
    <>
      {presets.map((preset) => (
        <div
          key={preset.id}
          className="border rounded-lg p-6 space-y-4 hover:border-foreground/20 transition-colors"
        >
          <h2 className="text-xl font-semibold">{preset.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {preset.description}
          </p>
          <Link href={`/chat?preset=${preset.id}`}>
            <Button className="w-full">Chat Now</Button>
          </Link>
        </div>
      ))}
    </>
  );
}
