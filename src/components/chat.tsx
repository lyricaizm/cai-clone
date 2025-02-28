"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/store";

export function Chat() {
  const { currentPreset } = useChatStore();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: {
        systemPrompt: currentPreset?.systemPrompt,
      },
    });

  return (
    <div className="flex-1 flex flex-col h-screen max-w-4xl mx-auto">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === "assistant" ? "items-start" : "items-end"
              }`}
            >
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
          ))}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex items-center gap-2"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}
