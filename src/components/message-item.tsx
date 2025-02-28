"use client";

import { Message } from "ai";
import { useChatStore } from "@/lib/store";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const { currentPreset } = useChatStore();

  return (
    <div
      className={`flex flex-col ${
        message.role === "assistant" ? "items-start" : "items-end"
      }`}
    >
      {message.role === "assistant" && currentPreset && (
        <span className="text-sm text-muted-foreground ml-4 mb-1">
          {currentPreset.name}
        </span>
      )}
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
          message.role === "assistant"
            ? "bg-muted"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
